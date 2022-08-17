<template>
  <section class="container">
    <h1>정산 누적</h1>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="topbar">
            <div class="d-flex align-center">
              <v-select :items="year" v-model="searchYear" outlined class="select-basic w120" />
              <h2 class="ml30 mr10">정산제목</h2>
              <v-select
                :items="settlementItems"
                v-model="settlementSid"
                item-text="settlementTitle"
                item-value="settlementSid"
                return-object
                outlined
                class="select-basic w250"
              />
            </div>
            <div class="company_input">
              <input class="readonly" type="text" name="readonly" id="readonly" :value="companySid" readonly placeholder="업체" />
              <input class="readonly w200" type="text" name="company" id="company" :value="companyName" readonly />
              <v-btn small color="success" @click="showModalPopup">검색</v-btn>
              <div class="btn-group">
                <v-btn small color="primary" dark class="ml5 mr5" @click="getDepositData(1)">조회</v-btn>
                <v-btn small @click="clear">CLEAR</v-btn>
                <v-btn class="ml35" color="success" small @click="onexport">XLSX</v-btn>
                <v-btn class="ml5" color="warning" small @click="settlementDepositPost">{{ btnName }}</v-btn>
              </div>
            </div>
          </div>
          <!-- 토탈 데이터 -->
          <section class="total-data">
            <div class="d-flex justify-space-between mt15">
              <div>
                <p>당월합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div>
                <p>이월 누적액 합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositCarryoverPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div class="group1">
                <p>소득세 합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositIncomeTaxPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div class="group1">
                <p>지방세 합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositLocalTaxPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div class="group1">
                <p>세금합계(부가세)</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositTaxPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
            </div>
            <div class="d-flex justify-space-between mt10">
              <div class="group3">
                <p>실지급액 합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositPaymentPriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div class="group3">
                <p>지급 후 차액 합계</p>
                <p>
                  {{ totalData !== null ? Math.floor(totalData.settlementDepositDifferencePriceTotal).toLocaleString() : 0 }}
                </p>
              </div>
              <div class="group2">
                <p>지급불가</p>
                <p>{{ totalData !== null ? Math.floor(totalData.statusTotal1).toLocaleString() : 0 }}</p>
              </div>
              <div class="group2">
                <p>지급보류</p>
                <p>{{ totalData !== null ? Math.floor(totalData.statusTotal2).toLocaleString() : 0 }}</p>
              </div>
              <div class="group2">
                <p>지급처리</p>
                <p>{{ totalData !== null ? Math.floor(totalData.statusTotal3).toLocaleString() : 0 }}</p>
              </div>
            </div>
          </section>
          <!-- //토탈 데이터 -->
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              정산 누적 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
              <col width="100" />
              <col width="80" />
              <col width="70" />
              <col width="100" />
              <col width="200" />
              <col width="90" />
              <col width="98" />
              <col width="150" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">업체/개인</th>
                <th class="right">합계</th>
                <th class="right">이월 누적액</th>
                <th class="right">소득세</th>
                <th class="right">지방세</th>
                <th class="right">세금합계 (부가세)</th>
                <th class="right">실 지급액</th>
                <th class="right">지급 후 차액</th>
                <th>처리 결과</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="showAccumulateModalPopup(item.settlementDepositSid)">
                <td>{{ item.settlementDepositSid }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td class="right">{{ Math.floor(item.settlementDepositPrice) | comma }}</td>
                <td class="right">{{ Math.floor(item.settlementDepositCarryoverPrice) | comma }}</td>
                <td class="right">{{ Math.floor(item.settlementDepositIncomeTaxPrice) | comma }}</td>
                <td class="right">{{ Math.floor(item.settlementDepositLocalTaxPrice) | comma }}</td>
                <td class="right">{{ Math.floor(item.settlementDepositTaxPrice) | comma }}</td>
                <td class="right">
                  {{ Math.floor(item.settlementDepositPaymentPrice) | comma }}
                </td>
                <td class="right">{{ Math.floor(item.settlementDepositDifferencePrice) | comma }}</td>
                <td>{{ item.settlementDepositStatusDoc }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="10">스토어 리스트가 없습니다.</td>
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
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import XLSX from "xlsx";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import CompanyListModal from "@/components/modal/common/CompanyList.vue";
import CalculateModal from "@/components/modal/calculate/CalculateModal.vue";
import { settlementYear } from "@/utils/yearSet.js";
export default {
  components: {
    alim,
  },
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  mixins: [alimMixin],
  props: ["size"],
  data() {
    return {
      companySid: "",
      companyName: "",
      len: null,
      list: [],
      page: 1,
      year: [],
      searchYear: "",
      settlementItems: [],
      settlementSid: {},
      totalData: {},
      btnName: "누적 처리",
    };
  },
  computed: {
    ...mapGetters("settlementProcessing", ["getSettlementDeposit", "getSettlementList", "postSettlementDeposit"]),
  },
  watch: {
    page() {
      this.getDepositData();
    },
    size() {
      this.getDepositData();
    },
    settlementSid(val) {
      val.settlementFinalFlag === "N" ? (this.btnName = "누적 처리") : (this.btnName = "누적 취소");
    },
  },
  async mounted() {
    await this.getList();
    this.settingYear();
    await this.getDepositData();
  },
  methods: {
    settingYear() {
      const yearset = settlementYear("onlyYear");
      const result = yearset.map((item) => {
        return `${item}년`;
      });

      this.year = result;
      this.setYear();
    },
    showModalPopup() {
      //검색버튼 함수
      this.$modal.show(CompanyListModal, { update: this.getCompanyName }, getPopupOpt("AdminPersonListModal", "700px", "auto", false));
    },
    setYear() {
      let year = new Date().getFullYear();
      this.searchYear = year + "년";
    },
    showAccumulateModalPopup(id) {
      //검색버튼 함수
      this.$modal.show(CalculateModal, { settlementDepositSid: id }, getPopupOpt("CalculateModal", "850px", "auto", false));
    },
    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    async getDepositData(num) {
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        const sizeReset = this.size - 4;
        await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_DEPOSIT", {
          settlementSid: this.settlementSid.settlementSid,
          companySid: this.companySid,
          size: sizeReset,
          page: this.page,
        });
        const res = this.getSettlementDeposit.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.settlementDeposit.list.data;
        this.len = res.settlementDeposit.list.last_page;
        this.totalData = res.settlementDeposit.total;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //정산 리스트 가져오기
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
        this.settlementItems = res.SettlementMaster;
        this.settlementSid = res.SettlementMaster[0];
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async clear() {
      if (this.companySid !== "") {
        this.companySid = "";
        this.companyName = "";
        await this.getList();
        this.settingYear();
        await this.getDepositData(1);
      }
    },
    async onexport() {
      // On Click Excel download button
      try {
        bus.$emit("start:spinner");
        //엑셀용 전체 데이터 불러오기
        await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_DEPOSIT", {
          settlementSid: this.settlementSid.settlementSid,
          companySid: this.companySid,
          size: "",
          page: "",
        });
        const res = this.getSettlementDeposit.channeltuneApiResult;
        if (res.errorCode === 200) {
          bus.$emit("end:spinner");
          const customerList = this.getSettlementDeposit.channeltuneApiResult.settlementDeposit.list;
          let arr = customerList.map((item) => {
            let obj = {};
            obj["settlementDepositSid"] = item.settlementDepositSid;
            obj["settlementSid"] = item.settlementSid;
            obj["companySid"] = item.companySid;
            obj["settlementDepositYear"] = item.settlementDepositYear;
            obj["settlementDepositMonth"] = item.settlementDepositMonth;
            obj["settlementDepositPrice"] = item.settlementDepositPrice;
            obj["settlementDepositCarryoverPrice"] = item.settlementDepositCarryoverPrice;
            obj["settlementDepositPaymentPrice"] = item.settlementDepositPaymentPrice;
            obj["settlementDepositDifferencePrice"] = item.settlementDepositDifferencePrice;
            obj["settlementDepositIncomeTaxPrice"] = item.settlementDepositIncomeTaxPrice;
            obj["settlementDepositLocalTaxPrice"] = item.settlementDepositLocalTaxPrice;
            obj["settlementDepositTaxPrice"] = item.settlementDepositTaxPrice;
            obj["settlementDepositBankName"] = item.settlementDepositBankName;
            obj["settlementDepositBankAccount"] = item.settlementDepositBankAccount;
            obj["settlementDepositBankAccountHolder"] = item.settlementDepositBankAccountHolder;
            obj["settlementDepositStatusDoc"] = item.settlementDepositStatusDoc;
            obj["companyName"] = item.companyName;
            return obj;
          });
          this.excelDatas = arr;
        }
        // export json to Worksheet of Excel
        // only array possible
        var animalWS = XLSX.utils.json_to_sheet(this.excelDatas);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        //셀 제목 변경
        animalWS["A1"].v = "고유코드";
        animalWS["B1"].v = "정산코드";
        animalWS["C1"].v = "업체 고유 코드";
        animalWS["D1"].v = "정산 누적 처리 년도";
        animalWS["E1"].v = "정산 누적 처리 월";
        animalWS["F1"].v = "합계";
        animalWS["G1"].v = "이월 누적액";
        animalWS["H1"].v = "실지급액";
        animalWS["I1"].v = "지급 후 차액";
        animalWS["J1"].v = "소득세";
        animalWS["K1"].v = "지방세";
        animalWS["L1"].v = "세금합계";
        animalWS["M1"].v = "은행명";
        animalWS["N1"].v = "계좌번호";
        animalWS["O1"].v = "예금주";
        animalWS["P1"].v = "처리내용";
        animalWS["Q1"].v = "업체명";

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, "정산누적 리스트.xlsx"); // name of the file is 'book.xlsx'
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //누적처리
    async settlementDepositPost() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementProcessing/POST_SETTLEMENT_DEPOSIT", {
          settlementSid: this.settlementSid.settlementSid,
          settlementKind: this.settlementSid.settlementFinalFlag === "N" ? "store" : "destory",
        });
        const res = this.postSettlementDeposit.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        if (this.btnName === "누적 처리") {
          this.btnName = "누적 취소";
        } else {
          this.btnName = "누적 처리";
        }
        await this.getDepositData();
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
.container {
  padding: 40px 20px;
  & h2 {
    @include NotoSans(1.4, 400, #000);
  }
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
    justify-content: space-between;
    border-bottom: 1px solid #ccc;

    padding-bottom: 5px;
    input {
      width: 200px;
      height: 32px;
      padding: 0 10px;
      border: 1px solid #e5e5e5;
    }

    & .company_input {
      display: flex;
      span {
        margin-right: 5px;
        position: relative;
        top: 8px;
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
    & th {
      padding: 0 10px;
    }
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
.total-data {
  & > div {
    & > div {
      width: 20%;
      border: 1px solid #ccc;
      margin-right: 10px;
      border-radius: 10px;
      padding: 5px 15px;
      &:last-child {
        margin-right: 0;
      }
      & p {
        &:nth-child(1) {
          font-weight: 700;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 3px;
        }
        &:nth-child(2) {
          text-align: right;
          padding-top: 3px;
          @include NotoSans(1.5, 500, #000);
        }
      }
      &.group1 {
        border: 2px solid #1976d2;
      }
      &.group2 {
        border: 2px solid #4caf50;
      }
      &.group3 {
        border: 2px solid #ff6600;
      }
    }
  }
}
</style>
