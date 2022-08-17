<template>
  <div>
    <h2 class="mt50">현금 투자 에이전트 계약</h2>

    <div class="tbl-div-line mt10"></div>

    <div class="radio_container mt10">
      <p>구분 :&nbsp;&nbsp;&nbsp;</p>
      <div class="radio">
        <v-radio-group v-model="contractCashagentKind">
          <v-radio label="대표" value="REP"></v-radio>
          <v-radio label="멤버" value="MEM"></v-radio>
        </v-radio-group>
      </div>
    </div>

    <div>
      투자 광고 매출액의 구좌수 <input type="text" class="basic w80" v-model="contractCashagentAccounts" />개에 대한
      <input type="text" class="basic w80" v-model="contractCashagentRate" /> %를 수수료로 한다.
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "contractCashagent"],
  data() {
    return {
      contractCashagentKind: "MEM",
      contractCashagentAccounts: "",
      contractCashagentRate: "",
    };
  },
  watch: {
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
    contractCashagent(val) {
      this.getObjData(val);
    },
  },
  mounted() {
    this.getObjData(this.contractCashagent);
  },
  methods: {
    getObjData(obj) {
      if (Object.keys(obj).length !== 0) {
        this.contractCashagentKind = this.contractCashagent.contractCashagentKind;
        this.contractCashagentAccounts = this.contractCashagent.contractCashagentAccounts;
        this.contractCashagentRate = this.contractCashagent.contractCashagentRate;
      }
    },
    returnEmitData() {
      if (this.contractCashagentKind === "" || this.contractCashagentKind === null) {
        return this.$emit("alims", "현금 투자 에이전트 구분을 선택해주세요");
      }
      if (this.contractCashagentAccounts === "" || this.contractCashagentAccounts === null) {
        return this.$emit("alims", "구좌수를 입력해주세요.");
      }
      if (this.contractCashagentRate === "" || this.contractCashagentRate === null) {
        return this.$emit("alims", "수수료 비율을 입력해주세요.");
      }
      this.$emit("watcher", this.$data);
    },
    clear() {
      this.contractCashagentKind = "MEM";
      this.contractCashagentAccounts = "";
      this.contractCashagentRate = "";
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
