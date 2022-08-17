<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>첨부 파일보기</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div class="wrap thumbnail-modal">
          <div class="img-wrap">
            <span v-if="message === false"><img :src="`${url}/file/fileView/${big}`" /></span>
            <span v-else>이미지가 없습니다.</span>
          </div>
          <div class="btn-group mt10">
            <v-btn small color="primary mr5" @click="fileDownload({ id: big, fileExt: ext, name: name })">다운로드</v-btn>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import fileUploadMixin from "@/mixins/fileUpload";
export default {
  components: {
    modalWrap,
  },
  mixins: [fileUploadMixin],
  props: ["data"],
  data() {
    return {
      //이미지
      big: "",
      photo: [],
      message: false,
      name: "",
      ext: "",
      url: process.env.VUE_APP_API,
    };
  },
  mounted() {
    this.big = this.data.id;
    this.name = this.data.name;
    this.ext = this.data.fileExt;
  },
  methods: {
    close() {
      this.$emit("close");
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
