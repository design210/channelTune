<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>제품 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header right">
            <div class="search">
              <input type="text" placeholder="제품명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search2">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              상품 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="120" />
              <col width="*" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>제품구분</th>
                <th>제품명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="
                  productSelect({
                    productSid: item.productSid,
                    productKindName: item.productKindName,
                    productName: item.productName,
                  })
                "
              >
                <td>{{ item.productSid }}</td>
                <td>{{ item.productKindName }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">제품 리스트가 없습니다.</td>
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
    ...mapGetters("assetProduct", ["getProductList"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
  },
  async mounted() {
    this.reload(0);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    productSelect(data) {
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
        await this.$store.dispatch("assetProduct/PRODUCT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getProductList.channeltuneApiResult.errorCode == 200) {
          const productList = this.getProductList.channeltuneApiResult.product;
          this.list = productList.data;
          this.len = productList.last_page;
        } else {
          this.alim(this.getProductList.channeltuneApiResult.errorMessage, this.errorColor);
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
td {
  cursor: pointer;
}
</style>
