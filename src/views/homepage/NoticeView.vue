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
              공지사항 읽기 테이블
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>작성일</td>
                <td>{{ createdAt }}</td>
                <td>수정일</td>
                <td>{{ updatedAt }}</td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>{{ boardNoticeCreateName }}</td>
                <td>상단공지</td>
                <td v-if="modify === false">{{ boardNoticeTopFlag }}</td>
                <td v-else>
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
                <td colspan="3" v-if="modify === false">{{ boardNoticeTitle }}</td>
                <td colspan="3" v-else><input type="text" v-model="boardNoticeTitle" /></td>
              </tr>
              <tr class="ql-snow">
                <td>내용</td>
                <td colspan="3" v-if="modify === false" v-html="boardNoticeContent" class="ql-editor"></td>
                <td colspan="3" v-else><quill-editor ref="myTextEditor" v-model="boardNoticeContent" :options="options"> </quill-editor></td>
              </tr>
              <tr>
                <td>첨부파일</td>
                <td colspan="3">
                  <div class="download-wrap">
                    <div class="file-wrap" v-if="modify === true">
                      <file-upload
                        :deleteAll="deleteAllFiles"
                        @uploadFiles="uploadFiles"
                        :fileType="'image/*, .pdf, .doc, .hwp, .ppt, .xls, .docx, .pptx, .xlsx'"
                      ></file-upload>
                    </div>
                    <div class="download" v-for="(item, index) in file" :key="index">
                      <span @click="fileDownload({ id: item.url, fileExt: item.fileExt, name: item.name })"
                        ><v-icon>mdi-content-save</v-icon> {{ item.name }}
                      </span>
                      <v-icon @click="confirmFile(item.url)" v-if="modify === true">mdi-close-circle</v-icon>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20" v-if="modify === false">
        <v-btn small color="warning" @click="modifyset" class="btn-search">수정</v-btn>
        <v-btn small color="error" @click="confirm" class="btn-search">삭제</v-btn>
        <v-btn small @click="linkList" class="btn-search">목록</v-btn>
      </section>

      <section class="btn-group mt20" v-else>
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="cancel" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </section>
</template>

<script>
import loading from "@/mixins/loading";
import FileUpload from "@/components/form/FileUpload.vue";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import { getAdminUserNameCookie } from "@/utils/cookie";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import ImageResize from "quill-image-resize-module-plus";
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, quillEditor, FileUpload },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  data() {
    return {
      createdAt: "",
      updatedAt: "",
      boardNoticeCreateName: "",
      boardNoticeTopFlag: "",
      boardNoticeTitle: "",
      boardNoticeContent: "",
      boardNoticeSid: "",
      modify: false,
      boardNoticeGroupNo: "",
      boardNoticeGroupSort: "",
      boardNoticeGroupDepth: "",
      file: [],
      channeltuneFiles: [],
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
    ...mapGetters("common", ["getNoticeDetail", "noticeModifyResult", "noticeDelResult"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  async mounted() {
    this.reload();
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/notice/list");
    },
    modifyset() {
      this.modify = true;
    },
    async reload() {
      const id = this.$route.params.id;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/NOTICE_DETAIL", id);
        const res = this.getNoticeDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const detail = res.boardNotice;
        this.createdAt = detail.created_at;
        this.updatedAt = detail.updated_at;
        this.boardNoticeCreateName = detail.boardNoticeCreateName;
        this.boardNoticeTopFlag = detail.boardNoticeTopFlag;
        this.boardNoticeTitle = detail.boardNoticeTitle;
        this.boardNoticeContent = detail.boardNoticeContent;
        this.boardNoticeSid = detail.boardNoticeSid;
        this.boardNoticeGroupNo = detail.boardNoticeGroupNo;
        this.boardNoticeGroupSort = detail.boardNoticeGroupSort;
        this.boardNoticeGroupDepth = detail.boardNoticeGroupDepth;
        //img url
        this.file = [];
        detail.fileResult.forEach(row => {
          if (row.fileSid !== "") {
            this.file.push({ url: row.fileSid, name: row.fileFileName, fileExt: row.fileExt });
          }
        });
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async save() {
      if (this.boardNoticeTitle == "") {
        this.alim("제목을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardNoticeContent == "") {
        this.alim("내용을 입력해주세요.", this.errorColor);
        return false;
      }

      try {
        bus.$emit("start:spinner");
        const name = getAdminUserNameCookie();
        await this.$store.dispatch("common/NOTICE_MODIFY", {
          boardNoticeSid: this.boardNoticeSid,
          boardNoticeTopFlag: this.boardNoticeTopFlag,
          boardNoticeTitle: this.boardNoticeTitle,
          boardNoticeContent: this.boardNoticeContent,
          boardNoticeCreateName: name,
          boardNoticeGroupNo: this.boardNoticeGroupNo,
          boardNoticeGroupSort: this.boardNoticeGroupNo,
          boardNoticeGroupDepth: this.boardNoticeGroupSort,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.noticeModifyResult.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(this.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.reload();
        this.alim("수정 되었습니다.", this.successColor);
        this.modify = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    cancel() {
      this.modify = false;
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/NOTICE_DEL", this.boardNoticeSid);
            const res = this.noticeDelResult.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            await this.$router.push("/homepage/board/notice/list");
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }

        if (data.type === "file") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            const res = this.fileDeleteResult.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            this.alim("삭제 되었습니다.", this.successColor);
            await this.reload();
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
.btn-group {
  text-align: center;
  & button {
    margin: 0 2px;
  }
}
.download-wrap {
  display: flex;
  flex-direction: column;
  & .download {
    cursor: pointer;
    margin-bottom: 3px;
    &:hover {
      color: rgb(73, 126, 196);
    }
  }
}
</style>
