<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어 고객 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>고객 리스트</h2>
            <div class="search">
              <input type="text" placeholder="스토어명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              고객 리스트 테이블
            </caption>
            <colgroup>
              <col width="90" />
              <col width="80" />
              <col width="*" />
              <col width="80" />
              <col width="75" />
              <col width="75" />
              <col width="90" />
              <col width="90" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>등록날짜</th>
                <th>스토어명</th>
                <th>스토어유형</th>
                <th>내부담당자</th>
                <th>영업담당자</th>
                <th>스토어담당자</th>
                <th>고객연락처</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="customerDetail(item.prospectiveCustomerSid)">
                <td>{{ item.prospectiveCustomerSid }}</td>
                <td>{{ item.prospectiveCustomerDate }}</td>
                <td>{{ item.prospectiveCustomerStoreName }}</td>
                <td>{{ item.prospectiveCustomerStoreKindName }}</td>
                <td>{{ item.interbridEmployeeName }}</td>
                <td>{{ item.companyPersonName }}</td>
                <td>{{ item.prospectiveCustomerName }}</td>
                <td>{{ item.prospectiveCustomerHp }}</td>
                <td>{{ item.prospectiveCustomerStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="9">고객 리스트가 없습니다.</td>
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
              <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(prospectiveCustomerSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="info-box">
            <p>실측 스케쥴은 <span class="major">기본정보 등록</span>후에 입력 하실 수 있습니다.</p>
          </div>
          <div class="field">
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
                  <pull-down
                    :data="prospectiveCustomerStatus"
                    :code="statusCode"
                    @selected="prospectiveCustomerStatusProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td class="">연결 스토어</td>
                <td colspan="3" class="single field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" dark @click="showStoreConnectModal()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">스토어 유형</td>
                <td>
                  <pull-down
                    :data="prospectiveCustomerStoreKind"
                    :code="typeCode"
                    @selected="prospectiveCustomerStoreKindProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">등록날짜</td>
                <td class="date-100">
                  <date-picker :propdate="prospectiveCustomerDate" @updateDate="prospectiveCustomerDateProp"></date-picker>
                </td>
              </tr>
              <tr>
                <td class="required">스토어(사이트)명</td>
                <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerStoreName" /></td>
              </tr>
              <tr>
                <td class="required">스토어 국가</td>
                <td>
                  <pull-down
                    :data="prospectiveCustomerStoreNation"
                    :code="nationCode"
                    @selected="prospectiveCustomerStoreNationProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">스토어 지역</td>
                <td><input type="text" v-model="prospectiveCustomerStoreArea" /></td>
              </tr>
              <tr>
                <td class="required">내부 담당자</td>
                <td colspan="3" class="single field-div">
                  <input type="text" class="input-first" readonly v-model="interbridEmployeeSid" />
                  <input type="text" class="input-last" readonly v-model="interbridEmployeeName" />
                  <v-btn small color="primary" dark @click="showModalAdminPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">영업 업체</td>
                <td colspan="3" class="single field-div">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" dark @click="showModalCompanyPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">영업 담당자</td>
                <td colspan="3" class="single field-div">
                  <input type="text" class="input-first" readonly v-model="companyPersonSid" />
                  <input type="text" class="input-last" readonly v-model="companyPersonName" />
                  <v-btn small color="primary" dark @click="showModalInsidePopup(companySid)">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">스토어 담당자</td>
                <td><input type="text" v-model="prospectiveCustomerName" /></td>
                <td class="required">스토어 연락처</td>
                <td><input type="text" v-model="prospectiveCustomerHp" /></td>
              </tr>
              <tr>
                <td>스토어 우편번호</td>
                <td colspan="3" class="single">
                  <input type="text" v-model="prospectiveCustomerZipCode" class="zip zip-status" readonly />
                  <v-btn small color="primary" dark @click="showAddressModalPopup()" class="ml5">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerAddress1" readonly class="zip-status" /></td>
              </tr>
              <tr>
                <td>상세 주소</td>
                <td colspan="3" class="single"><input type="text" v-model="prospectiveCustomerAddress2" /></td>
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
                <td>스토어 상권</td>
                <td>
                  <pull-down
                    :data="prospectiveCustomerAnalyzeVolume"
                    :code="storeCode"
                    @selected="prospectiveCustomerAnalyzeVolumeProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>입지분석</td>
                <td>
                  <pull-down
                    :data="prospectiveCustomerAnalyzeLocation"
                    :code="zoneCode"
                    @selected="prospectiveCustomerAnalyzeLocationProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>유동인구 20대</td>
                <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation20" /> 명</td>
                <td>유동인구 30대</td>
                <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation30" /> 명</td>
              </tr>
              <tr>
                <td>유동인구 40대</td>
                <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation40" /> 명</td>
                <td>유동인구 50대</td>
                <td><input type="text" class="with-text" v-model="prospectiveCustomerFloatingPopulation50" /> 명</td>
              </tr>
              <tr>
                <td>특이사항</td>
                <td colspan="3" class="single textarea-space"><textarea v-model="prospectiveCustomerMemo"></textarea></td>
              </tr>
              <tr>
                <td>실측후진행상황</td>
                <td colspan="3" class="single textarea-space"><textarea v-model="prospectiveCustomerConsultationMemo"></textarea></td>
              </tr>
              <tr>
                <td>실측 날짜</td>
                <td colspan="3" class="single">
                  <div class="d-flex">
                    <div class="date-width">
                      <date-picker :propdate="prospectiveCustomerSurveyDate" @updateDate="prospectiveCustomerSurveyDateProp"></date-picker>
                    </div>
                    <v-btn small color="primary" dark class="ml5" @click="schduleReg">실측 스케쥴 등록</v-btn>
                  </div>
                </td>
              </tr>
              <tr>
                <td>설치 예정 날짜</td>
                <td>
                  <date-picker :propdate="prospectiveCustomerEquipPlanDate" @updateDate="prospectiveCustomerEquipPlanDateProp"></date-picker>
                </td>
                <td>품의 진행 날짜</td>
                <td>
                  <date-picker :propdate="prospectiveCustomerConsultationDate" @updateDate="prospectiveCustomerConsultationDateProp"></date-picker>
                </td>
              </tr>
              <tr>
                <td>선팅 날짜</td>
                <td>
                  <date-picker :propdate="prospectiveCustomerWindowTintingDate" @updateDate="prospectiveCustomerWindowTintingDateProp"></date-picker>
                </td>
                <td>설치완료 날짜</td>
                <td>
                  <date-picker :propdate="prospectiveCustomerEquipCompleteDate" @updateDate="prospectiveCustomerEquipCompleteDateProp"></date-picker>
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
import companyListModal from "@/components/modal/common/CompanyList";
import InsideManagerListModal from "@/components/modal/operation/InsideManagerList";
import AdminPersonListModal from "@/components/modal/system/EmployeeList";
import storeConnectModal from "@/components/modal/operation/StoreConnect.vue";
import { getPopupOpt } from "@/utils/modal";
import PullDown from "@/components/form/PullDown.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, PullDown, DatePicker },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //날짜 초기 데이터
      date: "",
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
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

      //셀렉트 설정
      statusCode: "SYS21802B012",
      typeCode: "SYS21802B007",
      nationCode: "SYS21729B003",
      storeCode: "SYS21802B016",
      zoneCode: "SYS21802B017",
    };
  },
  computed: {
    ...mapGetters("prospectiveCustomer", [
      "getCustomerList",
      "getCustomerDetail",
      "setCustomerResult",
      "customerModifyResult",
      "customerDeleteResult",
    ]),
    ...mapGetters("actualSurvey", ["getActualSurveyReg"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    prospectiveCustomerStoreNationName(value) {
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
    //날짜 입력받기 emit
    prospectiveCustomerDateProp(date) {
      this.prospectiveCustomerDate = date;
    },
    prospectiveCustomerSurveyDateProp(date) {
      this.prospectiveCustomerSurveyDate = date;
    },
    prospectiveCustomerEquipPlanDateProp(date) {
      this.prospectiveCustomerEquipPlanDate = date;
    },
    prospectiveCustomerConsultationDateProp(date) {
      this.prospectiveCustomerConsultationDate = date;
    },
    prospectiveCustomerWindowTintingDateProp(date) {
      this.prospectiveCustomerWindowTintingDate = date;
    },
    prospectiveCustomerEquipCompleteDateProp(date) {
      this.prospectiveCustomerEquipCompleteDate = date;
    },
    //풀다운 데이터 emit
    prospectiveCustomerStatusProp(data) {
      this.prospectiveCustomerStatus = data.sysCodeSid;
      this.prospectiveCustomerStatusName = data.sysCodeName;
    },
    prospectiveCustomerStoreKindProp(data) {
      this.prospectiveCustomerStoreKind = data.sysCodeSid;
      this.prospectiveCustomerStoreKindName = data.sysCodeName;
    },
    prospectiveCustomerStoreNationProp(data) {
      this.prospectiveCustomerStoreNation = data.sysCodeSid;
      this.prospectiveCustomerStoreNationName = data.sysCodeName;
    },
    prospectiveCustomerAnalyzeVolumeProp(data) {
      this.prospectiveCustomerAnalyzeVolume = data.sysCodeSid;
      this.prospectiveCustomerAnalyzeVolumeName = data.sysCodeName;
    },
    prospectiveCustomerAnalyzeLocationProp(data) {
      this.prospectiveCustomerAnalyzeLocation = data.sysCodeSid;
      this.prospectiveCustomerAnalyzeLocationName = data.sysCodeName;
    },
    //내부 담당자 모달
    showModalAdminPopup() {
      this.$modal.show(AdminPersonListModal, { update: this.updateAdmin }, getPopupOpt("AdminPersonListModal", "500px", "auto", false));
    },
    //내부 담당자 선택시
    updateAdmin(data) {
      this.interbridEmployeeSid = data.interbridEmployeeSid;
      this.interbridEmployeeName = data.interbridEmployeeKorName;
    },

    // 스토어 연결 모달
    showStoreConnectModal() {
      this.$modal.show(storeConnectModal, { update: this.updateStoreConnect }, getPopupOpt("storeConnectModal", "1000px", "auto", false));
    },
    // 스토어 연결 선택시
    updateStoreConnect({ companyStoreSid, companyStoreName }) {
      this.companyStoreSid = companyStoreSid;
      this.companyStoreName = companyStoreName;
    },

    //주소찾기 모달
    showAddressModalPopup() {
      if (this.prospectiveCustomerStoreNationName == "대한민국") {
        this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "560px", "auto", false));
      } else {
        this.alim("검색은 국가선택을 대한민국으로 해주셔야 합니다.", this.errorColor);
      }
    },
    //모달에서 주소 선택시
    updateZip(data) {
      this.prospectiveCustomerZipCode = data.zip;
      this.prospectiveCustomerAddress1 = data.addr1;
    },
    //담당자 모달
    showModalInsidePopup(id) {
      if (id !== "") {
        this.$modal.show(InsideManagerListModal, { update: this.updateOutside, id }, getPopupOpt("InsideManagerListModal", "700px", "auto", false));
      } else {
        this.alim("영업 업체를 입력해 주세요.", this.errorColor);
      }
    },
    //영업 담당자 선택시
    updateOutside(data) {
      this.companyPersonSid = data.companyPersonSid;
      this.companyPersonName = data.companyPersonName;
    },
    //영업 업체 모달
    showModalCompanyPopup() {
      this.$modal.show(companyListModal, { update: this.updateCompany }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    //모달에서 업체 선택시
    updateCompany(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
      this.companyPersonSid = "";
      this.companyPersonName = "";
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
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getCustomerList.channeltuneApiResult.errorCode == 200) {
          const customerList = this.getCustomerList.channeltuneApiResult.prospectiveCustomer;
          this.list = customerList.data;
          this.len = customerList.last_page;
        } else {
          this.alim(this.getCustomerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async customerDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_DETAIL", {
          prospectiveCustomerSid: id,
        });
        if (this.getCustomerDetail.channeltuneApiResult.errorCode == 200) {
          const customerInfo = this.getCustomerDetail.channeltuneApiResult.prospectiveCustomer;
          this.prospectiveCustomerSid = customerInfo.prospectiveCustomerSid;
          this.prospectiveCustomerDate = customerInfo.prospectiveCustomerDate;
          this.prospectiveCustomerStoreName = customerInfo.prospectiveCustomerStoreName;
          this.prospectiveCustomerStoreKind = customerInfo.prospectiveCustomerStoreKind;
          this.prospectiveCustomerStoreNation = customerInfo.prospectiveCustomerStoreNation;
          this.prospectiveCustomerStoreArea = customerInfo.prospectiveCustomerStoreArea;
          this.companySid = customerInfo.companySid;
          this.companyPersonSid = customerInfo.companyPersonSid;
          this.prospectiveCustomerName = customerInfo.prospectiveCustomerName;
          this.prospectiveCustomerHp = customerInfo.prospectiveCustomerHp;
          this.prospectiveCustomerZipCode = customerInfo.prospectiveCustomerZipCode;
          this.prospectiveCustomerAddress1 = customerInfo.prospectiveCustomerAddress1;
          this.prospectiveCustomerAddress2 = customerInfo.prospectiveCustomerAddress2;
          this.prospectiveCustomerAnalyzeVolume = customerInfo.prospectiveCustomerAnalyzeVolume;
          this.prospectiveCustomerAnalyzeLocation = customerInfo.prospectiveCustomerAnalyzeLocation;
          this.prospectiveCustomerFloatingPopulation20 = customerInfo.prospectiveCustomerFloatingPopulation20;
          this.prospectiveCustomerFloatingPopulation30 = customerInfo.prospectiveCustomerFloatingPopulation30;
          this.prospectiveCustomerFloatingPopulation40 = customerInfo.prospectiveCustomerFloatingPopulation40;
          this.prospectiveCustomerFloatingPopulation50 = customerInfo.prospectiveCustomerFloatingPopulation50;
          this.prospectiveCustomerMemo = customerInfo.prospectiveCustomerMemo;
          this.prospectiveCustomerConsultationMemo = customerInfo.prospectiveCustomerConsultationMemo;
          this.prospectiveCustomerSurveyDate = customerInfo.prospectiveCustomerSurveyDate;
          this.prospectiveCustomerConsultationDate = customerInfo.prospectiveCustomerConsultationDate;
          this.prospectiveCustomerEquipPlanDate = customerInfo.prospectiveCustomerEquipPlanDate;
          this.prospectiveCustomerWindowTintingDate = customerInfo.prospectiveCustomerWindowTintingDate;
          this.prospectiveCustomerEquipCompleteDate = customerInfo.prospectiveCustomerEquipCompleteDate;
          this.prospectiveCustomerStatus = customerInfo.prospectiveCustomerStatus;
          this.created_at = customerInfo.created_at;
          this.updated_at = customerInfo.updated_at;
          this.prospectiveCustomerStoreKindName = customerInfo.prospectiveCustomerStoreKindName;
          this.prospectiveCustomerStoreNationName = customerInfo.prospectiveCustomerStoreNationName;
          this.prospectiveCustomerStatusName = customerInfo.prospectiveCustomerStatusName;
          this.prospectiveCustomerAnalyzeVolumeName = customerInfo.prospectiveCustomerAnalyzeVolumeName;
          this.prospectiveCustomerAnalyzeLocationName = customerInfo.prospectiveCustomerAnalyzeLocationName;
          this.interbridEmployeeName = customerInfo.interbridEmployeeName;
          this.interbridEmployeeSid = customerInfo.interbridEmployeeSid;
          this.companyName = customerInfo.companyName;
          this.companyPersonName = customerInfo.companyPersonName;
          this.companyStoreSid = customerInfo.companyStoreSid;
          this.companyStoreName = customerInfo.companyStoreName;
        } else {
          this.alim(this.getCustomerDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록, 수정 공통 Params
    basicParam() {
      return {
        prospectiveCustomerSid: this.prospectiveCustomerSid,
        prospectiveCustomerDate: this.prospectiveCustomerDate,
        prospectiveCustomerStoreName: this.prospectiveCustomerStoreName,
        prospectiveCustomerStoreKind: this.prospectiveCustomerStoreKind,
        prospectiveCustomerStoreNation: this.prospectiveCustomerStoreNation,
        prospectiveCustomerStoreArea: this.prospectiveCustomerStoreArea,
        companySid: this.companySid,
        companyPersonSid: this.companyPersonSid,
        prospectiveCustomerName: this.prospectiveCustomerName,
        prospectiveCustomerHp: this.prospectiveCustomerHp,
        prospectiveCustomerZipCode: this.prospectiveCustomerZipCode,
        prospectiveCustomerAddress1: this.prospectiveCustomerAddress1,
        prospectiveCustomerAddress2: this.prospectiveCustomerAddress2,
        prospectiveCustomerAnalyzeVolume: this.prospectiveCustomerAnalyzeVolume,
        prospectiveCustomerAnalyzeLocation: this.prospectiveCustomerAnalyzeLocation,
        prospectiveCustomerFloatingPopulation20: this.prospectiveCustomerFloatingPopulation20,
        prospectiveCustomerFloatingPopulation30: this.prospectiveCustomerFloatingPopulation30,
        prospectiveCustomerFloatingPopulation40: this.prospectiveCustomerFloatingPopulation40,
        prospectiveCustomerFloatingPopulation50: this.prospectiveCustomerFloatingPopulation50,
        prospectiveCustomerMemo: this.prospectiveCustomerMemo,
        prospectiveCustomerConsultationMemo: this.prospectiveCustomerConsultationMemo,
        prospectiveCustomerSurveyDate: this.prospectiveCustomerSurveyDate,
        prospectiveCustomerEquipPlanDate: this.prospectiveCustomerEquipPlanDate,
        prospectiveCustomerConsultationDate: this.prospectiveCustomerConsultationDate,
        prospectiveCustomerWindowTintingDate: this.prospectiveCustomerWindowTintingDate,
        prospectiveCustomerEquipCompleteDate: this.prospectiveCustomerEquipCompleteDate,
        prospectiveCustomerStatus: this.prospectiveCustomerStatus,
        prospectiveCustomerStoreKindName: this.prospectiveCustomerStoreKindName,
        prospectiveCustomerStoreNationName: this.prospectiveCustomerStoreNationName,
        prospectiveCustomerStatusName: this.prospectiveCustomerStatusName,
        prospectiveCustomerAnalyzeVolumeName: this.prospectiveCustomerAnalyzeVolumeName,
        prospectiveCustomerAnalyzeLocationName: this.prospectiveCustomerAnalyzeLocationName,
        interbridEmployeeName: this.interbridEmployeeName,
        interbridEmployeeSid: this.interbridEmployeeSid,
        companyName: this.companyName,
        companyPersonName: this.companyPersonName,
        companyStoreSid: this.companyStoreSid,
      };
    },
    //실측 스케쥴 등록
    async schduleReg() {
      if (this.prospectiveCustomerSid === "" || this.prospectiveCustomerSid == null) {
        this.alim("고유코드를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeName === "" || this.interbridEmployeeName == null) {
        this.alim("내부담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerSurveyDate === "" || this.prospectiveCustomerSurveyDate == null) {
        this.alim("실측 날짜를 입력해 주세요.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurvey/ACTUALSURVEY_REG", {
          prospectiveCustomerSid: this.prospectiveCustomerSid,
          interbridEmployeeName: this.interbridEmployeeName,
          prospectiveCustomerSurveyDate: this.prospectiveCustomerSurveyDate,
          actualSurveyStatus: "SYS21804B002",
        });
        if (this.getActualSurveyReg.channeltuneApiResult.errorCode == 200) {
          this.alim("실측 스케쥴이 등록 되었습니다.", this.successColor);
        } else {
          this.alim(this.getActualSurveyReg.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.prospectiveCustomerSid = "";
      this.prospectiveCustomerDate = "";
      this.prospectiveCustomerStoreName = "";
      this.prospectiveCustomerStoreKind = "";
      this.prospectiveCustomerStoreNation = "";
      this.prospectiveCustomerStoreArea = "";
      this.companySid = "";
      this.companyPersonSid = "";
      this.prospectiveCustomerName = "";
      this.prospectiveCustomerHp = "";
      this.prospectiveCustomerZipCode = "";
      this.prospectiveCustomerAddress1 = "";
      this.prospectiveCustomerAddress2 = "";
      this.prospectiveCustomerAnalyzeVolume = "";
      this.prospectiveCustomerAnalyzeLocation = "";
      this.prospectiveCustomerFloatingPopulation20 = "";
      this.prospectiveCustomerFloatingPopulation30 = "";
      this.prospectiveCustomerFloatingPopulation40 = "";
      this.prospectiveCustomerFloatingPopulation50 = "";
      this.prospectiveCustomerMemo = "";
      this.prospectiveCustomerConsultationMemo = "";
      this.prospectiveCustomerSurveyDate = "";
      this.prospectiveCustomerEquipPlanDate = "";
      this.prospectiveCustomerWindowTintingDate = "";
      this.prospectiveCustomerConsultationDate = "";
      this.prospectiveCustomerEquipCompleteDate = "";
      this.prospectiveCustomerStatus = "";
      this.prospectiveCustomerStoreKindName = "";
      this.prospectiveCustomerStoreNationName = "";
      this.prospectiveCustomerStatusName = "";
      this.prospectiveCustomerAnalyzeVolumeName = "";
      this.prospectiveCustomerAnalyzeLocationName = "";
      this.interbridEmployeeName = "";
      this.interbridEmployeeSid = "";
      this.companyName = "";
      this.companyPersonName = "";
      this.created_at = "";
      this.updated_at = "";
    },
    //담당자 추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_ADD", this.basicParam());
        if (this.setCustomerResult.channeltuneApiResult.errorCode == 200) {
          this.alim("담당자가 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.setCustomerResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        if (this.prospectiveCustomerSid !== "") {
          this.alim("고유 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.prospectiveCustomerStatus === "") {
        this.alim("상태를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerStoreKind == "") {
        this.alim("스토어 유형을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerDate === "") {
        this.alim("등록날짜를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerStoreName === "") {
        this.alim("스토어(사이트)명을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerStoreNation === "") {
        this.alim("스토어 국가를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerStoreArea === "") {
        this.alim("스토어 지역을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeSid === "") {
        this.alim("내부 담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeName === "") {
        this.alim("내부 담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companySid === "") {
        this.alim("영업 업체를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyName === "") {
        this.alim("영업 업체를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyPersonSid === "") {
        this.alim("영업 담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyPersonName === "") {
        this.alim("영업 담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerName === "") {
        this.alim("스토어 담당자를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.prospectiveCustomerHp === "") {
        this.alim("스토어 연락처를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //담당자 수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("prospectiveCustomer/CUSTOMER_MODIFY", this.basicParam());
        if (this.customerModifyResult.channeltuneApiResult.errorCode == 200) {
          await this.reload(2);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.customerModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("prospectiveCustomer/CUSTOMER_DEL", this.prospectiveCustomerSid);
            if (this.customerDeleteResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.customerDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
  },
};
</script>

<style lang="scss" scoped>
.date-width {
  width: 100px;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 60% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(40% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
