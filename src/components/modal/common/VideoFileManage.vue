<template>
  <modalWrap @close="$emit('close')" :toggle="toggle">
    <template slot="head">
      <div class="modal-header v-application">
        <h2>Video File 관리</h2>
        <div class="d-flex">
          <div class="btn-content middle" v-if="videoSid !== ''">
            <v-btn small color="primary" @click="convert('SYS21C21B016')">썸네일 이미지 생성</v-btn>
            <v-btn small color="primary" @click="convert('SYS21C21B013')" class="ml5 mr5">영상 소스 생성</v-btn>
          </div>
          <v-btn v-if="videoSid !== ''" small color="warning" class="mr30" @click="customConfirm()">동영상 삭제</v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <div class="desc-content bottom mb15">
        <h4>광고주의 광고 영상 업로드시 유의사항</h4>
        <ul>
          <li>ㆍ광고주의 광고영상 업로드는 1건만 가능 합니다. 기존의 데이터가 있는데 업로드 하게되면 기존 데이터는 삭제됩니다.</li>
          <li>ㆍ영상업로드시 해당영상의 썸네일 이미지와 m3u8영상은 자동 생성됩니다.</li>
          <li>ㆍ썸네일 이미지 생성 및 영상 소스 생성시 기존에 있던 파일은 자동 삭제되고 새로 생성됩니다</li>
        </ul>
      </div>
      <div class="v-application">
        <div class="content">
          <div class="left-section">
            <div class="table-content">
              <table width="100%" class="tbl-reg column2 mt0">
                <colgroup>
                  <col width="120" />
                  <col width="*" />
                  <col width="90" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>비디오 파일 업로드</td>
                  <td colspan="2">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'video/mp4'" videoType="video"></file-upload>
                  </td>
                  <td>
                    <v-btn small color="warning" class="ml5" style="width: 100px" @click="doUpload">파일업로드</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" v-model="videoSid" readonly /></td>
                  <td>테이블명</td>
                  <td><input type="text" v-model="videoTableName" readonly /></td>
                </tr>
                <tr>
                  <td>디스크 드라이버</td>
                  <td><input type="text" v-model="videoDisk" readonly /></td>
                  <td>테이블고유코드</td>
                  <td><input type="text" v-model="videoTableSid" readonly /></td>
                </tr>
                <tr>
                  <td>서버주소</td>
                  <td colspan="3"><input type="text" v-model="videoServer" readonly /></td>
                </tr>
                <tr>
                  <td>원본 업로드 파일명</td>
                  <td colspan="3"><input type="text" v-model="videoFileName" readonly /></td>
                </tr>
                <tr>
                  <td>원본 스토리지 경로</td>
                  <td colspan="3"><input type="text" v-model="videoOriginalStoragePath" readonly /></td>
                </tr>
                <tr>
                  <td>원본 스토리지 파일명</td>
                  <td colspan="3" class="field-div">
                    <input type="text" style="width: calc(100% - 105px)" v-model="videoOriginalStorageFileName" readonly />
                    <v-btn
                      v-if="videoSid !== ''"
                      small
                      color="warning"
                      class="ml5"
                      style="width: 100px"
                      @click="
                        __showModalTemplate(
                          require('@/components/modal/common/VideoView'),
                          { videoSid: videoSid, videoFileName: videoFileName },
                          1000,
                        )
                      "
                    >
                      영상PLAY
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>원본 파일 확장자</td>
                  <td><input type="text" v-model="videoExt" readonly /></td>
                  <td>파일순서</td>
                  <td><input type="text" v-model="videoSort" readonly /></td>
                </tr>
              </table>
            </div>
          </div>

          <div class="right-section">
            <div class="table-content">
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="80" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" v-model="videoTransSid" readonly /></td>
                  <td>디스크 드라이버</td>
                  <td><input type="text" v-model="videoTransDisk" readonly /></td>
                </tr>
                <tr>
                  <td>파일구분</td>
                  <td colspan="3">
                    <input type="text" v-model="videoTransKindName" readonly class="view" />
                    <v-btn
                      v-if="videoTransSid"
                      small
                      color="warning"
                      class="ml5"
                      @click="
                        __showModalTemplate(
                          require('@/components/modal/common/VideoView'),
                          {
                            videoSid: videoSid,
                            videoTransSid: videoTransSid,
                            videoFileName: videoTransStorageFileName,
                            viewType: videoTransKind === 'SYS21C21B016' ? 'thumbnail' : 'video',
                          },
                          1000,
                        )
                      "
                    >
                      {{ videoTransKind === "SYS21C21B016" ? "이미지보기" : "영상보기" }}
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td>서버주소</td>
                  <td colspan="3"><input type="text" v-model="videoTransServer" readonly /></td>
                </tr>
                <tr>
                  <td>경로</td>
                  <td colspan="3"><input type="text" v-model="videoTransStoragePath" readonly /></td>
                </tr>
                <tr>
                  <td>파일명</td>
                  <td colspan="3"><input type="text" v-model="videoTransStorageFileName" readonly /></td>
                </tr>
                <tr>
                  <td>원본파일 확장자</td>
                  <td><input type="text" v-model="videoTransExt" readonly /></td>
                  <td>파일순서</td>
                  <td><input type="text" v-model="videoTransSort" readonly /></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 사진파일 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="confirmDelete"></confirm>
      </div>
      <table class="tbl user-list-tbl select-tbl mt20" v-if="list.length > 0">
        <caption>
          광고주 광고영상
        </caption>
        <colgroup>
          <col width="120" />
          <col width="150" />
          <col width="*" />
          <col width="*" />
        </colgroup>
        <thead>
          <tr>
            <th>고유코드</th>
            <th>파일구분</th>
            <th>파일경로</th>
            <th>파일명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index" @click="getTransDetail(item.videoTransSid)">
            <td>{{ item.videoTransSid }}</td>
            <td class="left">{{ item.videoTransKindName }}</td>
            <td class="left">{{ item.videoTransStoragePath }}</td>
            <td class="left">{{ item.videoTransStorageFileName }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import modalMixin from "@/mixins/showModal";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import fileUpload from "@/components/form/FileUpload";
import fileUploadMixin from "@/mixins/fileUpload";
import confirm from "@/components/dialog/Confirm";
import deleteMixin from "@/mixins/delete";
import responseMixin from "@/mixins/response";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, alim, fileUpload, confirm },
  mixins: [alimMixin, fileUploadMixin, modalMixin, deleteMixin, responseMixin, loading],
  // sid, tableName으로 video file 상세정보를 갖고옴
  props: {
    ids: {
      type: Number,
      default: 0,
    },
    tableName: {
      type: String,
      default: "",
    },
    kindCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //게시물 설정
      list: [],

      // 업로드 파일설정
      channeltuneFiles: [],
      toggle: false,

      // video detail data
      videoTableSid: "",
      videoSid: "",
      videoTableName: "",
      videoFileName: "",
      videoExt: "",
      videoDisk: "",
      videoKind: "",
      videoKindName: "",
      videoOriginalStoragePath: "",
      videoOriginalStorageFileName: "",
      videoServer: "",
      videoSort: "",

      // video trans detail
      videoTransSid: "",
      videoTransDisk: "",
      videoTransExt: "",
      videoTransKind: "",
      videoTransKindName: "",
      videoTransStoragePath: "",
      videoTransStorageFileName: "",
      videoTransServer: "",
      videoTransSort: "",

      confirmTitle: "동영상 삭제 확인",
      confirmText: "동영상을 삭제하시겠습니까?",
    };
  },
  computed: {
    ...mapGetters("common", ["addVideo"]),
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 영상파일 변환(썸네일 이미지, 영상 소스 생성)
    async convert(type) {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/CONVERT_VIDEO", {
          sid: this.videoSid,
          type,
        });

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim(res.errorMessage, this.successColor);
        await this.getDetail();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 영상파일 업로드
    async doUpload() {
      if (this.channeltuneFiles.length === 0) {
        this.alim("파일을 선택하세요.", this.errorColor);
        return false;
      }
      this.toggle = !this.toggle;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/ADD_VIDEO", {
          videoKind: this.kindCode,
          videoTableSid: this.ids,
          videoTableName: this.tableName,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.addVideo.channeltuneApiResult;

        if (parseInt(res.errorCode) !== 200) {
          this.toggle = !this.toggle;
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }
        this.toggle = !this.toggle;
        this.alim(res.errorMessage, this.successColor);
        this.deleteAllChip();
        await this.getDetail();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 삭제확인
    confirmDelete({ del, type }) {
      if (del === "Y" && type === "list") {
        this.doDelete();
      }

      this.resetDeleteData();
    },

    // 영상파일 삭제
    async doDelete() {
      if ((this.videoSid || "") === "") {
        this.alim("삭제할 파일이 없습니다.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/DELETE_VIDEO", this.videoSid);
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim(res.errorMessage, this.successColor);
        this.clear(true);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 영상파일 상세정보
    async getDetail() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/GET_VIDEO_DETAIL", {
          sid: this.ids,
          tableName: this.tableName,
          // sid: '12',
          // tableName: 'advertisingProductVideoTrans',
        });

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        if ((res.video || "") === "") {
          return false;
        }

        const data = res.video;
        this.videoTableSid = data.videoTableSid;
        this.videoSid = data.videoSid;
        this.videoTableName = data.videoTableName;
        this.videoFileName = data.videoFileName;
        this.videoExt = data.videoExt;
        this.videoDisk = data.videoDisk;
        this.videoKind = data.videoKind;
        this.videoKindName = data.videoKindName;
        this.videoOriginalStoragePath = data.videoOriginalStoragePath;
        this.videoOriginalStorageFileName = data.videoOriginalStorageFileName;
        this.videoServer = data.videoServer;
        this.videoSort = data.videoSort;
        this.list = data.video_trans;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // video trans 상세정보
    async getTransDetail(transSid) {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/GET_VIDEO_TRANS_DETAIL", transSid);
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        const data = res.video;
        this.videoTransSid = data.videoTransSid;
        this.videoTransDisk = data.videoTransDisk;
        this.videoTransExt = data.videoTransExt;
        this.videoTransKind = data.videoTransKind;
        this.videoTransKindName = data.videoTransKindName;
        this.videoTransStoragePath = data.videoTransStoragePath;
        this.videoTransStorageFileName = data.videoTransStorageFileName;
        this.videoTransServer = data.videoTransServer;
        this.videoTransSort = data.videoTransSort;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 항목 clear
    clear(includeTrans = false) {
      this.videoTableSid = "";
      this.videoSid = "";
      this.videoTableName = "";
      this.videoFileName = "";
      this.videoExt = "";
      this.videoDisk = "";
      this.videoKind = "";
      this.videoKindName = "";
      this.videoOriginalStoragePath = "";
      this.videoOriginalStorageFileName = "";
      this.videoServer = "";
      this.videoSort = "";
      this.list = [];
      this.deleteAllChip();

      if (includeTrans) {
        this.videoTransSid = "";
        this.videoTransDisk = "";
        this.videoTransExt = "";
        this.videoTransKind = "";
        this.videoTransKindName = "";
        this.videoTransStoragePath = "";
        this.videoTransStorageFileName = "";
        this.videoTransServer = "";
        this.videoTransSort = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.desc-content {
  border: 1px solid #ccc;
  background: #f4f4f4;
  padding: 10px 15px;
  border-radius: 5px;
  & h4 {
    font-size: 1.5rem;
    padding-left: 10px;
  }
  & ul {
    margin-top: 5px;
  }
}
.content {
  display: flex;
  max-height: 600px;
  overflow-y: auto;
  & > div {
    padding: 10px;
  }

  & .left-section {
    & .middle {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  & .view {
    width: calc(100% - 100px) !important;
  }
  & table {
    & td {
      cursor: pointer;
    }
  }
}
</style>
