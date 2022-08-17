<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="serial-header">
        <h1>시리얼 라벨 인쇄</h1>
        <div class="pdf-group">
          <v-btn @click="changePdfPage(0)" class="turn" :class="{ grey: currentPage == 1 }">
            <span>이전</span>
          </v-btn>
          <span class="page">{{ currentPage }} / {{ pageCount }}</span>
          <v-btn @click="changePdfPage(1)" class="turn" :class="{ grey: currentPage == pageCount }">
            <span>다음</span>
          </v-btn>
        </div>
      </div>
    </template>

    <template slot="body">
      <section class="table-section">
        <table width="100%" class="tbl-reg column2 mt0">
          <colgroup>
            <col width="130" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>제품</td>
            <td class="field-div" colspan="3">
              <input type="text" class="input-first" readonly v-model="productionSid" />
              <input type="text" class="input-last" readonly v-model="productName" />
            </td>
          </tr>
          <tr>
            <td>LOT 번호</td>
            <td><input type="text" readonly v-model="productionLotNumbr" /></td>
          </tr>
          <tr>
            <td>제품 수량</td>
            <td><input type="text" readonly v-model="productionEnteringAmount" /></td>
          </tr>
        </table>
      </section>
      <div class="pdf-div">
        <pdf
          :src="pdfUrl"
          :page="currentPage"
          ref="pdfComponent"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @progress="loadedRatio = $event"
          @loaded="loadPdfHandler"
        ></pdf>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>

    <template slot="footer">
      <div class="btn-group v-application">
        <v-btn small class="mr5" @click="close">닫기</v-btn>
        <v-btn small class="mr5 pt5" color="error" :href="pdfUrl" download>다운로드</v-btn>
        <v-btn small class="mr5" color="success" @click="$refs.pdfComponent.print()">프린트</v-btn>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import pdf from "vue-pdf";
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import deleteMixin from "@/mixins/delete.js";
import alim from "@/components/dialog/Alim";
import alimMixin from "@/mixins/alim";
export default {
  components: { modalWrap, pdf, alim },
  // id: productionSid
  mixins: [loading, deleteMixin, alimMixin],
  props: ["id"],
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      loadedRatio: 0,

      pdfUrl: "",
      productionSid: "",
      productionEnteringAmount: "",
      productionLotNumbr: "",
      productionTransSid: "",
      productName: "",
    };
  },
  computed: {
    ...mapGetters("assetProduct", ["getProductionPrintDetail"]),
  },
  mounted() {
    this.productionSid = this.id;
    bus.$emit("start:spinner");
    this.reload();
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONPRINT_DETAIL", this.productionSid);
        if (this.getProductionPrintDetail.channeltuneApiResult.errorCode == 200) {
          const production = this.getProductionPrintDetail.channeltuneApiResult.productionPrint;
          this.productionSid = production.productionSid;
          this.productionEnteringAmount = production.productionEnteringAmount;
          this.productionLotNumbr = production.productionLotNumbr;
          this.productionTransSid = production.productionTransSid;
          this.productName = production.productName;
          this.pdfUrl = `${process.env.VUE_APP_API}/productionSerialLabelPdf/${this.productionTransSid}`;
        } else {
          this.alim(this.getProductionPrintDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
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
    close() {
      bus.$emit("end:spinner");
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.serial-header {
  display: flex;
  justify-content: space-between;
  & button {
    margin-left: 5px;
  }
}
.pdf-section {
  width: 100%;
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: scroll;
}

.pdf-group {
  margin-right: 50px;
  & .page {
    margin: 0 5px;
  }
}

.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pdf-div {
  height: 600px;
  overflow-y: scroll;
}
</style>
