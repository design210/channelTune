<template>
  <modalWrap @close="$emit('close')">
    <template slot="head">
      <div class="modal-header v-application">
        <h2>영상 상품 매출 상세</h2>

        <div class="btn-group d-flex">
          <v-select outlined class="select-basic" v-model="languagebtn" item-text="key" item-value="value" :items="languageSetArr" />
          <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, languagebtn)">언어셋</v-btn>
          <v-btn
            small
            color="primary"
            @click="
              __showModalTemplate(
                require('@/components/modal/common/VideoFileManage'),
                {
                  sid: buyAdvertisingProductVideoSid,
                  tableName: videoTableName,
                  kindCode: videoKind,
                  referral: 'video',
                },
                1200
              )
            "
          >
            Video File 관리
          </v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <div class="v-application">
        <div class="content">
          <div class="top">
            <table width="100%" class="tbl-reg column2 mt0">
              <colgroup>
                <col width="130" />
                <col width="*" />
                <col width="130" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>영상 상품 결제 고유코드</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoSid" readonly /></td>
                <td>상품 고유코드</td>
                <td class="field-div">
                  <input type="text" class="input-first" v-model="advertisingProductSid" readonly />
                  <input type="text" class="input-last" v-model="advertisingProductName" readonly />
                </td>
              </tr>
              <tr>
                <td>연락처</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoHp" readonly /></td>
                <td>영상 필요 일정</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoDate" readonly /></td>
              </tr>
              <tr>
                <td>영상 길이</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoLengthName" readonly /></td>
                <td>참고영상</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoSampleUrl" readonly /></td>
              </tr>
              <tr>
                <td>기본제안금액</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoDefaultPrice" readonly /></td>
                <td>부가세율</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoVatRatio" readonly /></td>
              </tr>
              <tr>
                <td>부가세액</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoVat" readonly /></td>
                <td>최종결제금액</td>
                <td><input type="text" v-model="buyAdvertisingProductVideoPayment" readonly /></td>
              </tr>
              <tr>
                <td>구입상품 진행 상태</td>
                <td>
                  <pull-down
                    :clear="clearField"
                    :code="'SYS21C23B001'"
                    class="pull-down w160"
                    @selected="buyStatusSelected"
                    :data="buyAdvertisingProductVideoStatus"
                  ></pull-down>
                  <v-btn class="ml5 mb5" small color="warning" @click="updateStatus">수정</v-btn>
                </td>
              </tr>
              <tr>
                <td>기타내용</td>
                <td colspan="3"><textarea v-model="buyAdvertisingProductVideoEtc" readonly></textarea></td>
              </tr>
            </table>
          </div>
        </div>

        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import { getPopupOpt } from "@/utils/modal";
import modalMixin from "@/mixins/showModal";
import PullDown from "@/components/form/PullDown";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import loading from "@/mixins/loading";
export default {
  components: { modalWrap, alim, PullDown },
  mixins: [modalMixin, alimMixin, loading],
  props: {
    buySid: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      buyAdvertisingProductVideoSid: "",
      videoKind: "",
      videoTableName: "",
      advertisingProductSid: "",
      advertisingProductName: "",
      buyAdvertisingProductVideoHp: "",
      buyAdvertisingProductVideoDate: "",
      buyAdvertisingProductVideoLength: "",
      buyAdvertisingProductVideoSampleUrl: "",
      buyAdvertisingProductVideoDefaultPrice: "",
      buyAdvertisingProductVideoVatRatio: "",
      buyAdvertisingProductVideoVat: "",
      buyAdvertisingProductVideoPayment: "",
      buyAdvertisingProductVideoLengthName: "",
      buyAdvertisingProductVideoStatus: "",
      buyAdvertisingProductVideoStatusName: "",
      buyAdvertisingProductVideoEtc: "",

      clearField: false,

      languagebtn: "",
      languageSetArr: [
        {
          key: "연락처",
          value: "buyAdvertisingProductVideoHp",
        },
        {
          key: "영상길이",
          value: "buyAdvertisingProductVideoLength",
        },
        {
          key: "참고영상",
          value: "buyAdvertisingProductVideoSampleUrl",
        },
        {
          key: "구입상품 진행 상태",
          value: "buyAdvertisingProductVideoStatus",
        },
        {
          key: "기타 내용",
          value: "buyAdvertisingProductVideoEtc",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("sales", ["getBuyPaymentVideo", "buyRunStatus"]),
  },
  mounted() {
    if ((this.buySid || "") !== "") {
      this.getDetail();
    }
  },
  methods: {
    async getDetail() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/GET_BUY_PAYMENT_VIDEO", this.buySid);
        const res = this.getBuyPaymentVideo.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.buyProduct;
        this.buyAdvertisingProductVideoSid = data.buyAdvertisingProductVideoSid;
        this.videoKind = data.videoKind;
        this.videoTableName = data.videoTableName;
        this.advertisingProductSid = data.advertisingProductSid;
        this.advertisingProductName = data.advertisingProductName;
        this.buyAdvertisingProductVideoHp = data.buyAdvertisingProductVideoHp;
        this.buyAdvertisingProductVideoDate = data.buyAdvertisingProductVideoDate;
        this.buyAdvertisingProductVideoLength = isEmpty(data.buyAdvertisingProductVideoLength);
        this.buyAdvertisingProductVideoSampleUrl = data.buyAdvertisingProductVideoSampleUrl;
        this.buyAdvertisingProductVideoDefaultPrice = data.buyAdvertisingProductVideoDefaultPrice;
        this.buyAdvertisingProductVideoVatRatio = data.buyAdvertisingProductVideoVatRatio;
        this.buyAdvertisingProductVideoVat = data.buyAdvertisingProductVideoVat;
        this.buyAdvertisingProductVideoLengthName = data.buyAdvertisingProductVideoLengthName;
        this.buyAdvertisingProductVideoPayment = data.buyAdvertisingProductVideoPayment;
        this.buyAdvertisingProductVideoStatus = data.buyAdvertisingProductVideoStatus;
        this.buyAdvertisingProductVideoStatusName = data.buyAdvertisingProductVideoStatusName;
        this.buyAdvertisingProductVideoEtc = data.buyAdvertisingProductVideoEtc;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    buyStatusSelected({ sysCodeSid, sysCodeName }) {
      this.buyAdvertisingProductVideoStatus = sysCodeSid;
      this.buyAdvertisingProductVideoStatusName = sysCodeName;
    },
    async updateStatus() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/BUY_RUN_STATUS", {
          sid: this.buyAdvertisingProductVideoSid,
          buyKind: "video",
          status: this.buyAdvertisingProductVideoStatus,
        });
        const res = this.buyRunStatus.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showLanguageSetModalPopup(id, name) {
      if (this.languagebtn === "") {
        return this.alim("설정할 언어셋을 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "advertisingProduct",
          tableSid: String(this.buyAdvertisingProductVideoSid),
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .btn-group {
    margin-right: 20px;
    & button {
      margin-right: 5px;
    }
  }
}

.content {
  & .top {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
.input-first {
  width: 80px !important;
}
.input-last {
  width: calc(100% - 85px) !important;
  margin: 0 0 0 5px !important;
}
</style>
