<template>
  <section class="container">
    <div class="title-wrap">
      <h1>광고 캠페인 관리</h1>
    </div>
    <div class="mb10"></div>
    <section class="ad-manage">
      <section class="ad-list section-box border-outside">
        <div class="border">
          <div class="flx">
            <h2>광고 캠페인 리스트</h2>
            <div class="flx">
              <div class="search flx ml20">
                <input type="text" v-model="searchText" class="search-input" @input="searchText = $event.target.value" />
                <v-btn small color="primary" class="btn-search" @click="reload(1)">조회</v-btn>
              </div>
            </div>
          </div>

          <div>
            <table class="tbl mt20 user-list-tbl select-tbl">
              <colgroup>
                <col width="150" />
                <col width="*" />
                <col width="100" />
                <col width="100" />
              </colgroup>
              <thead>
                <tr>
                  <th>광고 캠페인 고유코드</th>
                  <th class="left">광고 캠페인 명</th>
                  <th>캠페인 형식</th>
                  <th>슬롯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="CampaignDetail(item.organizeCampaignSid)">
                  <td>{{ item.organizeCampaignSid }}</td>
                  <td class="left">{{ item.organizeCampaignTitle }}</td>
                  <td>{{ item.organizeCampaignTypeName }}</td>
                  <td>{{ item.organizeCampaignSlot }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="list.length < 1">
                  <td colspan="4">편성 스토어 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
          </div>
        </div>
      </section>

      <section class="ad-list-right init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>항목</h2>
            <div class="btn-group d-flex">
              <div v-if="buySid === null">
                <v-btn small color="primary" @click="validate('add')">등록</v-btn>
                <v-btn small color="warning" @click="validate('update')">수정</v-btn>
                <v-btn small color="error" @click="confirm">삭제</v-btn>
              </div>
              <v-btn small @click="clear">CLEAR</v-btn>
            </div>
          </div>
          <div class="field mt10">
            <table width="100%" class="tbl-reg column2 mt0">
              <colgroup>
                <col width="130" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>광고 캠페인 고유코드</td>
                <td class="field-div">
                  <input type="text" id="sid" class="input-first" readonly v-model="organizeCampaignSid" />
                </td>
                <td>정산 여부</td>
                <td class="radio">
                  <v-radio-group v-model="organizeCampaignSettlementFlag">
                    <v-radio label="정산함" value="SYS22303B002"></v-radio>
                    <v-radio label="정산안함" value="SYS22303B003"></v-radio>
                  </v-radio-group>
                </td>
              </tr>
              <tr>
                <td>광고 캠페인 명</td>
                <td colspan="3"><input type="text" v-model="organizeCampaignTitle" /></td>
              </tr>
              <tr>
                <td>광고 캠페인 형식</td>
                <td>
                  <pull-down :data="organizeCampaignType" :code="statusCode" @selected="organizeCampaignTypeNameProp" class="pull-down"></pull-down>
                </td>
                <td>결제 고유 코드</td>
                <td><input type="text" v-model="buySid" readonly /></td>
              </tr>
              <tr>
                <td>광고편성 슬롯 수</td>
                <td><input type="text" v-model="organizeCampaignSlot" /></td>
              </tr>
            </table>

            <div class="qr_container">
              <table width="100%" class="tbl-reg column2 mt0">
                <colgroup>
                  <col width="130" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>링크 고유코드</td>
                  <td class="field-div">
                    <input type="text" class="input-first" readonly v-model="eventQrSid" />
                  </td>
                  <td class="right" colspan="2">
                    <v-btn small color="primary" class="mr5" @click="addQr">QR 생성</v-btn>
                    <v-btn small color="primary" class="mr5" @click="download">QR 다운로드</v-btn>
                    <v-btn small color="primary" @click="showQrLogModal">캠페인 QR LOG</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>QR 링크 주소</td>
                  <td colspan="3"><input type="text" v-model="eventQrLinkUrl" /></td>
                </tr>
                <tr>
                  <td>QR링크 사용여부</td>
                  <td class="radio">
                    <v-radio-group v-model="eventQrStatus">
                      <v-radio label="사용" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="QR_img mt10">
                    <div class="qri" v-html="qrimg"></div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- <table class="tbl mt20 select-tbl">
							<colgroup>
								<col width="120" />
								<col width="*" />
								<col width="100" />
								<col width="100" />
								<col width="100" />
							</colgroup>
							<thead>
								<tr>
									<th>스토어고유코드</th>
									<th class="left">스토어명</th>
									<th>최대슬롯</th>
									<th>편성슬롯</th>
									<th>스토어 상태값</th>
								</tr>
							</thead>
						</table> -->
          </div>
        </div>

        <!-- 알럿 -->

        <!-- 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      </section>
      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { getPopupOpt } from "@/utils/modal";
import resMixin from "@//mixins/response.js";
import PullDown from "@/components/form/PullDown.vue";
import QRLog from "@/components/modal/ad/QrLog";
export default {
  components: { alim, PullDown, confirm },
  mixins: [loading, alimMixin, deleteMixin, resMixin, fileUploadMixin],
  props: ["size"],
  data() {
    return {
      searchText: "",
      page: 1,
      len: null,
      list: [],
      statusCode: "SYS22211B004",

      organizeCampaignSid: "",
      organizeCampaignTitle: "",
      organizeCampaignType: "",
      organizeCampaignTypeName: "",
      organizeCampaignSettlementFlag: "SYS22303B002",
      organizeCampaignSlot: "",
      buySid: null,
      eventQrStatus: "Y",
      eventQrLinkUrl: "",
      eventQrTitle: "",
      eventQrSid: "",
      qrimg: "",
    };
  },
  computed: {
    ...mapGetters("campaign", ["getCampaignList", "getCampaignDetail", "addCampaign", "updateCampaign", "deleteCampaign"]),
    ...mapGetters("qr", ["QrGenerator", "downLoadQr"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(1);
  },
  methods: {
    // 광고 캠페인 리스트가져오기
    async reload(num) {
      if (num == 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/GET_CAMPAIGN_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getCampaignList.channeltuneApiResult.errorCode === 200) {
          const organizeCampaign = this.getCampaignList.channeltuneApiResult.organizeCampaign;
          this.list = organizeCampaign.data;
          this.len = organizeCampaign.last_page;
        } else {
          this.alim(this.getCampaignList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세보기
    async CampaignDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/GET_CAMPAIGN_LIST_DETAIL", id);
        const res = this.getCampaignDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.organizeCampaignSid = res.organizeCampaign.organizeCampaignSid;
        this.organizeCampaignTitle = res.organizeCampaign.organizeCampaignTitle;
        this.organizeCampaignType = res.organizeCampaign.organizeCampaignType;
        this.organizeCampaignTypeName = res.organizeCampaign.organizeCampaignTypeName;
        this.organizeCampaignSlot = res.organizeCampaign.organizeCampaignSlot;
        this.organizeCampaignSettlementFlag = res.organizeCampaign.organizeCampaignSettlementFlag;
        if (res.organizeCampaign.buySid !== null) {
          this.buySid = res.organizeCampaign.buySid;
        }

        if (res.organizeCampaign.eventQrSid !== null) {
          const qr = res.organizeCampaign.eventQr;
          this.eventQrSid = qr.eventQrSid;
          this.eventQrLinkUrl = qr.eventQrLinkUrl;
          this.eventQrStatus = qr.eventQrStatus;
          this.qrimg = atob(qr.qrCodeImage);
        } else {
          this.qrimg = "";
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    //광고 캠페인 등록
    async campaignRegister() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/ADD_CAMPAIGN", {
          organizeCampaignTitle: this.organizeCampaignTitle,
          organizeCampaignType: this.organizeCampaignType,
          organizeCampaignSlot: this.organizeCampaignSlot,
          organizeCampaignSettlementFlag: this.organizeCampaignSettlementFlag,
        });

        const res = this.addCampaign.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.reload();
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //캠페인 수정
    async campaignModify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/UPDATE_CAMPAIGN", {
          organizeCampaignTitle: this.organizeCampaignTitle,
          organizeCampaignType: this.organizeCampaignType,
          organizeCampaignSlot: this.organizeCampaignSlot,
          organizeCampaignSettlementFlag: this.organizeCampaignSettlementFlag,
          id: this.organizeCampaignSid,
        });

        const res = this.updateCampaign.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.reload();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("campaign/DELETE_CAMPAIGN", this.organizeCampaignSid);
            const res = this.deleteCampaign.channeltuneApiResult;
            if (res.errorCode === 200) {
              this.reload(0);
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim("편성된 캠페인은 삭제할 수 없습니다.", this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    validate(type) {
      if (type === "update") {
        if (this.organizeCampaignSid === null || this.organizeCampaignSid === "") {
          return this.alim("광고 캠페인 고유코드가 없으면 수정이 불가능합니다.", this.errorColor);
        }
      }
      if (this.organizeCampaignTitle === null || this.organizeCampaignTitle === "") {
        return this.alim("광고 캠페인 명을 입력해주세요", this.errorColor);
      }
      if (this.organizeCampaignType === null || this.organizeCampaignType === "") {
        return this.alim("광고 캠페인 형식을 선택해 주세요", this.errorColor);
      }
      if (this.organizeCampaignSlot === null || this.organizeCampaignSlot === "") {
        return this.alim("광고 편성 슬롯 수를 선택해주세요.", this.errorColor);
      }

      if (type === "add") {
        this.campaignRegister();
      } else if (type === "update") {
        this.campaignModify();
      }
    },
    //QR생성
    async addQr() {
      if (this.organizeCampaignSid === null || this.organizeCampaignSid === "") {
        return this.alim("광고 캠페인을 선택해주세요", this.errorColor);
      }
      if (this.eventQrLinkUrl === null || this.eventQrLinkUrl === "") {
        return this.alim("QR링크 주소를 입력해주세요", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("qr/QR_GENERATOR", {
          organizeCampaignSid: this.organizeCampaignSid,
          eventQrLinkUrl: this.eventQrLinkUrl,
          eventQrTitle: this.eventQrLinkUrlventQrTitle,
          eventQrStatus: this.eventQrStatus,
        });

        const res = this.QrGenerator.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.eventQrSid = res.organizeCampaign.eventQrSid;
        this.qrimg = atob(res.organizeCampaign.qrCodeImage);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    organizeCampaignTypeNameProp(data) {
      this.organizeCampaignType = data.sysCodeSid;
      this.organizeCampaignTypeName = data.sysCodeName;
    },
    showQrLogModal() {
      this.$modal.show(QRLog, { eventQrSid: this.eventQrSid }, getPopupOpt("QRLog", "750px", "auto", false));
    },
    async download() {
      try {
        bus.$emit("start:spinner");
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + window.btoa(this.qrimg);
        img.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = 2000;
          canvas.height = 2000;
          var ctxt = canvas.getContext("2d");
          ctxt.fillStyle = "#fff";
          ctxt.fillRect(0, 0, canvas.width, canvas.height);
          ctxt.drawImage(img, 0, 0, 2000, 2000);
          var a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          const data = document.getElementById("sid").value;
          a.download = `${data}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.organizeCampaignSid = "";
      this.organizeCampaignTitle = "";
      this.organizeCampaignType = "";
      this.organizeCampaignTypeName = "";
      this.organizeCampaignSlot = "";
      this.buySid = null;
    },

    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: space-between;
}
.ad-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;

  & .search-box {
    margin: 5px 0;
    display: flex;
    align-items: center;
    & input {
      flex: 1;
      border: 1px solid #000000;
      height: 28px;
      padding: 0 5px;
    }

    & button {
      margin-left: 5px;
    }
  }

  & .ad-list {
    width: 48% !important;
    & .border {
      min-height: 370px;
    }
  }

  & .ad-list-right {
    width: calc(100% - 49%);
  }

  & .btn-group {
    & input {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 10px;
    }
  }

  & .field {
    & .field-div {
      & .location {
        display: flex;
        align-content: center;
        & .pull-down {
          flex: 1;
          width: 130px;
          &:nth-child(2) {
            margin: 0 5px;
          }
        }
        & div {
          display: flex;
          align-items: center;
          & span {
            width: 50px !important;
          }
        }
      }
    }
  }
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.tbl::v-deep {
  & .v-input__slot {
    margin: 0 !important;
  }
  & .v-messages {
    display: none !important;
  }
}
.scr {
  height: 510px;
  overflow: auto;
}
.qr_container {
  margin-top: 10px;
  border-top: 1px dotted #000;
  padding-top: 10px;

  & .QR_img {
    height: 200px;
    border: 1px solid #ccc;
    & .qri {
      text-align: center;
    }
  }
}
</style>
