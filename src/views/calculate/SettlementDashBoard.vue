<template>
  <section class="container">
    <div class="dashboard-container">
      <section class="ad-list section-box mt30" v-if="Object.keys(dashBoard).length > 0">
        <div style="height: 100%">
          <div class="title-price">
            <h1>총 정산 금액&nbsp;&nbsp; {{ dashBoard.session01.total.settlementDepositPriceTotal | comma }}원</h1>
            <div class="section2">
              <div class="data-set">지급 불가&nbsp; {{ sesssion1TotalPrice | comma }}</div>
              <div class="data-set">지급 보류&nbsp; {{ dashBoard.session01.total.statusTotal2 | comma }}</div>
            </div>
          </div>
          <sesstion-1 :location="true" :sessionData="dashBoard.session01"></sesstion-1>
        </div>
      </section>

      <section class="ad-list section-box mt30" v-if="Object.keys(dashBoard).length > 0">
        <div style="height: 100%">
          <session-2-container :location="false" :sessionData="dashBoard" />
        </div>
      </section>
      <section class="ad-list section-box mt30" v-if="Object.keys(dashBoard).length > 0">
        <div style="height: 100%">
          <session-3 />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Sesstion1 from "./dashBoard/Sesstion1.vue";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import showModal from "@/mixins/showModal";
import modalMixin from "@/mixins/showModal";
import { mapGetters } from "vuex";
import Session2Container from "./dashBoard/Session2Container.vue";
import Session3 from "./dashBoard/Session3.vue";
export default {
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  components: {
    Sesstion1,
    Session2Container,
    Session3,
  },
  mixins: [loading, alimMixin, deleteMixin, showModal, modalMixin],
  props: ["size"],
  data() {
    return {
      dashBoard: {},
      session1StatusTotal: 0,
    };
  },
  computed: {
    ...mapGetters("settlementNotice", ["SettlementDashboard"]),
    sesssion1TotalPrice() {
      if (this.session1StatusTotal !== null) {
        return this.session1StatusTotal.toFixed(0);
      }
      return 0;
    },
  },
  mounted() {
    this.getSettlementData();
  },
  methods: {
    async getSettlementData() {
      await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_DASH_BOARD");
      const res = this.SettlementDashboard.channeltuneApiResult;
      if (res.errorCode === 200) {
        this.dashBoard = res.settlementDeposit;
        this.session1StatusTotal = this.dashBoard.session01.total.statusTotal1;
      }
    },
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
.flx {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px dotted #ccc;
}
.line {
  padding: 10 !important;
  border: 1px solid #ccc;
}
.line2 {
  padding: 10px !important;
  border: 1px solid #ccc;
  height: calc(100% - 236px);
}
.line3 {
  height: calc(100% - 411px);
}
.titled {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 15px;
  & h2 {
    text-align: center;
    text-decoration: underline;
    text-underline-position: under;
  }
  & div {
    & .info {
      height: 28px !important;
    }
  }
}
.ad-manage {
  & .ad-list {
    width: 100% !important;
    height: 100%;
  }

  & .btn-search-wrap {
    & .search-wrap {
      display: flex;
      align-items: center;
      & input {
        border: 1px solid #ccc;
        height: 28px;
        padding: 0 10px;
        &:read-only {
          background: #f4f4f4;
        }
        &:nth-child(1) {
          width: 110px;
        }
        &:nth-child(2) {
          width: 200px;
        }
      }
    }
  }
  & .overflow {
    height: calc(100% - 110px);
    overflow: auto;
  }
  & .detail-header {
    & .title {
      white-space: nowrap;
      margin-right: 10px;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
.th-style {
  & th {
    background: #fff !important;
    &.dot {
      border-left: 1px dashed #ccc !important;
    }
  }
}
.width::v-deep .v-select__selection {
  width: 77px;
}
.dashboard-container {
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
