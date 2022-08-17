<template>
  <section class="container">
    <div class="title-wrap">
      <h1>광고주 관리</h1>
    </div>
    <section class="adagent-manage">
      <section class="adagent-list section-box border-outside">
        <div class="border">
          <div class="title-wrap">
            <h1>광고주 리스트</h1>
            <div class="btn-group">
              <input type="text" placeholder="회원아이디,이름,광고회사명" />
              <v-btn small color="primary" v-model="searchText">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 select-tbl">
            <caption>
              광고주 리스트 테이블
            </caption>
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>회원고유코드</th>
                <th>회원아이디</th>
                <th>회원명</th>
                <th>광고주명</th>
                <th>광고주업체명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="getDetail(item.userAdvertiserSid)">
                <td>{{ item.userAdvertiserSid }}</td>
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepageUserEmail }}</td>
                <td>{{ item.homepageUserName }}</td>
                <td>{{ item.userAdvertiserCompanyCeo }}</td>
                <td>{{ item.userAdvertiserCompanyName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.lenth < 1">
              <tr>
                <td colspan="6">광고 상품 편성 리스트가 없습니다</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>

      <section class="adagent-content init-wrap section-box border-outside">
        <div class="border">
          <div class="title-wrap">
            <h1>항목</h1>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('add')">등록</v-btn>
              <v-btn small color="warning" @click="validate('update')">수정</v-btn>
              <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
              <v-btn small @click="clear">CLEAR</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg column2 mt10">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td><input type="text" readonly v-model="userAdvertiserSid" /></td>
                <td>회원아이디</td>
                <td class="field-div">
                  <div class="d-flex">
                    <input type="text" readonly v-model="homepageUserEmail" />
                    <v-btn small color="primary" @click="showUserListModal" :disabled="getDetailData === true">검색</v-btn>
                  </div>
                </td>
              </tr>
              <tr>
                <td>광고주연락처</td>
                <td><input type="text" v-model="userAdvertiserUserHp" /></td>
                <td>회원고유코드</td>
                <td><input type="text" readonly v-model="homepageUserSid" /></td>
              </tr>
              <tr>
                <td>광고주지역구분</td>
                <td>
                  <pull-down :data="userAdvertiserLocalKind" :code="'SYS21B01B002'" @selected="localKindProp" class="pull-down"></pull-down>
                </td>
                <td>회원명</td>
                <td><input type="text" readonly v-model="homepageUserName" /></td>
              </tr>
              <tr>
                <td>광고주사업자등록번호</td>
                <td><input type="text" v-model="userAdvertiserCompanyCrNum" /></td>
                <td>광고주대표이름</td>
                <td><input type="text" v-model="userAdvertiserCompanyCeo" /></td>
              </tr>
              <tr>
                <td>광고주회사이름</td>
                <td colspan="3"><input type="text" v-model="userAdvertiserCompanyName" /></td>
              </tr>
              <tr>
                <td>광고주우편번호</td>
                <td class="field-div">
                  <input type="text" style="width: 100px" v-model="userAdvertiserCompanyZipCode" readonly />
                  <v-btn small color="primary" @click="showAddressModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>광고주주소</td>
                <td colspan="3"><input type="text" v-model="userAdvertiserCompanyAddress1" readonly /></td>
              </tr>
              <tr>
                <td>광고주상세주소</td>
                <td colspan="3"><input type="text" v-model="userAdvertiserCompanyAddress2" /></td>
              </tr>
              <tr>
                <td>광고주대표업종</td>
                <td><input type="text" v-model="userAdvertiserCompanyIndustries" /></td>
                <td>광고대표업태</td>
                <td><input type="text" v-model="userAdvertiserCompanyTypeOfBusiness" /></td>
              </tr>
              <tr>
                <td>광고주첨부파일</td>
                <td class="file-add" colspan="2">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in files" :key="index">
                        <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="files.length > 0" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <img
                            :src="`${url}/file/fileView/${item.url}?size=80`"
                            @click="showTumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="emptyFiles === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <hr />
          <div class="contract-list">
            <div class="title-wrap">
              <h3>광고주 AGENT 계약 리스트</h3>
              <div class="btn-group">
                <v-btn small color="primary" @click="showAdAgentContractModal">광고주 AGENT 계약처리</v-btn>
              </div>
            </div>
            <div class="table-div">
              <table class="tbl select-tbl">
                <caption>
                  광고주 AGENT 계약 리스트
                </caption>
                <colgroup>
                  <col width="50" />
                  <col width="200" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <thead>
                  <tr>
                    <th>코드</th>
                    <th>계약종류</th>
                    <th>정산업체명</th>
                    <th>계약서코드</th>
                    <th>계약서명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in contractList" :key="index">
                    <td>{{ item.contractUserAdvertiserLinkSid }}</td>
                    <td>{{ item.contractUserAdvertiserLinkKindName }}</td>
                    <td>{{ item.userAdvertiserCompanyName }}</td>
                    <td>{{ item.contractSid }}</td>
                    <td>{{ item.contractTitle }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="contractList.length < 1">
                  <tr>
                    <td colspan="5">계약서 리스트가 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>

    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </section>
</template>

<script>
import { getPopupOpt } from "@/utils/modal";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import alim from "@/components/dialog/Alim";
import alimMixin from "@/mixins/alim.js";
import FileUpload from "@/components/form/FileUpload";
import fileUploadMixin from "@/mixins/fileUpload.js";
import confirm from "@/components/dialog/Confirm";
import deleteMixin from "@/mixins/delete.js";
import PullDown from "@/components/form/PullDown";
import addressModal from "@/components/modal/common/Address";
import advertiserContractModal from "@/components/modal/homepage/AdvertiserContract";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import userListModal from "@/components/modal/homepage/UserList";
import isEmpty from "@/utils/empty";
export default {
  components: { alim, confirm, FileUpload, PullDown },
  mixins: [loading, alimMixin, fileUploadMixin, deleteMixin],
  data() {
    return {
      searchText: "",
      page: 1,
      size: 15,
      len: null,
      list: [],

      userAdvertiserSid: "",
      homepageUserSid: "",
      homepageUserEmail: "",
      homepageUserName: "",
      userAdvertiserUserHp: "",
      userAdvertiserCompanyAddress1: "",
      userAdvertiserCompanyAddress2: "",
      userAdvertiserCompanyCeo: "",
      userAdvertiserCompanyCrNum: "",
      userAdvertiserCompanyIndustries: "",
      userAdvertiserCompanyName: "",
      userAdvertiserCompanyTypeOfBusiness: "",
      userAdvertiserCompanyZipCode: "",
      userAdvertiserLocalKind: "",
      userAdvertiserLocalKindName: "",
      files: [],

      channeltuneFiles: [],
      delId: "",
      getDetailData: false,
      emptyFiles: false,

      contractList: [],
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("ad", [
      "getAdvertiserList",
      "getAdvertiserDetail",
      "advertiserAdd",
      "advertiserUpdate",
      "advertiserDelete",
      "getContractUserAdvertiserLinkList",
    ]),

    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.reload();
    },
  },
  mounted() {
    this.reload(1);
  },
  methods: {
    // 목록
    async reload(num) {
      if (num == 1) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_ADVERTISER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        const res = this.getAdvertiserList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.userAdvertiser;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 상세
    async getDetail(id) {
      this.userAdvertiserSid = id;

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_ADVERTISER_DETAIL", this.userAdvertiserSid);

        const res = this.getAdvertiserDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.userAdvertiser;
        this.userAdvertiserSid = data.userAdvertiserSid;
        this.homepageUserSid = data.homepageUserSid;
        this.homepageUserName = data.homepageUserName;
        this.homepageUserEmail = data.homepageUserEmail;
        this.userAdvertiserCompanyAddress1 = data.userAdvertiserCompanyAddress1;
        this.userAdvertiserCompanyAddress2 = data.userAdvertiserCompanyAddress2;
        this.userAdvertiserCompanyCeo = data.userAdvertiserCompanyCeo;
        this.userAdvertiserCompanyCrNum = data.userAdvertiserCompanyCrNum;
        this.userAdvertiserCompanyIndustries = isEmpty(data.userAdvertiserCompanyIndustries);
        this.userAdvertiserCompanyName = isEmpty(data.userAdvertiserCompanyName);
        this.userAdvertiserCompanyTypeOfBusiness = isEmpty(data.userAdvertiserCompanyTypeOfBusiness);
        this.userAdvertiserCompanyZipCode = isEmpty(data.userAdvertiserCompanyZipCode);
        this.userAdvertiserLocalKind = isEmpty(data.userAdvertiserLocalKind);
        this.userAdvertiserLocalKindName = isEmpty(data.userAdvertiserLocalKindName);
        this.userAdvertiserUserHp = isEmpty(data.userAdvertiserUserHp);
        this.files = data.files.map(i => ({
          url: i.fileSid,
          fileExt: i.fileExt,
          name: i.fileFileName,
        }));
        this.emptyFiles = this.files.length < 1;
        this.getDetailData = true;

        await this.getContractList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    async getContractList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_LIST", this.userAdvertiserSid);
        const res = this.getContractUserAdvertiserLinkList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.contractList = res.contractUserAdvertiserLink;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 추가, 수정 기본 데이터
    getBasicParams() {
      return {
        homepageUserSid: this.homepageUserSid,
        userAdvertiserUserHp: this.userAdvertiserUserHp,
        userAdvertiserLocalKind: this.userAdvertiserLocalKind,
        userAdvertiserCompanyCrNum: this.userAdvertiserCompanyCrNum,
        userAdvertiserCompanyName: this.userAdvertiserCompanyName,
        userAdvertiserCompanyCeo: this.userAdvertiserCompanyCeo,
        userAdvertiserCompanyZipCode: this.userAdvertiserCompanyZipCode,
        userAdvertiserCompanyAddress1: this.userAdvertiserCompanyAddress1,
        userAdvertiserCompanyAddress2: this.userAdvertiserCompanyAddress2,
        userAdvertiserCompanyTypeOfBusiness: this.userAdvertiserCompanyTypeOfBusiness,
        userAdvertiserCompanyIndustries: this.userAdvertiserCompanyIndustries,
        channeltuneFiles: this.channeltuneFiles,
      };
    },

    // 등록, 수정, 삭제 전 validate
    validate(type) {
      if (type === "add") {
        if (this.userAdvertiserSid !== "") {
          this.alim("고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }

      if (type === "add" || type === "update") {
        if (this.homepageUserSid === "" || this.homepageUserSid === null) {
          this.alim("회원고유코드를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.userAdvertiserUserHp === "" || this.userAdvertiserUserHp === null) {
          this.alim("담당자 핸드폰번호를 입력하세요.", this.errorColor);
          return false;
        }
        if (this.userAdvertiserLocalKind === "" || this.userAdvertiserLocalKind === null) {
          this.alim("광고주 지역구분을 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (type === "update" || type === "delete") {
        if (this.userAdvertiserSid === "" || this.userAdvertiserSid === null) {
          this.alim("광고주를 선택하세요.", this.errorColor);
          return false;
        }
      }

      switch (type) {
        case "add":
          this.add();
          break;
        case "update":
          this.update();
          break;
        case "delete":
          this.confirm(this.userAdvertiserSid);
          break;
      }
    },
    // 추가
    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/ADVERTISER_ADD", this.getBasicParams());
        const res = this.advertiserAdd.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("광고주 정보가 등록되었습니다.", this.successColor);
        this.clear();
        this.deleteAllChip();
        this.reload();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 수정
    async update() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/ADVERTISER_UPDATE", { userAdvertiserSid: this.userAdvertiserSid, ...this.getBasicParams() });
        const res = this.advertiserUpdate.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("광고주 정보가 수정되었습니다.", this.successColor);
        this.reload();
        this.deleteAllChip();
        this.getDetail(this.userAdvertiserSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 삭제
    async delete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/ADVERTISER_DELETE", this.userAdvertiserSid);
        const res = this.advertiserDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("광고주 정보가 삭제되었습니다.", this.successColor);
        this.clear();
        this.reload();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            const res = this.fileDeleteResult.channeltuneApiResult.FileMaster;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              bus.$emit("end:spinner");
              return false;
            }

            this.files = this.files.filter(i => i.url !== this.delId);
            this.alim("삭제 되었습니다.", this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }

        if (data.type === "list") {
          this.delete();
        }
      }

      this.resetDeleteData();
    },
    // 항목 clear
    clear() {
      this.userAdvertiserSid = "";
      this.homepageUserSid = "";
      this.homepageUserName = "";
      this.homepageUserEmail = "";
      this.userAdvertiserCompanyAddress1 = "";
      this.userAdvertiserCompanyAddress2 = "";
      this.userAdvertiserCompanyCeo = "";
      this.userAdvertiserCompanyCrNum = "";
      this.userAdvertiserCompanyIndustries = "";
      this.userAdvertiserCompanyName = "";
      this.userAdvertiserCompanyTypeOfBusiness = "";
      this.userAdvertiserCompanyZipCode = "";
      this.userAdvertiserLocalKind = "";
      this.userAdvertiserLocalKindName = "";
      this.userAdvertiserUserHp = "";
      this.files = [];
      this.emptyFiles = false;
      this.getDetailData = false;
    },

    // 주소검색모달
    showAddressModal() {
      this.$modal.show(addressModal, { updateZip: this.addressUpdate }, getPopupOpt("addressModal", "570px", "auto", false));
    },
    addressUpdate({ zip, addr1 }) {
      this.userAdvertiserCompanyZipCode = zip;
      this.userAdvertiserCompanyAddress1 = addr1;
    },

    // 계약처리모달
    showAdAgentContractModal() {
      if ((this.userAdvertiserSid || "") === "") {
        this.alim("광고주를 선택하세요.", this.errorColor);
        return false;
      }

      this.$modal.show(
        advertiserContractModal,
        { update: this.agentUpdate, id: this.userAdvertiserSid },
        getPopupOpt("advertiserContractModal", "800px", "auto", false),
      );
    },
    agentUpdate() {
      // modal 닫을시 계약서 리스트 update
      this.getContractList();
    },

    // 썸네일모달
    showTumbnailModal(data) {
      const file = this.files;
      this.$modal.show(thumbnailModal, { updateData: this.thumbnailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    thumbnailUpdate(data) {
      // 썸네일 모달에서 파일삭제시, 리스트에서 안보이도록 설정
      if (data.length > 0) {
        this.files = this.files.filter(i => data.includes(i.url) === false);
      }
    },

    // 광고주 지역구분 pullDown
    localKindProp({ sysCodeSid, sysCodeName }) {
      this.userAdvertiserLocalKind = sysCodeSid;
      this.userAdvertiserLocalKindName = sysCodeName;
    },

    // 유저검색모달
    showUserListModal() {
      this.$modal.show(userListModal, { update: this.userUpdate }, getPopupOpt("userListModal", "1000px", "auto", false));
    },
    userUpdate({ homepageUserSid, homepageUserEmail, homepageUserName }) {
      this.homepageUserSid = homepageUserSid;
      this.homepageUserEmail = homepageUserEmail;
      this.homepageUserName = homepageUserName;
    },
  },
};
</script>

<style lang="scss" scoped>
.adagent-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;
  & .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & input {
      width: 200px;
      height: 28px;
      border: 1px solid #aaaaaa;
      padding: 0 10px;
    }

    & button {
      margin-left: 5px;
    }
  }

  & .adagent-list {
    width: 700px !important;
  }

  & .adagent-content {
    width: calc(100% - 710px);
  }

  & .tbl-reg {
    & .field-div {
      & button {
        margin-left: 5px;
      }
    }
  }

  & .contract-list {
    margin-top: 20px;
    height: 260px;

    & .title-wrap {
      margin-bottom: 0px;
    }

    & .table-div {
      height: calc(100% - 50px) !important;
      overflow-y: scroll;
      & table {
        & thead {
          & tr {
            & th {
              position: sticky;
              background: white;
              top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
