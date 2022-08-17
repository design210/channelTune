<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="adform-header v-application">
        <h1>광고 편성등록</h1>
        <div class="btn-group" style="margin-right: 30px; display: flex">
          <v-btn v-if="(organizeAdvertisementSid || '') === ''" small color="primary" @click="verify('add')">등록</v-btn>
          <div v-else class="btn-group">
            <v-btn small color="warning" @click="verify('update')">수정</v-btn>
            <v-btn small color="error" @click="confirm">삭제</v-btn>
          </div>
          <v-btn small @click="clear">CLEAR</v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <section class="table-section v-application">
        <table width="100%" class="tbl-reg column2 mt0">
          <colgroup>
            <col width="130" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
            <col width="50" />
          </colgroup>
          <tr>
            <td>고유코드</td>
            <td class="field-div">
              <input type="text" class="input-first" readonly v-model="organizeAdvertisementSid" />
            </td>
            <td>상태값</td>
            <td colspan="2">
              <pull-down :data="organizeAdvertisementStatus" :code="'SYS21C09B005'" @selected="selected" class="pull-down"></pull-down>
            </td>
          </tr>
          <tr>
            <td>스토어 고유코드</td>
            <td class="field-div" colspan="4">
              <input type="text" class="input-first" readonly v-model="storeSid" />
              <input type="text" class="input-last" v-model="storeName" />
              <v-btn small color="primary" @click="showStoreListModal">검색</v-btn>
            </td>
          </tr>
          <tr>
            <td>광고 캠페인 명</td>
            <td class="field-div" colspan="4">
              <input type="text" class="input-first" readonly v-model="organizeAdvertisementCampaignSid" />
              <input type="text" class="input-last" v-model="organizeAdvertisementCampaignName" />
              <v-btn small color="primary" @click="campaignListModal">검색</v-btn>
            </td>
          </tr>
          <tr>
            <td>슬롯 수</td>
            <td><input type="text" v-model="organizeAdvertisementSlot" /></td>
            <td>순서</td>
            <td><input type="text" v-model="organizeAdvertisementSort" /></td>
            <td><v-btn small color="warning">수정</v-btn></td>
          </tr>
          <tr>
            <td>시작날짜</td>
            <td>
              <date-picker :propdate="organizeAdvertisementStartDate" @updateDate="newStartDate" />
            </td>
            <td>종료날짜</td>
            <td>
              <date-picker :propdate="organizeAdvertisementEndDate" @updateDate="newEndDate" :readOnly="checkToggle" />
            </td>
            <td>
              <div class="textfield pt3">
                <v-checkbox v-model="organizeAdvertisementEndDate" label="상시" value="9999-12-31"></v-checkbox>
              </div>
            </td>
          </tr>
        </table>

        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      </section>
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import { getPopupOpt } from "@/utils/modal";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import DatePicker from "@/components/form/DatePicker";
import resMixin from "@//mixins/response.js";
import PullDown from "@/components/form/PullDown.vue";
import storeListModal from "@/components/modal/common/StoreList";
import campaignList from "@/components/modal/ad/CampaignList";
import isEmpty from "@/utils/empty";
export default {
  components: { alim, modalWrap, DatePicker, PullDown, confirm },
  mixins: [loading, alimMixin, deleteMixin, resMixin],
  props: {
    id: {
      //organizeAdvertisementSid
      default: 0,
      type: Number,
    },
    searchSid: {
      type: String,
    },
  },

  data() {
    return {
      storeSid: "",
      storeName: "",
      buySid: "",
      organizeAdvertisementSid: "",
      organizeAdvertisementCampaignSid: "",
      organizeAdvertisementCampaignName: "",
      organizeAdvertisementSort: "",
      organizeAdvertisementSlot: "",
      organizeAdvertisementStartDate: "",
      organizeAdvertisementEndDate: "",
      organizeAdvertisementStatus: "",
      organizeAdvertisementStatusName: "",
      checkToggle: false,
      toggle: false,

      deleteList: [],
    };
  },
  computed: {
    ...mapGetters("organizeAd", ["organizeAdAdd", "organizeAdDelete", "getOrganizeAdDetail"]),
  },
  watch: {
    organizeAdvertisementEndDate(val) {
      val === "9999-12-31" ? (this.checkToggle = true) : (this.checkToggle = false);
    },
    organizeAdvertisementStartDate(val) {
      if (val !== undefined) {
        const year = val.substring(0, 4);
        const month = val.substring(5, 7);
        let date = new Date(year, month, 0);
        let day = date.getDate();

        if (this.organizeAdvertisementEndDate === undefined || this.organizeAdvertisementEndDate === "") {
          if (!this.toggle) {
            this.organizeAdvertisementEndDate = val.substring(0, 7) + `-${day}`;
          }
        }
        this.toggle = false;
      }
    },
    toggle(val) {
      if (val) {
        this.organizeAdvertisementEndDate = "";
      }
    },
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      if (this.searchSid !== "") {
        const res = await this.__getResponse("companyStore/GET_COMPANY_STORE_DETAIL", this.searchSid);
        this.storeSid = res.companyStore.companyStoreSid;
        this.storeName = res.companyStore.companyStoreName;
      }
      if (this.id !== 0) {
        await this.getDetail();
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    async getDetail() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_DETAIL", this.id);
        const res = this.getOrganizeAdDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        if (res.OrganizeAdvertisement === null) {
          return;
        }

        const data = res.OrganizeAdvertisement;
        this.storeSid = data.companyStoreSid;
        this.storeName = data.companyStoreName;
        this.buySid = isEmpty(data.buySid);
        this.organizeAdvertisementSid = data.organizeAdvertisementSid;
        this.organizeAdvertisementCampaignName = data.organizeCampaignTitle;
        this.organizeAdvertisementSlot = data.organizeAdvertisementSlot;
        this.organizeAdvertisementStartDate = data.organizeAdvertisementStartDate;
        this.organizeAdvertisementEndDate = data.organizeAdvertisementEndDate;
        this.organizeAdvertisementStatus = data.organizeAdvertisementStatus;
        this.organizeAdvertisementStatusName = data.organizeAdvertisementStatusName;
        this.organizeAdvertisementSort = data.organizeAdvertisementSort;
        this.organizeAdvertisementCampaignSid = data.organizeCampaignSid;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    verify(text) {
      if ((this.storeSid || "") === "") {
        this.alim("스토어를 선택하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementCampaignName || "") === "") {
        this.alim("캠페인명을 입력하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementCampaignName || "") === "") {
        this.alim("캠페인명을 입력하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementSlot || "") === "") {
        this.alim("슬롯수를 입력하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementStartDate || "") === "") {
        this.alim("시작일을 선택하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementEndDate || "") === "") {
        this.alim("종료일을 선택하세요.", this.errorColor);
        return false;
      }
      if ((this.organizeAdvertisementStatus || "") === "") {
        this.alim("상태를 선택하세요.", this.errorColor);
        return false;
      }

      switch (text) {
        case "add":
          this.add();
          break;
        case "update":
          this.update();
          break;
        default:
          this.alim("알 수 없는 에러", this.errorColor);
      }
    },

    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/ORGANIZE_AD_ADD", {
          companyStoreSid: this.storeSid,
          buySid: this.buySid,

          organizeCampaignSid: this.organizeAdvertisementCampaignSid,
          organizeAdvertisementSlot: this.organizeAdvertisementSlot,
          organizeAdvertisementStartDate: this.organizeAdvertisementStartDate,
          organizeAdvertisementEndDate: this.organizeAdvertisementEndDate,
          organizeAdvertisementStatus: this.organizeAdvertisementStatus,
          organizeAdvertisementSort: this.organizeAdvertisementSort,
        });

        const res = this.organizeAdAdd.channeltuneApiResult;
        if (res.errorCode !== "200") {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim("추가되었습니다.", this.successColor);
        this.clear();
        bus.$emit("end:spinner");
        setTimeout(() => {
          this.$emit("close");
        }, 2000);

        this.$attrs.reload(this.searchSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async update() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("organizeAd/ORGANIZE_AD_UPDATE", {
          companyStoreSid: this.storeSid,
          buySid: this.buySid,
          organizeAdvertisementCampaignName: this.organizeAdvertisementCampaignName,
          organizeAdvertisementSlot: this.organizeAdvertisementSlot,
          organizeAdvertisementStartDate: this.organizeAdvertisementStartDate,
          organizeAdvertisementEndDate: this.organizeAdvertisementEndDate,
          organizeAdvertisementStatus: this.organizeAdvertisementStatus,
          organizeAdvertisementSid: this.organizeAdvertisementSid,
          organizeAdvertisementSort: this.organizeAdvertisementSort,
        });
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.alim(res.errorMessage, this.successColor);
        setTimeout(() => {
          this.$emit("close");
        }, 2000);
        this.$attrs.reload(this.searchSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }

      // this.getDetail();
    },
    async del() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/ORGANIZE_AD_DELETE", this.organizeAdvertisementSid);
        const res = this.organizeAdDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.deleteList = [parseInt(this.organizeAdvertisementSid), ...this.deleteList];
        this.alim("삭제되었습니다.", this.successColor);
        this.clear();
        bus.$emit("end:spinner");
        this.$emit("close");
        this.$attrs.reload(this.searchSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    emitResetConfirm({ del, type }) {
      if (del === "Y" && type === "list") {
        this.del();
      }

      this.resetDeleteData();
    },

    close() {
      this.$attrs.update(this.deleteList);
      this.$emit("close");
    },

    selected({ sysCodeSid, sysCodeName }) {
      this.organizeAdvertisementStatus = sysCodeSid;
      this.organizeAdvertisementStatusName = sysCodeName;
    },

    newStartDate(data) {
      this.organizeAdvertisementStartDate = data;
    },
    newEndDate(data) {
      this.organizeAdvertisementEndDate = data;
    },

    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    storeUpdate({ id, name }) {
      this.storeSid = id;
      this.storeName = name;
    },
    campaignListModal() {
      this.$modal.show(campaignList, { update: this.campaignUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    campaignUpdate(data) {
      this.organizeAdvertisementCampaignSid = data.organizeCampaignSid;
      this.organizeAdvertisementCampaignName = data.organizeCampaignTitle;
      this.organizeAdvertisementSlot = data.organizeCampaignSlot;
    },
    clear() {
      this.toggle = true;
      this.storeSid = "";
      this.storeName = "";
      this.buySid = "";
      this.organizeAdvertisementSid = "";
      this.organizeAdvertisementCampaignName = "";
      this.organizeAdvertisementSlot = "";
      this.organizeAdvertisementStartDate = "";
      this.organizeAdvertisementEndDate = "";
      this.organizeAdvertisementStatus = "";
      this.organizeAdvertisementStatusName = "";
      this.organizeAdvertisementCampaignSid = "";
      this.organizeAdvertisementSort = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.adform-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  & button {
    margin-left: 5px;
  }
}
</style>
