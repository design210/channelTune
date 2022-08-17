<template>
  <section class="container">
    <div class="title-wrap">
      <h1>정산 공지</h1>
    </div>
    <div class="mb10"></div>
    <section class="ad-manage">
      <section class="ad-list section-box">
        <div style="height: 100%">
          <div class="border line">
            <div class="header">
              <h2>항목</h2>
              <div class="btn-group d-flex">
                <v-btn small color="success" @click="showPreviewModalPopup">미리보기</v-btn>
                <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
                <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
                <v-btn small color="error" @click="confirm(settlementNoticeInfo.settlementNoticeSid)">삭제</v-btn>
                <v-btn small @click="clear">CLEAR</v-btn>
              </div>
            </div>
            <div class="field">
              <table width="100%" class="tbl-reg column2 mt5">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td class="required">정산공지 코드</td>
                  <td>
                    <input type="text" readonly v-model="settlementNoticeInfo.settlementNoticeSid" />
                  </td>
                  <td class="required">담당자</td>
                  <td><input type="text" v-model="settlementNoticeInfo.settlementNoticePerson" /></td>
                </tr>
                <tr>
                  <td class="required">정산공지 제목</td>
                  <td colspan="3"><input type="text" v-model="settlementNoticeInfo.settlementNoticeTitle" /></td>
                </tr>
                <tr>
                  <td class="required">정산 제목</td>
                  <td colspan="3">
                    <v-select
                      outlined
                      class="select-basic"
                      v-model="calculateTitle"
                      :items="calculateItems"
                      item-text="item"
                      item-value="value"
                    ></v-select>
                  </td>
                </tr>
                <tr>
                  <td class="required">품목표기</td>
                  <td colspan="3">
                    <input type="text" v-model="settlementNoticeInfo.settlementNoticeProductDoc" />
                  </td>
                </tr>
                <tr>
                  <td class="required">공지 년도</td>
                  <td>
                    <v-select :items="year" outlined class="select-basic" v-model="noticeYear"></v-select>
                  </td>
                  <td class="required">입금일</td>
                  <td>
                    <date-picker
                      :clear="clearDate"
                      :propdate="settlementNoticeInfo.settlementNoticeDepositDate"
                      @updateDate="inDay"
                      class="date"
                    ></date-picker>
                  </td>
                </tr>
                <tr>
                  <td class="required">세금계산서 발행일</td>
                  <td>
                    <date-picker
                      :clear="clearDate"
                      :propdate="settlementNoticeInfo.settlementNoticeIssueDate"
                      @updateDate="startDay"
                      class="date"
                    ></date-picker>
                  </td>
                  <td class="required">세금계산서 마감일</td>
                  <td>
                    <date-picker
                      :clear="clearDate"
                      :propdate="settlementNoticeInfo.settlementNoticeClosingDate"
                      @updateDate="endDay"
                      class="date"
                    ></date-picker>
                  </td>
                </tr>
                <tr>
                  <td>정산 추가 사항</td>
                  <td colspan="3" class="field-div">
                    <textarea v-model="settlementNoticeInfo.settlementNoticeDoc"></textarea>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <section class="line mt10 line3 pr20 pl20">
            <div class="detail-header d-flex justify-end mt10">
              <div class="d-flex align-center">
                <div class="title">정산 년도</div>
                <div><v-select :items="year" v-model="calculateYear" outlined class="select-basic w120"></v-select></div>
                <v-btn small color="primary" class="ml5" @click="noticeListCall">조회</v-btn>
              </div>
            </div>
            <table width="100%" class="tbl mt20 user-list-tbl select-tbl th-style">
              <colgroup>
                <col width="90" />
                <col width="*" />
                <col width="30" />
                <col width="30" />
                <col width="30" />
                <col width="30" />
                <col width="30" />
                <col width="30" />
                <col width="30" />
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2">정산공지 코드</th>
                  <th rowspan="2">정산공지 제목</th>
                  <th rowspan="2">공지</th>
                  <th colspan="2" class="dot">Site</th>
                  <th colspan="2" class="dot">Mail</th>
                  <th colspan="2" class="dot">SMS</th>
                </tr>
                <tr>
                  <th class="dot">생성</th>
                  <th class="dot">오픈</th>
                  <th class="dot">생성</th>
                  <th class="dot">발송</th>
                  <th class="dot">생성</th>
                  <th class="dot">발송</th>
                </tr>
              </thead>
            </table>
            <div class="overflow">
              <table width="100%" class="tbl user-list-tbl select-tbl">
                <colgroup>
                  <col width="90" />
                  <col width="*" />
                  <col width="30" />
                  <col width="30" />
                  <col width="30" />
                  <col width="30" />
                  <col width="30" />
                  <col width="30" />
                  <col width="30" />
                </colgroup>
                <tbody>
                  <tr v-for="item in calculateList" :key="item.settlementNoticeSid" @click="calculateDetailInfo(item.settlementNoticeSid)">
                    <td>{{ item.settlementNoticeSid }}</td>
                    <td class="left">{{ item.settlementNoticeTitle }}</td>
                    <td>{{ item.settlementSiteOpenFlag }}</td>
                    <td>{{ item.settlementNoticeAppendFlag }}</td>
                    <td>{{ item.settlementNoticeOpenFlag }}</td>
                    <td>{{ item.settlementMailAppendFlag }}</td>
                    <td>{{ item.settlementMailSendFlag }}</td>
                    <td>{{ item.settlementSmsAppendFlag }}</td>
                    <td>{{ item.settlementSmsSendFlag }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="calculateList.length < 1">
                    <td colspan="9">리스트가 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
      </section>

      <section class="ad-list-right init-wrap section-box border-outside pr20 pl20 pt20 pb20">
        <div class="header-wrap d-flex justify-space-between">
          <ul class="tab-wrap">
            <li class="homepage" :class="{ active: tabDefault === 'homepage' }" @click="settlementTransKindSet('homepage')">
              <span>홈페이지 발행 리스트</span>
            </li>
            <li class="mail" :class="{ active: tabDefault === 'mail' }" @click="settlementTransKindSet('mail')">
              <span>메일 발송 리스트</span>
            </li>
            <li class="sms" :class="{ active: tabDefault === 'sms' }" @click="settlementTransKindSet('sms')">
              <span>문자 발송 리스트</span>
            </li>
          </ul>
          <div class="d-flex">
            <div><v-btn small color="red lighten-1" class="white--text" @click="settlementPublish">정산공지 발행</v-btn></div>
            <div><v-btn small color="red lighten-1" class="white--text ml5" @click="settlementPublishCancel">정산공지 취소</v-btn></div>
            <div v-if="tabDefault !== 'homepage'">
              <v-btn small color="indigo darken-1" class="white--text ml5">
                <span v-if="tabDefault === 'mail'" @click="sendMailAll">메일 전체 발송 </span>
                <span v-if="tabDefault === 'sms'" @click="sendSmsAll">문자 전체 발송 </span>
              </v-btn>
            </div>
          </div>
        </div>
        <section class="btn-search-wrap mt5 d-flex justify-end">
          <div class="search-wrap">
            <pull-down :clear="clearField" :code="statusCode" @selected="status" :includeTotalElem="true" class="pull-down w150 mr5"></pull-down>
            <input class="mr5 input-align-height" type="text" name="readonly" :value="companySid" readonly placeholder="업체" />
            <input class="input-align-height" type="text" name="company" :value="companyName" readonly />
            <v-btn small class="ml10" color="success" @click="showModalPopup">검색</v-btn>
            <div class="btn-group">
              <v-btn small color="primary" dark class="ml5" @click="settlementNoticeTrans(1)">조회</v-btn>
              <v-btn small class="ml5" @click="clearCompany">CLEAR</v-btn>
            </div>
          </div>
        </section>
        <div>
          <table width="100%" class="tbl mt20 user-list-tbl select-tbl">
            <colgroup>
              <col width="85" />
              <col width="100" />
              <col width="*" />
              <col width="110" v-if="tabDefault === 'mail'" />
              <col width="110" v-if="tabDefault === 'sms'" />
              <col width="50" />
              <col width="70" />
              <col width="50" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>발행고유코드</th>
                <th>업체코드</th>
                <th class="left">업체 명</th>
                <th v-if="tabDefault === 'mail'">이메일</th>
                <th v-if="tabDefault === 'sms'">전화번호</th>
                <th>횟수</th>
                <th>상태</th>
                <th>확인</th>
                <th>확인 일시</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in settlementNoticeTransList"
                :key="item.settlementNoticeTransSid"
                @click="
                  __showModalTemplate(
                    require('@/components/modal/calculate/CalculateNoticeDetail.vue'),
                    { update: updateData, id: item.settlementNoticeTransSid },
                    720,
                  )
                "
              >
                <td>{{ item.settlementNoticeTransSid }}</td>
                <td>{{ item.companySid }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td v-if="item.settlementNoticeTransKind === 'SYS22516B003'">{{ item.settlementNoticeTransEmailAddress }}</td>
                <td v-if="item.settlementNoticeTransKind === 'SYS22516B004'">{{ item.settlementNoticeTransHp }}</td>
                <td>{{ item.settlementNoticeTransCount }}</td>
                <td>{{ item.settlementNoticeTransStatusName }}</td>
                <td>{{ item.settlementNoticeTransCheckFlag }}</td>
                <td>{{ item.settlementNoticeTransCheckDateTime }}</td>
              </tr>
            </tbody>
            <tfoot v-if="settlementNoticeTransList.length < 1">
              <tr>
                <td colspan="7" v-if="tabDefault === 'homepage'">리스트가 없습니다.</td>
                <td colspan="8" v-else>리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt20" v-if="settlementNoticeTransList.length > 0">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <!-- 삭제 컨펌 -->
      <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" :parentSid="sid" @resetConfirm="emitResetConfirm"></confirm>
      <!-- 알럿 -->
      <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </section>
  </section>
</template>

<script>
import DatePicker from "@/components/form/DatePicker.vue";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm.vue";
import deleteMixin from "@/mixins/delete.js";
import { year } from "@/utils/yearSet";
import showModal from "@/mixins/showModal";
import { getPopupOpt } from "@/utils/modal";
import previewModal from "@/components/modal/calculate/Preview";
import CompanyListModal from "@/components/modal/common/CompanyList";
import modalMixin from "@/mixins/showModal";
import PullDown from "@/components/form/PullDown.vue";
export default {
  components: { alim, confirm, DatePicker, PullDown },
  mixins: [loading, alimMixin, deleteMixin, showModal, modalMixin],
  props: ["size"],
  data() {
    return {
      //탭
      tabDefault: "homepage",
      //정산년도
      calculateYear: "",
      //공지년도
      noticeYear: "",
      year: [],
      page: 1,
      list: [],
      len: null,
      clearDate: false,
      //정산리스트
      calculateList: [],
      //정산인포
      settlementNoticeInfo: {
        settlementNoticeSid: "",
        settlementNoticePerson: "",
        settlementNoticeTitle: "",
        settlementNoticeYear: "",
        settlementNoticeIssueDate: "",
        settlementNoticeClosingDate: "",
        settlementNoticeDepositDate: "",
        settlementNoticeProductDoc: "",
        settlementNoticeHtml: "",
        settlementNoticeDoc: "",
      },
      //정산제목
      calculateItems: [],
      calculateTitle: "",
      //정산 종류
      settlementNoticeTransKind: "SYS22516B002",
      //정산 발행 리스트
      settlementNoticeTransList: [],
      //업체 정보
      companySid: "",
      companyName: "",
      //pulldown
      clearField: false,
      statusCode: "SYS22516B005",
      settlementNoticeTransStatus: "",
    };
  },
  computed: {
    ...mapGetters("settlementNotice", [
      "getSettlementNoticeList",
      "getSettlementNoticeDetail",
      "setSettlementNotice",
      "modifySettlementNotice",
      "deleteSettlementNotice",
      "getSettlementNoticeTrance",
      "setSettlementTrance",
      "cancelSettlementTrance",
      "sendMail",
      "sendSms",
    ]),
    ...mapGetters("settlementProcessing", ["getSettlementList"]),
  },
  watch: {
    page() {
      this.settlementNoticeTrans();
    },
    size() {
      this.settlementNoticeTrans();
    },
    async noticeYear(year) {
      if (year !== "") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementProcessing/GET_SETTLEMENT_PROCESSING", {
            size: "",
            page: "",
            searchText: "",
            searchYear: year.slice(0, -1),
          });
          const titleData = this.getSettlementList.channeltuneApiResult;
          if (titleData.errorCode === 200) {
            const data = titleData.SettlementMaster;
            this.calculateItems = [];
            data.forEach(ele => {
              this.calculateItems.push({
                item: ele.settlementTitle,
                value: ele.settlementSid,
              });
            });
          } else {
            this.alim(titleData.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
  },
  mounted() {
    const yearset = year("onlyYear");
    const result = yearset.map(item => {
      return `${item}년`;
    });
    this.year = result;
    const lastItem = this.year[0];
    this.calculateYear = lastItem;
    this.noticeYear = lastItem;
    this.noticeListCall();
  },
  methods: {
    //리스트 호출
    async noticeListCall() {
      if (this.calculateYear !== "") {
        bus.$emit("start:spinner");
        let year = this.calculateYear.slice(0, -1);
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_NOTICE", year);
          const res = this.getSettlementNoticeList.channeltuneApiResult;
          if (res.errorCode === 200) {
            this.calculateList = res.SettlementNotice;
          } else {
            this.alim(res.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      } else {
        this.alim("정산년도를 선택해주세요.", this.errorColor);
      }
    },
    //리스트 상세 호출
    async calculateDetailInfo(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/GET_SETTLEMENT_NOTICE_DETAIL", id);
        const res = this.getSettlementNoticeDetail.channeltuneApiResult;
        if (res.errorCode === 200) {
          const data = res.settlementNotice;
          this.settlementNoticeInfo.settlementNoticeSid = data.settlementNoticeSid;
          this.settlementNoticeInfo.settlementNoticePerson = data.settlementNoticePerson;
          this.settlementNoticeInfo.settlementNoticeTitle = data.settlementNoticeTitle;
          this.settlementNoticeInfo.settlementNoticeIssueDate = data.settlementNoticeIssueDate;
          this.settlementNoticeInfo.settlementNoticeClosingDate = data.settlementNoticeClosingDate;
          this.settlementNoticeInfo.settlementNoticeDepositDate = data.settlementNoticeDepositDate;
          this.settlementNoticeInfo.settlementNoticeProductDoc = data.settlementNoticeProductDoc;
          this.settlementNoticeInfo.settlementNoticeHtml = data.settlementNoticeHtml;
          this.settlementNoticeInfo.settlementNoticeDoc = data.settlementNoticeDoc;
          this.noticeYear = "";
          this.noticeYear = data.settlementNoticeYear + "년";
          this.calculateTitle = data.settlementSid;
          this.settlementNoticeTrans(1);
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //미리보기 모달
    showPreviewModalPopup() {
      if (this.settlementNoticeInfo.settlementNoticeHtml !== "") {
        this.$modal.show(previewModal, { html: this.settlementNoticeInfo.settlementNoticeHtml }, getPopupOpt("previewModal", "680px", "auto", false));
      } else {
        this.alim("공지 리스트를 선택해 주세요.", this.errorColor);
      }
    },
    //등록
    async validate(status) {
      if (status === "reg") {
        if (this.settlementNoticeInfo.settlementNoticeSid !== "") {
          this.alim("정산공지 코드가 있으면 등록할수 없습니다.", this.errorColor);
          return;
        }
      }
      if (this.settlementNoticeInfo.settlementNoticePerson === "") {
        this.alim("담당자를 입력해주세요.", this.errorColor);
        return;
      }
      if (this.settlementNoticeInfo.settlementNoticeTitle === "") {
        this.alim("정산공지 제목을 입력해주세요.", this.errorColor);
        return;
      }
      if (this.noticeYear === "") {
        this.alim("공지년도를 선택해 주세요.", this.errorColor);
        return;
      }
      if (this.calculateTitle === "") {
        this.alim("정산 제목을 선택해 주세요.", this.errorColor);
        return;
      }
      if (this.settlementNoticeInfo.settlementNoticeDepositDate === "") {
        this.alim("입금일을 선택해 주세요.", this.errorColor);
        return;
      }
      if (this.settlementNoticeInfo.settlementNoticeProductDoc === "") {
        this.alim("품목표기를 입력해주세요.", this.errorColor);
        return;
      }
      if (this.settlementNoticeInfo.settlementNoticeIssueDate === "") {
        this.alim("세금계산서 발행일을 선택해주세요.", this.errorColor);
        return;
      }
      if (this.settlementNoticeInfo.settlementNoticeClosingDate === "") {
        this.alim("세금계산서 마일을 선택해주세요.", this.errorColor);
        return;
      }
      if (status === "reg") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementNotice/SET_SETTLEMENT_NOTICE", {
            settlementSid: this.calculateTitle,
            settlementNoticeYear: this.noticeYear,
            settlementNoticeTitle: this.settlementNoticeInfo.settlementNoticeTitle,
            settlementNoticeDoc: this.settlementNoticeInfo.settlementNoticeDoc,
            settlementNoticeProductDoc: this.settlementNoticeInfo.settlementNoticeProductDoc,
            settlementNoticeDepositDate: this.settlementNoticeInfo.settlementNoticeDepositDate,
            settlementNoticePerson: this.settlementNoticeInfo.settlementNoticePerson,
            settlementNoticeIssueDate: this.settlementNoticeInfo.settlementNoticeIssueDate,
            settlementNoticeClosingDate: this.settlementNoticeInfo.settlementNoticeClosingDate,
          });
          if (this.setSettlementNotice.channeltuneApiResult.errorCode === 200) {
            this.alim("등록 되었습니다.", this.successColor);
            this.noticeListCall();
          } else {
            this.alim(this.setSettlementNotice.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
      if (status === "modify") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("settlementNotice/MODIFY_SETTLEMENT_NOTICE", {
            id: this.settlementNoticeInfo.settlementNoticeSid,
            settlementSid: this.calculateTitle,
            settlementNoticeYear: this.noticeYear,
            settlementNoticeTitle: this.settlementNoticeInfo.settlementNoticeTitle,
            settlementNoticeDoc: this.settlementNoticeInfo.settlementNoticeDoc,
            settlementNoticeProductDoc: this.settlementNoticeInfo.settlementNoticeProductDoc,
            settlementNoticeDepositDate: this.settlementNoticeInfo.settlementNoticeDepositDate,
            settlementNoticePerson: this.settlementNoticeInfo.settlementNoticePerson,
            settlementNoticeIssueDate: this.settlementNoticeInfo.settlementNoticeIssueDate,
            settlementNoticeClosingDate: this.settlementNoticeInfo.settlementNoticeClosingDate,
          });
          if (this.modifySettlementNotice.channeltuneApiResult.errorCode === 200) {
            this.alim("수정 되었습니다.", this.successColor);
            this.noticeListCall();
          } else {
            this.alim(this.modifySettlementNotice.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("settlementNotice/DELETE_SETTLEMENT_NOTICE", data.parentSid);
            if (this.deleteSettlementNotice.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              this.noticeListCall();
              this.clear();
            } else {
              this.alim(this.deleteSettlementNotice.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
    },
    //계산서 발행일
    startDay(date) {
      this.settlementNoticeInfo.settlementNoticeIssueDate = date;
    },
    //계산서 마감일
    endDay(date) {
      this.settlementNoticeInfo.settlementNoticeClosingDate = date;
    },
    //입금일
    inDay(date) {
      this.settlementNoticeInfo.settlementNoticeDepositDate = date;
    },
    //정산 종류 선택
    settlementTransKindSet(kind) {
      this.tabDefault = kind;
      if (kind === "homepage") {
        this.settlementNoticeTransKind = "SYS22516B002";
      } else if (kind === "mail") {
        this.settlementNoticeTransKind = "SYS22516B003";
      } else if (kind === "sms") {
        this.settlementNoticeTransKind = "SYS22516B004";
      }
      if (this.settlementNoticeInfo.settlementNoticeSid === "") {
        this.alim("정산공지를 선택해주세요", this.errorColor);
        return;
      }
      this.page = 1;
      this.settlementNoticeTrans();
    },
    //정산발행 리스트 호출
    async settlementNoticeTrans(num) {
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        const sizeSet = this.size - 1;
        await this.$store.dispatch("settlementNotice/SETTLEMENT_NOTICE_TRANCE", {
          settlementNoticeSid: this.settlementNoticeInfo.settlementNoticeSid,
          settlementNoticeTransKind: this.settlementNoticeTransKind,
          settlementNoticeTransStatus: this.settlementNoticeTransStatus,
          size: sizeSet,
          page: this.page,
          companySid: this.companySid,
        });
        if (this.getSettlementNoticeTrance.channeltuneApiResult.errorCode == 200) {
          this.len = this.getSettlementNoticeTrance.channeltuneApiResult.SettlementNoticeTrans.last_page;
          this.settlementNoticeTransList = this.getSettlementNoticeTrance.channeltuneApiResult.SettlementNoticeTrans.data;
        } else {
          this.alim(this.getSettlementNoticeTrance.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //정산공지 발행
    async settlementPublish() {
      if (this.settlementNoticeInfo.settlementNoticeSid === "") {
        this.alim("정산공지를 선택해주세요", this.errorColor);
        return;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/SET_SETTLEMENT_TRANCE", {
          settlementNoticeSid: this.settlementNoticeInfo.settlementNoticeSid,
          settlementNoticeTransKind: this.settlementNoticeTransKind,
        });
        if (this.setSettlementTrance.channeltuneApiResult.errorCode === 200) {
          this.alim("정산 공지가 발행 되었습니다.", this.successColor);
          this.settlementNoticeTrans();
        } else {
          this.alim(this.setSettlementTrance.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //정산공지 발행 취소
    async settlementPublishCancel() {
      if (this.settlementNoticeInfo.settlementNoticeSid === "") {
        this.alim("정산공지를 선택해주세요", this.errorColor);
        return;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/CANCEL_SETTLEMENT_TRANCE", this.settlementNoticeInfo.settlementNoticeSid);
        if (this.cancelSettlementTrance.channeltuneApiResult.errorCode === 200) {
          this.alim("정산 공지가 취소 되었습니다.", this.successColor);
          this.settlementNoticeTrans();
        } else {
          this.alim(this.cancelSettlementTrance.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 검색
    showModalPopup() {
      //검색버튼 함수
      this.$modal.show(CompanyListModal, { update: this.getCompanyName }, getPopupOpt("AdminPersonListModal", "700px", "auto", false));
    },
    getCompanyName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    //전체 메일 발송
    async sendMailAll() {
      bus.$emit("start:spinner");
      await this.$store.dispatch("settlementNotice/SEND_MAIL", {
        settlementNoticeSid: this.settlementNoticeInfo.settlementNoticeSid,
        sid: "All",
      });
      if (this.sendMail.channeltuneApiResult.errorCode === 200) {
        this.alim("메일이 발송 되었습니다.", this.successColor);
      } else {
        this.alim(this.sendMail.channeltuneApiResult.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
    },
    //전체 문자 발송
    async sendSmsAll() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("settlementNotice/SEND_SMS", {
          settlementNoticeSid: this.settlementNoticeInfo.settlementNoticeSid,
          sid: "All",
        });
        if (this.sendSms.channeltuneApiResult.errorCode === 200) {
          this.alim("문자가 발송 되었습니다.", this.successColor);
        } else {
          this.alim(this.sendSms.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //모달 업데이트시
    updateData(status) {
      if (status) {
        this.settlementNoticeTrans();
      }
    },
    //pull-down
    status(data) {
      data.sysCodeSid === "All" ? (this.settlementNoticeTransStatus = "") : (this.settlementNoticeTransStatus = data.sysCodeSid);
    },
    //초기화
    clear() {
      this.settlementNoticeInfo.settlementNoticeSid = "";
      this.settlementNoticeInfo.settlementNoticePerson = "";
      this.settlementNoticeInfo.settlementNoticeTitle = "";
      this.settlementNoticeInfo.settlementNoticeProductDoc = "";
      this.settlementNoticeInfo.settlementNoticeDoc = "";
      this.noticeYear = "";
      this.calculateTitle = "";
      this.calculateItems = [];
      this.clearDate = !this.clearDate;
    },
    clearCompany() {
      if (this.companySid !== "" || this.settlementNoticeTransStatus !== "") {
        this.clearField = !this.clearField;
        this.companySid = "";
        this.companyName = "";
        this.settlementNoticeTransStatus = "";
        this.settlementNoticeTrans(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px dotted #ccc;
}
.line {
  padding: 10 !important;
  border: 1px solid #ccc;
}
.line2 {
  padding: 10px !important;
  border: 1px solid #ccc;
  height: calc(100% - 236px);
}
.line3 {
  height: calc(100% - 411px);
}
.titled {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted #ccc;
  padding-bottom: 15px;
  & h2 {
    text-align: center;
    text-decoration: underline;
    text-underline-position: under;
  }
  & div {
    & .info {
      height: 28px !important;
    }
  }
}
.ad-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;
  & .ad-list {
    width: 40% !important;
    height: 100%;
  }
  & .ad-list-right {
    height: 100%;
    width: calc(100% - 41%);
    & .header-wrap {
      position: relative;
      border-bottom: 1px solid #dfdfdf;
      & .tab-wrap {
        display: flex;
        & > li {
          border-top: 1px solid #dfdfdf;
          border-right: 1px solid #dfdfdf;
          border-left: 1px solid #dfdfdf;
          padding: 5px 15px;
          margin-right: 5px;
          border-radius: 3px 3px 0 0;
          cursor: pointer;
          font-size: 1.3rem;
          position: relative;
          color: #333;
          &.active {
            background: #23b395;
            border-color: #23b395;
            color: #fff;
          }
        }
      }
    }
  }
  & .btn-search-wrap {
    & .search-wrap {
      display: flex;
      align-items: center;
      & input {
        border: 1px solid #ccc;
        height: 28px;
        padding: 0 10px;
        &:read-only {
          background: #f4f4f4;
        }
        &:nth-child(1) {
          width: 110px;
        }
        &:nth-child(2) {
          width: 200px;
        }
      }
    }
  }
  & .overflow {
    height: calc(100% - 110px);
    overflow: auto;
  }
  & .detail-header {
    & .title {
      white-space: nowrap;
      margin-right: 10px;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
.th-style {
  & th {
    background: #fff !important;
    &.dot {
      border-left: 1px dashed #ccc !important;
    }
  }
}
.width::v-deep .v-select__selection {
  width: 77px;
}
</style>
