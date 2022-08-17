<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>유형자산 제품 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="validate('add')">등록</v-btn>
          <v-btn small color="warning" @click="validate('update')">수정</v-btn>
          <v-btn small color="error" @click="confirm">삭제</v-btn>
          <v-btn small @click="clear">clear</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td class="right pr10">자산 번호</td>
                <td><input type="text" readonly v-model="tangibleAssetsSid" /></td>
                <td class="required right pr10">구분</td>
                <td>
                  <pull-down :data="tangibleAssetsStatus" code="SYS22321B002" @selected="tangibleAssetProp" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td class="right pr10">품명</td>
                <td colspan="3"><input type="text" readonly v-model="tangibleAssetsName" /></td>
              </tr>
              <tr>
                <td class="right pr10 required">날짜</td>
                <td>
                  <date-picker :propdate="tangibleAssetsDate" @updateDate="tangibleMakeDateProp"></date-picker>
                </td>
                <td class="right pr10">지급 구분</td>
                <td>
                  <pull-down
                    :data="tangibleAssetsTransGiveKind"
                    code="SYS22525B001"
                    @selected="tangibleAssetsTransGiveKindProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr v-if="tangibleAssetsTransGiveKind === 'SYS22525B002'">
                <td class="right pr10">사용자(담당자, 정)</td>
                <td>
                  <v-select
                    :items="employee"
                    item-text="interbridEmployeeKorName"
                    item-value="interbridEmployeeSid"
                    v-model="tangibleAssetsTransMasterSid"
                    outlined
                    class="select-basic"
                  />
                </td>
                <td class="right pr10">담당자 (부)</td>
                <td>
                  <v-select
                    :items="employee"
                    item-text="interbridEmployeeKorName"
                    item-value="interbridEmployeeSid"
                    v-model="tangibleAssetsTransSlaveSid"
                    outlined
                    class="select-basic"
                  />
                </td>
              </tr>
              <tr v-else>
                <td class="right pr10">위치</td>
                <td><input type="text" v-model="tangibleAssetsTransLocation" /></td>
              </tr>
              <tr>
                <td class="right pr10">비고</td>
                <td colspan="3"><textarea v-model="tangibleAssetsTransEtc" /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <table width="100%" class="tbl-reg user-list-tbl column2 tabled">
              <colgroup>
                <col width="80" />
                <col width="80" />
                <col width="100" />
                <col width="100" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <thead>
                <th>날짜</th>
                <th>구분</th>
                <th class="left pl5">사용자(담당자, 정)</th>
                <th class="left pl5">담당자 (부)</th>
                <th class="left pl5">위치</th>
                <th class="left pl5">비고</th>
              </thead>
            </table>
            <table width="100%" class="tbl-reg select-tbl user-list-tbl tbl column2" id="scrolled">
              <colgroup>
                <col width="80" />
                <col width="80" />
                <col width="100" />
                <col width="100" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr class="point" v-for="(item, idx) in list" :key="idx" @click="getDetail(item.tangibleAssetsTransSid)">
                  <td>{{ item.tangibleAssetsTransDate }}</td>
                  <td style="padding: 0 !important">{{ item.tangibleAssetsTransKindName }}</td>
                  <td class="left">{{ item.tangibleAssetsTransMasterSidName }}</td>
                  <td class="left">{{ item.tangibleAssetsTransSlaveSidName }}</td>
                  <td class="left">{{ item.tangibleAssetsTransLocation }}</td>
                  <td class="left">{{ item.tangibleAssetsTransEtc }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="list.length < 1">
                  <td colspan="6">리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
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
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import PullDown from "@/components/form/PullDown.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import alim from "@/components/dialog/Alim.vue";
import isEmpty from "@/utils/empty";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    DatePicker,
    PullDown,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["tangibleAssetsSid", "tangibleAssetsName"],
  data() {
    return {
      tangibleAssetsTransSid: "",
      tangibleAssetsDate: "",
      tangibleAssetsStatus: "",
      tangibleAssetsStatusName: "",
      tangibleAssetsTransLocation: "",
      tangibleAssetsTransMaster: "",
      tangibleAssetsTransMasterSid: "",
      tangibleAssetsTransSlaveSid: "",
      tangibleAssetsTransEtc: "",
      tangibleAssetsTransSlave: "",
      tangibleAssetsTransGiveKind: "",
      list: [],
      employee: [],
    };
  },
  computed: {
    ...mapGetters("tangibleAssets", [
      "getTransTangibleAssetsList",
      "addTransTangibleAsset",
      "modifyTransTangibleAsset",
      "deleteTransTangibleAsset",
      "detailTransTangibleAssetsList",
    ]),
    ...mapGetters("interbridEmployee", ["getEmployeeList"]),
  },
  async mounted() {
    await this.EmployeeList();
    await this.getList();
    if (this.list.length > 0) {
      await this.getDetail(this.list[0].tangibleAssetsTransSid);
    }
  },
  methods: {
    close() {
      console.log("hi");
      this.$attrs.update();
      this.$emit("close");
    },
    tangibleMakeDateProp(date) {
      this.tangibleAssetsDate = date;
    },
    tangibleAssetProp(data) {
      this.tangibleAssetsStatus = data.sysCodeSid;
    },
    //제품 유형 목록 조회
    async getList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/GET_TRANS_TANGIBLE_ASSETS_LIST", this.tangibleAssetsSid);
        const res = this.getTransTangibleAssetsList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.tangibleAssets;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async getDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/DETAIL_TRANS_TANGIBLE_ASSET", id);
        const res = this.detailTransTangibleAssetsList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.tangibleAssetsDate = res.tangibleAssets.tangibleAssetsTransDate;
        this.tangibleAssetsStatus = res.tangibleAssets.tangibleAssetsTransKind;
        this.tangibleAssetsStatusName = res.tangibleAssets.tangibleAssetsTransKindName;
        this.tangibleAssetsTransLocation = isEmpty(res.tangibleAssets.tangibleAssetsTransLocation);
        this.tangibleAssetsTransEtc = isEmpty(res.tangibleAssets.tangibleAssetsTransEtc);
        this.tangibleAssetsTransMasterSid = res.tangibleAssets.tangibleAssetsTransMasterSid;
        this.tangibleAssetsTransSlaveSid = res.tangibleAssets.tangibleAssetsTransSlaveSid;
        this.tangibleAssetsTransGiveKind = res.tangibleAssets.tangibleAssetsTransGiveKind;
        this.tangibleAssetsTransSid = res.tangibleAssets.tangibleAssetsTransSid;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async addList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/ADD_TRANS_TANGIBLE_TRANS_ASSET", {
          sid: this.tangibleAssetsSid,
          tangibleAssetsTransKind: this.tangibleAssetsStatus,
          tangibleAssetsTransDate: this.tangibleAssetsDate,
          tangibleAssetsTransEtc: this.tangibleAssetsTransEtc,
          tangibleAssetsTransLocation: this.tangibleAssetsTransLocation,
          tangibleAssetsTransGiveKind: this.tangibleAssetsTransGiveKind,
          tangibleAssetsTransMasterSid: this.tangibleAssetsTransMasterSid,
          tangibleAssetsTransSlaveSid: this.tangibleAssetsTransSlaveSid,
        });
        const res = this.addTransTangibleAsset.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.getList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async updateList() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/MODIFY_TRANS_TANGIBLE_ASSET", {
          id: this.tangibleAssetsTransSid,
          tangibleAssetsTransKind: this.tangibleAssetsStatus,
          tangibleAssetsTransDate: this.tangibleAssetsDate,
          tangibleAssetsTransEtc: this.tangibleAssetsTransEtc,
          tangibleAssetsTransLocation: this.tangibleAssetsTransLocation,
          tangibleAssetsTransGiveKind: this.tangibleAssetsTransGiveKind,
          tangibleAssetsTransMasterSid: this.tangibleAssetsTransMasterSid,
          tangibleAssetsTransSlaveSid: this.tangibleAssetsTransSlaveSid,
        });
        const res = this.modifyTransTangibleAsset.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.getList();
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
            console.log(this.tangibleAssetsTransSid);
            await this.$store.dispatch("tangibleAssets/DELETE_TRANS_TANGIBLE_ASSET", this.tangibleAssetsTransSid);
            const res = this.deleteTransTangibleAsset.channeltuneApiResult;

            if (res.errorCode !== 200) {
              return this.alim(res.errorMessage, this.errorColor);
            }
            this.alim(res.errorMessage, this.successColor);
            await this.getList();
            this.clear();
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
    },
    tangibleAssetsTransGiveKindProp(data) {
      this.tangibleAssetsTransGiveKind = data.sysCodeSid;
    },
    clear() {
      this.tangibleAssetsTransSid = "";
      this.tangibleAssetsDate = "";
      this.tangibleAssetsStatus = "";
      this.tangibleAssetsStatusName = "";
      this.tangibleAssetsTransLocation = "";
      this.tangibleAssetsTransMaster = "";
      this.tangibleAssetsTransMasterSid = "";
      this.tangibleAssetsTransSlaveSid = "";
      this.tangibleAssetsTransEtc = "";
      this.tangibleAssetsTransSlave = "";
      this.tangibleAssetsTransGiveKind = "";
    },
    validate(val) {
      if (this.tangibleAssetsDate === null || this.tangibleAssetsDate === "") {
        return this.alim("날짜를 선택해주세요", this.errorColor);
      }
      if (this.tangibleAssetsStatus === null || this.tangibleAssetsStatus === "") {
        return this.alim("유형자산 구분을 선택해주세요", this.errorColor);
      }

      if (val === "add") {
        this.addList();
      } else if (val === "update") {
        this.updateList();
      }
    },
    async EmployeeList() {
      //검색할경우 페이징 초기화

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_LIST", {
          lastWorkFlag: "Y",
        });
        if (this.getEmployeeList.channeltuneApiResult.errorCode == 200) {
          const userList = this.getEmployeeList.channeltuneApiResult.interbridEmployee;
          this.employee = userList;
        } else {
          this.alim(this.getEmployeeList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
.tbl-reg {
  & tr {
    & td {
      &.store {
        & .input-first {
          width: 100px;
        }
        & .input-last {
          width: 300px;
          margin: 0 5px;
        }
      }
    }
  }
}
.tbl-time {
  border: 1px solid #ccc;
  & tr {
    & td {
      text-align: center;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      padding: 5px 0 5px 0 !important;
      &:first-child {
        border-left: 0;
      }
      & > div {
        height: 23px !important;
        width: 23px !important;
        margin: 0 auto !important;
      }
    }
    &:first-child {
      & td {
        border-top: 0;
      }
    }
  }
}
.user-list-tbl {
  border-bottom: 1px solid #000;
  & th {
    padding-bottom: 5px;
  }
}
#scrolled {
  margin-top: 0 !important;
  padding-top: 5px;
  overflow-y: auto;
}
.point {
  cursor: pointer;
}
</style>
