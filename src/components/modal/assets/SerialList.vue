<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>제품 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header">
            <div class="search">
              <pull-down
                :data="defaultStatus == '' ? null : defaultStatus"
                :code="inspectionCode"
                class="pull-down"
                @selected="inspectionSelected"
                :customLabel="'제품검수상태'"
                :includeTotalElem="true"
              ></pull-down>
              <input type="text" placeholder="시리얼 번호" v-model="searchText" class="search-input" @keyup.enter="reload(1, false)" />
              <v-btn small color="primary" dark @click="reload(1, false)" class="btn-search2">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              상품 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="120" />
              <col width="*" />
              <col width="100" />
              <col width="120" />
              <col width="200" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>제품유닛코드</th>
                <th>고유코드</th>
                <th>제품명</th>
                <th>제품생산고유코드</th>
                <th>LOT번호</th>
                <th>Serial번호</th>
                <th>최종검수상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="productionSelect({ productSid: item.productSid, productName: item.productName, productionTransSid: item.productionTransSid })"
              >
                <td>{{ item.productionTransSid }}</td>
                <td>{{ item.productSid }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productionSid }}</td>
                <td>{{ item.productionLotNumbr }}</td>
                <td>{{ item.productionTransSerialNo }}</td>
                <td>{{ item.productionTransStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="7">제품 리스트가 없습니다.</td>
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
import PullDown from "@/components/form/PullDown.vue";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, PullDown, alim },
  mixins: [loading, alimMixin],
  props: ["productSid"],
  data() {
    return {
      //게시물 설정
      size: 15,
      page: 1,
      searchText: "",
      len: null,
      list: [],

      inspectionCode: "SYS21910B012",
      productionTransStatus: "",

      // 출고검수완료 sysCodeSid
      completeCode: "SYS21910B015",
      defaultStatus: "",
    };
  },
  computed: {
    ...mapGetters("assetProduct", ["getProductionSerial"]),
  },
  watch: {
    page() {
      this.reload(0, false);
    },
  },
  mounted() {
    // 테스트용 커밋2
    this.reload(1, true);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    productionSelect(data) {
      this.$attrs.update(data);
      this.$emit("close");
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num, isFirst = false) {
      let searchOption = {
        size: this.size,
        page: this.page,
        searchText: this.searchText,
        productSid: "",
        productionTransStatus: this.productionTransStatus,
      };

      if (this.productSid !== "" && isFirst == true) {
        this.defaultStatus = "출고 검수 완료";
        searchOption.productSid = this.productSid;
        searchOption.productionTransStatus = this.completeCode;
      }

      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTION_SERIAL", searchOption);
        if (this.getProductionSerial.channeltuneApiResult.errorCode == 200) {
          const response = this.getProductionSerial.channeltuneApiResult.production;
          this.list = response.data;
          this.len = response.last_page;
        } else {
          this.alim(this.getProductionSerial.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    inspectionSelected(data) {
      this.productionTransStatus = data.sysCodeSid;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  .search {
    display: flex;
    align-items: center;
    justify-content: right;

    & input {
      margin-left: 10px;
    }
  }
}

.align {
  justify-content: center;
}
td {
  cursor: pointer;
}
</style>
