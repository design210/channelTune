<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header v-application">
        <h1>스토어리스트선택</h1>
        <div class="btn-group">
          <v-btn small color="warning" class="mr20" @click="close">저장</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application top" style="width: 50%">
        <table width="50%" class="tbl-reg">
          <colgroup>
            <col width="100" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>업체</td>
            <td class="field-div" colspan="3">
              <input type="text" class="input-first" readonly v-model="companySid" />
              <input type="text" class="input-last" readonly v-model="companyName" />
              <v-btn
                small
                color="primary"
                @click="__showModalTemplate(require('@/components/modal/common/CompanyList.vue'), { update: getCompanyName }, 700)"
                >검색</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>스토어명</td>
            <td class="field-div store-name" colspan="3">
              <input type="text" class="input-first" v-model="searchText" @keyup.enter="reload(1)" />
              <v-btn small color="primary" @click="reload(1)">조회</v-btn>
            </td>
          </tr>
        </table>
      </div>

      <div class="v-application bottom">
        <div class="left">
          <div class="table-container">
            <table class="tbl column2 mt20 select-multi" :class="[list.length < 1 ? 'non-list' : 'store-list']">
              <caption>
                스토어 리스트 테이블
              </caption>
              <thead>
                <tr>
                  <th>업체고유코드</th>
                  <th class="lef">업체명</th>
                  <th>스토어고유코드</th>
                  <th class="lef">스토어명</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in list"
                  :key="index"
                  @click="
                    addStore({
                      companyStoreCompanySid: item.companyStoreCompanySid,
                      companyStoreCompanyName: item.companyStoreCompanyName,
                      companyStoreSid: item.companyStoreSid,
                      companyStoreName: item.companyStoreName,
                    })
                  "
                >
                  <td>{{ item.companyStoreCompanySid }}</td>
                  <td class="lef">{{ item.companyStoreCompanyName }}</td>
                  <td>{{ item.companyStoreSid }}</td>
                  <td class="lef">{{ item.companyStoreName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr data-test="1">
                  <td colspan="4">스토어 리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
        <div class="middle">
          <v-icon class="add-item" color="orange" x-large @click="addItems">mdi-plus</v-icon>
        </div>
        <div class="right">
          <div class="v-application" style="float: right">
            <v-btn small color="primary" @click="deleteItems">선택삭제</v-btn>
          </div>
          <table class="tbl mt20 user-list-tbl select-multi select-list">
            <caption>
              선택한 스토어 리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="100" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>업체고유코드</th>
                <th>업체명</th>
                <th>스토어고유코드</th>
                <th>스토어명</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in selectedItems"
                :key="index"
                @click="
                  deleteStore({
                    companyStoreCompanySid: item.companyStoreCompanySid,
                    companyStoreCompanyName: item.companyStoreCompanyName,
                    companyStoreSid: item.companyStoreSid,
                    companyStoreName: item.companyStoreName,
                  })
                "
              >
                <td>{{ item.companyStoreCompanySid }}</td>
                <td>{{ item.companyStoreCompanyName }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td>{{ item.companyStoreName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="selectedItems.length < 1">
              <tr>
                <td colspan="4">선택하신 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- 알럿 -->
      <alim class="v-application" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import PullDown from "@/components/form/PullDown.vue";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
import modalMixin from "@/mixins/showModal.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import responseMixin from "@/mixins/response";
import loading from "@/mixins/loading";
export default {
  components: { modalWrap, PullDown, alim },
  mixins: [alimMixin, modalMixin, responseMixin, loading],
  data() {
    return {
      page: 1,
      searchText: "",
      len: null,
      size: 10,
      list: [],

      selectedItems: [],

      // 선택항목 추가 임시배열
      addTemp: [],
      // 선택항목 삭제 임시배열
      deleteTemp: [],

      companySid: "",
      companyName: "",
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getCompanyStoreList"]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload();
    },
    companySid() {
      this.reload(1);
    },
    gradeSysCodeSid() {
      if (this.companySid != "") {
        this.reload(1);
      }
    },
  },
  methods: {
    // close modal
    close() {
      this.$attrs.update(this.selectedItems);
      this.$emit("close");
    },

    // list
    async reload(num) {
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        // COMPANY_STORE_LIST
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          companySid: this.companySid,
        });

        const response = this.getCompanyStoreList.channeltuneApiResult.companyStore;
        this.list = response.data;
        this.len = response.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
      this.removeActive("store-list");
      this.removeActive("select-list");
    },

    // 선택할때마다 임시배열에 추가
    addStore({ companyStoreCompanySid, companyStoreCompanyName, companyStoreSid, companyStoreName }) {
      let i = -1;
      this.addTemp.forEach((item, index) => {
        // 동일항목 클릭시 빼버림
        if (item.companyStoreCompanySid == companyStoreCompanySid && item.companyStoreSid == companyStoreSid) {
          i = index;
        }
      });

      if (i > -1) {
        this.addTemp.splice(i, 1);
      } else {
        this.addTemp = [
          ...this.addTemp,
          {
            companyStoreCompanySid,
            companyStoreCompanyName,
            companyStoreSid,
            companyStoreName,
          },
        ];
      }
    },

    // + 아이콘 누를 시 추가
    addItems() {
      this.selectedItems = [...this.selectedItems, ...this.addTemp];

      // 초기화
      this.addTemp = [];
      this.removeActive("store-list");
    },

    // 오른쪽 테이블 항목 클릭
    deleteStore({ companyStoreCompanySid, companyStoreCompanyName, companyStoreSid, companyStoreName }) {
      let i = -1;
      this.deleteTemp.forEach((item, index) => {
        // 동일항목 클릭시 빼버림
        if (item.companyStoreCompanySid == companyStoreCompanySid && item.companyStoreSid == companyStoreSid) {
          i = index;
        }
      });

      if (i > -1) {
        this.deleteTemp.splice(i, 1);
      } else {
        this.deleteTemp = [
          ...this.deleteTemp,
          {
            companyStoreCompanySid,
            companyStoreCompanyName,
            companyStoreSid,
            companyStoreName,
          },
        ];
      }
    },

    // 선택삭제
    deleteItems() {
      let del = [];
      this.selectedItems.forEach((item, i) => {
        this.deleteTemp.forEach(sub => {
          if (item.companyStoreCompanySid == sub.companyStoreCompanySid && item.companyStoreSid == sub.companyStoreSid) {
            del = [...del, i];
          }
        });
      });

      // 인덱스가 큰 것 부터 삭제
      if (del.length > 0) {
        del.reverse().forEach(i => {
          this.selectedItems.splice(parseInt(i), 1);
        });
      }

      // 초기화
      this.deleteTemp = [];
      this.removeActive("select-list");
    },

    // remove active class
    removeActive(className) {
      document.querySelector(`.select-tbl-multi.${className} tr`).classList.remove("active");
    },
  },
};
</script>

<style lang="scss" scoped>
.lef {
  text-align: left !important;
}
.header {
  display: flex;
  justify-content: space-between;
  & .btn-group {
    & button {
      margin-left: 5px;
    }
  }
}

.store-name {
  & .input-first {
    width: calc(100% - 55px) !important;
  }
  & button {
    margin-left: 5px;
  }
}

.bottom {
  width: 100% !important;
  padding: 10px;
  & .left {
    width: calc(50% - 20px);
    padding-top: 8px;
    & .table-container {
      width: 100%;
      overflow-x: auto;
    }
    & table {
      width: auto;
      text-align: center;
    }
    & .non-list {
      width: 100% !important;
      text-align: center;
    }
    & .store-list {
      width: auto;
    }
  }

  & .middle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    & .add-item {
      cursor: pointer;
    }
  }

  & .right {
    text-align: left !important;
    width: calc(50% - 20px);
    & table {
      text-align: center;
    }
  }
}
</style>
