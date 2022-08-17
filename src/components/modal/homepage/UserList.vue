<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>회원 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header right">
            <div class="search">
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              테이블
            </caption>
            <colgroup>
              <col width="80" />
              <col width="120" />
              <col width="*" />
              <col width="120" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>회원코드</th>
                <th>이름</th>
                <th class="left">이메일</th>
                <th>회원가입 종류</th>
                <th>회원가입 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="
                  userDetail({
                    homepageUserSid: item.homepageUserSid,
                    homepageUserName: item.homepageUserName,
                    homepageUserEmail: item.homepageUserEmail,
                  })
                "
              >
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepageUserName }}</td>
                <td class="left">{{ item.homepageUserEmail }}</td>
                <td>{{ item.homepageUserKindName }}</td>
                <td>{{ item.homePageUserStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="5">회원 리스트가 없습니다.</td>
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
import resMixin from "@/mixins/response";
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
  mixins: [resMixin, loading, alimMixin],
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
    ...mapGetters("user", ["getUserList"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },

  methods: {
    close() {
      this.$emit("close");
    },
    userDetail(data) {
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
        const res = await this.__getResponse("user/GET_USER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (res.errorCode !== 200) {
          console.log(res.errorMessage);
          return;
        }
        this.list = res.homepageUserMaster.data;
        this.len = res.homepageUserMaster.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }

      // if (this.getUserList.channeltuneApiResult.errorCode == 200) {
      // 	const userList = this.getUserList.channeltuneApiResult.homepageUserMaster;
      // 	this.list = userList.data;
      // 	this.len = userList.last_page;
      // } else {
      // 	this.alim(this.getUserList.channeltuneApiResult.errorMessage, this.errorColor);
      // }
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
