<template>
  <modalWrap @close="$emit('close')">
    <template slot="head">
      <div class="modal-header v-application">
        <h2>광고 상품 매출 상세</h2>
        <div class="btn-group">
          <v-btn
            small
            color="primary"
            @click="
              __showModalTemplate(
                require('@/components/modal/common/VideoFileManage'),
                {
                  ids: buyAdvertisingProductSid,
                  tableName: videoTableName,
                  kindCode: videoKind,
                  referral: 'ad',
                },
                1200,
              )
            "
          >
            Video File 관리
          </v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <div class="v-application modal-body">
        <div class="content">
          <div class="top">
            <div class="left-section">
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="120" />
                  <col width="*" />
                  <col width="110" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>광고 상품 결제 고유코드</td>
                  <td><input type="text" v-model="buyAdvertisingProductSid" readonly /></td>
                  <td>상품 고유코드</td>
                  <td class="field-div">
                    <input type="text" class="input-first" v-model="advertisingProductSid" readonly />
                    <input type="text" class="input-last" v-model="advertisingProductName" readonly />
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td>컨텐츠 유무</td>
                  <td><input type="text" v-model="buyAdvertisingProductContentFlag" readonly /></td>
                  <td>컨텐츠 영상의 길이(초)</td>
                  <td><input type="text" v-model="buyAdvertisingContentLength" readonly /></td>
                </tr>
                <tr>
                  <td>예상 노출 횟수</td>
                  <td><input type="text" v-model="buyAdvertisingExposedCount" readonly /></td>
                  <td>할인(금액, 할인율)</td>
                  <td><input type="text" v-model="buyAdvertisingDiscount" readonly /></td>
                </tr>
                <tr>
                  <td>가격혜택 할인금액</td>
                  <td><input type="text" v-model="buyAdvertisingBenefitDiscount" readonly /></td>
                  <td>슬롯 복합 할인율</td>
                  <td><input type="text" v-model="buyAdvertisingSlotDiscountRatio" readonly /></td>
                </tr>
                <tr>
                  <td>슬롯 복합 할인금액</td>
                  <td><input type="text" v-model="buyAdvertisingSlotDiscount" readonly /></td>
                  <td>부가세율</td>
                  <td><input type="text" v-model="buyAdvertisingVatRatio" readonly /></td>
                </tr>
                <tr>
                  <td>부가세액</td>
                  <td><input type="text" v-model="buyAdvertisingVat" readonly /></td>
                  <td>기본 제안 금액</td>
                  <td><input type="text" v-model="buyAdvertisingDefaultPrice" readonly /></td>
                </tr>
                <tr>
                  <td>최종결제금액</td>
                  <td><input type="text" v-model="buyAdvertisingPayment" readonly /></td>
                  <td>광고시작일</td>
                  <td><input type="text" v-model="buyAdvertisingProductStartDate" readonly /></td>
                </tr>
                <tr>
                  <td>광고종료일</td>
                  <td><input type="text" v-model="buyAdvertisingProductEndDate" readonly /></td>
                  <td>광고 캠페인이름</td>
                  <td><input type="text" v-model="buyAdvertisingCampaignName" readonly /></td>
                </tr>
                <tr>
                  <td>구입 상품 진행 상태</td>
                  <td>
                    <pull-down
                      :clear="clearField"
                      :code="'SYS21C10B001'"
                      class="pull-down w90"
                      @selected="buyStatusSelected"
                      :data="buyAdvertisingStatus"
                    ></pull-down>
                    <v-btn class="ml5 mb5" small color="warning" @click="updateStatus">수정</v-btn>
                  </td>
                  <td>광고 편성여부</td>
                  <td><input type="text" v-model="buyAdvertisingOrganizeFlag" readonly /></td>
                </tr>
                <tr class="multi">
                  <td class="subject">지역리스트</td>
                  <td><textarea v-model="buyAdvertisingProductAreaChoiceName" readonly></textarea></td>
                  <td class="subject">등급리스트</td>
                  <td><textarea v-model="buyAdvertisingProductGradeChoiceName" readonly></textarea></td>
                </tr>
                <tr class="multi">
                  <td class="subject">광고 스토어 업종</td>
                  <td><textarea v-model="buyAdvertisingProductStoreTypeName" readonly></textarea></td>
                  <td class="subject">광고 카테고리</td>
                  <td><textarea v-model="buyAdvertisingProductCategoryName" readonly></textarea></td>
                </tr>
                <tr>
                  <td>슬롯수</td>
                  <td><input type="text" v-model="buyAdvertisingProductSlotCount" readonly /></td>
                  <td>가격할인</td>
                  <td><input type="text" v-model="buyAdvertisingProductSaleVal" readonly /></td>
                </tr>
                <tr>
                  <td>혜택</td>
                  <td><input type="text" v-model="buyAdvertisingProductBenefitChoiceVal" readonly /></td>
                  <td>증정</td>
                  <td><input type="text" v-model="buyAdvertisingProductGiftVal" readonly /></td>
                </tr>
                <tr class="multi">
                  <td class="subject">증정스토어</td>
                  <td colspan="3"><textarea v-model="buyAdvertisingProductGiftStoreList" readonly></textarea></td>
                </tr>
                <tr class="multi">
                  <td class="subject">기타특이사항</td>
                  <td colspan="3"><textarea v-model="buyAdvertisingEtc" readonly></textarea></td>
                </tr>
              </table>
            </div>

            <div class="right-section">
              <table class="tbl mt20 user-list-tbl">
                <caption>
                  광고 상품 매출 상세
                </caption>
                <colgroup>
                  <col width="85" />
                  <col width="87" />
                  <col width="*" />
                  <col width="70" />
                  <col width="122" />
                  <col width="50" />
                  <col width="50" />
                  <col width="50" />
                  <col width="50" />
                </colgroup>
                <thead>
                  <tr>
                    <th>고유코드</th>
                    <th>스토어고유코드</th>
                    <th>스토어명</th>
                    <th>스토어등급</th>
                    <th>광고운영시간</th>
                    <th>총운영시간</th>
                    <th>구매슬롯수</th>
                    <th>증정슬롯수</th>
                    <th>1일노출횟수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in storeList" :key="index">
                    <td>{{ item.buySid }}</td>
                    <td>{{ item.companyStoreSid }}</td>
                    <td class="left">{{ item.companyStoreName }}</td>
                    <td>{{ item.buyStoreListGradeName }}</td>
                    <td class="left">{{ item.buyStoreListScheduleTime }}</td>
                    <td>{{ item.buyStoreListTotalScheduleTime }}</td>
                    <td>{{ item.buyStoreListSlotCount }}</td>
                    <td>{{ item.buyStoreListGiftSlotCount }}</td>
                    <td>{{ item.buyStoreListDisplayCount }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="storeList.length < 1">
                  <tr>
                    <td colspan="9">항목이 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
import modalMixin from "@/mixins/showModal";
import alim from "@/components/dialog/Alim.vue";
import PullDown from "@/components/form/PullDown";
import alimMixin from "@/mixins/alim.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, alim, PullDown },
  mixins: [modalMixin, alimMixin],
  props: {
    buySid: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      count: 0,
      //게시물 설정
      list: [],

      buyAdvertisingProductSid: "",
      videoKind: "",
      videoTableName: "",
      advertisingProductSid: "",
      advertisingProductName: "",
      buyAdvertisingProductContentFlag: "",
      buyAdvertisingContentLength: "",
      buyAdvertisingExposedCount: "",
      buyAdvertisingDiscount: "",
      buyAdvertisingBenefitDiscount: "",
      buyAdvertisingSlotDiscountRatio: "",
      buyAdvertisingSlotDiscount: "",
      buyAdvertisingVatRatio: "",
      buyAdvertisingVat: "",
      buyAdvertisingDefaultPrice: "",
      buyAdvertisingPayment: "",
      buyAdvertisingProductStartDate: "",
      buyAdvertisingProductEndDate: "",
      buyAdvertisingCampaignName: "",
      buyAdvertisingStatus: "",
      buyAdvertisingStatusName: "",
      buyAdvertisingOrganizeFlag: "",
      //
      buyAdvertisingProductAreaChoice: "",
      buyAdvertisingProductAreaChoiceName: "",
      buyAdvertisingProductGradeChoice: "",
      buyAdvertisingProductGradeChoiceName: "",
      buyAdvertisingProductStoreType: "",
      buyAdvertisingProductStoreTypeName: "",
      buyAdvertisingProductCategory: "",
      buyAdvertisingProductCategoryName: "",
      buyAdvertisingEtc: "",
      buyAdvertisingProductSlotCount: "",
      buyAdvertisingProductSaleVal: "",
      buyAdvertisingProductBenefitChoiceVal: "",
      buyAdvertisingProductGiftVal: "",
      buyAdvertisingProductGiftStoreList: "",
      storeList: [],

      clearField: false,
    };
  },
  computed: {
    ...mapGetters("sales", ["getBuyPaymentAdvertising", "buyRunStatus"]),
  },
  mounted() {
    if ((this.buySid || "") !== "") {
      this.getDetail();
    }
  },
  methods: {
    // 광고상품 매출 상세
    async getDetail() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/GET_BUY_PAYMENT_ADVERTISING", this.buySid);
        const res = this.getBuyPaymentAdvertising.channeltuneApiResult;

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.advertisingProduct;
        this.buyAdvertisingProductSid = data.buyAdvertisingProductSid;
        this.videoKind = data.videoKind;
        this.videoTableName = data.videoTableName;
        this.advertisingProductSid = data.advertisingProductSid;
        this.advertisingProductName = data.advertisingProductName;
        this.buyAdvertisingProductContentFlag = data.buyAdvertisingProductContentFlag;
        this.buyAdvertisingContentLength = data.buyAdvertisingContentLength;
        this.buyAdvertisingExposedCount = data.buyAdvertisingExposedCount;
        this.buyAdvertisingDiscount = data.buyAdvertisingDiscount;
        this.buyAdvertisingBenefitDiscount = data.buyAdvertisingBenefitDiscount;
        this.buyAdvertisingSlotDiscountRatio = data.buyAdvertisingSlotDiscountRatio;
        this.buyAdvertisingSlotDiscount = data.buyAdvertisingSlotDiscount;
        this.buyAdvertisingVatRatio = data.buyAdvertisingVatRatio;
        this.buyAdvertisingVat = data.buyAdvertisingVat;
        this.buyAdvertisingDefaultPrice = data.buyAdvertisingDefaultPrice;
        this.buyAdvertisingPayment = data.buyAdvertisingPayment;
        this.buyAdvertisingProductStartDate = data.buyAdvertisingProductStartDate;
        this.buyAdvertisingProductEndDate = data.buyAdvertisingProductEndDate;
        this.buyAdvertisingCampaignName = data.buyAdvertisingCampaignName;
        this.buyAdvertisingStatus = data.buyAdvertisingStatus;
        this.buyAdvertisingStatusName = data.buyAdvertisingStatusName;
        this.buyAdvertisingOrganizeFlag = data.buyAdvertisingOrganizeFlag;

        this.buyAdvertisingProductAreaChoice = data.buyAdvertisingProductAreaChoice;
        this.buyAdvertisingProductAreaChoiceName = this.injectToTextarea(data.buyAdvertisingProductAreaChoiceName);
        this.buyAdvertisingProductGradeChoice = data.buyAdvertisingProductGradeChoice;
        this.buyAdvertisingProductGradeChoiceName = this.injectToTextarea(data.buyAdvertisingProductGradeChoiceName);
        this.buyAdvertisingProductStoreType = data.buyAdvertisingProductStoreType;
        this.buyAdvertisingProductStoreTypeName = this.injectToTextarea(data.buyAdvertisingProductStoreTypeName);
        this.buyAdvertisingProductCategory = data.buyAdvertisingProductCategory;
        this.buyAdvertisingProductCategoryName = this.injectToTextarea(data.buyAdvertisingProductCategoryName);
        this.buyAdvertisingEtc = data.buyAdvertisingEtc;
        this.buyAdvertisingProductSlotCount = data.buyAdvertisingProductSlotCount;
        this.buyAdvertisingProductSaleVal = data.buyAdvertisingProductSaleVal;
        this.buyAdvertisingProductBenefitChoiceVal = data.buyAdvertisingProductBenefitChoiceVal;
        this.buyAdvertisingProductGiftVal = data.buyAdvertisingProductGiftVal;
        this.buyAdvertisingProductGiftStoreList = this.injectToTextarea(data.buyAdvertisingProductGiftStoreList);
        this.storeList = data.storList;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    injectToTextarea(arr) {
      let str = "";
      if (typeof arr !== "string" && arr !== null && arr.length > 0) {
        arr.forEach(e => {
          str += `${e.sysCodeName}\n`;
        });
      }

      return str;
    },
    buyStatusSelected({ sysCodeSid, sysCodeName }) {
      this.buyAdvertisingStatus = sysCodeSid;
      this.buyAdvertisingStatusName = sysCodeName;
    }, //advertising
    async updateStatus() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/BUY_RUN_STATUS", {
          sid: this.buyAdvertisingProductSid,
          buyKind: "advertising",
          status: this.buyAdvertisingStatus,
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
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  height: 700px;
  overflow-y: auto;
}

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
  width: 100%;
  & .top {
    width: 100%;
    display: flex;

    & .left-section {
      padding: 10px;
      width: 600px;
    }

    & .right-section {
      padding: 10px;
      width: calc(100% - 600px);
      & .column {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        &.one {
          & :nth-child(1) {
            width: 100%;
            & input,
            textarea {
              width: calc(100% - 0px);
            }
          }
        }

        & > div {
          width: 340px;
          & input,
          textarea {
            background: #ffffff;
            border: 1px solid #aaaaaa;
          }
        }
      }

      & .v-column {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        & > div {
          width: 340px;
          display: flex;
          align-items: center;
          & .title {
            width: 120px;
          }

          & > input {
            background: #ffffff;
            border: 1px solid #aaaaaa;
            height: 30px;
            width: calc(100% - 0px);
            padding: 0 10px;
          }
        }
      }
    }
  }
  & table {
    & th {
      letter-spacing: -1px;
    }
    & td {
      letter-spacing: -1px;
    }
    & .input-first {
      width: 80px !important;
    }
    & .input-last {
      width: calc(100% - 85px) !important;
      margin: 0 0 0 5px !important;
    }
    & .multi {
      & .subject {
        vertical-align: top;
        padding-top: 5px;
      }
      & textarea {
        height: 70px;
      }
    }
  }
}
</style>
