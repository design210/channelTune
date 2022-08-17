<template>
  <modalWrap @close="close" :hideLine="true">
    <template slot="head">
      <h2>누적 정산 상세</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="right-column init-wrap section-box border-outside">
          <div class="border">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>업체/개인 코드</td>
                <td><input type="text" :value="settlement.companySid" readonly /></td>
                <td>정산년월</td>
                <td><input type="text" readonly v-model="yearSetting" /></td>
              </tr>
              <tr>
                <td>업체/개인 명</td>
                <td><input type="text" :value="settlement.companyName" readonly /></td>
                <td>입금 은행</td>
                <td>
                  <pull-down :data="bankKind" code="SYS21C30B100" @selected="bankNameProp" class="pull-down filed" :readOnly="!btnToggle"></pull-down>
                </td>
              </tr>
              <tr>
                <td>예금주</td>
                <td><input type="text" v-model="settlement.settlementDepositBankAccountHolder" :readonly="!btnToggle" /></td>
                <td>계좌번호</td>
                <td>
                  <input type="text" v-model="settlement.settlementDepositBankAccount" placeholder="'-' 빼고 입력해 주세요." :readonly="!btnToggle" />
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>당월 정산액</td>
                <td colspan="2"><input class="right" type="text" readonly v-model="settlementDepositPrice" /></td>
                <td>이월 누적 액</td>
                <td colspan="2"><input class="right" type="text" readonly v-model="settlementDepositCarryoverPrice" /></td>
              </tr>
              <tr>
                <td>결제 방법</td>
                <td colspan="2">
                  <pull-down
                    :data="settlementDepositTaxKind"
                    code="SYS22330B002"
                    @selected="settlementDepositTaxKindNameProp"
                    class="pull-down filed"
                    :readOnly="!btnToggle"
                  ></pull-down>
                </td>
                <td>총 정산 액</td>
                <td colspan="2"><input class="right" type="text" readonly v-model="totalPrice" /></td>
              </tr>
              <tr>
                <td>원천징수 소득세</td>
                <td><input type="text" class="right" readonly v-model="settlementDepositIncomeTaxPrice" /></td>
                <td>원천징수 지방세</td>
                <td><input type="text" class="right" readonly v-model="settlementDepositLocalTaxPrice" /></td>
                <td>세금합계 / 부과세</td>
                <td><input type="text" class="right" readonly v-model="settlementDepositTaxPrice" /></td>
              </tr>
              <tr>
                <td>당월 실 지급액</td>
                <td colspan="2"><input class="right" type="text" readonly v-model="settlementDepositPaymentPrice" /></td>
                <td>실 지급액 수정</td>
                <td colspan="2"><input class="right" type="text" v-model="updateSettlementPrice" :readonly="!btnToggle" /></td>
              </tr>
              <tr>
                <td>지급 후 차액</td>
                <td colspan="2"><input class="right" type="text" readonly v-model="settlementDepositDifferencePrice" /></td>
                <td>처리 결과</td>
                <td colspan="2">
                  <input type="text" readonly v-model="settlement.settlementDepositStatusDoc" />
                </td>
              </tr>
            </table>

            <!-- 알럿 -->
            <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
            <!-- 사진파일 삭제 컨펌 -->
            <confirm
              :type="type"
              :open="dialog"
              :txt="dialogText"
              :h1="dialogTitle"
              @resetConfirm="emitResetConfirm"
              :deleteText="deleteText"
            ></confirm>
          </div>
        </section>
        <div class="btn-container">
          <div class="d-flex">
            <div v-if="btnToggle">
              <v-btn color="primary" class="mr5" @click="updateCheck('SYS22511B014')">지급처리</v-btn>
              <v-btn color="warning" class="ml5 mr5" @click="updateCheck('SYS22511B012')">지급 불가 처리</v-btn>
            </div>
            <v-btn v-else class="ml5" color="success" @click="customConfirm('pro')">처리</v-btn>
            <v-btn class="ml5" @click="close">닫기</v-btn>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import PullDown from "@/components/form/PullDown.vue";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    PullDown,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["settlementDepositSid"],
  data() {
    return {
      settlementDepositStatus: "",
      settlementDepositStatusDoc: "",
      settlementDepositTaxKind: "",
      settlementDepositTaxKindName: "",
      updateSettlementPrice: "",
      bankKind: "",
      bankKindName: "",
      settlement: {},
      unChangedObj: {},
      btnToggle: true,

      confirmTitle: "누적 정산 처리",
      confirmText: "누적 정산 처리를 확정 하시겠습니까?",
      deleteText: "처리",
    };
  },
  computed: {
    ...mapGetters("settlementProcessing", ["settlementDepositDetail", "settlementUpdateCheck"]),
    ...mapGetters("systemCode", ["getCodeDetail"]),
    yearSetting() {
      if (this.settlement.settlementDepositYear !== undefined) {
        return this.settlement.settlementDepositYear + " / " + this.settlement.settlementDepositMonth;
      }
    },
    //당월 정산액
    settlementDepositPrice: {
      get() {
        if (this.settlement.settlementDepositPrice !== undefined) {
          return this.comma(this.settlement.settlementDepositPrice);
        }
      },
    },
    //이월 누적 액
    settlementDepositCarryoverPrice() {
      if (this.settlement.settlementDepositCarryoverPrice !== undefined) {
        return this.comma(this.settlement.settlementDepositCarryoverPrice);
      }
    },
    //총 정산 액
    totalPrice() {
      if (this.settlement.settlementDepositPrice !== undefined) {
        const total = Math.floor(this.settlement.settlementDepositPrice) + Math.floor(this.settlement.settlementDepositCarryoverPrice);
        return this.comma(total);
      }
    },
    //원천징수 소득세
    settlementDepositIncomeTaxPrice() {
      if (this.settlement.settlementDepositIncomeTaxPrice !== undefined) {
        return this.comma(this.settlement.settlementDepositIncomeTaxPrice);
      }
    },
    //원천징수 지방세
    settlementDepositLocalTaxPrice() {
      if (this.settlement.settlementDepositLocalTaxPrice !== undefined) {
        return this.comma(this.settlement.settlementDepositLocalTaxPrice);
      }
    },
    //세금합계
    settlementDepositTaxPrice() {
      if (this.settlement.settlementDepositTaxPrice !== undefined) {
        return this.comma(this.settlement.settlementDepositTaxPrice);
      }
    },
    //당월 실 지급액
    settlementDepositPaymentPrice() {
      if (this.settlement.settlementDepositPaymentPrice !== undefined) {
        return this.comma(this.settlement.settlementDepositPaymentPrice);
      }
    },
    //지급 후 차액
    settlementDepositDifferencePrice() {
      if (this.settlement.settlementDepositDifferencePrice !== undefined) {
        return this.comma(this.settlement.settlementDepositDifferencePrice);
      }
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    comma(val) {
      const parts = String(Math.floor(val)).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    close() {
      this.$emit("close");
    },
    settlementDepositTaxKindNameProp(data) {
      this.settlementDepositTaxKind = data.sysCodeSid;
      this.settlementDepositTaxKindName = data.sysCodeName;
    },
    bankNameProp(data) {
      this.bankKind = data.sysCodeSid;
      this.bankKindName = data.sysCodeName;
    },
    settlementDepositStatusDocProp(data) {
      this.settlementDepositStatus = data.sysCodeSid;
      this.settlementDepositStatusDoc = data.sysCodeName;
    },
    //상세 조회
    async getDetail() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/SETTLEMENT_DEPOSIT_DETAIL", this.settlementDepositSid);
        const res = this.settlementDepositDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.settlement = res.settlementDeposit;
        this.settlementDepositTaxKind = res.settlementDeposit.settlementDepositTaxKind;
        if (this.settlementDepositTaxKind !== null) {
          await this.$store.dispatch("systemCode/GET_CODE_DETAIL", this.settlementDepositTaxKind);
          const ress = this.getCodeDetail.channeltuneApiResult.sysCodeList.sysCodeName;
          this.settlementDepositTaxKindName = ress;
        }
        this.bankKind = res.settlementDeposit.settlementDepositBank;
        this.updateSettlementPrice = this.comma(res.settlementDeposit.settlementDepositPaymentPrice);
        if (this.bankKind !== null) {
          await this.$store.dispatch("systemCode/GET_CODE_DETAIL", res.settlementDeposit.settlementDepositBank);
          const ress = this.getCodeDetail.channeltuneApiResult.sysCodeList.sysCodeName;
          this.bankKindName = ress;
        }
        //바뀌지 않을 값을 저장
        this.unChangedObj = {
          companySid: res.settlementDeposit.companySid,
          settlementDepositYear: res.settlementDeposit.settlementDepositYear,
          settlementDepositMonth: res.settlementDeposit.settlementDepositMonth,
          companyName: res.settlementDeposit.companyName,
        };
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //체크 함수
    async updateCheck(toggle) {
      let obj = {};
      if (toggle === "SYS22511B012") {
        //지급불가
        obj = { settlementDepositStatus: "SYS22511B012", settlementDepositStatusDoc: "지급불가(결제 방법 확인불가)" };
      } else if (toggle === "SYS22511B014") {
        //지급 처리
        obj = { settlementDepositStatus: "SYS22511B014", settlementDepositStatusDoc: "지급처리" };
      }
      let params = {
        id: this.settlementDepositSid,
        companyPaymentKind: this.settlementDepositTaxKind,
        settlementDepositPrice: this.updateSettlementPrice.replace(/,/g, ""),
        settlementDepositBank: this.bankKind,
        action: "check",
        settlementDepositBankAccount: this.settlement.settlementDepositBankAccount,
        settlementDepositBankAccountHolder: this.settlement.settlementDepositBankAccountHolder,
        ...obj, //지급 객체도 함께 보냄
      };
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/SETTLEMENT_UPDATE_CHECK", params);
        const res = this.settlementUpdateCheck.channeltuneApiResult;

        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        //바뀌지 않는 값도 같이 저장
        this.settlement = { ...res.settlement, ...this.unChangedObj };
        this.settlementDepositTaxKind = res.settlement.settlementDepositTaxKind;
        if (this.settlementDepositTaxKind !== null) {
          await this.$store.dispatch("systemCode/GET_CODE_DETAIL", this.settlementDepositTaxKind);
          const ress = this.getCodeDetail.channeltuneApiResult.sysCodeList.sysCodeName;
          this.settlementDepositTaxKindName = ress;
        }
        this.bankKind = res.settlement.settlementDepositBank;
        this.updateSettlementPrice = this.comma(res.settlement.settlementDepositPaymentPrice);
        if (this.bankKind !== null) {
          await this.$store.dispatch("systemCode/GET_CODE_DETAIL", res.settlement.settlementDepositBank);
          const ress = this.getCodeDetail.channeltuneApiResult.sysCodeList.sysCodeName;
          this.bankKindName = ress;
        }
        this.btnToggle = !this.btnToggle;
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //처리 버튼
    async emitResetConfirm({ del, type }) {
      if (del === "Y") {
        if (type === "list") {
          let params = {
            id: this.settlementDepositSid,
            companyPaymentKind: this.settlementDepositTaxKind,
            settlementDepositPrice: this.updateSettlementPrice.replace(/,/g, ""),
            settlementDepositBank: this.bankKind,
            settlementDepositBankAccount: this.settlement.settlementDepositBankAccount,
            settlementDepositBankAccountHolder: this.settlement.settlementDepositBankAccountHolder,
            settlementDepositStatus: this.settlement.settlementDepositStatus,
            action: "update",
            settlementDepositStatusDoc: this.settlement.settlementDepositStatusDoc,
          };
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("settlementProcessing/SETTLEMENT_UPDATE_CHECK", params);
            const res = this.settlementUpdateCheck.channeltuneApiResult;
            if (res.errorCode !== 200) {
              return this.alim(res.errorMessage, this.errorColor);
            }
            await this.getDetail();
            this.btnToggle = !this.btnToggle;
            this.alim(res.errorMessage, this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  display: block !important;
  & .right-column {
    width: 100%;
    overflow-y: auto;
    max-height: 800px;
  }
  & .tbl-reg {
    & tr {
      & td {
        text-align: right;
        padding-right: 10px;
        & .date {
          width: 100% !important;
        }
        & .etc {
          & input[type="text"] {
            width: 250px;
            margin-left: 20px;
          }
        }
      }
    }
  }
  & .url-create {
    & input {
      width: calc(100% - 160px) !important;
      margin: 0 10px 0 3px;
    }
  }
  & .btn-container {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>
