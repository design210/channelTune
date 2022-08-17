<template>
  <section class="container">
    <div class="title-wrap">
      <h1>실측관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <div class="search-group">
              <span class="mr5">시작날짜</span>
              <date-picker :current="today" :clear="clearDate" @updateDate="startDay" class="date"></date-picker>
              <span class="ml10 mr5">~ 종료날짜</span>
              <date-picker :current="today" :clear="clearDate" @updateDate="endDay" class="date"></date-picker>
              <v-btn small color="primary" dark class="ml10 mr30" @click="setToday">Today</v-btn>
              <span class="ml15 mr5">상태</span>
              <pull-down :clear="clearField" :code="statusCode" @selected="status" class="pull-down w150"></pull-down>
            </div>
            <div class="search">
              <input type="text" placeholder="스토어명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="search" />
              <v-btn small color="primary" dark class="btn-search" @click="search">조회</v-btn>
              <v-btn small color="success" dark @click="onexport">XLSX</v-btn>
              <v-btn small @click="clear">검색 초기화</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              고객 리스트 테이블
            </caption>
            <!-- <colgroup>
							<col width="150" />
							<col width="120" />
							<col width="*" />
							<col width="150" />
							<col width="90" />
							<col width="90" />
							<col width="90" />
							<col width="100" />
							<col width="90" />
						</colgroup> -->
            <thead>
              <tr>
                <th>고유코드</th>
                <th>실측날짜</th>
                <th>스토어 국가</th>
                <th>스토어 지역</th>
                <th>스토어(사이트)명</th>
                <th>고객유형</th>
                <th>내부담당자</th>
                <th>영업담당자</th>
                <th>고객 담당자</th>
                <th>고객 연락처</th>
                <th>현장 실측 날짜</th>
                <th>현장 실측 담당자</th>
                <th>실측 상태</th>
                <th>실측 Report</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="showModalPopup(item.actualSurveySid)">
                <td>{{ item.actualSurveySid }}</td>
                <td>{{ item.actualSurveyDate }}</td>
                <td>{{ item.prospectiveCustomerStoreNationName }}</td>
                <td>{{ item.prospectiveCustomerStoreArea }}</td>
                <td>{{ item.prospectiveCustomerStoreName }}</td>
                <td>{{ item.prospectiveCustomerStoreKindName }}</td>
                <td>{{ item.interbridEmployeeName }}</td>
                <td>{{ item.companyPersonName }}</td>
                <td>{{ item.prospectiveCustomerName }}</td>
                <td>{{ item.prospectiveCustomerHp }}</td>
                <td>{{ item.actualSurveyDate }}</td>
                <td>{{ item.actualSurveyName }}</td>
                <td>{{ item.actualSurveyStatusName }}</td>
                <td>
                  <v-btn small @click="clear" color="primary" :disabled="item.actualSurveyStatus !== 'SYS21804B003'">리포트</v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="14">실측관리 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import XLSX from "xlsx";
import { mapGetters } from "vuex";
import PullDown from "@/components/form/PullDown.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import alim from "@/components/dialog/Alim.vue";
import actualSurveyModal from "@/components/modal/common/ActualSurvey.vue";
import { getPopupOpt } from "@/utils/modal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim, PullDown, DatePicker },
  mixins: [loading, alimMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      searchActualSurveyDate_start: "",
      searchActualSurveyDate_end: "",
      searchActualSurveyStatus: "",
      clearField: false,
      clearDate: false,
      today: "",
      len: null,
      list: [],
      //셀렉트 설정
      statusCode: "SYS21804B001",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("actualSurvey", ["getActualSurveyList"]),
    loadingSize: function () {
      return this.listSize;
    },
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  //데이터 불러오기
  methods: {
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurvey/ACTUALSURVEY_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          searchActualSurveyDate_start: this.searchActualSurveyDate_start,
          searchActualSurveyDate_end: this.searchActualSurveyDate_end,
          searchActualSurveyStatus: this.searchActualSurveyStatus,
        });
        if (this.getActualSurveyList.channeltuneApiResult.errorCode == 200) {
          const customerList = this.getActualSurveyList.channeltuneApiResult.actualSurvey;
          this.list = customerList.data;
          this.len = customerList.last_page;
        } else {
          this.alim(this.getActualSurveyList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    startDay(date) {
      this.searchActualSurveyDate_start = date;
    },
    endDay(date) {
      this.searchActualSurveyDate_end = date;
    },
    status(data) {
      this.searchActualSurveyStatus = data.sysCodeSid;
    },
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.searchText = "";
      this.searchActualSurveyDate_start = "";
      this.searchActualSurveyDate_end = "";
      this.searchActualSurveyStatus = "";
      this.clearField = !this.clearField;
      this.clearDate = !this.clearDate;
      this.today = "";
      this.reload(1);
    },
    setToday() {
      this.today = new Date().toISOString().substr(0, 10);
      this.searchActualSurveyDate_start = new Date().toISOString().substr(0, 10);
      this.searchActualSurveyDate_end = new Date().toISOString().substr(0, 10);
      const _this = this;
      let time = setTimeout(function () {
        _this.today = "";
        clearInterval(time);
      }, 100);
    },
    search() {
      if (this.searchActualSurveyDate_start > this.searchActualSurveyDate_end) {
        this.alim("종료날짜가 시작날짜보다 빠릅니다.", this.errorColor);
        return false;
      }
      this.reload(1);
    },
    //상세 모달
    showModalPopup(id) {
      this.$modal.show(actualSurveyModal, { update: this.update, id }, getPopupOpt("actualSurveyModal", "1500px", "auto", false));
    },
    update() {
      this.reload(0);
    },
    //엑셀 다운로드
    async onexport() {
      try {
        // On Click Excel download button
        bus.$emit("start:spinner");
        //엑셀용 전체 데이터 불러오기
        await this.$store.dispatch("actualSurvey/ACTUALSURVEY_LIST", {
          size: "",
          page: "",
          searchText: this.searchText,
          searchActualSurveyDate_start: this.searchActualSurveyDate_start,
          searchActualSurveyDate_end: this.searchActualSurveyDate_end,
          searchActualSurveyStatus: this.searchActualSurveyStatus,
        });
        if (this.getActualSurveyList.channeltuneApiResult.errorCode === 200) {
          const customerList = this.getActualSurveyList.channeltuneApiResult.actualSurvey;
          this.excelDatas = customerList;
        }

        // export json to Worksheet of Excel
        // only array possible
        var animalWS = XLSX.utils.json_to_sheet(this.excelDatas);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, "실측관리 리스트.xlsx"); // name of the file is 'book.xlsx'
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
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 100% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
}
</style>
