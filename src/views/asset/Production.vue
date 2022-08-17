<template>
  <section class="container">
    <div class="title-wrap">
      <h1>제품 생산(입고) 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>제품 생산(입고)</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
              <!-- <v-btn small color="warning" @click="validate('modify')">수정</v-btn> -->
              <v-btn small color="error" @click="confirm(productionSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>

              <tr>
                <td>제품</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="productSid" />
                  <input type="text" class="input-last" readonly v-model="productName" />
                  <v-btn small color="primary" dark @click="showProductModalPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>생산날짜</td>
                <td>
                  <!-- <input type="text" v-model="productionDate" /> -->
                  <date-picker :propdate="productionDate" @updateDate="newProductionDate" class="modal-date"></date-picker>
                </td>
                <td>LOT 번호</td>
                <td><input type="text" v-model="productionLotNumbr" /></td>
              </tr>
              <tr>
                <td>생산 업체</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="productionCompany" />
                  <input type="text" class="input-last" readonly v-model="productionCompanyName" />
                  <v-btn small color="primary" dark @click="showCompanyModalPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>실 생산 업체</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="productionWorksCompany" />
                  <input type="text" class="input-last" readonly v-model="productionWorksCompanyName" />
                  <v-btn small color="primary" dark @click="showCpmpanyRealModalPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>제품입고날짜</td>
                <td>
                  <!-- <input type="text" v-model="productionEnteringDate" /> -->
                  <date-picker :propdate="productionEnteringDate" @updateDate="newProductionEnteringDate" class="modal-date"></date-picker>
                </td>
                <td>제품입고량</td>
                <td><input type="text" v-model="productionEnteringAmount" /></td>
              </tr>
              <tr>
                <td>제품 입고 담당자</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="interbridEmployeeSid" />
                  <input type="text" class="input-last" readonly v-model="interbirdEmployeeName" />
                  <v-btn small color="primary" dark @click="showManagerModalPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>비고</td>
                <td colspan="3">
                  <textarea v-model="productionDoc"></textarea>
                </td>
              </tr>
            </table>
            <!-- 정보 테이블 -->
            <table class="tbl mt20 select-tbl">
              <caption>
                Serial 테이블
              </caption>
              <colgroup>
                <col width="120" />
                <col width="100" />
                <col width="120" />
                <col width="*" />
                <!-- <col width="100" /> -->
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>생산날짜</th>
                  <th class="right">제품입고량</th>
                  <th class="left">LOT 번호</th>
                  <!-- <th>입고 처리</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="productionDetail(item.productionSid)">
                  <td>{{ item.productionSid }}</td>
                  <td>{{ item.productionDate }}</td>
                  <td class="right">{{ item.productionEnteringAmount }}</td>
                  <td class="left">{{ item.productionLotNumbr }}</td>
                  <!-- <td>{{ item.productionTransStatusName }}</td> -->
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="4">정보 리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30" v-if="list.length > 0">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>총 제품 수</td>
                <td colspan="3">
                  <input type="text" readonly v-model="totalProductCount" />
                </td>
              </tr>
              <tr>
                <td>입고 량</td>
                <td><input type="text" readonly v-model="enterProductCount" /></td>
                <td>입/출고 불량</td>
                <td><input type="text" readonly v-model="errorProductCount" /></td>
              </tr>
              <tr>
                <td>출고 량</td>
                <td><input type="text" readonly v-model="outProductCount" /></td>
                <td>폐기</td>
                <td><input type="text" readonly v-model="disposalProductCount" /></td>
              </tr>
              <tr>
                <td>잔고 량</td>
                <td colspan="3">
                  <input type="text" readonly v-model="balanceProductCount" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>제품 생산</h2>
            <div class="search">
              <div>
                <input type="text" v-model="searchText" placeholder="Serial번호 입력" @keyup.enter="productionSerial(1)" />
                <v-btn small color="primary" class="btn-search" @click="productionSerial(1)">조회</v-btn>
              </div>
              <v-btn small color="primary" @click="showLotModalPopup">LOT별제품 라벨 인쇄</v-btn>
            </div>
          </div>
          <table class="tbl mt20">
            <caption>
              Serial 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="100" />
              <col width="100" />
              <col width="80" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>제품UNIT코드</th>
                <th>제품코드</th>
                <th class="left">제품명</th>
                <th>생산날짜</th>
                <th>LOT 번호</th>
                <th>Serial 번호</th>
                <th>제품 최종<br />검수 상태</th>
                <th>제품검수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in transList" :key="index">
                <td>{{ item.productionTransSid }}</td>
                <td>{{ item.productionSid }}</td>
                <td class="left">{{ item.productName }}</td>
                <td>{{ item.productionDate }}</td>
                <td>{{ item.productionLotNumbr }}</td>
                <td>{{ item.productionTransSerialNo }}</td>
                <td>{{ item.productionTransStatusName }}</td>
                <td>
                  <v-btn
                    small
                    @click="
                      showInspectionModalPopup({
                        tSid: productSid,
                        transSid: item.productionTransSid,
                        tName: item.productName,
                        tLot: item.productionLotNumbr,
                        tKind: item.productKind,
                      })
                    "
                    color="primary"
                    >제품검수</v-btn
                  >
                </td>
              </tr>
            </tbody>
            <tfoot v-if="transList.length < 1">
              <tr>
                <td colspan="8">Serial 번호 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30" v-if="transList.length > 0">
            <v-pagination v-model="transPage" :length="transLen" :total-visible="7"></v-pagination>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import showInspectionModal from "@/components/modal/assets/ProductionInspection";
import showLotModal from "@/components/modal/assets/ProductionLot";
import showSerialModal from "@/components/modal/assets/ProductionSerial";
import showProductModal from "@/components/modal/assets/AssetProductList";
import showCompanyModal from "@/components/modal/common/CompanyList";
import showManagerModal from "@/components/modal/system/EmployeeList";
import DatePicker from "@/components/form/DatePicker.vue";
import { getPopupOpt } from "@/utils/modal";
export default {
  components: { alim, confirm, DatePicker },
  mixins: [loading, alimMixin, deleteMixin],
  data() {
    return {
      //게시물 설정
      page: 1,
      size: 5,
      len: null,
      list: [],
      searchText: "",

      transPage: 1,
      transSize: 20,
      transLen: null,
      transList: [],

      //디테일 데이터
      productUnitName: "",
      totalProductCount: "",
      enterProductCount: "",
      outProductCount: "",
      errorProductCount: "",
      disposalProductCount: "",
      balanceProductCount: "",

      productionTransSid: "",
      productSid: "",
      productName: "",
      // productionTrans: [],
      productionSid: "",
      productionCompany: "",
      productionLotNumbr: "",
      productionDate: "",
      productionWorksCompany: "",
      productionWorksSid: "", // 제품리스트의 productionSid
      productionEnteringDate: "",
      productionEnteringAmount: "",
      productionDoc: "",
      created_at: "",
      updated_at: "",
      productionCompanyName: "",
      productionWorksCompanyName: "",
      interbridEmployeeSid: "",
      interbirdEmployeeName: "",
    };
  },
  computed: {
    ...mapGetters("assetProduct", [
      "getProductionList",
      "getProductionDetail",
      "getProductionSerial",
      "productionAdd",
      "productionModify",
      "productionDelete",
    ]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload(0);
    },
    transPage() {
      this.productionSerial();
    },
    transSize() {
      this.productionSerial();
    },
  },
  methods: {
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num == 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTION_LIST", {
        size: this.size,
        page: this.page,
        productSid: this.productSid,
      });
      if (this.getProductionList.channeltuneApiResult.errorCode == 200) {
        const productionList = this.getProductionList.channeltuneApiResult.production;
        this.list = productionList.data;
        this.len = productionList.last_page;
        const product = this.getProductionList.channeltuneApiResult.product;
        this.productUnitName = product.productUnitName;
        this.totalProductCount = product.totalProductCount;
        this.enterProductCount = product.enterProductCount;
        this.outProductCount = product.outProductCount;
        this.errorProductCount = product.errorProductCount;
        this.disposalProductCount = product.disposalProductCount;
        this.balanceProductCount = product.balanceProductCount;
      } else {
        this.alim(this.getProductionList.channeltuneApiResult.errorMessage, this.errorColor);
      }

      bus.$emit("end:spinner");
    },
    // 상세 정보
    // id: productionSid
    async productionDetail(id) {
      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTION_DETAIL", id);
      const productionDetail = this.getProductionDetail.channeltuneApiResult.production;
      this.productionTransSid = productionDetail.productionTransSid;
      this.productionSid = productionDetail.productionSid;
      this.productionCompany = productionDetail.productionCompany;
      this.productionLotNumbr = productionDetail.productionLotNumbr;
      this.productionDate = productionDetail.productionDate;
      this.productionWorksCompany = productionDetail.productionWorksCompany;
      this.productionEnteringDate = productionDetail.productionEnteringDate;
      this.productionEnteringAmount = productionDetail.productionEnteringAmount;
      this.productionDoc = productionDetail.productionDoc;
      this.created_at = productionDetail.created_at;
      this.updated_at = productionDetail.updated_at;
      this.productionCompanyName = productionDetail.productionCompanyName;
      this.productionWorksCompanyName = productionDetail.productionWorksCompanyName;
      this.interbridEmployeeSid = productionDetail.interbridEmployeeSid;
      this.interbirdEmployeeName = productionDetail.interbirdEmployeeName;
      this.productionSerial(1);
      bus.$emit("end:spinner");
    },
    async productionSerial(num) {
      if (this.productionSid == "" || this.productionSid == null) {
        this.alim("제품생산을 선택해야 조회가 가능합니다.");
        return false;
      }

      if (num == 1) {
        this.transPage = 1;
      }

      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTION_SERIAL", {
        size: this.transSize,
        page: this.transPage,
        productionSid: this.productionSid,
        productionTransSid: this.searchText,
      });
      if (this.getProductionSerial.channeltuneApiResult.errorCode == 200) {
        const productionSerial = this.getProductionSerial.channeltuneApiResult.production;
        this.transList = productionSerial.data;
        this.transLen = productionSerial.last_page;
      } else {
        this.alim(this.getProductionSerial.channeltuneApiResult.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
    },
    // 제품검수 모달
    showInspectionModalPopup({ tSid, transSid, tName, tLot, tKind }) {
      this.$modal.show(
        showInspectionModal,
        { update: this.inspectionUpdate, tSid, transSid, tName, tLot, tKind },
        getPopupOpt("showInspectionModal", "1000px", "auto", false),
      );
    },
    // 제품검수 모달 닫기 시 목록 새로고침
    inspectionUpdate(data) {
      this.productionDetail(this.productionSid);
    },
    // LOT라벨 인쇄 모달
    showLotModalPopup() {
      if (this.productionSid == "" || this.productionSid == null) {
        this.alim("제품생산 항목을 선택하세요.", this.errorColor);
        return false;
      }

      this.$modal.show(showLotModal, { id: this.productionSid }, getPopupOpt("showLotModal", "1000px", "auto", false));
    },
    // 시리얼라벨 인쇄 모달
    showSerialModalPopup() {
      this.$modal.show(showSerialModal, { id: this.productionSid }, getPopupOpt("showSerialModal", "1000px", "auto", false));
    },
    //제품 모달
    showProductModalPopup() {
      this.$modal.show(showProductModal, { update: this.ProductDataInit }, getPopupOpt("showProductModal", "800px", "auto", false));
    },
    ProductDataInit(data) {
      this.productSid = data.productSid;
      this.productName = data.productKindName;
      this.productionWorksSid = data.productionSid;
      this.reload(1);
      this.clearProduct();
    },
    //업체 모달
    showCompanyModalPopup() {
      this.$modal.show(showCompanyModal, { update: this.CompanyDataInit }, getPopupOpt("showCompanyModal", "800px", "auto", false));
    },
    CompanyDataInit(data) {
      this.productionCompany = data.companySid;
      this.productionCompanyName = data.companyName;
    },
    //실 업체 모달
    showCpmpanyRealModalPopup() {
      this.$modal.show(showCompanyModal, { update: this.CompanyRealDataInit }, getPopupOpt("showCompanyModal", "800px", "auto", false));
    },
    CompanyRealDataInit(data) {
      this.productionWorksCompany = data.companySid;
      this.productionWorksCompanyName = data.companyName;
      this.productionWorksSid = data.productionSid;
    },
    //담당자 모달
    showManagerModalPopup() {
      this.$modal.show(showManagerModal, { update: this.ManagerDataInit }, getPopupOpt("showManagerModal", "800px", "auto", false));
    },
    ManagerDataInit(data) {
      this.interbridEmployeeSid = data.interbridEmployeeSid;
      this.interbirdEmployeeName = data.interbridEmployeeKorName;
    },
    //validate
    validate(status) {
      if (status == "reg") {
        if (this.productSid == "" || this.productSid == null) {
          this.alim("제품을 선택해야 등록할 수 있습니다.", this.errorColor);
          return false;
        }

        if (this.productionSid !== "") {
          this.alim("제품고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }

      if (this.productionCompany == "" || this.productionCompany == null) {
        this.alim("제품생산업체를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.productionLotNumbr == "" || this.productionLotNumbr == null) {
        this.alim("제품 생산 업체 로트번호를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.productionDate == "" || this.productionDate == null) {
        this.alim("제품 생산 날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.productionWorksCompany == "" || this.productionWorksCompany == null) {
        this.alim("제품 실제 생산 회사를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.productionEnteringDate == "" || this.productionEnteringDate == null) {
        this.alim("제품입고날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.productionEnteringAmount == "" || this.productionEnteringAmount == null) {
        this.alim("제품입고량을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeSid == "" || this.interbridEmployeeSid == null) {
        this.alim("제품입고담당자를 선택해주세요.", this.errorColor);
        return false;
      }

      if (status == "reg") {
        this.reg();
      }
      if (status == "modify") {
        this.modify();
      }
    },
    //추가
    async reg() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTION_ADD", {
        productSid: this.productSid,
        productionCompany: this.productionCompany,
        productionLotNumbr: this.productionLotNumbr,
        productionDate: this.productionDate,
        productionWorksCompany: this.productionWorksCompany,
        productionEnteringDate: this.productionEnteringDate,
        productionEnteringAmount: this.productionEnteringAmount,
        interbridEmployeeSid: this.interbridEmployeeSid,
        productionDoc: this.productionDoc,
      });
      if (this.productionAdd.channeltuneApiResult.errorCode == 200) {
        this.alim("상품이 추가 되었습니다.", this.successColor);
        this.reload();
      } else {
        this.alim(this.productionAdd.channeltuneApiResult.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
    },
    //수정
    async modify() {
      if (this.productionSid == "") {
        this.alim("제품생산을 선택해 주세요.", this.errorColor);
        return false;
      }

      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTION_MODIFY", {
        productionSid: this.productionSid,
        productionLotNumbr: this.productionLotNumbr,
        productionDate: this.productionDate,
        productionEnteringDate: this.productionEnteringDate,
        productionEnteringAmount: this.productionEnteringAmount,
        productionDoc: this.productionDoc,
      });
      if (this.productionModify.channeltuneApiResult.errorCode == 200) {
        this.alim("수정 되었습니다.", this.successColor);
        this.productionDetail(this.productionSid);
        this.reload();
      } else {
        this.alim(this.productionModify.channeltuneApiResult.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          bus.$emit("start:spinner");
          await this.$store.dispatch("assetProduct/PRODUCTION_DEL", this.productionSid);
          if (this.setManagerResult.channeltuneApiResult.errorCode == 200) {
            this.reload(1);
            this.clearProduct();
            if (this.list.length < 1) {
              this.page = this.page - 1;
            }
            this.alim("삭제 되었습니다.", this.successColor);
          } else {
            this.alim(this.setManagerResult.channeltuneApiResult.errorMessage, this.errorColor);
          }
          bus.$emit("end:spinner");
        }
      }
      this.resetDeleteData();
    },
    //항목 clear
    clear(type = "all") {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.productionDate = "";
      this.productionLotNumbr = "";
      this.productionCompany = "";
      this.productionCompanyName = "";
      this.productionWorksCompany = "";
      this.productionWorksCompanyName = "";
      this.productionEnteringDate = "";
      this.productionEnteringAmount = "";
      this.interbridEmployeeSid = "";
      this.interbirdEmployeeName = "";
      this.productionDoc = "";
      this.productSid = "";
      this.productName = "";
      this.list = [];
      this.len = null;
      this.transList = [];
      this.transLen = null;
      this.productionSid = "";
      this.created_at = "";
      this.updated_at = "";
      this.productUnitName = "";
      this.totalProductCount = "";
      this.enterProductCount = "";
      this.outProductCount = "";
      this.errorProductCount = "";
      this.disposalProductCount = "";
      this.balanceProductCount = "";
    },
    clearProduct() {
      this.productionDate = "";
      this.productionLotNumbr = "";
      this.productionCompany = "";
      this.productionCompanyName = "";
      this.productionWorksCompany = "";
      this.productionWorksCompanyName = "";
      this.productionEnteringDate = "";
      this.productionEnteringAmount = "";
      this.interbridEmployeeSid = "";
      this.interbirdEmployeeName = "";
      this.productionDoc = "";
      this.transList = [];
      this.transLen = null;
    },
    newProductionDate(data) {
      this.productionDate = data;
    },
    newProductionEnteringDate(data) {
      this.productionEnteringDate = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.event-link {
  & > div {
    height: 25px;
  }
  & span {
    white-space: nowrap;
    margin-right: 5px;
  }
  & button {
    margin-left: 5px;
  }
}
.download-wrap {
  width: 100%;
  margin-left: 40px;
}
.input-size {
  width: 150px !important;
}
.user-list-tbl {
  & td {
    cursor: pointer;
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
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 600px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 610px);
    & .border {
      & .header {
        & .search {
          display: flex;
          align-items: center;

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
