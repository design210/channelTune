<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>코멘트</h2>
    </template>
    <template slot="body">
      <div class="comment_container">
        <div class="comment-div mt30 pb20">
          <ul class="comment-ul" id="chatList" onscroll>
            <li
              :class="item.systemCommentKind == memoCode || item.systemCommentKind == commentCode ? 'mytxt' : 'comment-li'"
              v-for="(item, index) in list"
              :key="index"
              :id="index"
            >
              <div class="date" v-show="item.PrintDate">{{ item.date }}</div>
              <div class="comment-header">
                {{ item.systemCommentWriteName }}
                ({{ item.systemCommentKindName }})
              </div>
              <p v-if="item.files.length > 0">
                <img
                  :src="`${url}/file/fileView/${item.files[0].fileSid}`"
                  alt=""
                  class="files"
                  @click="imgModal({ id: item.files[0].fileSid, fileExt: item.files[0].fileExt, name: item.files[0].fileFileName })"
                />
              </p>
              <div class="comment-body" v-show="item.systemCommentDocument !== '\u2008'">
                {{ item.systemCommentDocument }}
              </div>

              <div class="time" v-show="item.PrintTime">{{ item.hourTime }}</div>
            </li>
            <li v-if="comment.length === 0" class="none_comment">코멘트가 없습니다.</li>
          </ul>
        </div>
      </div>
      <!-- 알럿 -->
      <div class="v-application"><alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim></div>
    </template>
    <template slot="footer">
      <div class="v-application">
        <div class="per100">
          <div class="mt10">
            <textarea v-model="systemCommentDocument"></textarea>
          </div>
          <file-upload-single
            :deleteAll="deleteAllFiles"
            @uploadFiles="uploadFiles"
            :fileType="'image/*,'"
            placeholder="첨부파일을 추가 해 주세요."
          ></file-upload-single>
          <img :src="imageUrl" />
          <div class="btn_container mt5">
            <div>
              <v-btn-toggle mandatory v-model="systemCommentKind">
                <v-btn small color="success" class="white--text" :value="commentCode">회원에게 코멘트 </v-btn>
                <v-btn small :value="memoCode" color="warning" class="ml5">메모</v-btn>
              </v-btn-toggle>
            </div>
            <v-btn color="primary" small @click="addComment">남기기</v-btn>
          </div>
        </div>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import timeSet from "@/utils/ampm";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import imgModal from "@/components/modal/common/ImageSingle";
import fileupload from "@/mixins/fileUpload.js";
import { dayJsWeek } from "@/utils/dayOfWeek";
import FileUploadSingle from "@/components/form/FileUploadSingle.vue";
import deleteMixin from "@/mixins/delete.js";
import fileUploadMixin from "@/mixins/fileUpload";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    FileUploadSingle,
    alim,
  },
  mixins: [fileUploadMixin, fileupload, alimMixin, deleteMixin],
  props: { comment: Array, estimateSid: String },
  data() {
    return {
      file: [],
      channeltuneFiles: [],
      list: [],

      // comment
      systemCommentSid: "",
      systemCommentDbName: "estimateMaster",
      systemCommentDateTime: "",
      systemCommentDocument: "",
      systemCommentKind: "SYS21B05B002",
      systemCommentKindName: "",
      systemCommentType: "",
      systemCommentWriteName: "",
      systemCommentFiles: [],
      imageUrl: "",

      // 코멘트 종류
      commentCode: "SYS21B05B002",
      memoCode: "SYS21B05B003",

      bottom_flag: true,
      pre_diffHeight: 0,
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("common", ["commentAdd", "commentUpdate", "commentDelete"]),
    getTime: function () {
      return this.comment.map(item => {
        return item.systemCommentDateTime.substr(11, 5);
      });
    },
  },

  mounted() {
    this.getComment(this.comment);
  },

  updated() {
    var objDiv = document.getElementById("chatList");
    if (this.bottom_flag) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    //comment 값 가공
    getComment(arrayData) {
      bus.$emit("start:spinner");
      this.list = arrayData.map((item, index, arr) => {
        item.systemCommentDateTime = this.$date(item.systemCommentDateTime).utc().local().format();
        item.dayOfWeek = dayJsWeek(this.$date(item.systemCommentDateTime).format("dd"));
        item.date = this.getKoreaDate(item.systemCommentDateTime) + item.dayOfWeek;

        //index 값이 0이라면 날짜 값 무조건 출력
        if (index === 0) {
          item.PrintDate = true;
        } else if (item.date !== arr[index - 1].date) {
          //두 날짜를 비교했을 때 다르면 true
          item.PrintDate = true;
        } else {
          item.PrintDate = false;
        }
        if (arr[index + 1] !== undefined) {
          item.hourTime = this.getMinuteTime(item.systemCommentDateTime);

          if (item.systemCommentDateTime.substr(11, 5) === arr[index + 1].systemCommentDateTime.substr(11, 5)) {
            item.PrintTime = false;
          } else {
            item.PrintTime = true;
          }
        } else {
          item.hourTime = this.getMinuteTime(item.systemCommentDateTime);
          item.PrintTime = true;
        }
        return item;
      });
      bus.$emit("end:spinner");
    },
    //날짜 yyyy년 mm월 dd일로 변환
    getKoreaDate(day) {
      let result = day.substr(0, 4) + "년 " + day.substr(5, 2) + "월 " + day.substr(8, 2) + "일 ";
      return result;
    },
    //시간 값 가공
    getMinuteTime(day) {
      let hour = this.$date(day).format("HH");
      let change = timeSet(hour);
      let minute = this.$date(day).format("mm");
      let data = change + ":" + minute;

      return data;
    },
    //이미지 모달
    imgModal(data) {
      this.$modal.show(imgModal, { data }, getPopupOpt("imgModal", "1000px", "auto", false));
    },
    //코멘트 등록
    async addComment() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/COMMENT_ADD", {
          systemCommentDocument: this.systemCommentDocument,
          systemCommentDbPkey: this.estimateSid,
          systemCommentKind: this.systemCommentKind,
          systemCommentDbName: "estimateMaster",
          systemCommentWriteName: "애드튠 운영팀",
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.commentAdd.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.alim(res.errorMessage, this.successColor);
          this.getComment(res.comment);
          this.clear();
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    //데이터 전송 후 모든 데이터 초기화
    clear() {
      this.deleteAllChip();
      this.systemCommentSid = "";
      this.systemCommentDbName = "estimateMaster";
      this.systemCommentDateTime = "";
      this.systemCommentDocument = "";
      this.systemCommentKind = "SYS21B05B002";
      this.systemCommentKindName = "";
      this.systemCommentType = "";
      this.systemCommentWriteName = "";
      this.file = [];
      this.imageUrl = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.comment_container {
  overflow-y: auto;
  max-height: 600px;
}

.comment-div {
  overflow-y: scroll;
  & .comment-ul {
    margin-top: 10px;
    padding: 5px;
    & .none_comment {
      text-align: center;
      @include NotoSans(1.5, 500, #000);
    }
    & .comment-li {
      margin-top: 10px;
      cursor: pointer;

      min-width: 30%;
      max-width: 60%;
      float: left;
      clear: both;
      & .comment-header {
        font-size: 12px;
        color: #696464;
      }
      & .date {
        margin-right: calc(-20vw);
        text-align: center;
        @include NotoSans(1.5, 700, #000);
        margin-bottom: 30px;
        margin-top: 30px;
      }

      & .comment-body {
        padding: 15px;
        margin: 3px 0;
        min-height: 50px;
        @include NotoSans(1.3, 500, #fff);
        background: #aacbee;
        box-sizing: border-box;
        border-radius: 5px;
        word-break: break-all;
      }
    }

    & .mytxt {
      margin-top: 10px;
      min-width: 30%;
      max-width: 60%;
      float: right;
      clear: both;
      width: auto;
      & .comment-header {
        font-size: 12px;
        color: #696464;
      }
      & .date {
        margin-left: calc(-20vw);
        text-align: center;
        @include NotoSans(1.5, 700, #000);
        margin-bottom: 30px;
        margin-top: 30px;
      }

      & .comment-body {
        padding: 15px;
        margin: 3px 0;
        min-height: 50px;
        @include NotoSans(1.3, 500, #181818);
        background: #f1f1f1;
        box-sizing: border-box;
        border-radius: 5px;
        word-break: break-all;
      }
    }

    & .txtRight {
      text-align: right;
      max-width: 60%;
      height: auto;
      clear: both;
    }
  }
}
.files {
  cursor: pointer;
  width: 100%;
  height: 150px;
  margin: 10px 0;
  border: 0.5px solid#e2e2e2;
  padding: 5px;
  border-radius: 8px;
}
.btn_container {
  display: flex;
  justify-content: space-between;
}
.time {
  color: #dbdbdb;
}
</style>
