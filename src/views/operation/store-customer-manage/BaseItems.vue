<template>
  <div class="wid">
    <div class="set-left">
      <table width="100%" class="tbl-reg">
        <colgroup>
          <col width="90" />
          <col width="*" />
          <col width="90" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>고유코드</td>
          <td><input type="text" readonly v-model="companyStoreSid" /></td>
          <td class="required pl20">상태</td>
          <td>
            <pull-down :data="companyStoreStatus" :code="storeStatusCode" @selected="companyStoreStatusProp" class="pull-down"></pull-down>
          </td>
        </tr>
        <tr>
          <td class="required">스토어 명</td>

          <td class="field-div" colspan="3">
            <input type="text" class="input-first" v-model="companyStoreName" style="width: calc(100% - 55px) !important" />
            <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, 'companyStoreName')">언어셋</v-btn>
          </td>
        </tr>
        <tr>
          <td>상권 명</td>
          <td colspan="3"><input type="text" v-model="companyStoreZone" /></td>
        </tr>
        <tr>
          <td class="required">스토어 업체</td>
          <td class="field-div" colspan="3">
            <input type="text" class="input-first" readonly v-model="companyStoreCompanySid" />
            <input type="text" class="input-last" readonly v-model="companyStoreCompanyName" />
            <v-btn small color="primary" dark @click="storePopup()" class="mr5">조회</v-btn>
          </td>
        </tr>
        <tr>
          <td class="required">우편번호</td>
          <td class="d-flex">
            <input type="text" v-model="companyStoreZipcode" class="zip zip-status" readonly />
            <v-btn small color="primary" dark @click="showAddressModalPopup()" class="ml5">검색</v-btn>
          </td>
        </tr>
        <tr>
          <td class="required">주소</td>
          <td colspan="3" class="with-btn">
            <input type="text" v-model="companyStoreAddress1" readonly class="zip-status id name" />
            <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, 'companyStoreAddress1')">언어셋</v-btn>
          </td>
        </tr>
        <tr>
          <td class="required">상세 주소</td>
          <td colspan="3" class="with-btn">
            <input type="text" v-model="companyStoreAddress2" class="name id" />
            <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, 'companyStoreAddress2')">언어셋</v-btn>
          </td>
        </tr>
        <tr>
          <td class="required">행정 구역(시,도)</td>
          <td colspan="3">
            <pull-down
              :data="companyStoreAdministrativeZone1"
              :code="zone1"
              :codeReload="codeReload"
              :si="siprop"
              @emitSi="emitSi"
              @selected="companyStoreAdministrativeZoneProp1"
              class="pull-down si"
            ></pull-down>
          </td>
        </tr>
        <tr>
          <td class="required">행정구역(군,구)</td>
          <td colspan="3">
            <pull-down
              :data="companyStoreAdministrativeZone2"
              :code="zone2"
              :codeReload="codeReload"
              :gu="guprop"
              :clear="guClear"
              @emitGu="emitGu"
              @selected="companyStoreAdministrativeZoneProp2"
              class="pull-down gu"
            ></pull-down>
          </td>
        </tr>
        <tr>
          <td class="required">리,동</td>
          <td colspan="3">
            <pull-down
              :data="companyStoreAdministrativeZone3"
              :code="zone3"
              :codeReload="codeReload"
              :dong="dongprop"
              :clear="dongClear"
              @emitDong="emitDong"
              @selected="companyStoreAdministrativeZoneProp3"
              class="pull-down dong"
            ></pull-down>
          </td>
        </tr>
        <tr>
          <td>위도</td>
          <td><input type="text" v-model="companyStoreLatitude" /></td>
          <td class="pl20">경도</td>
          <td><input type="text" v-model="companyStoreLongitude" /></td>
        </tr>
        <tr>
          <td class="required">업종</td>
          <td colspan="3">
            <pull-down :data="companyStoreBusinessType" :code="typeCode" @selected="companyStoreBusinessTypeProp" class="pull-down"></pull-down>
          </td>
        </tr>
        <tr>
          <td>광고 사이즈<br />(가로 cm)</td>
          <td><input type="text" v-model="companyStoreBillboardHorizontal" /></td>
          <td class="pl20">광고 사이즈<br />(세로 cm)</td>
          <td><input type="text" v-model="companyStoreBillboardVertical" /></td>
        </tr>
        <tr>
          <td>광고 사이즈<br />(대각선 inch)</td>
          <td colspan="3"><input type="text" v-model="companyStoreBillboardSize" @focus="sizeReset" /></td>
        </tr>
      </table>
    </div>
    <div class="set-right">
      <table width="100%" class="tbl-reg">
        <tr>
          <td class="file-add">
            <div class="file-wrap">
              <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
              <ul class="thumbnail mt10" v-if="companyStoreSid !== ''">
                <li v-for="(item, index) in file" :key="index">
                  <v-icon @click="deletePhoto(item.url)">mdi-close-circle</v-icon>
                  <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                    <span class="pdf" v-if="item.fileExt === 'pdf'" @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })">{{
                      item.name
                    }}</span>
                    <img
                      v-else
                      :src="`${url}/file/fileView/${item.url}?size=80`"
                      @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                    />
                  </div>
                </li>
                <div v-if="message === true">첨부된 파일이 없습니다.</div>
              </ul>
            </div>
          </td>
        </tr>
      </table>
      <div class="tbl-div-line"></div>
      <table width="100%" class="tbl-reg">
        <colgroup>
          <col width="100" />
          <col width="*" />
        </colgroup>
        <tr>
          <td class="required">담당에이전트</td>
          <td class="field-div">
            <input type="text" class="input-first" readonly v-model="companyStoreAgentSid" />
            <input type="text" class="input-last" readonly v-model="companyStoreAgentName" />
            <v-btn small color="primary" dark @click="agentPopup()" class="mr5">검색</v-btn>
          </td>
        </tr>
        <tr>
          <td>담당자이름</td>
          <td><input type="text" v-model="companyStoreAgentUserName" /></td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td><input type="text" v-model="companyStoreAgentUserHp" /></td>
        </tr>
        <tr>
          <td>비고</td>
          <td class="textarea-space"><textarea v-model="companyStoreMemo"></textarea></td>
        </tr>
      </table>
    </div>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </div>
</template>

<script>
import PullDown from "@/components/form/PullDown.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import companyListModal from "@/components/modal/common/CompanyList";
import loading from "@/mixins/loading";
import fileUploadMixin from "@/mixins/fileUpload";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
import AddressModal from "@/components/modal/common/Address";
import bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
export default {
  components: { PullDown, FileUpload, alim },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["base", "status"],
  data() {
    return {
      companyStoreSid: "",
      companyStoreStatus: "",
      companyStoreStatusName: "",
      companyStoreName: "",
      companyStoreZone: "",
      companyStoreCompanySid: "",
      companyStoreCompanyName: "",
      companyStoreZipcode: "",
      companyStoreAddress1: "",
      companyStoreAddress2: "",
      companyStoreLatitude: "",
      companyStoreLongitude: "",
      companyStoreAdministrativeZone1: "",
      companyStoreAdministrativeZoneName1: "",
      companyStoreAdministrativeZone2: "",
      companyStoreAdministrativeZoneName2: "",
      companyStoreAdministrativeZone3: "",
      companyStoreAdministrativeZoneName3: "",
      companyStoreAgentSid: "",
      companyStoreBusinessTypeName: "",
      companyStoreBusinessType: "",
      companyStoreAgentName: "",
      companyStoreBillboardSize: "",
      companyStoreBillboardHorizontal: "",
      companyStoreBillboardVertical: "",
      guCode: "",
      channeltuneFiles: [],
      dongprop: "",
      companyStoreAgentUserName: "",
      companyStoreAgentUserHp: "",
      guprop: "",
      companyStoreMemo: "",
      dongCode: "",
      codeReload: true,
      siprop: "",
      dongClear: false,
      siCode: "SYS21A15B001",
      guClear: false,
      storeStatusCode: "SYS21A15B014",
      typeCode: "SYS21A15B012",
      url: process.env.VUE_APP_API,

      message: true,
      file: [],
      sensor: {},

      //zone
      zone1: "",
      zone2: "",
      zone3: "",
    };
  },
  computed: {
    ...mapGetters("common", ["setStrativeZoneResult"]),
    sizeCalc() {
      const calc = Math.sqrt(
        this.companyStoreBillboardHorizontal * this.companyStoreBillboardHorizontal +
          this.companyStoreBillboardVertical * this.companyStoreBillboardVertical
      );
      const diagonal = calc / 2.54;
      return diagonal;
    },
  },
  watch: {
    sizeCalc(val) {
      if (!isNaN(val)) {
        this.companyStoreBillboardSize = val;
      }
    },
    companyStoreAdministrativeZoneName1() {
      this.guClear = !this.guClear;
      this.dongClear = !this.dongClear;
    },
    status() {
      this.returnEmitData();
    },
    channeltuneFiles() {
      if (this.channeltuneFiles.length > 0) {
        this.message = false;
      }
      if (this.channeltuneFiles.length === 0) {
        this.message = true;
      }
    },
    base(val) {
      this.companyStoreSid = val.companyStoreSid;
      this.companyStoreStatus = val.companyStoreStatus;
      this.companyStoreStatusName = val.companyStoreStatusName;
      this.companyStoreName = val.companyStoreName;
      this.companyStoreZone = val.companyStoreZone;
      this.companyStoreCompanySid = val.companyStoreCompanySid;
      this.companyStoreCompanyName = val.companyStoreCompanyName;
      this.companyStoreLatitude = val.companyStoreLatitude;
      this.companyStoreLongitude = val.companyStoreLongitude;
      this.companyStoreZipcode = val.companyStoreZipcode;
      this.companyStoreAddress1 = val.companyStoreAddress1;
      this.companyStoreAddress2 = val.companyStoreAddress2;
      this.companyStoreAgentSid = val.companyStoreAgentSid;
      this.companyStoreBusinessTypeName = val.companyStoreBusinessTypeName;
      this.companyStoreBusinessType = val.companyStoreBusinessType;
      this.companyStoreAgentName = val.companyStoreAgentName;
      this.companyStoreAgentUserName = val.companyStoreAgentUserName;
      this.companyStoreAgentUserHp = val.companyStoreAgentUserHp;
      this.companyStoreBillboardSize = val.companyStoreBillboardSize;
      this.companyStoreBillboardHorizontal = val.companyStoreBillboardHorizontal;
      this.companyStoreBillboardVertical = val.companyStoreBillboardVertical;
      this.companyStoreMemo = val.companyStoreMemo;
      this.file = val.file;
      this.message = val.message;
      this.zone1 = "SYS21A15B001"; // 주소 검색시 부모코드
      this.zone2 = val.companyStoreAdministrativeZone1;
      this.zone3 = val.companyStoreAdministrativeZone2;
      this.companyStoreAdministrativeZone1 = val.companyStoreAdministrativeZone1; //화면 표기 값
      this.companyStoreAdministrativeZone2 = val.companyStoreAdministrativeZone2;
      this.companyStoreAdministrativeZone3 = val.companyStoreAdministrativeZone3;

      this.deleteAllChip();
    },
  },
  created() {
    bus.$on("getSensorData", this.getData);
  },
  methods: {
    sizeReset() {
      if (this.companyStoreBillboardHorizontal !== undefined && this.companyStoreBillboardVertical !== undefined) {
        this.companyStoreBillboardHorizontal = "";
        this.companyStoreBillboardVertical = "";
        this.companyStoreBillboardSize = "";
      }
    },
    companyStoreStatusProp(data) {
      this.companyStoreStatus = data.sysCodeSid;
      this.companyStoreStatusName = data.sysCodeName;
    },
    storePopup() {
      this.$modal.show(companyListModal, { update: this.updateStore }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    showAddressModalPopup() {
      this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "560px", "auto", false));
    },
    companyStoreAdministrativeZoneProp1(data) {
      this.companyStoreAdministrativeZone1 = data.sysCodeSid;
      this.companyStoreAdministrativeZoneName1 = data.sysCodeName;
      this.guCode = data.sysCodeSid;
    },
    emitSi(data) {
      this.companyStoreAdministrativeZoneName1 = data.sysCodeName;
      this.companyStoreAdministrativeZone1 = data.sysCodeSid;
      this.guCode = data.sysCodeSid;
      this.z = this.gutemp;
    },
    showLanguageSetModalPopup(id, name) {
      if (this.companyStoreSid === "") {
        return this.alim("스토어를 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "companyStore",
          tableSid: this.companyStoreSid,
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
    async updateZip(data) {
      this.companyStoreZipcode = data.zip;
      this.companyStoreAddress1 = data.addr1;
      this.companyStoreLatitude = data.lat;
      this.companyStoreLongitude = data.lon;

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/STRATIVE_ZONE", {
          zone1: data.sido,
          zone2: data.sigungu,
          zone3: data.dong,
        });
        if (this.setStrativeZoneResult.channeltuneApiResult.errorCode === 200) {
          const res = this.setStrativeZoneResult.channeltuneApiResult.administrativeZone;
          this.zone1 = "SYS21A15B001"; // 주소 검색시 부모코드
          this.zone2 = res.zone1.selected;
          this.zone3 = res.zone2.selected;
          this.companyStoreAdministrativeZone1 = res.zone1.selected; //화면 표기 값
          this.companyStoreAdministrativeZone2 = res.zone2.selected;
          this.companyStoreAdministrativeZone3 = res.zone3.selected;
        } else {
          this.alim(this.setStrativeZoneResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
        this.codeReload = !this.codeReload;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    companyStoreAdministrativeZoneProp2(data) {
      this.companyStoreAdministrativeZone2 = data.sysCodeSid;
      this.dongCode = data.sysCodeSid;
    },
    companyStoreAdministrativeZoneProp3(data) {
      this.companyStoreAdministrativeZone3 = data.sysCodeSid;
    },
    emitGu(data) {
      this.companyStoreAdministrativeZone2 = data.sysCodeSid;
      this.dongCode = data.sysCodeSid;
      this.dongprop = this.dongtemp;
    },
    emitDong(data) {
      this.companyStoreAdministrativeZone3 = data.sysCodeSid;
    },
    companyStoreBusinessTypeProp(data) {
      this.companyStoreBusinessType = data.sysCodeSid;
      this.companyStoreBusinessTypeName = data.sysCodeName;
    },
    agentPopup() {
      this.$modal.show(companyListModal, { update: this.updateAgent }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    updateStore(data) {
      this.companyStoreCompanySid = data.companySid;
      this.companyStoreCompanyName = data.companyName;
    },
    //모달에서 담당 에이전트 선택시
    updateAgent(data) {
      this.companyStoreAgentSid = data.companySid;
      this.companyStoreAgentName = data.companyName;
    },
    clear() {
      this.file = [];
      this.companyStoreSid = "";
      this.companyStoreStatus = "";
      this.companyStoreName = "";
      this.companyStoreStatusName = "";
      this.companyStoreZone = "";
      this.companyStoreLatitude = "";
      this.companyStoreLongitude = "";
      this.companyStoreCompanySid = "";
      this.companyStoreCompanyName = "";
      this.companyStoreZipcode = "";
      this.companyStoreAddress1 = "";
      this.companyStoreAddress2 = "";
      this.companyStoreAdministrativeZoneName1 = "";
      this.companyStoreAdministrativeZoneName2 = "";
      this.companyStoreAdministrativeZoneName3 = "";
      this.companyStoreAdministrativeZone1 = "";
      this.companyStoreAdministrativeZone2 = "";
      this.companyStoreAdministrativeZone3 = "";
      this.companyStoreBusinessTypeName = "";
      this.companyStoreBusinessType = "";
      this.companyStoreBillboardSize = "";
      this.companyStoreAgentSid = "";
      this.companyStoreAgentName = "";
      this.companyStoreAgentUserName = "";
      this.channeltuneFiles = [];
      this.companyStoreAgentUserHp = "";
      this.companyStoreMemo = "";
    },
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    detailUpdate() {
      this.$emit("updates", this.companyStoreSid);
    },
    deletePhoto(url) {
      this.$emit("deletePhoto", url);
    },
    returnEmitData() {
      if (this.companyStoreName == "" || this.companyStoreName == null) {
        return this.$emit("alims", "스토어명을 입력해주세요.");
      }
      if (this.companyStoreStatus == "" || this.companyStoreStatus == null) {
        return this.$emit("alims", "스토어상태를 선택해주세요.");
      }
      if (this.companyStoreCompanySid == "" || this.companyStoreCompanySid == null) {
        return this.$emit("alims", "스토어 업체를 선택해주세요.");
      }
      if (this.companyStoreZipcode == "" || this.companyStoreZipcode == null) {
        return this.$emit("alims", "우편번호를 입력해주세요.");
      }
      if (this.companyStoreAddress2 == "" || this.companyStoreAddress2 == null) {
        return this.$emit("alims", "상세주소를 입력해주세요.");
      }
      if (this.companyStoreAdministrativeZone1 == "" || this.companyStoreAdministrativeZone1 == null) {
        return this.$emit("alims", "행정구역을 선택해주세요.");
      }
      if (this.companyStoreAdministrativeZone2 == "" || this.companyStoreAdministrativeZone2 == null) {
        return this.$emit("alims", "행정구를 선택해주세요.");
      }
      if (this.companyStoreAdministrativeZone3 == "" || this.companyStoreAdministrativeZone3 == null) {
        return this.$emit("alims", "리,동을 선택해주세요.");
      }
      if (this.companyStoreBusinessType == "" || this.companyStoreBusinessType == null) {
        return this.$emit("alims", "업종을 선택해주세요.");
      }
      if (this.companyStoreAgentSid == "" || this.companyStoreAgentSid == null) {
        return this.$emit("alims", "담당 에이전트를 선택해주세요.");
      }
      this.$emit("baseOK", true);
    },
    getData(datas) {
      this.$emit("addMod", {
        channeltuneFiles: this.channeltuneFiles,
        companyStoreBillboardSize: this.companyStoreBillboardSize,
        companyStoreBillboardHorizontal: this.companyStoreBillboardHorizontal,
        companyStoreBillboardVertical: this.companyStoreBillboardVertical,
        companyStoreName: this.companyStoreName,
        companyStoreStatus: this.companyStoreStatus,
        companyStoreZone: this.companyStoreZone,
        companyStoreCompanySid: this.companyStoreCompanySid,
        companyStoreCompanyName: this.companyStoreCompanyName,
        companyStoreZipcode: this.companyStoreZipcode,
        companyStoreAddress1: this.companyStoreAddress1,
        companyStoreAddress2: this.companyStoreAddress2,
        companyStoreAdministrativeZone1: this.companyStoreAdministrativeZone1,
        companyStoreAdministrativeZone2: this.companyStoreAdministrativeZone2,
        companyStoreAdministrativeZone3: this.companyStoreAdministrativeZone3,
        companyStoreLatitude: this.companyStoreLatitude,
        companyStoreLongitude: this.companyStoreLongitude,
        companyStoreBusinessType: this.companyStoreBusinessType,
        companyStoreAgentSid: this.companyStoreAgentSid,
        companyStoreAgentName: this.companyStoreAgentName,
        companyStoreAgentUserName: this.companyStoreAgentUserName,
        companyStoreAgentUserHp: this.companyStoreAgentUserHp,
        companyStoreMemo: this.companyStoreMemo,
        ...datas,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tbl-wrap {
  border: 1px solid #e7e7e7;
  & .overflow {
    max-height: 595px;
    overflow-y: auto;
  }
}
.input-size {
  width: 150px !important;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 175px) !important;
  }
}
.field {
  .wid {
    display: flex;
    justify-content: space-between;
  }
  & .set-left {
    width: 52%;
  }
  & .set-right {
    width: calc(48% - 20px);
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 35% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    margin-left: 1%;
    width: calc(100% - 36%);
    & .border {
      & .header {
        & .search {
          & input[type="text"] {
            border: 1px solid #ccc;
            height: 30px;
            padding: 0 10px;
            width: 200px;
          }
          & button {
            margin-left: 5px;
          }
        }
      }
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.td-overflow {
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
}
.with-btn {
  & .id {
    width: calc(100% - 65.3px) !important;
  }
}
</style>
