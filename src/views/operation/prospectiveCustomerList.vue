<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어 고객 현황</h1>
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
              <span class="mr5">스토어 유형</span>
              <pull-down :clear="clearField" :code="kindCode" @selected="storeKind" class="pull-down w150"></pull-down>
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
          <table class="tbl mt20">
            <caption>
              고객 리스트 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="70" />
              <col width="*" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="130" />
              <col width="90" />
              <col width="80" />
              <col width="70" />
              <col width="60" />
              <col width="60" />
              <col width="60" />
              <col width="60" />
              <col width="70" />
              <col width="60" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>등록날짜</th>
                <th>스토어(사이트)명</th>
                <th>스토어 유형</th>
                <th>내부담당자</th>
                <th>영업담당자</th>
                <th>스토어 담당자</th>
                <th>스토어 연락처</th>
                <th>스토어 상권</th>
                <th>입지분석</th>
                <th>유동20</th>
                <th>유동30</th>
                <th>유동40</th>
                <th>유동50</th>
                <th>실측날짜</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.prospectiveCustomerSid }}</td>
                <td>{{ item.prospectiveCustomerDate }}</td>
                <td class="left">{{ item.prospectiveCustomerStoreName }}</td>
                <td>{{ item.prospectiveCustomerStoreKindName }}</td>
                <td>{{ item.adminUserName }}</td>
                <td>{{ item.companyPersonName }}</td>
                <td class="left">{{ item.prospectiveCustomerName }}</td>
                <td>{{ item.prospectiveCustomerHp }}</td>
                <td>{{ item.prospectiveCustomerAnalyzeVolumeName }}</td>
                <td>{{ item.prospectiveCustomerAnalyzeLocationName }}</td>
                <td>{{ item.prospectiveCustomerFloatingPopulation20 }}</td>
                <td>{{ item.prospectiveCustomerFloatingPopulation30 }}</td>
                <td>{{ item.prospectiveCustomerFloatingPopulation40 }}</td>
                <td>{{ item.prospectiveCustomerFloatingPopulation50 }}</td>
                <td>{{ item.prospectiveCustomerSurveyDate }}</td>
                <td>{{ item.prospectiveCustomerStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="16">고객 리스트가 없습니다.</td>
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
      searchProspectiveCustomerDate_start: "",
      searchProspectiveCustomerDate_end: "",
      searchProspectiveCustomerStoreKind: "",
      searchProspectiveCustomerStatus: "",
      clearField: false,
      clearDate: false,
      today: "",
      len: null,
      list: [],
      //셀렉트 설정
      kindCode: "SYS21802B007",
      statusCode: "SYS21802B012",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("prospectiveCustomer", ["getCustomerList"]),
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
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          searchProspectiveCustomerDate_start: this.searchProspectiveCustomerDate_start,
          searchProspectiveCustomerDate_end: this.searchProspectiveCustomerDate_end,
          searchProspectiveCustomerStoreKind: this.searchProspectiveCustomerStoreKind,
          searchProspectiveCustomerStatus: this.searchProspectiveCustomerStatus,
        });
        if (this.getCustomerList.channeltuneApiResult.errorCode == 200) {
          const customerList = this.getCustomerList.channeltuneApiResult.prospectiveCustomer;
          this.list = customerList.data;
          this.len = customerList.last_page;
        } else {
          this.alim(this.getCustomerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    startDay(date) {
      this.searchProspectiveCustomerDate_start = date;
    },
    endDay(date) {
      this.searchProspectiveCustomerDate_end = date;
    },
    storeKind(data) {
      this.searchProspectiveCustomerStoreKind = data.sysCodeSid;
    },
    status(data) {
      this.searchProspectiveCustomerStatus = data.sysCodeSid;
    },
    clear() {
      this.searchText = "";
      this.searchProspectiveCustomerDate_start = "";
      this.searchProspectiveCustomerDate_end = "";
      this.searchProspectiveCustomerStoreKind = "";
      this.searchProspectiveCustomerStatus = "";
      this.clearField = !this.clearField;
      this.clearDate = !this.clearDate;
      this.today = "";
      this.reload(1);
    },
    setToday() {
      this.today = new Date().toISOString().substr(0, 10);
      this.searchProspectiveCustomerDate_start = new Date().toISOString().substr(0, 10);
      this.searchProspectiveCustomerDate_end = new Date().toISOString().substr(0, 10);
      const _this = this;
      let time = setTimeout(function () {
        _this.today = "";
        clearInterval(time);
      }, 100);
    },
    search() {
      if (this.searchProspectiveCustomerDate_start > this.searchProspectiveCustomerDate_end) {
        this.alim("종료날짜가 시작날짜보다 빠릅니다.", this.errorColor);
        return false;
      }
      this.reload(1);
    },
    //엑셀 다운로드
    async onexport() {
      // On Click Excel download button
      try {
        bus.$emit("start:spinner");
        //엑셀용 전체 데이터 불러오기
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_LIST", {
          size: "",
          page: "",
          searchText: this.searchText,
          searchProspectiveCustomerDate_start: this.searchProspectiveCustomerDate_start,
          searchProspectiveCustomerDate_end: this.searchProspectiveCustomerDate_end,
          searchProspectiveCustomerStoreKind: this.searchProspectiveCustomerStoreKind,
          searchProspectiveCustomerStatus: this.searchProspectiveCustomerStatus,
        });
        if (this.getCustomerList.channeltuneApiResult.errorCode === 200) {
          const customerList = this.getCustomerList.channeltuneApiResult.prospectiveCustomer;
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
        XLSX.writeFile(wb, "스토어 고객 리스트.xlsx"); // name of the file is 'book.xlsx'
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
