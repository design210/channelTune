<template>
  <section class="container">
    <div class="title-wrap">
      <h1>광고 상품 매출 리스트</h1>
    </div>

    <div class="total-sales-wrap">
      <span>합계 : {{ comma(totalPrice) }}원</span>
    </div>

    <div class="search-box mb10">
      <div class="search-group mr20">
        <span class="mr10">매출날짜</span>
        <date-time-picker :clear="clearDate" :current="searchStartDate" @date="updateStartDate" class="date-time"></date-time-picker>
        <span class="ml5 mr5">~</span>
        <date-time-picker :clear="clearDate" :current="searchEndDate" @date="updateEndDate" class="date-time"></date-time-picker>
        <span>
          <v-btn small color="primary" class="btn-default" :class="{ 'btn-active': searchPeriod == 'day', ml5: 1, mr5: 1 }" @click="setPeriod('day')"
            >당일</v-btn
          >
          <v-btn small color="primary" class="btn-default" :class="{ 'btn-active': searchPeriod == 'week', mr5: 1 }" @click="setPeriod('week')"
            >주간</v-btn
          >
          <v-btn small color="primary" class="btn-default" :class="{ 'btn-active': searchPeriod == 'month', mr5: 1 }" @click="setPeriod('month')"
            >월간</v-btn
          >
        </span>

        <span class="ml30 mr10">판매상태</span>
        <pull-down
          :clear="clearField"
          :code="'SYS21B19B002'"
          :includeTotalElem="true"
          class="pull-down w200"
          @selected="buyStatusSelected"
          :data="buyStatus"
        ></pull-down>
        <input type="text" placeholder="아이디" class="ml5 mr5" v-model="searchText" @keyup.enter="reload(1)" />
        <v-btn small color="primary" class="mr5" @click="reload(1)">조회</v-btn>
        <v-btn small @click="searchClear">CLEAR</v-btn>
      </div>
    </div>

    <section class="sales-manage">
      <section class="sales-list section-box">
        <table class="tbl mt20 user-list-tbl select-tbl">
          <caption>
            광고 상품 매출 리스트
          </caption>
          <colgroup>
            <col width="120" />
            <col width="*" />
            <col width="80" />
            <col width="*" />
            <col width="100" />
            <col width="120" />
            <col width="120" />
            <col width="*" />
            <col width="120" />
            <col width="*" />
            <col width="100" />
            <col width="100" />
            <col width="120" />
          </colgroup>
          <thead>
            <tr>
              <th>고유코드</th>
              <th>매출일시</th>
              <th>회원고유번호</th>
              <th class="left">회원아이디</th>
              <th class="left">회원명</th>
              <th class="left">결제PG</th>
              <th class="left">결제수단 / PG 결제 수단</th>
              <th class="left">결제그룹상품명</th>
              <th class="right pr10">판매금액</th>
              <th>입금기한</th>
              <th>구매내역FLAG</th>
              <th class="left">판매상태</th>
              <th>판매상태 변경</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.buySid }}</td>
              <td @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ __getLocalTime(item.buyDateTime) }}
              </td>
              <td @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.homepageUserSid }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.homepageUserEmail }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.homepageUserName }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.buyPgCompany }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.buyPaymentKindName }} / {{ item.buyPgPaymentKind }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.buyGoodName }}
              </td>
              <td class="right" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ comma(item.buyPrice) }}
              </td>
              <td @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ __getLocalTime(item.buyDepositLimit) }}
              </td>
              <td @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.buyDesibleFlag }}
              </td>
              <td class="left" @click="__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), { buySid: item.buySid }, 1500)">
                {{ item.buyStatusName }}
              </td>
              <td>
                <v-btn
                  small
                  color="primary"
                  class=""
                  @click="__showModalTemplate(require('@/components/modal/homepage/ChangeOfSalesStatus'), { buySid: item.buySid }, 1200)"
                  >판매상태 변경</v-btn
                >
              </td>
            </tr>
          </tbody>
          <tfoot v-if="list.length < 1">
            <tr>
              <td colspan="13">항목이 없습니다.</td>
            </tr>
          </tfoot>
        </table>
        <div class="text-center mt10">
          <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
        </div>
      </section>
    </section>

    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import PullDown from "@/components/form/PullDown";
import alim from "@/components/dialog/Alim.vue";
import DateTimePicker from "@/components/form/DateTimePicker";
import alimMixin from "@/mixins/alim.js";
import modalMixin from "@/mixins/showModal";
import utcTimeMixin from "@/mixins/utcTime";
import responseMixin from "@/mixins/response";
import { getPeriod } from "@/utils/dayOfWeek";
export default {
  components: { DateTimePicker, PullDown, alim },
  mixins: [alimMixin, modalMixin, utcTimeMixin, responseMixin],
  data() {
    return {
      //게시물 설정
      page: 1,
      len: null,
      list: [],
      size: 20,
      searchText: "",
      searchStartDate: "",
      searchEndDate: "",
      searchPeriod: "",
      buyKindSysCode: "SYS21C03B010",
      buyStartDateTime: "",
      buyEndDateTime: "",
      buyStatus: "",
      buyStatusName: "",

      clearDate: false,
      clearField: false,

      totalPrice: 0,
    };
  },
  watch: {
    page() {
      this.reload();
    },
  },
  mounted() {
    // this.__showModalTemplate(require('@/components/modal/ad/AdSalesDetail'), {buySid: 'B21C14B00007'}, 1500);
    this.buyStatus = "SYS21B19B004";
    this.buyStatusName = "결제완료";
    setTimeout(() => {
      this.setPeriod("day");
    }, 50);
  },
  methods: {
    async reload(num) {
      if (num === 1) {
        this.page = 1;
      }

      const res = await this.__getResponse("sales/GET_BUY_PAYMENT_LIST", {
        size: this.size,
        page: this.page,
        buyStartDateTime: this.buyStartDateTime,
        buyEndDateTime: this.buyEndDateTime,
        buyStatus: this.buyStatus,
        searchText: this.searchText,
        buyKind: this.buyKindSysCode,
      });

      if (parseInt(res.errorCode) !== 200) {
        this.alim(res.errorMessage, this.errorColor);
        return false;
      }

      const data = res.BuyMaster;
      this.list = data.list.data;
      this.len = data.list.last_page;
      this.totalPrice = data.total;
    },

    comma(n) {
      if (n === "" || n === null) {
        return 0;
      } else {
        const parts = Number(n).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    },

    searchClear() {
      this.searchText = "";
      this.searchStartDate = "";
      this.searchEndDate = "";
      this.searchPeriod = "";
      this.clearDate = !this.clearDate;
      this.clearField = !this.clearField;
      this.buyStatus = "";
      this.buyStatusName = "";
    },

    // 당일 주간 월간 설정
    setPeriod(type) {
      this.searchPeriod = type;
      const period = getPeriod(type);
      this.searchStartDate = period[0] + " 00:00";
      this.searchEndDate = period[1] + " 23:59";
    },

    // pulldown
    buyStatusSelected({ sysCodeSid }) {
      this.buyStatus = sysCodeSid;
    },

    // datepicker
    updateStartDate(date) {
      this.buyStartDateTime = date;
    },
    updateEndDate(date) {
      this.buyEndDateTime = date;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  & .date-time::v-deep {
    border: 1px solid #ccc;
    & .v-input__slot {
      margin-bottom: 0;
      &:before {
        border: 0 !important;
      }
      & input {
        padding: 0 10px;
        height: 35px;
      }
    }
  }
  & .btn-default {
    background-color: #ccc !important;
    &.btn-active {
      background-color: #1976d2 !important;
    }
  }

  & .total-sales-wrap {
    display: flex;
    justify-content: flex-end;
    font-size: 1.6rem;
  }
  & .select-tbl {
    & th {
      white-space: nowrap;
    }
    & td {
      cursor: pointer;
    }
  }
  & .search-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & .search-group {
      & input {
        width: 250px;
        padding: 0 5px;
        background: #ffffff;
        border: 1px solid #aaaaaa;
        height: 30px;
      }
    }
  }
}
</style>
