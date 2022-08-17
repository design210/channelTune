<template>
  <div>
    <h2 class="mt50">매체사 계약</h2>

    <div class="tbl-div-line mt10"></div>

    <div class="mt10">총 <input type="text" class="basic w50" v-model="contractMediaCount" />&nbsp;개의 매체 보유</div>

    <div class="radio_container mt20">
      <p>구분 :&nbsp;&nbsp;&nbsp;</p>
      <div class="radio">
        <v-radio-group v-model="contractMediaKind">
          <v-radio label="빅데이터 기반 산정한 광고료" value="SYS22504B011"></v-radio>
          <v-radio label="기존 광고료" value="SYS22504B012"></v-radio>
        </v-radio-group>
      </div>
    </div>

    <div class="mt10" v-if="contractMediaKind === 'SYS22504B012'">
      해당 매체사에서 발생된 월 광고매출(부가세 별도)의 <input type="text" class="basic w50" v-model="contractMediaFee" />%를 수수료로 한 광고비를
      지급한다.
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "contractMedia"],
  data() {
    return {
      contractMediaKind: "SYS22504B011",
      contractMediaCount: 0,
      contractMediaFee: 0,
    };
  },
  watch: {
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
    contractMedia(val) {
      this.getObjData(val);
    },
  },
  beforeMount() {
    this.getObjData(this.contractMedia);
  },
  methods: {
    getObjData(obj) {
      if (Object.keys(obj).length !== 0) {
        this.contractMediaKind = this.contractMedia.contractMediaKind;
        this.contractMediaCount = this.contractMedia.contractMediaCount;
        this.contractMediaFee = this.contractMedia.contractMediaFee;
      }
    },
    returnEmitData() {
      if (this.contractMediaCount === "" || this.contractMediaCount === null) {
        return this.$emit("alims", "매체 보유 수를 입력해주세요.");
      }
      if (this.contractMediaKind === "" || this.contractMediaKind === null) {
        return this.$emit("alims", "계약서 구분을 선택해주세요");
      }
      if (this.contractMediaFee === "" || this.contractMediaFee === null) {
        return this.$emit("alims", "수수료 비율을 입력해주세요.");
      }
      this.$emit("watcher", this.$data);
    },
    clear() {
      this.contractMediaKind = "SYS22504B011";
      this.contractMediaCount = 0;
      this.contractMediaFee = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.radio_container {
  display: flex;
  & p {
    position: relative;
    top: 3px;
  }
}
</style>
