<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application">
        <h2>{{ name }} 스토어 집계 처리</h2>
        <div class="btn-group">
          <v-btn small color="primary" @click="reg">집계처리</v-btn>
          <v-btn small>CLEAR</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <table width="100%" class="tbl-reg mt0 store-send-time column2">
            <colgroup>
              <col width="120" />
              <col width="*" />
              <col width="120" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>기준연도</td>
                <td><v-select :items="year" v-model="storeAppraisalYear" outlined class="select-basic"></v-select></td>
                <td>기준월</td>
                <td><v-select :items="month" v-model="storeAppraisalMonth" outlined class="select-basic"></v-select></td>
              </tr>
              <tr>
                <td>스토어</td>
                <td class="store" colspan="3">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" class="mr5" @click="storeSearchModal">조회 </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="info-box">
            <p>기준년도와 월을 선택해 모든 스토어의 기준연월 전 1개월 평균데이터를 계산해서 매장의 등급을 계산한다.</p>
            <p>특정 스토어 선택시 해당 스토어만 계산 한다.</p>
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
import { getPopupOpt } from "@/utils/modal";
import StoreListModal from "@/components/modal/common/StoreList.vue";
import { year } from "@/utils/yearSet";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import loading from "@/mixins/loading";
export default {
  components: {
    modalWrap,
    alim,
  },
  mixins: [alimMixin, loading],
  props: ["aggregationKind"],
  data() {
    return {
      year: [],
      month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      storeAppraisalYear: "",
      storeAppraisalMonth: "",
      companyStoreSid: "",
      companyStoreName: "",
      //컨펌 데이터
      dialog: false,
      dialogTitle: "",
      dialogText: "",
      type: "",
      page: 1,
      name: "",
    };
  },
  computed: {
    ...mapGetters("companyStore", ["aggregationByMonth", "aggregationByTime", "aggregationByDay"]),
  },
  async mounted() {
    if (this.aggregationKind === "mAvg") {
      this.name = "월 평균";
    } else if (this.aggregationKind === "Daily") {
      this.name = "일별";
    } else if (this.aggregationKind === "time") {
      this.name = "시간대별";
    }

    const yearset = year("onlyYear");
    this.year = yearset;
  },
  methods: {
    validate(status) {
      if (this.storeAppraisalYear === "") {
        this.alim("연도를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.storeAppraisalMonth === "") {
        this.alim("월을 선택해주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
    },
    //시간대별 집계
    async aggregationTime() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/AGGREGATION_BY_TIME", {
          storeAppraisalYear: this.storeAppraisalYear,
          storeAppraisalMonth: this.storeAppraisalMonth,
          companyStoreSid: this.companyStoreSid,
        });
        const res = this.aggregationByTime.channeltuneApiResult;

        bus.$emit("end:spinner");
        if (res.errorCode !== "200") {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //일 평균 집계
    async aggregationDay() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/AGGREGATION_BY_DAY", {
          storeAppraisalYear: this.storeAppraisalYear,
          storeAppraisalMonth: this.storeAppraisalMonth,
          companyStoreSid: this.companyStoreSid,
        });
        const res = this.aggregationByDay.channeltuneApiResult;

        bus.$emit("end:spinner");
        if (res.errorCode !== "200") {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //월 평균 집계
    async aggregationMonth() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/AGGREGATION_BY_MONTH", {
          storeAppraisalYear: this.storeAppraisalYear,
          storeAppraisalMonth: this.storeAppraisalMonth,
          companyStoreSid: this.companyStoreSid,
        });
        const res = this.aggregationByMonth.channeltuneApiResult;

        bus.$emit("end:spinner");
        if (res.errorCode !== "200") {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        bus.$emit("end:spinner");
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    reg() {
      if (this.storeAppraisalYear === "" || this.storeAppraisalYear === null) {
        return this.alim("기준년도를 선택해주세요", this.errorColor);
      }
      if (this.storeAppraisalMonth === "" || this.storeAppraisalMonth === null) {
        return this.alim("기준월을 선택해주세요", this.errorColor);
      }

      if (this.aggregationKind === "mAvg") {
        this.aggregationMonth();
      } else if (this.aggregationKind === "Daily") {
        this.aggregationDay();
      } else if (this.aggregationKind === "time") {
        this.aggregationTime();
      }
    },
    storeSearchModal() {
      this.$modal.show(StoreListModal, { update: this.updateStore }, getPopupOpt("StoreListModal", "1000px", "auto", false));
    },
    updateStore(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
    },
    close() {
      this.$emit("close");
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
</style>
