<template>
  <section class="container">
    <div class="title-wrap">
      <h1>팝업 관리</h1>
    </div>
    <section class="banner-manage">
      <section class="banner-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>팝업 종류</h2>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              팝업 종류 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>팝업명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in popUpList" :key="index" @click="getPopUpDetailById(item.popupSid)">
                <td>{{ item.popupSid }}</td>
                <td>{{ item.popupTitle }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="init-wrap section-box border-outside">
        <div class="border banner-detail">
          <div class="header">
            <h2>항목</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('add')">등록</v-btn>
              <v-btn small color="warning" @click="validate('update')">수정</v-btn>
              <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
              <v-btn small @click="clearContent">CLEAR</v-btn>
            </div>
          </div>
          <section class="top-section">
            <section class="left-section">
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" v-model="popUpSid" readonly /></td>
                  <td class="required">OPEN여부</td>
                  <td>
                    <div class="radio">
                      <v-radio-group v-model="popUpOpen">
                        <v-radio label="Y" value="Y"></v-radio>
                        <v-radio label="N" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">팝업제목</td>
                  <td colspan="3"><input type="text" v-model="popUpTitle" /></td>
                </tr>
                <tr>
                  <td>팝업링크</td>
                  <td colspan="3"><input type="text" v-model="popUpLink" /></td>
                </tr>
                <tr>
                  <td class="required">팝업시작일시</td>
                  <td>
                    <!-- <date-picker :propdate="bannerStartDateTime" @updateDate="newBannerStartDateTime" class="modal-date"></date-picker> -->
                    <date-time-picker
                      :clear="startClearDate"
                      :current="popUpStartDate"
                      @date="popUpStartDateTime"
                      class="date-time"
                    ></date-time-picker>
                  </td>
                  <td class="required">팝업종료일시</td>
                  <td>
                    <!-- <date-picker :propdate="bannerendDateTime" @updateDate="newBannerendDateTime" class="modal-date"></date-picker> -->
                    <date-time-picker :clear="endClearDate" :current="popUpEndDate" @date="popUpEndDateTime" class="date-time"></date-time-picker>
                  </td>
                </tr>
                <tr>
                  <td class="required">팝업Device</td>
                  <td colspan="3">
                    <div class="radio">
                      <v-radio-group v-model="popUpOpenDevice">
                        <v-radio label="모바일전용" value="M"></v-radio>
                        <v-radio label="웹전용" value="W"></v-radio>
                        <v-radio label="앱전용" value="A"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">팝업 노출 정보</td>
                  <td colspan="3">
                    <div class="radio">
                      <v-radio-group v-model="popUpKind">
                        <v-radio label="이미지" value="I"></v-radio>
                        <v-radio label="HTML" value="H"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">팝업Target</td>
                  <td colspan="3">
                    <div class="radio">
                      <v-radio-group v-model="popUpTarget">
                        <v-radio label="현재페이지에서 이동" value="L"></v-radio>
                        <v-radio label="새창으로 이동" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr v-show="popUpKind === 'I'">
                  <td>팝업이미지</td>
                  <td colspan="3">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                  </td>
                </tr>
                <tr v-show="popUpKind === 'H'">
                  <td>팝업 HTML</td>
                  <td colspan="3"><textarea :value="popUpContent" @input="popUpContent = $event.target.value"></textarea></td>
                </tr>
              </table>
            </section>
            <section class="right-section">
              <div>
                <h3>팝업이미지</h3>
              </div>
              <ul class="file-list">
                <li v-for="(item, index) in fileResult" :key="index">
                  <div class="elem">
                    <!-- v-if="actualSurveyPartnerStatus !== 'SYS21819B005'" -->
                    <v-icon @click="confirmPhoto(item.fileSid)">mdi-close-circle</v-icon>
                    <!-- v-if="message === false" -->
                    <div @click="thumbnailModal({ id: item.fileSid, fileExt: item.fileExt, name: item.fileFileName })">
                      <!-- <img :src="`${process.env.VUE_APP_API}/file/fileView/${item.url}`" /> -->
                      <img :src="item.fileServer + '/' + item.fileStoragePath + '/' + item.fileStorageFileName" />
                    </div>
                  </div>
                </li>
                <div v-if="message === true">첨부된 파일이 없습니다.</div>
              </ul>
            </section>
          </section>
        </div>
      </section>
      <!-- 알럿 -->
      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>

      <!-- 삭제 컨펌 -->
      <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
import DateTimePicker from "@/components/form/DateTimePicker.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { calculateDate } from "@/utils/yearSet";
export default {
  components: { alim, confirm, FileUpload, DateTimePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  data() {
    return {
      // 배너 종류
      popUpList: [],

      //게시물 설정
      page: 1,
      len: null,
      list: [],
      size: 5,

      popupName: "",

      // detail
      popUpOpenDevice: "",
      popUpKind: "",
      popUpLink: "",
      popUpOpen: "",
      popUpSid: "",
      popUpStartDate: "",
      popUpTarget: "",
      popUpContent: "",
      popUpTitle: "",
      popUpEndDate: "",
      fileResult: [],
      channeltuneFiles: [],

      // 파일 삭제 아이디
      delId: "",
      message: true,

      // 날짜
      startClearDate: false,
      endClearDate: false,
    };
  },
  computed: {
    ...mapGetters("popup", ["getPopUpList", "getPopUpDetail", "popUpAdd", "popUpUpdate", "popUpDelete"]),
    ...mapGetters("systemCode", ["getCode"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  mounted() {
    this.getPopUp();
  },
  methods: {
    popUpStartDateTime(data) {
      this.popUpStartDate = data;
    },
    popUpEndDateTime(data) {
      this.popUpEndDate = data;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;

      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    detailUpdate(data) {
      console.log(data);
    },
    // 팝업 가져오기
    async getPopUp() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("popup/POPUP_LIST", {
          popupName: this.popupName,
        });
        const res = this.getPopUpList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.popUpList = res.popup;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 팝업 상세
    async getPopUpDetailById(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("popup/POPUP_DETAIL", sid);
        const res = this.getPopUpDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        this.popUpSid = res.popup.popupSid;
        this.popUpKind = res.popup.popupKind;
        this.popUpTitle = res.popup.popupTitle;
        this.popUpContent = res.popup.popupContent;
        this.popUpTarget = res.popup.popupTarget;
        this.popUpStartDate = calculateDate(res.popup.popupStartDate, "+", 9);
        this.popUpEndDate = calculateDate(res.popup.popupEndDate, "+", 9);
        this.popUpOpen = res.popup.popupOpen;
        this.popUpOpenDevice = res.popup.popupOpenDevice;
        this.popUpLink = res.popup.popupLink;
        this.fileResult = res.popup.files;
        if (this.fileResult[0] === undefined || this.fileResult.length == 0) {
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
    // 추가
    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("popup/POPUP_ADD", {
          popupTitle: this.popUpTitle,
          popupContent: this.popUpContent,
          popupTarget: this.popUpTarget,
          popupKind: this.popUpKind,
          popupStartDate: calculateDate(this.popUpStartDate, "-", 9),
          popupEndDate: calculateDate(this.popUpEndDate, "-", 9),
          popupOpen: this.popUpOpen,
          popupOpenDevice: this.popUpOpenDevice,
          popupLink: this.popUpLink,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.popUpAdd.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.getPopUp();
        this.clearContent();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 수정
    async update() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("popup/POPUP_UPDATE", {
          popupTitle: this.popUpTitle,
          popupContent: this.popUpContent,
          popupTarget: this.popUpTarget,
          popupKind: this.popUpKind,
          popupStartDate: calculateDate(this.popUpStartDate, "-", 9),
          popupEndDate: calculateDate(this.popUpEndDate, "-", 9),
          popupOpen: this.popUpOpen,
          popupOpenDevice: this.popUpOpenDevice,
          popupLink: this.popUpLink,
          popupSid: this.popUpSid,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.popUpUpdate.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }
        this.getPopUpDetailById(this.popUpSid);
        this.clearContent();
        this.alim("배너를 수정했습니다.", this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 삭제
    async delete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("popup/POPUP_DELETE", this.popUpSid);
        const res = this.popUpDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) != 200) {
          bus.$emit("end:spinner");
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }
        this.getPopUp();
        this.clearContent();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유효성 검사
    validate(type) {
      if (type == "update" || type == "delete") {
        if (this.popUpSid == "" || this.popUpSid == null) {
          this.alim("팝업를 선택하세요.", this.errorColor);
          return false;
        }
      }
      if (type == "add" || type == "update") {
        if (this.popUpOpen == "" || this.popUpOpen == null) {
          this.alim("OPEN여부를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.popUpTitle == "" || this.popUpTitle == null) {
          this.alim("팝업제목을 입력하세요.", this.errorColor);
          return false;
        }

        if (this.popUpStartDate == "" || this.popUpStartDate == null) {
          this.alim("팝업시작일시를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.popUpEndDate == "" || this.popUpEndDate == null) {
          this.alim("팝업종료일시를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.popUpOpenDevice == "" || this.popUpOpenDevice == null) {
          this.alim("팝업Device를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.popUpKind == "" || this.popUpKind == null) {
          this.alim("팝업 노출 정보를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.popUpKind === "I" && this.channeltuneFiles.length === 0) {
          this.alim("이미지를 업로드 해 주세요.", this.errorColor);
          return false;
        }
        if (this.popUpKind === "H" && !this.popUpContent) {
          this.alim("HTML 태그를 입력해 주세요.", this.errorColor);
          return false;
        }
        if (this.popUpTarget == "" || this.popUpTarget == null) {
          this.alim("팝업TARGET을 선택하세요.", this.errorColor);
          return false;
        }
      }

      switch (type) {
        case "add":
          this.add();
          break;
        case "update":
          this.update();
          break;
        case "delete":
          this.confirm(this.popUpSid);
          break;
      }
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);

            const res = this.fileDeleteResult.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              bus.$emit("end:spinner");
              return false;
            }

            this.getPopUpDetailById(this.popUpSid);
            this.alim("삭제 되었습니다.", this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }

        if (data.type === "list") {
          this.delete();
        }
      }
      this.resetDeleteData();
    },
    clearContent() {
      this.startClearDate = !this.startClearDate;
      this.endClearDate = !this.endClearDate;
      this.popUpOpenDevice = "";
      this.popUpKind = "";
      this.popUpLink = "";
      this.popUpOpen = "";
      this.popUpSid = "";
      this.popUpStartDate = "";
      this.popUpTarget = "";
      this.popUpContent = "";
      this.popUpTitle = "";
      this.popUpEndDate = "";
      this.fileResult = [];
      this.deleteAllChip();
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  & .banner-list {
    width: 40% !important;
    border: 1px solid #ccc;
    margin-right: 20px;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: 55%;
  }

  & .banner-detail {
    & .top-section {
      & .left-section {
        width: 80%;
        padding: 10px;
        margin-bottom: 50px;
      }

      & .right-section {
        width: calc(100% - 620px);
        padding: 10px;
        & ul.file-list {
          display: flex;
          justify-content: start;
          overflow-x: scroll;
          & .elem {
            position: relative;
            margin: 2px;
            & button {
              position: absolute;
              top: 3px;
              right: 3px;
            }

            & img {
              width: 200px !important;
              height: 180px !important;
            }
          }
        }
      }
    }
  }
}
</style>
