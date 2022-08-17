<template>
  <div>
    <h2 class="mt50">스토어 발굴 에이전트 계약(과거)</h2>
    <div class="tbl-div-line mt10"></div>
    <h3 class="mt20">1. 광고형</h3>
    <div>광고 매출액의 <input type="text" class="basic w80" v-model="contractStoreAgent_advertisingRate" /> % 를 수수료로 지급 한다</div>
    <div>
      공급하는 시공 완료일 기준으로 매월 20일 이전이면 <input type="text" class="basic w50" v-model="contractStoreAgent_advertisingMonth1" /> 개월 후
      매월 <input type="text" class="basic w50" v-model="contractStoreAgent_advertisingDay1" /> 일 이며 20일 이후이면
      <input type="text" class="basic w80" v-model="contractStoreAgent_advertisingMonth2" /> 개월 후 매월
      <input type="text" class="basic w50" v-model="contractStoreAgent_advertisingDay2" /> 일에 지급한다.
    </div>
    <h3 class="mt30">2. 판매형</h3>
    <div>상품 매출의 <input type="text" class="basic w80" v-model="contractStoreAgent_saleRate" /> % 를 수수료로 지급 한다</div>
    <div>
      수수료 지금 기한은 상품 매출 입금일이 당월 20일 이전이면 당월
      <input type="text" class="basic w50" v-model="contractStoreAgent_saleDay1" /> 일 이며 20일 이후이면 익월
      <input type="text" class="basic w50" v-model="contractStoreAgent_saleDay2" /> 일에 지급한다.
    </div>
    <h3 class="mt30">3. 임대형</h3>
    <div>임대 매출의 <input type="text" class="basic w80" v-model="contractStoreAgent_monthRentRate" /> % 를 수수료로 지급 한다</div>
    <div>
      수수료 지급은 임대금 결제가 이루어진 날을 기준으로 매월
      <input type="text" class="basic w50" v-model="contractStoreAgent_monthRentDay1" /> 일에 지급한다.
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "contractStoreAgent"],
  data() {
    return {
      contractStoreAgent_saleRate: "",
      contractStoreAgent_saleDay1: "",
      contractStoreAgent_saleDay2: "",
      contractStoreAgent_monthRentRate: "",
      contractStoreAgent_monthRentDay1: "",
      contractStoreAgent_advertisingRate: "",
      contractStoreAgent_advertisingMonth1: "",
      contractStoreAgent_advertisingDay1: "",
      contractStoreAgent_advertisingMonth2: "",
      contractStoreAgent_advertisingDay2: "",
    };
  },
  watch: {
    status(val) {
      if (val) {
        return this.retunEmitData();
      }
    },
    contractStoreAgent(val) {
      this.getObjData(val);
    },
  },
  mounted() {
    this.clear();
    this.getObjData(this.contractStoreAgent);
  },
  methods: {
    retunEmitData() {
      if (this.contractStoreAgent_advertisingRate === "" || this.contractStoreAgent_advertisingRate === null) {
        return this.$emit("alims", "광고 매출액 수수료 비율을 입력해주세요.");
      }
      if (this.contractStoreAgent_advertisingMonth1 === "" || this.contractStoreAgent_advertisingMonth1 === null) {
        return this.$emit("alims", "20일 이전 수수료 지급 개월 수를 입력해주세요.");
      }
      if (this.contractStoreAgent_advertisingDay1 === "" || this.contractStoreAgent_advertisingDay1 === null) {
        return this.$emit("alims", "20일 이전 수수료 지급일을 입력해주세요.");
      }
      if (this.contractStoreAgent_advertisingMonth2 === "" || this.contractStoreAgent_advertisingMonth2 === null) {
        return this.$emit("alims", "20일 이후 수수료 지급 개월 수를 입력해주세요.");
      }
      if (this.contractStoreAgent_advertisingDay2 === "" || this.contractStoreAgent_advertisingDay2 === null) {
        return this.$emit("alims", "20일 이후 수수료 지급일을 입력해주세요.");
      }
      if (this.contractStoreAgent_saleRate === "" || this.contractStoreAgent_saleRate === null) {
        return this.$emit("alims", "판매형 상품 매출액 지급 수수료를 입력해주세요.");
      }
      if (this.contractStoreAgent_saleDay1 === "" || this.contractStoreAgent_saleDay1 === null) {
        return this.$emit("alims", "20일 이전 수수료 지급기한 날짜를 입력해주세요.");
      }
      if (this.contractStoreAgent_saleDay2 === "" || this.contractStoreAgent_saleDay2 === null) {
        return this.$emit("alims", "20일 이후 수수료 지급기한 날짜를 입력해주세요.");
      }
      if (this.contractStoreAgent_monthRentRate === "" || this.contractStoreAgent_monthRentRate === null) {
        return this.$emit("alims", "임대 매출의 수수료 지급 비율을 입력해주세요.");
      }
      if (this.contractStoreAgent_monthRentDay1 === "" || this.contractStoreAgent_monthRentDay1 === null) {
        return this.$emit("alims", "임대금 수수료 지급기한 날짜를 입력해주세요.");
      }
      this.$emit("watcher", this.$data);
    },
    getObjData(obj) {
      if (Object.keys(obj).length !== 0) {
        this.clear();
        this.contractStoreAgent_saleRate = this.contractStoreAgent.contractStoreAgent_saleRate;
        this.contractStoreAgent_saleDay1 = this.contractStoreAgent.contractStoreAgent_saleDay1;
        this.contractStoreAgent_saleDay2 = this.contractStoreAgent.contractStoreAgent_saleDay2;
        this.contractStoreAgent_monthRentRate = this.contractStoreAgent.contractStoreAgent_monthRentRate;
        this.contractStoreAgent_monthRentDay1 = this.contractStoreAgent.contractStoreAgent_monthRentDay1;
        this.contractStoreAgent_advertisingRate = this.contractStoreAgent.contractStoreAgent_advertisingRate;
        this.contractStoreAgent_advertisingMonth1 = this.contractStoreAgent.contractStoreAgent_advertisingMonth1;
        this.contractStoreAgent_advertisingDay1 = this.contractStoreAgent.contractStoreAgent_advertisingDay1;
        this.contractStoreAgent_advertisingMonth2 = this.contractStoreAgent.contractStoreAgent_advertisingMonth2;
        this.contractStoreAgent_advertisingDay2 = this.contractStoreAgent.contractStoreAgent_advertisingDay2;
      }
    },
    clear() {
      this.contractStoreAgent_saleRate = "";
      this.contractStoreAgent_saleDay1 = "";
      this.contractStoreAgent_saleDay2 = "";
      this.contractStoreAgent_monthRentRate = "";
      this.contractStoreAgent_monthRentDay1 = "";
      this.contractStoreAgent_advertisingRate = "";
      this.contractStoreAgent_advertisingMonth1 = "";
      this.contractStoreAgent_advertisingDay1 = "";
      this.contractStoreAgent_advertisingMonth2 = "";
      this.contractStoreAgent_advertisingDay2 = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
