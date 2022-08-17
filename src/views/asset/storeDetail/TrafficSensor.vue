<template>
  <div class="traffic mt20 store-info-elem">
    <div>
      <h4>∙ Traffic Sensor</h4>
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
        <td>모델명</td>
        <td><input :readonly="read" type="text" v-model="sensorModelName" /></td>
        <td>시리얼번호</td>
        <td><input :readonly="read" type="text" v-model="sensorSerialNumber" /></td>
        <td>LAN</td>
        <td><input :readonly="read" type="text" v-model="sensorLan" /></td>
      </tr>
      <tr>
        <td>MAC</td>
        <td><input :readonly="read" type="text" v-model="sensorMac" /></td>
        <td>IP주소</td>
        <td><input :readonly="read" type="text" v-model="sensorIp" /></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      sensorSid: 0,
      sensorModelName: "",
      sensorSerialNumber: "",
      sensorLan: "",
      sensorMac: "",
      sensorIp: "",
      productKind: "",
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
        this.sensorSid = 0;
        this.sensorModelName = "";
        this.sensorSerialNumber = "";
        this.sensorLan = "";
        this.sensorMac = "";
        this.sensorIp = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.sensorSid = this.data.productInstallionStoreInfoSid;
    this.sensorModelName = this.data.modelName;
    this.sensorSerialNumber = this.data.serialNumber;
    this.sensorLan = this.data.lan;
    this.sensorMac = this.data.mac;
    this.sensorIp = this.data.ip;
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
