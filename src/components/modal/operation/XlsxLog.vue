<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>xlsx 로그 등록</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time column2">
            <colgroup>
              <col width="70" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>엑셀 파일</td>
                <td class="file-add point">
                  <file-upload-single :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'.xls, .xlsx'"></file-upload-single>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="info-box">
            <p>엑셀 자료 등록시 중복등록되는 내용은 최종 xlsx시트의 자료로 변경됩니다.</p>
            <p>등록 취소를 선택하면 엑셀파일에 있는 해당 날자,시간의 모든 데이터가 지워집니다.</p>
          </div>
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
import alim from "@/components/dialog/Alim.vue";
import FileUploadSingle from "@/components/form/FileUploadSingle.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
export default {
  components: {
    modalWrap,
    alim,
    FileUploadSingle,
  },
  mixins: [loading, fileUploadMixin, alimMixin],
  data() {
    return {
      channeltuneFiles: "",
      //컨펌 데이터
      dialog: false,
      dialogTitle: "",
      dialogText: "",
      type: "",
      page: 1,
    };
  },
  computed: {
    ...mapGetters("companyStore", ["strafficFileUploadResult"]),
  },
  methods: {
    validate(status) {
      if (this.channeltuneFiles.length === 0) {
        this.alim("파일을 선택해주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
    },
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/TRAFFIC_FILE_UPLOAD", { channeltuneFiles: this.channeltuneFiles });
        if (this.strafficFileUploadResult.channeltuneApiResult.errorCode == 200) {
          this.closeModal = true;
          this.alim("파일이 등록되었습니다.", this.successColor);
        } else {
          this.alim(this.strafficFileUploadResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      this.$emit("close");
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
          width: 120px;
        }
        & .input-last {
          width: 350px;
          margin: 0 5px;
        }
      }
      & .code {
        width: 120px !important;
      }
    }
  }
}
.point {
  cursor: pointer;
}
</style>
