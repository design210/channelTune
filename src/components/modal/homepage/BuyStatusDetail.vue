<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>판매로그 상세</h2>
    </template>
    <template slot="body">
      <table class="tbl-reg column2 mt10">
        <colgroup>
          <col width="110" />
          <col width="*" />
          <col width="110" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>고유코드</td>
            <td colspan="3"><input type="text" readonly :value="buyStatusLog.buySid" class="w190" /></td>
          </tr>
          <tr>
            <td>판매 상태</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogStatusName" /></td>
            <td>이전 판매상태</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogBeforStatusName" /></td>
          </tr>
          <tr>
            <td>요청 일시</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogStartDateTime" /></td>
            <td>완료 일시</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogEndDateTime" /></td>
          </tr>
          <tr>
            <td>결제/환불/취소금액</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogPrice" /></td>
            <td>이전 결제/환불/취소 금액</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogBeforPrice" /></td>
          </tr>
          <tr>
            <td>입금기한</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogDepositLimit" /></td>
            <td>이전 입금 기한</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogBeforDepositLimit" /></td>
          </tr>
          <tr>
            <td>입금할 계좌정보</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogDepositBank" /></td>
            <td>이전 입금할 계좌 정보</td>
            <td><input type="text" readonly :value="buyStatusLog.buyStatusLogBeforDepositBank" /></td>
          </tr>
          <tr>
            <td>기타<br />(환불 계좌번호등...)</td>
            <td colspan="3">
              <textarea readonly :value="buyStatusLog.buyStatusLogEtc"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 알럿 -->
      <div class="v-application"><alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim></div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    modalWrap,
    alim,
  },
  mixins: [alimMixin, loading],
  props: ["id"],
  data() {
    return {
      buyStatusLog: {},
    };
  },
  computed: {
    ...mapGetters("sales", ["setSalesInfoDetail"]),
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("sales/SALES_INFO_DETAIL", this.id);
      const res = this.setSalesInfoDetail.channeltuneApiResult;
      if (res.errorCode === 200) {
        this.buyStatusLog = res.buyStatusLog;
        this.buyStatusLog.buyStatusLogStartDateTime = this.$date(res.buyStatusLog.buyStatusLogStartDateTime).local().format("YYYY-MM-DD HH:mm:ss");
        this.buyStatusLog.buyStatusLogEndDateTime = this.$date(res.buyStatusLog.buyStatusLogEndDateTime).local().format("YYYY-MM-DD HH:mm:ss");
        this.buyStatusLog.buyStatusLogDepositLimit = this.$date(res.buyStatusLog.buyStatusLogDepositLimit).local().format("YYYY-MM-DD HH:mm:ss");
        this.buyStatusLog.buyStatusLogBeforDepositLimit = this.$date(res.buyStatusLog.buyStatusLogBeforDepositLimit)
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
        res.buyStatusLog.buyStatusLogBeforPrice !== undefined
          ? (this.buyStatusLog.buyStatusLogBeforPrice = res.buyStatusLog.buyStatusLogBeforPrice.toLocaleString())
          : 0;
        res.buyStatusLog.buyStatusLogPrice !== undefined
          ? (this.buyStatusLog.buyStatusLogPrice = res.buyStatusLog.buyStatusLogPrice.toLocaleString())
          : 0;
      } else {
        this.alim(res.errorMessage, this.errorColor);
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
