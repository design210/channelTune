<template>
  <modalWrap @close="close" :toggle="toggle">
    <template slot="head">
      <div class="header v-application">
        <h1>광고 영상 옵션 등록</h1>
        <div class="btn-group v-application save mr20">
          <v-btn small color="warning" @click="validate">저장</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="border">
        <section class="table-section v-application">
          <table width="100%" class="tbl-reg column2 mt0">
            <colgroup>
              <col width="130" />
              <col width="*" />
              <col width="80" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>상품 옵션 고유코드</td>
              <td class="field-div" colspan="2">
                <input
                  type="text"
                  class="input-first"
                  :value="advertisingProductVideoTransSid"
                  @input="advertisingProductVideoTransSid = $event.target.value"
                  readonly
                />
              </td>
              <td>상품 고유코드</td>
              <td class="field-div" colspan="2">
                <input type="text" class="input-first" :value="advertisingProductSid" @input="advertisingProductSid = $event.target.value" readonly />
              </td>
            </tr>
            <tr>
              <td class="required">영상 상품 자료유형</td>
              <td colspan="2">
                <pull-down
                  :data="advertisingProductVideoShootTypeName"
                  :code="'SYS21C20B001'"
                  @selected="ProductVideoShootTypeProp"
                  class="pull-down"
                ></pull-down>
              </td>
              <td class="required">영상 길이</td>
              <td colspan="2">
                <pull-down-multi
                  ref="pullDownMulti"
                  :data="advertisingProductVideoVideoLengthName"
                  :code="'SYS21C21B002'"
                  @selected="advertisingProductVideoVideoLengthProp"
                  class="pull-down multi"
                  :onlySelectPullDown="true"
                ></pull-down-multi>
                <!-- <pull-down
									:data="advertisingProductVideoVideoLengthName"
									:code="'SYS21C21B002'"
									@selected="advertisingProductVideoVideoLengthProp"
									class="pull-down"
								></pull-down> -->
              </td>
            </tr>
            <tr>
              <td class="required">촬영 제공</td>
              <td colspan="2">
                <input type="text" :value="advertisingProductVideoShoot" @input="advertisingProductVideoShoot = $event.target.value" />
              </td>
              <td>편집 방식</td>
              <td colspan="2">
                <input type="text" :value="advertisingProductVideoEditType" @input="advertisingProductVideoEditType = $event.target.value" />
              </td>
            </tr>
            <tr>
              <td class="required">무료 수정 횟수</td>
              <td colspan="2">
                <input type="text" :value="advertisingProductVideoModification" @input="advertisingProductVideoModification = $event.target.value" />
              </td>

              <td>추가 수정 비용</td>
              <td colspan="2">
                <input type="text" :value="advertisingProductVideoPriceEdit" @input="advertisingProductVideoPriceEdit = $event.target.value" />
              </td>
            </tr>
            <tr>
              <td class="required">사운드 포함 여부</td>
              <td colspan="2" class="radio">
                <v-radio-group v-model="advertisingProductVideoSoundFlag">
                  <v-radio label="포함" value="Y"></v-radio>
                  <v-radio label="미포함" value="N"></v-radio>
                </v-radio-group>
              </td>
              <td>언어셋 설정</td>
              <td class="with-btn d-flex">
                <v-select outlined class="select-basic id" v-model="languagebtn" item-text="key" item-value="value" :items="languageSetArr" />
                <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, languagebtn)">언어셋</v-btn>
              </td>
            </tr>
            <tr>
              <td class="required">상품상세 - 수정, 추가진행</td>
              <td colspan="5">
                <textarea :value="advertisingProductVideoAppend" @input="advertisingProductVideoAppend = $event.target.value" />
              </td>
            </tr>
            <tr>
              <td class="required">환불규정</td>
              <td colspan="5">
                <textarea :value="advertisingProductVideoRefundPolicy" @input="advertisingProductVideoRefundPolicy = $event.target.value" />
              </td>
            </tr>
            <tr>
              <td>첨부 영상</td>
              <td colspan="5">
                <div class="file-wrap">
                  <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'video/mp4'" videoType="video"></file-upload>
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
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </section>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import modalMixin from "@/mixins/showModal";
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import PullDownMulti from "@/components/form/PullDownMulti.vue";
import confirm from "@/components/dialog/Confirm";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import { getPopupOpt } from "@/utils/modal";
import alim from "@/components/dialog/Alim.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  components: { modalWrap, PullDown, confirm, alim, FileUpload, PullDownMulti },
  mixins: [loading, alimMixin, deleteMixin, fileUploadMixin, modalMixin],
  props: ["Sid"],
  data() {
    return {
      advertisingProductVideoTransSid: "",
      advertisingProductSid: "",
      advertisingProductVideoShoot: "",
      advertisingProductVideoEditType: "",
      advertisingProductVideoVideoLength: "",
      advertisingProductVideoModification: "",
      advertisingProductVideoPriceEdit: "",
      advertisingProductVideoAppend: "",
      advertisingProductVideoRefundPolicy: "",
      advertisingProductVideoSoundFlag: "N",
      advertisingProductVideoShootType: "",
      advertisingProductVideoShootTypeName: "",
      advertisingProductVideoVideoLengthName: [],
      languagebtn: "",
      languageSetArr: [
        {
          key: "촬영 제공",
          value: "advertisingProductVideoShoot",
        },
        {
          key: "무료 수정 횟수",
          value: "advertisingProductVideoModification",
        },
        {
          key: "사운드 포함 여부",
          value: "advertisingProductVideoSoundFlag",
        },
        {
          key: "상품상세-수정,추가진행",
          value: "advertisingProductVideoAppend",
        },
        {
          key: "환불규정",
          value: "advertisingProductVideoRefundPolicy",
        },
      ],
      message: true,
      videoFileName: "",
      file: [],
      channeltuneFiles: [],
      datalist: [],
      toggle: false,
      img: "",
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("product", ["advertisingProductVideoTransAdd", "getProductTransTransOption"]),
    ...mapGetters("video", ["getVideoView"]),
  },
  created() {
    this.getadvertisingProductVideoTrans();
  },
  mounted() {
    this.advertisingProductSid = this.Sid;
  },
  methods: {
    close() {
      this.$emit("close");
    },

    //옵션 정보 가져오기
    async getadvertisingProductVideoTrans() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/GET_ADVERTISING_PRODUCT_VIDEO_TRANS", this.Sid);

        const res = this.getProductTransTransOption.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.advertisingProductVideoTransSid = res.advertisingProductVideoTrans.advertisingProductVideoTransSid;
        this.advertisingProductSid = res.advertisingProductVideoTrans.advertisingProductSid;
        this.advertisingProductVideoShoot = res.advertisingProductVideoTrans.advertisingProductVideoShoot;
        this.advertisingProductVideoEditType = res.advertisingProductVideoTrans.advertisingProductVideoEditType;
        this.advertisingProductVideoVideoLength = res.advertisingProductVideoTrans.advertisingProductVideoVideoLength;
        this.advertisingProductVideoModification = res.advertisingProductVideoTrans.advertisingProductVideoModification;
        this.advertisingProductVideoPriceEdit = res.advertisingProductVideoTrans.advertisingProductVideoPriceEdit;
        this.advertisingProductVideoAppend = res.advertisingProductVideoTrans.advertisingProductVideoAppend;
        this.advertisingProductVideoSoundFlag = res.advertisingProductVideoTrans.advertisingProductVideoSoundFlag;
        this.advertisingProductVideoRefundPolicy = res.advertisingProductVideoTrans.advertisingProductVideoRefundPolicy;
        this.advertisingProductVideoShootType = res.advertisingProductVideoTrans.advertisingProductVideoShootType;
        this.advertisingProductVideoShootTypeName = res.advertisingProductVideoTrans.advertisingProductVideoShootTypeName;
        this.advertisingProductVideoVideoLengthName = res.advertisingProductVideoTrans.advertisingProductVideoVideoLengthName.split(",");
        this.videoFileName = res.advertisingProductVideoTrans.videos[0]?.videoFileName;
        this.datalist = res.advertisingProductVideoTrans.videos[0]?.video_trans.find((item) => item.videoTransSort === 200); //이미지 200인 객체 찾기

        if (this.datalist === undefined) {
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
    //옵션 등록
    async saveAdVideoOption() {
      this.toggle = !this.toggle;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/ADVERTISING_PRODUCT_VIDEO_TRANS_ADD", {
          advertisingProductSid: this.advertisingProductSid,
          advertisingProductVideoShoot: this.advertisingProductVideoShoot,
          advertisingProductVideoEditType: this.advertisingProductVideoEditType,
          advertisingProductVideoVideoLength: this.advertisingProductVideoVideoLength,
          advertisingProductVideoModification: this.advertisingProductVideoModification,
          advertisingProductVideoPriceEdit: this.advertisingProductVideoPriceEdit,
          advertisingProductVideoSoundFlag: this.advertisingProductVideoSoundFlag,
          advertisingProductVideoAppend: this.advertisingProductVideoAppend,
          advertisingProductVideoRefundPolicy: this.advertisingProductVideoRefundPolicy,
          advertisingProductVideoShootType: this.advertisingProductVideoShootType,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.advertisingProductVideoTransAdd.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.toggle = !this.toggle;
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }
        this.toggle = !this.toggle;
        await this.getadvertisingProductVideoTrans();
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유효성 검사
    validate() {
      if (this.advertisingProductVideoShootTypeName === "" || this.advertisingProductVideoShootTypeName === null) {
        this.alim("자료 유형을 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoVideoLengthName === "" || this.advertisingProductVideoVideoLengthName === null) {
        this.alim("영상 길이를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoShoot === "" || this.advertisingProductVideoShoot === null) {
        this.alim("촬영 제공을 입력해 주세요", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoModification === "" || this.advertisingProductVideoModification === null) {
        this.alim("무료 수정 횟수를 입력해 주세요", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoSoundFlag === "" || this.advertisingProductVideoSoundFlag === null) {
        this.alim("사운드 포함 여부를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoAppend === "" || this.advertisingProductVideoAppend === null) {
        this.alim("상품 상세를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductVideoRefundPolicy === "" || this.advertisingProductVideoRefundPolicy === null) {
        this.alim("환불 규정을 입력해 주세요.", this.errorColor);
        return false;
      }
      this.saveAdVideoOption();
    },
    ProductVideoShootTypeProp(data) {
      this.advertisingProductVideoShootType = data.sysCodeSid;
      this.advertisingProductVideoShootTypeName = data.sysCodeName;
    },
    advertisingProductVideoVideoLengthProp(data) {
      let selectSids = [];
      let selectNames = [];
      data.forEach((ele) => {
        selectSids = [...selectSids, ele.sysCodeSid];
        selectNames = [...selectNames, ele.sysCodeName];
      });
      this.advertisingProductVideoVideoLength = selectSids.join();
      this.advertisingProductVideoVideoLengthName = selectNames;
    },
    showLanguageSetModalPopup(id, name) {
      if (this.advertisingProductVideoTransSid === "") {
        return this.alim("스토어를 선택해주세요", this.errorColor);
      }
      if (this.languagebtn === "") {
        return this.alim("설정할 언어셋을 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "advertisingProductVideoTrans",
          tableSid: String(this.advertisingProductVideoTransSid),
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
    emitResetConfirm({ del, type }) {
      if (del === "Y" && type === "list") {
        // this.del();
      }
      // this.resetDeleteData();
    },
    toggles() {
      this.toggle = !this.toggle;
    },

    updateData() {
      this.message = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.save {
  justify-content: flex-end;
}

.vvvv {
  position: absolute;
  width: 100%;
  height: 100%;
}
.with-btn::v-deep {
  & .id {
    margin-right: 0 !important;
    width: calc(100% - 30px) !important;
  }
}
</style>
