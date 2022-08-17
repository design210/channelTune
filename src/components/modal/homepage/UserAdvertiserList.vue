<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>광고주 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header right">
            <div class="search">
              <input type="text" placeholder="회원아이디, 이름, 회사명" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              테이블
            </caption>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>회원고유코드</th>
                <th>회원아이디</th>
                <th>회원명</th>
                <th>광고주명</th>
                <th>광고주업체명</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="advertiserDetail({ userAdvertiserSid: item.userAdvertiserSid, userAdvertiserCompanyCeo: item.userAdvertiserCompanyCeo })"
              >
                <td>{{ item.userAdvertiserSid }}</td>
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepageUserEmail }}</td>
                <td>{{ item.homepageUserName }}</td>
                <td>{{ item.userAdvertiserCompanyCeo }}</td>
                <td>{{ item.userAdvertiserCompanyName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">광고주 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>

          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { alim, modalWrap },
  mixins: [alimMixin, loading],
  // 이 타입은 스트링으로 한 페이지에 동일한 CompanyList를 띄우는 경우 사용;
  props: ["type"],
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
    ...mapGetters("ad", ["getAdvertiserList"]),
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
    advertiserDetail(data) {
      if (this.type != "" && this.type) {
        this.$attrs.update({ ...data, type: this.type });
      } else {
        this.$attrs.update(data);
      }
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
        await this.$store.dispatch("ad/GET_ADVERTISER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        const advertiserList = this.getAdvertiserList.channeltuneApiResult;
        if (advertiserList.errorCode === 200) {
          this.list = advertiserList.userAdvertiser.data;
          this.len = advertiserList.userAdvertiser.last_page;
        } else {
          this.alim(advertiserList.errorMessage, this.errorColor);
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
