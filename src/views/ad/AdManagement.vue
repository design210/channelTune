<template>
  <section class="container">
    <div class="title-wrap">
      <h1>광고 편성 관리</h1>
    </div>
    <section class="ad-manage">
      <section class="ad-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>스토어</h2>
            <div class="btn-group">
              <v-btn small @click="searchOptionClear">CLEAR</v-btn>
            </div>
          </div>

          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="70" />
                <col width="*" />
                <col width="70" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>업체</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" @click="showCompanyListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>스토어</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" @click="showStoreListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>행정구역</td>
                <td colspan="3" class="field-div">
                  <pull-down
                    :data="sidoCode"
                    :code="locationCode"
                    @selected="sidoSelect"
                    class="pull-down"
                    style="width: calc(50% - 3px)"
                  ></pull-down>
                  <pull-down
                    :data="sigunCode"
                    :code="sendSidoCode"
                    @selected="sigunSelect"
                    class="pull-down ml5"
                    style="width: calc(50% - 2px)"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>스토어 상태</td>
                <td>
                  <pull-down :data="storeStatusSid" :code="'SYS21A15B014'" @selected="storeStatus" class="pull-down"></pull-down>
                </td>
                <td>업종</td>
                <td>
                  <pull-down :data="btypeCode" :code="'SYS21A15B012'" @selected="btypeSelect" class="pull-down"></pull-down>
                </td>
              </tr>
            </table>
          </div>

          <div class="search-box">
            <input type="text" placeholder="결제 고유코드/ 스토어명" v-model="searchText" @keyup.enter="search(1)" />
            <v-btn small color="primary" @click="search(1)">조회</v-btn>
          </div>

          <div>
            <table class="tbl mt20 select-tbl">
              <caption>
                스토어 리스트
              </caption>
              <colgroup>
                <col width="120" />
                <col width="*" />
                <col width="60" />
                <col width="60" />
                <col width="80" />
              </colgroup>
              <thead>
                <tr>
                  <th>스토어고유코드</th>
                  <th class="left">스토어명</th>
                  <th>최대슬롯</th>
                  <th>편성슬롯</th>
                  <th>스토어상태값</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in storeList"
                  :key="index"
                  @click="getList(item.companyStoreSid)"
                  :class="setSid === item.companyStoreSid ? 'activing' : ''"
                >
                  <td>{{ item.companyStoreSid }}</td>
                  <td class="left">{{ item.companyStoreName }}</td>
                  <td>{{ item.companyStoreWorkSlot }}</td>
                  <td>{{ item.slotCount }}</td>
                  <td>{{ item.companyStoreStatusName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="storeList.length < 1">
                <tr>
                  <td colspan="5">편성 스토어 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="storePage" :length="storeLen" :total-visible="7"></v-pagination>
            </div>
          </div>
        </div>
      </section>

      <section class="ad-list-right init-wrap section-box border-outside">
        <div class="border">
          <div style="display: flex; justify-content: end">
            <div class="date-box mr30">
              <span class="mr10">광고편성 기준 날짜</span>
              <date-picker :defaultValue="searchDate" @updateDate="newAdvertiseStartDate" class="modal-date"></date-picker>
              <v-btn class="ml10" small color="primary" @click="getList(setSid)">조회</v-btn>
            </div>
            <v-btn small color="primary" @click="showAdAddModal()">광고편성 등록</v-btn>
            <v-btn small color="primary" @click="showAdvertisingProduceOrganizationModal" style="margin-left: 5px">광고상품 편성</v-btn>
          </div>
          <div class="header">
            <h2>광고 편성 리스트</h2>
          </div>
          <v-data-table
            class="tbr2"
            :headers="headers"
            loading-text="광고 편성 리스트가 없습니다"
            no-data-text="광고 편성 리스트가 없습니다"
            :loading="loadingToggle"
            item-key="id"
            :items="adList"
            :options="op"
            :hide-default-footer="true"
            :items-per-page="240"
          >
            <template v-slot:body="props">
              <draggable
                :scroll-sensitivity="250"
                :list="props.items"
                tag="tbody"
                handle=".handle"
                @end="sorting"
                :options="{ disabled: disableDraggable }"
              >
                <tr v-for="(item, idx) in props.items" :key="idx" class="tbr" @click="showAdAddModal(item.organizeAdvertisementSid)">
                  <td><v-icon class="handle">mdi-menu</v-icon></td>
                  <td>{{ item.organizeAdvertisementSort }}</td>
                  <td>{{ item.organizeAdvertisementSid }}</td>
                  <td class="left">{{ item.organizeCampaignTitle }}</td>
                  <td>{{ item.organizeAdvertisementSlot }}</td>
                  <td>{{ item.organizeAdvertisementStartDate }}</td>
                  <td>{{ item.organizeAdvertisementEndDate }}</td>
                  <td>{{ item.organizeAdvertisementStatusName }}</td>
                </tr>
              </draggable>
              <tfoot v-if="adList.length < 1">
                <tr>
                  <td colspan="8">광고 편성 스토어 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </template>
          </v-data-table>
        </div>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <!-- <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm> -->
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import PullDown from "@/components/form/PullDown";
import loading from "@/mixins/loading";
import resMixin from "@/mixins/response";
import bus from "@/utils/bus";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import AdvertisingProduceOrganization from "@/components/modal/ad/AdvertisingProduceOrganization";
import alimMixin from "@/mixins/alim.js";
import DatePicker from "@/components/form/DatePicker";
import deleteMixin from "@/mixins/delete.js";
import adAddModal from "@/components/modal/ad/AdAdd.vue";
import adOrganizationModal from "@/components/modal/ad/AdOrganization";
import companyListModal from "@/components/modal/common/CompanyList";
import storeListModal from "@/components/modal/common/StoreList";
import Draggable from "vuedraggable";
export default {
  components: { alim, PullDown, Draggable, DatePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin, resMixin],
  props: ["size"],
  data() {
    return {
      storeList: [],
      storeLen: null,
      storePage: 1,

      adList: [],
      adSize: 15,
      adLen: 0,
      adPage: 1,
      perPage: 15,
      op: { align: "center" },

      // 검색 조건
      searchText: "",
      companySid: "",
      searchDate: "",
      companyName: "",
      companyStoreSid: "",
      companyStoreName: "",
      searchStoreSid: "", // 검색용 companyStoreSid
      headers: [
        { text: "", sortable: false, width: "40px", align: "center" },
        { text: "#", sortable: false, width: "40px", align: "center" },
        { text: "광고편성고유코드", value: "광고편성고유코드", sortable: false, width: "100px", align: "center" },
        { text: "캠페인명", value: "캠페인명", sortable: false, align: "left" },
        { text: "광고편성슬롯수", value: "광고편성슬롯수", sortable: false, width: "90px", align: "center" },
        { text: "광고편성시작일", value: "광고편성시작일", sortable: false, width: "90px", align: "center" },
        { text: "광고편성종료일", value: "광고편성종료일", sortable: false, width: "90px", align: "center" },
        { text: "광고편성상태값", value: "광고편성상태값", sortable: false, width: "90px", align: "center" },
      ],
      loadingToggle: false,
      disableDraggable: false,

      locationCode: "SYS21A15B001",
      sendSidoCode: "",
      sendSigunCode: "",
      sidoCode: "",
      sidoCodeName: "",
      sigunCode: "",
      sigunCodeName: "",
      btypeCode: "",
      btypeName: "",
      storeStatusSid: "",
      storeStatusName: "",

      organizeAdvertisementSid: 0,
      setSid: "",
    };
  },
  computed: {
    ...mapGetters("organizeAd", ["getOrganizeAdStoreList", "getOrganizeAdList"]),
  },
  watch: {
    storePage() {
      this.adList = [];
      this.adLen = null;
      this.search();
    },
    size() {
      this.search(0);
    },
  },
  mounted() {
    this.getToday();
  },
  methods: {
    // 스토어리스트
    async search(num) {
      if (num === 1) {
        this.storePage = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_STORE_LIST", {
          size: this.size,
          companyStoreStatus: this.storeStatusSid,
          page: this.storePage,
          searchText: this.searchText,
          companyStoreSid: this.companyStoreSid,
          companySid: this.companySid,
          zone1: this.sidoCode,
          zone2: this.sigunCode,
          businessType: this.btypeCode,
        });

        const res = this.getOrganizeAdStoreList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.OrganizeAdvertisement;
        this.storeList = data.data;
        this.storeLen = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 광고편성 리스트
    async getList(sid, num) {
      this.setSid = sid;
      if (num === 1) {
        this.adPage = 1;
      }

      this.searchStoreSid = sid;
      this.loadingToggle = true;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_LIST", {
          size: "",
          page: "",
          companyStoreSid: sid,
          searchDate: this.searchDate,
        });

        const res = this.getOrganizeAdList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }
        const data = res.OrganizeAdvertisement;
        this.adList = data;
        this.loadingToggle = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    selectOg(sid) {
      this.organizeAdvertisementSid = parseInt(sid);
    },

    // 광고 편성 등록 modal
    showAdAddModal(id = 0) {
      this.$modal.show(
        adAddModal,
        { id: id, update: this.adAddUpdate, reload: this.refresh, searchSid: this.searchStoreSid },
        getPopupOpt("adAddModal", "700px", "auto", false),
      );
    },
    refresh(data) {
      this.search();
      this.getList(data);
    },
    adAddUpdate(deleteList) {
      // storeSid가 있다면 reload
      if ((this.searchStoreSid || "") !== "") {
        // 삭제한 목록에 있다면 0으로 수정
        if (deleteList.includes(parseInt(this.organizeAdvertisementSid))) {
          // $('table.organize-ad-list-tbl > tbody > tr').removeClass('active');
          this.organizeAdvertisementSid = 0;
        }
        this.getList(this.searchStoreSid, 1);
      }
    },

    // 광고 상품 편성 modal
    showAdOrganizationModal() {
      this.$modal.show(adOrganizationModal, {}, getPopupOpt("adOrganizationModal", "1500px", "auto", false));
    },

    // 업체 modal
    showCompanyListModal() {
      this.$modal.show(companyListModal, { update: this.companyUpdate }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    companyUpdate({ companySid, companyName }) {
      this.companySid = companySid;
      this.companyName = companyName;
    },

    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    storeUpdate({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;
    },

    // 시도
    sidoSelect(data) {
      this.sidoCode = data.sysCodeSid;
      this.sidoCodeName = data.sysCodeName;

      this.sendSidoCode = data.sysCodeSid;
    },
    // 시군
    sigunSelect(data) {
      this.sigunCode = data.sysCodeSid;
      this.sigunCodeName = data.sysCodeName;

      this.sendSigunCode = data.sysCodeSid;
    },
    //업종
    btypeSelect({ sysCodeSid, sysCodeName }) {
      this.btypeCode = sysCodeSid;
      this.btypeName = sysCodeName;
    },
    //스토어 상태
    storeStatus({ sysCodeSid, sysCodeName }) {
      this.storeStatusSid = sysCodeSid;
      this.storeStatusName = sysCodeName;
    },

    // 검색 설정 초기화
    searchOptionClear() {
      this.companySid = "";
      this.companyName = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.storeSid = "";

      this.sendSidoCode = "";
      this.sendSigunCode = "";
      this.sidoCode = "";
      this.sidoCodeName = "";
      this.sigunCode = "";
      this.sigunCodeName = "";

      this.btypeCode = "";
      this.btypeName = "";
      this.searchText = "";
    },
    async sorting(event) {
      this.disableDraggable = true; //response 오기전에 드래그 이벤트 막기
      if (event.oldDraggableIndex === event.newDraggableIndex) {
        this.disableDraggable = false;
        return;
      }
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("organizeAd/ORGANIZE_AD_CHANGE_SORT", {
          companyStoreSid: this.searchStoreSid,
          fromSort: event.oldDraggableIndex + 1,
          toSort: event.newDraggableIndex + 1,
        });
        if (res.errorCode !== 200) {
          this.disableDraggable = false;
          this.alim(res.errorMessage, this.errorColor);
        }
        this.disableDraggable = false;
        return this.getList(this.searchStoreSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    newAdvertiseStartDate(data) {
      this.searchDate = data;
    },
    getToday() {
      const date = this.$date().format("YYYY-MM-DD");
      this.searchDate = date;
    },
    showAdvertisingProduceOrganizationModal() {
      this.$modal.show(AdvertisingProduceOrganization, {}, getPopupOpt("AdvertisingProduceOrganization", "1100px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.date-box {
  display: flex;
  width: 300px;
  span {
    padding-top: 5px;
  }
}
.ad-manage {
  display: flex;
  justify-content: space-between;
  width: 100%;

  & .search-box {
    margin: 5px 0;
    display: flex;
    align-items: center;
    & input {
      flex: 1;
      border: 1px solid #000000;
      height: 28px;
      padding: 0 5px;
    }

    & button {
      margin-left: 5px;
    }
  }

  & .ad-list {
    width: 600px !important;
    & .border {
      min-height: 370px;
    }
  }

  & .ad-list-right {
    width: calc(100% - 610px);
  }

  & .btn-group {
    & input {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 10px;
    }
  }

  & .field {
    & .field-div {
      & .location {
        display: flex;
        align-content: center;
        & .pull-down {
          flex: 1;
          width: 130px;
          &:nth-child(2) {
            margin: 0 5px;
          }
        }
        & div {
          display: flex;
          align-items: center;
          & span {
            width: 50px !important;
          }
        }
      }
    }
  }
  .tbr2::v-deep {
    & th {
      padding: 0 5px;
      font-size: 1.2rem;
    }

    height: 70vh;

    overflow-y: scroll;
  }
  .tbr::v-deep {
    & td {
      text-align: center;
      height: 40px;
      font-size: 1.2rem;
      padding: 0 5px;
    }
  }
  .text-center::v-deep {
    height: 40px;
  }
  tfoot::v-deep {
    & td {
      text-align: center;
      font-size: 1.2rem !important;
    }
  }

  // & .section-box {
  //  width: calc(100% - 370px);
  //  & .border {
  //      & .field {
  //          & .required {
  //              font-weight: 700;
  //          }
  //      }
  //  }
  // }
}
.handle {
  cursor: pointer;
}
.activing {
  background: #c8cdda !important;
}
</style>
