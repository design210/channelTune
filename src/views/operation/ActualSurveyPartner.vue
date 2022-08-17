<template>
  <section class="container">
    <div class="title-wrap">
      <h1>에이전트 고객/실측</h1>
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
              <input type="text" placeholder="고객(회사)명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="search" />
              <v-btn small color="primary" dark class="btn-search" @click="search">조회</v-btn>
              <v-btn small color="success" dark @click="onexport">XLSX</v-btn>
              <v-btn small @click="clear">검색 초기화</v-btn>
            </div>
          </div>
          <table class="tbl mt20">
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
                <th>상담일</th>
                <th>고객(회사)명</th>
                <th>이름</th>
                <th>연락처</th>
                <th>설치희망일</th>
                <th>상품명</th>
                <th>상권등급</th>
                <th>입지등급</th>
                <th>트래픽</th>
                <th>Report</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="showModalPopup(item.actualSurveyPartnerSid)">
                <td>{{ item.actualSurveyPartnerSid }}</td>
                <td>{{ item.actualSurveyPartnerUserDate }}</td>
                <td>{{ item.actualSurveyPartnerUserCompanyName }}</td>
                <td>{{ item.actualSurveyPartnerUserName }}</td>
                <td>{{ item.actualSurveyPartnerUserHp }}</td>
                <td>{{ item.actualSurveyPartnerInstallDate }}</td>
                <td>{{ item.actualSurveyPartnerProductName }}</td>
                <td>{{ item.actualSurveyPartnerAnalyzeVolumeName }}</td>
                <td>{{ item.actualSurveyPartnerAnalyzeLocationName }}</td>
                <td>{{ item.actualSurveyPartnerFloatingPopulation }}</td>
                <td>
                  <v-btn small @click="clear" color="primary" :disabled="item.actualSurveyPartnerStatus !== 'SYS21819B005'">리포트</v-btn>
                </td>
                <td>{{ item.actualSurveyPartnerStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="12">실측 리스트가 없습니다.</td>
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
import { getPopupOpt } from "@/utils/modal";
import actualSurveyPartnerModal from "@/components/modal/assets/ActualSurveyPartner.vue";
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
      searchActualSurveyPartnerDate_start: "",
      searchActualSurveyPartnerDate_end: "",
      searchActualSurveyPartnerStatus: "",
      clearField: false,
      clearDate: false,
      today: "",
      len: null,
      list: [],
      //셀렉트 설정
      statusCode: "SYS21819B003",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("actualSurveyPartner", ["getActualSurveyPartnerList"]),
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
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          searchActualSurveyPartnerDate_start: this.searchActualSurveyPartnerDate_start,
          searchActualSurveyPartnerDate_end: this.searchActualSurveyPartnerDate_end,
          searchActualSurveyPartnerStatus: this.searchActualSurveyPartnerStatus,
        });
        if (this.getActualSurveyPartnerList.channeltuneApiResult.errorCode == 200) {
          const customerList = this.getActualSurveyPartnerList.channeltuneApiResult.actualSurveyPartner;
          this.list = customerList.data;
          this.len = customerList.last_page;
        } else {
          this.alim(this.getActualSurveyPartnerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    startDay(date) {
      this.searchActualSurveyPartnerDate_start = date;
    },
    endDay(date) {
      this.searchActualSurveyPartnerDate_end = date;
    },
    status(data) {
      this.searchActualSurveyPartnerStatus = data.sysCodeSid;
    },
    clear() {
      this.searchText = "";
      this.searchActualSurveyPartnerDate_start = "";
      this.searchActualSurveyPartnerDate_end = "";
      this.searchActualSurveyPartnerStatus = "";
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
      if (this.searchActualSurveyPartnerDate_start > this.searchActualSurveyPartnerDate_end) {
        this.alim("종료날짜가 시작날짜보다 빠릅니다.", this.errorColor);
        return false;
      }
      this.reload(1);
    },
    //상세 모달
    showModalPopup(id) {
      this.$modal.show(actualSurveyPartnerModal, { update: this.update, id }, getPopupOpt("actualSurveyPartnerModal", "1500px", "auto", false));
    },
    update() {
      this.reload(0);
    },
    //엑셀 다운로드
    async onexport() {
      // On Click Excel download button
      //엑셀용 전체 데이터 불러오기
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_LIST", {
          size: "",
          page: "",
          searchText: this.searchText,
          searchActualSurveyPartnerDate_start: this.searchActualSurveyPartnerDate_start,
          searchActualSurveyPartnerDate_end: this.searchActualSurveyPartnerDate_end,
          searchActualSurveyPartnerStatus: this.searchActualSurveyPartnerStatus,
        });
        if (this.getActualSurveyPartnerList.channeltuneApiResult.errorCode === 200) {
          const agentList = this.getActualSurveyPartnerList.channeltuneApiResult.actualSurveyPartner;
          this.excelDatas = agentList;
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
        XLSX.writeFile(wb, "에이전트 고객/실측 리스트.xlsx"); // name of the file is 'book.xlsx'
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
