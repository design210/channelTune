<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>첨부 파일보기</h2>
    </template>
    <template slot="body">
      <div>
        <!-- video -->
        <div v-if="viewType === 'video'" class="wrap thumbnail-modal">
          <video-player ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" />
        </div>

        <!-- thumbnail -->
        <div v-else class="view-type-image">
          <img :src="playerOptions.poster" />
        </div>

        <!-- video -->
        <div v-if="viewType === 'video'" class="v-application btn-group mt10">
          <v-btn small color="primary mr5" @click="videoDownload({ id: videoSid, fileExt: 'mp4', name: videoFileName })">다운로드</v-btn>
          <v-btn small color="error" @click="confirmVideo">삭제</v-btn>
        </div>

        <!-- thumbnail -->
        <div v-else class="v-application btn-group mt10">
          <v-btn
            small
            color="primary mr5"
            @click="
              videoDownload({
                id: videoSid,
                fileExt: 'png',
                name: videoFileName,
                transSid: videoTransSid,
              })
            "
          >
            다운로드
          </v-btn>
        </div>

        <!-- 사진파일 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import fileUploadMixin from "@/mixins/fileUpload";
import confirm from "@/components/dialog/Confirm.vue";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, confirm, alim },
  mixins: [fileUploadMixin, alimMixin, deleteMixin, loading],
  props: {
    videoSid: {
      type: String,
      default: "",
    },
    videoTransSid: {
      type: Number,
      default: 0,
    },
    videoFileName: {
      type: String,
      default: "",
    },
    viewType: {
      // 'thumbnail' or 'video'
      type: String,
      default: "video",
    },
  },
  data() {
    return {
      removeCheck: false,
      playerOptions: {
        // videojs options
        height: "528",
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: `${process.env.VUE_APP_API}/video/view/${this.videoSid}`,
          },
        ],
        poster: `${process.env.VUE_APP_API}/video/view/${this.videoSid}?videoTransSid=${this.videoTransSid}`,
      },
    };
  },
  computed: {
    ...mapGetters("video", ["deleteVideo"]),
  },
  methods: {
    close() {
      if (this.removeCheck) {
        this.$attrs.updateData();
      }
      this.$emit("close");
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "video") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("video/DELETE_VIDEO", this.videoSid);
            const res = this.deleteVideo.channeltuneApiResult;
            if (res.errorCode !== 200) {
              this.alim(res.errorMessage, this.errorColor);
            }
            this.removeCheck = true;
            this.alim(res.errorMessage, this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  & .img-wrap {
    max-height: 700px;
    overflow-y: auto;
    text-align: center;
    & img {
      max-width: 100%;
    }
  }
}

.view-type-image {
  display: flex;
  justify-content: center;
  & img {
    max-width: 100%;
  }
}

.btn-group {
  text-align: center;
  justify-content: center;
}

@media (max-width: 800px) {
  .wrap {
    & .img-wrap {
      max-height: 300px;
    }
  }
}
</style>
