<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header">
        <h2>PDF 보기</h2>
        <div class="btn-group">
          <v-btn @click="changePdfPage(0)" class="turn" :class="{ grey: currentPage == 1 }">
            <span>이전</span>
          </v-btn>
          <span class="page">{{ currentPage }} / {{ pageCount }}</span>
          <v-btn @click="changePdfPage(1)" class="turn" :class="{ grey: currentPage == pageCount }">
            <span>다음</span>
          </v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <div class="wrap">
          <div class="pdf-wrap">
            <pdf
              :src="pdfUrl"
              ref="pdfComponent"
              :page="currentPage"
              @num-pages="pageCount = $event"
              @page-loaded="currentPage = $event"
              @loaded="loadPdfHandler"
            ></pdf>
          </div>
          <div class="btn-group mt10">
            <v-btn small color="error mr5" @click="confirmPdf" v-if="this.status !== 'SYS21819B005'">삭제</v-btn>
            <v-btn small color="primary mr5" @click="fileDownload({ id: data.id, fileExt: data.fileExt, name: data.name })">다운로드</v-btn>
            <v-btn small color="success mr5" @click="$refs.pdfComponent.print()">프린트</v-btn>
          </div>
          <!-- 사진파일 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
          <!-- 알럿 -->
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
import confirm from "@/components/dialog/Confirm.vue";
import alim from "@/components/dialog/Alim.vue";
import pdf from "vue-pdf";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    confirm,
    alim,
    pdf,
  },
  mixins: [fileUploadMixin, alimMixin, deleteMixin, loading],
  props: ["data", "status"],
  data() {
    return {
      //컨펌 데이터
      pdfUrl: "",
      currentPage: 0,
      pageCount: 0,
      name: "",
      ext: "",
    };
  },
  mounted() {
    this.pdfUrl = `${process.env.VUE_APP_API}/file/fileView/${this.data.id}`;
  },
  methods: {
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf loading time
    loadPdfHandler() {
      this.currentPage = 1;
    },
    close() {
      this.$emit("close");
      this.$attrs.updateData();
    },
    //파일 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "pdf") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.data.id);
            this.alim("삭제 되었습니다.", this.successColor);
            this.close();
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  & .pdf-wrap {
    max-height: 615px;
    overflow-y: auto;
    text-align: center;
    & img {
      max-width: 100%;
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  & .btn-group {
    margin-right: 50px;
    & button {
      height: 26px;
      min-width: 58px;
    }
    & .page {
      padding: 0 20px;
    }
  }
}

.btn-group {
  text-align: center;
  justify-content: center;
}
@media (max-width: 800px) {
  .wrap {
    & .img-wrap {
      max-height: 300px;
    }
  }
}
</style>
