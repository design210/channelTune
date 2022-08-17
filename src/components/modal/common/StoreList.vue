<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>스토어 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header right">
            <div class="search">
              <input type="text" placeholder="스토어를 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search2">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              스토어 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="*" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="sort pd">업체명</th>
                <th class="sort pd">스토어명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="selectStore({ id: item.companyStoreSid, name: item.companyStoreName })">
                <td>{{ item.companyStoreSid }}</td>
                <td class="sort pd">{{ item.companyStoreCompanyName }}</td>
                <td class="sort pd">{{ item.companyStoreName }}</td>
                <td>{{ item.companyStoreStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">스토어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    alim,
  },
  mixins: [loading, alimMixin],
  data() {
    return {
      //게시물 설정
      size: 15,
      page: 1,
      searchText: "",
      len: null,
      list: [],
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getCompanyStoreList"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
  },
  mounted() {
    document.querySelector(".search-input").focus();
    this.reload(0);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    selectStore(data) {
      this.$attrs.update(data);
      this.$emit("close");
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getCompanyStoreList.channeltuneApiResult.errorCode == 200) {
          const companyList = this.getCompanyStoreList.channeltuneApiResult.companyStore;
          this.list = companyList.data;
          this.len = companyList.last_page;
        } else {
          this.alim(this.getCompanyStoreList.channeltuneApiResult.errorMessage, this.errorColor);
        }
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
.align {
  justify-content: center;
}

.user-list-tbl {
  & th {
    padding: 0 10px;
  }
  & td {
    cursor: pointer;
  }
  & .sort {
    text-align: left;
  }
}
</style>
