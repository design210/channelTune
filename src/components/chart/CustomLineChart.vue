<template>
  <div class="custom-line-container">
    <h1>{{ yearData.total.settlementYear }}년 월별 정산 금액</h1>
    <line-chart :width="1200" :priceData="yearPrice" />
    <ul>
      <li :class="[target === item ? 'active' : '']" @click="getTarget(item)" v-for="item in month" :key="item">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
export default {
  components: {
    LineChart,
  },
  props: ["yearData"],
  data() {
    return {
      month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      target: "",
      yearPrice: [],
    };
  },
  beforeMount() {
    this.yearPrice = Array.from({ length: 12 }, () => 0);
    this.getYearPrice();
  },
  mounted() {
    let month = String(this.$date().get("M") + 1);
    if (month.length === 1) {
      month = "0" + month;
    }
    this.target = month;
  },
  methods: {
    getTarget(location) {
      this.target = location;
      this.$emit("monthTarget", this.target);
    },
    getYearPrice() {
      this.yearData?.monthTotal.forEach((item) => {
        this.yearPrice[item.settlementMonth - 1] = item.settlementDepositPriceTotal;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-line-container {
  & h1 {
    padding-left: 25px;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  padding-bottom: 6px;
  // box-shadow: 2px 15px 30px -36px rgba(0, 0, 0, 0.67);
  & ul {
    position: relative;
    top: -20px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 105px;

    & li {
      @include Roboto(1.6, 400, #26282b);
      position: relative;
      cursor: pointer;
      box-sizing: border-box;

      & span {
        position: relative;
        z-index: 2;
      }
      &:hover {
        @include Roboto(1.6, 700, #26282b);
        &::after {
          position: absolute;
          border: 1px solid #26282b;
          border-radius: 5px;
          width: calc(100% + 15px);
          height: 28px;
          padding: 2px 5px;
          left: -7.5px;
          top: -3px;
          content: "";
        }
      }
      &.active {
        @include Roboto(1.6, 700, #fff);

        &::before {
          position: absolute;
          width: 15px;
          height: 15px;
          transform: translateX(-50%);
          transform: rotate(45deg);
          bottom: -5px;
          left: 2px;
          background-color: #26282b;

          content: "";
        }

        &::after {
          position: absolute;
          border: 1px solid #26282b;
          border-radius: 5px;
          width: calc(100% + 15px);
          height: 28px;

          padding: 2px 5px;
          left: -7.5px;
          top: -3px;
          content: "";
          background-color: #26282b !important;
        }
      }
    }
  }
}
</style>
