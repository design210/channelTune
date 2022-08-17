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
          <div class="thumbnail mt10">
            <ul v-for="(item, index) in photo" :key="index">
              <li @click="change({ id: item.url, fileExt: item.fileExt, name: item.name })">
                <div class="thubmnail-type" v-if="item.fileExt !== 'pdf'">
                  <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                </div>
              </li>
            </ul>
          </div>
          <div class="btn-group mt10">
            <v-btn small color="error mr5" @click="confirmPhoto" v-if="this.status !== 'SYS21819B005'">삭제</v-btn>
            <v-btn small color="primary mr5" @click="fileDownload({ id: big, fileExt: ext, name: name })">다운로드</v-btn>
          </div>
          <!-- 사진파일 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import confirm from "@/components/dialog/Confirm.vue";
import alim from "@/components/dialog/Alim.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    confirm,
    alim,
  },
  mixins: [fileUploadMixin, alimMixin, deleteMixin, loading],
  props: ["file", "status", "data"],
  data() {
    return {
      //이미지
      big: "",
      photo: [],
      message: false,
      name: "",
      ext: "",

      deleteList: [],
      url: process.env.VUE_APP_API,
    };
  },
  mounted() {
    const photo = [];
    if (this.file !== undefined) {
      this.file.forEach(ele => {
        if (ele.fileExt !== "pdf") {
          photo.push(ele);
        }
      });
      this.photo = photo;
    }
    this.big = this.data.id;
    this.name = this.data.name;
    this.ext = this.data.fileExt;
  },
  methods: {
    change(data) {
      this.big = data.id;
      this.name = data.name;
      this.ext = data.fileExt;
    },
    close() {
      // 썸네일 모달 닫을시 삭제한 목록 보내도록 수정
      this.$attrs.updateData(this.deleteList);
      this.$emit("close");
    },
    //사진파일 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.big);
            this.alim("삭제 되었습니다.", this.successColor);
            this.deleteList = [...this.deleteList, this.big];
            let newList = [];
            await this.photo.forEach(ele => {
              if (ele.url !== this.big) {
                newList.push(ele);
              }
            });
            if (newList.length > 0) {
              this.big = newList[0].url;
              this.message = false;
            } else {
              this.message = true;
            }
            this.photo = newList;
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
    max-height: 615px;
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
