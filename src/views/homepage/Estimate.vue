<template>
  <section class="container">
    <div class="title-wrap">
      <h1>견적서 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>견적서 리스트</h2>
            <div class="search d-flex">
              <input type="text" placeholder="광고주 아이디(이메일 주소)" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              상품 견적서 리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="100" />
              <col width="200" />
              <col width="90" />
              <col width="90" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>광고주</th>
                <th>광고주아이디(email)</th>
                <th class="right">견적금액</th>
                <th>견적서 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="estimateDetail(item.estimateSid)">
                <td>{{ item.estimateSid }}</td>
                <td>{{ item.userAdvertiserCompanyName }}</td>
                <td>{{ item.homepageUserEmail }}</td>
                <td class="right">{{ item.estimatePrice }}</td>
                <td>{{ item.estimateStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="5">상품 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(estimateSid, 'estimate')">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
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
                <td>견적 고유코드</td>
                <td colspan="3"><input type="text" readonly v-model="estimateSid" /></td>
              </tr>
              <!-- 일단 주석 : 없는게 맞다고 하심 -->
              <!-- <tr>
								<td class="required">상품 명</td>
								<td colspan="3" class="field-div">
									<div class="d-flex">
										<input type="text" class="input-first" readonly v-model="advertisingProductSid" />
										<input type="text" class="input-last" readonly v-model="advertisingProductName" />
										<v-btn small color="primary" dark @click="showModalPopup()" class="mr5">검색</v-btn>
									</div>
								</td>
							</tr> -->
              <tr>
                <td class="required">광고주 고유코드</td>
                <td colspan="3">
                  <div class="d-flex per100">
                    <input type="text" name="advertiserCode" v-model="userAdvertiserSid" readonly class="w90" />
                    <input type="text" name="advertiserCompanyCeo" v-model="userAdvertiserCompanyCeo" readonly class="advertiserCompanyCeo ml5" />
                    <v-btn small class="ml5" color="primary" @click="showAdvertiserModalPopup">조회</v-btn>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">견적 금액</td>
                <td>
                  <input type="text" v-model="estimatePrice" />
                </td>
                <td class="required">견적서 상태</td>
                <td>
                  <pull-down :data="estimateStatus" :code="statusCode" @selected="estimateStatusNameProp" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td>견적 파일</td>
                <td class="file-add" colspan="3">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in file" :key="index">
                        <v-icon @click="confirmFile(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
                          <img
                            v-else
                            :src="`${url}/file/fileView/${item.url}?size=80`"
                            @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>견적부가설명</td>
                <td colspan="3"><textarea :value="estimateDescription" @input="estimateDescription = $event.target.value"></textarea></td>
              </tr>
            </table>
            <div class="mt50">
              <!-- <h3>노출 상품 견적 상세</h3> -->
              <h3>광고 상품 견적 상세</h3>
              <div class="tbl-div-line mt10"></div>
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>

                <tr>
                  <td>고유코드</td>
                  <td><input type="text" readonly v-model="estimateExposureSid" /></td>
                  <td class="required">광고 카테고리</td>
                  <td>
                    <pull-down
                      :data="estimateExposureCategoryCode"
                      :code="categoriesCode"
                      @selected="estimateExposureCategoryCodeNameProp"
                      class="pull-down"
                    ></pull-down>
                  </td>
                </tr>
                <tr>
                  <td class="required">예상 노출 횟수</td>
                  <td>
                    <pull-down
                      :data="estimateExposureCountCode"
                      :code="exposureCode"
                      @selected="estimateExposureCountProp"
                      class="pull-down"
                    ></pull-down>
                  </td>
                  <td>할인률(%)</td>
                  <td><input type="text" readonly v-model="estimateExposureRate" /></td>
                </tr>
                <tr>
                  <td class="required">광고 컨텐츠 유무</td>
                  <td>
                    <div class="radio">
                      <v-radio-group v-model="estimateExposureContentFlag">
                        <v-radio label="유" value="Y"></v-radio>
                        <v-radio label="무" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                  <td v-show="estimateExposureContentFlag === 'Y'">컨텐츠 길이(초)</td>
                  <td v-show="estimateExposureContentFlag === 'Y'">
                    <div class="pull-down">
                      <v-select v-model="estimateExposureContentLength" class="v-application" :items="items"></v-select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="required">광고 개월 수(월)</td>
                  <td><input type="text" v-model="estimateExposureMonth" /></td>
                  <td>전체 노출수</td>
                  <td><input type="text" readonly v-model="estimateExposureTotalCount" /></td>
                </tr>
                <tr>
                  <td class="required">시작 날짜</td>
                  <td>
                    <date-picker :propdate="estimateExposureStartDate" @updateDate="estimateExposureStartDateProp" class="modal-date"></date-picker>
                  </td>
                  <td class="required">종료 날짜</td>
                  <td>
                    <date-picker :propdate="estimateExposureEndDate" @updateDate="estimateExposureEndDateProp" class="modal-date"></date-picker>
                  </td>
                </tr>
                <tr>
                  <td>기타 특이 사항</td>
                  <td colspan="3"><textarea v-model="estimateExposureEtc" readonly></textarea></td>
                </tr>
                <!-- <tr>
									<td>구좌수</td>
									<td><input type="text" readonly v-model="estimateExposureAccount" /></td>
								</tr>
								<tr>
									<td>노출 횟수</td>
									<td><input type="text" readonly v-model="estimateExposureCount" /></td>
								</tr> -->
              </table>
            </div>
          </div>
          <div class="header mt50">
            <h2>코멘트</h2>
            <v-btn small class="ml5" color="primary" @click="showCommentModal">코멘트 보기</v-btn>
          </div>

          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" :kind="dialogKind" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import pdfModal from "@/components/modal/common/Pdf";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import productModal from "@/components/modal/homepage/ProductList";
import UserAdvertiserList from "@/components/modal/homepage/UserAdvertiserList";
import CommentModal from "@/components/modal/homepage/CommentModal";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import PullDown from "@/components/form/PullDown.vue";
import FileUpload from "@/components/form/FileUpload.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import bus from "@/utils/bus";
import { getPopupOpt } from "@/utils/modal";
import { getAdminUserNameCookie } from "@/utils/cookie.js";

export default {
  components: { alim, confirm, PullDown, FileUpload, DatePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //날짜 초기 데이터
      date: "",
      //게시물 설정
      page: 1,
      searchText: "",
      productKindName: "",
      productKind: "",
      len: null,
      list: [],
      //디테일 데이터
      estimateSid: "",
      userAdvertiserSid: "",
      advertisingProductSid: "",
      estimatePrice: "",
      estimateStatus: "",
      estimateStatusName: "",
      advertisingProductName: "",
      userAdvertiserName: "",
      userAdvertiserEmail: "",
      userAdvertiserCompanyCeo: "",
      estimateExposureSid: "",
      estimateExposureCountCode: "",
      estimateExposureAccount: "",
      estimateExposureRate: "",
      estimateExposureCount: "",
      estimateExposureContentFlag: "",
      estimateExposureCategoryCode: "",
      estimateExposureMonth: "",
      estimateExposureStartDate: "",
      estimateExposureEndDate: "",
      estimateDescription: "",
      estimateExposureContentLength: 0,
      estimateExposureEtc: "",
      estimateExposureTotalCount: "",
      estimateExposureCountCodeName: "",
      estimateExposureCategoryCodeName: "",
      comment: [],
      message: true,
      channeltuneFiles: [],
      file: [],
      systemCommentFiles: [], //코멘트 파일

      //셀렉트 설정
      statusCode: "SYS21B02B014",
      exposureCode: "SYS21B02B005",
      categoriesCode: "SYS21B01B007",

      items: [15, 30, 45, 60, 75, 90, 105, 120],
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("estimate", ["getEstimateList", "getEstimateDetail", "estimateAdd", "estimateModify"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
    estimateSid(val) {
      // comment add, update시 필요
      this.systemCommentDbPkey = val;
    },
    estimateExposureMonth(val) {
      this.estimateExposureTotalCount = val * this.estimateExposureCount;
    },

    //전체 노출수가 0이라면 ""으로 바꿔 보이지 않게 하기
    estimateExposureTotalCount(val) {
      if (val === "" || val === 0) {
        this.estimateExposureTotalCount = "";
      }
    },
  },
  mounted() {
    // 코멘트 작성자 set
    this.systemCommentWriteName = getAdminUserNameCookie();
    this.reload(0);
  },
  methods: {
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num == 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("estimate/ESTIMATE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        const estimateList = this.getEstimateList.channeltuneApiResult;

        if (estimateList.errorCode === 200) {
          this.list = estimateList.estimate.data;
          this.len = estimateList.estimate.last_page;
        } else {
          this.alim(estimateList.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async estimateDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("estimate/ESTIMATE_DETAIL", id);
        const estimateInfo = this.getEstimateDetail.channeltuneApiResult;

        if (estimateInfo.errorCode === 200) {
          console.log(estimateInfo);
          this.estimateSid = estimateInfo.estimate.estimateSid;
          this.userAdvertiserSid = estimateInfo.estimate.userAdvertiserSid;
          this.estimatePrice = estimateInfo.estimate.estimatePrice;
          this.estimateStatus = estimateInfo.estimate.estimateStatus;
          this.estimateDescription = estimateInfo.estimate.estimateDescription;
          this.estimateStatusName = estimateInfo.estimate.estimateStatusName;
          this.userAdvertiserName = estimateInfo.estimate.userAdvertiserName;
          this.comment = estimateInfo.estimate.comment;
          const estimateExposure = estimateInfo.estimate.estimateExposure;
          if (estimateExposure !== null) {
            this.estimateExposureSid = estimateExposure.estimateExposureSid;
            this.estimateExposureCountCode = estimateExposure.estimateExposureCountCode;
            this.estimateExposureAccount = estimateExposure.estimateExposureAccount;
            this.estimateExposureRate = estimateExposure.estimateExposureRate;
            this.estimateExposureCount = estimateExposure.estimateExposureCount;
            this.estimateExposureContentFlag = estimateExposure.estimateExposureContentFlag;
            this.estimateExposureCategoryCode = estimateExposure.estimateExposureCategoryCode;
            this.estimateExposureMonth = estimateExposure.estimateExposureMonth;
            this.estimateExposureStartDate = estimateExposure.estimateExposureStartDate;
            this.estimateExposureEndDate = estimateExposure.estimateExposureEndDate;
            this.estimateExposureEtc = estimateExposure.estimateExposureEtc;
            this.estimateExposureTotalCount = estimateExposure.estimateExposureTotalCount;
            this.estimateExposureCountCodeName = estimateExposure.estimateExposureCountCodeName;
            this.estimateExposureCategoryCodeName = estimateExposure.estimateExposureCategoryCodeName;
            this.estimateExposureContentLength = estimateExposure.estimateExposureContentLength;
          }

          this.file = [];
          estimateInfo.estimate.files.forEach(row => {
            if (row.fileSid !== "") {
              //pdf 업로드 가능시 보내야할 데이터
              this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
          });
          if (this.file[0] === undefined) {
            this.message = true;
          } else {
            this.message = false;
          }
        } else {
          this.alim(estimateInfo.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //부모 업체 모달
    showModalPopup() {
      this.$modal.show(productModal, { update: this.update }, getPopupOpt("productModal", "700px", "auto", false));
    },
    //모달에서 업체 선택시
    update(data) {
      this.advertisingProductSid = data.advertisingProductSid;
      this.advertisingProductName = data.advertisingProductName;
    },
    //풀다운 데이터 emit
    estimateStatusNameProp(data) {
      this.estimateStatus = data.sysCodeSid;
      this.estimateStatusName = data.sysCodeName;
    },
    estimateExposureCountProp(data) {
      this.estimateExposureCountCode = data.sysCodeSid;
      this.estimateExposureCountCodeName = data.sysCodeName;
      this.estimateExposureAccount = data.sysCodeVal;
      this.estimateExposureRate = data.sysCodeVal1;
      this.estimateExposureCount = data.sysCodeVal2;
      this.estimateExposureTotalCount = data.sysCodeVal2 * this.estimateExposureMonth;
    },
    estimateExposureStartDateProp(date) {
      this.estimateExposureStartDate = date;
    },
    estimateExposureEndDateProp(date) {
      this.estimateExposureEndDate = date;
    },
    estimateExposureCategoryCodeNameProp(data) {
      this.estimateExposureCategoryCode = data.sysCodeSid;
      this.estimateExposureCategoryCodeName = data.sysCodeName;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //사진을 모달에서 삭제시
    detailUpdate() {
      this.estimateDetail(this.estimateSid);
    },

    //등록 validate
    validate(status) {
      if (status == "reg") {
        if (this.estimateSid !== "") {
          this.alim("고유 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.userAdvertiserSid === "") {
        this.alim("광고주 고유 코드를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.estimatePrice === "") {
        this.alim("견적 금액을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateStatusName === "") {
        this.alim("견적서 상태를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureCountCodeName === "") {
        this.alim("예상 노출 횟수를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureContentFlag === "") {
        this.alim("광고 컨텐츠 유무를 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.estimateExposureContentFlag === "Y" && this.estimateExposureContentLength === 0) {
        this.alim("광고 컨텐츠 길이를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureCategoryCode === "") {
        this.alim("광고 카테고리를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureMonth === "") {
        this.alim("광고 개월 수를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureStartDate === "" || this.estimateExposureStartDate === undefined) {
        this.alim("광고 시작 날짜를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.estimateExposureEndDate === "" || this.estimateExposureEndDate === undefined) {
        this.alim("광고 종료 날짜를 입력해 주세요.", this.errorColor);
        return false;
      }

      if (status == "reg") {
        this.reg();
      }
      if (status == "modify") {
        this.modify();
      }
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("estimate/ESTIMATE_ADD", {
          userAdvertiserSid: this.userAdvertiserSid,
          estimatePrice: this.estimatePrice,
          estimateStatus: this.estimateStatus,
          estimateDescription: this.estimateDescription,
          estimateExposureCountCode: this.estimateExposureCountCode,
          estimateExposureCount: this.estimateExposureCount,
          estimateExposureAccount: this.estimateExposureAccount,
          estimateExposureRate: this.estimateExposureRate,
          estimateExposureContentFlag: this.estimateExposureContentFlag,
          estimateExposureContentLength: this.estimateExposureContentLength,
          estimateExposureCategoryCode: this.estimateExposureCategoryCode,
          estimateExposureMonth: this.estimateExposureMonth,
          estimateExposureStartDate: this.estimateExposureStartDate,
          estimateExposureEndDate: this.estimateExposureEndDate,
          estimateExposureTotalCount: this.estimateExposureTotalCount,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.estimateAdd.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.alim(res.errorMessage, this.successColor);
          this.reload(0);
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("estimate/ESTIMATE_MODIFY", {
          userAdvertiserSid: this.userAdvertiserSid,
          estimateSid: this.estimateSid,
          estimatePrice: this.estimatePrice,
          estimateStatus: this.estimateStatus,
          estimateDescription: this.estimateDescription,
          estimateExposureCountCode: this.estimateExposureCountCode,
          estimateExposureCount: this.estimateExposureCount,
          estimateExposureAccount: this.estimateExposureAccount,
          estimateExposureRate: this.estimateExposureRate,
          estimateExposureContentFlag: this.estimateExposureContentFlag,
          estimateExposureContentLength: this.estimateExposureContentLength,
          estimateExposureCategoryCode: this.estimateExposureCategoryCode,
          estimateExposureMonth: this.estimateExposureMonth,
          estimateExposureStartDate: this.estimateExposureStartDate,
          estimateExposureEndDate: this.estimateExposureEndDate,
          estimateExposureTotalCount: this.estimateExposureTotalCount,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.estimateModify.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.alim(res.errorMessage, this.successColor);
          this.reload();
          this.deleteAllChip();
          this.estimateDetail(this.estimateSid);
        } else {
          this.alim(res.errorMessage, this.errorColor);
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
      this.deleteAllChip();
      this.estimateSid = "";
      this.userAdvertiserSid = "";
      this.advertisingProductSid = "";
      this.estimatePrice = "";
      this.estimateStatus = "";
      this.estimateStatusName = "";
      this.advertisingProductName = "";
      this.userAdvertiserName = "";
      this.userAdvertiserEmail = "";
      this.userAdvertiserCompanyCeo = "";
      this.estimateExposureSid = "";
      this.estimateExposureCountCode = "";
      this.estimateExposureAccount = "";
      this.estimateExposureRate = "";
      this.estimateExposureCount = "";
      this.estimateExposureContentFlag = "";
      this.estimateExposureCategoryCode = "";
      this.estimateExposureMonth = "";
      this.estimateExposureStartDate = "";
      this.estimateExposureEndDate = "";
      this.estimateDescription = "";
      this.estimateExposureContentLength = 0;
      this.estimateExposureEtc = "";
      this.estimateExposureTotalCount = "";
      this.estimateExposureCountCodeName = "";
      this.estimateExposureCategoryCodeName = "";
      this.file = [];
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list" && data.kind == "estimate") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("estimate/ESTIMATE_DELETE", this.estimateSid);

            await this.reload(0);
            if (this.list.length < 1) {
              this.page = this.page - 1;
            }
            this.alim("삭제 되었습니다.", this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }

      this.resetDeleteData();
    },

    showAdvertiserModalPopup() {
      //검색버튼 함수
      this.$modal.show(UserAdvertiserList, { update: this.getAdvertiserName }, getPopupOpt("UserAdvertiserList", "700px", "auto", false));
    },

    getAdvertiserName(data) {
      //업체 정보를 가져온후 변수에 할당
      this.userAdvertiserSid = data.userAdvertiserSid;
      this.userAdvertiserCompanyCeo = data.userAdvertiserCompanyCeo;
    },

    showCommentModal() {
      if (this.estimateSid === "" || this.estimateSid === null) {
        this.alim("견적서를 선택해 주세요!", this.errorColor);
      } else {
        this.estimateDetail(this.estimateSid);
        this.$modal.show(CommentModal, { comment: this.comment, estimateSid: this.estimateSid }, getPopupOpt("CommentModal", "700px", "auto", false));
      }
    },
    pdfModal(data) {
      this.$modal.show(pdfModal, { updateData: this.pdfUpdate, data }, getPopupOpt("pdfModal", "1000px", "auto", false));
    },
    //사진을 모달에서 삭제시
    pdfUpdate() {
      this.estimateDetail(this.estimateSid);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 300px;
}
.date-width {
  width: 100px;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}

.selectedBg {
  background: #c4c4c4 !important;
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

  & .btn-group {
    display: flex;
    justify-content: space-between;
    & button {
      margin-left: 5px;
    }
    & .file_container {
      display: flex;
    }
  }

  & .comment-div {
    max-height: 250px;
    overflow-y: scroll;
    & .comment-ul {
      margin-top: 20px;
      padding: 5px;
      & .comment-li {
        margin-top: 10px;
        & .comment-header {
          font-size: 12px;
          color: #696464;
        }

        & .comment-body {
          padding: 7px;
          background: #f0eeee;
          border: 1px solid #bdbdbd;
          box-sizing: border-box;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 14px;
          word-break: break-all;
        }
      }

      & .txtRight {
        text-align: right !important;
      }
    }
  }
}
.advertiserCompanyCeo {
  width: 600px !important;
}
</style>
