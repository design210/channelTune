<template>
  <section class="container">
    <div class="title-wrap">
      <h1>정산 처리</h1>
    </div>
    <div class="mb10"></div>
    <section class="ad-manage">
      <section class="ad-list section-box">
        <div style="height: 100%">
          <div class="border line">
            <div class="header">
              <h2>항목</h2>
              <div class="btn-group d-flex">
                <div class="year mr10"><v-select :items="year" v-model="searchYear" outlined class="select-basic w100"></v-select></div>
                <v-btn small color="success" @click="getList">조회</v-btn>
                <v-btn small color="primary" @click="addList">등록</v-btn>
                <v-btn small color="warning" @click="updateList">수정</v-btn>
                <v-btn small color="error" @click="confirm(settlementSid)">삭제</v-btn>
                <v-btn small @click="clear">CLEAR</v-btn>
              </div>
            </div>
            <div class="field">
              <table width="100%" class="tbl-reg column2 mt0">
                <colgroup>
                  <col width="80" />
                  <col width="*" />
                  <col width="80" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>정산 코드</td>
                  <td colspan="3" class="field-div">
                    <input type="text" class="input-first" v-model="settlementSid" readonly />
                  </td>
                </tr>
                <tr>
                  <td class="required">정산 제목</td>
                  <td colspan="3"><input type="text" v-model="settlementTitle" /></td>
                </tr>
                <tr>
                  <td class="required">정산 년도</td>
                  <td>
                    <v-select :items="year" v-model="settlementYear" outlined class="select-basic" :readonly="toggle"></v-select>
                  </td>
                  <td class="required">정산 월</td>
                  <td><v-select :items="month" v-model="searchMonth" outlined class="select-basic" :readonly="toggle"></v-select></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="line mt10 line3">
            <div class="border">
              <table width="100%" class="tbl mt20 user-list-tbl select-tbl">
                <colgroup>
                  <col width="95" />
                  <col width="*" />
                  <col width="60" />
                  <col width="80" />
                  <col width="80" />
                </colgroup>
                <thead>
                  <th>정산코드</th>
                  <th class="left pl5">정산 제목</th>
                  <th>정산 월</th>
                  <th>정산 반영</th>
                  <th>정산 누적</th>
                </thead>
              </table>
              <table width="100%" class="tbl user-list-tbl select-tbl">
                <colgroup>
                  <col width="95" />
                  <col width="*" />
                  <col width="60" />
                  <col width="80" />
                  <col width="80" />
                </colgroup>
                <tbody>
                  <tr
                    :class="item.settlementSid === settlementSid ? 'active' : ''"
                    v-for="(item, idx) in list"
                    :key="idx"
                    @click="getDetail(item.settlementSid)"
                  >
                    <td>{{ item.settlementSid }}</td>
                    <td class="left">{{ item.settlementTitle }}</td>
                    <td>{{ item.settlementMonth }}</td>
                    <td>{{ item.settlementFlag }}</td>
                    <td>{{ item.settlementFinalFlag }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="list.length < 1">
                    <td colspan="5">리스트가 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="ad-list-right init-wrap section-box border-outside">
        <div class="border">
          <h2>{{ title }}</h2>
          <div class="titled">
            <div class="company_input mt5">
              <div>
                <v-btn class="mr5" small color="success" @click="onexport">XLSX</v-btn>
                <v-btn small color="red lighten-1" class="white--text" @click="postSettleData">정산 {{ btnRename.text }}</v-btn>
              </div>
              <div>
                <input class="readonly" type="text" name="readonly" id="readonly" :value="companySid" readonly placeholder="업체" />
                <input class="readonly" type="text" name="company" id="company" :value="companyName" readonly />
                <v-btn small class="ml5 mr5" color="success" @click="showModalPopup">검색</v-btn>
                <v-btn small color="primary" @click="getSettleData(1)">조회</v-btn>
                <v-btn class="ml5" small @click="clear2">CLEAR</v-btn>
              </div>
            </div>
          </div>
          <div>
            <section class="group-total mt10" v-if="settlementList.length > 0">
              <div class="total-header">
                <span>정산 유형</span>
                <span>정산 금액</span>
                <span>정산 총액</span>
              </div>
              <div class="total-body d-flex align-center mt5 pb5">
                <div class="list-wrap">
                  <div class="list" v-for="item in totalGroup.kind" :key="item.contractKind">
                    <div class="mt5 mb5">
                      <span class="subject">{{ item.contractKindName }}</span>
                      <span class="num">{{ __localeString(item.settlementDataPrice) }}</span>
                    </div>
                  </div>
                </div>
                <div class="total-price">{{ __localeString(totalGroup.total) }}</div>
              </div>
            </section>
            <table width="100%" class="tbl mt5">
              <colgroup>
                <col width="95" />
                <col width="*" />
                <col width="200" />
                <col width="100" />
                <col width="100" />
                <col width="100" />
              </colgroup>
              <thead>
                <th>업체코드</th>
                <th class="left pl5">업체명</th>
                <th>업체 계약 종류</th>
                <th>업체 계약 유형</th>
                <th class="right">스토어 갯수</th>
                <th class="right">정산 금액</th>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in settlementList" :key="idx">
                  <td>{{ item.companySid }}</td>
                  <td class="left">{{ item.companyName }}</td>
                  <td>{{ item.contractKindName }}</td>
                  <td>{{ item.contractStoreLinkTypeName }}</td>
                  <td class="right">{{ item.storeCount }}</td>
                  <td class="right">{{ Math.floor(item.settlementPrice) | comma }}</td>
                </tr>
              </tbody>
              <tfoot v-if="settlementList.length < 1">
                <tr>
                  <td colspan="6">리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt20" v-if="settlementList.length > 0">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
          </div>
        </div>

        <!-- 알럿 -->

        <!-- 삭제 컨펌 -->
      </section>
      <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import XLSX from "xlsx";
import CompanyListModal from "@/components/modal/common/CompanyList.vue";
import confirm from "@/components/dialog/Confirm.vue";
import deleteMixin from "@/mixins/delete.js";
import resMixin from "@//mixins/response.js";
import { getPopupOpt } from "@/utils/modal";
import { year } from "@/utils/yearSet";
import localeStringMixin from "@/mixins/localString";
export default {
  components: { alim, confirm },
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  mixins: [loading, alimMixin, deleteMixin, resMixin, fileUploadMixin, localeStringMixin],
  props: ["size"],
  data() {
    return {
      year: [],
      month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      searchYear: "",
      searchMonth: "",
      searchText: "",
      settlementYear: "",
      settlementTitle: "",
      settlementSid: "",
      page: 1,
      toggle: false,
      titling: "2022년 2월 정기 정산",
      list: [],
      len: null,
      btnName: "",
      companySid: "",
      companyName: "",
      settlementList: [],
      totalGroup: {},
    };
  },
  computed: {
    ...mapGetters("settlementProcessing", [
      "getSettlementList",
      "getSettlementDetail",
      "addSettlement",
      "updateSettlement",
      "deleteSettlement",
      "getExcelData",
      "postSettlementStore",
      "getSettlementData",
    ]),
    btnRename() {
      return this.btnName === "Y" ? { text: "취소", code: "destory" } : { text: "처리", code: "store" };
    },
    title() {
      return this.searchYear + " " + this.searchMonth + "월 " + "정기 정산";
    },
  },
  watch: {
    page() {
      this.getSettleData();
    },
    size() {
      this.getSettleData();
    },
  },
  mounted() {
    // this.reload(1);
    const yearset = year("onlyYear");
    const result = yearset.map((item) => {
      return `${item}년`;
    });

    this.year = result;
    this.setMonth();

    this.getList();
  },
  methods: {
    // 광고 캠페인 리스트가져오기
    setMonth() {
      let today = new Date();
      let year = new Date().getFullYear();
      let month = today.getMonth() + 1;
      let monthString = month.toString();
      if (monthString < 10) {
        monthString = "0" + monthString;
      }
      this.searchYear = year + "년";
      this.settlementYear = year + "년";
      this.searchMonth = monthString;
    },
    //리스트 검색
    async getList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_PROCESSING", {
          size: "",
          page: "",
          searchText: this.searchText,
          searchYear: Number(this.searchYear.slice(0, 4)),
        });
        const res = this.getSettlementList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.SettlementMaster;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 조회
    async getDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_PROCESSING_DETAIL", id);
        const res = this.getSettlementDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.searchMonth = res.SettlementMaster.settlementMonth;
        this.settlementYear = res.SettlementMaster.settlementYear + "년";
        this.settlementTitle = res.SettlementMaster.settlementTitle;
        this.settlementSid = res.SettlementMaster.settlementSid;
        this.btnName = res.SettlementMaster.settlementFlag;
        this.settlementList = [];
        this.getSettleData(1);
        this.toggle = true;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록
    async addList() {
      if (this.settlementSid !== "") {
        return this.alim("정산 코드가 있으면 등록할 수 없습니다.", this.errorColor);
      }
      if (this.settlementTitle === "") {
        return this.alim("정산 제목을 입력해주세요!", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/ADD_SETTLEMENT_PROCESSING", {
          settlementTitle: this.settlementTitle,
          settlementYear: this.settlementYear.slice(0, 4),
          settlementMonth: this.searchMonth,
        });
        const res = this.addSettlement.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        await this.getList();
        this.alim(res.errorMessage, this.successColor);
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async updateList() {
      if (this.settlementSid === "") {
        return this.alim("정산 리스트를 선택해주세요.", this.errorColor);
      }
      if (this.settlementTitle === "") {
        return this.alim("정산 제목을 입력해주세요!", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/UPDATE_SETTLEMENT_PROCESSING", {
          settlementTitle: this.settlementTitle,
          id: this.settlementSid,
        });
        const res = this.updateSettlement.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.getList();
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //삭제
    async emitResetConfirm(data) {
      if (this.settlementSid === "") {
        return this.alim("정산 리스트를 선택해주세요!", this.errorColor);
      }
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("settlementProcessing/DELETE_SETTLEMENT_PROCESSING", this.settlementSid);
            if (this.deleteSettlement.channeltuneApiResult.errorCode === 200) {
              this.getList();
              this.clear();
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.deleteSettlement.channeltuneApiResult.errorMessage, this.errorColor);
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

    //정산 조회
    async getSettleData(num) {
      if (this.settlementSid === "") {
        return this.alim("정산 리스트를 선택해주세요!", this.errorColor);
      }

      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        const sizeSet = this.size - 5;
        await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_DATA", {
          settlementSid: this.settlementSid,
          companySid: this.companySid,
          size: sizeSet,
          page: this.page,
        });
        const res = this.getSettlementData.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.settlementList = res.settlement.list.data;
        this.len = res.settlement.list.last_page;
        this.totalGroup = res.settlement.totalGroup;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    //정산 취소 or 처리
    async postSettleData() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/POST_SETTLEMENT_STORE", {
          settlementYear: this.settlementYear,
          settlementMonth: this.searchMonth,
          settlementKind: this.btnRename.code,
        });
        const res = this.postSettlementStore.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.getList();
        this.getDetail(this.settlementSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showModalPopup() {
      //검색버튼 함수
      this.$modal.show(CompanyListModal, { update: this.getCompanyName }, getPopupOpt("AdminPersonListModal", "700px", "auto", false));
    },
    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    async onexport() {
      if (this.settlementSid === "") {
        return this.alim("정산 리스트를 선택해주세요!", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/GET_EXCEL_DATA", this.settlementSid);
        const res = this.getExcelData.channeltuneApiResult;
        if (res.errorCode === 200) {
          const storeList = res.settlement;
          const animalWS = XLSX.utils.json_to_sheet(storeList); //테이블 담기

          // A workbook is the name given to an Excel file
          const wb = XLSX.utils.book_new(); // make Workbook of Excel

          //셀 제목 변경
          animalWS["A1"].v = "코드";
          animalWS["A1"].v = "정산 코드";
          animalWS["B1"].v = "스토어 고유코드";
          animalWS["C1"].v = "업체 코드";
          animalWS["D1"].v = "계약 고유코드";
          animalWS["E1"].v = "계약 종류 코드";
          animalWS["F1"].v = "계약 유형 코드";
          animalWS["G1"].v = "계약 종류 타입 코드";
          animalWS["H1"].v = "광고형 계약 수수료 율";
          animalWS["I1"].v = "임대형";
          animalWS["J1"].v = "판매형";
          animalWS["K1"].v = "월 이자";
          animalWS["L1"].v = "월 정산 금액";
          animalWS["M1"].v = "업체명";
          animalWS["N1"].v = "계약서 제목";
          animalWS["O1"].v = "계약 종류";
          animalWS["P1"].v = "계형 유형";
          // add Worksheet to Workbook

          //셀의 길이 변경
          const wscols = [
            { wch: 12 },
            { wch: 13 },
            { wch: 13 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
            { wch: 15 },
            { wch: 8 },
            { wch: 8 },
            { wch: 8 },
            { wch: 10 },
            { wch: 33 },
            { wch: 72 },
            { wch: 10 },
            { wch: 10 },
          ];
          animalWS["!cols"] = wscols;

          // Workbook contains one or more worksheets
          XLSX.utils.book_append_sheet(wb, animalWS, this.title); // sheetAName is name of Worksheet

          // export Excel file
          XLSX.writeFile(wb, `${this.title} 리스트.xlsx`); // name of the file is 'book.xlsx'
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.searchMonth = "";
      this.settlementYear = "";
      this.settlementTitle = "";
      this.settlementList = [];
      this.settlementSid = "";
      this.toggle = false;
      this.setMonth();
    },
    clear2() {
      if (this.companySid !== "") {
        this.settlementList = [];
        this.len = null;
        this.companySid = "";
        this.companyName = "";
        this.getSettleData(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px dotted #ccc;
}
.line {
  padding: 10 !important;
  border: 1px solid #ccc;
}
.line2 {
  padding: 10px !important;
  border: 1px solid #ccc;
  height: calc(100% - 236px);
}
.line3 {
  height: calc(100% - 193px);
}
.titled {
  border-bottom: 1px dotted #ccc;
  padding-bottom: 15px;
  & h2 {
    text-align: center;
    @include NotoSans(1.5, 700, #000);
  }
  & div {
    & .info {
      height: 28px !important;
    }
  }
}
.ad-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;

  & .search-box {
    margin: 5px 0;
    display: flex;
    align-items: center;
    & input {
      flex: 1;
      border: 1px solid #000000;
      height: 28px;
      padding: 0 5px;
    }

    & button {
      margin-left: 5px;
    }
  }

  & .ad-list {
    width: 40% !important;
    height: 100%;
  }

  & .ad-list-right {
    height: 100%;
    width: calc(100% - 41%);
  }

  & .btn-group {
    & input {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 10px;
    }
  }

  & .field {
    & .field-div {
      & .location {
        display: flex;
        align-content: center;
        & .pull-down {
          flex: 1;
          width: 130px;
          &:nth-child(2) {
            margin: 0 5px;
          }
        }
        & div {
          display: flex;
          align-items: center;
          & span {
            width: 50px !important;
          }
        }
      }
    }
  }
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.tbl::v-deep {
  & thead {
    border-bottom: 1px solid #000;
  }
  & .v-input__slot {
    margin: 0 !important;
  }
  & .v-messages {
    display: none !important;
  }
}
.company_input {
  display: flex;
  justify-content: space-between;
  & input {
    border: 1px solid #ccc;
    height: 28px;
    padding: 0 10px;
  }
  & .readonly {
    width: 125px;
    margin-left: 5px;
    background-color: #f4f4f4;
  }
  & #company {
    margin-left: 5px;
    width: 200px;
  }
}

#scrolled {
  margin-top: 0 !important;
  height: 670px;
  padding-top: 5px;
  overflow-y: auto;
}
.group-total {
  & .total-header {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    & span {
      font-weight: 700;
      &:nth-child(1) {
        width: 30%;
        text-align: center;
      }
      &:nth-child(2) {
        width: 30%;
        text-align: center;
      }
      &:nth-child(3) {
        width: 40%;
        text-align: center;
      }
    }
  }
  & .total-body {
    border-bottom: 1px solid #ccc;
    height: 100px;
    & .list-wrap {
      width: 60%;
      border-right: 1px dashed #ccc;
      height: 95px;
      & .subject {
        width: 50%;
        padding-left: 20px;
      }
      & .num {
        width: 50%;
        text-align: right;
        padding-right: 20px;
      }
    }
    & .total-price {
      width: 40%;
      text-align: center;
      @include NotoSans(1.8, 700, #000);
    }
  }
}
</style>
