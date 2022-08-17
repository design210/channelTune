<template>
  <div class="film mt20 store-info-elem">
    <div>
      <h4>∙ 필름(Film)</h4>
    </div>
    <table width="100%" class="tbl-reg column2 mt10">
      <colgroup>
        <col width="100" />
        <col width="*" />
        <col width="100" />
        <col width="*" />
        <col width="100" />
        <col width="*" />
      </colgroup>
      <tr>
        <td>가로사이즈(M)</td>
        <td><input :readonly="read" type="number" v-model="filmWidth" /></td>
        <td>Qty</td>
        <td><input :readonly="read" type="text" v-model="filmQty" /></td>
        <td>색상</td>
        <td><input :readonly="read" type="text" v-model="filmColor" /></td>
      </tr>
      <tr>
        <td>세로사이즈(M)</td>
        <td><input :readonly="read" type="number" v-model="filmHeight" /></td>
        <td>면적(sq.m)</td>
        <td><input :readonly="read" type="number" v-model="filmArea" /></td>
        <td>점착/노말</td>
        <td><input :readonly="read" type="text" v-model="filmCohesion" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      filmSid: 0,
      filmWidth: "",
      filmQty: "",
      filmColor: "",
      filmHeight: "",
      filmArea: "",
      filmCohesion: "",
      productKind: "",
    };
  },
  watch: {
    flag(val) {
      if (val) {
        this.returnEmit();
      }
    },
    filmWidth(val) {
      this.filmArea = val * this.filmHeight * this.filmQty;
    },
    filmHeight(val) {
      this.filmArea = val * this.filmWidth * this.filmQty;
    },
    filmQty(val) {
      this.filmArea = val * this.filmWidth * this.filmHeight;
    },
    filmArea(val) {
      if (typeof val === "number") {
        this.filmArea = val.toFixed(2);
      }
    },
    clearFlag(val) {
      if (val) {
        this.filmSid = 0;
        this.filmWidth = "";
        this.filmQty = "";
        this.filmColor = "";
        this.filmHeight = "";
        this.filmArea = "";
        this.filmCohesion = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.filmSid = this.data.productInstallionStoreInfoSid;
    this.filmWidth = this.data.width;
    this.filmQty = this.data.qty;
    this.filmColor = this.data.color;
    this.filmHeight = this.data.height;
    this.filmArea = this.data.area;
    this.filmCohesion = this.data.cohesion;
    this.productKind = this.data.productKind;
  },
  methods: {
    returnEmit() {
      this.$emit("emits", this.$data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
