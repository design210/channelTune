<template>
  <div class="rectangle">
    <div class="flux">
      <h2>{{ titled }}<span class="txt">&nbsp;(TOTAL)</span></h2>
      <v-btn
        class="btn"
        color="info"
        v-if="status === 'member'"
        @click="__showModalTemplate(require('@/components/modal/common/MemberToally'), {}, 800)"
        >월별 집계</v-btn
      >
    </div>
    <div class="titles" v-if="status === 'member'">
      <p>{{ naming[0] }}</p>
      <p>{{ naming[1] }}</p>
    </div>
    <div class="month-day mt20" :class="{ mt28: status !== 'member' }">
      <div class="month">
        <div class="flx" v-if="status !== 'member'">
          <p>{{ naming[0] }}</p>
          <span class="sub-num">{{ info[0] | comma }}</span>
        </div>
        <div class="flx">
          <p>{{ naming[2] }}</p>
          <span class="sub-num">{{ info[2] | comma }}</span>
        </div>
        <div class="flx">
          <p>{{ naming[4] }}</p>
          <span class="sub-num">{{ info[4] | comma }}</span>
        </div>
      </div>
      <div class="day">
        <div class="flx" v-if="status !== 'member'">
          <p>{{ naming[1] }}</p>
          <span class="sub-num">{{ info[1] | comma }}</span>
        </div>
        <div class="flx">
          <p>{{ naming[3] }}</p>
          <span class="sub-num">{{ info[3] | comma }}</span>
        </div>
        <div class="flx">
          <p>{{ naming[5] }}</p>
          <span class="sub-num">{{ info[5] | comma }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/mixins/showModal";
export default {
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  mixins: [modalMixin],
  props: ["titled", "naming", "info", "status"],
};
</script>

<style lang="scss" scoped>
.rectangle {
  border: 1px solid #bdbdbd;
  border-radius: 20px;
  padding: 8px 15px 5px;
  width: calc(50% - 5px);
  & .titles {
    @include NotoSans(1.3, 500, #000);
    margin-top: 10px;
    display: flex;

    & p {
      width: 50%;
      position: relative;
      padding-left: 12px;
      &::after {
        content: "";
        position: absolute;
        top: 8px;
        left: 0;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: rgb(105, 105, 105);
      }
    }
  }
  & .flux {
    display: flex;
    justify-content: space-between;
  }
  & h2 {
    @include NotoSans(1.6, 700, #000);
    white-space: nowrap;

    & span {
      @include NotoSans(1.3, 400, rgb(82, 82, 82));
    }
  }
  & .total-num {
    width: 100%;
    text-align: right;
    @include Roboto(2.2, 700, #000);
  }
  & .month-day {
    display: flex;
    position: relative;
    top: -8px;
    & .month {
      width: 50%;
      padding-right: 10px;
      padding-left: 15px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        right: -4px;
        top: 0;
        border-right: 1px dashed rgb(224, 224, 224);
        height: 100%;
      }
    }
    & .line {
      position: relative;
      top: 10px;
      margin: 0 26px;
      height: 50px;
      border: 1px solid #bdbdbd;
    }
    & .day {
      width: 50%;
      padding-left: 15px;
    }

    & .flx {
      position: relative;
      display: flex;
      justify-content: space-between;

      & p {
        @include Roboto(1.3, 400, #000);
      }
      & .sub-num {
        @include Roboto(1.5, 700, #000);
      }
    }
  }
}
.btn {
  height: 24px !important;
}
</style>
