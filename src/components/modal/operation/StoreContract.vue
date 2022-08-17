<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>스토어 업체 계약 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
          <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
          <v-btn v-if="!isNaN(contractStoreLinkSid)" small color="error" @click="confirm(contractStoreLinkSid)">삭제</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application store-contract-wrap">
        <section class="section-box">
          <table width="100%" class="tbl-reg">
            <colgroup>
              <col width="80" />
              <col width="*" />
              <col width="90" />
              <col width="*" />
            </colgroup>
            <tr>
              <td class="required">업체 계약 종류</td>
              <td>
                <pull-down :data="contractStoreLinkKind" :code="contractCode" @selected="contractStoreLinkKindNameProp" class="pull-down"></pull-down>
              </td>
              <td class="pl10 required">업체 계약 유형</td>
              <td>
                <pull-down :data="contractStoreLinkType" :code="contractType" @selected="contractTypeProp" class="pull-down"></pull-down>
              </td>
            </tr>
            <tr>
              <td class="required">시작날짜</td>
              <td>
                <date-picker :propdate="contractStoreLinkStartDate" @updateDate="contractStoreLinkStartDateProp" class="modal-date"></date-picker>
              </td>
              <td class="pl10 pt14 required">종료날짜</td>
              <td class="d-flex aaa pt14">
                <date-picker
                  :readOnly="checkToggle"
                  :propdate="contractStoreLinkEndDate"
                  @updateDate="contractStoreLinkEndDateProp"
                  class="modal-date"
                ></date-picker>
                <v-checkbox v-model="contractStoreLinkEndDate" label="상시" value="9999-12-31"></v-checkbox>
              </td>
            </tr>
          </table>
          <div class="tbl-div-line"></div>
          <table width="100%" class="tbl-reg mt0 store-send-time column2 mt20">
            <colgroup>
              <col width="75" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>업체</td>
                <td class="store" colspan="5">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" class="mr5" @click="showModalPopup">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>업체 계약서</td>
                <td class="store" colspan="5" v-if="options.length > 0">
                  <v-select
                    :items="options"
                    item-value="value"
                    item-text="text"
                    v-model="contractSid"
                    outlined
                    class="select-basic"
                    :searchable="false"
                  ></v-select>
                </td>
                <td class="store" colspan="5" v-if="companySid !== '' && options.length < 1">계약서가 없습니다.</td>
                <td class="store" colspan="5" v-if="companySid === ''">업체를 선택해 주세요.</td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 알럿 -->
        <alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import PullDown from "@/components/form/PullDown.vue";
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import companyListModal from "@/components/modal/common/CompanyList";
import { getPopupOpt } from "@/utils/modal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    alim,
    confirm,
    DatePicker,
    PullDown,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["contractStoreLinkSid", "CSid"],
  data() {
    return {
      contractStoreLinkStartDate: "",
      contractStoreLinkEndDate: "",
      companySid: "",
      companyName: "",
      contractStoreLinkKind: "",
      contractCode: "SYS21811B003",
      contractSid: "",
      options: [],
      history: [],
      checkToggle: false,
      page: 1,
      contractType: "", //계약 유형
      typeCode: "",

      companyStoreSid: "",
      contractStoreLinkType: "",
    };
  },
  computed: {
    ...mapGetters("contract", [
      "getCompanyContractList",
      "getHistory",
      "getContractSelectDetail",
      "getContractSelectReg",
      "contractSelectModifyResult",
      "contractSelectDeleteResult",
    ]),
    ...mapGetters("menu", ["getChildSysCode"]),
  },
  watch: {
    companySid(id) {
      this.getContractList(id);
    },
    contractStoreLinkEndDate(val) {
      if (val === "9999-12-31") {
        this.checkToggle = true;
      } else {
        this.checkToggle = false;
      }
    },
    contractStoreLinkKind(val) {
      this.getNextSelectSysCode(val);
    },
  },
  mounted() {
    if (!isNaN(this.contractStoreLinkSid)) {
      this.contractSelect(this.contractStoreLinkSid);
    }
  },
  methods: {
    validate(status) {
      if (this.contractStoreLinkKind === "") {
        this.alim("업체 계약 종류를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.contractTypeSid === "") {
        this.alim("업체 계약 유형을 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.contractStoreLinkStartDate === "") {
        this.alim("시작날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.contractStoreLinkEndDate === "") {
        this.alim("종료날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.companySid === "") {
        this.alim("업체를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.contractSid === "") {
        this.alim("업체 계약서를 선택해주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_SELECT_REG", {
          contractStoreLinkKind: this.contractStoreLinkKind,
          companyStoreSid: this.CSid,
          contractStoreLinkType: this.contractStoreLinkType,
          contractSid: this.contractSid,
          contractStoreLinkStartDate: this.contractStoreLinkStartDate,
          contractStoreLinkEndDate: this.contractStoreLinkEndDate,
        });
        if (this.getContractSelectReg.channeltuneApiResult.errorCode == 200) {
          this.alim("등록 되었습니다.", this.successColor);
          this.$attrs.update();
          setTimeout(() => {
            this.$emit("close");
          }, 2000);
        } else {
          this.alim(this.getContractSelectReg.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_SELECT_MODIFY", {
          contractStoreLinkKind: this.contractStoreLinkKind,
          companyStoreSid: this.CSid,
          contractStoreLinkType: this.contractStoreLinkType,
          contractSid: this.contractSid,
          contractStoreLinkStartDate: this.contractStoreLinkStartDate,
          contractStoreLinkEndDate: this.contractStoreLinkEndDate,
          contractStoreLinkSid: this.contractStoreLinkSid,
        });
        if (this.contractSelectModifyResult.channeltuneApiResult.errorCode == 200) {
          this.alim("수정 되었습니다.", this.successColor);
          this.$attrs.update();
          setTimeout(() => {
            this.$emit("close");
          }, 2000);
        } else {
          this.alim(this.contractSelectModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //계약 리스트
    async getContractList(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_COMPANY_LIST", id);
        if (this.getCompanyContractList.channeltuneApiResult.errorCode == 200) {
          const getList = this.getCompanyContractList.channeltuneApiResult.contract;
          const contractListSelect = [];
          getList.forEach((ele) => {
            contractListSelect.push({ text: ele.contractTitle, value: ele.contractSid });
          });
          this.options = contractListSelect;
        } else {
          this.alim(this.getCompanyContractList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    contractStoreLinkStartDateProp(date) {
      this.contractStoreLinkStartDate = date;
    },
    contractStoreLinkEndDateProp(date) {
      this.contractStoreLinkEndDate = date;
    },
    //계약서 상세 선택
    async contractSelect(id) {
      this.contractStoreLinkSid = id;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_SELECT_DETAIL", id);
        if (this.getContractSelectDetail.channeltuneApiResult.errorCode == 200) {
          const contractDetail = this.getContractSelectDetail.channeltuneApiResult.contractStoreLink;
          this.contractStoreLinkType = contractDetail.contractStoreLinkType;
          this.contractStoreLinkKind = contractDetail.contractStoreLinkKind;
          this.contractStoreLinkStartDate = contractDetail.contractStoreLinkStartDate;
          this.contractStoreLinkEndDate = contractDetail.contractStoreLinkEndDate;
          this.companySid = contractDetail.companySid;
          this.contractSid = contractDetail.contractSid;
          this.contractStoreLinkType = contractDetail.contractStoreLinkType;
          this.getContractList(this.companySid);
        } else {
          this.alim(this.getContractSelectDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //회사 모달
    showModalPopup() {
      this.$modal.show(companyListModal, { update: this.update }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    update(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    contractStoreLinkKindNameProp(data) {
      this.contractStoreLinkKind = data.sysCodeSid;
    },
    contractStoreLinkTypeNameProp(data) {
      this.contractStoreLinkType = data.sysCodeSid;
    },
    async getNextSelectSysCode(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/GET_CHILD_SYS_CODE", id);
        const res = this.getChildSysCode.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.contractType = res.menuList[0].sysCodeSid;
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("contract/CONTRACT_SELECT_DEL", this.contractStoreLinkSid);
            if (this.contractSelectDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim(this.contractSelectDeleteResult.channeltuneApiResult.errorMessage, this.successColor);
              setTimeout(() => {
                this.$attrs.update();
                this.close();
              }, 1500);
            } else {
              this.alim(this.contractSelectDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
    contractTypeProp(data) {
      this.contractStoreLinkType = data.sysCodeSid;
    },
    close() {
      this.$attrs.update();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  overflow-y: visible !important;
}
.v-application {
  justify-content: space-between;
  & .init-wrap {
    overflow-y: auto;
    max-height: 800px;
  }
  & .btn-group {
    margin-right: 30px;
    & button {
      margin: 0 3px;
    }
  }
}
.store-contract-wrap {
  .tbl-wrap {
    border: 1px solid #e7e7e7;
    & .overflow {
      max-height: 600px;
      overflow-y: auto;
    }
    & td {
      cursor: pointer;
    }
  }

  .tbl-reg {
    & tr {
      & td {
        &.store {
          & .input-first {
            width: 120px;
          }
          & .input-last {
            width: 350px;
            margin: 0 5px;
          }
        }
        & .code {
          width: 120px !important;
        }
      }
    }
  }
  .filed::v-deep {
    position: relative;
    top: 5px;
    & .v-messages {
      display: none !important;
    }
  }
  .aaa::v-deep {
    display: flex;
    align-items: center;
    & .v-text-field__details {
      display: none !important;
    }
    & .v-input__slot {
      margin-bottom: 0;
    }
    & .v-messages.theme--light {
      display: none !important;
    }
  }
}
</style>
