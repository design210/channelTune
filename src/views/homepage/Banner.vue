<template>
  <section class="container">
    <div class="title-wrap">
      <h1>배너 관리</h1>
    </div>
    <section class="banner-manage">
      <section class="banner-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>배너 종류</h2>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              배너종류테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>배너명</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in bannerKindList"
                :key="index"
                @click="getBannerListBySysCode(item.sysCodeSid, 1)"
                :class="[item.sysCodeSid === bannerKind ? 'sel' : '']"
              >
                <td>{{ item.sysCodeSid }}</td>
                <td>{{ item.sysCodeName }}</td>
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
                  <col width="80" />
                  <col width="*" />
                  <col width="80" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" v-model="bannerSid" readonly /></td>
                  <td class="required">OPEN여부</td>
                  <td>
                    <div class="radio">
                      <v-radio-group v-model="bannerOpenFlag">
                        <v-radio label="Y" value="Y"></v-radio>
                        <v-radio label="N" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">배너제목</td>
                  <td colspan="3"><input type="text" v-model="bannerTitle" /></td>
                </tr>
                <tr>
                  <td class="required">배너서브제목</td>
                  <td colspan="3"><input type="text" v-model="bannerSubTitle" /></td>
                </tr>
                <tr>
                  <td>배너링크</td>
                  <td colspan="3"><input type="text" v-model="bannerLink" /></td>
                </tr>
                <tr>
                  <td class="required">배너시작일시</td>
                  <td>
                    <!-- <date-picker :propdate="bannerStartDateTime" @updateDate="newBannerStartDateTime" class="modal-date"></date-picker> -->
                    <date-time-picker
                      :clear="startClearDate"
                      :current="bannerStartDateTime"
                      @date="newBannerStartDateTime"
                      class="date-time"
                    ></date-time-picker>
                  </td>
                  <td class="required">배너종료일시</td>
                  <td>
                    <!-- <date-picker :propdate="bannerEndDateTime" @updateDate="newBannerEndDateTime" class="modal-date"></date-picker> -->
                    <date-time-picker
                      :clear="endClearDate"
                      :current="bannerEndDateTime"
                      @date="newBannerEndDateTime"
                      class="date-time"
                    ></date-time-picker>
                  </td>
                </tr>
                <tr>
                  <td class="required">배너Device</td>
                  <td colspan="3">
                    <div class="radio">
                      <v-radio-group v-model="bannerDevice">
                        <v-radio label="모바일전용" value="M"></v-radio>
                        <v-radio label="웹전용" value="W"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">배너Target</td>
                  <td colspan="3">
                    <div class="radio">
                      <v-radio-group v-model="bannerTarget">
                        <v-radio label="현재페이지에서 이동" value="L"></v-radio>
                        <v-radio label="새창으로 이동" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr v-show="bannerKind !== 'SYS21C23B025'">
                  <td>배너이미지</td>
                  <td colspan="3">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                  </td>
                </tr>
                <tr>
                  <td>배너 클로즈 종류</td>
                  <td colspan="2" class="radio">
                    <v-radio-group v-model="bannerCloseKind">
                      <div class="mt10">
                        <v-radio label="해당사항 없음" value="SYS22228B007"></v-radio>
                        <v-radio label="다시 보이지 않기" value="SYS22228B008"></v-radio>
                      </div>
                      <div class="mt10">
                        <v-radio label="오늘 하루 보이지 않기" value="SYS22228B009"></v-radio>
                        <v-radio label="7일간 보이지 않기" value="SYS22228B010"></v-radio>
                      </div>
                    </v-radio-group>
                  </td>
                  <td>
                    <v-btn small color="#D0A9F5" dark @click="showLanguageSetModalPopup(-1, 'bannerCloseKind')" class="child-add">언어셋</v-btn>
                  </td>
                </tr>
                <!-- <tr class="ql-snow" v-show="bannerKind === 'SYS21C23B025'">
									<td>팝업 HTML</td>
									<td colspan="3">
										<div class="layout"><quill-editor ref="myTextEditor" v-model="bannerContent" :options="options"> </quill-editor></div>
									</td>
								</tr> -->
              </table>
            </section>
            <section class="right-section">
              <div class="ql-snow" v-if="bannerKind === 'SYS21C23B025'">
                <div class="mb20">
                  <h3>팝업 HTML</h3>
                </div>
                <div class="layout">
                  <quill-editor ref="myTextEditor" v-model="bannerContent" :options="options"> </quill-editor>
                </div>
              </div>
              <div v-else>
                <div>
                  <h3>배너이미지</h3>
                </div>
                <ul class="file-list">
                  <li v-for="(item, index) in fileResult" :key="index">
                    <div class="elem">
                      <!-- v-if="actualSurveyPartnerStatus !== 'SYS21819B005'" -->
                      <v-icon @click="confirmPhoto(item.fileSid)">mdi-close-circle</v-icon>
                      <!-- v-if="message === false" -->
                      <div @click="thumbnailModal({ id: item.fileSid, fileExt: item.fileExt, name: item.fileFileName })">
                        <img :src="item.fileServer + '/' + item.fileStoragePath + '/' + item.fileStorageFileName" />
                      </div>
                    </div>
                  </li>
                  <div v-if="message === true">첨부된 파일이 없습니다.</div>
                </ul>
              </div>
            </section>
          </section>
          <section class="bottom-section">
            <table class="tbl mt20 user-list-tbl select-tbl">
              <caption>
                배너테이블
              </caption>
              <colgroup>
                <col width="90" />
                <col width="*" />
                <col width="160" />
                <col width="120" />
                <col width="120" />
                <col width="90" />
              </colgroup>
              <thead>
                <tr>
                  <th>배너고유코드</th>
                  <th>배너제목</th>
                  <th>배너서브제목</th>
                  <th>시작일시</th>
                  <th>종료일시</th>
                  <th>배너오픈여부</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="getBannerDetailById(item.bannerSid)">
                  <td>{{ item.bannerSid }}</td>
                  <td>{{ item.bannerTitle }}</td>
                  <td>{{ item.bannerSubTitle }}</td>
                  <td>{{ __getLocalTime(item.bannerStartDateTime) }}</td>
                  <td>{{ __getLocalTime(item.bannerEndDateTime) }}</td>
                  <td>{{ item.bannerOpenFlag }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="6">배너 리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt10" v-if="list.length > 0">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
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
const TOP_BANNER_SYSCODE = "SYS21B23B009";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
import DateTimePicker from "@/components/form/DateTimePicker.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import utcMixin from "@/mixins/utcTime.js";
import { calculateDate } from "@/utils/yearSet";
export default {
  components: { alim, quillEditor, confirm, FileUpload, DateTimePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin, utcMixin],
  data() {
    return {
      // 배너 종류
      bannerKindList: [],

      //게시물 설정
      page: 1,
      len: null,
      list: [],
      size: 5,

      // detail
      bannerDevice: "",
      bannerKind: "",
      bannerLink: "",
      bannerOpenFlag: "",
      bannerSid: "",
      bannerStartDateTime: "",
      bannerSubTitle: "",
      bannerTarget: "",
      bannerTitle: "",
      bannerEndDateTime: "",
      bannerContent: "",
      bannerCloseKind: "SYS22228B007",
      fileResult: [],
      channeltuneFiles: [],

      // 파일 삭제 아이디
      delId: "",
      message: true,

      // 날짜
      startClearDate: false,
      endClearDate: false,

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
            //['clean'],
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("banner", ["getBannerList", "getBannerDetail", "bannerAdd", "bannerUpdate", "bannerDelete"]),
    ...mapGetters("systemCode", ["getCode"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.getBannerListBySysCode(this.bannerKind);
    },
    size() {
      this.getBannerListBySysCode(this.bannerKind);
    },
  },
  mounted() {
    this.getBannerKindList();
  },
  methods: {
    newBannerStartDateTime(data) {
      this.bannerStartDateTime = data;
    },
    newBannerEndDateTime(data) {
      this.bannerEndDateTime = data;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    // 배너타입목록(sysCodeSid)
    async getBannerKindList() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("systemCode/GET_CODE", TOP_BANNER_SYSCODE);
      const res = this.getCode.channeltuneApiResult;
      if (parseInt(res.errorCode) !== 200) {
        this.alim(res.errorMessage, this.errorColor);
        bus.$emit("end:spinner");
        return false;
      }

      this.bannerKindList = res.sysCodeList;
      bus.$emit("end:spinner");
    },

    // 배너 종류 code로 목록가져오기
    async getBannerListBySysCode(sysCodeSid, num = 0) {
      if (num == 1) {
        this.page = 1;
      }

      this.clearContent();
      this.bannerKind = sysCodeSid;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("banner/BANNER_LIST", {
          size: this.size,
          page: this.page,
          bannerKind: sysCodeSid,
        });

        const res = this.getBannerList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.banner;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 배너 상세
    async getBannerDetailById(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("banner/BANNER_DETAIL", sid);
        const res = this.getBannerDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.banner;
        this.bannerDevice = data.bannerDevice;
        this.bannerKind = data.bannerKind;
        this.bannerLink = isEmpty(data.bannerLink);
        this.bannerOpenFlag = data.bannerOpenFlag;
        this.bannerSid = data.bannerSid;
        this.bannerContent = data.bannerContent;
        this.bannerCloseKind = data.bannerCloseKind;
        this.bannerStartDateTime = this.__getLocalTime(data.bannerStartDateTime);
        this.bannerEndDateTime = this.__getLocalTime(data.bannerEndDateTime);
        this.bannerSubTitle = data.bannerSubTitle;
        this.bannerTarget = data.bannerTarget;
        this.bannerTitle = data.bannerTitle;
        this.fileResult = data.fileResult;
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
    clearContent() {
      this.startClearDate = !this.startClearDate;
      this.endClearDate = !this.endClearDate;
      this.bannerDevice = "";
      this.bannerLink = "";
      this.bannerOpenFlag = "";
      this.bannerSid = "";
      this.bannerStartDateTime = "";
      this.bannerSubTitle = "";
      this.bannerTarget = "";
      this.bannerTitle = "";
      this.bannerContent = "";
      this.bannerEndDateTime = "";
      this.bannerCloseKind = "SYS22228B007";
      this.fileResult = [];
      this.deleteAllChip();
    },
    validate(type) {
      if (type == "add") {
        if (this.bannerSid != "") {
          this.alim("배너 고유코드가 있을 시 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }

      if (type == "add" || type == "update") {
        if (this.bannerKind == "" || this.bannerKind == null) {
          this.alim("배너종류를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.bannerOpenFlag == "" || this.bannerOpenFlag == null) {
          this.alim("OPEN여부를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.bannerTitle == "" || this.bannerTitle == null) {
          this.alim("배너제목을 입력하세요.", this.errorColor);
          return false;
        }
        if (this.bannerSubTitle == "" || this.bannerSubTitle == null) {
          this.alim("배너서브제목을 입력하세요.", this.errorColor);
          return false;
        }
        if (this.bannerStartDateTime == "" || this.bannerStartDateTime == null) {
          this.alim("배너시작일시를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.bannerEndDateTime == "" || this.bannerEndDateTime == null) {
          this.alim("배너종료일시를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.bannerDevice == "" || this.bannerDevice == null) {
          this.alim("배너Device를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.bannerTarget == "" || this.bannerTarget == null) {
          this.alim("배너TARGET을 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (type == "update" || type == "delete") {
        if (this.bannerSid == "" || this.bannerSid == null) {
          this.alim("배너를 선택하세요.", this.errorColor);
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
          this.confirm(this.bannerSid);
          break;
      }
    },
    // 추가
    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("banner/BANNER_ADD", {
          bannerKind: this.bannerKind,
          bannerDevice: this.bannerDevice,
          bannerTarget: this.bannerTarget,
          bannerCloseKind: this.bannerCloseKind,
          bannerStartDateTime: calculateDate(this.bannerStartDateTime, "-", 9),
          bannerEndDateTime: calculateDate(this.bannerEndDateTime, "-", 9),
          bannerOpenFlag: this.bannerOpenFlag,
          bannerTitle: this.bannerTitle,
          bannerSubTitle: this.bannerSubTitle,
          bannerContent: this.bannerContent,
          bannerLink: this.bannerLink,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.bannerAdd.channeltuneApiResult;

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.bannerSid = res.banner.bannerSid;
        this.getBannerDetailById(this.bannerSid);
        this.getBannerListBySysCode(this.bannerKind);
        this.alim("배너를 등록했습니다.", this.successColor);
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
        await this.$store.dispatch("banner/BANNER_UPDATE", {
          bannerSid: this.bannerSid,
          bannerKind: this.bannerKind,
          bannerDevice: this.bannerDevice,
          bannerTarget: this.bannerTarget,
          bannerCloseKind: this.bannerCloseKind,
          bannerStartDateTime: this.__convertUtcTime(this.bannerStartDateTime),
          bannerEndDateTime: this.__convertUtcTime(this.bannerEndDateTime),
          bannerOpenFlag: this.bannerOpenFlag,
          bannerTitle: this.bannerTitle,
          bannerSubTitle: this.bannerSubTitle,
          bannerContent: this.bannerContent,
          bannerLink: this.bannerLink,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.bannerUpdate.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.getBannerDetailById(this.bannerSid);
        this.getBannerListBySysCode(this.bannerKind);
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
        await this.$store.dispatch("banner/BANNER_DELETE", this.bannerSid);
        const res = this.bannerDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) != 200) {
          bus.$emit("end:spinner");
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        // getBannerListBySysCode 함수안에서 clearContent 실행하기 때문에 넣지 않음
        this.getBannerListBySysCode(this.bannerKind);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
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

            this.getBannerDetailById(this.bannerSid);
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
    showLanguageSetModalPopup(id, name) {
      if (this.bannerSid === "") {
        return this.alim("배너를 선택해주세요", this.errorColor);
      }

      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "bannerMaster",
          tableSid: String(this.bannerSid),
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.sel {
  & td {
    background: #c8cdda;
  }
}
.layout::v-deep {
  & .quill-editor {
    & .ql-container {
      height: 200px;
      & .ql-editor {
        min-height: 0px !important;
      }
    }
  }
}
.banner-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  & .banner-list {
    width: 350px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 370px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }

  & .banner-detail {
    & .top-section {
      display: flex;
      justify-content: space-between;
      & .left-section {
        width: 50%;
        padding: 10px;
      }

      & .right-section {
        width: calc(50% - 20px);
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

    & .bottom-section {
      padding: 10px;
      margin-top: 55px;
      border: 1px solid #aaaaaa;
    }
  }
}
</style>
