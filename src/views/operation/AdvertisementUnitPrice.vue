<template>
  <section class="container">
    <div class="title-wrap">
      <h1>월별 스토어 광고 단가</h1>
    </div>
    <div class="mb10">
      <div class="header flx">
        <div class="search-group">
          <div class="year"><v-select :items="year" v-model="searchYear" outlined class="select-basic mr5"></v-select></div>
          <div class="month"><v-select :items="month" v-model="searchMonth" outlined class="select-basic"></v-select></div>
          <v-btn small color="primary" dark class="ml10 mr30" @click="setMonth">당월</v-btn>
        </div>
        <div class="search-group field-div search">
          <span>업체</span>
          <input type="text" class="input-first ml10 mr10" readonly v-model="companySid" />
          <input type="text" class="input-last" v-model="companyName" />
          <v-btn small class="ml10" color="primary" @click="companyListModal">검색</v-btn>
        </div>
        <div class="put">
          <span>스토어</span>
          <input type="text" class="input-last" v-model="searchText" @keyup.enter="getUnitPriceData(1)" />
          <v-btn small class="ml10 mr5" color="primary" @click="getUnitPriceData(1)">조회</v-btn>
          <v-btn small class="btn-search" @click="clear">CLEAR</v-btn>
        </div>
        <div class="search ml150">
          <v-btn small dark color="success" class="btn-search" @click="onexport">XLSX 다운로드</v-btn>
        </div>
      </div>
      <section class="member-manage mt20">
        <section class="section1 section-box border-outside">
          <div class="border">
            <div>
              <table width="100%" class="tbl tbl-reg">
                <caption>
                  트래픽 월 평균
                </caption>
                <colgroup>
                  <col width="80" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                  <col width="80" />
                  <col width="70" />
                  <col width="90" />
                  <col width="70" />
                  <col width="70" />
                  <col width="70" />
                  <col width="100" />
                  <col width="100" />
                  <col width="70" />
                </colgroup>
                <thead>
                  <tr>
                    <th>스토어 코드</th>
                    <th class="left">스토어 명</th>
                    <th>업체코드</th>
                    <th class="left">업체명</th>
                    <th class="left">업종</th>
                    <th>송출시간</th>
                    <th>운영시간</th>
                    <th class="right">운영구좌</th>
                    <th>최대슬롯</th>
                    <th class="right">CPM</th>
                    <th class="right">월평균통행량</th>
                    <th class="right">1슬롯당 1일 단가</th>
                    <th>운영상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in list" :key="index">
                    <td>{{ item.storeSid }}</td>
                    <td class="left">{{ item.storeName }}</td>
                    <td>{{ item.companySid }}</td>
                    <td class="left">{{ item.companyName }}</td>
                    <td class="left">{{ item.businessTypeName }}</td>
                    <td>{{ item.totalDisplayTime }}</td>
                    <td>{{ item.operationTime }}</td>
                    <td class="right">{{ item.organizedSlotCount }}</td>
                    <td>{{ item.storeWorkSlot }}</td>
                    <td class="right">{{ item.storeCpm }}</td>
                    <td class="right">{{ item.monthTrafficAvg }}</td>
                    <td class="right">{{ item.dayPrice }}</td>
                    <td>{{ item.storeStatusName }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="list.length < 1">
                  <tr>
                    <td colspan="12">트래픽 리스트가 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
              <div class="text-center mt5">
                <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
              </div>
            </div>
          </div>
        </section>

        <!-- <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm> -->

        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </div>
  </section>
</template>

<script>
import { year } from "@/utils/yearSet";
import companyListModal from "@/components/modal/common/CompanyList.vue";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import XLSX from "xlsx";
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
      list: [],
      year: [],
      excelData: [],
      searchYear: "",
      searchMonth: "",
      searchText: "",
      companySid: "",
      companyName: "",
      selectedSid: "",

      month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getUnitPrice"]),
  },
  watch: {
    page() {
      this.getUnitPriceData();
    },
    size() {
      this.getUnitPriceData();
    },
  },
  mounted() {
    const yearset = year();
    this.year = yearset;
    this.setMonth();

    this.getUnitPriceData(0);
  },
  methods: {
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

    //스토어 가격 단가
    async getUnitPriceData(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/GET_UNIT_PRICE", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          year: this.searchYear,
          month: this.searchMonth,
          companySid: this.companySid,
        });
        const res = this.getUnitPrice.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.companyStore.data;
        this.len = res.companyStore.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    companyListModal() {
      this.$modal.show(companyListModal, { update: this.updateStore }, getPopupOpt("companyListModal", "1000px", "auto", false));
    },
    updateStore(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    //소수점 두 자리 버림
    numFloor(n) {
      return (Math.floor(n * 100) / 100).toFixed(2);
    },
    async onexport() {
      if (this.list.length < 1) {
        return this.alim("데이터를 먼저 조회해주세요!", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
      } catch (error) {
        this.alim(error, this.errorColor);
        await this.$store.dispatch("companyStore/GET_UNIT_PRICE", {
          size: "",
          page: "",
          searchText: this.searchText,
          year: this.searchYear,
          month: this.searchMonth,
          companySid: this.companySid,
        });
        const res = this.getUnitPrice.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.excelData = res.companyStore;
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
        XLSX.writeFile(wb, "월별 스토어 광고 단가.xlsx"); // name of the file is 'book.xlsx'
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.page = 1;
      this.len = null;
      this.list = [];
      this.year = [];
      this.excelData = [];
      this.searchYear = "";
      this.searchMonth = "";
      this.searchText = "";
      this.companySid = "";
      this.companyName = "";
      this.selectedSid = "";

      const yearset = year();
      this.year = yearset;
      this.setMonth();
    },
  },
};
</script>

<style lang="scss" scoped>
.put {
  & input {
    margin-left: 5px;
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: 200px;
  }
}
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

  & .section1 {
    width: 100%;
  }
}

.search {
  display: flex;
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
