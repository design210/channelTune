<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>스토어별 송출시간 등록</h2>
        <div class="btn-group" v-if="edit === false">
          <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
          <v-btn small @click="clear">clear</v-btn>
        </div>
        <div class="btn-group" v-else>
          <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
          <v-btn small color="error" @click="confirm(companyStoreSid)">삭제</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time">
            <colgroup>
              <col width="120" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>송출변경날짜</td>
                <td class="date-picker"><date-picker :current="storeTimeScheduleDate" :clear="clearDate" @updateDate="storeDate"></date-picker></td>
              </tr>
              <tr>
                <td>스토어</td>
                <td class="store">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="name" />
                  <v-btn small color="primary" class="mr5" @click="storeSearchModal" v-if="edit === false">조회 </v-btn>
                </td>
              </tr>
              <tr>
                <td>송출시간</td>
                <td>
                  <table width="100%" class="tbl-time">
                    <tr>
                      <td>00</td>
                      <td>01</td>
                      <td>02</td>
                      <td>03</td>
                      <td>04</td>
                      <td>05</td>
                      <td>06</td>
                      <td>07</td>
                      <td>08</td>
                      <td>09</td>
                      <td>10</td>
                      <td>11</td>
                    </tr>
                    <tr>
                      <td><v-checkbox v-model="storeTimeSchedule00" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule01" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule02" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule03" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule04" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule05" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule06" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule07" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule08" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule09" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule10" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule11" value="Y"></v-checkbox></td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>13</td>
                      <td>14</td>
                      <td>15</td>
                      <td>16</td>
                      <td>17</td>
                      <td>18</td>
                      <td>19</td>
                      <td>20</td>
                      <td>21</td>
                      <td>22</td>
                      <td>23</td>
                    </tr>
                    <tr>
                      <td><v-checkbox v-model="storeTimeSchedule12" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule13" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule14" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule15" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule16" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule17" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule18" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule19" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule20" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule21" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule22" value="Y"></v-checkbox></td>
                      <td><v-checkbox v-model="storeTimeSchedule23" value="Y"></v-checkbox></td>
                    </tr>
                  </table>
                </td>
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
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import DatePicker from "@/components/form/DatePicker.vue";
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import StoreListModal from "@/components/modal/common/StoreList.vue";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    DatePicker,
    alim,
    confirm,
  },
  mixins: [alimMixin, deleteMixin, loading],
  props: ["storeTimeScheduleSid"],
  data() {
    return {
      name: "",
      storeTimeScheduleDate: "",
      companyStoreSid: "",
      storeTimeSchedule00: "",
      storeTimeSchedule01: "",
      storeTimeSchedule02: "",
      storeTimeSchedule03: "",
      storeTimeSchedule04: "",
      storeTimeSchedule05: "",
      storeTimeSchedule06: "",
      storeTimeSchedule07: "",
      storeTimeSchedule08: "",
      storeTimeSchedule09: "",
      storeTimeSchedule10: "",
      storeTimeSchedule11: "",
      storeTimeSchedule12: "",
      storeTimeSchedule13: "",
      storeTimeSchedule14: "",
      storeTimeSchedule15: "",
      storeTimeSchedule16: "",
      storeTimeSchedule17: "",
      storeTimeSchedule18: "",
      storeTimeSchedule19: "",
      storeTimeSchedule20: "",
      storeTimeSchedule21: "",
      storeTimeSchedule22: "",
      storeTimeSchedule23: "",
      clearDate: false,
      edit: false,
      page: 1,
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getStoreTimeScheduleDetail", "StoreTimeScheduleAdd", "StoreTimeScheduleModifyResult", "storeDelResult"]),
  },
  async mounted() {
    if (!isNaN(this.storeTimeScheduleSid)) {
      this.edit = true;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TIME_SCHEDULE_DETAIL", this.storeTimeScheduleSid);
        if (this.getStoreTimeScheduleDetail.channeltuneApiResult.errorCode == 200) {
          const sehdule = this.getStoreTimeScheduleDetail.channeltuneApiResult.storeTimeSchedule;
          this.companyStoreSid = sehdule.companyStoreSid;
          this.storeTimeScheduleDate = sehdule.storeTimeScheduleDate;
          this.name = sehdule.companyStoreName;
          if (sehdule.storeTimeSchedule00 == "Y") {
            this.storeTimeSchedule00 = sehdule.storeTimeSchedule00;
          }
          if (sehdule.storeTimeSchedule01 == "Y") {
            this.storeTimeSchedule01 = sehdule.storeTimeSchedule01;
          }
          if (sehdule.storeTimeSchedule02 == "Y") {
            this.storeTimeSchedule02 = sehdule.storeTimeSchedule02;
          }
          if (sehdule.storeTimeSchedule03 == "Y") {
            this.storeTimeSchedule03 = sehdule.storeTimeSchedule03;
          }
          if (sehdule.storeTimeSchedule04 == "Y") {
            this.storeTimeSchedule04 = sehdule.storeTimeSchedule04;
          }
          if (sehdule.storeTimeSchedule05 == "Y") {
            this.storeTimeSchedule05 = sehdule.storeTimeSchedule05;
          }
          if (sehdule.storeTimeSchedule06 == "Y") {
            this.storeTimeSchedule06 = sehdule.storeTimeSchedule06;
          }
          if (sehdule.storeTimeSchedule07 == "Y") {
            this.storeTimeSchedule07 = sehdule.storeTimeSchedule07;
          }
          if (sehdule.storeTimeSchedule08 == "Y") {
            this.storeTimeSchedule08 = sehdule.storeTimeSchedule08;
          }
          if (sehdule.storeTimeSchedule09 == "Y") {
            this.storeTimeSchedule09 = sehdule.storeTimeSchedule09;
          }
          if (sehdule.storeTimeSchedule10 == "Y") {
            this.storeTimeSchedule10 = sehdule.storeTimeSchedule10;
          }
          if (sehdule.storeTimeSchedule11 == "Y") {
            this.storeTimeSchedule11 = sehdule.storeTimeSchedule11;
          }
          if (sehdule.storeTimeSchedule12 == "Y") {
            this.storeTimeSchedule12 = sehdule.storeTimeSchedule12;
          }
          if (sehdule.storeTimeSchedule13 == "Y") {
            this.storeTimeSchedule13 = sehdule.storeTimeSchedule13;
          }
          if (sehdule.storeTimeSchedule14 == "Y") {
            this.storeTimeSchedule14 = sehdule.storeTimeSchedule14;
          }
          if (sehdule.storeTimeSchedule15 == "Y") {
            this.storeTimeSchedule15 = sehdule.storeTimeSchedule15;
          }
          if (sehdule.storeTimeSchedule16 == "Y") {
            this.storeTimeSchedule16 = sehdule.storeTimeSchedule16;
          }
          if (sehdule.storeTimeSchedule17 == "Y") {
            this.storeTimeSchedule17 = sehdule.storeTimeSchedule17;
          }
          if (sehdule.storeTimeSchedule18 == "Y") {
            this.storeTimeSchedule18 = sehdule.storeTimeSchedule18;
          }
          if (sehdule.storeTimeSchedule19 == "Y") {
            this.storeTimeSchedule19 = sehdule.storeTimeSchedule19;
          }
          if (sehdule.storeTimeSchedule20 == "Y") {
            this.storeTimeSchedule20 = sehdule.storeTimeSchedule20;
          }
          if (sehdule.storeTimeSchedule21 == "Y") {
            this.storeTimeSchedule21 = sehdule.storeTimeSchedule21;
          }
          if (sehdule.storeTimeSchedule22 == "Y") {
            this.storeTimeSchedule22 = sehdule.storeTimeSchedule22;
          }
          if (sehdule.storeTimeSchedule23 == "Y") {
            this.storeTimeSchedule23 = sehdule.storeTimeSchedule23;
          }
        } else {
          this.alim(this.getStoreTimeScheduleDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    }
  },
  methods: {
    validate(status) {
      if (this.storeTimeScheduleDate == "") {
        this.alim("송출변경 날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.companyStoreSid == "") {
        this.alim("스토어를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.storeTimeSchedule00 == "") {
        this.storeTimeSchedule00 = "N";
      }
      if (this.storeTimeSchedule01 == "") {
        this.storeTimeSchedule01 = "N";
      }
      if (this.storeTimeSchedule02 == "") {
        this.storeTimeSchedule02 = "N";
      }
      if (this.storeTimeSchedule03 == "") {
        this.storeTimeSchedule03 = "N";
      }
      if (this.storeTimeSchedule04 == "") {
        this.storeTimeSchedule04 = "N";
      }
      if (this.storeTimeSchedule05 == "") {
        this.storeTimeSchedule05 = "N";
      }
      if (this.storeTimeSchedule06 == "") {
        this.storeTimeSchedule06 = "N";
      }
      if (this.storeTimeSchedule07 == "") {
        this.storeTimeSchedule07 = "N";
      }
      if (this.storeTimeSchedule08 == "") {
        this.storeTimeSchedule08 = "N";
      }
      if (this.storeTimeSchedule09 == "") {
        this.storeTimeSchedule09 = "N";
      }
      if (this.storeTimeSchedule10 == "") {
        this.storeTimeSchedule10 = "N";
      }
      if (this.storeTimeSchedule11 == "") {
        this.storeTimeSchedule11 = "N";
      }
      if (this.storeTimeSchedule12 == "") {
        this.storeTimeSchedule12 = "N";
      }
      if (this.storeTimeSchedule13 == "") {
        this.storeTimeSchedule13 = "N";
      }
      if (this.storeTimeSchedule14 == "") {
        this.storeTimeSchedule14 = "N";
      }
      if (this.storeTimeSchedule15 == "") {
        this.storeTimeSchedule15 = "N";
      }
      if (this.storeTimeSchedule16 == "") {
        this.storeTimeSchedule16 = "N";
      }
      if (this.storeTimeSchedule17 == "") {
        this.storeTimeSchedule17 = "N";
      }
      if (this.storeTimeSchedule18 == "") {
        this.storeTimeSchedule18 = "N";
      }
      if (this.storeTimeSchedule19 == "") {
        this.storeTimeSchedule19 = "N";
      }
      if (this.storeTimeSchedule20 == "") {
        this.storeTimeSchedule20 = "N";
      }
      if (this.storeTimeSchedule21 == "") {
        this.storeTimeSchedule21 = "N";
      }
      if (this.storeTimeSchedule22 == "") {
        this.storeTimeSchedule22 = "N";
      }
      if (this.storeTimeSchedule23 == "") {
        this.storeTimeSchedule23 = "N";
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
        await this.$store.dispatch("companyStore/STORE_TIME_SCHEDULE_ADD", {
          companyStoreSid: this.companyStoreSid,
          storeTimeScheduleDate: this.storeTimeScheduleDate,
          storeTimeSchedule00: this.storeTimeSchedule00,
          storeTimeSchedule01: this.storeTimeSchedule01,
          storeTimeSchedule02: this.storeTimeSchedule02,
          storeTimeSchedule03: this.storeTimeSchedule03,
          storeTimeSchedule04: this.storeTimeSchedule04,
          storeTimeSchedule05: this.storeTimeSchedule05,
          storeTimeSchedule06: this.storeTimeSchedule06,
          storeTimeSchedule07: this.storeTimeSchedule07,
          storeTimeSchedule08: this.storeTimeSchedule08,
          storeTimeSchedule09: this.storeTimeSchedule09,
          storeTimeSchedule10: this.storeTimeSchedule10,
          storeTimeSchedule11: this.storeTimeSchedule11,
          storeTimeSchedule12: this.storeTimeSchedule12,
          storeTimeSchedule13: this.storeTimeSchedule13,
          storeTimeSchedule14: this.storeTimeSchedule14,
          storeTimeSchedule15: this.storeTimeSchedule15,
          storeTimeSchedule16: this.storeTimeSchedule16,
          storeTimeSchedule17: this.storeTimeSchedule17,
          storeTimeSchedule18: this.storeTimeSchedule18,
          storeTimeSchedule19: this.storeTimeSchedule19,
          storeTimeSchedule20: this.storeTimeSchedule20,
          storeTimeSchedule21: this.storeTimeSchedule21,
          storeTimeSchedule22: this.storeTimeSchedule22,
          storeTimeSchedule23: this.storeTimeSchedule23,
        });
        if (this.StoreTimeScheduleAdd.channeltuneApiResult.errorCode == 200) {
          this.closeModal = true;
          this.alim("등록 되었습니다.", this.successColor);
        } else {
          this.alim(this.StoreTimeScheduleAdd.channeltuneApiResult.errorMessage, this.errorColor);
          this.clear();
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
        await this.$store.dispatch("companyStore/STORE_TIME_SCHEDULE_MODIFY", {
          id: this.storeTimeScheduleSid,
          companyStoreSid: this.companyStoreSid,
          storeTimeScheduleDate: this.storeTimeScheduleDate,
          storeTimeSchedule00: this.storeTimeSchedule00,
          storeTimeSchedule01: this.storeTimeSchedule01,
          storeTimeSchedule02: this.storeTimeSchedule02,
          storeTimeSchedule03: this.storeTimeSchedule03,
          storeTimeSchedule04: this.storeTimeSchedule04,
          storeTimeSchedule05: this.storeTimeSchedule05,
          storeTimeSchedule06: this.storeTimeSchedule06,
          storeTimeSchedule07: this.storeTimeSchedule07,
          storeTimeSchedule08: this.storeTimeSchedule08,
          storeTimeSchedule09: this.storeTimeSchedule09,
          storeTimeSchedule10: this.storeTimeSchedule10,
          storeTimeSchedule11: this.storeTimeSchedule11,
          storeTimeSchedule12: this.storeTimeSchedule12,
          storeTimeSchedule13: this.storeTimeSchedule13,
          storeTimeSchedule14: this.storeTimeSchedule14,
          storeTimeSchedule15: this.storeTimeSchedule15,
          storeTimeSchedule16: this.storeTimeSchedule16,
          storeTimeSchedule17: this.storeTimeSchedule17,
          storeTimeSchedule18: this.storeTimeSchedule18,
          storeTimeSchedule19: this.storeTimeSchedule19,
          storeTimeSchedule20: this.storeTimeSchedule20,
          storeTimeSchedule21: this.storeTimeSchedule21,
          storeTimeSchedule22: this.storeTimeSchedule22,
          storeTimeSchedule23: this.storeTimeSchedule23,
        });
        if (this.StoreTimeScheduleModifyResult.channeltuneApiResult.errorCode == 200) {
          this.closeModal = true;
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.StoreTimeScheduleModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("companyStore/STORE_DEL", this.storeTimeScheduleSid);
            if (this.storeDelResult.channeltuneApiResult.errorCode == 200) {
              this.$attrs.update();
              this.close();
            } else {
              this.alim(this.storeDelResult.channeltuneApiResult.errorMessage, this.errorColor);
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
    storeDate(data) {
      this.storeTimeScheduleDate = data;
    },
    storeSearchModal() {
      this.$modal.show(StoreListModal, { update: this.updateStore }, getPopupOpt("StoreListModal", "850px", "auto", false));
    },
    updateStore(data) {
      this.companyStoreSid = data.id;
      this.name = data.name;
    },
    close() {
      if (this.closeModal === true) {
        this.$attrs.update();
      }
      this.$emit("close");
    },
    clear() {
      this.clearDate = !this.clearDate;
      this.companyStoreSid = "";
      this.name = "";
      this.storeTimeSchedule00 = "";
      this.storeTimeSchedule01 = "";
      this.storeTimeSchedule02 = "";
      this.storeTimeSchedule03 = "";
      this.storeTimeSchedule04 = "";
      this.storeTimeSchedule05 = "";
      this.storeTimeSchedule06 = "";
      this.storeTimeSchedule07 = "";
      this.storeTimeSchedule08 = "";
      this.storeTimeSchedule09 = "";
      this.storeTimeSchedule10 = "";
      this.storeTimeSchedule11 = "";
      this.storeTimeSchedule12 = "";
      this.storeTimeSchedule13 = "";
      this.storeTimeSchedule14 = "";
      this.storeTimeSchedule15 = "";
      this.storeTimeSchedule16 = "";
      this.storeTimeSchedule17 = "";
      this.storeTimeSchedule18 = "";
      this.storeTimeSchedule19 = "";
      this.storeTimeSchedule20 = "";
      this.storeTimeSchedule21 = "";
      this.storeTimeSchedule22 = "";
      this.storeTimeSchedule23 = "";
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
          width: 110px;
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
</style>
