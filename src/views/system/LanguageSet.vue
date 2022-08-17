<template>
  <section class="container">
    <div class="title-wrap">
      <h1>언어셋 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div>
            <div>
              <div class="ending">
                <div class="search-group">
                  <span class="mr5">언어 구분</span>
                  <pull-down code="SYS22617B005" :data="languageKind" @selected="languageKindProp" class="pull-down w120" />
                  <span class="ml15 mr5">사이트 구분 / TableName</span>
                  <pull-down code="SYS22705B001" :data="languageSiteKind" @selected="siteProp" class="pull-down w160" />
                  <div class="search ml5">
                    <input type="text" v-model="languageTableName" :readonly="languageTableNameFlag" class="search-input w150" />
                  </div>
                  <span class="ml15 mr5">Version</span>
                  <pull-down code="SYS22617B014" :data="languageVersion" @selected="versionProp" class="pull-down w135" />
                  <span class="ml15 mr5">언어</span>
                  <pull-down-multi
                    :data="languageDocumentCode"
                    :code="'SYS22617B016'"
                    @selected="languageProp"
                    class="pull-down multi w120"
                    :onlySelectPullDown="true"
                  />
                </div>
                <v-btn small color="primary" @click="showLanguageDataTypeViewModalPopup">Language Data Type View</v-btn>
              </div>
              <div class="ending mt10 pl195">
                <div class="search-group">
                  <span class="ml15 mr5">디바이스 / TableSid</span>
                  <pull-down code="SYS22705B005" :data="languageDeviceKind" @selected="languageDeviceKindProp" class="pull-down w160" />
                  <div class="search ml5">
                    <input type="text" v-model="languageTableSid" :readonly="languageTableSidFlag" class="search-input w150" />
                  </div>
                  <span class="ml15 mr5">카테고리</span>
                  <pull-down code="SYS22617B006" @selected="categoryProp" :data="languageCategory" class="pull-down w135" />
                  <div class="search ml5">
                    <input
                      type="text"
                      v-model="searchText"
                      placeholder="언어변수명을 입력해주세요"
                      class="search-input w200"
                      @keyup.enter="reload(1)"
                    />
                  </div>
                </div>
                <div class="search">
                  <v-btn small color="primary" dark class="btn-search" @click="reload(1)">조회</v-btn>
                  <v-btn small color="success" @click="showLanguageSetModalPopup(-1)" dark>추가</v-btn>
                  <v-btn small color="success" dark @click="onexport">XLSX</v-btn>
                  <v-btn small @click="clear">CLEAR</v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="tbl-wid">
            <table class="tbl mt20 user-list-tbl select-tbl">
              <caption>
                언어셋 테이블
              </caption>
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="80" />
                <col width="*" />
                <col width="*" />
                <col width="100" />
                <col width="100" />
                <col width="*" />
                <col v-for="item in thList" :key="item.sysCodeSid" width="350" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>언어구분</th>
                  <th>디바이스</th>
                  <th>Table명</th>
                  <th>Table 고유코드</th>
                  <th>Version</th>
                  <th>카테고리</th>
                  <th class="left">언어변수명</th>
                  <th class="left" v-for="item in thList" :key="item.sysCodeSid">{{ item.sysCodeName }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="showLanguageSetModalPopup(item.languageSid)">
                  <td>{{ item.languageSid }}</td>
                  <td>{{ item.languageSiteKindName }}</td>
                  <td>{{ item.languageDeviceKindName }}</td>
                  <td>{{ item.languageTableName }}</td>
                  <td>{{ item.languageTableSid }}</td>
                  <td>{{ item.languageVersionName }}</td>
                  <td>{{ item.languageCategoryName }}</td>
                  <td class="left">{{ item.languageCodeName }}</td>
                  <td class="left" v-for="items in item.language_document" :key="items.languageDocumentSid">
                    {{ textReturn(items.languageDocument) }}
                  </td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td :colspan="8 + thList.length">리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
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
import PullDown from "@/components/form/PullDown.vue";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import LanguageDataTypeView from "@/components/modal/system/LanguageDataTypeView";
import PullDownMulti from "@/components/form/PullDownMulti.vue";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim, PullDown, PullDownMulti },
  mixins: [loading, alimMixin],
  props: ["size"],
  data() {
    return {
      list: [],
      searchText: "",
      page: 1,
      languageVersion: "",
      languageCategory: "",
      languageTableCode: "",
      languageTableNameFlag: true,
      languageTableSidFlag: true,
      languageKind: "",
      languageDeviceKind: "",
      languageSiteKind: "",
      languageTableName: "",

      languageTableSid: "",
      languageDocumentCode: "SYS22617B017",
      languageDocumentCodes: "",
      languageTableCodeName: null,
      languageLength: 0,
      languageList: [{ sysCodeName: "KOR", sysCodeSid: "SYS22617B017" }],
      thList: [],
      len: null,
    };
  },
  computed: {
    ...mapGetters("languageSet", ["getLanguageSetList"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
    languageSiteKind(val) {
      if (val !== "") {
        this.languageTableNameFlag = false;
      } else {
        this.languageTableNameFlag = true;
      }
    },
    languageDeviceKind(val) {
      if (val !== "") {
        this.languageTableSidFlag = false;
      } else {
        this.languageTableSidFlag = true;
      }
    },
  },
  mounted() {
    this.reload(1);
  },
  //데이터 불러오기
  methods: {
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }

      bus.$emit("start:spinner");
      this.thList = this.languageList;
      await this.$store.dispatch("languageSet/GET_LANGUAGE_SET_LIST", {
        size: this.size,
        page: this.page,
        searchText: this.searchText,
        languageKind: this.languageKind,
        languageSiteKind: this.languageSiteKind,
        languageTableName: this.languageTableName,
        languageVersion: this.languageVersion,
        languageDocumentCodes: this.languageDocumentCodes,
        languageDeviceKind: this.languageDeviceKind,
        languageTableSid: this.languageTableSid,
        languageCategory: this.languageCategory,
      });
      const res = this.getLanguageSetList.channeltuneApiResult;

      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      // this.list = res.language.data;

      this.list = this.returnObj(res.language.data);
      this.len = res.language.last_page;

      bus.$emit("end:spinner");
    },
    siteProp(data) {
      this.languageSiteKind = data.sysCodeSid;
    },
    versionProp(data) {
      this.languageVersion = data.sysCodeSid;
    },
    categoryProp(data) {
      this.languageCategory = data.sysCodeSid;
    },
    languageKindProp(data) {
      this.languageKind = data.sysCodeSid;
    },
    languageDeviceKindProp(data) {
      this.languageDeviceKind = data.sysCodeSid;
    },
    languageProp(data) {
      let selectSids = [];
      let selectNames = [];

      data.forEach(ele => {
        selectSids = [...selectSids, ele.sysCodeSid];
        selectNames = [...selectNames, ele.sysCodeName];
      });
      this.languageDocumentCodes = selectSids.join();
      this.languageList = data;
    },

    showLanguageSetModalPopup(id) {
      this.$modal.show(LanguageSetModal, { languageSid: id, update: this.update }, getPopupOpt("LanguageSetModal", "850px", "auto", false));
    },
    showLanguageDataTypeViewModalPopup() {
      this.$modal.show(LanguageDataTypeView, {}, getPopupOpt("LanguageDataTypeView", "900px", "auto", false));
    },
    returnObj(arr) {
      let array = arr.map(item => {
        let hash = new Map();

        hash.set("languageSid", item.languageSid);
        hash.set("languageSiteKind", item.languageSiteKind);
        hash.set("languageSiteKindName", item.languageSiteKindName);
        hash.set("languageDeviceKind", item.languageDeviceKind);
        hash.set("languageDeviceKindName", item.languageDeviceKindName);

        hash.set("languageVersion", item.languageVersion);
        hash.set("languageCategory", item.languageCategory);
        hash.set("languageCodeName", item.languageCodeName);
        hash.set("languageVersionName", item.languageVersionName);
        hash.set("languageCategoryName", item.languageCategoryName);
        hash.set("languageTableSid", item.languageTableSid);
        hash.set("languageTableName", item.languageTableName);

        let language_document = [];
        if (item.language_document.length > 0) {
          this.thList.forEach(items => {
            let flag = false;

            item.language_document.forEach(it => {
              if (items.sysCodeSid === it.languageDocumentCode) {
                language_document.push({
                  languageDocument: it.languageDocument,
                  languageDocumentCodeName: it.languageDocumentCodeName,
                });
                flag = true;
              }
            });
            if (!flag) {
              language_document.push({
                languageDocument: "",
                languageDocumentCodeName: items.sysCodeName,
              });
            }
          });
        } else {
          for (let i = 0; i < this.thList.length; i++) {
            language_document.push({
              languageDocument: "",
              languageDocumentCodeName: "",
            });
          }
        }
        hash.set("language_document", language_document);
        return Object.fromEntries(hash);
      });
      return array;
    },
    textReturn(text) {
      if (text !== null || text !== undefined) {
        return text;
      } else {
        return "";
      }
    },
    update() {
      this.reload();
    },
    clear() {
      this.languageSiteKind = "";
      this.languageDeviceKind = "";
      this.languageVersion = "";
      this.languageCategory = "";
      this.languageList = [{ sysCodeName: "KOR", sysCodeSid: "SYS22617B017" }];
      this.languageDocumentCode = "SYS22617B017";
      this.searchText = "";
      this.languageTableName = "";
      this.languageTableSid = "";
    },
    async onexport() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/GET_LANGUAGE_SET_LIST", {
        searchText: this.searchText,
        languageKind: this.languageKind,
        languageSiteKind: this.languageSiteKind,
        languageTableName: this.languageTableName,
        languageVersion: this.languageVersion,
        languageDocumentCodes: this.languageDocumentCodes,
        languageDeviceKind: this.languageDeviceKind,
        languageTableSid: this.languageTableSid,
        languageCategory: this.languageCategory,
      });
      const res = this.getLanguageSetList.channeltuneApiResult;

      if (res.errorCode === 200) {
        let a = this.returnObj(res.language).map(item => {
          let hash = new Map();

          hash.set("languageSid", item.languageSid);
          hash.set("languageSiteKind", item.languageSiteKind);
          hash.set("languageSiteKindName", item.languageSiteKindName);
          hash.set("languageDeviceKind", item.languageDeviceKind);
          hash.set("languageDeviceKindName", item.languageDeviceKindName);

          hash.set("languageVersion", item.languageVersion);
          hash.set("languageCategory", item.languageCategory);
          hash.set("languageCodeName", item.languageCodeName);
          hash.set("languageTableName", item.languageTableName);
          hash.set("languageTableSid", item.languageTableSid);
          hash.set("languageVersionName", item.languageVersionName);
          hash.set("languageCategoryName", item.languageCategoryName);
          item.language_document.forEach(items => {
            hash.set(items.languageDocumentCodeName, items.languageDocument);
          });
          return Object.fromEntries(hash);
        });

        const storeList = a;

        const animalWS = XLSX.utils.json_to_sheet(storeList); //테이블 담기

        // A workbook is the name given to an Excel file
        const wb = XLSX.utils.book_new(); // make Workbook of Excel

        //셀 제목 변경
        animalWS["A1"].v = "코드";
        animalWS["B1"].v = "구분코드";
        animalWS["C1"].v = "디바이스 코드";
        animalWS["D1"].v = "테이블 고유코드";
        animalWS["E1"].v = "버전 코드";
        animalWS["F1"].v = "카테고리 코드";
        animalWS["G1"].v = "언어";
        animalWS["H1"].v = "구분";
        animalWS["I1"].v = "버전";
        animalWS["J1"].v = "카테고리";

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
        ];
        animalWS["!cols"] = wscols;

        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, animalWS, this.title); // sheetAName is name of Worksheet

        // export Excel file
        XLSX.writeFile(wb, `${this.title} 리스트.xlsx`); // name of the file is 'book.xlsx'
      } else {
        this.alim(res.errorMessage, this.errorColor);
      }

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
.ending {
  display: flex;
  justify-content: space-between;
}
.tbl-wid {
  overflow-x: auto;
}
@media (min-width: 1901px) {
  .tbl-wid {
    overflow-x: auto;
    max-width: 1668px;
    & table {
      white-space: nowrap !important;
    }
  }
}
@media (min-width: 1541px) and (max-width: 1900px) {
  .tbl-wid {
    overflow-x: auto;
    max-width: 1380px;
    & table {
      white-space: nowrap !important;
    }
  }
}
@media (min-width: 768px) and (max-width: 1540px) {
  .tbl-wid {
    overflow-x: auto;
    & table {
      max-width: 1300px;
    }
  }
}
</style>
