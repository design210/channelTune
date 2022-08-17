<template>
  <div class="router mt20 store-info-elem">
    <div>
      <h4>∙ LTE Router</h4>
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
        <td>SSID</td>
        <td><input :readonly="read" type="text" v-model="routerSsid" /></td>
        <td>PW</td>
        <td><input :readonly="read" type="text" v-model="routerPw" /></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>CTN</td>
        <td><input :readonly="read" type="text" v-model="routerCtn" /></td>
        <td>IMEI</td>
        <td><input :readonly="read" type="text" v-model="routerImei" /></td>
        <td>MAC</td>
        <td><input :readonly="read" type="text" v-model="routerMac" /></td>
      </tr>
      <tr>
        <td>Reboot</td>
        <td><input :readonly="read" type="text" v-model="routerReboot" /></td>
        <td>시리얼번호</td>
        <td><input :readonly="read" type="text" v-model="routerSerialNumber" /></td>
      </tr>
      <tr>
        <td>VPN</td>
        <td><input :readonly="read" type="text" v-model="routerVpn" /></td>
        <td>VPN ID</td>
        <td><input :readonly="read" type="text" v-model="routerVpnId" /></td>
        <td>VPN PW</td>
        <td><input :readonly="read" type="text" v-model="routerVpnPw" /></td>
      </tr>
      <tr>
        <td>Projector IP</td>
        <td><input :readonly="read" type="text" v-model="routerProjectorIp" /></td>
        <td>Projector ID</td>
        <td><input :readonly="read" type="text" v-model="routerProjectorId" /></td>
        <td>Projector PW</td>
        <td><input :readonly="read" type="text" v-model="routerProjectorPw" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      routerSid: 0,
      routerSsid: "",
      routerPw: "",
      routerCtn: "",
      routerImei: "",
      routerMac: "",
      routerReboot: "",
      routerSerialNumber: "",
      routerVpn: "",
      routerVpnId: "",
      routerVpnPw: "",
      routerProjectorIp: "",
      routerProjectorId: "",
      routerProjectorPw: "",
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
        this.routerSid = 0;
        this.routerSsid = "";
        this.routerPw = "";
        this.routerCtn = "";
        this.routerImei = "";
        this.routerMac = "";
        this.routerReboot = "";
        this.routerSerialNumber = "";
        this.routerVpn = "";
        this.routerVpnId = "";
        this.routerVpnPw = "";
        this.routerProjectorIp = "";
        this.routerProjectorId = "";
        this.routerProjectorPw = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.routerSid = this.data.productInstallionStoreInfoSid;
    this.routerSsid = this.data.ssid;
    this.routerPw = this.data.pw;
    this.routerCtn = this.data.ctn;
    this.routerImei = this.data.imei;
    this.routerMac = this.data.mac;
    this.routerReboot = this.data.reboot;
    this.routerSerialNumber = this.data.serialNumber;
    this.routerVpn = this.data.vpn;
    this.routerVpnId = this.data.vpnId;
    this.routerVpnPw = this.data.vpnPw;
    this.routerProjectorIp = this.data.projectorIp;
    this.routerProjectorId = this.data.projectorId;
    this.routerProjectorPw = this.data.projectorPw;
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
