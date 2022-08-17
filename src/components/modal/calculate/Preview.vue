<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>미리보기</h2>
    </template>
    <template slot="body">
      <div class="wrap">
        <div v-html="html"></div>
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

export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  props: ["html"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  max-height: 700px;
  overflow-y: auto;
}
</style>
