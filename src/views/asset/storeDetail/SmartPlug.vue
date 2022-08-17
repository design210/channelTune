<template>
  <div class="plug mt20 store-info-elem">
    <div>
      <h4>∙ Smart Plug</h4>
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
        <td>종류</td>
        <td><input :readonly="read" type="text" v-model="plugKind" /></td>
        <td>시리얼번호</td>
        <td><input :readonly="read" type="text" v-model="plugSerialNumber" /></td>
        <td>MAC</td>
        <td><input :readonly="read" type="text" v-model="plugMac" /></td>
      </tr>
      <tr>
        <td>제품명</td>
        <td colspan="3"><input :readonly="read" type="text" v-model="plugProductName" /></td>
        <td>정적할당IP</td>
        <td><input :readonly="read" type="text" v-model="plugStaticIp" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      productKind: "",
      plugSid: 0,
      plugKind: "",
      plugSerialNumber: "",
      plugMac: "",
      plugProductName: "",
      plugStaticIp: "",
    };
  },
  watch: {
    flag(val) {
      if (val) {
        this.returnEmit();
      }
    },
    clearFlag(val) {
      if (val) {
        this.plugSid = 0;
        this.plugKind = "";
        this.plugSerialNumber = "";
        this.plugMac = "";
        this.plugProductName = "";
        this.plugStaticIp = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.plugSid = this.data.productInstallionStoreInfoSid;
    this.plugKind = this.data.kind;
    this.plugSerialNumber = this.data.serialNumber;
    this.plugMac = this.data.mac;
    this.plugProductName = this.data.productName;
    this.plugStaticIp = this.data.staticIp;
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
