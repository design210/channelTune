<template>
  <section class="container">
    <div class="title-wrap">
      <h1>업체관리</h1>
      {{ companyNationName }}
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>업체 리스트</h2>
            <div class="search">
              <input type="text" placeholder="업체명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              업체리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="80" />
              <col width="*" />
              <col width="80" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>업체코드</th>
                <th class="left">업체구분</th>
                <th class="left">업체명</th>
                <th>대표자명</th>
                <th>사업자등록번호</th>
                <th>수정요청</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="companyDetail(item.companySid)">
                <td>{{ item.companySid }}</td>
                <td class="left">{{ item.companyKindName }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td>{{ item.companyCeo }}</td>
                <td>{{ item.companyCrNum }}</td>
                <td>
                  <v-btn v-if="item.companyLogApproval === 'SYS22629B004'" @click.stop="showComparePopup(item.companySid)">확인</v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">업체 리스트가 없습니다.</td>
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
            <h2>설정</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" @click="confirm(companySid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>업체 고유코드</td>
                <td><input type="text" readonly v-model="companySid" /></td>
              </tr>
              <tr>
                <td>부모회사 코드</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyParentsSid" />
                  <input type="text" class="input-last" readonly v-model="companyParentsName" />
                  <v-btn small color="primary" dark @click="showModalPopup()" class="mr5">검색</v-btn>
                  <v-btn small color="error" dark @click="delCode()">삭제</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">국가코드</td>
                <td>
                  <pull-down :data="companyNation" :code="setNationCode" @selected="selectNation" class="pull-down"></pull-down>
                </td>
                <td class="required rights">업체구분</td>
                <td>
                  <pull-down :data="companyKind" :code="setCompanyCode" @selected="selectCompany" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">업체명</td>
                <td><input type="text" v-model="companyName" /></td>
                <td class="required rights">사업자등록번호</td>
                <td><input type="text" v-model="companyCrNum" /></td>
              </tr>
              <tr>
                <td>법인번호</td>
                <td><input type="text" v-model="companyBtNum" /></td>
                <td class="rights">대표자명</td>
                <td><input type="text" v-model="companyCeo" /></td>
              </tr>
              <tr>
                <td>업종</td>
                <td><input type="text" v-model="companyIndustries" /></td>
                <td class="rights">업태</td>
                <td><input type="text" v-model="companyTypeOfBusiness" /></td>
              </tr>
              <tr>
                <td>우편번호</td>
                <td>
                  <input type="text" v-model="companyZipCode" class="zip zip-status" readonly />
                  <v-btn small color="primary" dark @click="showAddressModalPopup()" class="ml5">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colspan="3"><input type="text" v-model="companyAddress1" readonly class="zip-status" /></td>
              </tr>
              <tr>
                <td>상세 주소</td>
                <td colspan="3"><input type="text" v-model="companyAddress2" /></td>
              </tr>
              <tr>
                <td>파일 첨부</td>
                <td class="file-add">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*, .pdf'"></file-upload>
                    <ul class="thumbnail mt10" v-if="companySid !== ''">
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
                <td class="toped pt10 rights">사용여부</td>
                <td class="toped">
                  <div class="radio">
                    <v-radio-group v-model="companyUseFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>

              <tr>
                <td>비고</td>
                <td colspan="3" class="textarea-space"><textarea v-model="companyMemo"></textarea></td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>세금 처리 방법</td>
                <td><pull-down :data="companyPaymentKind" code="SYS22330B002" @selected="selectTax" class="pull-down"></pull-down></td>
                <td class="rights">은행</td>
                <td><pull-down :data="companyBank" code="SYS21C30B100" @selected="selectBank" class="pull-down"></pull-down></td>
              </tr>
              <tr>
                <td>계좌번호</td>
                <td><input type="text" v-model="companyBankAccount" placeholder="'-' 빼고 입력해 주세요." /></td>
                <td class="rights">예금주</td>
                <td><input type="text" v-model="companyBankAccountHolder" /></td>
              </tr>
            </table>
          </div>
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
import AddressModal from "@/components/modal/common/Address";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import PullDown from "@/components/form/PullDown.vue";
import modalMixin from "@/mixins/showModal";
import companyListModal from "@/components/modal/common/CompanyList";
import ConfirmationOfCompanyChange from "@/components/modal/operation/ConfirmationOfCompanyChange";
import { getPopupOpt } from "@/utils/modal";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import pdfModal from "@/components/modal/common/Pdf";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import isEmpty from "@/utils/empty";
export default {
  components: { alim, confirm, PullDown, FileUpload },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin, modalMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //회사 디테일 데이터
      companySid: "",
      companyParentsSid: "",
      companyParentsName: "",
      companyNation: [],
      companyKind: "",
      companyNationName: "",
      companyKindName: "",
      companyName: "",
      companyCrNum: "",
      companyBtNum: "",
      companyCeo: "",
      companyIndustries: "",
      companyTypeOfBusiness: "",
      companyZipCode: "",
      companyAddress1: "",
      companyAddress2: "",
      companyPaymentKind: "SYS22511B003",
      companyPaymentKindName: "처리불가(알수없음)",
      companyBank: "",
      companyBankName: "",
      companyBankAccount: "",
      companyBankAccountHolder: "",
      companyUseFlag: "Y",
      created_at: "",
      updated_at: "",
      companyMemo: "",
      message: true,
      channeltuneFiles: [],
      fileType: "",
      file: [],
      //셀렉트 설정
      setNationCode: "SYS21729B003",
      setCompanyCode: "SYS21730B231",
      //파일 삭제 아이디
      delId: "",
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("company", ["getCompanyList", "getCompanyInfo", "setCompanyResult", "companyModifyResult", "companyDeleteResult"]),
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
  },
  mounted() {
    this.reload(0);
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
      this.companyDetail(this.companySid);
    },
    //주소찾기 모달
    showAddressModalPopup() {
      if (this.companyNationName == "대한민국") {
        this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "560px", "auto", false));
      } else {
        this.alim("검색은 국가선택을 대한민국으로 해주셔야 합니다.", this.errorColor);
      }
    },
    //모달에서 주소 선택시
    updateZip(data) {
      this.companyZipCode = data.zip;
      this.companyAddress1 = data.addr1;
    },
    //부모 업체 모달
    showModalPopup() {
      this.$modal.show(companyListModal, { update: this.update }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    //부모 업체 모달
    showComparePopup(id) {
      this.$modal.show(
        ConfirmationOfCompanyChange,
        { companySid: id, update: this.reloading },
        getPopupOpt("ConfirmationOfCompanyChange", "1200px", "auto", false),
      );
    },
    reloading() {
      this.reload();
    },
    //모달에서 업체 선택시
    update(data) {
      this.companyParentsSid = data.companySid;
      this.companyParentsName = data.companyName;
    },
    //국가코드 데이터 emit
    selectNation(data) {
      this.companyNation = data.sysCodeSid;
      this.companyNationName = data.sysCodeName;
    },
    selectBank(data) {
      this.companyBank = data.sysCodeSid;
      this.companyBankName = data.sysCodeName;
    },
    selectTax(data) {
      this.companyPaymentKind = data.sysCodeSid;
      this.companyPaymentKindName = data.sysCodeName;
    },
    selectCompany(data) {
      this.companyKind = data.sysCodeSid;
      this.companyKindName = data.sysCodeName;
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
        await this.$store.dispatch("company/COMPANY_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        if (this.getCompanyList.channeltuneApiResult.errorCode == 200) {
          const companyList = this.getCompanyList.channeltuneApiResult.companyMaster;
          this.list = companyList.data;
          this.len = companyList.last_page;
        } else {
          this.alim(this.getCompanyList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 상세 정보
    async companyDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("company/COMPANY_DETAIL", {
          companySid: id,
        });
        if (this.getCompanyList.channeltuneApiResult.errorCode == 200) {
          const companyInfo = this.getCompanyInfo.channeltuneApiResult.companyMaster;
          this.companySid = isEmpty(companyInfo.companySid);
          this.companyParentsSid = isEmpty(companyInfo.companyParentsSid);
          this.companyParentsName = isEmpty(companyInfo.companyParentsName);
          this.companyNation = isEmpty(companyInfo.companyNation);
          this.companyKind = isEmpty(companyInfo.companyKind);
          this.companyNationName = isEmpty(companyInfo.companyNationName);
          this.companyKindName = isEmpty(companyInfo.companyKindName);
          this.companyName = isEmpty(companyInfo.companyName);
          this.companyMemo = isEmpty(companyInfo.companyMemo);
          this.companyCrNum = isEmpty(companyInfo.companyCrNum);
          this.companyBtNum = isEmpty(companyInfo.companyBtNum);
          this.companyCeo = isEmpty(companyInfo.companyCeo);
          this.companyIndustries = isEmpty(companyInfo.companyIndustries);
          this.companyTypeOfBusiness = isEmpty(companyInfo.companyTypeOfBusiness);
          this.companyZipCode = isEmpty(companyInfo.companyZipCode);
          this.companyAddress1 = isEmpty(companyInfo.companyAddress1);
          this.companyAddress2 = isEmpty(companyInfo.companyAddress2);
          this.companyUseFlag = isEmpty(companyInfo.companyUseFlag);
          this.created_at = isEmpty(companyInfo.created_at);
          this.updated_at = isEmpty(companyInfo.updated_at);
          this.companyPaymentKind = isEmpty(companyInfo.companyPaymentKind);
          this.companyBank = isEmpty(companyInfo.companyBank);
          this.companyBankAccount = isEmpty(companyInfo.companyBankAccount);
          this.companyBankAccountHolder = isEmpty(companyInfo.companyBankAccountHolder);
          this.companyPaymentKindName = isEmpty(companyInfo.companyPaymentKindName);
          this.companyBankName = isEmpty(companyInfo.companyBankName);
          this.file = [];
          companyInfo.fileResult.forEach(row => {
            if (row.fileSid !== "") {
              //pdf 업로드 가능시 보내야할 데이터
              this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
          });
          if (this.file[0] === undefined) {
            this.message = true;
          } else {
            this.message = false;
          }
        } else {
          this.alim(this.getCompanyList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
      this.deleteAllChip();
    },
    //업체 추가
    async reg() {
      if (this.companyParentsSid === "") {
        this.companyParentsSid = null;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("company/COMPANY_ADD", {
          companyParentsSid: this.companyParentsSid,
          companyNation: this.companyNation,
          companyKind: this.companyKind,
          companyName: this.companyName,
          companyCrNum: this.companyCrNum,
          companyBtNum: this.companyBtNum,
          companyCeo: this.companyCeo,
          companyIndustries: this.companyIndustries,
          companyTypeOfBusiness: this.companyTypeOfBusiness,
          companyZipCode: this.companyZipCode,
          companyAddress1: this.companyAddress1,
          companyAddress2: this.companyAddress2,
          companyUseFlag: this.companyUseFlag,
          companyPaymentKind: this.companyPaymentKind,
          companyBank: this.companyBank,
          companyBankAccount: this.companyBankAccount,
          companyBankAccountHolder: this.companyBankAccountHolder,
          companyMemo: this.companyMemo,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.setCompanyResult.channeltuneApiResult.errorCode == 200) {
          this.alim("업체가 추가 되었습니다.", this.successColor);
          this.deleteAllChip();
          this.reload(0);
        } else {
          this.alim(this.setCompanyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.companySid !== "") {
          this.alim("업체 고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.companyNation === "" || this.companyNation == null) {
        this.alim("국가코드를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyKind === "" || this.companyKind == null) {
        this.alim("업체구분을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyName === "" || this.companyName == null) {
        this.alim("업체명을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyCrNum === "" || this.companyCrNum == null) {
        this.alim("사업자등록번호를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //업체 수정
    async modify() {
      if (this.companyParentsSid === "") {
        this.companyParentsSid = null;
      }
      if (this.channeltuneFiles === undefined) {
        this.channeltuneFiles = [];
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("company/COMPANY_MODIFY", {
          companySid: this.companySid,
          companyParentsSid: this.companyParentsSid,
          companyNation: this.companyNation,
          companyKind: this.companyKind,
          companyName: this.companyName,
          companyCrNum: this.companyCrNum,
          companyBtNum: this.companyBtNum,
          companyCeo: this.companyCeo,
          companyIndustries: this.companyIndustries,
          companyTypeOfBusiness: this.companyTypeOfBusiness,
          companyZipCode: this.companyZipCode,
          companyAddress1: this.companyAddress1,
          companyAddress2: this.companyAddress2,
          companyPaymentKind: this.companyPaymentKind,
          companyBank: this.companyBank,
          companyBankAccount: this.companyBankAccount,
          companyBankAccountHolder: this.companyBankAccountHolder,
          companyUseFlag: this.companyUseFlag,
          companyMemo: this.companyMemo,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.companyModifyResult.channeltuneApiResult.errorCode == 200) {
          this.alim("수정 되었습니다.", this.successColor);
          this.deleteAllChip();
          await this.companyDetail(this.companySid);
          await this.reload();
        } else {
          this.alim(this.companyModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
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
            await this.$store.dispatch("company/COMPANY_DEL", this.companySid);
            if (this.companyDeleteResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.companyDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
              this.companyDetail(this.companySid);
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
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.companySid = "";
      this.companyParentsSid = "";
      this.companyParentsName = "";
      this.companyNation = "";
      this.companyKind = "";
      this.companyNationName = "";
      this.companyKindName = "";
      this.companyName = "";
      this.companyCrNum = "";
      this.companyBtNum = "";
      this.companyCeo = "";
      this.companyIndustries = "";
      this.companyTypeOfBusiness = "";
      this.companyZipCode = "";
      this.companyAddress1 = "";
      this.companyAddress2 = "";
      this.companyUseFlag = "Y";
      this.created_at = "";
      this.updated_at = "";
      this.companyMemo = "";
      this.companyPaymentKind = "";
      this.companyBank = "";
      this.companyBankAccount = "";
      this.companyBankAccountHolder = "";
      this.companyPaymentKindName = "";
      this.companyBankName = "";
      this.channeltuneFiles = [];
      this.file = [];
    },
    delCode() {
      this.companyParentsSid = "";
      this.companyParentsName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.toped {
  vertical-align: top;
}
.rights {
  text-align: left;
  padding-left: 15px !important;
}
.user-list-tbl {
  & table {
    border-collapse: separate;
    border-spacing: 0 10px;
  }
  & td {
    cursor: pointer;
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 225px) !important;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 40% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(60% - 20px);
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
</style>
