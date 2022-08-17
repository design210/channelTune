<template>
  <section class="container">
    <div class="title-wrap">
      <h1>파트너 문의</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header row">
            <div class="d-flex">
              <div class="search-group">
                <span class="mr5">시작날짜</span>
                <date-picker :current="today" :clear="clearDate" @updateDate="startDay" class="date"></date-picker>
                <span class="ml10 mr5">~ 종료날짜</span>
                <date-picker :current="today" :clear="clearDate" @updateDate="endDay" class="date"></date-picker>
                <v-btn small color="primary" dark class="ml10 mr30" @click="setToday">Today</v-btn>
              </div>
            </div>
            <div class="search mt5 align-center d-flex">
              <span class="mr5">문의구분</span>
              <pull-down :clear="clearField" :code="contactCode" @selected="statusContact" class="pull-down w110"></pull-down>
              <span class="ml5 mr5">상태</span>
              <pull-down :clear="clearField" :code="statusCode" @selected="status" class="pull-down w110"></pull-down>
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input w110 ml20" @keyup.enter="search" />
              <v-btn small color="primary" dark @click="search" class="btn-search">조회</v-btn>
              <v-btn small @click="clearSearch">검색 초기화</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              담당자 리스트 테이블
            </caption>
            <colgroup>
              <col width="80" />
              <col width="150" />
              <col width="150" />
              <col width="*" />
              <col width="150" />
            </colgroup>
            <thead>
              <tr>
                <th>고유 코드</th>
                <th>문의일</th>
                <th>이름</th>
                <th>문의종류</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="contactDetail(item.inquireSid)">
                <td>{{ item.inquireSid }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.companyPersonName }}</td>
                <td>{{ item.inquireTypeName }}</td>
                <td>{{ item.inquireStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="5">고객문의 리스트가 없습니다.</td>
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
              <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(inquireSid)">삭제</v-btn>
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
                <td>고유 코드</td>
                <td><input type="text" readonly v-model="inquireSid" /></td>
                <td>문의일자</td>
                <td><input type="text" readonly v-model="inquireDate" /></td>
              </tr>
              <tr>
                <td>이름</td>
                <td><input type="text" readonly v-model="inquireName" /></td>
                <td>이메일</td>
                <td><input type="text" readonly v-model="inquireEmail" /></td>
              </tr>
              <tr>
                <td>회사명</td>
                <td><input type="text" readonly v-model="inquireCompanyName" /></td>
                <td>전화번호</td>
                <td><input type="text" readonly v-model="inquireHp" /></td>
              </tr>
              <tr>
                <td>주소</td>
                <td colspan="3" class="single">
                  <input type="text" class="input-first" readonly v-model="inquireCompanyAddress" />
                </td>
              </tr>
              <tr>
                <td>업종</td>
                <td colspan="3" class="single">
                  <input type="text" class="input-first" readonly v-model="inquireBusinessCategory" />
                </td>
              </tr>
              <tr>
                <td>문의사항</td>
                <td colspan="3" class="single">
                  <textarea readonly v-model="inquireOther"></textarea>
                </td>
              </tr>
              <tr>
                <td>문의선택</td>
                <td colspan="3" class="single">
                  <input type="text" class="input-first" readonly v-model="inquireChoice" />
                </td>
              </tr>
              <tr>
                <td>첨부파일</td>
                <td colspan="3" class="single">
                  <ul class="thumbnail">
                    <li v-for="(item, index) in file" :key="index">
                      <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                      <div v-if="message === false" class="thubmnail-type">
                        <div @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })">
                          <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                        </div>
                      </div>
                    </li>
                    <div v-if="message === true">첨부된 파일이 없습니다.</div>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>답변</td>
                <td colspan="3" class="single">
                  <textarea v-model="inquireAnswer"></textarea>
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>생성일시</td>
                <td><input type="text" readonly v-model="created_at" /></td>
              </tr>
              <tr>
                <td>업데이트 일시</td>
                <td><input type="text" readonly v-model="updated_at" /></td>
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
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import companyListModal from "@/components/modal/common/CompanyList";
import DatePicker from "@/components/form/DatePicker.vue";
import { getPopupOpt } from "@/utils/modal";
import PullDown from "@/components/form/PullDown.vue";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, PullDown, DatePicker },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      today: "",
      clearDate: false,
      clearField: false,
      page: 1,
      searchText: "",
      serchInquireStartDate: "",
      serchInquireEndDate: "",
      serchInquireKind: "",
      serchInquireStatus: "",
      len: null,
      list: [],
      //고객문의 디테일 데이터
      inquireSid: "",
      inquireDate: "",
      inquireName: "",
      inquireKind: "",
      inquireEmail: "",
      inquireHp: "",
      inquireCompanyName: "",
      inquireCompanyAddress: "",
      inquireBusinessCategory: "",
      inquireOther: "",
      inquireChoice: "",
      inquireWhenother: "",
      inquirePrcture: "",
      inquireKnowTune: "",
      inquireAnswer: "",
      inquireStatus: "",
      created_at: "",
      updated_at: "",
      inquireKindName: "",
      inquireStatusName: "",
      fileSid: "",
      message: true,
      file: [],
      //셀렉트 설정
      contactCode: "SYS22707B002",
      statusCode: "SYS22707B003",
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("inquire", ["getPartnerContactList", "getPartnerContactDetail", "contactPartnerModify", "contactPartnerDelete"]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload();
    },
  },
  mounted() {
    this.reload();
  },
  methods: {
    statusContact(data) {
      this.serchInquireKind = data.sysCodeSid;
    },
    status(data) {
      this.serchInquireStatus = data.sysCodeSid;
    },
    startDay(date) {
      this.serchInquireStartDate = date;
    },
    endDay(date) {
      this.serchInquireEndDate = date;
    },
    setToday() {
      this.today = new Date().toISOString().substr(0, 10);
      this.searchActualSurveyDate_start = new Date().toISOString().substr(0, 10);
      this.searchActualSurveyDate_end = new Date().toISOString().substr(0, 10);
      const _this = this;
      let time = setTimeout(function () {
        _this.today = "";
        clearInterval(time);
      }, 100);
    },
    search() {
      if (this.serchInquireStartDate > this.serchInquireEndDate) {
        this.alim("종료날짜가 시작날짜보다 빠릅니다.", this.errorColor);
        return false;
      }
      this.reload(1);
      this.clearSearch();
    },
    //풀다운 데이터 emit
    selectOn(data) {
      this.companyPersonKind = data.sysCodeSid;
      this.companyPersonKindName = data.sysCodeName;
    },
    //담당자 업체 모달
    showModalPopup() {
      this.$modal.show(companyListModal, { update: this.update }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    //모달에서 업체 선택시
    update(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("inquire/PARTNER_CONTACT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          serchInquireStartDate: this.serchInquireStartDate,
          serchInquireEndDate: this.serchInquireEndDate,
          serchInquireKind: this.serchInquireKind,
          serchInquireStatus: this.serchInquireStatus,
        });

        const res = this.getPartnerContactList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.partnerInquire;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //담당자 상세 정보
    async contactDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("inquire/PARTNER_CONTACT_DETAIL", {
          inquireSid: id,
        });
        const res = this.getPartnerContactDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        const contactInfo = res.partnerInquire;
        this.inquireSid = contactInfo.inquireSid;
        this.inquireDate = contactInfo.created_at;
        this.inquireName = contactInfo.companyPersonName;
        this.inquireEmail = contactInfo.companyPersonEmail;
        this.inquireHp = contactInfo.companyPersonHp;
        this.inquireCompanyName = contactInfo.companyName;
        this.inquireCompanyAddress = contactInfo.companyAddress1 + contactInfo.companyAddress2;
        this.inquireBusinessCategory = contactInfo.companyKindName;
        this.inquireOther = isEmpty(contactInfo.inquireContent);
        this.inquireChoice = contactInfo.inquireTypeName;
        this.inquirePrcture = contactInfo.inquirePrcture;
        this.inquireAnswer = contactInfo.inquireAnswer;
        this.created_at = contactInfo.created_at;
        this.updated_at = contactInfo.updated_at;
        //img url
        this.file = [];
        contactInfo.fileResult.forEach(row => {
          if (row.fileSid !== "") {
            this.file.push({ url: row.fileSid, name: row.fileFileName, fileExt: row.fileExt });
          }
        });
        if (this.file[0] === undefined) {
          this.message = true;
        } else {
          this.message = false;
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.reloadDetail, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //섬네일 삭제시 디테일 리로드
    reloadDetail() {
      this.reload();
      this.contactDetail(this.inquireSid);
    },
    //등록 validate
    validate(status) {
      if (this.inquireAnswer == "" || this.inquireAnswer == null) {
        this.alim("고객 메모를 입력해주세요.", this.errorColor);
        return false;
      }
      if (status == "modify") {
        this.modify();
      }
    },
    //담당자 수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("inquire/PARTNER_CONTACT_MODIFY", {
          inquireSid: this.inquireSid,
          inquireAnswer: this.inquireAnswer,
        });

        const res = this.contactPartnerModify.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        await this.reload();
        this.alim("수정 되었습니다.", this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("inquire/PARTNER_CONTACT_DEL", this.inquireSid);
            const res = this.contactPartnerDelete.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.erorrColor);
              return false;
            }

            this.clear();
            this.reload();
            if (this.list.length < 1) {
              this.page = this.page - 1;
            }
            this.file = [];
            this.alim("삭제 되었습니다.", this.successColor);
            this.clear();
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            this.alim("삭제 되었습니다.", this.successColor);
            this.contactDetail(this.inquireSid);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    //clear
    clear() {
      this.inquireSid = "";
      this.inquireDate = "";
      this.inquireName = "";
      this.inquireKind = "";
      this.inquireEmail = "";
      this.inquireHp = "";
      this.inquireCompanyName = "";
      this.inquireCompanyAddress = "";
      this.inquireBusinessCategory = "";
      this.inquireOther = "";
      this.inquireChoice = "";
      this.inquireWhenother = "";
      this.inquirePrcture = "";
      this.inquireKnowTune = "";
      this.inquireAnswer = "";
      this.inquireStatus = "";
      this.created_at = "";
      this.updated_at = "";
      this.inquireKindName = "";
      this.inquireStatusName = "";
      this.fileSid = "";
      this.file = [];
    },
    //clear
    clearSearch() {
      this.searchText = "";
      this.serchInquireStartDate = "";
      this.serchInquireEndDate = "";
      this.serchInquireKind = "";
      this.serchInquireStatus = "";
      this.clearField = !this.clearField;
      this.clearDate = !this.clearDate;
      const element = document.querySelectorAll(".user-list-tbl tr");
      element.forEach(ele => {
        ele.classList.remove("active");
      });
      this.clear();
      this.reload(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: block !important;
}
.thumbnail {
  display: flex;
  flex-wrap: wrap;
  & li {
    margin-right: 5px;
    position: relative;
    cursor: pointer;
    margin-bottom: 5px;
    & button {
      position: absolute;
      right: 3px;
      top: 3px;
      color: rgb(122, 122, 122);
      cursor: pointer;
    }
    & img {
      width: 80px;
      height: 60px;
    }
  }
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
