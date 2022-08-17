<template>
  <modalWrap @close="close" :toggle="toggle">
    <template slot="head">
      <div class="header v-application">
        <h1>광고 영상 포트폴리오</h1>
        <div class="btn-group mr50">
          <v-btn small color="primary" @click="AddSample">등록</v-btn>
          <v-btn small color="warning" @click="sampleUpdate">수정</v-btn>
          <v-btn small color="error" @click="sampleDelete">삭제</v-btn>
          <v-btn small @click="clear">CLEAR</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="border v-application">
        <section class="init-wrap section-box border-outside sec1">
          <table class="tbl-reg column2 tbl mt20 user-list-tbl select-tbl">
            <thead>
              <tr>
                <th>고유코드</th>
                <th>Title</th>
                <th>클라이언트 이름</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="sampleDetail(item.advertisingProductVideoSampleSid)">
                <td>{{ item.advertisingProductVideoSampleSid }}</td>
                <td>{{ item.advertisingProductVideoSampleTitle }}</td>
                <td>{{ item.advertisingProductVideoSampleClientName }}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="init-wrap section-box border-outside sec2">
          <div class="border">
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="130" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>상품 영상 샘플 고유 코드</td>
                <td class="field-div">
                  <input
                    type="text"
                    :value="advertisingProductVideoSampleSid"
                    @input="advertisingProductVideoSampleSid = $event.target.value"
                    readonly
                  />
                </td>
                <td>샘플 영상 타이틀</td>
                <td class="with-btn" colspan="3">
                  <input
                    type="text"
                    class="id"
                    :value="advertisingProductVideoSampleTitle"
                    @input="advertisingProductVideoSampleTitle = $event.target.value"
                  />
                  <v-btn
                    small
                    color="#D0A9F5"
                    dark
                    style="margin-left: 5px"
                    @click="showLanguageSetModalPopup(-1, 'advertisingProductVideoSampleTitle')"
                    >언어셋</v-btn
                  >
                </td>
              </tr>
              <tr>
                <td>샘플 영상 클라이언트 이름</td>
                <td colspan="5" class="with-btn">
                  <input
                    type="text"
                    class="id"
                    :value="advertisingProductVideoSampleClientName"
                    @input="advertisingProductVideoSampleClientName = $event.target.value"
                  />
                  <v-btn
                    small
                    color="#D0A9F5"
                    dark
                    style="margin-left: 5px"
                    @click="showLanguageSetModalPopup(-1, 'advertisingProductVideoSampleClientName')"
                    >언어셋</v-btn
                  >
                </td>
              </tr>
              <tr>
                <td>첨부 영상</td>
                <td colspan="5">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'video/*'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li>
                        <div v-if="message === false" class="thubmnail-type">
                          <img
                            :src="`${url}/video/view/${datalist.videoSid}?videoTransSid=${datalist.videoTransSid}`"
                            @click="
                              __showModalTemplate(
                                require('@/components/modal/common/VideoView.vue'),
                                {
                                  updateData: updateData,
                                  videoSid: datalist.videoSid,
                                  videoTransSid: datalist.videoTransSid,
                                  videoFileName: videoFileName,
                                  reloading: reloading,
                                },
                                1500
                              )
                            "
                          />
                        </div>
                      </li>
                      <div v-if="message === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
            </table>

            <!-- 알럿 -->
          </div>
        </section>
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import loading from "@/mixins/loading";
import confirm from "@/components/dialog/Confirm";
import alimMixin from "@/mixins/alim.js";
import modalMixin from "@/mixins/showModal";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import { getPopupOpt } from "@/utils/modal";
import deleteMixin from "@/mixins/delete.js";
import alim from "@/components/dialog/Alim.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  components: { modalWrap, confirm, alim, FileUpload },
  mixins: [loading, alimMixin, deleteMixin, fileUploadMixin, modalMixin],
  props: ["Sid"],
  data() {
    return {
      advertisingProductVideoSampleSid: "",
      advertisingProductSid: "",
      advertisingProductVideoSampleTitle: "",
      advertisingProductVideoSampleClientName: "",
      page: 1,
      file: [],
      message: true,
      channeltuneFiles: [],
      list: [],
      toggle: false,
      reloading: false,

      videoFileName: "",
      datalist: [],
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("product", [
      "getAdvertisingProductVideoSample",
      "getAdvertisingProductVideoSampleDetail",
      "advertisingProductVideoSampleAdd",
      "advertisingProductVideoSampleUpdate",
      "advertisingProductVideoSampleDelete",
    ]),
  },
  watch: {
    reloading(val) {
      console.log(val);
    },
  },
  mounted() {
    this.advertisingProductSid = this.Sid;
    this.reload(0);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }

      bus.$emit("start:spinner");
      await this.$store.dispatch("product/GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE", {
        size: this.size,
        page: this.page,
        advertisingProductSid: this.Sid,
      });

      const res = this.getAdvertisingProductVideoSample.channeltuneApiResult;
      if (res.errorCode !== 200) {
        this.alim(res.errorMessage, this.errorColor);
        bus.$emit("end:spinner");
        return false;
      }
      this.list = res.advertisingProductVideoSample;
      bus.$emit("end:spinner");
    },
    //샘플 등록
    async AddSample() {
      this.toggle = !this.toggle;
      // await this.$store.dispatch('product/ADVERTISING_PRODUCT_VIDEO_SAMPLE_ADD', {
      // 	advertisingProductSid: this.Sid,
      // 	advertisingProductVideoSampleTitle: this.advertisingProductVideoSampleTitle,
      // 	advertisingProductVideoSampleClientName: this.advertisingProductVideoSampleClientName,
      // 	channeltuneFiles: this.channeltuneFiles,
      // });
      // const res = this.advertisingProductVideoSampleadd.channeltuneApiResult;
      try {
        bus.$emit("start:spinner");
        const res = await this.getApiData("product/ADVERTISING_PRODUCT_VIDEO_SAMPLE_ADD", {
          advertisingProductSid: this.Sid,
          advertisingProductVideoSampleTitle: this.advertisingProductVideoSampleTitle,
          advertisingProductVideoSampleClientName: this.advertisingProductVideoSampleClientName,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (res.channeltuneApiResult.errorCode !== 200) {
          this.toggle = !this.toggle;
          this.alim(res.channeltuneApiResult.errorMessage, this.errorColor);
          return false;
        }
        this.alim(res.channeltuneApiResult.errorMessage, this.successColor);
        this.toggle = !this.toggle;
        this.clear();
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세조회
    async sampleDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE_DETAIL", id);

        const res = this.getAdvertisingProductVideoSampleDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        this.advertisingProductSid = res.advertisingProductVideoSample.advertisingProductSid;
        this.advertisingProductVideoSampleClientName = res.advertisingProductVideoSample.advertisingProductVideoSampleClientName;
        this.advertisingProductVideoSampleSid = res.advertisingProductVideoSample.advertisingProductVideoSampleSid;
        this.advertisingProductVideoSampleTitle = res.advertisingProductVideoSample.advertisingProductVideoSampleTitle;
        this.videoFileName = res.advertisingProductVideoSample.videos[0]?.videoFileName;
        this.datalist = res.advertisingProductVideoSample.videos[0]?.video_trans.find((item) => item.videoTransSort === 200); //이미지 200인 객체 찾기

        this.datalist === undefined ? (this.message = true) : (this.message = false);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //샘플 수정
    async sampleUpdate() {
      this.toggle = !this.toggle;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/ADVERTISING_PRODUCT_VIDEO_SAMPLE_UPDATE", {
          advertisingProductVideoSampleTitle: this.advertisingProductVideoSampleTitle,
          id: this.advertisingProductVideoSampleSid,
          advertisingProductVideoSampleClientName: this.advertisingProductVideoSampleClientName,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.advertisingProductVideoSampleUpdate.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          this.toggle = !this.toggle;
          bus.$emit("end:spinner");
          return false;
        }
        this.alim(res.errorMessage, this.successColor);
        this.toggle = !this.toggle;

        await this.sampleDetail(this.advertisingProductVideoSampleSid);
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //샘플 삭제
    async sampleDelete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/ADVERTISING_PRODUCT_VIDEO_SAMPLE_DELETE", this.advertisingProductVideoSampleSid);

        const res = this.advertisingProductVideoSampleDelete.channeltuneApiResult;
        bus.$emit("end:spinner");
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        this.alim(res.errorMessage, this.successColor);
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.deleteAllChip();
      this.message = true;
      this.advertisingProductVideoSampleSid = "";
      this.advertisingProductSid = "";
      this.advertisingProductVideoSampleTitle = "";
      this.advertisingProductVideoSampleClientName = "";
      this.file = [];
      this.videoFileName = "";
    },

    emitResetConfirm({ del, type }) {
      if (del === "Y" && type === "list") {
        // this.del();
      }
      // this.resetDeleteData();
    },
    updateData() {
      this.message = true;
    },
    async getApiData(URL, data) {
      const url1 = this.urlSplitBeforeSlash(URL);
      const url2 = this.snakeToCamel(URL.toLowerCase());
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch(URL, data);
        return this.$store.getters[`${url1}/${url2}`];
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showLanguageSetModalPopup(id, name) {
      if (this.advertisingProductVideoSampleSid === "") {
        return this.alim("광고영상 샘플을 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "advertisingProductVideoSample",
          tableSid: String(this.advertisingProductVideoSampleSid),
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
    //dispatch 경로 /기준 뒷자리 자르기
    urlSplitAfterSlash(URL) {
      //product/GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE
      const a = URL;
      const reg = /.*\//;
      return a.replace(reg, "");
    },
    urlSplitBeforeSlash(URL) {
      //product/GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE
      const a = URL;
      const reg = /\/.*$/;
      return a.replace(reg, "");
    },
    //소문자로 변환
    lower(URL) {
      const url = this.urlSplitAfterSlash(URL);
      return url.toLowerCase();
    },
    // 스네이크 케이스를 카멜 케이스로 변환하는 함수
    snakeToCamel(s) {
      const url = this.lower(s);
      return url.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
      });
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
.header {
  display: flex;
  justify-content: space-between;

  & .btn-group {
    & button {
      margin-left: 5px;
    }
  }
}
.border {
  display: flex;
  justify-content: space-between;

  & .sec1 {
    width: 30%;
  }

  & .sec2 {
    width: calc(70% - 20px);
  }
}
.save {
  justify-content: flex-end;
}
.with-btn {
  & .id {
    margin-right: 0 !important;
    width: calc(100% - 65.3px) !important;
  }
}
</style>
