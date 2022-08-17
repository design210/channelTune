<template>
  <div>
    <div class="d-flex justify-space-between mt50">
      <h2>스토어 계약</h2>
      <div class="contract-type">
        <span class="subject required">계약유형</span>
        <span class="select"
          ><pull-down :readOnly="read" :data="contractStoreKind" :code="typeCode" @selected="contractStoreKindNameProp" class="pull-down"></pull-down
        ></span>
      </div>
    </div>
    <div class="tbl-div-line mt10"></div>
    <table width="100%" class="tbl-reg column2">
      <colgroup>
        <col width="80" />
        <col width="*" />
        <col width="80" />
        <col width="*" />
        <col width="80" />
        <col width="*" />
        <col width="100" />
        <col width="*" />
      </colgroup>
      <tbody v-show="contractStoreKind === 'SYS21811B014'">
        <tr>
          <td colspan="8"><h3>1. 광고형 수수료</h3></td>
        </tr>
        <tr>
          <td colspan="6">
            월 광고 매출 금액의 <input type="text" style="width: 60px" v-model="contractStore_advertisingRate" /> % 를 수수료로 한다.
          </td>
          <td>임대료</td>
          <td><input type="text" v-model="contractStore_advertisingRentFee" /></td>
        </tr>
      </tbody>
      <tbody v-show="contractStoreKind === 'SYS21811B015'">
        <tr>
          <td colspan="8"><h3>2. 판매형 이용료</h3></td>
        </tr>
        <tr>
          <td>판매금액</td>
          <td colspan="3"><input type="text" style="width: 200px" v-model="contractStore_salePrice" /></td>
          <td colspan="3" class="radio">
            <v-radio-group class="align-center" mandatory v-model="contractStore_salePriceVatFlag">
              <v-radio label="VAT 별도" value="VAT별도"></v-radio>
              <v-radio label="VAT 포함" value="VAT포함"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <td>선금 날짜</td>
          <td><date-picker :propdate="contractStore_saleAdvanceDate" @updateDate="contractStore_saleAdvanceDateProp"></date-picker></td>
          <td>중도금 날짜</td>
          <td><date-picker :propdate="contractStore_saleMiddleDate" @updateDate="contractStore_saleMiddleDateProp"></date-picker></td>
          <td>잔금 날짜</td>
          <td><date-picker :propdate="contractStore_saleBalanceDate" @updateDate="contractStore_saleBalanceDateProp"></date-picker></td>
          <td>월 이용료 결제 날짜</td>
          <td>
            <date-picker nudge="300" :propdate="contractStore_saleMonthPayDate" @updateDate="contractStore_saleMonthPayDateProp"></date-picker>
          </td>
        </tr>
        <tr>
          <td>선금 금액</td>
          <td>
            <input type="text" v-model="contractStore_saleAdvancePayment" />
          </td>
          <td>중도금 금액</td>
          <td>
            <input type="text" v-model="contractStore_saleMiddlePayment" />
          </td>
          <td>잔금 금액</td>
          <td>
            <input type="text" v-model="contractStore_saleBalancePayment" />
          </td>
          <td>월 이용료</td>
          <td>
            <input type="text" v-model="contractStore_saleMonthPay" />
          </td>
        </tr>
      </tbody>
      <tbody v-show="contractStoreKind === 'SYS21811B016'">
        <tr>
          <td colspan="8"><h3>3. 임대형 이용료</h3></td>
        </tr>
        <tr>
          <td>임대요금(월)</td>
          <td colspan="3"><input type="text" style="width: 200px" v-model="contractStore_monthRentFee" /> (VAT 별도)</td>
          <td>임대요금 결제날짜</td>
          <td colspan="2"><input type="text" v-model="contractStore_monthRentPayDay" style="width: 100px" /></td>
        </tr>
        <tr>
          <td>임대시작 날짜</td>
          <td><date-picker :propdate="contractStore_rentStartDate" @updateDate="contractStore_rentStartDateProp"></date-picker></td>
          <td>임대종료 날짜</td>
          <td><date-picker :propdate="contractStore_rentEnddate" @updateDate="contractStore_rentEnddateProp"></date-picker></td>
          <td>개월수</td>
          <td>
            <input type="text" v-model="contractStore_rentMonths" />
          </td>
          <td colspan="2"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PullDown from "@/components/form/PullDown.vue";
import DatePicker from "@/components/form/DatePicker.vue";
export default {
  components: { PullDown, DatePicker },
  props: ["status", "storeContract", "read"],
  data() {
    return {
      typeCode: "SYS21811B013",
      contractStoreKindName: "",
      contractStoreKind: "",
      contractStore_advertisingRentFee: "",
      contractStore_advertisingRate: "",
      contractStore_salePrice: "",
      contractStore_salePriceVatFlag: "Y",
      contractStore_saleAdvanceDate: "",
      contractStore_saleMiddleDate: "",
      contractStore_saleBalanceDate: "",
      contractStore_saleMonthPayDate: "",
      contractStore_saleAdvancePayment: "",
      contractStore_saleMiddlePayment: "",
      contractStore_saleBalancePayment: "",
      contractStore_saleMonthPay: "",
      contractStore_monthRentFee: "",
      contractStore_monthRentPayDay: "",
      contractStore_rentStartDate: "",
      contractStore_rentEnddate: "",
      contractStore_rentMonths: "",

      readonlys: false,
    };
  },
  watch: {
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
    storeContract(val) {
      this.getObjData(val);
    },
  },
  mounted() {
    this.clear();
    this.getObjData(this.storeContract);
  },
  methods: {
    getObjData(obj) {
      if (Object.keys(obj).length !== 0) {
        this.clear();
        this.contractStoreKindName = this.storeContract.contractStoreKindName;
        this.contractStoreKind = this.storeContract.contractStoreKind;
        this.contractStore_advertisingRentFee = this.storeContract.contractStore_advertisingRentFee;
        this.contractStore_advertisingRate = this.storeContract.contractStore_advertisingRate;
        this.contractStore_salePrice = this.storeContract.contractStore_salePrice;
        this.contractStore_salePriceVatFlag = this.storeContract.contractStore_salePriceVatFlag;
        this.contractStore_saleAdvanceDate = this.storeContract.contractStore_saleAdvanceDate;
        this.contractStore_saleMiddleDate = this.storeContract.contractStore_saleMiddleDate;
        this.contractStore_saleBalanceDate = this.storeContract.contractStore_saleBalanceDate;
        this.contractStore_saleMonthPayDate = this.storeContract.contractStore_saleMonthPayDate;
        this.contractStore_saleAdvancePayment = this.storeContract.contractStore_saleAdvancePayment;
        this.contractStore_saleMiddlePayment = this.storeContract.contractStore_saleMiddlePayment;
        this.contractStore_saleBalancePayment = this.storeContract.contractStore_saleBalancePayment;
        this.contractStore_saleMonthPay = this.storeContract.contractStore_saleMonthPay;
        this.contractStore_monthRentFee = this.storeContract.contractStore_monthRentFee;
        this.contractStore_monthRentPayDay = this.storeContract.contractStore_monthRentPayDay;
        this.contractStore_rentStartDate = this.storeContract.contractStore_rentStartDate;
        this.contractStore_rentEnddate = this.storeContract.contractStore_rentEnddate;
        this.contractStore_rentMonths = this.storeContract.contractStore_rentMonths;
      }
    },
    contractStoreKindNameProp(data) {
      this.contractStoreKind = data.sysCodeSid;
      this.contractStoreKindName = data.sysCodeName;
    },
    contractStore_saleAdvanceDateProp(data) {
      this.contractStore_saleAdvanceDate = data;
    },
    contractStore_saleMiddleDateProp(data) {
      this.contractStore_saleMiddleDate = data;
    },
    contractStore_saleBalanceDateProp(data) {
      this.contractStore_saleBalanceDate = data;
    },
    contractStore_saleMonthPayDateProp(data) {
      this.contractStore_saleMonthPayDate = data;
    },
    contractStore_rentStartDateProp(data) {
      this.contractStore_rentStartDate = data;
    },
    contractStore_rentEnddateProp(data) {
      this.contractStore_rentEnddate = data;
    },
    returnEmitData() {
      if (this.contractStoreKindName === "" || this.contractStoreKindName === null) {
        return this.$emit("alims", "계약 유형을 선택해주세요");
      }
      if (this.contractStoreKind === "SYS21811B014") {
        if (this.contractStore_advertisingRate === "" || this.contractStore_advertisingRate === null) {
          return this.$emit("alims", "수수료를 입력해주세요");
        }
        if (this.contractStore_advertisingRentFee === "" || this.contractStore_advertisingRentFee === null) {
          return this.$emit("alims", "임대료를 입력해주세요.");
        }
      }
      if (this.contractStoreKind === "SYS21811B015") {
        if (this.contractStore_salePrice === "" || this.contractStore_salePrice === null) {
          return this.$emit("alims", "판매금액을 입력해주세요.");
        }
        if (this.contractStore_saleAdvanceDate === "" || this.contractStore_saleAdvanceDate === null) {
          return this.$emit("alims", "선금날짜를 입력해주세요.");
        }
        if (this.contractStore_saleMiddleDate === "" || this.contractStore_saleMiddleDate === null) {
          return this.$emit("alims", "중도금 날짜를 입력해주세요.");
        }
        if (this.contractStore_saleMiddlePayment === "" || this.contractStore_saleMiddlePayment === null) {
          return this.$emit("alims", "중도금 금액을 입력해주세요.");
        }
        if (this.contractStore_saleBalanceDate === "" || this.contractStore_saleBalanceDate === null) {
          return this.$emit("alims", "잔금날짜를 입력해주세요.");
        }
        if (this.contractStore_saleMonthPayDate === "" || this.contractStore_saleMonthPayDate === null) {
          return this.$emit("alims", "월 이용료 결제 날짜를 입력해주세요.");
        }
        if (this.contractStore_saleAdvancePayment === "" || this.contractStore_saleAdvancePayment === null) {
          return this.$emit("alims", "선금 금액을 입력해주세요.");
        }
        if (this.contractStore_saleBalancePayment === "" || this.contractStore_saleBalancePayment === null) {
          return this.$emit("alims", "잔금 금액을 입력해주세요.");
        }
        if (this.contractStore_saleMonthPay === "" || this.contractStore_saleMonthPay === null) {
          return this.$emit("alims", "월 이용료를 입력해주세요.");
        }
      }
      if (this.contractStoreKind === "SYS21811B016") {
        if (this.contractStore_monthRentFee === "" || this.contractStore_monthRentFee === null) {
          return this.$emit("alims", "임대요금(월)을 입력해주세요.");
        }
        if (this.contractStore_monthRentPayDay === "" || this.contractStore_monthRentPayDay === null) {
          return this.$emit("alims", "임대요금 결제날짜를 입력해주세요.");
        }
        if (this.contractStore_rentStartDate === "" || this.contractStore_rentStartDate === null) {
          return this.$emit("alims", "임대시작 날짜를 입력해주세요.");
        }
        if (this.contractStore_rentEnddate === "" || this.contractStore_rentEnddate === null) {
          return this.$emit("alims", "임대종료 날짜를 입력해주세요.");
        }
        if (this.contractStore_rentMonths === "" || this.contractStore_rentMonths === null) {
          return this.$emit("alims", "개월수를 입력해주세요.");
        }
      }

      this.$emit("watcher", this.$data);
    },
    clear() {
      this.contractStoreKindName = "";
      this.contractStoreKind = "";
      this.contractStore_advertisingRentFee = "";
      this.contractStore_advertisingRate = "";
      this.contractStore_salePrice = "";
      this.contractStore_salePriceVatFlag = "Y";
      this.contractStore_saleAdvanceDate = "";
      this.contractStore_saleMiddleDate = "";
      this.contractStore_saleBalanceDate = "";
      this.contractStore_saleMonthPayDate = "";
      this.contractStore_saleAdvancePayment = "";
      this.contractStore_saleMiddlePayment = "";
      this.contractStore_saleBalancePayment = "";
      this.contractStore_saleMonthPay = "";
      this.contractStore_monthRentFee = "";
      this.contractStore_monthRentPayDay = "";
      this.contractStore_rentStartDate = "";
      this.contractStore_rentEnddate = "";
      this.contractStore_rentMonths = "";
    },
  },
};
</script>

<style lang="scss">
// &.v-menu__content {
// 	left: auto !important;
// 	right: 0 !important;
// }
.dates {
}
</style>
