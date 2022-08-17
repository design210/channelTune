<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>PDF</h2>
    </template>
    <template slot="body">
      <div style="height: 400px" class="pb15">
        <vue-pdf :pdf="pdfUrl"></vue-pdf>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import VuePdf from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
export default {
  components: {
    modalWrap,
    VuePdf,
  },
  props: ["pdfUrl"],

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.align {
  justify-content: center;
}

.user-list-tbl {
  & th {
    padding: 0 10px;
  }
  & td {
    cursor: pointer;
  }
  & .sort {
    text-align: left;
  }
}
</style>
