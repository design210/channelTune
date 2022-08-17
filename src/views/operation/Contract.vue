<template>
  <section class="container">
    <div class="title-wrap">
      <h1>업체 계약 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>계약리스트</h2>
            <div class="search">
              <input
                type="text"
                placeholder="계약서 제목을 입력하세요"
                v-model="searchText"
                class="search-input input-size"
                @keyup.enter="reload(1)"
              />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="70%" />
              <col width="30%" />
              <col width="120" />
              <col width="70" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">계약서 제목</th>
                <th class="left">업체명</th>
                <th>계약 종류</th>
                <th>계약 날짜</th>
                <th>계약 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="contractDetail(item.contractSid)">
                <td>{{ item.contractSid }}</td>
                <td class="left">{{ item.contractTitle }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td>{{ item.contractKindName }}</td>
                <td>{{ item.contractDate }}</td>
                <td>{{ item.contractStatusName }} &nbsp; {{ item.etcFlag }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">계약 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>항목</h2>
            <div class="btn-group">
              <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(contractSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="90" />
                <col width="*" />
                <col width="90" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td><input type="text" readonly v-model="contractSid" /></td>
                <td class="required">계약서 서류번호</td>
                <td><input type="text" v-model="contractPapersNo" /></td>
              </tr>
              <tr>
                <td class="required">계약날짜</td>
                <td><date-picker :propdate="contractDate" @updateDate="contractDateProp"></date-picker></td>
                <td class="required">계약상태</td>
                <td>
                  <pull-down :data="contractStatus" :code="statusCode" @selected="contractStatusNameProp" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">계약 업체</td>
                <td class="field-div" colspan="3" v-if="contractSid !== ''">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input
                    type="text"
                    class="input-last"
                    readonly
                    v-model="companyName"
                    style="width: calc(100% - 115px) !important; margin-right: 0"
                  />
                </td>
                <td class="field-div" colspan="3" v-else>
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" dark @click="storePopup()" class="mr5">조회</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">계약종류</td>
                <td colspan="3" v-if="contractSid === ''">
                  <pull-down :data="contractKind" :code="contractCode" @selected="contractKindNameProp" class="pull-down"></pull-down>
                </td>
                <td colspan="3" v-else><input type="text" class="input-first" readonly v-model="contractKindName" /></td>
              </tr>
              <tr>
                <td class="required">계약서 제목</td>
                <td colspan="3"><input type="text" v-model="contractTitle" /></td>
              </tr>
              <tr>
                <td class="required">계약 기간 시작</td>
                <td><date-picker :propdate="contractStartDate" @updateDate="contractStartDateProp"></date-picker></td>
                <td class="required">계약 기간 종료</td>
                <td><date-picker nudge="200" :propdate="contractEndDate" @updateDate="contractEndDateProp"></date-picker></td>
              </tr>
              <tr>
                <td>계약서 파일</td>
                <td class="file-add" colspan="3">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*, .pdf'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in file" :key="index">
                        <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
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
              <tr>
                <td>비고</td>
                <td colspan="3" class="textarea-space"><textarea v-model="contractEtc"></textarea></td>
              </tr>
            </table>
          </div>

          <cash-investment
            v-if="contractKind === 'SYS21811B008'"
            :status="propData"
            :contractCashagent="contractCashagent"
            @watcher="getEmitData"
            @alims="alimFunc"
          />
          <cash-investor
            v-if="contractKind === 'SYS21811B011'"
            :status="propData"
            :contractCashmember="contractCashmember"
            @watcher="getEmitData"
            @alims="alimFunc"
          />
          <store-contract
            v-if="contractKind === 'SYS21811B007'"
            :storeContract="storeContract"
            :status="propData"
            @watcher="getEmitData"
            @alims="alimFunc"
            :read="readOnly"
          />
          <store-discovery-current
            v-if="contractKind === 'SYS21811B010'"
            :status="propData"
            @watcher="getEmitData"
            @alims="alimFunc"
            :contractStoreAgent2022="contractStoreAgent2022"
          />
          <store-discovery-past
            v-if="contractKind === 'SYS21811B009'"
            :contractStoreAgent="contractStoreAgent"
            :status="propData"
            @watcher="getEmitData"
            @alims="alimFunc"
          />
          <contract-media
            v-if="contractKind === 'SYS22504B007'"
            :contractMedia="contractMedia"
            :status="propData"
            @watcher="getEmitData"
            @alims="alimFunc"
          />

          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import PullDown from "@/components/form/PullDown.vue";
import companyListModal from "@/components/modal/common/CompanyList";
import { getPopupOpt } from "@/utils/modal";
import pdfModal from "@/components/modal/common/Pdf";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import FileUpload from "@/components/form/FileUpload.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import CashInvestment from "./contract-type/CashInvestment.vue";
import CashInvestor from "./contract-type/CashInvestor.vue";
import StoreContract from "./contract-type/StoreContract.vue";
import StoreDiscoveryCurrent from "./contract-type/StoreDiscoveryCurrent.vue";
import StoreDiscoveryPast from "./contract-type/StoreDiscoveryPast.vue";
import ContractMedia from "./contract-type/ContractMedia.vue";
export default {
  components: {
    alim,
    confirm,
    PullDown,
    FileUpload,
    DatePicker,
    CashInvestment,
    CashInvestor,
    StoreContract,
    StoreDiscoveryCurrent,
    StoreDiscoveryPast,
    ContractMedia,
  },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //디테일 데이터
      companySid: "",
      companyName: "",
      contractSid: "",
      contractDate: "",
      contractStatusName: "",
      contractStatus: "",
      contractStoreSid: "",
      contractStoreName: "",
      contractKindName: "",
      contractKind: "",
      contractTitle: "",
      contractPapersNo: "",
      contractStartDate: "",
      contractEndDate: "",
      contractEtc: "",

      propData: false,
      storeContract: {},
      contractStoreAgent: {},
      contractStoreAgent2022: {},
      contractCashagent: {},
      contractCashmember: {},
      contractMedia: {},

      show: null,
      message: true,
      channeltuneFiles: [],
      file: [],
      //셀렉트 설정
      statusCode: "SYS21811B002",
      contractCode: "SYS21811B003",
      typeCode: "SYS21811B013",
      //파일 삭제 아이디
      delId: "",
      //셀렉트 클리어
      dongClear: false,
      guClear: false,
      //아이디 임시저장
      idTemp: "",
      url: process.env.VUE_APP_API,
      obj: {},

      txt: "",
      readOnly: false,
    };
  },
  computed: {
    ...mapGetters("contract", ["getContractList", "getContractDetail", "setContractResult", "contractModifyResult", "contractDeleteResult"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    companyNationName(value) {
      value === "대한민국" || value === ""
        ? (document.querySelector(".zip-status").readOnly = true)
        : (document.querySelector(".zip-status").readOnly = false);
    },
    size() {
      this.reload(0);
    },
    channeltuneFiles() {
      if (this.channeltuneFiles.length > 0) {
        this.message = false;
      }
      if (this.channeltuneFiles.length === 0) {
        this.message = true;
      }
    },
    obj() {
      if (this.txt === "reg") {
        this.reg();
      } else if (this.txt === "modify") {
        this.modify();
      }
    },
  },
  mounted() {
    this.reload(1);
    this.propData = false;
  },
  methods: {
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //pdf 모달
    pdfModal(data) {
      this.$modal.show(pdfModal, { updateData: this.detailUpdate, data }, getPopupOpt("pdfModal", "1000px", "auto", false));
    },
    //사진을 모달에서 삭제시
    detailUpdate() {
      this.contractDetail(this.contractStoreSid);
    },
    //스토어 업체 모달
    storePopup() {
      this.$modal.show(companyListModal, { update: this.updateStore }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    updateStore(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    //code emit
    contractStatusNameProp(data) {
      this.contractStatus = data.sysCodeSid;
      this.contractStatusName = data.sysCodeName;
    },
    contractKindNameProp(data) {
      this.contractKind = data.sysCodeSid;
      this.contractKindName = data.sysCodeName;
    },
    contractDateProp(data) {
      this.contractDate = data;
    },
    contractStartDateProp(data) {
      this.contractStartDate = data;
    },
    contractEndDateProp(data) {
      this.contractEndDate = data;
    },

    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getContractList.channeltuneApiResult.errorCode == 200) {
          const contractList = this.getContractList.channeltuneApiResult.contract;
          this.list = contractList.data;
          this.len = contractList.last_page;
        } else {
          this.alim(this.getContractList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async contractDetail(id) {
      if (id === "") {
        id = this.idTemp;
      } else {
        this.idTemp = id;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_DETAIL", id);
        if (this.getContractDetail.channeltuneApiResult.errorCode == 200) {
          const contractInfo = this.getContractDetail.channeltuneApiResult.contract;
          this.companySid = contractInfo.companySid;
          this.companyName = contractInfo.companyName;
          this.contractSid = contractInfo.contractSid;
          this.contractDate = contractInfo.contractDate;
          this.contractStatusName = contractInfo.contractStatusName;
          this.contractStatus = contractInfo.contractStatus;
          this.contractKindName = contractInfo.contractKindName;
          this.contractKind = contractInfo.contractKind;
          this.contractTitle = contractInfo.contractTitle;
          this.contractPapersNo = contractInfo.contractPapersNo;
          this.contractStartDate = contractInfo.contractStartDate;
          this.contractEndDate = contractInfo.contractEndDate;
          this.contractEtc = contractInfo.contractEtc;
          this.file = [];
          contractInfo.fileResult.forEach(row => {
            if (row.fileSid !== "") {
              //pdf 업로드 가능시 보내야할 데이터
              this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
          });
          switch (this.contractKind) {
            case "SYS21811B007":
              this.readOnly = true;
              this.storeContract = contractInfo.contractStore;
              break;
            case "SYS21811B008":
              this.contractCashagent = contractInfo.contractCashagent;
              break;
            case "SYS21811B009":
              this.contractStoreAgent = contractInfo.contractStoreAgent;
              break;
            case "SYS21811B010":
              this.contractStoreAgent2022 = contractInfo.contractStoreAgent2022;
              break;
            case "SYS21811B011":
              this.contractCashmember = contractInfo.contractCashmember;
              break;
            case "SYS22504B007":
              this.contractMedia = contractInfo.contractMedia;
              break;
          }

          this.file[0] === undefined ? (this.message = true) : (this.message = false);
          this.deleteAllChip();
        } else {
          this.alim(this.getContractDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_ADD", {
          companySid: this.companySid,
          contractDate: this.contractDate,
          contractKind: this.contractKind,
          contractTitle: this.contractTitle,
          contractPapersNo: this.contractPapersNo,
          contractStartDate: this.contractStartDate,
          contractEndDate: this.contractEndDate,
          contractStatus: this.contractStatus,
          contractEtc: this.contractEtc,
          channeltuneFiles: this.channeltuneFiles,
          ...this.obj,
        });

        if (this.setContractResult.channeltuneApiResult.errorCode == 200) {
          this.deleteAllChip();
          this.clear();
          this.alim("계약서가 추가 되었습니다.", this.successColor);
          await this.reload(0);
        } else {
          this.alim(this.setContractResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_MODIFY", {
          contractSid: this.contractSid,
          companySid: this.companySid,
          contractDate: this.contractDate,
          contractKind: this.contractKind,
          contractTitle: this.contractTitle,
          contractPapersNo: this.contractPapersNo,
          contractStartDate: this.contractStartDate,
          contractEndDate: this.contractEndDate,
          contractStatus: this.contractStatus,
          contractEtc: this.contractEtc,
          channeltuneFiles: this.channeltuneFiles,
          ...this.obj,
        });

        if (this.contractModifyResult.channeltuneApiResult.errorCode == 200) {
          this.deleteAllChip();
          await this.contractDetail(this.contractSid);
          await this.reload();
          this.alim("수정 되었습니다.", this.successColor);
          this.propData = false;
        } else {
          this.alim(this.contractModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
        this.propData = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      this.txt = status;
      if (status === "reg") {
        if (this.contractSid !== "") {
          return this.alim("고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
        }
      }
      if (status === "modify") {
        if (this.contractSid === "") {
          return this.alim("계약서를 선택해 주세요.", this.errorColor);
        }
      }
      if (this.contractDate === "" || this.contractDate == null) {
        return this.alim("계약날짜를 입력해주세요.", this.errorColor);
      }
      if (this.contractStatusName === "" || this.contractStatusName == null) {
        return this.alim("계약상태를 선택해주세요.", this.errorColor);
      }
      if (this.companySid === "" || this.companySid == null) {
        return this.alim("계약 업체를 선택해주세요.", this.errorColor);
      }
      if (this.contractKindName === "" || this.contractKindName == null) {
        return this.alim("계약종류를 선택해주세요.", this.errorColor);
      }
      if (this.contractTitle === "" || this.contractTitle == null) {
        return this.alim("계약서 제목을 입력해주세요.", this.errorColor);
      }
      if (this.contractPapersNo === "" || this.contractPapersNo == null) {
        return this.alim("계약서 서류번호를 입력해주세요.", this.errorColor);
      }
      if (this.contractStartDate === "" || this.contractStartDate == null) {
        return this.alim("계약 시작 기간을 선택해주세요.", this.errorColor);
      }
      if (this.contractEndDate === "" || this.contractEndDate == null) {
        return this.alim("계약 종료 기간을 선택해주세요.", this.errorColor);
      }
      if (this.contractStartDate > this.contractEndDate) {
        return this.alim("계약 기간 종료일이 시작날짜보다 빠릅니다.", this.errorColor);
      }
      this.propData = true;
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("contract/CONTRACT_DEL", this.contractSid);
            if (this.contractDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.reload(0);
              this.clear();
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.contractDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            if (this.fileDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              await this.contractDetail(this.contractSid);
            } else {
              this.alim(this.fileDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
    alimFunc(data) {
      this.propData = false;
      return this.alim(data, this.errorColor);
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.contractSid = "";
      this.contractDate = "";
      this.contractStatusName = "";
      this.contractStatus = "";
      this.companySid = "";
      this.companyName = "";
      this.contractKindName = "";
      this.contractKind = "";
      this.contractTitle = "";
      this.contractPapersNo = "";
      this.contractStartDate = "";
      this.contractEndDate = "";
      this.contractStoreKindName = "";
      this.contractStoreKind = "";
      this.contractStore_salePrice = "";
      this.contractEtc = "";
      this.readOnly = false;
      this.storeContract = {};
      this.contractStoreAgent = {};
      this.contractStoreAgent2022 = {};
      this.contractCashagent = {};
      this.contractCashmember = {};
      this.contractMedia = {};
      this.channeltuneFiles = [];
      this.file = [];
    },

    getEmitData(data) {
      this.obj = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.contract-type {
  & .subject {
    padding-right: 20px;
  }
  & .select {
    width: 150px;
  }
}
.relative {
  position: relative;
  & .temp {
    position: absolute;
    top: 6px;
    left: 11px;
  }
  & .temp-text {
    position: absolute;
    top: 7px;
    left: 11px;
    z-index: 1;
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
  display: flex;
  justify-content: space-between;
  & .set-left {
    width: calc(50% - 10px);
  }
  & .set-right {
    width: calc(50% - 10px);
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 60% !important;
    border: 1px solid #ccc;
    margin-right: 10px;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 710px);
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
.rigths {
  display: flex;
  justify-content: flex-end;
  & .radio_container {
    display: flex;
    justify-content: space-between;
    & p {
      width: 78px;
      position: relative;
      text-align: right;
      top: 3px;
    }
  }
}
</style>
