<template>
  <section class="container">
    <div class="title-wrap">
      <h1>공지사항</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <table class="read-tbl">
            <caption>
              공지사항 쓰기 테이블
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>상단공지</td>
                <td colspan="3">
                  <div class="radio">
                    <v-radio-group v-model="boardNoticeTopFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td colspan="3"><pull-down :clear="clearField" :code="statusCode" @selected="status" class="pull-down w110"></pull-down></td>
              </tr>
              <tr>
                <td>카테고리</td>
                <td colspan="3"><input type="text" v-model="boardNoticeTitle" /></td>
              </tr>
              <tr class="ql-snow">
                <td>내용</td>
                <td colspan="3"><quill-editor ref="myTextEditor" v-model="boardNoticeContent" :options="options"> </quill-editor></td>
              </tr>
              <tr>
                <td>파일 첨부</td>
                <td colspan="3">
                  <div class="file-wrap">
                    <file-upload
                      :deleteAll="deleteAllFiles"
                      @uploadFiles="uploadFiles"
                      :fileType="'image/*, .pdf, .doc, .hwp, .ppt, .xls, .docx, .pptx, .xlsx'"
                    ></file-upload>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20">
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="linkList" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import { getAdminUserNameCookie } from "@/utils/cookie";
import FileUpload from "@/components/form/FileUpload.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import ImageResize from "quill-image-resize-module-plus";
import { ImageDrop } from "quill-image-drop-module";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim, quillEditor, FileUpload },
  mixins: [fileUploadMixin, alimMixin, loading],
  data() {
    return {
      boardNoticeTopFlag: "N",
      boardNoticeTitle: "",
      boardNoticeContent: "",
      boardNoticeGroupNo: "",
      boardNoticeGroupSort: "",
      boardNoticeGroupDepth: "",
      channeltuneFiles: [],
      file: [],
      options: {
        theme: "snow",
        placeholder: "내용을 입력해 주세요.",
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
        imageDrop: true,
        modules: {
          toolbar: [
            // [{ size: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike"],
            //['blockquote', 'code-block'],
            [{ direction: "rtl" }, { align: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            //['clean'],
          ],
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          imageDrop: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters("common", ["getNoticeDetail", "noticeWriteResult"]),
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/notice/list");
    },
    async save() {
      if (this.boardNoticeTitle === "") {
        this.alim("제목을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardNoticeContent === "") {
        this.alim("내용을 입력해주세요.", this.errorColor);
        return false;
      }
      const name = getAdminUserNameCookie();
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/NOTICE_WRITE", {
          boardNoticeTopFlag: this.boardNoticeTopFlag,
          boardNoticeTitle: this.boardNoticeTitle,
          boardNoticeContent: this.boardNoticeContent,
          boardNoticeCreateName: name,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.noticeWriteResult.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim("등록 되었습니다.", this.successColor);
        this.linkList();
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
.btn-group {
  text-align: center;
  & button {
    margin: 0 2px;
  }
}
</style>
