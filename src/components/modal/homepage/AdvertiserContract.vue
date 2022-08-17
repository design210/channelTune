<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="modal-header v-application">
        <h2>광고주 AGENT 계약 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="validate('add')">등록</v-btn>
          <v-btn small color="warning" @click="validate('update')">수정</v-btn>
          <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <div class="content">
          <!-- <div class="header">
						<div class="search">
							<input type="text" v-model="searchText" class="search-input" />
							<input type="text" v-model="searchText" class="search-input" />
							<v-btn small color="primary">조회</v-btn>
						</div>
					</div> -->

          <div class="top-content">
            <table class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="60" />
                <col width="*" />
                <col width="60" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>업체계약종류</td>
                <td>
                  <pull-down
                    :data="contractUserAdvertiserLinkKind"
                    :code="'SYS21811B003'"
                    class="pull-down"
                    @selected="contractStoreLinkKindNameProp"
                  ></pull-down>
                </td>
                <td>시작날짜</td>
                <td>
                  <date-picker
                    :propdate="contractUserAdvertiserLinkStartDate"
                    @updateDate="newUserAdvertiserLinkStartDate"
                    class="modal-date"
                  ></date-picker>
                </td>
                <td>종료날짜</td>
                <td>
                  <date-picker
                    :propdate="contractUserAdvertiserLinkEndDate"
                    @updateDate="newUserAdvertiserLinkEndDate"
                    class="modal-date"
                  ></date-picker>
                </td>
              </tr>
              <tr>
                <td>스토어정산업체</td>
                <td colspan="4">
                  <input type="text" style="width: 100px" readonly v-model="companySid" />
                  <input type="text" style="width: calc(100% - 165px); margin-left: 5px" v-model="companyName" />
                  <v-btn small color="primary" style="margin-left: 5px" @click="showCompanyListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>스토어정산계약</td>
                <td v-if="contractList.length > 0" colspan="3">
                  <v-select :items="contractList" v-model="contractSid" outlined class="select-basic" :searchable="false"></v-select>
                </td>
                <td v-if="contractList.length < 1" colspan="3">
                  <span>정산계약이 없습니다</span>
                </td>
              </tr>
            </table>
          </div>

          <div class="bottom-content table-content">
            <table class="tbl mt20 user-list-tbl select-tbl">
              <caption>
                상품 테이블
              </caption>
              <colgroup>
                <col width="60" />
                <col width="80" />
                <col width="80" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>코드</th>
                  <th>시작날짜</th>
                  <th>종료날짜</th>
                  <th>정산업체명</th>
                  <th>계약서고유코드</th>
                  <th>계약서명</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="getDetail(item.contractUserAdvertiserLinkSid)">
                  <td>{{ item.contractUserAdvertiserLinkSid }}</td>
                  <td>{{ item.contractUserAdvertiserLinkStartDate }}</td>
                  <td>{{ item.contractUserAdvertiserLinkEndDate }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.contractSid }}</td>
                  <td>{{ item.contractTitle }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="6">계약처리 데이터가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
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
import modalWrap from "@/components/modal/ModalTemplate";
import { getPopupOpt } from "@/utils/modal";
import { mapGetters } from "vuex";
import DatePicker from "@/components/form/DatePicker";
import PullDown from "@/components/form/PullDown";
import alim from "@/components/dialog/Alim";
import alimMixin from "@/mixins/alim.js";
import companyListModal from "@/components/modal/common/CompanyList";
import deleteMixin from "@/mixins/delete";
import confirm from "@/components/dialog/Confirm.vue";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { modalWrap, DatePicker, PullDown, alim, confirm },
  mixins: [alimMixin, deleteMixin, loading],
  props: ["id"],
  data() {
    return {
      list: [],
      contractList: [],

      contractUserAdvertiserLinkSid: "",
      contractSid: "",
      companySid: "",
      companyName: "",
      userAdvertiserSid: "",
      contractUserAdvertiserLinkKind: "",
      contractUserAdvertiserLinkKindName: "",
      contractUserAdvertiserLinkStartDate: "",
      contractUserAdvertiserLinkEndDate: "",
    };
  },
  computed: {
    ...mapGetters("ad", [
      "getContractUserAdvertiserLinkHistory",
      "getContractUserAdvertiserLinkDetail",
      "getContractUserAdvertiserLinkAdd",
      "getContractUserAdvertiserLinkUpdate",
      "getContractUserAdvertiserLinkDelete",
    ]),
    ...mapGetters("contract", ["getCompanyContractList"]),
  },
  watch: {
    companySid(id) {
      this.getContractList(id);
    },
  },
  mounted() {
    this.getList();
  },
  created() {
    this.userAdvertiserSid = this.id;
  },
  methods: {
    close() {
      this.$attrs.update();
      this.$emit("close");
    },

    //계약 리스트
    async getContractList(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_COMPANY_LIST", id);
        const res = this.getCompanyContractList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.contractList = res.contract.map(i => ({ text: i.contractTitle, value: i.contractSid }));
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    showCompanyListModal() {
      this.$modal.show(companyListModal, { update: this.companyListUpdate }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    companyListUpdate({ companySid, companyName }) {
      this.companySid = companySid;
      this.companyName = companyName;
    },

    newUserAdvertiserLinkStartDate(data) {
      this.contractUserAdvertiserLinkStartDate = data;
    },
    newUserAdvertiserLinkEndDate(data) {
      this.contractUserAdvertiserLinkEndDate = data;
    },

    contractStoreLinkKindNameProp({ sysCodeSid, sysCodeName }) {
      this.contractUserAdvertiserLinkKind = sysCodeSid;
      this.contractUserAdvertiserLinkKindName = sysCodeName;
    },

    async getList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_HISTORY", this.userAdvertiserSid);
        const res = this.getContractUserAdvertiserLinkHistory.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.list = res.contractUserAdvertiserLink;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // id: contractUserAdvertiserLinkSid
    async getDetail(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_DETAIL", sid);
        const res = this.getContractUserAdvertiserLinkDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.contractStoreLink;
        this.contractUserAdvertiserLinkSid = data.contractUserAdvertiserLinkSid;
        this.contractSid = data.contractSid;
        this.companySid = data.companySid;
        this.companyName = data.companyName;
        this.userAdvertiserSid = data.userAdvertiserSid;
        this.contractUserAdvertiserLinkKind = data.contractUserAdvertiserLinkKind;
        this.contractUserAdvertiserLinkKindName = data.contractUserAdvertiserLinkKindName;
        this.contractUserAdvertiserLinkStartDate = data.contractUserAdvertiserLinkStartDate;
        this.contractUserAdvertiserLinkEndDate = data.contractUserAdvertiserLinkEndDate;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    validate(type) {
      if (type === "add") {
        if (this.contractUserAdvertiserLinkSid !== "") {
          this.alim("선택되어있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (type === "add" || type === "update") {
        if ((this.contractUserAdvertiserLinkKind || "") === "") {
          this.alim("계약종류를 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.contractUserAdvertiserLinkStartDate || "") === "") {
          this.alim("시작일을 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.contractUserAdvertiserLinkEndDate || "") === "") {
          this.alim("종료일을 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.companySid || "") === "") {
          this.alim("업체를 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.contractSid || "") === "") {
          this.alim("계약서를 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (type === "update" || type === "delete") {
        if ((this.contractUserAdvertiserLinkSid || "") === "") {
          this.alim("계약서를 선택하세요.", this.errorColor);
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
          this.confirm(this.contractUserAdvertiserLinkSid);
          break;
      }
    },

    emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          this.delete();
        }
      }
      this.resetDeleteData();
    },

    getBasicParams() {
      return {
        userAdvertiserSid: this.userAdvertiserSid,
        contractUserAdvertiserLinkKind: this.contractUserAdvertiserLinkKind,
        contractUserAdvertiserLinkStartDate: this.contractUserAdvertiserLinkStartDate,
        contractUserAdvertiserLinkEndDate: this.contractUserAdvertiserLinkEndDate,
        companySid: this.companySid,
        contractSid: this.contractSid,
      };
    },

    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_ADD", this.getBasicParams());
        const res = this.getContractUserAdvertiserLinkAdd.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("계약이 등록되었습니다", this.successColor);
        this.clear();
        await this.getList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    async update() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_UPDATE", {
          contractUserAdvertiserLinkSid: this.contractUserAdvertiserLinkSid,
          ...this.getBasicParams(),
        });

        const res = this.getContractUserAdvertiserLinkUpdate.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("계약이 수정되었습니다", this.successColor);
        await this.getList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    async delete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("ad/GET_CONTRACT_USER_ADVERTISER_LINK_DELETE", this.contractUserAdvertiserLinkSid);
        const res = this.getContractUserAdvertiserLinkDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.clear();
        await this.getList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    clear() {
      this.contractUserAdvertiserLinkSid = "";
      this.contractUserAdvertiserLinkKind = "";
      this.contractUserAdvertiserLinkKindName = "";
      this.contractUserAdvertiserLinkStartDate = "";
      this.contractUserAdvertiserLinkEndDate = "";
      this.companySid = "";
      this.companyName = "";
      this.contractSid = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & button {
    margin-left: 5px;
  }

  & .btn-group {
    margin-right: 30px;
  }
}

.content {
  & .top-content {
    & table.tbl-reg {
      & tr {
        & td {
          &:nth-child(even) {
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>
