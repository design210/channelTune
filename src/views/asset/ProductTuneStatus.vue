<template>
  <section class="container">
    <div class="title-wrap">
      <h1>제품별 TUNE 설치 현황</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <div class="wrap">
              <div class="d-flex">
                <div class="search-group">
                  <span class="mr5">제품 종류</span>
                  <pull-down :clear="clearField" @selected="StatusProp" :data="productKind" code="SYS21910B003" class="pull-down w150" />
                </div>
                <div class="group">
                  <span class="ml10 mr5">업체</span>
                  <input type="text" name="" id="" class="short" readonly :value="companySid" />
                  <input type="text" name="" id="" class="long" :value="companyName" readonly />
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
              </div>
              <div class="search" style="display: flex">
                <v-btn small color="primary" dark class="ml5" @click="reload(1)">조회</v-btn>
                <v-btn small color="success" dark class="ml5" @click="onexport">xlsx</v-btn>
                <v-btn small class="ml5" @click="reload(0)">CLEAR</v-btn>
              </div>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl" id="installationStatusData">
            <caption>
              제품별 TUNE 설치 현황 테이블
            </caption>
            <colgroup>
              <col width="65" />
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
              <col width="80" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">제품종류</th>
                <th class="left">모델명</th>
                <th class="left">시리얼번호</th>
                <th>업체코드</th>
                <th class="left">업체명</th>
                <th>스토어코드</th>
                <th class="left">스토어명</th>
                <th>설치시공일</th>
                <th>설치상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in list" :key="idx">
                <td>{{ item.productInstallionStoreInfoSid }}</td>
                <td class="left">{{ item.productKindName }}</td>
                <td class="left">{{ item.productModelName }}</td>
                <td class="left"></td>
                <td>{{ item.companySid }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td>{{ item.productInstallionStoreDate }}</td>
                <td>{{ item.productInstallionStoreStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="10">리스트가 없습니다.</td>
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
import XLSX from "xlsx";
import PullDown from "@/components/form/PullDown.vue";
import modalMixin from "@/mixins/showModal.js";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  components: {
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
      clearField: false,
      list: [],
      len: null,

      page: 1,

      companySid: "",
      companyStoreSid: "",
      companyStoreName: "",
      companyName: "",
      productKind: "",
      excelDatas: [],
    };
  },
  computed: {
    ...mapGetters("assetStoreList", ["getProductStoreList"]),
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
    this.reload(1);
  },
  methods: {
    //데이터 받아오는 함수
    async reload(num, first) {
      if (num === 0) {
        this.clear();
      }

      if (num === 1) {
        this.page = 1;
      }
      // 처음 렌더링시 모든 데이터를 보여주기 위해 날짜 값 빈 데이터로 초기화

      bus.$emit("start:spinner");
      await this.$store.dispatch("assetStoreList/GET_PRODUCT_STORE_LIST", {
        size: this.size,
        page: this.page,
        productKind: this.productKind,
        companySid: this.companySid,
        companyStoreSid: this.companyStoreSid,
      });
      const res = this.getProductStoreList.channeltuneApiResult;
      console.log(res);
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.list = res.storeTuneList.data;
      this.len = res.storeTuneList.last_page;
      bus.$emit("end:spinner");
    },

    clear() {
      this.clearField = false;
      this.companySid = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.companyName = "";
      this.productKind = "";
    },

    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },

    updateStore(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
    },
    update() {
      this.reload(0);
    },
    StatusProp(data) {
      this.productKind = data.sysCodeSid;
    },

    //엑셀 뽑기

    async onexport() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("assetStoreList/GET_PRODUCT_STORE_LIST", {
        size: "",
        page: "",
        productKind: this.productKind,
        companySid: this.companySid,
        companyStoreSid: this.companyStoreSid,
      });
      const res = this.getProductStoreList.channeltuneApiResult;
      console.log(res);
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.excelDatas = res.storeTuneList;
      const animalWS = XLSX.utils.json_to_sheet(this.excelDatas, {
        header: [
          "productInstallionStoreInfoSid",
          "productKindName",
          "productModelName",
          "productionTransSid",
          "companySid",
          "companyName",
          "companyStoreSid",
          "companyStoreName",
          "productInstallionStoreDate",
          "productInstallionStoreStatus",
          "productInstallionStoreStatusName",
          "productStatus",
          "productStatusName", //제품상태명
          "productUnit", //제품단위
          "productUnitName", //제품단위명
          "productStandardVoltage", //제품규격
          "productRegistrationNumber", //제품 등록번호
          "productVersion", //제품버전
          "productStandardDoc", //비고
          "productDescription", //제품상세설명
          "productInstallionStoreSid", //설치 업체 고유코드
          "productSid", //제품코드
          "productName", //제품명
          "productKind", //제품종류코드
          "created_at", //생성일
          "updated_at", //수정일
        ],
      }); //테이블 담기

      // A workbook is the name given to an Excel file
      const wb = XLSX.utils.book_new(); // make Workbook of Excel

      animalWS["A1"].v = "고유코드";
      animalWS["B1"].v = "제품종류";
      animalWS["C1"].v = "모델명";
      animalWS["D1"].v = "설치업체 Trans 고유코드";
      animalWS["E1"].v = "업체코드";
      animalWS["F1"].v = "업체명";
      animalWS["G1"].v = "스토어코드";
      animalWS["H1"].v = "스토어명";
      animalWS["I1"].v = "설치시공일";
      animalWS["J1"].v = "설치상태코드";
      animalWS["K1"].v = "설치상태";
      animalWS["L1"].v = "제품상태";
      animalWS["M1"].v = "제품상태명";
      animalWS["N1"].v = "제품단위";
      animalWS["O1"].v = "제품단위명";
      animalWS["P1"].v = "제품규격";
      animalWS["Q1"].v = "제품 등록번호";
      animalWS["R1"].v = "제품버전";
      animalWS["S1"].v = "비고";
      animalWS["T1"].v = "제품상세설명";
      animalWS["U1"].v = "설치 업체 고유코드";
      animalWS["V1"].v = "제품코드";
      animalWS["W1"].v = "제품명";
      animalWS["X1"].v = "제품종류코드";
      animalWS["Y1"].v = "생성일";
      animalWS["Z1"].v = "업데이트일";
      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, "animals"); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, "제품별 TUNE 설치현황 리스트.xlsx"); // name of the file is 'book.xlsx'

      bus.$emit("end:spinner");
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
    width: 110px;
    margin-right: 10px;
    &:read-only {
      background: #f4f4f4;
    }
  }
  & .long {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: 200px;
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
