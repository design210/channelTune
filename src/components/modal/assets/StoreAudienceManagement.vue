<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>설정</h2>
      <!-- <div class="btn-group">
				<v-btn small color="primary" dark>등록</v-btn>
				<v-btn small color="warning" dark>수정</v-btn>
				<v-btn small color="error" dark>삭제</v-btn>
				<v-btn small>clear</v-btn>
			</div> -->
    </template>
    <template slot="body">
      <section class="first_sec">
        <table width="100%" class="tbl-reg column2">
          <colgroup>
            <col width="100" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>고유 코드</td>
            <td><input type="text" readonly v-model="prospectiveCustomerSid" /></td>
            <td class="required">상태</td>
            <td>
              <input type="text" v-model="prospectiveCustomerStatusName" readonly />
            </td>
          </tr>
          <tr>
            <td class="">연결 스토어</td>
            <td colspan="3" class="single field-div">
              <input type="text" class="input-first" readonly v-model="companyStoreSid" />
              <input type="text" class="input-last" readonly v-model="companyStoreName" />
            </td>
          </tr>
          <tr>
            <td class="required">스토어 유형</td>
            <td>
              <input type="text" class="input-last" readonly v-model="prospectiveCustomerStoreKindName" />
            </td>
            <td class="required">등록날짜</td>
            <td class="date-100">
              <date-picker :readOnly="true" :propdate="prospectiveCustomerDate" @updateDate="prospectiveCustomerDateProp"></date-picker>
            </td>
          </tr>
          <tr>
            <td class="required">스토어(사이트)명</td>
            <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerStoreName" readonly /></td>
          </tr>
          <tr>
            <td class="required">스토어 국가</td>
            <td>
              <input type="text" v-model="prospectiveCustomerStoreNationName" readonly />
            </td>
            <td class="required">스토어 지역</td>
            <td><input type="text" v-model="prospectiveCustomerStoreArea" readonly /></td>
          </tr>
          <tr>
            <td class="required">내부 담당자</td>
            <td colspan="3" class="single field-div">
              <input type="text" class="input-first" readonly v-model="interbridEmployeeSid" />
              <input type="text" class="input-last" readonly v-model="interbridEmployeeName" />
            </td>
          </tr>
          <tr>
            <td class="required">영업 업체</td>
            <td colspan="3" class="single field-div">
              <input type="text" class="input-first" readonly v-model="companySid" />
              <input type="text" class="input-last" readonly v-model="companyName" />
            </td>
          </tr>
          <tr>
            <td class="required">영업 담당자</td>
            <td colspan="3" class="single field-div">
              <input type="text" class="input-first" readonly v-model="companyPersonSid" />
              <input type="text" class="input-last" readonly v-model="companyPersonName" />
            </td>
          </tr>
          <tr>
            <td class="required">스토어 담당자</td>
            <td><input type="text" v-model="prospectiveCustomerName" readonly /></td>
            <td class="required">스토어 연락처</td>
            <td><input type="text" v-model="prospectiveCustomerHp" readonly /></td>
          </tr>
          <tr>
            <td>스토어 우편번호</td>
            <td colspan="3" class="single">
              <input type="text" v-model="prospectiveCustomerZipCode" class="zip zip-status" readonly />
            </td>
          </tr>
          <tr>
            <td>주소</td>
            <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerAddress1" readonly class="zip-status" /></td>
          </tr>
          <tr>
            <td>상세 주소</td>
            <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerAddress2" readonly /></td>
          </tr>
        </table>

        <table width="100%" class="tbl-reg column2">
          <colgroup>
            <col width="100" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>스토어 상권</td>
            <td>
              <input type="text" v-model="prospectiveCustomerAnalyzeVolumeName" readonly class="zip-status" />
            </td>
            <td>입지분석</td>
            <td>
              <input type="text" v-model="prospectiveCustomerAnalyzeLocationName" readonly class="zip-status" />
            </td>
          </tr>
          <tr>
            <td>유동인구 20대</td>
            <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation20" readonly /> 명</td>
            <td>유동인구 30대</td>
            <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation30" readonly /> 명</td>
          </tr>
          <tr>
            <td>유동인구 40대</td>
            <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation40" readonly /> 명</td>
            <td>유동인구 50대</td>
            <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation50" readonly /> 명</td>
          </tr>
          <tr>
            <td>특이사항</td>
            <td colspan="3" class="single textarea-space"><textarea v-model="prospectiveCustomerMemo" readonly></textarea></td>
          </tr>
          <tr>
            <td>실측후진행상황</td>
            <td colspan="3" class="single textarea-space"><textarea v-model="prospectiveCustomerConsultationMemo" readonly></textarea></td>
          </tr>
          <tr>
            <td>실측 날짜</td>
            <td colspan="3" class="single">
              <div class="d-flex">
                <div class="date-width">
                  <input type="text" class="with-text" v-model="prospectiveCustomerSurveyDate" readonly />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>설치 예정 날짜</td>
            <td>
              <input type="text" class="with-text" v-model="prospectiveCustomerEquipPlanDate" readonly />
            </td>
            <td>품의 진행 날짜</td>
            <td>
              <input type="text" class="with-text" v-model="prospectiveCustomerConsultationDate" readonly />
            </td>
          </tr>
          <tr>
            <td>선팅 날짜</td>
            <td>
              <input type="text" class="with-text" v-model="prospectiveCustomerWindowTintingDate" readonly />
            </td>
            <td>설치완료 날짜</td>
            <td>
              <input type="text" class="with-text" v-model="prospectiveCustomerEquipCompleteDate" readonly />
            </td>
          </tr>
        </table>
        <div class="tbl-div-line"></div>
        <table width="100%" class="tbl-reg column2">
          <colgroup>
            <col width="100" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>생성일시</td>
            <td colspan="3" class="single"><input type="text" readonly v-model="created_at" /></td>
          </tr>
          <tr>
            <td>업데이트 일시</td>
            <td colspan="3" class="single"><input type="text" readonly v-model="updated_at" /></td>
          </tr>
        </table>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import DatePicker from "@/components/form/DatePicker.vue";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
export default {
  components: {
    modalWrap,
    DatePicker,
    alim,
  },
  mixins: [loading, alimMixin],
  props: ["id"],
  data() {
    return {
      //디테일 데이터
      prospectiveCustomerSid: "",
      prospectiveCustomerDate: "",
      prospectiveCustomerStoreName: "",
      prospectiveCustomerStoreKind: "",
      prospectiveCustomerStoreNation: "",
      prospectiveCustomerStoreArea: "",
      companySid: "",
      companyPersonSid: "",
      prospectiveCustomerName: "",
      prospectiveCustomerHp: "",
      prospectiveCustomerZipCode: "",
      prospectiveCustomerAddress1: "",
      prospectiveCustomerAddress2: "",
      prospectiveCustomerAnalyzeVolume: "",
      prospectiveCustomerAnalyzeLocation: "",
      prospectiveCustomerFloatingPopulation20: null,
      prospectiveCustomerFloatingPopulation30: null,
      prospectiveCustomerFloatingPopulation40: null,
      prospectiveCustomerFloatingPopulation50: null,
      prospectiveCustomerMemo: "",
      prospectiveCustomerConsultationMemo: "",
      prospectiveCustomerSurveyDate: "",
      prospectiveCustomerEquipPlanDate: "",
      prospectiveCustomerConsultationDate: "",
      prospectiveCustomerWindowTintingDate: "",
      prospectiveCustomerEquipCompleteDate: "",
      prospectiveCustomerStatus: "",
      created_at: "",
      updated_at: "",
      interbridEmployeeName: "",
      interbridEmployeeSid: "",
      companyName: "",
      companyPersonName: "",
      prospectiveCustomerStatusName: "",
      prospectiveCustomerAnalyzeVolumeName: "",
      prospectiveCustomerAnalyzeLocationName: "",
      prospectiveCustomerStoreKindName: "",
      prospectiveCustomerStoreNationName: "",
      // 연결스토어 정보
      companyStoreSid: "",
      companyStoreName: "",

      statusCode: "SYS21802B012",
      typeCode: "SYS21802B007",
      nationCode: "SYS21729B003",
      storeCode: "SYS21802B016",
      zoneCode: "SYS21802B017",
    };
  },
  computed: {
    ...mapGetters("prospectiveCustomer", ["getCustomerDetail"]),
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_DETAIL", {
          prospectiveCustomerSid: this.id,
        });
        const customerData = this.getCustomerDetail.channeltuneApiResult.prospectiveCustomer;

        this.prospectiveCustomerSid = customerData.prospectiveCustomerSid;
        this.prospectiveCustomerAddress1 = customerData.prospectiveCustomerAddress1;
        this.prospectiveCustomerAddress2 = customerData.prospectiveCustomerAddress2;
        this.prospectiveCustomerAnalyzeLocation = customerData.prospectiveCustomerAnalyzeLocation;
        this.prospectiveCustomerAnalyzeLocationName = customerData.prospectiveCustomerAnalyzeLocationName;
        this.prospectiveCustomerAnalyzeVolume = customerData.prospectiveCustomerAnalyzeVolume;
        this.prospectiveCustomerAnalyzeVolumeName = customerData.prospectiveCustomerAnalyzeVolumeName;
        this.prospectiveCustomerConsultationDate = customerData.prospectiveCustomerConsultationDate;
        this.prospectiveCustomerConsultationMemo = customerData.prospectiveCustomerConsultationMemo;
        this.prospectiveCustomerDate = customerData.prospectiveCustomerDate;
        this.prospectiveCustomerEquipCompleteDate = customerData.prospectiveCustomerEquipCompleteDate;
        this.prospectiveCustomerEquipPlanDate = customerData.prospectiveCustomerEquipPlanDate;
        this.prospectiveCustomerFloatingPopulation20 = customerData.prospectiveCustomerFloatingPopulation20;
        this.prospectiveCustomerFloatingPopulation30 = customerData.prospectiveCustomerFloatingPopulation30;
        this.prospectiveCustomerFloatingPopulation40 = customerData.prospectiveCustomerFloatingPopulation40;
        this.prospectiveCustomerFloatingPopulation50 = customerData.prospectiveCustomerFloatingPopulation50;
        this.prospectiveCustomerHp = customerData.prospectiveCustomerHp;
        this.prospectiveCustomerMemo = customerData.prospectiveCustomerMemo;
        this.prospectiveCustomerName = customerData.prospectiveCustomerName;
        this.prospectiveCustomerSid = customerData.prospectiveCustomerSid;
        this.prospectiveCustomerStatus = customerData.prospectiveCustomerStatus;
        this.prospectiveCustomerStatusName = customerData.prospectiveCustomerStatusName;
        this.prospectiveCustomerStoreArea = customerData.prospectiveCustomerStoreArea;
        this.prospectiveCustomerStoreKind = customerData.prospectiveCustomerStoreKind;
        this.prospectiveCustomerStoreKindName = customerData.prospectiveCustomerStoreKindName;
        this.prospectiveCustomerStoreName = customerData.prospectiveCustomerStoreName;
        this.prospectiveCustomerStoreNation = customerData.prospectiveCustomerStoreNation;
        this.prospectiveCustomerStoreNationName = customerData.prospectiveCustomerStoreNationName;
        this.prospectiveCustomerSurveyDate = customerData.prospectiveCustomerSurveyDate;
        this.prospectiveCustomerWindowTintingDate = customerData.prospectiveCustomerWindowTintingDate;
        this.prospectiveCustomerZipCode = customerData.prospectiveCustomerZipCode;
        this.created_at = customerData.created_at;
        this.updated_at = customerData.updated_at;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  & button {
    margin-left: 5px;
  }
}

section {
  overflow-y: auto;
  max-height: 800px;

  padding: 0px 20px;
}

.first_sec {
  border-right: 1px dotted black;
}
</style>
