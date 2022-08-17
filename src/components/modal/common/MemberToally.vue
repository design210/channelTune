<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>ADDTUNE 월별 집계</h2>
    </template>
    <template slot="body">
      <div class="v-application flux">
        <div class="flux statistics">
          <span class="mr10">회원가입 : {{ register }}</span>
          <span class="mr10">회원휴먼 : {{ sleeper }}</span>
          <span class="mr10">회원탈퇴 : {{ secession }}</span>
        </div>
        <div class="search-group">
          <span class="mr10">년도</span>
          <div class="year"><v-select :items="year" v-model="searchYear" outlined class="select-basic"></v-select></div>
          <span class="ml10 mr10">월</span>
          <div class="month"><v-select :items="month" v-model="searchMonth" outlined class="select-basic"></v-select></div>
          <v-btn small dark class="ml10 mr10" @click="setMonth">당월</v-btn>
          <v-btn small color="primary" @click="getDatas" dark>조회</v-btn>
        </div>
      </div>
      <div class="mt20 border">
        <div class="border">
          <table width="100%" class="tbl tbl-reg user-list-tbl column2 tabled">
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <thead>
              <th>날짜</th>
              <th>회원가입</th>
              <th class="left">회원휴면</th>
              <th class="left">회원탈퇴</th>
            </thead>
          </table>
          <table width="100%" class="mt5 tbl-reg user-list-tbl tbl column2" id="scrolled">
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <tbody>
              <tr class="point" v-for="(item, idx) in list" :key="idx">
                <td>{{ item.buyDate }}</td>
                <td>{{ item.trueUser + item.passUser + item.authUser }}</td>
                <td>{{ item.dormancyUser }}</td>
                <td>{{ item.withdrawalUser }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="list.length < 1">
                <td colspan="4">리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- 알럿 -->
        <alim class="v-application" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { year } from "@/utils/yearSet";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
export default {
  components: {
    modalWrap,
    alim,
  },
  mixins: [loading, alimMixin],
  data() {
    return {
      year: [],
      month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      searchYear: "",
      searchMonth: "",
      register: 0,
      sleeper: 0,
      secession: 0,
      list: [],
    };
  },
  computed: {
    ...mapGetters("menu", ["getNumOfMonthRegister"]),
  },
  mounted() {
    const yearset = year();
    this.year = yearset;
    this.setMonth();
    this.getDatas();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setMonth() {
      let today = new Date();
      let year = new Date().getFullYear();
      let month = today.getMonth() + 1;
      let monthString = month.toString();
      if (monthString < 10) {
        monthString = "0" + monthString;
      }
      this.searchYear = year;
      this.searchMonth = monthString;
    },
    async getDatas() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/GET_NUMBER_OF_REGISTER", {
          year: this.searchYear,
          month: this.searchMonth,
        });
        const res = this.getNumOfMonthRegister.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.list = res.dashboard;
          this.register = res.dashboard.reduce((pre, cur) => {
            return pre + Number(cur.trueUser) + Number(cur.authUser) + Number(cur.passUser);
          }, 0);

          this.sleeper = res.dashboard.reduce((pre, cur) => {
            return pre + Number(cur.dormancyUser);
          }, 0);
          this.secession = res.dashboard.reduce((pre, cur) => {
            return pre + Number(cur.withdrawalUser);
          }, 0);
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
.flux {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
.statistics {
  width: 350px;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
#scrolled {
  margin-top: 0 !important;
  padding-top: 5px;
  overflow-y: auto;
}
</style>
