<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>스토어별 상권분석</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="left-column init-wrap section-box border-outside">
          <div class="border">
            <table width="100%" class="tbl-reg column2 tabled mt0">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="100" />
              </colgroup>
              <thead>
                <th>고유코드</th>
                <th class="left">스토어명</th>
                <th>적용시작일</th>
              </thead>
            </table>
            <table width="100%" class="tbl-reg select-tbl tbl column2 mt0" id="scrolled">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="100" />
              </colgroup>
              <tbody>
                <tr v-for="(item, idx) in list" :key="idx" @click="getDetail(item.storeZoneAnalysisSid)">
                  <td class="center">{{ item.storeZoneAnalysisSid }}</td>
                  <td class="left">{{ item.companyStoreName }}</td>
                  <td class="center">{{ item.storeZoneAnalysisStartDate }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="list.length < 1">
                  <td colspan="3">분석된 리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <section class="init-wrap section-box border-outside right-column">
          <div class="border">
            <div class="header">
              <h3>항목</h3>
              <div class="btn-group">
                <v-btn small color="primary" dark @click="storeZoneValidate('add')">등록</v-btn>
                <v-btn small color="warning" dark @click="storeZoneValidate('update')">수정</v-btn>
                <v-btn small color="error" dark @click="storeZoneValidate('delete')">삭제</v-btn>
                <v-btn small @click="clear">CLEAR</v-btn>
              </div>
            </div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td class="field-div" colspan="3"><input type="text" readonly v-model="storeZoneAnalysisSid" /></td>
              </tr>
              <tr>
                <td>스토어</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="searchStoreSid" />
                  <input type="text" class="input-last" readonly v-model="searchStoreName" />
                </td>
              </tr>
              <tr>
                <td>적용시작일</td>
                <td class="field-div" colspan="3">
                  <date-picker :propdate="storeZoneAnalysisStartDate" @updateDate="newDate" class="modal-date"></date-picker>
                </td>
              </tr>
              <tr>
                <td>상권등급</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisZoneGrade" /></td>
                <td>입지등급</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisLocationGrade" /></td>
              </tr>
              <tr>
                <td>남성비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisMalePercent" /></td>
                <td>여성비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisFemalePercent" /></td>
              </tr>
              <tr>
                <td>10대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisTeenagePercent" /></td>
                <td>20대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisTwentiesPercent" /></td>
              </tr>
              <tr>
                <td>30대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisThirtiesPercent" /></td>
                <td>40대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisFortiesPercent" /></td>
              </tr>
              <tr>
                <td>50대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisFiftiesPercent" /></td>
                <td>60대비율(%)</td>
                <td class="field-div"><input type="text" v-model="storeZoneAnalysisOverSixtiesPercent" /></td>
              </tr>
            </table>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 사진파일 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="confirmDelete"></confirm>
        </section>
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
import DatePicker from "@/components/form/DatePicker.vue";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    DatePicker,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["companyStoreSid", "companyStoreName"],
  data() {
    return {
      list: [],
      storeZoneAnalysisSid: "",
      storeZoneAnalysisStartDate: "",
      storeZoneAnalysisLocationGrade: "",
      storeZoneAnalysisZoneGrade: "",
      storeZoneAnalysisMalePercent: "",
      storeZoneAnalysisFemalePercent: "",
      storeZoneAnalysisTeenagePercent: "",
      storeZoneAnalysisTwentiesPercent: "",
      storeZoneAnalysisThirtiesPercent: "",
      storeZoneAnalysisFortiesPercent: "",
      storeZoneAnalysisFiftiesPercent: "",
      storeZoneAnalysisOverSixtiesPercent: "",

      searchStoreSid: "",
      searchStoreName: "",

      check: false,
    };
  },
  computed: {
    ...mapGetters("storeZoneAnalysis", [
      "searchAnalysisData",
      "getStoreZoneAnalysisDetail",
      "getStoreZoneAnalysisAdd",
      "getStoreZoneAnalysisDelete",
      "getStoreZoneAnalysisUpdate",
    ]),
  },
  mounted() {
    this.searchStoreAnalysis();
  },

  methods: {
    close() {
      this.$emit("close");
    },
    //조회
    async searchStoreAnalysis() {
      this.searchStoreSid = this.companyStoreSid;
      this.searchStoreName = this.companyStoreName;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/SEARCH_ANALYSIS_DATA", {
          size: "",
          page: "",
          companyStoreSid: this.searchStoreSid,
        });

        const res = this.searchAnalysisData.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.storeZoneAnlaysis;
        if (this.list.length > 0 && !this.check) {
          await this.getDetail(this.list[0].storeZoneAnalysisSid);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세조회
    async getDetail(id) {
      this.storeZoneAnalysisSid = id;
      this.searchStoreSid = this.companyStoreSid;
      this.searchStoreName = this.companyStoreName;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_DETAIL", id);
        const res = this.getStoreZoneAnalysisDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        const d = res.storeZoneAnlaysis;

        this.storeZoneAnalysisStartDate = d.storeZoneAnalysisStartDate;
        this.storeZoneAnalysisLocationGrade = d.storeZoneAnalysisLocationGrade;
        this.storeZoneAnalysisZoneGrade = d.storeZoneAnalysisZoneGrade;
        this.storeZoneAnalysisMalePercent = d.storeZoneAnalysisMalePercent;
        this.storeZoneAnalysisFemalePercent = d.storeZoneAnalysisFemalePercent;
        this.storeZoneAnalysisTeenagePercent = d.storeZoneAnalysisTeenagePercent;
        this.storeZoneAnalysisTwentiesPercent = d.storeZoneAnalysisTwentiesPercent;
        this.storeZoneAnalysisThirtiesPercent = d.storeZoneAnalysisThirtiesPercent;
        this.storeZoneAnalysisFortiesPercent = d.storeZoneAnalysisFortiesPercent;
        this.storeZoneAnalysisFiftiesPercent = d.storeZoneAnalysisFiftiesPercent;
        this.storeZoneAnalysisOverSixtiesPercent = d.storeZoneAnalysisOverSixtiesPercent;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록
    async addAnalysis() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_ADD", {
          companyStoreSid: this.searchStoreSid,
          storeZoneAnalysisStartDate: this.storeZoneAnalysisStartDate,
          storeZoneAnalysisZoneGrade: this.storeZoneAnalysisZoneGrade,
          storeZoneAnalysisLocationGrade: this.storeZoneAnalysisLocationGrade,
          storeZoneAnalysisMalePercent: this.storeZoneAnalysisMalePercent,
          storeZoneAnalysisFemalePercent: this.storeZoneAnalysisFemalePercent,
          storeZoneAnalysisTeenagePercent: this.storeZoneAnalysisTeenagePercent,
          storeZoneAnalysisTwentiesPercent: this.storeZoneAnalysisTwentiesPercent,
          storeZoneAnalysisThirtiesPercent: this.storeZoneAnalysisThirtiesPercent,
          storeZoneAnalysisFortiesPercent: this.storeZoneAnalysisFortiesPercent,
          storeZoneAnalysisFiftiesPercent: this.storeZoneAnalysisFiftiesPercent,
          storeZoneAnalysisOverSixtiesPercent: this.storeZoneAnalysisOverSixtiesPercent,
        });
        const res = this.getStoreZoneAnalysisAdd.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.searchStoreAnalysis();
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //삭제
    async deleteAnalysis() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_DELETE", this.storeZoneAnalysisSid);
      const res = this.getStoreZoneAnalysisDelete.channeltuneApiResult;
      if (res.errorCode !== 200) {
        bus.$emit("end:spinner");
        return this.alim(res.errorMessage, this.errorColor);
      }
      this.alim(res.errorMessage, this.successColor);
      this.searchStoreAnalysis();
      this.clear();
      bus.$emit("end:spinner");
    },
    //update
    async update() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("storeZoneAnalysis/STOREZONEANALYSIS_UPDATE", {
          storeZoneAnalysisSid: this.storeZoneAnalysisSid,
          storeZoneAnalysisZoneGrade: this.storeZoneAnalysisZoneGrade,
          storeZoneAnalysisLocationGrade: this.storeZoneAnalysisLocationGrade,
          storeZoneAnalysisMalePercent: this.storeZoneAnalysisMalePercent,
          storeZoneAnalysisFemalePercent: this.storeZoneAnalysisFemalePercent,
          storeZoneAnalysisTeenagePercent: this.storeZoneAnalysisTeenagePercent,
          storeZoneAnalysisTwentiesPercent: this.storeZoneAnalysisTwentiesPercent,
          storeZoneAnalysisThirtiesPercent: this.storeZoneAnalysisThirtiesPercent,
          storeZoneAnalysisFortiesPercent: this.storeZoneAnalysisFortiesPercent,
          storeZoneAnalysisFiftiesPercent: this.storeZoneAnalysisFiftiesPercent,
          storeZoneAnalysisOverSixtiesPercent: this.storeZoneAnalysisOverSixtiesPercent,
        });
        const res = this.getStoreZoneAnalysisUpdate.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.searchStoreAnalysis();
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    newDate(data) {
      this.storeZoneAnalysisStartDate = data;
    },
    clear() {
      this.storeZoneAnalysisSid = "";
      this.storeZoneAnalysisStartDate = "";
      this.storeZoneAnalysisLocationGrade = "";
      this.storeZoneAnalysisZoneGrade = "";
      this.storeZoneAnalysisMalePercent = "";
      this.storeZoneAnalysisFemalePercent = "";
      this.storeZoneAnalysisTeenagePercent = "";
      this.storeZoneAnalysisTwentiesPercent = "";
      this.storeZoneAnalysisThirtiesPercent = "";
      this.storeZoneAnalysisFortiesPercent = "";
      this.storeZoneAnalysisFiftiesPercent = "";
      this.storeZoneAnalysisOverSixtiesPercent = "";
    },
    confirmDelete(data) {
      if (data.del === "Y" && data.type === "list") {
        this.deleteAnalysis();
      }
      this.resetDeleteData();
    },
    storeZoneValidate(type) {
      const reg = /[0-9]등급/g;
      const exp = /[0-9]등급/g;
      this.storeZoneAnalysisZoneGrade = this.replacing(this.storeZoneAnalysisZoneGrade); //공백이 있을 시 공백 제거
      this.storeZoneAnalysisLocationGrade = this.replacing(this.storeZoneAnalysisLocationGrade); //공백이 있을 시 공백 제거
      const zoneTest = reg.test(this.storeZoneAnalysisZoneGrade);
      const locationTest = exp.test(this.storeZoneAnalysisLocationGrade);
      if (type == "add") {
        if (this.storeZoneAnalysisStartDate == "" || this.storeZoneAnalysisStartDate == null) {
          return this.alim("적용기준 시작일을 입력하세요.", this.errorColor);
        }
      }
      if (type == "add" || type == "update") {
        if (this.storeZoneAnalysisZoneGrade == "" || this.storeZoneAnalysisZoneGrade == null) {
          return this.alim("상권등급을 입력하세요.", this.errorColor);
        }
        if (!zoneTest || this.storeZoneAnalysisZoneGrade.length > 3) {
          return this.alim('상권등급을 "(숫자)등급" 형식으로 작성해주세요.', this.errorColor);
        }
        if (this.storeZoneAnalysisLocationGrade == "" || this.storeZoneAnalysisLocationGrade == null) {
          return this.alim("입지등급을 입력하세요.", this.errorColor);
        }
        if (!locationTest || this.storeZoneAnalysisLocationGrade.length > 3) {
          return this.alim('입지등급을 "(숫자)등급" 형식으로 작성해주세요.', this.errorColor);
        }
        if (this.storeZoneAnalysisMalePercent == "" || this.storeZoneAnalysisMalePercent == null) {
          return this.alim("남성비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFemalePercent == "" || this.storeZoneAnalysisFemalePercent == null) {
          return this.alim("여성비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisTeenagePercent == "" || this.storeZoneAnalysisTeenagePercent == null) {
          return this.alim("10대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisTwentiesPercent == "" || this.storeZoneAnalysisTwentiesPercent == null) {
          return this.alim("20대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisThirtiesPercent == "" || this.storeZoneAnalysisThirtiesPercent == null) {
          return this.alim("30대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFortiesPercent == "" || this.storeZoneAnalysisFortiesPercent == null) {
          return this.alim("40대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisFiftiesPercent == "" || this.storeZoneAnalysisFiftiesPercent == null) {
          return this.alim("50대비율을 입력하세요.", this.errorColor);
        }
        if (this.storeZoneAnalysisOverSixtiesPercent == "" || this.storeZoneAnalysisOverSixtiesPercent == null) {
          return this.alim("60대비율을 입력하세요.", this.errorColor);
        }
      }
      if (type == "update" || type == "delete") {
        if (this.storeZoneAnalysisSid == "" || this.storeZoneAnalysisSid == null) {
          return this.alim("상권분석을 선택하세요.", this.errorColor);
        }
      }
      switch (type) {
        case "add":
          this.addAnalysis();
          break;
        case "update":
          this.update();
          break;
        case "delete":
          this.confirm();
          break;
      }
    },
    replacing(text) {
      return text.replace(" ", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  justify-content: space-between;
  & .right-column {
    width: calc(50% - 5px);
    max-height: 800px;
  }
  & .left-column {
    width: calc(50% - 5px);
    max-height: 800px;
  }

  & .tbl-reg {
    & tr {
      & td {
        & .date {
          width: 100% !important;
        }
        & .etc {
          & input[type="text"] {
            width: 250px;
            margin-left: 20px;
          }
        }
      }
    }
  }
  .tbl {
    & tr {
      cursor: pointer;
    }
  }
  & .url-create {
    & input {
      width: calc(100% - 160px) !important;
      margin: 0 10px 0 3px;
    }
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 115px) !important;
    margin: 0 0 0 5px !important;
  }
}
.tabled {
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  & th {
    margin-bottom: 5px;
    height: 30px;
  }
}
#scrolled {
  padding-top: 5px;
  overflow-y: auto;
  & td {
    padding: 0 !important;
  }
}
</style>
