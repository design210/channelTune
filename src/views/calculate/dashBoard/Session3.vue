<template>
  <div :class="[location ? 'linde' : '', 'session1-container']">
    <div class="year-container">
      <h1>최근 5년 연도별 정산 금액</h1>
      <line-year-chart :style="myStyle" :year="year" :price="price" />
    </div>
    <div style="width: 50%">
      <h1 class="center">최근 5년 연도별 총 정산 금액</h1>
      <bar-chart :style="myStyle" />
      <!-- <settlement-table :data="sessionData.companyTotal" /> -->
    </div>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import showModal from "@/mixins/showModal";
import modalMixin from "@/mixins/showModal";
import LineYearChart from "@/components/chart/LineYearChart.vue";
import BarChart from "@/components/chart/BarChart.vue";

export default {
  components: { LineYearChart, BarChart },

  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  mixins: [loading, alimMixin, deleteMixin, showModal, modalMixin],
  props: ["size", "sessionData", "location"],
  data() {
    return {
      dataSet: [],
      percentage: [],
      labels: [],
      year: [2018, 2019, 2020, 2021, 2022],
      price: [0, 0, 10000, 15000, 20000],
      myStyle: {
        width: "100%",
        padding: "10px",
        margin: "0",
      },
    };
  },
  beforeMount() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
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
.linde {
  border: 1px solid #ccc;
}
.session1-container {
  width: 100%;
  padding: 20px 0;

  display: flex;
  justify-content: space-between;

  & .year-container {
    width: calc(50% - 20px);
    text-align: center;
    & h1 {
      text-align: center;
      margin-bottom: 10px;
    }
  }

  & .line {
    border: 1px dotted #ccc;
    width: 100%;
    margin: 15px 0;
  }
  & .chart-pie {
    margin-left: 5%;
  }
}
</style>
