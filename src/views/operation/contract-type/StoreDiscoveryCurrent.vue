<template>
  <!-- 스토어 발굴 에이전트 계약(2022년형) -->
  <div>
    <h2 class="mt50">스토어 발굴 에이전트 계약(2022년형)</h2>

    <div class="tbl-div-line mt10"></div>
    <div class="rigths">
      <div>
        <div class="mt10 radio_container">
          <p>구분 :&nbsp;&nbsp;&nbsp;</p>
          <div class="radio">
            <v-radio-group v-model="contractStoreAgent2022Kind">
              <v-radio label="지사장" value="CEO"></v-radio>
              <v-radio label="직원" value="EMP"></v-radio>
            </v-radio-group>
          </div>
        </div>
        <div class="mt10">에이전트 기본급 :&nbsp;&nbsp;&nbsp; <input type="text" class="basic w200" v-model="contractStoreAgent2022Salary" /></div>
      </div>
    </div>
    <h3 class="mt20">1. 스토어 발굴 광고형</h3>
    <div>월 광고 매출 금액의 <input type="text" class="basic w80" v-model="contractStoreAgent2022AdvertisingRate" /> % 를 수수료로 한다.</div>

    <h3 class="mt30">2. 스토어 발굴 판매형</h3>
    <div>월 광고 매출 금액의 <input type="text" class="basic w80" v-model="contractStoreAgent2022SaleRate" /> % 를 수수료로 한다.</div>

    <h3 class="mt30">3. 스토어 발굴 임대형</h3>
    <div>월 광고 매출 금액의 <input type="text" class="basic w80" v-model="contractStoreAgent2022MonthRentRate" /> % 를 수수료로 한다.</div>

    <h3 class="mt30">광고 수주</h3>
    <div class="radios radio">
      <v-radio-group v-model="contractStoreAgent2022AdvertiserKind">
        <v-radio value="A">
          <template slot="label">
            <div>월 광고 매출 금액의 <input type="text" class="basic w80" v-model="contractStoreAgent2022AdvertiserArate" /> % 를 수수료로 한다.</div>
          </template>
        </v-radio>
        <v-radio value="B">
          <template slot="label">
            <div>
              광고금액을 자사(인터브리드) : 계약사의 비율 = 1 :
              <input type="text" class="basic w80" v-model="contractStoreAgent2022AdvertiserBrate" /> 비율로 수익을 분배한다.
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "contractStoreAgent2022"],
  data() {
    return {
      contractStoreAgent2022Kind: "EMP",
      contractStoreAgent2022Salary: "",
      contractStoreAgent2022AdvertisingRate: "",
      contractStoreAgent2022SaleRate: "",
      contractStoreAgent2022MonthRentRate: "",
      contractStoreAgent2022AdvertiserKind: "A",
      contractStoreAgent2022AdvertiserArate: "",
      contractStoreAgent2022AdvertiserBrate: "",
    };
  },
  watch: {
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
    contractStoreAgent2022(val) {
      this.getObjData(val);
    },
    contractStoreAgent2022AdvertiserKind(val) {
      if (val === "A") {
        this.contractStoreAgent2022AdvertiserBrate = "";
      } else if (val === "B") {
        this.contractStoreAgent2022AdvertiserArate = "";
      }
    },
  },
  mounted() {
    this.clear();
  },
  methods: {
    getObjData(obj) {
      if (Object.keys(obj).length !== 0) {
        this.clear();
        this.contractStoreAgent2022Kind = this.contractStoreAgent2022.contractStoreAgent2022Kind;
        this.contractStoreAgent2022Salary = this.contractStoreAgent2022.contractStoreAgent2022Salary;
        this.contractStoreAgent2022AdvertisingRate = this.contractStoreAgent2022.contractStoreAgent2022AdvertisingRate;
        this.contractStoreAgent2022SaleRate = this.contractStoreAgent2022.contractStoreAgent2022SaleRate;
        this.contractStoreAgent2022MonthRentRate = this.contractStoreAgent2022.contractStoreAgent2022MonthRentRate;
        this.contractStoreAgent2022AdvertiserKind = this.contractStoreAgent2022.contractStoreAgent2022AdvertiserKind;
        this.contractStoreAgent2022AdvertiserArate = this.contractStoreAgent2022.contractStoreAgent2022AdvertiserArate;
        this.contractStoreAgent2022AdvertiserBrate = this.contractStoreAgent2022.contractStoreAgent2022AdvertiserBrate;
      }
    },
    returnEmitData() {
      if (this.contractStoreAgent2022Kind === "" || this.contractStoreAgent2022Kind === null) {
        return this.$emit("alims", "에이전트 구분을 선택해주세요");
      }
      if (this.contractStoreAgent2022Salary === "" || this.contractStoreAgent2022Salary === null) {
        return this.$emit("alims", "기본급을 입력해주세요");
      }
      if (this.contractStoreAgent2022AdvertisingRate === "" || this.contractStoreAgent2022AdvertisingRate === null) {
        return this.$emit("alims", "광고형 매출 수수료 비율을 입력해주세요.");
      }
      if (this.contractStoreAgent2022SaleRate === "" || this.contractStoreAgent2022SaleRate === null) {
        return this.$emit("alims", "판매형 매출 수수료 비율을 입력해주세요.");
      }
      if (this.contractStoreAgent2022MonthRentRate === "" || this.contractStoreAgent2022MonthRentRate === null) {
        return this.$emit("alims", "임대형 매출 수수료 비율을 입력해주세요.");
      }
      if (this.contractStoreAgent2022AdvertiserKind === "" || this.contractStoreAgent2022AdvertiserKind === null) {
        return this.$emit("alims", "광고 수주를 선택해주세요.");
      }

      if (this.contractStoreAgent2022AdvertiserKind === "A") {
        if (this.contractStoreAgent2022AdvertiserArate === "" || this.contractStoreAgent2022AdvertiserArate === null) {
          return this.$emit("alims", "광고 매출액의 매출 수수료 비율을 입력해주세요");
        }
      } else {
        if (this.contractStoreAgent2022AdvertiserBrate === "" || this.contractStoreAgent2022AdvertiserBrate === null) {
          return this.$emit("alims", "광고 매출액의 수익 배분 비율을 입력해주세요");
        }
      }

      this.$emit("watcher", this.$data);
    },
    clear() {
      this.contractStoreAgent2022Kind = "EMP";
      this.contractStoreAgent2022Salary = "";
      this.contractStoreAgent2022AdvertisingRate = "";
      this.contractStoreAgent2022SaleRate = "";
      this.contractStoreAgent2022MonthRentRate = "";
      this.contractStoreAgent2022AdvertiserKind = "A";
      this.contractStoreAgent2022AdvertiserArate = "";
      this.contractStoreAgent2022AdvertiserBrate = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.radio_container {
  display: flex;
  & p {
    width: 78px;
    position: relative;
    text-align: right;
    top: 3px;
  }
}
.radios::v-deep {
  & .v-input--radio-group__input {
    display: block !important;
  }
}
</style>
