<template>
  <div :class="[location ? 'linde' : '', 'session1-container', 'box-shadows']">
    <div class="summary-container">
      <h2>{{ monthSet }}월 정산 금액 <br />{{ sessionData.total.settlementDepositPriceTotal | comma }}원</h2>
      <div class="non-payment">
        <span>지급불가&nbsp;{{ sessionData.total.statusTotal1 | comma }}</span
        ><br />
        <span>지급보류&nbsp;{{ sessionData.total.statusTotal2 | comma }}</span>
      </div>
    </div>
    <settlement-table class="table-container" style="width: 50%" :data="sessionData.companyTotal" />
    <div class="pie-containder">
      <pie-chart-legend :location="location" :dataSet="dataSet" :percentage="percentage" :wid="200" :labels="labels" class="chart-pie" />
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
  computed: {
    monthSet() {
      if (this.sessionData?.total.settlementMonth < 10) {
        return "0" + String(this.sessionData?.total.settlementMonth);
      } else {
        return this.sessionData?.total.settlementMonth;
      }
    },
  },
  beforeMount() {
    this.sessionData.kindTotal.forEach((item) => {
      this.dataSet.push(item.settlementDataPrice);
      this.percentage.push(item.settlementDataRate);
      this.labels.push(item.contractKindName);
    });
  },
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
.box-shadows {
  box-shadow: inset 0px 15px 30px -36px rgba(0, 0, 0, 0.67);
}
.linde {
  border: 1px solid #ccc;
}
.session1-container {
  width: 100%;

  display: flex;
  justify-content: space-between;

  & .summary-container {
    width: 20%;
    padding: 20px;
    background: #f7f8f9;
    display: flex;
    padding-left: 40px;
    justify-content: center;

    flex-direction: column;
    box-shadow: inset 0px 12px 30px -36px rgba(0, 0, 0, 0.5);

    & .non-payment {
      margin-top: 18px;

      & span {
        margin-top: 12px;
        @include Roboto(1.3, 400, #474c51);
      }
    }
  }

  & .pie-containder {
    display: flex;
    justify-content: center;
    min-width: 380px;
    padding: 20px 20px 20px 0;
  }
  & .table-container {
    padding: 20px 0;
    width: calc(80% - 250px);
    margin-left: 5%;
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
