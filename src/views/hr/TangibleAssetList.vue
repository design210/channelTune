<template>
  <section class="container">
    <h1>유형자산 현황</h1>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="topbar">
            <div class="chip-area">
              <div class="company_input">
                <span class="ml15 mr5 status">지급 상태</span>
                <pull-down :data="joinKind" code="SYS22321B002" @selected="TangibleAssetKindProp" class="pull-down w150"></pull-down>
                <div class="status mr10">
                  <span class="ml15 mr5">조회구분</span>
                  <v-select :items="items" v-model="searchKey" item-text="value" item-value="key" outlined class="select-basic" />
                </div>
                <div class="d-flex mr10" v-if="searchKey === 'tangibleAssetsDate'">
                  <date-picker :propdate="startDate" @updateDate="pickStartDate" />
                  <span class="ml5 mr5">~</span>
                  <date-picker :propdate="endDate" @updateDate="pickEndDate" />
                </div>

                <div class="d-flex mr10" v-else-if="searchKey === 'tangibleAssetsPrice'">
                  <input
                    type="text"
                    name="storeName"
                    id="storeName"
                    @keyup.enter="addCondition"
                    placeholder="가격 범위를 입력해주세요"
                    v-model="startPrice"
                  />
                  <span class="ml5 mr5">~</span>
                  <input
                    type="text"
                    name="storeName"
                    id="storeName"
                    @keyup.enter="addCondition"
                    placeholder="가격 범위를 입력해주세요"
                    v-model="endPrice"
                  />
                </div>
                <input
                  v-else
                  type="text"
                  name="storeName"
                  id="storeName"
                  placeholder="검색어를 입력해주세요"
                  @keyup.enter="addCondition"
                  v-model="searchText"
                />
                <v-btn small @click="addCondition" class="ml5 btn-search">조건추가</v-btn>
                <v-btn small @click="chipArr = []" class="ml5 btn-search">초기화</v-btn>
              </div>
              <div class="chip-container mt10">
                <chip :array="chipArr" @chipDelete="deleteChipItem" @chipSelect="selectChip" />
              </div>
            </div>
            <div>
              <v-btn dark small color="cyan" @click="showLabelDownLoad">라벨 출력</v-btn>
              <v-btn small color="primary" @click="getTangibleList(1)" class="ml5 btn-search">조회</v-btn>
              <v-btn small color="success" @click="onexport" class="ml5 btn-search">XLSX</v-btn>
              <v-btn small @click="clear" class="ml5 btn-search">CLEAR</v-btn>
            </div>
          </div>
          <table class="tbl select-tbl mt20">
            <caption>
              스토어 현황 테이블
            </caption>
            <colgroup>
              <col width="90" />
              <col width="*" />
              <col width="110" />
              <col width="100" />
              <col width="80" />
              <col width="50" />
              <col width="70" />
              <col width="100" />
              <col width="120" />
              <col width="80" />
              <col width="105" />
              <col width="80" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">품명</th>
                <th class="right">구입가격</th>
                <th>사용자</th>
                <th>위치</th>
                <th>상태</th>
                <th>구분</th>
                <th class="left">모델명</th>
                <th>시리얼 번호</th>
                <th>제조사</th>
                <th>제조일</th>
                <th class="left">구입처</th>
                <th>내용연수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="goDetailPage(item)">
                <td>{{ item.tangibleAssetsSid }}</td>
                <td class="left">{{ item.tangibleAssetsName }}</td>
                <td class="right">{{ item.tangibleAssetsPrice | comma }}</td>
                <td>{{ item.tangibleAssetsTransMasterSidName }}</td>
                <td>{{ item.tangibleAssetsTransLocation }}</td>
                <td>{{ item.tangibleAssetsTransKindName }}</td>
                <td>{{ item.tangibleAssetsTransDate }}</td>
                <td class="left">{{ item.tangibleAssetsModelName }}</td>
                <td>{{ item.tangibleAssetsSerialNo }}</td>
                <td>{{ item.tangibleAssetsCompany }}</td>
                <td>{{ item.tangibleAssetsDate }}</td>
                <td class="left">{{ item.tangibleAssetsBuyCompany }}</td>
                <td>{{ item.tangibleAssetsYear }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="13">스토어 리스트가 없습니다.</td>
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
import { getAccessTokenCookie } from "@/utils/cookie";
import VuePdfModal from "@/components/modal/common/PdfViewer";
import XLSX from "xlsx";
import axios from "axios";
import DatePicker from "@/components/form/DatePicker";
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { mapGetters } from "vuex";
import Chip from "@/components/form/Chip.vue";
import bus from "@/utils/bus";
export default {
  components: {
    PullDown,
    alim,
    DatePicker,
    Chip,
  },
  mixins: [alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      list: [],
      joinKind: "",
      page: 1,
      searchKey: "",
      len: null,
      searchText: "",
      startDate: "",
      endDate: "",
      startPrice: "",
      endPrice: "",
      searchCondition: {},
      employee: [],
      chipArr: [],
      items: [
        { key: "tangibleAssetsSid", value: "고유코드" },
        { key: "tangibleAssetsSerialNo", value: "시리얼 번호" },
        { key: "tangibleAssetsCompany", value: "제조사" },
        { key: "tangibleAssetsName", value: "품명" },
        { key: "tangibleAssetsModelName", value: "모델명" },
        { key: "tangibleAssetsYear", value: "내용연수" },
        { key: "tangibleAssetsEtc", value: "기타" },
        { key: "tangibleAssetsTransLocation", value: "위치" },
        { key: "tangibleAssetsBuyCompany", value: "구입처" },
        { key: "tangibleAssetsPrice", value: "가격" },
        { key: "tangibleAssetsDate", value: "제조일" },
        { key: "tangibleAssetsTransMasterSid", value: "담당자(정)" },
        { key: "tangibleAssetsTransSlaveSid", value: "담당자(부)" },
      ],
    };
  },
  computed: {
    ...mapGetters("tangibleAssets", ["getTangibleAssetsList", "addTangibleAsset", "modifyTangibleAsset", "deleteTangibleAsset", "getTangibleDetail"]),
    ...mapGetters("interbridEmployee", ["getEmployeeList"]),
  },
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  watch: {
    page() {
      this.getTangibleList();
    },
    size() {
      this.getTangibleList();
    },
  },
  async mounted() {
    await this.EmployeeList();
    this.getTangibleList(1);
  },
  methods: {
    //유형자산 목록조회
    async getTangibleList(num) {
      if (num === 0) {
        // this.clear();
      }
      if (num === 1) {
        this.page = 1;
      }
      if (this.searchKey === "tangibleAssetsDate") {
        this.searchText = this.startDate + "," + this.endDate;
      }
      if (this.searchKey === "tangibleAssetsPrice") {
        this.searchText = this.startPrice + "," + this.endPrice;
      }
      try {
        bus.$emit("start:spinner");
        let obj = {};
        this.chipArr.forEach(async (item) => {
          if (item.key === "tangibleAssetsTransMasterSid" || item.key === "tangibleAssetsTransSlaveSid") {
            const sysCode = this.employee.filter((items) => items.interbridEmployeeKorName === item.value);

            let employeeSysCode = sysCode[0]?.interbridEmployeeSid;
            if (employeeSysCode !== undefined) {
              obj[item.key] = employeeSysCode;
            } else {
              obj[item.key] = item.value;
            }
          } else {
            obj[item.key] = item.value;
          }
        });
        this.searchCondition = obj;
        await this.$store.dispatch("tangibleAssets/GET_TANGIBLE_ASSETS_LIST", {
          page: this.page,
          size: this.size,
          searchCondition: obj,
          joinKind: this.joinKind,
        });
        const res = this.getTangibleAssetsList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.tangibleAssets.data;
        this.len = res.tangibleAssets.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    TangibleAssetKindProp(data) {
      this.joinKind = data.sysCodeSid;
    },
    pickStartDate(data) {
      this.startDate = data;
    },
    pickEndDate(data) {
      this.endDate = data;
    },
    goDetailPage(code) {
      this.$router.push({ name: "TangibleAssetManagement", params: { tangibleAssets: code } });
    },
    clear() {
      this.searchKey = "";
      this.searchText = "";
      this.searchCondition = {};
      this.joinKind = "";
      this.getTangibleList(1);
    },
    async EmployeeList() {
      //검색할경우 페이징 초기화

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_LIST", {
          lastWorkFlag: "Y",
        });
        if (this.getEmployeeList.channeltuneApiResult.errorCode == 200) {
          const userList = this.getEmployeeList.channeltuneApiResult.interbridEmployee;
          this.employee = userList;
        } else {
          this.alim(this.getEmployeeList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async onexport() {
      if (this.settlementSid === "") {
        return this.alim("정산 리스트를 선택해주세요!", this.errorColor);
      }
      try {
        let obj = {};
        this.chipArr.forEach(async (item) => {
          if (item.key === "tangibleAssetsTransMasterSid" || item.key === "tangibleAssetsTransSlaveSid") {
            const sysCode = this.employee.filter((items) => items.interbridEmployeeKorName === item.value);

            let employeeSysCode = sysCode[0]?.interbridEmployeeSid;
            if (employeeSysCode !== undefined) {
              obj[item.key] = employeeSysCode;
            } else {
              obj[item.key] = item.value;
            }
          } else {
            obj[item.key] = item.value;
          }
        });

        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/GET_TANGIBLE_ASSETS_LIST", {
          page: "",
          size: "",
          searchCondition: obj,
          joinKind: this.joinKind,
        });
        const res = this.getTangibleAssetsList.channeltuneApiResult;

        if (res.errorCode === 200) {
          const storeList = res.tangibleAssets;
          const animalWS = XLSX.utils.json_to_sheet(storeList); //테이블 담기

          // A workbook is the name given to an Excel file
          const wb = XLSX.utils.book_new(); // make Workbook of Excel

          // //셀 제목 변경
          animalWS["A1"].v = "고유코드";
          animalWS["B1"].v = "품명";
          animalWS["C1"].v = "시리얼번호";
          animalWS["D1"].v = "제조사";
          animalWS["E1"].v = "모델명";
          animalWS["F1"].v = "제조일";
          animalWS["G1"].v = "내용연수";
          animalWS["H1"].v = "구입처";
          animalWS["I1"].v = "구입가격";
          animalWS["J1"].v = "비고";
          animalWS["K1"].v = "내역 고유코드";
          animalWS["L1"].v = "변경날짜";
          animalWS["M1"].v = "위치";
          animalWS["N1"].v = "내역 비고";
          animalWS["O1"].v = "구분코드";
          animalWS["P1"].v = "구분";
          animalWS["Q1"].v = "지급코드";
          animalWS["R1"].v = "지급구분";
          animalWS["S1"].v = "담당자(정)코드";
          animalWS["T1"].v = "담당자(정) 명";
          animalWS["U1"].v = "담당자(부)코드";
          animalWS["V1"].v = "담당자(부) 명";
          // // add Worksheet to Workbook

          //셀의 길이 변경
          const wscols = [
            { wch: 12 }, //A
            { wch: 12 }, //B
            { wch: 20 }, //C
            { wch: 33 }, //D
            { wch: 33 }, //E
            { wch: 11 }, //F
            { wch: 8 }, //G
            { wch: 15 }, //H
            { wch: 8 }, //I
            { wch: 6 }, //J
            { wch: 8 }, //K
            { wch: 10 }, //L
            { wch: 20 }, //M
            { wch: 10 }, //N
            { wch: 12 }, //O
            { wch: 8 }, //P
            { wch: 12 }, //Q
            { wch: 8 }, //R
            { wch: 12 }, //S
            { wch: 6 }, //T
            { wch: 12 }, //U
            { wch: 6 }, //V
          ];
          animalWS["!cols"] = wscols;

          // Workbook contains one or more worksheets
          XLSX.utils.book_append_sheet(wb, animalWS, "유형자산 리스트"); // sheetAName is name of Worksheet

          // export Excel file
          XLSX.writeFile(wb, `유형자산 리스트.xlsx`); // name of the file is 'book.xlsx'
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    deleteChipItem(data) {
      const idx = this.chipArr.findIndex((item) => item.value === data);
      this.chipArr.splice(idx, 1);
    },
    addCondition() {
      if (this.searchKey === "tangibleAssetsPrice") {
        if (this.startPrice === "" && this.endPrice === "") {
          return this.alim("가격 조건을 입력해주세요!", this.errorColor);
        }
        if (this.hasChipArrIndex("tangibleAssetsPrice") === -1) {
          this.chipArr.push({
            key: this.searchKey,
            value: `${this.startPrice},${this.endPrice}`,
          });
        } else {
          this.chipArr[this.hasChipArrIndex("tangibleAssetsPrice")].value = `${this.startPrice},${this.endPrice}`;
        }
      } else {
        if (this.searchKey === "" || this.searchText === "") {
          return this.alim("조건을 입력해주세요.", this.errorColor);
        }
        if (this.hasChipArrIndex(this.searchKey) === -1) {
          this.chipArr.push({
            key: this.searchKey,
            value: this.searchText,
          });
        } else {
          this.chipArr[this.hasChipArrIndex(this.searchKey)].value = this.searchText;
        }
      }
      setTimeout(() => {
        this.searchText = "";
        this.startPrice = "";
        this.endPrice = "";
      }, 100);
    },
    hasChipArrIndex(key) {
      return this.chipArr.findIndex((item) => item.key === key);
    },
    selectChip(data) {
      this.searchKey = data.key;
      this.searchText = data.value;
    },
    async showLabelDownLoad() {
      if (this.searchKey === "" || this.searchKey === null) {
        return this.alim("조건을 입력해주세요.", this.errorColor);
      }
      if (Object.keys(this.searchCondition).length < 1) {
        return this.alim("조건을 입력해주세요.", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        const accessCookie = getAccessTokenCookie();
        const response = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API}/tangibleAssets/label?searchCondition=${JSON.stringify(this.searchCondition)}&joinKind=${this.joinKind}`,
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + accessCookie,
          },
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        this.pdfsrc = objectUrl;
        this.$modal.show(VuePdfModal, { pdfUrl: objectUrl }, getPopupOpt("VuePdfModal", "700px", "auto", false));
      } catch (e) {
        console.error(e);
      } finally {
        bus.$emit("end:spinner");
      }
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
