<template>
  <div>
    <h1 style="text-align: center" class="mb10">계약 유형별 총 정산 금액</h1>
    <div :class="[location ? 'ul-container-ver' : 'ul-container-hor']">
      <pie-chart :width="wid" :height="wid" :dataSet="dataSet" :percentage="percentage" :labels="labels"></pie-chart>
      <div class="list-containers">
        <ul>
          <li v-for="(item, idx) in labels" v-show="showLabel[idx]" :key="idx">
            <div :style="{ backgroundColor: colors[idx] }"></div>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/chart/PieChart";
export default {
  components: { PieChart },
  props: {
    dataSet: Array,
    percentage: Array,
    labels: Array,
    location: Boolean,
    wid: { type: Number, default: 330 },
  },
  //location이 true면 세로 false면 가로
  data() {
    return {
      colors: ["#FF9595", "#CEF2CF", "#B6C7FF", "#FFCA78"],
      showLabel: [],
    };
  },
  beforeMount() {
    this.showLabel = this.labels.map((item, idx) => {
      return Math.round(this.percentage[idx]) > 0 || item !== null;
    });
  },
};
</script>

<style lang="scss" scoped>
.ul-container-ver {
  display: flex;
  align-items: center;

  .list-containers {
    margin-left: 20px;
    & li {
      display: flex;
      @include Roboto(1.2, 500, #474c51);
      & div {
        width: 10px;
        height: 10px;
        position: relative;
        top: 3px;
        margin-right: 5px;
      }
      padding: 5px 0;
    }
  }
}

.ul-container-hor {
  .list-containers {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    & ul {
      display: flex;
      justify-content: space-between;
    }
    & li {
      display: flex;
      margin: 0 5px;
      @include Roboto(1.2, 500, #474c51);
      & div {
        width: 10px;
        height: 10px;
        position: relative;
        top: 3px;
        margin-right: 5px;
      }
      padding: 5px 0;
    }
  }
}
</style>
