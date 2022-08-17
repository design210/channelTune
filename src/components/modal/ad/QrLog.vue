<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>캠페인 QR Log</h1>
    </template>
    <template slot="body">
      <div class="flx section-box v-application">
        <div class="fux">
          <span>전체&nbsp;:&nbsp; </span><span>{{ eventQrHitCount }}건</span>
        </div>
        <div class="fux">
          <span class="mr10">시작날짜</span> <date-picker :current="today" :clear="clearDate" @updateDate="startDay" class="date"></date-picker>
        </div>
        <div class="fux">
          <span class="mr10">종료날짜</span> <date-picker :current="today" :clear="clearDate" @updateDate="endDay" class="date"></date-picker>
          <v-btn small color="primary" class="ml10" @click="getQrLog">조회</v-btn>
        </div>
      </div>
      <section class="ad-manage mt20 v-application">
        <section class="ad-list section-box border-outside">
          <table class="tbl mt10 user-list-tbl select-tbl">
            <thead>
              <th>접속일시</th>
              <th>접속 아이피</th>
            </thead>
          </table>
          <div class="tbl select-tbl scrolled">
            <table>
              <tbody>
                <tr v-for="(item, idx) in leftList" :key="idx">
                  <td>{{ item.evnetQrLogDateTime }}</td>
                  <td>{{ item.evnetQrLogIp }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="leftList.length < 1">
                  <td colspan="2">접속 로그가 없습니다</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <section class="ad-list-right section-box border-outside">
          <table class="tbl mt10 user-list-tbl select-tbl">
            <thead>
              <th>접속 날짜</th>
              <th>접속 건수</th>
            </thead>
          </table>
          <div class="tbl select-tbl scrolled">
            <table>
              <tbody>
                <tr v-for="(item, idx) in rightList" :key="idx">
                  <td>{{ item.eventQrLogDate }}</td>
                  <td>{{ item.cnt }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="rightList.length < 1">
                  <td colspan="2">접속 기록이 없습니다</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </section>
      <alim class="" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import alim from "@/components/dialog/Alim.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { modalWrap, DatePicker, alim },
  mixins: [alimMixin, deleteMixin, loading],
  props: ["eventQrSid"],
  data() {
    return {
      today: "",
      clearDate: false,
      start: "",
      end: "",
      leftList: [],
      rightList: [],
      eventQrHitCount: 0,
    };
  },
  computed: { ...mapGetters("qr", ["QrEventLog"]) },
  mounted() {
    this.getQrLog();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    startDay(date) {
      this.start = date;
    },
    endDay(date) {
      this.end = date;
    },
    async getQrLog() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("qr/QR_EVENT_LOG", {
          startDate: this.start,
          ednDate: this.start,
          eventQrSid: this.eventQrSid,
        });
        const res = this.QrEventLog.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.leftList = res.qrLog.eventQrLog1;
        this.rightList = res.qrLog.eventQrLog2;
        this.eventQrHitCount = res.qrLog.eventQr.eventQrHitCount;
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
.scrolled {
  width: 100%;
  height: 500px;
  overflow-y: auto;
}
.ad-manage {
  display: flex;
  justify-content: space-between;
}
.ad-list {
  width: 48% !important;
  & .border {
    min-height: 370px;
  }
}

.ad-list-right {
  width: calc(100% - 49%);
}
.flx {
  display: flex;
  justify-content: space-between;
}
.fux {
  display: flex;
  align-items: center;
}
</style>
