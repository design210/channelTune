<template>
  <div>
    <div class="btn-group d-flex mt10 justify-end">
      <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
      <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
      <v-btn small color="error" dark @click="confirm()">삭제</v-btn>
      <v-btn small @click="clear">clear</v-btn>
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
          <td><input type="text" readonly v-model="addtunePlayerSid" /></td>
          <td>플레이어 상태</td>
          <td><pull-down :data="addtunePlayerStatus" :code="statusCode" @selected="emitStatus" class="pull-down"></pull-down></td>
        </tr>
        <tr>
          <td>플레이어 이름</td>
          <td colspan="3"><input type="text" v-model="addtunePlayerName" /></td>
        </tr>
        <tr>
          <td>스토어</td>
          <td colspan="3" class="field-div">
            <div class="d-flex">
              <input type="text" class="input-first" readonly v-model="companyStoreSid" />
              <input type="text" class="input-last" readonly v-model="companyStoreName" />
              <v-btn small color="primary" @click="showStoreListModal">검색</v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>플레이어 형식</td>
          <td><pull-down :data="addtunePlayerKind" :code="typeCode" @selected="emitType" class="pull-down"></pull-down></td>
          <td>보드 종류</td>
          <td><pull-down :data="addtunePlayerBoardType" :code="boardCode" @selected="emitBoard" class="pull-down"></pull-down></td>
        </tr>
        <tr>
          <td>앱 고유코드</td>
          <td><input type="text" readonly v-model="addtunePlayerAccessSid" /></td>
          <td>화면 회전각도</td>
          <td><input type="text" v-model="addtunePlayerRotation" placeholder="0,90,180,270 입력" /></td>
        </tr>
        <tr>
          <td>기기부팅시<br />자동 앱실행</td>
          <td>
            <v-checkbox v-model="addtunePlayerAutoRunFlag"></v-checkbox>
          </td>
          <td>볼륨</td>
          <td><input type="text" v-model="addtunePlayerAudioVolume" placeholder="0~10 입력" /></td>
        </tr>
        <tr>
          <td>재부팅 요일</td>
          <td><input type="text" v-model="addtunePlayerRebootingDay" placeholder="0:월 ~ 6:일,  7: 매일" /></td>
          <td>재부팅 시간</td>
          <td><input type="text" v-model="addtunePlayerRebootingTime" placeholder="00:00:00 형식" /></td>
        </tr>
        <tr>
          <td>업데이트 간격</td>
          <td colspan="3">
            <v-slider v-model="addtunePlayerContentUpdateInterval" step="1" max="8" thumb-label ticks></v-slider>
          </td>
        </tr>
        <tr>
          <td>커스텀 로고 파일</td>
          <td colspan="3">
            <div>
              <!--              <a-->
              <!--                @click="fileDownload({ id: files.fileSid, name: files.fileStorageFileName, fileExt: files.fileExt })"-->
              <!--                v-if="files.fileStorageFileName !== ''"-->
              <!--                >{{ files.fileStorageFileName }}</a-->
              <!--              ><span v-if="files.fileStorageFileName !== ''"><v-icon @click="confirmPhoto(files.fileSid)">mdi-close-circle</v-icon></span>-->
            </div>
            <div><file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload></div>
          </td>
        </tr>
      </table>
    </div>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </div>
</template>

<script>
import { getPopupOpt } from "@/utils/modal";
import PullDown from "@/components/form/PullDown.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
import deleteMixin from "@/mixins/delete";
import fileUploadMixin from "@/mixins/fileUpload";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import storeListModal from "@/components/modal/common/StoreList";
export default {
  components: { PullDown, FileUpload, alim, confirm },
  mixins: [loading, alimMixin, deleteMixin, fileUploadMixin],
  props: ["reset"],
  data() {
    return {
      statusCode: "SYS22811B007",
      typeCode: "SYS22811B003",
      boardCode: "SYS22811B005",
      addtunePlayerStatus: "",
      addtunePlayerSid: "",
      addtunePlayerName: "",
      companyStoreSid: "",
      companyStoreName: "",
      addtunePlayerKind: "",
      addtunePlayerBoardType: "",
      addtunePlayerAudioVolume: "",
      addtunePlayerAutoRunFlag: false,
      autoRunFlag: "",
      addtunePlayerRotation: "",
      addtunePlayerAccessSid: "",
      addtunePlayerContentUpdateInterval: 0,
      addtunePlayerRebootingTime: "",
      addtunePlayerRebootingDay: "",
      files: {
        fileStorageFileName: "",
      },
      channeltuneFiles: [],
    };
  },
  computed: {
    ...mapGetters("common", ["fileDeleteResult"]),
    ...mapGetters("player", ["selectPlayerId", "cmsPlayerDetail", "cmsPlayerDelete"]),
  },
  watch: {
    reset() {
      this.clear();
    },
    selectPlayerId() {
      this.detail();
    },
    cmsPlayerDetail() {
      console.log("실행");
      this.detail();
    },
  },
  mounted() {
    this.selectPlayerId && this.detail();
  },
  methods: {
    //select
    emitStatus(data) {
      this.addtunePlayerStatus = data.sysCodeSid;
    },
    emitType(data) {
      this.addtunePlayerKind = data.sysCodeSid;
    },
    emitBoard(data) {
      this.addtunePlayerBoardType = data.sysCodeSid;
    },
    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    storeUpdate({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;
    },
    //상세 정보
    async detail() {
      this.tabActive = "playerStatus";
      if (this.cmsPlayerDetail.channeltuneApiResult) {
        const res = this.cmsPlayerDetail.channeltuneApiResult.cmsPlayer;
        this.addtunePlayerAccessSid = res.addtunePlayerAccessSid;
        this.addtunePlayerAppCode = res.addtunePlayerAppCode;
        this.addtunePlayerAppVersion = res.addtunePlayerAppVersion;
        this.addtunePlayerAudioVolume = res.addtunePlayerAudioVolume;
        this.addtunePlayerBoardType = res.addtunePlayerBoardType;
        this.addtunePlayerBoardTypeName = res.addtunePlayerBoardTypeName;
        this.addtunePlayerCustomLogo = res.addtunePlayerCustomLogo;
        this.addtunePlayerKind = res.addtunePlayerKind;
        this.addtunePlayerKindName = res.addtunePlayerKindName;
        this.addtunePlayerLifeDateTime = res.addtunePlayerLifeDateTime;
        this.addtunePlayerLifeFlag = res.addtunePlayerLifeFlag;
        this.addtunePlayerMacAddress = res.addtunePlayerMacAddress;
        this.addtunePlayerName = res.addtunePlayerName;
        this.addtunePlayerRebootingDay = res.addtunePlayerRebootingDay;
        this.addtunePlayerRebootingTime = res.addtunePlayerRebootingTime;
        this.addtunePlayerRotation = res.addtunePlayerRotation;
        this.addtunePlayerSid = res.addtunePlayerSid;
        this.addtunePlayerStatus = res.addtunePlayerStatus;
        this.addtunePlayerStatusName = res.addtunePlayerStatusName;
        this.companyStoreSid = res.companyStoreSid;
        this.companyStoreName = res.companyStoreName;
        res.addtunePlayerAutoRunFlag === "Y" ? (this.addtunePlayerAutoRunFlag = true) : (this.addtunePlayerAutoRunFlag = false);
        this.files = res.files;
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.addtunePlayerSid !== "") {
          this.alim("고유 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.addtunePlayerStatus === "" || this.addtunePlayerStatus == null) {
        this.alim("플레이어 상태를 선택 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerName === "" || this.addtunePlayerName == null) {
        this.alim("플레이어 이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyStoreSid === "" || this.companyStoreSid == null) {
        this.alim("스토어를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerKind === "" || this.addtunePlayerKind == null) {
        this.alim("플레이어 형식을 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerBoardType === "" || this.addtunePlayerBoardType == null) {
        this.alim("플레이어 보드종류를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerRotation === "" || this.addtunePlayerRotation == null) {
        this.alim("화면 회전각도를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerAudioVolume === "" || this.addtunePlayerAudioVolume == null) {
        this.alim("볼륨을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerRebootingDay === "" || this.addtunePlayerRebootingDay == null) {
        this.alim("재부팅 요일을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.addtunePlayerRebootingTime === "" || this.addtunePlayerRebootingTime == null) {
        this.alim("재부팅 시간을 입력해 주세요.", this.errorColor);
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
        this.addtunePlayerAutoRunFlag === true ? (this.autoRunFlag = "Y") : (this.autoRunFlag = "N");
        await this.$store.dispatch("player/SET_CMS_PLAYER", {
          addtunePlayerAccessSid: 150,
          addtunePlayerKind: this.addtunePlayerKind,
          addtunePlayerName: this.addtunePlayerName,
          companyStoreSid: this.companyStoreSid,
          addtunePlayerBoardType: this.addtunePlayerBoardType,
          addtunePlayerStatus: this.addtunePlayerStatus,
          addtunePlayerAutoRunFlag: this.autoRunFlag,
          addtunePlayerAudioVolume: this.addtunePlayerAudioVolume,
          addtunePlayerRotation: this.addtunePlayerRotation,
          addtunePlayerRebootingDay: this.addtunePlayerRebootingDay,
          addtunePlayerRebootingTime: this.addtunePlayerRebootingTime,
          addtunePlayerContentUpdateInterval: this.addtunePlayerContentUpdateInterval,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.player.channeltuneApiResult.errorCode == 200) {
          this.alim("플레이어가 추가 되었습니다.", this.successColor);
          this.$emit("listReload", 0);
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
          this.$emit("listReload", 2);
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
            await this.$store.dispatch("player/SET_CMS_PLAYER_DELETE", this.addtunePlayerSid);
            if (this.cmsPlayerDelete.channeltuneApiResult.errorCode == 200) {
              this.$emit("listReload", 0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.cmsPlayerDelete.channeltuneApiResult.errorMessage, this.errorColor);
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
      this.addtunePlayerStatus = "";
      this.addtunePlayerSid = "";
      this.addtunePlayerName = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.addtunePlayerKind = "";
      this.addtunePlayerBoardType = "";
      this.addtunePlayerAudioVolume = "";
      this.addtunePlayerAutoRunFlag = false;
      this.addtunePlayerRotation = "";
      this.addtunePlayerAccessSid = "";
      this.addtunePlayerContentUpdateInterval = 0;
      this.addtunePlayerRebootingTime = "";
      this.addtunePlayerRebootingDay = "";
      this.deleteAllFiles = !this.deleteAllFiles;
      this.files = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  & button {
    margin-left: 5px;
  }
}
td::v-deep {
  & .v-input__slot {
    margin: 0;
  }
  & .v-input--selection-controls__ripple {
    display: none;
  }
  & .v-messages {
    display: none;
  }
}
</style>
