<template>
  <div class="mt20">
    <div class="title-price">
      <div class="mr10"><v-select :items="year" v-model="searchYear" outlined class="select-basic w120" /></div>
      <h1>총 정산 금액&nbsp;&nbsp; {{ totalPrice | comma }}원</h1>
      <div class="section2">
        <div class="data-set">지급 불가&nbsp; {{ session3StatusTotal1 }}</div>
        <div class="data-set">지급 보류&nbsp; {{ session3StatusTotal2 }}</div>
      </div>
    </div>
    <div class="linde">
      <sesstion-1 :location="false" :sessionData="yearData.session03" />
      <custom-line-chart :yearData="yearData.session03" @monthTarget="emitMonth" />
      <session-2 :location="location" :sessionData="yearData.session04" />
    </div>
  </div>
</template>

<script>
import CustomLineChart from "@/components/chart/CustomLineChart.vue";
import Sesstion1 from "./Sesstion1.vue";
import Session2 from "@/views/calculate/dashBoard/Session2.vue";
import { settlementYear } from "@/utils/yearSet.js";
import { mapGetters } from "vuex";
export default {
  components: { CustomLineChart, Session2, Sesstion1 },
  filters: {
    comma(val) {
      if (val == 0) {
        return 0;
      }
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return parts.join(".");
    },
  },
  props: ["location", "sessionData"],
  data() {
    return {
      year: [],
      searchYear: "",
      session3StatusTotal: 0,
      statusTotal2: 0,
      month: "",
      yearData: {},
      totalPrice: 0,
    };
  },
  watch: {
    searchYear() {
      this.getSettlementYearData();
    },
  },
  computed: {
    ...mapGetters("settlementNotice", ["getSettlementDashboardYear", "getSettlementDashboardMonth"]),
    session3StatusTotal1() {
      if (this.session3StatusTotal !== null) {
        const parts = String(this.session3StatusTotal.toFixed(0)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");
      }
      return 0;
    },
    session3StatusTotal2() {
      if (this.statusTotal2 !== null) {
        const parts = String(this.statusTotal2.toFixed(0)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");
      }
      return 0;
    },
  },
  beforeMount() {
    this.yearData = this.sessionData;
    this.session3StatusTotal = this.sessionData.session03.total?.statusTotal1;
    this.statusTotal2 = this.sessionData.session03.total?.statusTotal2;
  },
  mounted() {
    this.totalPrice = this.sessionData.session03.total.settlementDepositPriceTotal;
    this.settingYear();
    this.getSettlementYearData();
  },
  methods: {
    setYear() {
      let year = new Date().getFullYear();
      this.searchYear = year + "년";
    },
    settingYear() {
      const yearset = settlementYear("onlyYear");
      const result = yearset.map((item) => {
        return `${item}년`;
      });

      this.year = result;
      this.setYear();
    },
    async getSettlementYearData() {
      await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_DASH_BOARD_YEAR", this.searchYear);

      const res = this.getSettlementDashboardYear.channeltuneApiResult;
      if (res.errorCode === 200) {
        this.yearData = res.settlementDeposit;
      }
    },
    async emitMonth(data) {
      await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_DASH_BOARD_MONTH", {
        year: this.searchYear,
        month: data,
      });
      const res = this.getSettlementDashboardMonth.channeltuneApiResult;
      if (res.errorCode === 200) {
        this.yearData.session04 = res.settlementDeposit.session04;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.linde {
  border: 1px solid #ccc;
}
.title-price {
  display: flex;
  margin-bottom: 20px;
  & h1 {
    @include Roboto(2.4, 700, #1b1d1f);
    margin-right: 20px;
  }
  & .section2 {
    display: flex;
    justify-content: space-between;
    padding: 9px 14px;
    width: 300px;
    height: 34px;
    background: #f7f8f9;
    border-radius: 3px;

    & .data-set {
      @include Roboto(1.4, 400, #474c51);
    }
  }
}
</style>
