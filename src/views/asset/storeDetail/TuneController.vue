<template>
  <div class="controller mt10 store-info-elem">
    <div class="print flx">
      <h4>∙ TUNE Controller</h4>
      <v-btn small color="primary mr20" @click="showSerialPrintPopup">제품라벨인쇄</v-btn>
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
        <td>시리얼번호</td>
        <td colspan="3"><input type="text" readonly v-model="controllerproductionTransSerialNo" /></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>제품명</td>
        <td colspan="3"><input type="text" readonly v-model="controllerProductName" /></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>용량(W)</td>
        <td><input :readonly="read" type="text" v-model="controllerWatt" /></td>
        <td>CR Type</td>
        <td><input :readonly="read" type="text" v-model="controllerCrType" /></td>
        <td>스위치</td>
        <td><input :readonly="read" type="text" v-model="controllerSwitch" /></td>
      </tr>
      <tr>
        <td colspan="6">Player(ChannelTune)</td>
      </tr>
      <tr>
        <td>모델명</td>
        <td><input :readonly="read" type="text" v-model="controllerModelName" /></td>
        <td>set-top명</td>
        <td colspan="3"><input :readonly="read" type="text" v-model="controllerSetTopName" /></td>
      </tr>
      <tr>
        <td>MAC</td>
        <td><input :readonly="read" type="text" v-model="controllerMac" /></td>
        <td>IP주소</td>
        <td><input :readonly="read" type="text" v-model="controllerIp" /></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import showPrintModal from "@/components/modal/assets/ProductionSerial";
import { getPopupOpt } from "@/utils/modal";
export default {
  props: ["data", "flag", "clearFlag", "read"],
  data() {
    return {
      controllerSid: 0,
      controllerProductName: "",
      controllerProductionTransSid: "",
      controllerWatt: "",
      controllerCrType: "",
      controllerSwitch: "",
      controllerModelName: "",
      controllerSetTopName: "",
      controllerMac: "",
      controllerIp: "",
      controllerProductionSid: "",
      controllerproductionTransSerialNo: "",
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
        this.controllerSid = 0;
        this.controllerWatt = "";
        this.controllerCrType = "";
        this.controllerSwitch = "";
        this.controllerModelName = "";
        this.controllerSetTopName = "";
        this.controllerMac = "";
        this.controllerIp = "";
        this.productKind = "";
      }
    },
  },
  mounted() {
    this.controllerSid = this.data.productInstallionStoreInfoSid;
    this.controllerProductName = this.data.productName;
    this.controllerProductionTransSid = this.data.productionTransSid;
    this.controllerWatt = this.data.watt;
    this.controllerCrType = this.data.crType;
    this.controllerSwitch = this.data.switch;
    this.controllerModelName = this.data.modelName;
    this.controllerSetTopName = this.data.setTopName;
    this.controllerMac = this.data.mac;
    this.controllerIp = this.data.ip;
    this.controllerProductionSid = this.data.productionSid;
    this.controllerproductionTransSerialNo = this.data.productionTransSerialNo;
    this.productKind = this.data.productKind;
  },
  methods: {
    showSerialPrintPopup() {
      this.$modal.show(showPrintModal, { id: this.controllerProductionSid }, getPopupOpt("showPrintModal", "1000px", "auto", false));
    },
    returnEmit() {
      this.$emit("emits", this.$data);
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: space-between;
}
</style>
