<template>
  <div class="square">
    <h2>{{ titled | comma }}<span class="txt">&nbsp;(TOTAL)</span></h2>

    <span class="total-num">{{ total | comma }}</span>
    <div class="month-day">
      <div class="month">
        <p>MONTH</p>
        <span class="sub-num">{{ month | comma }}</span>
      </div>
      <div class="day">
        <p>DAY</p>
        <span class="sub-num">{{ day | comma }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  props: ["titled", "total", "month", "day"],
};
</script>

<style lang="scss" scoped>
.square {
  border: 1px solid #bdbdbd;
  border-radius: 20px;
  width: 33.3%;
  padding: 8px 15px 5px;

  & h2 {
    @include NotoSans(1.6, 700, #000);
    white-space: nowrap;

    & .txt {
      @include NotoSans(1.3, 400, rgb(82, 82, 82));
    }
  }
  & .total-num {
    width: 100%;
    text-align: right;
    @include Roboto(1.7, 700, #000);
    margin-top: 4px;
  }
  & .month-day {
    & .month {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & .day {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      position: relative;
      align-items: center;
      &::after {
        content: "";
        border-top: 1px dashed rgb(224, 224, 224);
        width: 100%;
        position: absolute;
        top: -7px;
        left: 0;
      }
    }
    & p {
      background-color: #b1b1b1;
      display: inline-block;
      @include Roboto(1.1, 400, #fff);
      line-height: 15px !important;
      padding: 0 8px;
      height: 15px;
      border-radius: 20px;
    }
    & .sub-num {
      display: block;
      text-align: right;
      @include Roboto(1.5, 700, #000);
    }
  }
}
</style>
