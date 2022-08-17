<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>Language Data Type View</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="getLanguageDataTypeView">조회</v-btn>
          <v-btn small color="success" @click="copy">전체복사</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />

              <col width="70" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td class="right pr10 required">언어 구분</td>
                <td><pull-down code="SYS22617B005" :data="languageKind" class="pull-down" @selected="languageKindProp" /></td>
                <td class="right pr10 required">사이트 구분 / TableName</td>
                <td><pull-down code="SYS22705B001" :data="languageSiteKind" class="pull-down" @selected="siteProp" /></td>
                <td class="right pr10 required">Version</td>
                <td>
                  <pull-down :data="languageVersion" code="SYS22617B014" @selected="versionProp" class="pull-down" />
                </td>
              </tr>
              <tr>
                <td class="right pr10 required">언어 DataType</td>
                <td>
                  <pull-down code="SYS22705B021" :data="languageDataType" @selected="dataTypeProp" class="pull-down" />
                </td>
                <td class="right pr10 required">디바이스명 / TableCode</td>
                <td><pull-down code="SYS22705B005" :data="languageDeviceKind" class="pull-down" @selected="languageDeviceKindProp" /></td>

                <td class="right pr10 required">언어 선택</td>
                <td>
                  <pull-down code="SYS22617B016" :data="languageDocumentCode" @selected="languageProp" class="pull-down" />
                </td>
              </tr>
            </tbody>
          </table>

          <!-- <span v-html="language"></span> -->
          <textarea class="box" readonly>{{ language }}</textarea>
        </section>
        <!-- 알럿 -->
        <alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import PullDown from "@/components/form/PullDown.vue";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    PullDown,
    alim,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: {},
  data() {
    return {
      languageKind: "",
      languageSiteKind: "",
      languageSiteKindName: "",
      languageSiteKindNameFlag: true,
      languageVersion: "",
      languageDataType: "",
      languageDeviceKind: "",
      languageDocumentCode: "",
      language: "",
    };
  },
  computed: {
    ...mapGetters("languageSet", ["getLanguageDataType"]),
  },

  mounted() {
    this.languageKind = "SYS22617B002";
    this.languageSiteKind = "SYS22705B002";
    this.languageDataType = "SYS22705B022";
    this.languageDocumentCode = "SYS22617B017";
  },
  methods: {
    close() {
      this.$emit("close");
    },
    copy() {
      if (this.language === "") {
        return this.alim("조회를 먼저 해주세요!", this.errorColor);
      }
      this.$copyText(this.language);
      this.alim("복사가 완료되었습니다.", this.successColor);
    },
    async getLanguageDataTypeView() {
      if (this.languageKind === "") {
        return this.alim("언어 구분을 선택해 주세요", this.errorColor);
      }
      if (this.languageSiteKind === "") {
        return this.alim("사이트 구분을 선택해 주세요", this.errorColor);
      }
      if (this.languageVersion === "") {
        return this.alim("버전을 선택해 주세요", this.errorColor);
      }
      if (this.languageDeviceKind === "") {
        return this.alim("디바이스를 선택해 주세요", this.errorColor);
      }
      if (this.languageDocumentCode === "") {
        return this.alim("언어를 선택해 주세요", this.errorColor);
      }
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/GET_LANGUAGE_DATA_TYPE", {
        languageKind: this.languageKind,
        languageSiteKind: this.languageSiteKind,
        languageDeviceKind: this.languageDeviceKind,
        languageVersion: this.languageVersion,
        languageDocumentCode: this.languageDocumentCode,
        languageDataType: this.languageDataType,
      });
      const res = this.getLanguageDataType.channeltuneApiResult;
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      const text = res.language.replaceAll("\n", "\\n");
      this.language = text.replaceAll("</br>", "\r\n");
      bus.$emit("end:spinner");
    },
    clear() {
      this.languageDocumentSid = "";
      this.languageDocumentCode = "";
      this.languageDocument = "";
    },
    siteProp(data) {
      this.languageSiteKind = data.sysCodeSid;
    },
    versionProp(data) {
      this.languageVersion = data.sysCodeSid;
    },
    dataTypeProp(data) {
      this.languageDataType = data.sysCodeSid;
    },
    languageProp(data) {
      this.languageDocumentCode = data.sysCodeSid;
    },
    languageKindProp(data) {
      this.languageKind = data.sysCodeSid;
    },
    languageDeviceKindProp(data) {
      this.languageDeviceKind = data.sysCodeSid;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  justify-content: space-between;
  & .init-wrap {
    overflow-y: auto;
    max-height: 800px;
  }
  & .btn-group {
    margin-right: 30px;
    & button {
      margin: 0 3px;
    }
  }
}
.tbl-reg {
  & tr {
    & td {
      &.store {
        & .input-first {
          width: 100px;
        }
        & .input-last {
          width: 300px;
          margin: 0 5px;
        }
      }
    }
  }
}
.tbl-time {
  border: 1px solid #ccc;
  & tr {
    & td {
      text-align: center;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      padding: 5px 0 5px 0 !important;
      &:first-child {
        border-left: 0;
      }
      & > div {
        height: 23px !important;
        width: 23px !important;
        margin: 0 auto !important;
      }
    }
    &:first-child {
      & td {
        border-top: 0;
      }
    }
  }
}
.user-list-tbl {
  border-bottom: 1px solid #000;
  & th {
    padding-bottom: 5px;
  }
}
.box {
  margin-top: 10px;
  border: 1px solid #ccc;
  width: 840px;
  height: 280px;
  resize: none;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
