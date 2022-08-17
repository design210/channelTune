<template>
  <section class="container">
    <div class="title-wrap">
      <h1>월별 스토어 트래픽 등록</h1>
    </div>
    <div class="mb10">
      <div class="header flx">
        <div class="search-group">
          <div class="year"><v-select :items="year" v-model="searchYear" outlined class="select-basic mr5"></v-select></div>
          <div class="month"><v-select :items="month" v-model="searchMonth" outlined class="select-basic"></v-select></div>
          <v-btn small color="primary" dark class="ml5 mr20" @click="setMonth">당월</v-btn>

          <v-radio-group class="ml20" v-model="searchKind">
            <v-radio label="날짜별" value="Daily"></v-radio>
            <v-radio label="시간별(항목수정 가능)" value="All"></v-radio>
            <v-radio label="스토어별(스토어 코드 일괄수정 가능)" value="Store"></v-radio>
          </v-radio-group>
        </div>
        <div class="search ml30">
          <input type="text" v-model="searchText" class="search-input" @keyup.enter="trafficDetail(1)" />
          <v-btn small color="primary" class="btn-search" @click="trafficDetail(1)">조회</v-btn>
          <v-btn small color="success" @click="xlsxLogModal">xlsx 로그 등록</v-btn>
          <v-btn small color="warning" @click="processingModal">데이터 처리</v-btn>
        </div>
      </div>
    </div>
    <section class="member-manage">
      <section class="section-box border-outside">
        <div class="border">
          <h2>트래픽 로그</h2>
          <table class="tbl user-list-tbl select-tbl mt10">
            <caption>
              테이블
            </caption>
            <colgroup>
              <col width="50" />
              <col width="100" />
              <col width="*" />
              <col width="*" />
              <col v-if="showDate" width="80" />
              <col v-if="showTime" width="54" />
              <col width="54" />
              <col width="54" />
              <col width="54" />
              <col width="54" />
              <col width="54" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>코드</th>
                <th>스토어 고유코드</th>
                <th class="left">스토어 명</th>
                <th class="left">스토어 명(CC)</th>
                <th v-if="showDate">날짜</th>
                <th v-if="showTime">시간</th>
                <th class="right">통행객</th>
                <th class="right">방문율</th>
                <th class="right">방문객</th>
                <th class="right">체류율</th>
                <th class="right">체류객</th>
                <th class="right">체류시간(H)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list2" :key="index" @click="storeDetail(item.storeTrafficDailySid, item.companyStoreName)">
                <td>{{ item.storeTrafficDailySid }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td class="left">{{ item.companyStoreCodeName }}</td>
                <td v-if="showDate">{{ item.storeTrafficDailyDate }}</td>
                <td v-if="showTime">{{ item.storeTrafficDailyHour }}</td>
                <td class="right">{{ item.storeTrafficDailyTrafficCount | comma }}</td>
                <td class="right">{{ numFloor(item.storeTrafficDailyVisitRatio) | comma }}</td>
                <td class="right">{{ item.storeTrafficDailyVisitCount | comma }}</td>
                <td class="right">{{ numFloor(item.storeTrafficDailyStayRatio) | comma }}</td>
                <td class="right">{{ item.storeTrafficDaillyStayCount | comma }}</td>
                <td class="right">{{ numFloor(item.storeTrafficDailyStayAvg) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list2.length < 1">
              <tr>
                <td :colspan="tableLength">스토어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page2" :length="len2" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>항목</h2>
            <div class="btn-group d-flex">
              <div v-show="searchKind === 'All'">
                <v-btn small color="primary" @click="validate('add')">등록</v-btn>
                <v-btn small color="warning" @click="validate('update')">수정</v-btn>
                <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
              </div>
              <v-btn small @click="clearList">CLEAR</v-btn>
            </div>
          </div>
          <div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="60" />
                <col width="*" />
                <col width="70" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td><input type="text" v-model="storeTrafficDailySid" readonly /></td>
              </tr>
              <tr>
                <td class="required">스토어</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" @click="storeSearchModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">입력날짜</td>
                <td><date-picker :propdate="storeTrafficDailyDate" @updateDate="newStartDate" /></td>
                <td class="required">입력시간(H)</td>
                <td><v-select :items="hour" outlined class="select-basic" v-model="storeTrafficDailyHour"></v-select></td>
                <!-- <td><pull-down
										:onlyRead="readStatus"
										:data="actualSurveyStatusName"
										:code="statusCode"
										@selected="actualSurveyStatusNameProp"
										class="pull-down"
									></pull-down></td> -->
              </tr>
              <tr>
                <td>통행객</td>
                <td><input type="text" v-model="storeTrafficDailyTrafficCount" /></td>
                <td>방문율</td>
                <td><input type="text" v-model="storeTrafficDailyVisitRatio" /></td>
              </tr>
              <tr>
                <td>방문객</td>
                <td><input type="text" v-model="storeTrafficDailyVisitCount" /></td>
                <td>체류율</td>
                <td><input type="text" v-model="storeTrafficDailyStayRatio" /></td>
              </tr>
              <tr>
                <td>체류객</td>
                <td><input type="text" v-model="storeTrafficDaillyStayCount" /></td>
                <td>체류시간</td>
                <td><input type="text" v-model="storeTrafficDailyStayAvg" /></td>
              </tr>
              <tr>
                <td class="pt10" colspan="4">
                  <ul>
                    <li class="info-txt">항목 등록 / 수정 / 삭제는 시간별 조회시 해당 로그를 선택하면 가능합니다.</li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
          <div class="header mt50">
            <h2 class="d-flex">스토어 코드 일괄 수정</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="changeStoreCode">일괄 변경</v-btn>
              <v-btn small @click="clearNewStore">CLEAR</v-btn>
            </div>
          </div>
          <table class="tbl-reg column2 mt20">
            <colgroup>
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>선택 스토어 명</td>
              <td colspan="3"><input type="text" readonly v-model="selectedStore" /></td>
            </tr>
            <tr>
              <td>스토어</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="newCompanyStoreSid" />
                <input type="text" class="input-last" readonly v-model="newCompanyStoreName" />
                <v-btn small color="primary" @click="storeSearchModal2">검색</v-btn>
              </td>
            </tr>
            <tr>
              <td class="pt40" colspan="4">
                <ul>
                  <li class="info-txt">스토어 별로 검색시 해당 리스트를 선택하면 해당 트래픽 년월의 스토어 코드를 일괄적으로 수정이 가능합니다.</li>
                </ul>
              </td>
            </tr>
          </table>

          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "@/components/form/DatePicker";
import alim from "@/components/dialog/Alim.vue";
import StoreListModal from "@/components/modal/common/StoreList.vue";
import resMixin from "@/mixins/response";
import { getPopupOpt } from "@/utils/modal";
import { year } from "@/utils/yearSet";
import confirm from "@/components/dialog/Confirm.vue";
import deleteMixin from "@/mixins/delete.js";
import xlsxLogModal from "@/components/modal/operation/XlsxLog.vue";
import DataProcess from "@/components/modal/operation/DataProcess.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
export default {
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  components: { alim, DatePicker, confirm },
  mixins: [loading, alimMixin, resMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      year: [],
      hour: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      month: ["전체", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      searchYear: "",
      searchMonth: "",
      searchCompanyStoreSid: "",
      searchText: "",
      searchKind: "Daily",
      companyStoreSid: "",
      companyStoreName: "",
      trafficSid: "",
      storeTrafficDailySid: "",
      storeTrafficDailyDate: "",
      storeTrafficDailyHour: "",
      storeTrafficDailyTrafficCount: "",
      storeTrafficDailyVisitRatio: "",
      storeTrafficDailyVisitCount: "",
      storeTrafficDailyStayRatio: "",
      storeTrafficDaillyStayCount: "",
      storeTrafficDailyStayAvg: "",
      selectItem: false,
      //게시물 설정2
      page2: 1,
      len2: null,
      list2: [],
      //셀렉트 설정
      statusCode: "SYS21804B001",
      excelDatas: [],

      newCompanyStoreSid: "",
      newCompanyStoreName: "",

      showTime: true,
      showDate: true,
      selectedStore: "",
      tableLength: 12,

      dialog: false,
      dialogTitle: "",
      dialogText: "",
    };
  },
  computed: {
    ...mapGetters("companyStore", [
      "storeTrafficDetail",
      "getStoreTrafficList",
      "storeTrafficChangeAll",
      "StoreTrafficlReg",
      "storeTrafficDelResult",
      "StoreTrafficModifyResult",
    ]),
    loadingSize: function () {
      return this.listSize;
    },
  },
  watch: {
    page2() {
      this.trafficDetail();
    },
  },
  mounted() {
    //연도 select 설정
    const yearset = year();
    this.year = yearset;
    this.setMonth();
  },

  //데이터 불러오기
  methods: {
    async storeDetail(id, storeName) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_DETAIL", id);
        if (this.storeTrafficDetail.channeltuneApiResult.errorCode !== 200) {
          this.alim(this.storeTrafficDetail.channeltuneApiResult.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return;
        }
        const detail = this.storeTrafficDetail.channeltuneApiResult.storeTrafficDaily;
        this.storeTrafficDailySid = detail.storeTrafficDailySid;
        this.companyStoreSid = detail.companyStoreSid;
        this.companyStoreName = detail.companyStoreName;
        this.storeTrafficDailyDate = detail.storeTrafficDailyDate;
        this.storeTrafficDailyHour = detail.storeTrafficDailyHour;
        this.storeTrafficDailyTrafficCount = detail.storeTrafficDailyTrafficCount;
        this.storeTrafficDailyVisitRatio = this.numFloor(detail.storeTrafficDailyVisitRatio);
        this.storeTrafficDailyVisitCount = detail.storeTrafficDailyVisitCount;
        this.storeTrafficDailyStayRatio = this.numFloor(detail.storeTrafficDailyStayRatio);
        this.storeTrafficDaillyStayCount = detail.storeTrafficDaillyStayCount;
        this.storeTrafficDailyStayAvg = this.numFloor(detail.storeTrafficDailyStayAvg);
        if (this.searchKind === "Store") {
          this.selectStore(storeName);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async trafficDetail(num) {
      if (num === 0) {
        this.clear();
      }
      if (num === 1) {
        this.page2 = 1;
      }
      try {
        bus.$emit("start:spinner");
        const size = this.size - 9;
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_LIST", {
          size: size,
          page: this.page2,
          searchText: this.searchText,
          searchYear: this.searchYear,
          searchMonth: this.searchMonth,
          searchKind: this.searchKind,
        });
        this.searchKind !== "Store" ? (this.showDate = true) : (this.showDate = false);
        this.searchKind === "All" ? (this.showTime = true) : (this.showTime = false);

        switch (this.searchKind) {
          case "Daily":
            this.tableLength = 11;
            break;
          case "All":
            this.tableLength = 12;
            break;
          case "Store":
            this.tableLength = 10;
            break;
        }
        if (this.getStoreTrafficList.channeltuneApiResult.errorCode === 200) {
          const storeTrafficList = this.getStoreTrafficList.channeltuneApiResult.storeTrafficDaily;
          this.list2 = storeTrafficList.data;
          this.len2 = storeTrafficList.last_page;
        } else {
          this.alim(this.getStoreTrafficList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach((ele) => ele.classList.remove("active"));
    },
    //트래픽 로그 등록
    async trafficLogAdd() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_REG", {
          companyStoreSid: this.companyStoreSid,
          companyStoreName: this.companyStoreName,
          storeTrafficDailyDate: this.storeTrafficDailyDate,
          storeTrafficDailyHour: this.storeTrafficDailyHour,
          storeTrafficDailyTrafficCount: this.storeTrafficDailyTrafficCount,
          storeTrafficDailyVisitCount: this.storeTrafficDailyVisitCount,
          storeTrafficDailyVisitRatio: this.storeTrafficDailyVisitRatio,
          storeTrafficDaillyStayCount: this.storeTrafficDaillyStayCount,
          storeTrafficDailyStayRatio: this.storeTrafficDailyStayRatio,
          storeTrafficDailyStayAvg: this.storeTrafficDailyStayAvg,
        });
        const res = this.StoreTrafficlReg.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.alim(res.errorMessage, this.successColor);
        await this.trafficDetail();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //트래픽 로그 수정
    async trafficLogModify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_MODIFY", {
          storeTrafficDailySid: this.storeTrafficDailySid,
          companyStoreSid: this.companyStoreSid,
          companyStoreName: this.companyStoreName,
          storeTrafficDailyDate: this.storeTrafficDailyDate,
          storeTrafficDailyHour: this.storeTrafficDailyHour,
          storeTrafficDailyTrafficCount: this.storeTrafficDailyTrafficCount,
          storeTrafficDailyVisitCount: this.storeTrafficDailyVisitCount,
          storeTrafficDailyVisitRatio: this.storeTrafficDailyVisitRatio,
          storeTrafficDaillyStayCount: this.storeTrafficDaillyStayCount,
          storeTrafficDailyStayRatio: this.storeTrafficDailyStayRatio,
          storeTrafficDailyStayAvg: this.storeTrafficDailyStayAvg,
        });
        const res = this.StoreTrafficModifyResult.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //트래픽 로그 삭제
    async trafficLogDelete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_DEL", this.storeTrafficDailySid);

        const res = this.storeTrafficDelResult.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.alim(res.errorMessage, this.successColor);
        await this.trafficDetail();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("companyStore/STORE_TRAFFIC_DEL", this.storeTrafficDailySid);
            if (this.storeTrafficDelResult.channeltuneApiResult.errorCode === 200) {
              this.alim(this.storeTrafficDelResult.channeltuneApiResult.errorMessage, this.successColor);
              this.trafficDetail();
            } else {
              this.alim(this.storeTrafficDelResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    validate(type) {
      if (this.searchKind !== "All") {
        return this.alim("로그 구분을 시간별로 설정 해야합니다.", this.errorColor);
      }
      //삭제
      if (type === "delete") {
        if (this.storeTrafficDailySid === "" || this.storeTrafficDailySid === null) {
          return this.alim("로그를 선택해 주세요", this.errorColor);
        }
        this.confirm();
      }

      if (this.companyStoreSid === "" || this.companyStoreSid === null) {
        return this.alim("스토어를 선택해주세요", this.errorColor);
      }
      if (this.storeTrafficDailyDate === "" || this.storeTrafficDailyDate === null) {
        return this.alim("입력 날짜를 선택해주세요", this.errorColor);
      }
      if (this.storeTrafficDailyHour === "" || this.storeTrafficDailyHour === null) {
        return this.alim("입력시간을 선택해주세요", this.errorColor);
      }

      //수정 및 추가
      if (type === "add") {
        this.trafficLogAdd();
      } else if (type === "update") {
        this.trafficLogModify();
      }
    },
    xlsxLogModal() {
      this.$modal.show(xlsxLogModal, {}, getPopupOpt("xlsxLogModal", "500px", "auto", false));
    },
    storeSearchModal() {
      this.$modal.show(StoreListModal, { update: this.updateStore }, getPopupOpt("StoreListModal", "1000px", "auto", false));
    },
    storeSearchModal2() {
      this.$modal.show(StoreListModal, { update: this.updateStore2 }, getPopupOpt("StoreListModal", "1000px", "auto", false));
    },
    updateStore(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
    },
    updateStore2(data) {
      this.newCompanyStoreSid = data.id;
      this.newCompanyStoreName = data.name;
    },
    //스토어 코드 일괄수정
    async changeStoreCode() {
      if (this.searchKind !== "Store") {
        return this.alim("로그 구분을 스토어별로 설정해야 합니다.", this.errorColor);
      }
      if (this.newCompanyStoreSid === "" || this.newCompanyStoreSid === null) {
        return this.alim("스토어를 선택해 주세요", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_CHANGE_ALL", {
          searchCompanyStoreSid: this.newCompanyStoreSid,
          searchCompanyStoreName: this.selectedStore,
          storeTrafficDailyYear: this.searchYear,
          storeTrafficDailyMonth: this.searchMonth,
        });
        const res = this.storeTrafficChangeAll.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.trafficDetail();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    //당월
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
    numFloor(n) {
      return (Math.floor(n * 100) / 100).toFixed(2);
    },
    newStartDate(data) {
      this.storeTrafficDailyDate = data;
    },
    selectStore(data) {
      this.selectedStore = data;
    },
    //항목 지우기
    clearList() {
      this.storeTrafficDailySid = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.storeTrafficDailyDate = "";
      this.storeTrafficDailyHour = "";
      this.storeTrafficDailyTrafficCount = "";
      this.storeTrafficDailyVisitRatio = "";
      this.storeTrafficDailyVisitCount = "";
      this.storeTrafficDailyStayRatio = "";
      this.storeTrafficDaillyStayCount = "";
      this.storeTrafficDailyStayAvg = "";
    },
    clearNewStore() {
      this.newCompanyStoreSid = "";
      this.newCompanyStoreName = "";
    },
    processingModal() {
      this.$modal.show(DataProcess, {}, getPopupOpt("DataProcess", "800px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  @include NotoSans(1.4, 400, #000);
  padding-left: 13px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 8px;
    left: 2px;
    background-color: #000;
    width: 3px;
    height: 3px;
    border-radius: 50%;
  }
}
.flx {
  display: flex;
  justify-content: space-between;
}
.ml20::v-deep {
  & .v-input__slot {
    margin: 0 !important;
  }
  & .v-input--radio-group__input {
    display: flex;
    flex-direction: row !important;
    & .v-radio {
      margin-bottom: 0 !important;
      margin-right: 20px !important;
    }
  }
  & .v-messages {
    display: none;
  }
}
h2 {
  &.d-flex {
    align-items: center;
    height: 30px;
    & .radio {
      margin-left: 10px;
      padding-top: 13px;
    }
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
    padding: 0 3px !important;
  }
  & th {
    padding: 0 3px;
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
  & .section-box {
    width: 70%;
    &.init-wrap {
      width: calc(30% - 10px);
    }
  }
}
.search {
  & .search-code {
    width: 120px !important;
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 175px) !important;
  }
}
.info-txt {
  @include NotoSans(1.2, 400, #666);
}
</style>
