<template>
  <section class="container">
    <div class="title-wrap">
      <h1>월별 스토어 트래픽 집계</h1>
    </div>
    <div class="mb10">
      <div class="header flx">
        <div class="search-group">
          <div class="year"><v-select :items="year" v-model="searchYear" outlined class="select-basic mr5"></v-select></div>
          <div class="month"><v-select :items="month" v-model="searchMonth" outlined class="select-basic"></v-select></div>
          <v-btn small color="primary" dark class="ml5 mr20" @click="setMonth">당월</v-btn>

          <div class="field-div search">
            <span>스토어</span>
            <input type="text" class="input-first ml10 mr10" readonly v-model="companyStoreSid" />
            <input type="text" class="input-last" v-model="companyStoreName" />
            <v-btn small class="ml5" color="success" @click="storeSearchModal">검색</v-btn>
            <v-btn small class="ml5" color="primary" @click="getStoreAppraisal(1)">조회</v-btn>
          </div>
        </div>
        <div class="search ml150">
          <v-btn small color="primary" class="btn-search" @click="storeAggregationModal('mAvg')">월 평균 스토어 집계</v-btn>
          <v-btn small color="primary" class="btn-search" @click="storeAggregationModal('Daily')">일별 스토어 집계</v-btn>
          <v-btn small color="primary" @click="storeAggregationModal('time')">시간대별 스토어 집계</v-btn>
        </div>
      </div>
      <section class="member-manage mt20">
        <section class="section1 section-box border-outside">
          <div class="border">
            <div class="header flx">
              <h2>트래픽 월 평균</h2>
              <v-btn small color="success" @click="onexport">XLSX 다운로드 </v-btn>
            </div>
            <div>
              <table width="100%" class="tbl user-list-tbl select-tbl tbl-reg">
                <caption>
                  트래픽 월 평균
                </caption>
                <colgroup>
                  <col width="80" />
                  <col width="*" />
                  <col width="90" />
                  <col width="90" />
                  <col width="80" />
                </colgroup>
                <thead>
                  <tr>
                    <th>스토어 코드</th>
                    <th class="left">스토어 명</th>
                    <th class="right">월평균 통행량</th>
                    <th class="right">월평균체류량</th>
                    <th>매장등급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in list1" :key="index" @click="getStoreAppraisalByDay(item.companyStoreSid)">
                    <td>{{ item.companyStoreSid }}</td>
                    <td class="left">{{ item.companyStoreName }}</td>
                    <td class="right">{{ numFloor(item.storeAppraisalTrafficAvg) }}</td>
                    <td class="right">{{ numFloor(item.storeAppraisalStayAvg) }}</td>
                    <td>{{ item.storeAppraisalGradeName }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="list1.length < 1">
                  <tr>
                    <td colspan="5">트래픽 리스트가 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
              <div class="text-center mt30">
                <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
              </div>
            </div>
          </div>
        </section>
        <section class="init-wrap section3 border-outside">
          <article class="art mb10">
            <div class="border">
              <div class="header">
                <h2>트래픽 일별 집계</h2>
              </div>
              <div class="scl">
                <table width="100%" class="tbl user-list-tbl select-tbl tbl-reg">
                  <caption>
                    트래픽 일별 집계
                  </caption>
                  <thead>
                    <tr>
                      <th>날짜</th>
                      <th class="right">통행객</th>
                      <th class="right pr5">체류객</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in dailyList" :key="index" @click="getStoreAppraisalByTime(item.date)">
                      <td>{{ item.date }}</td>
                      <td class="right">{{ item.traffic }}</td>
                      <td class="right pr5">{{ item.stay }}</td>
                    </tr>
                  </tbody>
                  <tfoot v-if="dailyList.length < 1">
                    <tr>
                      <td colspan="3">일별 트래픽이 집계되지 않았습니다.</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </article>
          <article class="sub_art">
            <div class="border">
              <div class="header">
                <h2>트래픽 시간대별 집계</h2>
              </div>
              <div class="scl">
                <table width="100%" class="tbl tbl-reg">
                  <caption>
                    트래픽 시간대별 집계
                  </caption>
                  <thead>
                    <tr>
                      <th>날짜</th>
                      <th class="right">통행객</th>
                      <th class="right pr5">체류객</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in timeList" :key="index">
                      <td>{{ item.startTime }}~{{ item.endTime }}</td>
                      <td class="right">{{ item.traffic }}</td>
                      <td class="right pr5">{{ item.stay }}</td>
                    </tr>
                  </tbody>
                  <tfoot v-if="timeList.length < 1">
                    <tr>
                      <td colspan="3">시간대별 트래픽이 집계되지 않았습니다.</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </article>
        </section>
        <section class="init-wrap section2 section-box border-outside">
          <div class="border">
            <div class="header">
              <h2>트래픽 로그</h2>
            </div>
            <div class="scl">
              <table width="100%" class="tbl tbl-reg">
                <caption>
                  트래픽 로그
                </caption>
                <thead>
                  <tr>
                    <th>코드</th>
                    <th>날짜</th>
                    <th>시간</th>
                    <th class="right">통행객</th>
                    <th class="right">방문율</th>
                    <th class="right">방문객</th>
                    <th class="right">체류율</th>
                    <th class="right">체류객</th>
                    <th class="right pr5">체류시간(H)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in log" :key="index">
                    <td>{{ item.storeTrafficDailySid }}</td>
                    <td>{{ item.storeTrafficDailyDate }}</td>
                    <td>{{ item.storeTrafficDailyHour }}</td>
                    <td class="right">{{ item.storeTrafficDailyTrafficCount }}</td>
                    <td class="right">{{ numFloor(item.storeTrafficDailyVisitRatio) }}</td>
                    <td class="right">{{ item.storeTrafficDailyVisitCount }}</td>
                    <td class="right">{{ numFloor(item.storeTrafficDailyStayRatio) }}</td>
                    <td class="right">{{ item.storeTrafficDaillyStayCount }}</td>
                    <td class="right pr5">{{ numFloor(item.storeTrafficDailyStayAvg) }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="log.length < 1">
                  <tr>
                    <td colspan="9">트래픽 로그가 존재하지 않습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm> -->
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import { year } from "@/utils/yearSet";
import StoreListModal from "@/components/modal/common/StoreList.vue";
import XLSX from "xlsx";
import StoreAggregation from "@/components/modal/operation/StoreAggregation.vue";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus";
export default {
  components: { alim },
  mixins: [loading, alimMixin],
  props: ["size"],
  data() {
    return {
      page: 1,
      len: null,
      list1: [],
      searchYear: "",
      searchMonth: "",
      companyStoreSid: "",
      companyStoreName: "",
      selectedSid: "",
      year: [],
      month: ["전체", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      dailyList: [],
      timeList: [],
      log: [],
      excelData: [],
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getStoreTrafficList", "getStoreAppraisalList", "getStoreAppraisalListDaily", "getStoreAppraisalListTime"]),
  },
  watch: {
    page() {
      this.getStoreAppraisal();
    },
    size() {
      this.getStoreAppraisal();
    },
  },
  mounted() {
    const yearset = year();
    this.year = yearset;
    this.setMonth();
  },
  methods: {
    //월평균 스토어 트래픽 조회
    async getStoreAppraisal(num) {
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        const sizeSet = this.size - 2;
        await this.$store.dispatch("companyStore/STORE_APPRAISAL_LIST", {
          size: sizeSet,
          page: this.page,
          searchCompanyStoreSid: this.companyStoreSid,
          searchYear: this.searchYear,
          searchMonth: this.searchMonth,
        });
        const res = this.getStoreAppraisalList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.len = res.storeAppraisal.last_page;
        this.list1 = res.storeAppraisal.data;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //트래픽 로그 검색
    async getTrafficLog(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_LIST", {
          searchYear: this.searchYear,
          searchMonth: this.searchMonth,
          searchKind: "All",
          companyStoreSid: sid,
        });
        const res = this.getStoreTrafficList.channeltuneApiResult;

        if (res.errorCode === 200) {
          this.log = res.storeTrafficDaily;
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //트래픽 일별 집계
    async getStoreAppraisalByDay(id) {
      if (this.timeList.length > 0 && id !== this.selectedSid) {
        this.timeList = [];
      }
      try {
        bus.$emit("start:spinner");
        await this.getTrafficLog(id);
        await this.$store.dispatch("companyStore/GET_STORE_APPRAISAL_LIST_DAILY", {
          year: this.searchYear,
          month: this.searchMonth,
          companyStoreSid: id,
        });
        const res = this.getStoreAppraisalListDaily.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, res.errorColor);
        }
        this.dailyList = res.storeAppraisalListDaily;

        this.selectedSid = id; //response 값 200 일때 제일 마지막에 변수 설정
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //트래픽 시간대별 집계
    async getStoreAppraisalByTime(date) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/GET_STORE_APPRAISAL_LIST_TIME", {
          searchDate: date,
          companyStoreSid: this.selectedSid,
        });
        const res = this.getStoreAppraisalListTime.channeltuneApiResult;

        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, res.errorColor);
        }
        this.timeList = res.storeAppraisalListTimeset;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //월 설정
    setMonth() {
      let today = new Date();
      let year = new Date().getFullYear();
      let month = today.getMonth() + 1;
      let monthString = month.toString();
      if (monthString < 10) {
        monthString = "0" + monthString;
      }
      this.searchYear = year;
      this.searchMonth = monthString;
    },
    storeAggregationModal(kinds) {
      this.$modal.show(StoreAggregation, { aggregationKind: kinds }, getPopupOpt("StoreAggregation", "1000px", "auto", false));
    },

    storeSearchModal() {
      this.$modal.show(StoreListModal, { update: this.updateStore }, getPopupOpt("StoreListModal", "1000px", "auto", false));
    },
    updateStore(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
    },
    //소수점 두 자리 버림
    numFloor(n) {
      return (Math.floor(n * 100) / 100).toFixed(2);
    },
    async onexport() {
      if (this.list1.length < 1) {
        return this.alim("데이터를 먼저 조회해주세요!", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_APPRAISAL_LIST", {
          size: "",
          page: "",
          searchCompanyStoreSid: this.companyStoreSid,
          searchYear: this.searchYear,
          searchMonth: this.searchMonth,
        });
        const res = this.getStoreAppraisalList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.excelData = res.storeAppraisal;
        // On Click Excel download button

        // export json to Worksheet of Excel
        // only array possible
        var animalWS = XLSX.utils.json_to_sheet(this.excelData);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, "트래픽 월 평균.xlsx"); // name of the file is 'book.xlsx'
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: space-between;
}
.member-manage {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 250px);
  & .member-list {
    width: 100% !important;
    border: 1px solid #ccc;
  }
  .border {
    height: 100%;
    & .scl {
      height: calc(100% - 53px);
      overflow-y: scroll;
    }
  }
  & .section3 {
    width: 250px;
    & article {
      border: 1px solid #ccc;
      padding: 20px;

      & .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dotted #ccc;
        padding-bottom: 5px;
      }
    }
    & .scl {
      width: 100%;
      height: calc(100% - 53px);
      overflow-y: scroll;
    }
    & .art {
      height: 50%;
    }
    & .sub_art {
      height: calc(50% - 10px);
    }
  }
  & .section1 {
    width: calc((100% - 290px) / 2);
  }
  & .section2 {
    width: calc((100% - 290px) / 2);
  }
}

.search {
  & .search-code {
    width: 120px !important;
  }
}
.year {
  width: 100px !important;
}
.month {
  width: 80px !important;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.field-div {
  & .input-first {
    width: 100px !important;
  }
  & .input-last {
    width: calc(100% - 175px) !important;
  }
}
</style>
