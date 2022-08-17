<template>
  <section class="container">
    <div class="title-wrap">
      <h1>FAQ</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="search-wrap">
            <pull-down-multi
              :clear="clear"
              :data="boardCategorySids"
              :code="code"
              @selected="boardCategoryProp"
              class="pull-down multi"
            ></pull-down-multi>
            <v-btn small color="primary" class="btn-search ml5 mr5" @click="reload">조회</v-btn>
            <v-btn small color="success" @click="write">글쓰기</v-btn>
            <v-btn small @click="reset" class="ml5">CLEAR</v-btn>
          </div>
          <table class="tbl mt20 select-tbl">
            <caption>
              리스트 테이블
            </caption>
            <colgroup>
              <col width="60" />
              <col width="*" />
              <col width="150" />
              <col width="180" />
              <col width="180" />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th class="left">제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="detail(item.boardFaqSid)"
                :class="{ 'notice-top': item.boardFaqTopFlag === 'Y' }"
              >
                <td>{{ item.boardFaqSid }}</td>
                <td class="left subject"><v-icon v-if="item.boardFaqTopFlag === 'Y'">mdi-pin</v-icon>{{ item.boardFaqTitle }}</td>
                <td>{{ item.boardFaqCreateName }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.updated_at }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="5">FAQ가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30" v-if="list.length > 0">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>

      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PullDownMulti from "@/components/form/PullDownMulti.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
export default {
  components: { PullDownMulti, alim },
  mixins: [loading, alimMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      len: null,
      list: [],
      code: "SYS21A13B002",
      boardCategoryName: [],
      boardCategorySids: "",
      clear: false,
    };
  },
  computed: {
    ...mapGetters("common", ["getFaqList"]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload();
    },
  },
  mounted() {
    this.reload();
  },
  //데이터 불러오기
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/FAQ_LIST", {
          size: this.size,
          page: this.page,
          boardCategorySids: this.boardCategorySids,
        });
        const res = this.getFaqList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.boardFaq;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    detail(id) {
      this.$router.push(`/homepage/board/faq/view/${id}`);
    },
    write() {
      this.$router.push("/homepage/board/faq/write");
    },
    boardCategoryProp(data) {
      const selectSids = [];
      const selectNames = [];
      data.forEach(ele => {
        selectSids.push(ele.sysCodeSid);
        selectNames.push(ele.sysCodeName);
      });
      this.boardCategorySids = selectSids.join(",");
      this.boardCategoryName = selectNames;
    },
    reset() {
      this.clear = !this.clear;
      this.boardCategorySids = "";
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.select-tbl {
  & td {
    cursor: pointer;
  }
}
.search-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & .pull-down {
    width: 150px;
  }
}
.notice-top {
  & td {
    background: #dddcdc;
    &.subject {
      font-weight: 700;
    }
    & .v-icon {
      font-size: 1.3rem;
    }
  }
  &:hover {
    & td {
      background: #dddcdc !important;
    }
  }
}
</style>
