<template>
  <section class="container">
    <h1>스토어 현황</h1>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="topbar">
            <div class="company_input">
              <input class="readonly" type="text" name="readonly" :value="sid" readonly placeholder="업체" />
              <input class="readonly w200" type="text" name="company" :value="companyName" readonly />
              <v-btn small class="ml10 mr30" color="success" @click="showModalPopup">검색</v-btn>
            </div>
            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="스토어명을 입력해주세요."
              :value="storeName"
              @input="storeName = $event.target.value"
              @keyup.enter="inquireStoreStatus(1)"
            />
            <div class="status">
              <span class="ml15 mr5">상태</span>
              <pull-down
                :data="companyStoreStatus"
                :code="storeStatusCode"
                @selected="companyStoreStatusProp"
                class="pull-down w150"
                :clear="clearField"
              ></pull-down>
              <v-btn small color="primary" dark class="ml10 mr10" @click="inquireStoreStatus(1)">조회</v-btn>
              <v-btn small @click="clear">검색 초기화</v-btn>
              <v-btn class="ml5" color="success" small @click="noExposure">노출 불가 일괄처리</v-btn>
              <v-btn class="ml5" color="success" small @click="onexport">XLSX</v-btn>
            </div>
          </div>
          <table class="tbl mt20">
            <caption>
              스토어 현황 테이블
            </caption>
            <colgroup>
              <col width="90" />
              <col width="*" />
              <col width="110" />
              <col width="100" />
              <col width="*" />
              <col width="50" />
              <col width="70" />
              <col width="100" />
              <col width="60" />
              <col width="80" />
              <col width="105" />
              <col width="80" />
              <col width="90" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">스토어명</th>
                <th class="left">상권명</th>
                <th>업체 코드</th>
                <th class="left">업체명</th>
                <th>행정구역</th>
                <th class="left">행정구</th>
                <th>업종</th>
                <th>광고사이즈</th>
                <th>최대광고슬롯수</th>
                <th>담당에이전트코드</th>
                <th>담당자이름</th>
                <th>전화번호</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td class="left">{{ item.companyStoreZone }}</td>
                <td>{{ item.companyStoreCompanySid }}</td>
                <td class="left">{{ item.companyStoreCompanyName }}</td>
                <td>{{ item.companyStoreAdministrativeZoneName1 }}</td>
                <td class="left">{{ item.companyStoreAdministrativeZoneName2 }}</td>
                <td>{{ item.companyStoreBusinessTypeName }}</td>
                <td>{{ item.companyStoreBillboardSize }}</td>
                <td>{{ item.companyStoreWorkSlot }}</td>
                <td>{{ item.companyStoreAgentSid }}</td>
                <td>{{ item.companyStoreAgentUserName }}</td>
                <td>{{ item.companyStoreAgentUserHp }}</td>
                <td>{{ item.companyStoreStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="14">스토어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>

          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <alim :open="snackbar" :txt="text" :color="color"></alim>
    </section>
  </section>
</template>

<script>
import PullDown from "@/components/form/PullDown.vue";
import XLSX from "xlsx";
import CompanyListModal from "@/components/modal/common/CompanyList.vue";
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import alimMixin from "@/mixins/alim.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
export default {
  components: {
    PullDown,
    alim,
  },
  mixins: [alimMixin],
  props: ["size"],
  data() {
    return {
      sid: null,
      companyName: "",
      clearField: false,
      page: 1,
      len: null,
      storeName: null,
      list: [],
      storeStatusCode: "SYS21A15B014",
      companyStoreStatus: null,
      companyStoreStatusName: "",
      isNullList: true,
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getCompanyStoreList", "unexposedBatchProcessing"]),
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
  methods: {
    reload(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      this.inquireStoreStatus();
    },
    showModalPopup() {
      //검색버튼 함수
      this.$modal.show(CompanyListModal, { update: this.getCompanyName }, getPopupOpt("AdminPersonListModal", "700px", "auto", false));
    },
    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.sid = data.companySid;
      this.companyName = data.companyName;
    },
    companyStoreStatusProp(data) {
      //업체 종류 가져오기
      this.companyStoreStatus = data.sysCodeSid;
      this.companyStoreStatusName = data.sysCodeName;
    },
    // 스토어 현황 데이터 가져오는 function
    async inquireStoreStatus(num) {
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: this.size,
          page: this.page,
          companySid: this.sid,
          searchText: this.storeName,
          companyStoreStatusList: this.companyStoreStatus === "" || this.companyStoreStatus === null ? null : [this.companyStoreStatus],
        });
        if (this.getCompanyStoreList.channeltuneApiResult.errorCode == 200) {
          const returnData = this.getCompanyStoreList.channeltuneApiResult.companyStore;
          this.list = returnData.data;
          this.len = returnData.last_page;
        } else {
          this.alim(this.getCompanyStoreList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async noExposure() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/UNEXPOSED_BATCH_PROCESSING");
        const res = this.unexposedBatchProcessing.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage + "<br/><br/>" + "체크카운트 : " + res.companyStoreCheckCount, this.successColor);
        this.reload();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async onexport() {
      try {
        bus.$emit("start:spinner");
        // On Click Excel download button
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: "",
          page: "",
          companySid: this.sid,
          searchText: this.storeName,
          companyStoreStatusList: this.companyStoreStatus === null ? null : [this.companyStoreStatus],
        });
        if (this.getCompanyStoreList.channeltuneApiResult.errorCode === 200) {
          const returnData = this.getCompanyStoreList.channeltuneApiResult.companyStore;
          this.excelDatas = returnData;
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
        XLSX.writeFile(wb, "스토어 리스트.xlsx"); // name of the file is 'book.xlsx'
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.sid = null;
      this.storeName = "";
      this.companyName = "";
      this.companyStoreStatus = "";
      this.companyStoreStatusName = "";

      this.reload(1);
    },
  },
};
</script>

<style lang="scss" scoped>
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

.container {
  padding: 40px 20px;
  h1 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 18px;
    font-family: "Roboto";
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }

  & .topbar {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ccc;

    padding-bottom: 5px;
    input {
      width: 200px;
      height: 32px;
      padding: 0 10px;
      border: 1px solid #e5e5e5;
    }

    & .company_input {
      span {
        margin-right: 5px;
      }

      .readonly {
        width: 110px;
        background-color: #f4f4f4;
        margin-right: 5px;
      }
    }
    .status {
      display: flex;
      white-space: nowrap;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }
  .user-list-tbl {
    & td {
      cursor: pointer;
    }
    & .align {
      text-align: left;
    }
  }
  .null_data {
    border-bottom: none;
    font-weight: 700;
    font-size: 15px;
  }
}
</style>
