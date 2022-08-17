<template>
  <section class="container">
    <div class="title-wrap">
      <h1>보도자료</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="search-wrap">
            <v-btn small color="success" @click="$router.push('/homepage/board/news/write')">글쓰기</v-btn>
          </div>
          <table class="tbl mt20 select-tbl">
            <caption>
              리스트 테이블
            </caption>
            <colgroup>
              <col width="60" />
              <col width="*" />
              <col width="180" />
              <col width="180" />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th class="left">제목</th>
                <th>작성일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="$router.push(`/homepage/board/news/view/${item.boardNewsSid}`)"
                :class="{ 'notice-top': item.boardNewsTopFlag === 'Y' }"
              >
                <td>{{ item.boardNewsSid }}</td>
                <td class="left subject"><v-icon v-if="item.boardNewsTopFlag === 'Y'">mdi-pin</v-icon>{{ item.boardNewsTitle }}</td>
                <td>{{ __getLocalTime(item.created_at) }}</td>
                <td>{{ __getLocalTime(item.updated_at) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">FAQ가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>

      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </section>
  </section>
</template>

<script>
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
import responseMixin from "@/mixins/response";
import utcTimeMixin from "@/mixins/utcTime";
export default {
  components: { alim },
  mixins: [loading, alimMixin, responseMixin, utcTimeMixin],
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
        const res = await this.__getResponse("common/GET_NEWS", {
          size: this.size,
          page: this.page,
        });

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorMessage);
          return false;
        }

        this.list = res.boardNews.data;
        this.len = res.boardNews.last_page;
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
