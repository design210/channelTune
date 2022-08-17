<template>
  <section class="container">
    <div class="title-wrap">
      <h1>플레이어 앱 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2></h2>
            <div class="search">
              <input type="text" class="searchText" v-model="searchText" placeholder="앱 이름 검색" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              담당자 리스트 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="80" />
              <col width="100" />
              <col width="100" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>고유 코드</th>
                <th>앱 이름</th>
                <th>앱 버전</th>
                <th>설치가능 OS버전</th>
                <th>사이트 오픈 여부</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="detail(item.addtunePlayerAppSid)">
                <td>{{ item.addtunePlayerAppSid }}</td>
                <td>{{ item.addtunePlayerAppName }}</td>
                <td>{{ item.addtunePlayerAppVersion }}</td>
                <td>{{ item.addtunePlayerAppStartOs }} ~ {{ item.addtunePlayerAppEndOs }}</td>
                <td>{{ item.addtunePlayerAppOpenFlag }}</td>
                <td>{{ item.addtunePlayerAppStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">플레이어 앱 리스트가 없습니다.</td>
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
              <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(addtunePlayerAppSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="80" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유 코드</td>
                <td><input type="text" readonly v-model="addtunePlayerAppSid" /></td>
                <td>사이트 오픈</td>
                <td>
                  <div class="radio">
                    <v-radio-group :mandatory="false" v-model="addtunePlayerAppOpenFlag">
                      <v-radio label="OPEN" value="Y"></v-radio>
                      <v-radio label="CLOSE" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>앱 이름</td>
                <td colspan="3"><input type="text" v-model="addtunePlayerAppName" /></td>
              </tr>
              <tr>
                <td>앱 버전</td>
                <td><input type="text" v-model="addtunePlayerAppVersion" :readonly="appVerDisabled" /></td>
                <td>앱 상태</td>
                <td><pull-down :data="addtunePlayerAppStatus" :code="setCode" @selected="selectOn" class="pull-down"></pull-down></td>
              </tr>
              <tr>
                <td>설치가능 OS버전</td>
                <td colspan="3">
                  <input type="text" v-model="addtunePlayerAppStartOs" class="w100" /> ~
                  <input type="text" v-model="addtunePlayerAppEndOs" class="w100" /> <span class="ml10">(설치 가능한 안드로이드의 OS 버전)</span>
                </td>
              </tr>
              <tr>
                <td>앱 파일</td>
                <td colspan="3">
                  <div v-if="files">
                    <a
                      @click="fileDownload({ id: files.fileSid, name: files.fileStorageFileName, fileExt: files.fileExt })"
                      v-if="files.fileStorageFileName !== ''"
                      >{{ files.fileStorageFileName }}</a
                    ><span v-if="files.fileStorageFileName !== ''"><v-icon @click="confirmPhoto(files.fileSid)">mdi-close-circle</v-icon></span>
                  </div>
                  <div v-else><file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'.apk'"></file-upload></div>
                </td>
              </tr>
              <tr>
                <td colspan="4">앱 기능 / 변경 내용</td>
              </tr>
              <tr>
                <td colspan="4"><textarea v-model="addtunePlayerAppDocument"></textarea></td>
              </tr>
            </table>
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
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import fileUploadMixin from "@/mixins/fileUpload";
import FileUpload from "@/components/form/FileUpload.vue";
export default {
  components: { alim, confirm, PullDown, FileUpload },
  mixins: [loading, alimMixin, deleteMixin, fileUploadMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      appVerDisabled: false,
      //디테일 데이터
      addtunePlayerAppSid: "",
      addtunePlayerAppName: "",
      addtunePlayerAppVersion: "",
      addtunePlayerAppStartOs: "",
      addtunePlayerAppEndOs: "",
      addtunePlayerAppStatus: "",
      addtunePlayerAppOpenFlag: "N",
      addtunePlayerAppDocument: "",
      addtunePlayerAppStatusName: "",
      addtunePlayerAppDownUrl: "",
      files: {
        fileStorageFileName: "",
      },
      channeltuneFiles: [],
      //셀렉트 설정
      setCode: "SYS22805B002",
    };
  },
  computed: {
    ...mapGetters("player", ["playerList", "playerDetail", "playerDelete", "player", "playerModify"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    selectOn(data) {
      this.addtunePlayerAppStatus = data.sysCodeSid;
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/GET_PLAYER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.playerList.channeltuneApiResult.errorCode === 200) {
          const playerList = this.playerList.channeltuneApiResult.cmsPlayerApp;
          this.list = playerList.data;
          this.len = playerList.last_page;
        } else {
          this.alim(this.playerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async detail(id) {
      this.appVerDisabled = true;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/GET_PLAYER_DETAIL", id);
        if (this.playerDetail.channeltuneApiResult.errorCode === 200) {
          const res = this.playerDetail.channeltuneApiResult.cmsPlayerApp;
          this.addtunePlayerAppSid = res.addtunePlayerAppSid;
          this.addtunePlayerAppName = res.addtunePlayerAppName;
          this.addtunePlayerAppVersion = res.addtunePlayerAppVersion;
          this.addtunePlayerAppStartOs = res.addtunePlayerAppStartOs;
          this.addtunePlayerAppEndOs = res.addtunePlayerAppEndOs;
          this.addtunePlayerAppStatus = res.addtunePlayerAppStatus;
          this.addtunePlayerAppStatusName = res.addtunePlayerAppStatusName;
          this.addtunePlayerAppOpenFlag = res.addtunePlayerAppOpenFlag;
          this.addtunePlayerAppDocument = res.addtunePlayerAppDocument;
          this.addtunePlayerAppDownUrl = res.addtunePlayerAppDownUrl;
          this.files = res.files;
        } else {
          this.alim(this.playerDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.addtunePlayerAppSid !== "") {
          this.alim("고유 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.addtunePlayerAppName === "" || this.addtunePlayerAppName == null) {
        this.alim("앱 이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerAppVersion === "" || this.addtunePlayerAppVersion == null) {
        this.alim("앱 버전을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerAppStatus === "" || this.addtunePlayerAppStatus == null) {
        this.alim("앱 상태를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerAppEndOs === "" || this.addtunePlayerAppEndOs == null) {
        this.alim("설치가능 최대 버전을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/SET_PLAYER", {
          addtunePlayerAppName: this.addtunePlayerAppName,
          addtunePlayerAppVersion: this.addtunePlayerAppVersion,
          addtunePlayerAppStartOs: this.addtunePlayerAppStartOs,
          addtunePlayerAppEndOs: this.addtunePlayerAppEndOs,
          addtunePlayerAppStatus: this.addtunePlayerAppStatus,
          addtunePlayerAppOpenFlag: this.addtunePlayerAppOpenFlag,
          addtunePlayerAppDocument: this.addtunePlayerAppDocument,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.player.channeltuneApiResult.errorCode == 200) {
          this.alim("플레이어가 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.player.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/SET_PLAYER_MODIFY", {
          sid: this.addtunePlayerAppSid,
          addtunePlayerAppName: this.addtunePlayerAppName,
          addtunePlayerAppVersion: this.addtunePlayerAppVersion,
          addtunePlayerAppStartOs: this.addtunePlayerAppStartOs,
          addtunePlayerAppEndOs: this.addtunePlayerAppEndOs,
          addtunePlayerAppStatus: this.addtunePlayerAppStatus,
          addtunePlayerAppOpenFlag: this.addtunePlayerAppOpenFlag,
          addtunePlayerAppDocument: this.addtunePlayerAppDocument,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.playerModify.channeltuneApiResult.errorCode == 200) {
          await this.reload(2);
          await this.detail(this.addtunePlayerAppSid);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.playerModify.channeltuneApiResult.errorMessage, this.errorColor);
        }
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
            await this.$store.dispatch("player/SET_PLAYER_DELETE", this.addtunePlayerAppSid);
            if (this.playerDelete.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.playerDelete.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            if (this.fileDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              await this.detail(this.addtunePlayerAppSid);
            } else {
              this.alim(this.fileDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.addtunePlayerAppSid = "";
      this.addtunePlayerAppName = "";
      this.addtunePlayerAppVersion = "";
      this.addtunePlayerAppStartOs = "";
      this.addtunePlayerAppEndOs = "";
      this.addtunePlayerAppStatus = "";
      this.addtunePlayerAppOpenFlag = "N";
      this.addtunePlayerAppDocument = "";
      this.addtunePlayerAppDownUrl = "";
      this.appVerDisabled = false;
      this.deleteAllFiles = !this.deleteAllFiles;
      this.files = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 50% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(50% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.searchText {
  border: 1px solid #ccc;
  height: 30px;
  padding: 0 10px;
  width: 250px;
}
</style>
