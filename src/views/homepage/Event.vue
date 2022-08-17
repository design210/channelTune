<template>
  <section class="container">
    <div class="title-wrap">
      <h1>이벤트 등록</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>이벤트 리스트</h2>
            <div class="search">
              <input type="text" placeholder="이벤트명을 입력하세요" v-model="searchText" class="search-input input-size" @keyup.enter="reload(1)" />
              <v-btn small color="primary" @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              이벤트 테이블
            </caption>
            <colgroup>
              <col width="70" />
              <col width="120" />
              <col width="120" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>이벤트 시작</th>
                <th>이벤트 종료</th>
                <th>이벤트명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="eventDetail(item.boardEventSid)">
                <td>{{ item.boardEventSid }}</td>
                <td>{{ item.boardEventStartDateTime }}</td>
                <td>{{ item.boardEventEndDateTime }}</td>
                <td>{{ item.boardEventTitle }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">이벤트 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>항목</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" @click="confirm(boardEventSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <div class="set-left">
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="80" />
                  <col width="*" />
                  <col width="80" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" readonly v-model="boardEventSid" /></td>
                  <td colspan="2">
                    <div class="radio">
                      <v-radio-group v-model="boardEventStatus">
                        <v-radio label="노출" value="V"></v-radio>
                        <v-radio label="미노출" value="C"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>이벤트 제목</td>
                  <td colspan="3" class="with-btn">
                    <input type="text" class="id" v-model="boardEventTitle" />
                    <v-btn small color="#D0A9F5" dark @click="showLanguageSetModalPopup(-1, 'boardEventTitle')" class="child-add">언어셋</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>이벤트 시작일시</td>
                  <td colspan="3">
                    <date-time-picker
                      :clear="clearDate"
                      :current="boardEventStartDateTime"
                      @date="boardEventStartDateTimeProp"
                      class="date-time"
                    ></date-time-picker>
                  </td>
                </tr>
                <tr>
                  <td>이벤트 종료일시</td>
                  <td colspan="3">
                    <date-time-picker
                      :clear="clearDate"
                      :current="boardEventEndDateTime"
                      @date="boardEventEndDateTimeProp"
                      class="date-time"
                    ></date-time-picker>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <div class="d-flex align-center event-link">
                      <span>이벤트 소스 링크</span>
                      <input type="text" v-model="boardEventResource" />
                      <v-btn small color="primary" @click="newWindowLink">보기</v-btn>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <div>이벤트 메모(내부자용)</div>
                    <div class="mt5">
                      <textarea v-model="boardEventMemo"></textarea>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="set-right">
              <div class="mt32" style="display: flex; justify-content: space-between">
                <div><span class="pt5">이벤트 종료 내용</span></div>
                <v-btn small color="#D0A9F5" dark @click="showLanguageSetModalPopup(-1, 'boardEventContentEnd')" class="child-add">언어셋</v-btn>
              </div>
              <div class="mt8">
                <quill-editor ref="myTextEditor" v-model="boardEventContentEnd" :options="options" class="quill-wrap"> </quill-editor>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex mt10 resultTitle with-btn">
              <div class="mt5 mr20">이벤트 결과 제목</div>
              <input type="text" class="mr5" v-model="boardEventReportTitle" />
              <v-btn small color="#D0A9F5" dark @click="showLanguageSetModalPopup(-1, 'boardEventReportTitle')" class="child-add">언어셋</v-btn>
            </div>
            <div class="d-flex mt10">
              <span class="event-result-notice d-flex mt4"
                ><v-checkbox v-model="boardEventReportFlag"></v-checkbox> <span class="mt5">이벤트 결과(공지)</span></span
              >
              <div class="download-wrap">
                <div class="file-wrap">
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
                  <v-icon @click="confirmFile(item.url)">mdi-close-circle</v-icon>
                </div>
              </div>
            </div>
            <div class="mb40">
              <quill-editor ref="myTextEditor" v-model="boardEventContentReport" :options="options" class="quill-wrap"> </quill-editor>
            </div>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import { getPopupOpt } from "@/utils/modal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import DateTimePicker from "@/components/form/DateTimePicker.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { calculateDate } from "@/utils/yearSet";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-plus";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
export default {
  components: { alim, confirm, FileUpload, DateTimePicker, quillEditor },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //디테일 데이터
      boardEventSid: "",
      boardEventTopFlag: "",
      boardEventContentFlag: "R",
      boardEventResource: "",
      boardEventContent: "",
      boardEventContentEnd: "",
      boardEventContentReport: "",
      boardEventReportFlag: false,
      boardEventCreateName: "",
      boardEventStatus: "",
      boardEventMemo: "",
      boardEventTitle: "",
      boardEventStartDateTime: "",
      boardEventEndDateTime: "",
      boardEventReportTitle: "",
      message: true,
      channeltuneFiles: [],
      file: [],
      codeReload: true,
      storeContractList: [],
      clearDate: true,
      //파일 삭제 아이디
      delId: "",
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
    ...mapGetters("event", ["getEventList", "getEventDetail", "eventAdd", "eventModify", "eventDelete"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  async mounted() {
    this.reload(0);
  },
  methods: {
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num == 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/EVENT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        const res = this.getEventList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const eventList = res.boardEvent;
        this.list = eventList.data;
        this.list.forEach((ele) => {
          ele.boardEventStartDateTime = this.$date(ele.boardEventStartDateTime).utc().format("YYYY-MM-DD HH:mm:ss");
          ele.boardEventEndDateTime = this.$date(ele.boardEventEndDateTime).utc().format("YYYY-MM-DD HH:mm:ss");
        });
        this.len = eventList.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //이벤트 상세 정보
    async eventDetail(id) {
      try {
        bus.$emit("start:spinner");
        const timezone = this.$date.tz.guess();

        await this.$store.dispatch("event/EVENT_DETAIL", id);
        const res = this.getEventDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        const eventDetails = res.boardEvent;
        this.boardEventSid = eventDetails.boardEventSid;
        this.boardEventTopFlag = eventDetails.boardEventTopFlag;
        this.boardEventReportTitle = eventDetails.boardEventReportTitle;
        this.boardEventTitle = eventDetails.boardEventTitle;
        this.boardEventContentFlag = eventDetails.boardEventContentFlag;
        this.boardEventResource = isEmpty(eventDetails.boardEventResource);
        this.boardEventContent = isEmpty(eventDetails.boardEventContent);
        this.boardEventContentEnd = isEmpty(eventDetails.boardEventContentEnd);
        this.boardEventContentReport = isEmpty(eventDetails.boardEventContentReport);
        this.boardEventStartDateTime = this.$date(eventDetails.boardEventStartDateTime).utc("z").tz(timezone).format("YYYY-MM-DD HH:mm:ss");
        this.boardEventEndDateTime = this.$date(eventDetails.boardEventEndDateTime).utc("z").tz(timezone).format("YYYY-MM-DD HH:mm:ss");
        if (eventDetails.boardEventReportFlag === "Y") {
          this.boardEventReportFlag = true;
        } else {
          this.boardEventReportFlag = false;
        }
        this.boardEventCreateName = eventDetails.boardEventCreateName;
        this.boardEventStatus = eventDetails.boardEventStatus;
        this.boardEventMemo = isEmpty(eventDetails.boardEventMemo);
        this.file = [];
        eventDetails.fileResult.forEach((row) => {
          if (row.fileSid !== "") {
            //pdf 업로드 가능시 보내야할 데이터
            this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
          }
        });
        if (this.file[0] === undefined) {
          this.message = true;
        } else {
          this.message = false;
        }
        this.deleteAllChip();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    boardEventStartDateTimeProp(date) {
      if (date.length === 16) {
        this.boardEventStartDateTime = date + ":00";
      }
    },
    boardEventEndDateTimeProp(date) {
      if (date.length === 16) {
        this.boardEventEndDateTime = date + ":00";
      }
    },
    newWindowLink() {
      if (this.boardEventResource !== "" && this.boardEventResource !== null) {
        window.open(this.boardEventResource, "_blank");
      } else {
        this.alim("설정된 URL이 없습니다.", this.errorColor);
      }
    },
    //validate
    validate(status) {
      if (status == "reg") {
        if (this.boardEventSid !== "") {
          this.alim("고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.boardEventStatus == "" || this.boardEventStatus == null) {
        this.alim("이벤트 노출 상태를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.boardEventTitle == "" || this.boardEventTitle == null) {
        this.alim("이벤트 제목을 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.boardEventStartDateTime == "" || this.boardEventStartDateTime == null) {
        this.alim("이벤트 시작일시를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.boardEventEndDateTime == "" || this.boardEventEndDateTime == null) {
        this.alim("이벤트 종료일시를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardEventContentFlag == "" || this.boardEventContentFlag == null) {
        this.alim("이벤트 소스를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.boardEventContentFlag === "R") {
        if (this.boardEventResource == "" || this.boardEventResource == null) {
          this.alim("이벤트 소스링크를 입력해주세요.", this.errorColor);
          return false;
        }
      }
      if (this.boardEventContentFlag === "H") {
        if (this.boardEventContent == "" || this.boardEventContent == null) {
          this.alim("이벤트 내용을 입력해주세요.", this.errorColor);
          return false;
        }
      }
      if (status == "reg") {
        this.reg();
      }
      if (status == "modify") {
        this.modify();
      }
    },
    //이벤트 추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/EVENT_ADD", {
          boardEventStatus: this.boardEventStatus,
          boardEventTitle: this.boardEventTitle,
          boardEventStartDateTime: this.$date(this.boardEventStartDateTime).utc().format("YYYY-MM-DD HH:mm:ss"),
          boardEventEndDateTime: this.$date(this.boardEventEndDateTime).utc().format("YYYY-MM-DD HH:mm:ss"),
          boardEventContentFlag: this.boardEventContentFlag,
          boardEventResource: this.boardEventResource,
          boardEventReportTitle: this.boardEventReportTitle,
          boardEventContent: this.boardEventContent,
          boardEventMemo: this.boardEventMemo,
          boardEventContentEnd: this.boardEventContentEnd,
          boardEventReportFlag: this.boardEventReportFlag,
          boardEventContentReport: this.boardEventContentReport,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.eventAdd.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.deleteAllChip();
        this.alim("이벤트가 추가 되었습니다.", this.successColor);
        this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showLanguageSetModalPopup(id, name) {
      if (this.boardEventSid === "") {
        return this.alim("이벤트를 선택해주세요", this.errorColor);
      }

      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "boardEvent",
          tableSid: String(this.boardEventSid),
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
    //이벤트 수정
    async modify() {
      if (this.boardEventSid == "") {
        this.alim("이벤트 선택해 주세요.", this.errorColor);
        return false;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/EVENT_MODIFY", {
          boardEventSid: this.boardEventSid,
          boardEventStatus: this.boardEventStatus,
          boardEventTitle: this.boardEventTitle,
          boardEventReportTitle: this.boardEventReportTitle,
          boardEventStartDateTime: this.$date(this.boardEventStartDateTime).utc().format("YYYY-MM-DD HH:mm:ss"),
          boardEventEndDateTime: this.$date(this.boardEventEndDateTime).utc().format("YYYY-MM-DD HH:mm:ss"),
          boardEventContentFlag: this.boardEventContentFlag,
          boardEventResource: this.boardEventResource,
          boardEventContent: this.boardEventContent,
          boardEventMemo: this.boardEventMemo,
          boardEventContentEnd: this.boardEventContentEnd,
          boardEventReportFlag: this.boardEventReportFlag,
          boardEventContentReport: this.boardEventContentReport,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.eventModify.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.deleteAllChip();
        this.eventDetail(this.boardEventSid);
        this.reload();
        this.alim("수정 되었습니다.", this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("event/EVENT_DEL", this.boardEventSid);
            const res = this.eventDelete.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            await this.reload(0);
            if (this.list.length < 1) {
              this.page = this.page - 1;
            }
            this.file = [];
            this.alim("삭제 되었습니다.", this.successColor);
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
            this.alim("삭제 되었습니다.", this.successColor);
            this.eventDetail(this.boardEventSid);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    inCalDate(d) {
      return calculateDate(d, "+", 9);
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach((ele) => ele.classList.remove("active"));
      this.boardEventSid = "";
      this.boardEventStatus = "V";
      this.boardEventTitle = "";
      this.boardEventContentFlag = "R";
      this.boardEventResource = "";
      this.boardEventContent = "";
      this.boardEventMemo = "";
      this.boardEventContentEnd = "";
      this.boardEventReportFlag = "";
      this.boardEventContentReport = "";
      this.boardEventStartDateTime = "";
      this.boardEventEndDateTime = "";
      this.clearDate = !this.clearDate;
      this.deleteAllChip();
    },
  },
};
</script>

<style lang="scss" scoped>
.resultTitle {
  & input {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: calc(100% - 160px);
  }
}
.event-link {
  & > div {
    height: 25px;
  }
  & span {
    white-space: nowrap;
    margin-right: 5px;
  }
  & button {
    margin-left: 5px;
  }
}
.download-wrap {
  width: 100%;
  margin-left: 40px;
}
.input-size {
  width: 150px !important;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 175px) !important;
  }
}
.field {
  display: flex;
  justify-content: space-between;
  & .set-left {
    width: calc(50% - 10px);
  }
  & .set-right {
    width: calc(50% - 10px);
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 500px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 510px);
    & .border {
      & .header {
        & .search {
          & input[type="text"] {
            border: 1px solid #ccc;
            height: 30px;
            padding: 0 10px;
            width: 200px;
          }
          & button {
            margin-left: 5px;
          }
        }
      }
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.quill-wrap::v-deep {
  height: 196px;
  & .ql-toolbar.ql-snow + .ql-container.ql-snow {
    overflow: auto;
  }
}
.event-result-notice {
  white-space: nowrap;
}
.with-btn {
  & .id {
    margin-right: 0 !important;
    width: calc(100% - 65.3px) !important;
  }
}
</style>
