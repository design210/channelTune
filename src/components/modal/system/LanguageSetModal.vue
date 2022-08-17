<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>항목</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="addLanguage">등록</v-btn>
          <v-btn small color="warning" @click="updateLanguage">수정</v-btn>
          <v-btn small color="error" @click="deleteList">삭제</v-btn>
          <v-btn small @click="clear">clear</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time">
            <colgroup>
              <col width="100" />
              <col width="140" />
              <col width="100" />
              <col width="*" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td class="right pr10">언어 고유코드</td>
                <td><input type="text" ref="codeRef" readonly v-model="propSid" /></td>
                <td class="required right pr10">언어내용코드</td>
                <td colspan="2">
                  <input type="text" v-model="languageDocumentSid" readonly />
                </td>
              </tr>
              <tr>
                <td class="right pr10">언어 구분</td>
                <td>
                  <pull-down
                    code="SYS22617B005"
                    :data="languageKind"
                    class="pull-down"
                    @selected="languageKindProp"
                    :readOnly="storeLanguageSetFlag"
                  />
                </td>
                <td class="right pr10">사이트 구분 / TableName</td>
                <td>
                  <pull-down
                    code="SYS22705B001"
                    :data="languageSiteKind"
                    class="pull-down w220"
                    @selected="siteProp"
                    :readOnly="storeLanguageSetFlag"
                  />
                </td>
                <td><input type="text" v-model="languageTableName" :readonly="languageTableNameReadOnly" /></td>
              </tr>
              <tr>
                <td class="right pr10 required">카테고리</td>
                <td>
                  <pull-down
                    code="SYS22617B006"
                    :data="languageCategory"
                    @selected="categoryProp"
                    class="pull-down"
                    :readOnly="storeLanguageSetFlag"
                  />
                </td>
                <td class="right pr10">디바이스명 / TableCode</td>
                <td>
                  <pull-down
                    code="SYS22705B005"
                    :data="languageDeviceKind"
                    class="pull-down w220"
                    @selected="languageDeviceKindProp"
                    :readOnly="storeLanguageSetFlag"
                  />
                </td>
                <td>
                  <input type="text" v-model="languageTableSid" :readonly="languageTableSidReadOnly" />
                </td>
              </tr>
              <tr>
                <td class="right pr10">언어 선택</td>
                <td>
                  <pull-down code="SYS22617B016" :data="languageDocumentCode" @selected="languageProp" class="pull-down" />
                </td>
                <td class="right pr10">Version</td>
                <td colspan="2">
                  <pull-down :data="languageVersion" code="SYS22617B014" @selected="versionProp" class="pull-down" />
                </td>
              </tr>
              <tr>
                <td class="right pr10">언어 변수명</td>
                <td colspan="4"><input type="text" v-model="languageCodeName" /></td>
              </tr>
              <tr>
                <td class="right pr10">내용</td>
                <td colspan="4"><textarea v-model="languageDocument" /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <table width="100%" class="tbl-reg user-list-tbl column2 tabled">
              <colgroup>
                <col width="80" />
                <col width="80" />
                <col width="*" />
              </colgroup>
              <thead>
                <th>코드</th>
                <th>언어</th>
                <th class="left pl5">내용</th>
              </thead>
            </table>
            <table width="100%" class="tbl-reg select-tbl user-list-tbl tbl column2" id="scrolled">
              <colgroup>
                <col width="80" />
                <col width="80" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr class="point" v-for="(item, idx) in list" :key="idx" @click="selectList(item)">
                  <td>{{ item.languageDocumentSid }}</td>
                  <td style="padding-right: 0 !important">{{ item.languageDocumentCodeName }}</td>
                  <td class="left">{{ item.languageDocument }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="list.length < 1">
                  <td colspan="3">리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <!-- 알럿 -->
        <alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
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
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,

    PullDown,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: {
    languageSid: {
      type: Number,
      default: -1,
    },
    storeLanguageSetFlag: {
      type: Boolean,
      default: false,
    },
    flagType: {
      type: String,
      default: "",
    },
    tableSid: {
      type: String,
      default: "",
    },
    fieldName: {
      type: String,
      default: "",
    },
    languageKindSysCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      list: [],
      languageSiteKind: "",
      languageTableName: "",
      languageTableNameFlag: true,
      languageTableSidFlag: true,
      languageTableSid: "",
      languageDeviceKind: "",
      languageTableCode: "",
      languageVersion: "",
      languageCategory: "",
      languageCodeName: "",
      languageKind: "",
      languageDocumentCode: "",
      languageDocumentSid: "",
      languageDocument: "",
      propSid: "",
      len: 0,
    };
  },
  computed: {
    ...mapGetters("languageSet", ["getLanguageDetail", "addLanguageSet", "updateLanguageSet", "deleteLanguageDetail", "getLanguageSetList"]),
    languageTableNameReadOnly() {
      return this.languageTableNameFlag || this.storeLanguageSetFlag;
    },
    languageTableSidReadOnly() {
      return this.languageTableSidFlag || this.storeLanguageSetFlag;
    },
  },
  watch: {
    languageSiteKind(val) {
      if (val !== "") {
        this.languageTableNameFlag = false;
      } else {
        this.languageTableNameFlag = true;
      }
    },
    languageDeviceKind(val) {
      if (val !== "") {
        this.languageTableSidFlag = false;
      } else {
        this.languageTableSidFlag = true;
      }
    },
  },

  async mounted() {
    if (this.languageSid !== -1) {
      await this.getDetail(this.languageSid);
      this.propSid = this.languageSid;
    }
    if (this.flagType !== "") {
      this.languageCategory = "SYS22617B012";
      this.languageSiteKind = "SYS22705B004";
      this.languageDeviceKind = "SYS22705B009";
      this.languageTableSid = this.tableSid;
      this.languageTableName = this.flagType;
      this.languageCodeName = this.fieldName;
      this.returnFlagType();

      const sid = await this.getListDetail();
      if (sid !== -1) {
        this.propSid = sid;
        this.getDetail(sid);
      }
    }
  },
  methods: {
    async getListDetail() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/GET_LANGUAGE_SET_LIST", {
        languageKind: this.languageKind,
        languageSiteKind: this.languageSiteKind,
        languageTableName: this.languageTableName,
        languageDocumentCode: this.languageDocumentCode,
        languageDeviceKind: this.languageDeviceKind,
        languageTableSid: this.languageTableSid,
        languageCategory: this.languageCategory,
        languageCodeName: this.fieldName,
      });
      const res = this.getLanguageSetList.channeltuneApiResult;
      console.log(res);

      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
      return res.language.length !== 0 ? res.language[0].languageSid : -1;
    },
    close() {
      if (this.flagType === "") {
        this.$attrs.update();
      }
      this.$emit("close");
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          // try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("languageSet/DELETE_LANGUAGE_SET", {
            id: this.languageSid,
            documentSid: this.languageDocumentSid, //미정
          });
          const res = this.deleteLanguageDetail.channeltuneApiResult;

          if (res.errorCode !== 200) {
            bus.$emit("end:spinner");
            return this.alim(res.errorMessage, this.errorColor);
          }
          this.alim(res.errorMessage, this.successColor);
          if (this.len - 1 > 0) {
            await this.getDetail(this.languageSid);
          } else {
            setTimeout(() => {
              this.close();
            }, 2000);
          }

          bus.$emit("end:spinner");
        }
      }
    },
    deleteList() {
      if (this.languageDocumentSid === "" || this.languageDocumentSid === null) {
        return this.alim("언어 리스트를 선택해주세요", this.errorColor);
      }
      this.confirm();
    },
    async getDetail(id) {
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/GET_LANGUAGE_DETAIL", id);
      const res = this.getLanguageDetail.channeltuneApiResult;
      if (res.errorCode === 200) {
        this.languageDeviceKind = res.language.languageDeviceKind;
        this.languageTableCode = res.language.languageTableCode;
        this.languageVersion = res.language.languageVersion;
        this.languageCategory = res.language.languageCategory;
        this.languageCodeName = res.language.languageCodeName;
        this.languageSiteKind = res.language.languageSiteKind;
        this.languageDocumentCode = res.language.languageDocumentCode;
        this.list = res.language.languageDocument;
        this.languageTableName = res.language.languageTableName;
        this.languageTableSid = res.language.languageTableSid;
        this.propSid = res.language.languageSid;
        this.languageKind = res.language.languageKind;

        this.len = this.list.length;
      }
      bus.$emit("end:spinner");
    },
    async addLanguage() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/ADD_LANGUAGE_SET", {
        languageSiteKind: this.languageSiteKind,
        languageKind: this.languageKind,
        languageDeviceKind: this.languageDeviceKind,
        languageTableName: this.languageTableName,
        languageTableSid: this.languageTableSid,
        languageVersion: this.languageVersion,
        languageCategory: this.languageCategory,
        languageCodeName: this.languageCodeName,
        languageDocumentCode: this.languageDocumentCode,
        languageDocument: this.languageDocument,
      });
      const res = this.addLanguageSet.channeltuneApiResult;
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.getDetail(res.language.language.languageSid);
      this.alim(res.errorMessage, this.successColor);

      bus.$emit("end:spinner");
    },
    async updateLanguage() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("languageSet/UPDATE_LANGUAGE_SET", {
        languageSiteKind: this.languageSiteKind,
        languageKind: this.languageKind,
        languageDeviceKind: this.languageDeviceKind,
        languageTableName: this.languageTableName,
        languageTableSid: this.languageTableSid,
        languageVersion: this.languageVersion,
        languageCategory: this.languageCategory,
        languageCodeName: this.languageCodeName,
        languageDocumentCode: this.languageDocumentCode,
        languageDocument: this.languageDocument,
        id: this.languageSid,
        documentSid: this.languageDocumentSid,
      });
      const res = this.updateLanguageSet.channeltuneApiResult;

      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.getDetail(res.language.language.languageSid);
      this.alim(res.errorMessage, this.successColor);
      bus.$emit("end:spinner");
    },
    siteProp(data) {
      this.languageSiteKind = data.sysCodeSid;
    },
    versionProp(data) {
      this.languageVersion = data.sysCodeSid;
    },
    categoryProp(data) {
      this.languageCategory = data.sysCodeSid;
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
    selectList(item) {
      this.languageDocumentSid = item.languageDocumentSid;
      this.languageDocumentCode = item.languageDocumentCode;
      this.languageDocument = item.languageDocument;
    },
    clear() {
      this.languageDocumentSid = "";
      this.languageDocumentCode = "";
      this.languageDocument = "";
      this.languageTableName = "";
      this.languageDeviceKindName = "";
      this.languageSiteKind = "";
      this.languageDeviceKind = "";
      this.languageKind = "";
      this.languageCategory = "";
      this.languageCodeName = "";
      this.languageDocument = "";
      this.languageVersion = "";
    },
    returnFlagType() {
      switch (this.languageKindSysCode) {
        case "device":
          this.languageKind = "SYS22617B005";
          break;
        case "db":
          this.languageKind = "SYS22617B003";
          break;
        case "syscode":
          this.languageKind = "SYS22617B004";
          break;
        default:
          this.languageKind = "SYS22617B003";
          break;
      }
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
#scrolled {
  margin-top: 0 !important;
  padding-top: 5px;
  overflow-y: auto;
}
.point {
  cursor: pointer;
}
</style>
