<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>트래픽 데이터 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="TrafficDataProcessing">처리</v-btn>
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
                <td class="required">요청 데이터 날짜</td>
                <td><date-picker :propdate="originDate" @updateDate="originDateProp" class="modal-date"></date-picker></td>
              </tr>
            </tbody>
          </table>
          <div class="info-box">
            <p>트래픽 데이터 등록이 필요한 날짜를 요청 데이터 날짜에 설정해주세요</p>
            <p>필요한 스토어가 있으면 스토어를 선택해주세요</p>
            <p>전체 트래픽 등록을 원하시면 전체선택을 체크해주세요.</p>
            <p>30초에서 최대 2분정도 걸릴 수 있습니다.</p>
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
      companyStoreSid: "",
      companyStoreName: "",
      type: "",
      total: "",
      originDate: "",
      num: 123,
    };
  },
  computed: {
    ...mapGetters("companyStore", ["WalkInsightDataProcessing"]),
  },
  methods: {
    close() {
      this.$emit("close");
    },
    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    async TrafficDataProcessing() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("companyStore/WALK_INSIGHT_DATA", {
        searchDate: this.originDate,
        companyStoreSid: this.companyStoreSid,
        total: this.total,
      });
      const res = this.WalkInsightDataProcessing.channeltuneApiResult;
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.alim(res.errorMessage, this.successColor);
      bus.$emit("end:spinner");
      setTimeout(() => {
        this.close();
      }, 2000);
    },
    storeUpdate({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;
    },
    originDateProp(data) {
      this.originDate = data;
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
