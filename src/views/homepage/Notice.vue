<template>
  <section class="container">
    <div class="title-wrap">
      <h1>공지사항</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="search-wrap">
            <div class="search">
              <input type="text" placeholder="제목을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload" />
              <v-btn small color="primary" dark class="btn-search" @click="reload">조회</v-btn>
              <v-btn small color="success" dark @click="write">글쓰기</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl">
            <caption>
              공지사항 리스트 테이블
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
                @click="detail(item.boardNoticeSid)"
                :class="{ 'notice-top': item.boardNoticeTopFlag === 'Y' }"
              >
                <td>{{ item.boardNoticeSid }}</td>
                <td class="left subject"><v-icon v-if="item.boardNoticeTopFlag === 'Y'">mdi-pin</v-icon>{{ item.boardNoticeTitle }}</td>
                <td>{{ item.boardNoticeCreateName }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.updated_at }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="5">게시물이 없습니다.</td>
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
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
export default {
  components: { alim },
  mixins: [loading, alimMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
    };
  },
  computed: {
    ...mapGetters("common", ["getNoticeList"]),
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
        await this.$store.dispatch("common/NOTICE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        const res = this.getNoticeList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        const data = res.boardNotice;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    detail(id) {
      this.$router.push(`/homepage/board/notice/view/${id}`);
    },
    write() {
      this.$router.push("/homepage/board/notice/write");
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
