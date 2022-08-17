<template>
  <div class="file-add-single">
    <div class="file-wrap big">
      <v-file-input
        prepend-icon=""
        :rules="rules"
        :accept="accept"
        truncate-length="15"
        @change="selectFile"
        :class="{ 'file-select': addClass === true }"
        ref="file"
        id="fileUpload"
        :placeholder="placeholder"
      >
      </v-file-input>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deleteAll", "fileType", "trigger", "placeholder"],
  data() {
    return {
      channeltuneFiles: "",
      addClass: false,
      accept: this.fileType,
      //파일용량
      volume: true,
      rules: [
        files => {
          if (files !== undefined && files !== null) {
            this.volume = true;
            if (files.size > 10000000) {
              this.volume = false;
              this.volumeAlim();
            }
            return true;
          } else {
            return false;
          }
        },
      ],
    };
  },
  watch: {
    deleteAll() {
      this.deleteAllChip();
    },
    channeltuneFiles(data) {
      this.$emit("uploadFiles", data);
    },
    trigger() {
      let fileUpload = document.getElementById("fileUpload");
      if (fileUpload != null) {
        fileUpload.click();
      }
    },
  },
  methods: {
    //파일 첨부
    selectFile(file) {
      this.channeltuneFiles = file;
      this.addClass = true;
    },
    deleteAllChip() {
      this.channeltuneFiles = "";
      document.querySelector(".file-add-single .v-file-input__text").textContent = "";
      document.querySelector(".file-add-single .mdi-close").classList.remove("v-icon--disabled");
    },
    //용량체크 알림
    volumeAlim() {
      alert("용량이 너무 큽니다. 10MB이하로 줄여주세요");
      this.deleteAllChip();
    },
  },
};
</script>

<style lang="scss">
.file-wrap {
  &.big {
    & .v-input__control {
      border: 1px solid #afafaf;
      @include NotoSans(1.5, 400, #333333);
      & .v-input__slot {
        margin-bottom: 0 !important;
        height: 48px !important;
        background: #fff !important ;
        border: 0 !important;
        &:before {
          display: none !important;
          border: 0 !important;
        }
        &:after {
          display: none !important;
          border: 0 !important;
        }
      }
      & .v-text-field__details {
        display: none;
      }
      & .mdi-close {
        display: none;
      }
    }
  }
  & .v-file-input__text--placeholder {
    padding-left: 15px;
    color: #bdbdbd !important;
  }
}
</style>
