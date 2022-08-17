<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="adform-header v-application">
        <h1>정산 공지 상세 ({{ settlementNoticeTransKindName }})</h1>
        <div class="btn-group" style="margin-right: 30px; display: flex">
          <v-btn small color="primary" v-if="settlementNoticeTransKind === 'SYS22516B002'">오픈수정</v-btn>
          <v-btn small color="primary" v-else @click="reSend">재발송</v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <section class="table-section v-application">
        <div>
          <table width="100%" class="tbl-reg column2 mt0">
            <colgroup>
              <col width="130" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>정산공지 발행 고유 코드</td>
              <td class="field-div">
                <input type="text" readonly v-model="settlementNoticeTransSid" />
              </td>
              <td>정산공지 발행 상태</td>
              <td>
                <input type="text" readonly v-model="settlementNoticeTransStatusName" />
              </td>
            </tr>
            <tr>
              <td>정산 공지 고유코드</td>
              <td colspan="3" class="field2">
                <input type="text" readonly v-model="settlementNoticeSid" />
                <input type="text" readonly v-model="settlementNoticeTitle" />
              </td>
            </tr>
            <tr>
              <td>정산 공지 업체</td>
              <td colspan="3" class="field2">
                <input type="text" readonly v-model="companySid" />
                <input type="text" readonly v-model="companyName" />
              </td>
            </tr>
            <tr>
              <td>정산 공지 업체 담당자</td>
              <td colspan="3" class="field3">
                <input type="text" readonly v-model="companyPersonSid" />
                <input type="text" readonly v-model="companyPersonName" />
                <v-btn small color="warning" @click="modify">정보 수정</v-btn>
              </td>
            </tr>
            <tr>
              <td>핸드폰번호</td>
              <td class="field-div">
                <input type="text" readonly v-model="settlementNoticeTransHp" />
              </td>
              <td>이메일</td>
              <td>
                <input type="text" readonly v-model="settlementNoticeTransEmailAddress" />
              </td>
            </tr>
            <tr>
              <td>발송횟수</td>
              <td class="field-div">
                <input type="text" readonly v-model="settlementNoticeTransCount" />
              </td>
              <td>발송일시</td>
              <td>
                <input type="text" readonly v-model="settlementNoticeTransCheckDateTime" />
              </td>
            </tr>
          </table>
          <div v-if="settlementNoticeTransStatement !== '' && settlementNoticeTransKind === 'SYS22516B004'" class="dual mt5">
            <div class="html sms" v-html="settlementNoticeTransSendDoc"></div>
            <div class="html mail" v-html="settlementNoticeTransStatement"></div>
          </div>
          <div v-if="settlementNoticeTransStatement !== '' && settlementNoticeTransKind !== 'SYS22516B004'" class="mt5">
            <div class="html" v-html="settlementNoticeTransStatement"></div>
          </div>
        </div>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import { mapGetters } from "vuex";

export default {
  components: { alim, modalWrap },
  mixins: [loading, alimMixin],
  props: ["id"],
  data() {
    return {
      settlementNoticeTransSid: "",
      settlementNoticeSid: "",
      companySid: "",
      settlementNoticeTransKind: "",
      companyPersonSid: "",
      settlementNoticeTransCount: null,
      settlementNoticeTransCheckFlag: "",
      settlementNoticeTransCheckDateTime: "",
      settlementNoticeTransStatement: "",
      settlementNoticeTransHp: "",
      settlementNoticeTransEmailAddress: "",
      settlementNoticeTransSendDoc: "",
      settlementNoticeTransStatus: "",
      companyName: "",
      companyPersonName: "",
      settlementNoticeTransKindName: "",
      settlementNoticeTransStatusName: "",
      settlementNoticeTitle: "",
      updateState: false,
    };
  },
  computed: {
    ...mapGetters("settlementNotice", ["getSettlementNoticeTranceDetail", "companyPersonUpdate", "sendMail", "sendSms"]),
  },
  mounted() {
    this.reload();
  },
  methods: {
    close() {
      this.$attrs.update(this.updateState);
      this.$emit("close");
    },
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_NOTICE_TRANCE", this.id);
        const res = this.getSettlementNoticeTranceDetail.channeltuneApiResult;
        if (res.errorCode === 200) {
          const data = res.settlementNotice;
          this.settlementNoticeTransSid = data.settlementNoticeTransSid;
          this.settlementNoticeSid = data.settlementNoticeSid;
          this.companySid = data.companySid;
          this.companyPersonSid = data.companyPersonSid;
          this.settlementNoticeTransCount = data.settlementNoticeTransCount;
          this.settlementNoticeTransCheckFlag = data.settlementNoticeTransCheckFlag;
          this.settlementNoticeTransCheckDateTime = data.settlementNoticeTransCheckDateTime;
          this.settlementNoticeTransStatement = data.settlementNoticeTransStatement;
          this.settlementNoticeTransHp = data.settlementNoticeTransHp;
          this.settlementNoticeTransEmailAddress = data.settlementNoticeTransEmailAddress;
          if (data.settlementNoticeTransSendDoc !== null) {
            this.settlementNoticeTransSendDoc = data.settlementNoticeTransSendDoc.replace(/(\n|\r\n)/g, "<br/>");
          } else {
            this.settlementNoticeTransSendDoc = "내역이 없습니다";
          }
          this.settlementNoticeTransStatus = data.settlementNoticeTransStatus;
          this.companyName = data.companyName;
          this.companyPersonName = data.companyPersonName;
          this.settlementNoticeTransKindName = data.settlementNoticeTransKindName;
          this.settlementNoticeTransKind = data.settlementNoticeTransKind;
          this.settlementNoticeTransStatusName = data.settlementNoticeTransStatusName;
          this.settlementNoticeTitle = data.settlementNoticeTitle;
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/COMPANY_PERSON_UPDATE", this.settlementNoticeTransSid);
        const res = this.companyPersonUpdate.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.alim("정산 공지 업체 담당자 정보가 수정됬습니다.", this.successColor);
          this.updateState = true;
          await this.reload();
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //메일 발송
    async reSend() {
      if (this.settlementNoticeTransKind === "SYS22516B003") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementNotice/SEND_MAIL", {
            settlementNoticeSid: this.settlementNoticeSid,
            sid: this.settlementNoticeTransSid,
          });
          if (this.sendMail.channeltuneApiResult.errorCode === 200) {
            this.alim("메일이 발송 되었습니다.", this.successColor);
            this.updateState = true;
            await this.reload();
          } else {
            this.alim(this.sendMail.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      } else if (this.settlementNoticeTransKind === "SYS22516B004") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementNotice/SEND_SMS", {
            settlementNoticeSid: this.settlementNoticeSid,
            sid: this.settlementNoticeTransSid,
          });
          if (this.sendSms.channeltuneApiResult.errorCode === 200) {
            this.alim("문자가 발송 되었습니다.", this.successColor);
            this.updateState = true;
          } else {
            this.alim(this.sendSms.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.adform-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  & button {
    margin-left: 5px;
  }
}
.field2 {
  & input {
    &:nth-child(1) {
      width: 150px !important;
    }
    &:nth-child(2) {
      width: calc(100% - 155px) !important;
      margin-left: 5px;
    }
  }
}
.field3 {
  & input {
    &:nth-child(1) {
      width: 150px !important;
    }
    &:nth-child(2) {
      width: calc(100% - 234px) !important;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}
.html {
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}
.dual {
  display: flex;
  & .sms {
    width: 320px;
    margin-right: 5px;
  }
  & .mail {
  }
}
</style>
