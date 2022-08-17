<template>
  <div :class="[location ? 'linde' : '', 'session1-container']">
    <pie-chart-legend :location="location" :dataSet="dataSet" :percentage="percentage" :labels="labels" class="chart-pie" />
    <div style="width: 50%">
      <settlement-table :data="sessionData.companyTotal" />
    </div>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import showModal from "@/mixins/showModal";
import modalMixin from "@/mixins/showModal";
import SettlementTable from "./SettlementTable.vue";
import PieChartLegend from "@/components/chart/PieChartLegend.vue";

export default {
  components: { SettlementTable, PieChartLegend },
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
    };
  },
  beforeMount() {
    this.sessionData.kindTotal.forEach((item) => {
      this.dataSet.push(item.settlementDataPrice);
      this.percentage.push(item.settlementDataRate);
      this.labels.push(item.contractKindName);
    });
  },
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
  padding: 20px;

  display: flex;
  justify-content: space-between;

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
