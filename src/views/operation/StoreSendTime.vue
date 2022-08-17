<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어별 송출시간 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <div class="search-group">
              <span class="mr5">시작날짜</span>
              <date-picker :current="searchStartDate" :clear="clearDate" @updateDate="startDay" class="date"></date-picker>
              <span class="ml10 mr5">~ 종료날짜</span>
              <date-picker :current="searchEndDate" :clear="clearDate" @updateDate="endDay" class="date"></date-picker>
              <div class="search ml30">
                <span class="mr5">스토어</span>
                <input type="text" v-model="searchCompanyStoreSid" class="search-code mr5" readonly />
                <input type="text" v-model="searchText" class="search-input" readonly @keyup.enter="search" />
                <v-btn small color="primary" dark class="btn-search" @click="storeSearchModal">스토어 조회</v-btn>
                <v-btn small color="primary" dark class="btn-search" @click="search">검색</v-btn>
              </div>
            </div>
            <div class="search">
              <v-btn small color="primary" dark class="btn-search" @click="StoreSendTimeModal">등록</v-btn>
              <v-btn small color="success" dark @click="onexport">XLSX 출력</v-btn>
              <v-btn small @click="clear">검색 초기화</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              리스트 테이블
            </caption>
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="200" />
              <col width="100" />
              <col width="*" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
              <col width="25" />
            </colgroup>
            <thead>
              <tr>
                <th>날짜</th>
                <th>업체코드</th>
                <th class="left">업체명</th>
                <th>스토어 코드</th>
                <th class="left">스토어명</th>
                <th>00</th>
                <th>01</th>
                <th>02</th>
                <th>03</th>
                <th>04</th>
                <th>05</th>
                <th>06</th>
                <th>07</th>
                <th>08</th>
                <th>09</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>19</th>
                <th>20</th>
                <th>21</th>
                <th>22</th>
                <th>23</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="StoreSendTimeModal(item.storeTimeScheduleSid)">
                <td>{{ item.storeTimeScheduleDate }}</td>
                <td>{{ item.companySid }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td v-if="item.storeTimeSchedule00 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule01 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule02 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule03 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule04 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule05 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule06 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule07 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule08 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule09 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule10 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule11 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule12 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule13 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule14 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule15 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule16 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule17 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule18 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule19 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule20 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule21 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule22 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
                <td v-if="item.storeTimeSchedule23 === 'Y'"><span class="dot"></span></td>
                <td v-else></td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="29">스토어 리스트가 없습니다.</td>
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
import DatePicker from "@/components/form/DatePicker.vue";
import alim from "@/components/dialog/Alim.vue";
import StoreSendTimeRegModal from "@/components/modal/operation/StoreSendTimeReg.vue";
import StoreListModal from "@/components/modal/common/StoreList.vue";
import { getPopupOpt } from "@/utils/modal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim, DatePicker },
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
      clearDate: false,
      searchStartDate: "",
      searchEndDate: "",
      searchCompanyStoreSid: "",
      len: null,
      list: [],
      //셀렉트 설정
      statusCode: "SYS21804B001",
      //알림 데이터
      snackbar: false,
      text: "",
      color: "",
      errorColor: "orange darken-3",
      successColor: "light-blue darken-4",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getStoreTimeSchedule"]),
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
  //데이터 불러오기
  methods: {
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TIME_SCHEDULE", {
          size: this.size,
          page: this.page,
          searchCompanyStoreSid: this.searchCompanyStoreSid,
          searchStartDate: this.searchStartDate,
          searchEndDate: this.searchEndDate,
        });
        if (this.getStoreTimeSchedule.channeltuneApiResult.errorCode == 200) {
          const storeList = this.getStoreTimeSchedule.channeltuneApiResult.storeTimeSchedule;
          this.list = storeList.data;
          this.len = storeList.last_page;
        } else {
          this.alim(this.getStoreTimeSchedule.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    startDay(date) {
      this.searchStartDate = date;
    },
    endDay(date) {
      this.searchEndDate = date;
    },
    status(data) {
      this.searchActualSurveyStatus = data.sysCodeSid;
    },
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach((ele) => ele.classList.remove("active"));
      this.searchCompanyStoreSid = "";
      this.searchText = "";
      this.searchStartDate = "";
      this.searchEndDate = "";
      this.clearDate = !this.clearDate;
      this.reload(1);
    },
    StoreSendTimeModal(id) {
      this.$modal.show(
        StoreSendTimeRegModal,
        { update: this.update, storeTimeScheduleSid: id },
        getPopupOpt("StoreSendTimeRegModal", "800px", "auto", false)
      );
    },
    storeSearchModal() {
      this.$modal.show(StoreListModal, { update: this.updateStore }, getPopupOpt("StoreListModal", "900px", "auto", false));
    },
    search() {
      if (this.searchStartDate > this.searchEndDate) {
        this.alim("종료날짜가 시작날짜보다 빠릅니다.", this.errorColor);
        return false;
      }
      this.reload(1);
    },
    updateStore(data) {
      this.searchCompanyStoreSid = data.id;
      this.searchText = data.name;
    },
    update() {
      this.reload(0);
    },
    //엑셀 다운로드
    async onexport() {
      // On Click Excel download button
      try {
        bus.$emit("start:spinner");
        //엑셀용 전체 데이터 불러오기
        await this.$store.dispatch("companyStore/STORE_TIME_SCHEDULE", {
          size: "",
          page: "",
          searchCompanyStoreSid: this.searchCompanyStoreSid,
          searchStartDate: this.searchStartDate,
          searchEndDate: this.searchEndDate,
        });
        if (this.getStoreTimeSchedule.channeltuneApiResult.errorCode == 200) {
          this.excelDatas = this.getStoreTimeSchedule.channeltuneApiResult.StoreTimeSchedule;
          await this.reload(0);
        } else {
          this.alim(this.getStoreTimeSchedule.channeltuneApiResult.errorMessage, this.errorColor);
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
        XLSX.writeFile(wb, "스토어별 송출시간.xlsx"); // name of the file is 'book.xlsx'
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
.dot {
  background: crimson;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
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
.search {
  & .search-code {
    width: 120px !important;
  }
}
</style>
