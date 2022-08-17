<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어별 상권분석 관리</h1>
    </div>
    <section class="store-manage" style="min-height: 80vh">
      <section class="store-list init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>스토어 리스트</h2>
            <div class="search d-flex">
              <span class="mr5 mt5">적용 시작 기준날짜</span>
              <date-picker :defaultValue="searchStartDate" :clear="clearDate" @updateDate="startDay" class="date"></date-picker>
              <span class="ml15 mr5 mt5">상태</span>
              <pull-down
                :data="companyStoreStatus"
                :code="storeStatusCode"
                @selected="companyStoreStatusProp"
                class="pull-down w150"
                :clear="clearField"
              ></pull-down>
              <input type="text" placeholder="스토어명을 입력하세요" v-model="searchText" class="search-input input-size ml20" />
              <v-btn small color="primary" dark class="btn-search" @click="reload(1)">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl column2 select-tbl">
            <caption>
              스토어 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="*" />
              <col width="70" />
              <col width="80" />
              <col width="65" />
              <col width="65" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">업체명</th>
                <th class="left">스토어명</th>
                <th>상태</th>
                <th>적용시작일</th>
                <th>상권등급</th>
                <th>입지등급</th>
                <th class="right">남성비율<span class="fon">(%)</span></th>
                <th class="right">여성비율<span class="fon">(%)</span></th>
                <th class="right">10대비율<span class="fon">(%)</span></th>
                <th class="right">20대비율<span class="fon">(%)</span></th>
                <th class="right">30대비율<span class="fon">(%)</span></th>
                <th class="right">40대비율<span class="fon">(%)</span></th>
                <th class="right">50대비율<span class="fon">(%)</span></th>
                <th class="right">60대비율<span class="fon">(%)</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="showModalPopup(item.companyStoreSid, item.companyStoreName)">
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreCompanyName }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td>{{ item.storeStatusName }}</td>
                <td>{{ item.storeZoneAnalysisStartDate }}</td>
                <td>{{ item.storeZoneAnalysisZoneGrade }}</td>
                <td>{{ item.storeZoneAnalysisLocationGrade }}</td>
                <td class="right">{{ item.storeZoneAnalysisMalePercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisFemalePercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisTeenagePercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisTwentiesPercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisThirtiesPercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisFortiesPercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisFiftiesPercent }}</td>
                <td class="right">{{ item.storeZoneAnalysisOverSixtiesPercent }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="15">스토어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>

      <!-- 알럿 -->
      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      <!-- 삭제 컨펌 -->
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import StoreZoneAnalysisModal from "@/components/modal/operation/StoreZoneAnalysisModal.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { getPopupOpt } from "@/utils/modal";
import alim from "@/components/dialog/Alim.vue";
import DatePicker from "@/components/form/DatePicker.vue";
export default {
  components: { alim, DatePicker, PullDown },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      page: 1,
      searchText: "",
      len: null,
      list: [],
      clearField: false,
      clearDate: false,
      readOnly: false,
      companyStoreSid: "",
      companyStoreName: "",
      storeZoneList: [],
      searchStartDate: "",
      // storeZoneAnalysisSid: '',
      // storeZoneAnalysisStartDate: '',
      // storeZoneAnalysisEndDate: '',
      // storeZoneAnalysisTeenagePercent: '',
      // storeZoneAnalysisTwentiesPercent: '',
      // storeZoneAnalysisThirtiesPercent: '',
      // storeZoneAnalysisFortiesPercent: '',
      // storeZoneAnalysisFiftiesPercent: '',
      // storeZoneAnalysisOverSixtiesPercent: '',
      // storeZoneAnalysisMalePercent: '',
      // storeZoneAnalysisFemalePercent: '',
      // storeZoneAnalysisLocationGrade: '',
      // storeZoneAnalysisZoneGrade: '',
      companyStoreStatus: "",
      companyStoreStatusName: "",
      storeStatusCode: "SYS21A15B014",
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getCompanyStoreList"]),
    ...mapGetters("storeZoneAnalysis", [
      "getStoreZoneAnalysisList",
      "getStoreZoneAnalysisStoreList",
      "getStoreZoneAnalysisDetail",
      "getStoreZoneAnalysisAdd",
      "getStoreZoneAnalysisUpdate",
      "getStoreZoneAnalysisDelete",
    ]),
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
    const date = new Date();
    this.searchStartDate = this.$date(date).format("YYYY-MM-DD");

    this.reload();
  },
  methods: {
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_STORE_LIST", {
          page: this.page,
          size: this.size,
          searchText: this.searchText,
          companyStoreStatus: this.companyStoreStatus,
          standardDate: this.searchStartDate,
        });
        const res = this.getStoreZoneAnalysisStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.storeZoneAnlaysis.data;
        this.len = res.storeZoneAnlaysis.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 스토어 항목 클릭
    async companyDetail({ companyStoreSid, companyStoreName }) {
      try {
        bus.$emit("start:spinner");
        this.companyStoreSid = companyStoreSid;
        this.companyStoreName = companyStoreName;
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_LIST", this.companyStoreSid);
        if (this.getStoreZoneAnalysisList.channeltuneApiResult.errorCode == 200) {
          const response = this.getStoreZoneAnalysisList.channeltuneApiResult.storeZoneAnlaysis;
          this.storeZoneList = response;
          this.clearStoreZone();
        } else {
          this.alim(this.getStoreZoneAnalysisList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 스토어존 항목 클릭
    async storeZoneDetail(id) {
      try {
        bus.$emit("start:spinner");
        this.readOnly = true;
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_DETAIL", id);
        if (this.getStoreZoneAnalysisDetail.channeltuneApiResult.errorCode == 200) {
          const response = this.getStoreZoneAnalysisDetail.channeltuneApiResult.storeZoneAnlaysis;
          this.storeZoneAnalysisSid = response.storeZoneAnalysisSid;
          this.storeZoneAnalysisStartDate = response.storeZoneAnalysisStartDate;
          this.storeZoneAnalysisEndDate = response.storeZoneAnalysisEndDate;
          this.storeZoneAnalysisTeenagePercent = response.storeZoneAnalysisTeenagePercent;
          this.storeZoneAnalysisTwentiesPercent = response.storeZoneAnalysisTwentiesPercent;
          this.storeZoneAnalysisThirtiesPercent = response.storeZoneAnalysisThirtiesPercent;
          this.storeZoneAnalysisFortiesPercent = response.storeZoneAnalysisFortiesPercent;
          this.storeZoneAnalysisFiftiesPercent = response.storeZoneAnalysisFiftiesPercent;
          this.storeZoneAnalysisOverSixtiesPercent = response.storeZoneAnalysisOverSixtiesPercent;
          this.storeZoneAnalysisMalePercent = response.storeZoneAnalysisMalePercent;
          this.storeZoneAnalysisFemalePercent = response.storeZoneAnalysisFemalePercent;
          this.storeZoneAnalysisLocationGrade = response.storeZoneAnalysisLocationGrade;
          this.storeZoneAnalysisZoneGrade = response.storeZoneAnalysisZoneGrade;
        } else {
          this.alim(this.getStoreZoneAnalysisDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    storeZoneValidate(type) {
      if (type === "add") {
        if (this.companyStoreSid == "" || this.companyStoreSid == null) {
          this.alim("스토어를 선택하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisStartDate === "" || this.storeZoneAnalysisStartDate == null) {
          this.alim("적용기준 시작일을 입력하세요.", this.errorColor);
        }
      }
      if (type === "add" || type === "update") {
        if (this.storeZoneAnalysisZoneGrade === "" || this.storeZoneAnalysisZoneGrade == null) {
          this.alim("상권등급을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisLocationGrade === "" || this.storeZoneAnalysisLocationGrade == null) {
          this.alim("입지등급을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisMalePercent === "" || this.storeZoneAnalysisMalePercent == null) {
          this.alim("남성비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFemalePercent === "" || this.storeZoneAnalysisFemalePercent == null) {
          this.alim("여성비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisTeenagePercent === "" || this.storeZoneAnalysisTeenagePercent == null) {
          this.alim("10대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisTwentiesPercent === "" || this.storeZoneAnalysisTwentiesPercent == null) {
          this.alim("20대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisThirtiesPercent === "" || this.storeZoneAnalysisThirtiesPercent == null) {
          this.alim("30대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFortiesPercent === "" || this.storeZoneAnalysisFortiesPercent == null) {
          this.alim("40대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFiftiesPercent === "" || this.storeZoneAnalysisFiftiesPercent == null) {
          this.alim("50대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisOverSixtiesPercent === "" || this.storeZoneAnalysisOverSixtiesPercent == null) {
          this.alim("60대비율을 입력하세요.", this.errorColor);
        }
      }
      if (type === "update" || type === "delete") {
        if (this.storeZoneAnalysisSid === "" || this.storeZoneAnalysisSid == null) {
          this.alim("상권분석을 선택하세요.", this.errorColor);
        }
      }
      switch (type) {
        case "add":
          this.storeZoneAdd();
          break;
        case "update":
          this.storeZoneUpdate();
          break;
        case "delete":
          this.confirm(this.storeZoneAnalysisSid);
          break;
      }
    },
    async storeZoneAdd() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_ADD", {
          companyStoreSid: this.companyStoreSid,
          storeZoneAnalysisStartDate: this.storeZoneAnalysisStartDate,
          storeZoneAnalysisZoneGrade: this.storeZoneAnalysisZoneGrade,
          storeZoneAnalysisLocationGrade: this.storeZoneAnalysisLocationGrade,
          storeZoneAnalysisMalePercent: this.storeZoneAnalysisMalePercent,
          storeZoneAnalysisFemalePercent: this.storeZoneAnalysisFemalePercent,
          storeZoneAnalysisTeenagePercent: this.storeZoneAnalysisTeenagePercent,
          storeZoneAnalysisTwentiesPercent: this.storeZoneAnalysisTwentiesPercent,
          storeZoneAnalysisThirtiesPercent: this.storeZoneAnalysisThirtiesPercent,
          storeZoneAnalysisFortiesPercent: this.storeZoneAnalysisFortiesPercent,
          storeZoneAnalysisFiftiesPercent: this.storeZoneAnalysisFiftiesPercent,
          storeZoneAnalysisOverSixtiesPercent: this.storeZoneAnalysisOverSixtiesPercent,
        });
        if (this.getStoreZoneAnalysisAdd.channeltuneApiResult.errorCode == 200) {
          this.alim("상권분석이 등록되었습니다.", this.successColor);
          this.clearStoreZone();
          this.companyDetail({ companyStoreSid: this.companyStoreSid, companyStoreName: this.companyStoreName });
        } else {
          this.alim(this.getStoreZoneAnalysisAdd.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async storeZoneUpdate() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_UPDATE", {
          storeZoneAnalysisSid: this.storeZoneAnalysisSid,
          storeZoneAnalysisZoneGrade: this.storeZoneAnalysisZoneGrade,
          storeZoneAnalysisLocationGrade: this.storeZoneAnalysisLocationGrade,
          storeZoneAnalysisMalePercent: this.storeZoneAnalysisMalePercent,
          storeZoneAnalysisFemalePercent: this.storeZoneAnalysisFemalePercent,
          storeZoneAnalysisTeenagePercent: this.storeZoneAnalysisTeenagePercent,
          storeZoneAnalysisTwentiesPercent: this.storeZoneAnalysisTwentiesPercent,
          storeZoneAnalysisThirtiesPercent: this.storeZoneAnalysisThirtiesPercent,
          storeZoneAnalysisFortiesPercent: this.storeZoneAnalysisFortiesPercent,
          storeZoneAnalysisFiftiesPercent: this.storeZoneAnalysisFiftiesPercent,
          storeZoneAnalysisOverSixtiesPercent: this.storeZoneAnalysisOverSixtiesPercent,
        });
        if (this.getStoreZoneAnalysisUpdate.channeltuneApiResult.errorCode == 200) {
          this.alim("상권분석이 수정되었습니다.", this.successColor);
        } else {
          this.alim(this.getStoreZoneAnalysisUpdate.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async confirmDelete(data) {
      if (data.del === "Y" && data.type === "list") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_DELETE", this.storeZoneAnalysisSid);
          if (this.setManagerResult.channeltuneApiResult.errorCode == 200) {
            this.alim("상권분석이 삭제되었습니다.", this.successColor);
            this.clearStoreZone();
            await this.companyDetail({ companyStoreSid: this.companyStoreSid, companyStoreName: this.companyStoreName });
          } else {
            this.alim(this.setManagerResult.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
      this.resetDeleteData();
    },
    newDate(data) {
      this.storeZoneAnalysisStartDate = data;
    },
    clear() {},
    clearStoreZone() {
      this.readOnly = false;
      this.storeZoneAnalysisSid = "";
      this.storeZoneAnalysisStartDate = "";
      this.storeZoneAnalysisEndDate = "";
      this.storeZoneAnalysisTeenagePercent = "";
      this.storeZoneAnalysisTwentiesPercent = "";
      this.storeZoneAnalysisThirtiesPercent = "";
      this.storeZoneAnalysisFortiesPercent = "";
      this.storeZoneAnalysisFiftiesPercent = "";
      this.storeZoneAnalysisOverSixtiesPercent = "";
      this.storeZoneAnalysisMalePercent = "";
      this.storeZoneAnalysisFemalePercent = "";
      this.storeZoneAnalysisLocationGrade = "";
      this.storeZoneAnalysisZoneGrade = "";
    },
    companyStoreStatusProp(data) {
      //업체 종류 가져오기
      this.companyStoreStatus = data.sysCodeSid;
      this.companyStoreStatusName = data.sysCodeName;
    },
    startDay(date) {
      this.searchStartDate = date;
    },
    endDay(date) {
      this.searchEndDate = date;
    },
    showModalPopup(sid, storeName) {
      this.$modal.show(
        StoreZoneAnalysisModal,
        { companyStoreSid: sid, companyStoreName: storeName },
        getPopupOpt("StoreZoneAnalysisModal", "1000px", "auto", false),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.fon {
  font-size: 0.8rem;
}
.container {
  width: 100% !important;
}
.store-manage {
  display: flex;
  justify-content: space-between;
  & .bottom-sec {
    margin-top: 20px;
  }

  & .td-btn-group {
    float: right;
    & button {
      margin-left: 5px;
    }
  }
  & .store-list {
    width: 100% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }

  & .input-full {
    width: calc(100% - 135px) !important;
    margin: 0 5px;
  }

  & .section-box {
    width: calc(100% - 510px);
    & .title-wrap {
      display: flex;
      justify-content: space-between;
    }

    & .border {
      & .header {
        & .search {
          & input[type="text"] {
            border: 1px solid #ccc;
            height: 30px;
            padding: 0 10px;
            width: 200px;
          }
          & button {
            margin-left: 5px;
          }
        }
      }
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
