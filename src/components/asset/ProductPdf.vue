<template>
  <section>
    <div class="pdf-section section-box border-outside mt20">
      <pdf :src="pdfUrl" :page="currentPage" @num-pages="pageCount = $event" @page-loaded="currentPage = $event" @progress="loadedRatio = $event" @loaded="loadPdfHandler"></pdf>
    </div>
    <div class="btn-group mt10 mb10">
      <v-btn @click="changePdfPage(0)" class="turn" :class="{ grey: currentPage == 1 }">
        <span>이전</span>
      </v-btn>
      <span class="page">{{ currentPage }} / {{ pageCount }}</span>
      <v-btn @click="changePdfPage(1)" class="turn" :class="{ grey: currentPage == pageCount }">
        <span>다음</span>
      </v-btn>
    </div>
  </section>
</template>
<script>
import pdf from "vue-pdf";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { pdf },
  mixins: [loading],
  props: ["pdfUrl"],
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      loadedRatio: 0,
    };
  },
  watch: {
    loadedRatio(newValue) {
      if (parseInt(newValue) == 1) {
      }
    },
  },
  mounted() {
    bus.$emit("start:spinner");
  },
  methods: {
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf loading time
    loadPdfHandler() {
      bus.$emit("end:spinner");
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="scss">
.pdf-section {
  width: 100%;
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: scroll;
}
</style>
