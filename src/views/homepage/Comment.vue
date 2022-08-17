<template>
  <div>
    <div class="header mt50">
      <h2>코멘트</h2>
      <div class="btn-group">
        <v-btn small color="primary">등록</v-btn>
        <v-btn small color="warning">수정</v-btn>
        <v-btn small color="error">삭제</v-btn>
        <v-btn small>clear</v-btn>
      </div>
    </div>
    <div class="mt10">
      <textarea v-model="systemCommentDocument"></textarea>
    </div>
    <div>
      <v-btn small :class="systemCommentKind == commentCode ? 'selectedBg' : ''">회원에게 코멘트 </v-btn>

      <v-btn small class="ml20" :class="systemCommentKind == memoCode ? 'selectedBg' : ''">메모 </v-btn>
    </div>
    <table class="tbl-reg column2">
      <colgroup>
        <col width="100" />
        <col width="*" />
        <col width="100" />
        <col width="*" />
        <col width="100" />
        <col width="100" />
        <col width="100" />
      </colgroup>
      <tr>
        <td>
          <div>견적 파일</div>
        </td>
        <td colspan="6">
          <div class="file-add add">
            <div class="file-wrap">
              <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
              <ul class="thumbnail mt10">
                <li v-for="(item, index) in systemCommentFiles" :key="index">
                  <div class="thubmnail-type">
                    <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                    <div v-if="message === false" @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })">
                      <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                    </div>
                  </div>
                </li>
                <div v-if="message === true" class="mt5">첨부된 파일이 없습니다.</div>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="comment-div mt30">
      <ul class="comment-ul">
        <li
          class="comment-li"
          :class="item.systemCommentKind == memoCode || item.systemCommentKind == commentCode ? '' : 'txtRight'"
          v-for="(item, index) in comment"
          :key="index"
          @click="selectComment(item.systemCommentSid)"
        >
          <div class="comment-header">
            {{ item.systemCommentWriteName }}
            ({{ item.systemCommentDateTime }}) ({{ item.systemCommentKindName }})
          </div>
          <div class="comment-body">
            {{ item.systemCommentDocument }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deleteMixin from "@/mixins/delete.js";
import fileupload from "@/mixins/fileUpload.js";
import FileUpload from "@/components/form/FileUpload.vue";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import fileUploadMixin from "@/mixins/fileUpload";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    FileUpload,
  },
  mixins: [fileUploadMixin, deleteMixin, fileupload, loading],
  props: ["comment"],
  data() {
    return {
      // comment
      systemCommentSid: "",
      systemCommentDbName: "estimateMaster",
      systemCommentDateTime: "",
      systemCommentDbPkey: "",
      systemCommentDocument: "",
      systemCommentKind: "",
      systemCommentKindName: "",
      systemCommentType: "",
      systemCommentWriteName: "",
      systemCommentFiles: [],
      message: true,

      // 코멘트 종류
      commentCode: "SYS21B05B002",
      memoCode: "SYS21B05B003",
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("common", ["getCommentDetail", "commentAdd", "commentUpdate", "commentDelete"]),
  },
  watch: {
    comment() {
      this.clear();
    },
  },
  methods: {
    //코멘트 클릭 시
    async selectComment(commentSid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/COMMENT_DETAIL", commentSid);

        const commentData = this.getCommentDetail.channeltuneApiResult.comment.result;
        this.systemCommentSid = commentData.systemCommentSid;
        this.systemCommentDbName = commentData.systemCommentDbName;
        this.systemCommentDateTime = commentData.systemCommentDateTime;
        this.systemCommentDbPkey = commentData.systemCommentDbPkey;
        this.systemCommentDocument = commentData.systemCommentDocument;
        this.systemCommentKind = commentData.systemCommentKind;
        this.systemCommentKindName = commentData.systemCommentKindName;
        this.systemCommentType = commentData.systemCommentType;
        this.systemCommentWriteName = commentData.systemCommentWriteName;

        commentData.files.forEach(row => {
          if (row.fileSid !== "") {
            this.systemCommentFiles.push({ url: row.fileSid, name: row.fileFileName, fileExt: row.fileExt });
          }
        });
        if (this.systemCommentFiles[0] === undefined) {
          this.message = true;
        } else {
          this.message = false;
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //이미지 썸네일 보기
    thumbnailModal(data) {
      const file = this.systemCommentFiles;
      this.$modal.show(thumbnailModal, { updateData: this.selectComment, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    clear() {
      this.systemCommentSid = "";
      this.systemCommentDbName = "estimateMaster";
      this.systemCommentDateTime = "";
      this.systemCommentDbPkey = "";
      this.systemCommentDocument = "";
      this.systemCommentKind = "";
      this.systemCommentKindName = "";
      this.systemCommentType = "";
      this.systemCommentWriteName = "";
      this.systemCommentFiles = [];
      this.message = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 300px;
}
.date-width {
  width: 100px;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}

.selectedBg {
  background: #c4c4c4 !important;
}

.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 60% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(40% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }

  & .btn-group {
    display: flex;
    justify-content: space-between;
    & button {
      margin-left: 5px;
    }
    & .file_container {
      display: flex;
    }
  }

  & .comment-div {
    max-height: 250px;
    overflow-y: scroll;
    border: 1px solid#ccc;
    & .comment-ul {
      margin-top: 20px;
      padding: 5px;
      & .comment-li {
        margin-top: 10px;
        cursor: pointer;
        & .comment-header {
          font-size: 12px;
          color: #696464;
        }

        & .comment-body {
          padding: 7px;
          background: #f0eeee;
          border: 1px solid #bdbdbd;
          box-sizing: border-box;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 14px;
          word-break: break-all;
        }
      }

      & .txtRight {
        text-align: right !important;
      }
    }
  }
}
</style>
