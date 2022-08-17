<template>
  <section class="container">
    <div class="title-wrap">
      <h1>TUNE 설치 현황</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <div class="wrap">
              <div class="search-group">
                <span class="mr5">설치시공일</span>
                <date-picker :defaultValue="searchDate_start" @updateDate="startDay" class="date"></date-picker>
                <span class="ml10 mr5">~&nbsp;&nbsp;</span>
                <date-picker :defaultValue="searchDate_end" @updateDate="endDay" class="date"></date-picker>
                <v-btn small class="ml5" @click="searchDate('1year')">1년</v-btn>
                <v-btn small class="ml5" @click="searchDate('6month')">6개월</v-btn>
                <v-btn small class="ml5" @click="searchDate('1month')">1달</v-btn>
                <v-btn small class="ml5" @click="dateResetToday">오늘</v-btn>
              </div>
              <div class="group">
                <span class="mr5">업체</span>
                <input type="text" name="" id="" class="short" readonly :value="companySid" />
                <input type="text" name="" id="" class="long" :value="companyName" @input="companyName = $event.target.value" readonly />
                <v-btn
                  small
                  class="ml5 mr20"
                  @click="__showModalTemplate(require('@/components/modal/common/CompanyList.vue'), { update: getCompanyName }, 700)"
                  >검색</v-btn
                >
              </div>
              <div class="group">
                <span class="mr5">스토어</span>
                <input type="text" name="" id="" class="short" readonly v-model="companyStoreSid" />
                <input type="text" name="" id="" class="long" v-model="companyStoreName" readonly />
                <v-btn
                  small
                  class="ml5 mr20"
                  @click="__showModalTemplate(require('@/components/modal/common/StoreList.vue'), { update: updateStore }, 800)"
                  >검색</v-btn
                >
              </div>
              <div class="search" style="display: flex">
                <pull-down
                  :clear="clearField"
                  @selected="StatusProp"
                  :data="productInstallionStoreStatus"
                  :code="statusCode"
                  class="pull-down w150"
                ></pull-down>
                <v-btn small color="primary" dark class="ml5" @click="reload(1)">조회</v-btn>
                <v-btn small color="success" dark class="ml5" @click="onexport">xlsx</v-btn>
                <v-btn small class="ml5" @click="reload(0)">CLEAR</v-btn>
              </div>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl" id="installationStatusData">
            <caption>
              TUNE 설치 현황 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
              <col width="120" />
              <col width="*" />
              <col width="80" />
              <col width="120" />
              <col width="120" />
              <col width="130" />
              <col width="100" />
              <col width="100" />
              <col width="100" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>업체코드</th>
                <th class="left">업체명</th>
                <th>스토어코드</th>
                <th class="left">스토어명</th>
                <th>스토어 상태</th>
                <th>영업담당자</th>
                <th>설치시공일</th>
                <th>에이전트고객실측</th>
                <th>잠재고객</th>
                <th>실측</th>
                <th>설치제품</th>
                <th>설치상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in list" :key="idx">
                <td>{{ item.productInstallionStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td>{{ item.companyStoreStatusName }}</td>
                <td>{{ item.companyStoreAgentUserName }}</td>
                <td>{{ item.productInstallionStoreDate }}</td>
                <td>
                  <v-btn
                    v-if="item.actualSurveyPartnerSid !== null"
                    small
                    class="ml5"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/assets/ActualSurveyPartner.vue'),
                        { update: updateStore, id: item.actualSurveyPartnerSid, Allreadonly: true },
                        1500,
                      )
                    "
                    >고객실측정보</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    v-if="item.prospectiveCustomerSid !== null"
                    small
                    class="ml5"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/assets/StoreAudienceManagement.vue'),
                        { update: updateStore, id: item.prospectiveCustomerSid },
                        750,
                      )
                    "
                    >잠재고객</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    v-if="item.actualSurveySid !== null"
                    small
                    class="ml5"
                    @click="
                      __showModalTemplate(require('@/components/modal/common/ActualSurvey.vue'), { update: update, id: item.actualSurveySid }, 1100)
                    "
                    >실측현황</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    v-if="item.actualSurveySid !== null && item.actualSurveySid !== null"
                    small
                    class="ml5"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/assets/InstallationProductDetail.vue'),
                        { update: update, productInstallionStoreid: item.productInstallionStoreSid, companyStoreid: item.companyStoreSid },
                        800,
                      )
                    "
                    >설치제품</v-btn
                  >
                </td>
                <td>{{ item.productInstallionStoreStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="12">리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import DatePicker from "@/components/form/DatePicker.vue";
import XLSX from "xlsx";
import PullDown from "@/components/form/PullDown.vue";
import modalMixin from "@/mixins/showModal.js";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  components: {
    DatePicker,
    PullDown,
  },
  mixins: [modalMixin],
  props: ["size"],
  //자식컴포넌트에 값을 안정적으로 넘기기 위해
  // created() {
  // 	this.dateResetToday();
  // },
  data() {
    return {
      today: "",
      searchDate_start: "",
      searchDate_end: "",
      clearField: false,
      statusCode: "SYS21C03B002",
      list: [],
      len: null,

      page: 1,

      companySid: "",
      companyName: "",
      companyStoreSid: "",
      companyStoreName: "",
      productInstallionStoreStatus: "",
      productInstallionStoreStatusCode: "",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("assetStoreList", ["getStoreList"]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload();
    },
  },
  async mounted() {
    // 처음에 당일로 조건거는게 맞음
    await this.searchDate("1year");
    this.reload(1);
  },
  methods: {
    //데이터 받아오는 함수
    async reload(num, first) {
      if (num === 0) {
        this.clear();
        this.dateResetToday();
      }

      if (num === 1) {
        this.page = 1;
      }
      // 처음 렌더링시 모든 데이터를 보여주기 위해 날짜 값 빈 데이터로 초기화
      if (first == "Y") {
        this.searchDate_start = "";
        this.searchDate_end = "";
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetStoreList/STORE_LIST", {
          size: this.size,
          page: this.page,
          productInstallionStoreStartDate: this.searchDate_start,
          productInstallionStoreEndDate: this.searchDate_end,
          companySid: this.companySid,
          companyStoreSid: this.companyStoreSid,
          productInstallionStoreStatus: this.productInstallionStoreStatusCode,
        });

        if (this.getStoreList.channeltuneApiResult.errorCode == 200) {
          const storeList = this.getStoreList.channeltuneApiResult.storeTuneList;
          this.list = storeList.data;
          this.len = storeList.last_page;
          // this.dateResetToday();
        } else {
          this.alim(this.getStoreList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    startDay(date) {
      this.searchDate_start = date;
    },
    endDay(date) {
      this.searchDate_end = date;
    },
    clear() {
      this.clearField = !this.clearField;
      this.companySid = "";
      this.searchDate_start = "";
      this.searchDate_end = "";
      this.companyName = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.productInstallionStoreStatusCode = "";
      this.productInstallionStoreStatus = "";
    },
    //오늘 날짜 리턴
    getDate() {
      let result = new Date();
      return result.toISOString().substr(0, 10);
    },
    dateResetToday() {
      this.searchDate_start = this.getDate();
      this.searchDate_end = this.getDate();
    },
    searchDate(ago) {
      let date = new Date();
      let result = "";
      switch (ago) {
        case "1month":
          result = new Date(date.setMonth(date.getMonth() - 1)).toISOString().substr(0, 10);
          break;
        case "6month":
          result = new Date(date.setMonth(date.getMonth() - 6)).toISOString().substr(0, 10);
          break;
        case "1year":
          result = new Date(date.setFullYear(date.getFullYear() - 1)).toISOString().substr(0, 10);
          break;
        default:
          result = this.getDate;
      }
      this.searchDate_start = result;
      this.searchDate_end = new Date().toISOString().substr(0, 10);
    },
    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    StatusProp(data) {
      //업체 종류 가져오기
      this.productInstallionStoreStatusCode = data.sysCodeSid;
      this.productInstallionStoreStatus = data.sysCodeName;
    },
    updateStore(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
    },
    update() {
      this.reload(0);
    },

    //엑셀 뽑기

    async onexport() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetStoreList/STORE_LIST", {
          size: "",
          page: "",
          productInstallionStoreStartDate: this.searchDate_start,
          productInstallionStoreEndDate: this.searchDate_end,
          companySid: this.companySid,
          companyStoreSid: this.companyStoreSid,
          productInstallionStoreStatus: this.productInstallionStoreStatusCode,
        });
        if (this.getStoreList.channeltuneApiResult.errorCode === 200) {
          const storeList = this.getStoreList.channeltuneApiResult.storeTuneList;
          this.excelDatas = storeList;
        }

        const animalWS = XLSX.utils.json_to_sheet(this.excelDatas); //테이블 담기

        // A workbook is the name given to an Excel file
        const wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, "TUNE 설치현황 리스트.xlsx"); // name of the file is 'book.xlsx'
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

  & .align {
    text-align: left;
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
      & .header {
        display: block;
        width: 100%;
        & .wrap {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1em;
        }
      }
    }
  }
}

.group {
  display: flex;
  & span {
    display: flex;
    align-items: center;
  }
  & .short {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: 90px;
    margin-right: 10px;
    &:read-only {
      background: #f4f4f4;
    }
  }
  & .long {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: 160px;
    &:read-only {
      background: #f4f4f4;
    }
  }

  & button {
    margin-left: 5px;
  }
  & .v-text-field__slot {
    & input[type="text"] {
      width: 100%;
    }
  }
}
</style>
