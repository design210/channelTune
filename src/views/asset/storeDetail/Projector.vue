<template>
  <div class="projector mt20 store-info-elem">
    <div>
      <h4>∙ 프로젝터</h4>
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
        <td>회사</td>
        <td><input :readonly="read" type="text" v-model="projectorCompany" /></td>
        <td>시리얼 번호</td>
        <td><input :readonly="read" type="text" v-model="projectorSerialNumber" /></td>
        <td>MAC</td>
        <td><input :readonly="read" type="text" v-model="projectorMac" /></td>
      </tr>
      <tr>
        <td>모델</td>
        <td colspan="3"><input :readonly="read" type="text" v-model="projectorModel" /></td>
        <td style="padding-right: 0 !important">방식</td>
        <td><input :readonly="read" type="text" v-model="projectorMethod" /></td>
        <td>정적할당IP</td>
        <td><input :readonly="read" type="text" v-model="projectorStaticIp" /></td>
      </tr>
      <tr>
        <td>수량</td>
        <td><input :readonly="read" type="text" v-model="projectorCount" /></td>
        <td>단초점</td>
        <td><input :readonly="read" type="text" v-model="projectorShortThrow" /></td>
        <td>화질</td>
        <td><input :readonly="read" type="text" v-model="projectorQuality" /></td>
      </tr>
      <tr>
        <td>안시</td>
        <td><input :readonly="read" type="text" v-model="projectorAnsi" /></td>
        <td>명암비</td>
        <td><input :readonly="read" type="text" v-model="projectorContrastRatio" /></td>
        <td>NTP</td>
        <td><input :readonly="read" type="text" v-model="projectorNtp" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      projectorSid: 0,
      projectorCompany: "",
      projectorMethod: "",
      projectorMac: "",
      projectorModel: "",
      projectorStaticIp: "",
      projectorCount: "",
      projectorShortThrow: "",
      projectorQuality: "",
      projectorAnsi: "",
      projectorSerialNumber: "",
      projectorContrastRatio: "",
      projectorNtp: "",
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
        this.projectorSid = 0;
        this.projectorCompany = "";
        this.projectorMethod = "";
        this.projectorMac = "";
        this.projectorModel = "";
        this.projectorStaticIp = "";
        this.projectorCount = "";
        this.projectorShortThrow = "";
        this.projectorQuality = "";
        this.projectorAnsi = "";
        this.projectorSerialNumber = "";
        this.projectorContrastRatio = "";
        this.projectorNtp = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.projectorSid = this.data.productInstallionStoreInfoSid;
    this.projectorCompany = this.data.company;
    this.projectorMethod = this.data.method;
    this.projectorMac = this.data.mac;
    this.projectorModel = this.data.model;
    this.projectorStaticIp = this.data.staticIp;
    this.projectorCount = this.data.count;
    this.projectorShortThrow = this.data.shortThrow;
    this.projectorQuality = this.data.quality;
    this.projectorAnsi = this.data.ansi;
    this.projectorSerialNumber = this.data.serialNumber;
    this.projectorContrastRatio = this.data.contrastRatio;
    this.projectorNtp = this.data.ntp;
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
