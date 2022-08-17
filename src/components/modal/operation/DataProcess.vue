<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>데이터 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="reg">처리</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time column2">
            <colgroup>
              <col width="120" />
              <col width="200" />
              <col width="120" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>스토어 선택</td>
                <td>
                  <v-checkbox v-model="total" label="전체 선택" value="Y"></v-checkbox>
                </td>
                <td colspan="2" class="field_div pl10">
                  <span class="mr24">스토어</span>
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" @click="showStoreListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">원본 데이터 날짜</td>
                <td><date-picker :propdate="originDate" @updateDate="originDateProp" class="modal-date"></date-picker></td>
                <td class="pl10 required">데이터 변경 날짜</td>
                <td><date-picker :propdate="targetDate" @updateDate="targetDateProp" class="modal-date"></date-picker></td>
              </tr>
            </tbody>
          </table>
          <div class="info-box">
            <p>해당 스토어의 트래필데이터를 원본데이터 기준 날짜대로 변경됩니다.</p>
            <p>기존 해당날짜에 등록된 모든 데이터는 해당 기준날짜의 데이터로 변경되니 신중하게 처리해주세요!</p>
            <p>스토어의 전체 선택은 원본데이터 기준날짜에 등록되어있는 모든 스토어를 의미합니다.</p>
          </div>
        </section>
        <!-- 알럿 -->
        <alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
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
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import storeListModal from "@/components/modal/common/StoreList";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import DatePicker from "@/components/form/DatePicker";
export default {
  components: {
    modalWrap,
    alim,
    DatePicker,
  },
  mixins: [loading, fileUploadMixin, alimMixin],
  data() {
    return {
      total: "",
      channeltuneFiles: "",
      //컨펌 데이터
      dialog: false,
      dialogTitle: "",
      dialogText: "",
      companyStoreSid: "",
      companyStoreName: "",
      type: "",
      page: 1,
      originDate: "",
      targetDate: "",
    };
  },
  computed: {
    ...mapGetters("companyStore", ["storeTrafficDailyReplace"]),
  },
  methods: {
    validate(status) {
      if (this.channeltuneFiles.length === 0) {
        this.alim("파일을 선택해주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
    },
    async reg() {
      if (this.originDate === "" || this.originDate === undefined) {
        return this.alim("원본 데이터 날짜를 선택해주세요.", this.errorColor);
      }
      if (this.targetDate === "" || this.targetDate === undefined) {
        return this.alim("데이터 변경 날짜를 선택해주세요.", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/STORE_TRAFFIC_DAILY_REPLACE", {
          originDate: this.originDate,
          targetDate: this.targetDate,
          allStore: this.total,
          targetStore: this.companyStoreSid,
        });
        bus.$emit("end:spinner");
        const res = this.storeTrafficDailyReplace.channeltuneApiResult;

        if (res.errorCode === 200) {
          this.alim(res.errorMessage, this.successColor);
          setTimeout(() => {
            this.$emit("close");
          }, 3000);
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      this.$emit("close");
    },
    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    storeUpdate({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;
    },
    originDateProp(data) {
      this.originDate = data;
    },
    targetDateProp(data) {
      this.targetDate = data;
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
.tbl-reg::v-deep {
  & .v-input__slot {
    margin: 0 !important;

    & label {
      @include NotoSans(1.4, 500, #323232);
    }
  }
  & .v-messages {
    display: none !important;
  }

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
.field_div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    margin: 0 5px;
    width: calc(100% - 225px) !important;
  }
}
</style>
