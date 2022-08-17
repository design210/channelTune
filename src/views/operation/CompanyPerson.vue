<template>
  <section class="container">
    <div class="title-wrap">
      <h1>업체 담당자 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>담당자 리스트</h2>
            <div class="search">
              <input type="text" class="searchText" placeholder="담당자 코드, 업체 코드, 담당자 명, 업체 명" v-model="searchText" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              담당자 리스트 테이블
            </caption>
            <colgroup>
              <col width="90" />
              <col width="80" />
              <col width="60" />
              <col width="150" />
              <col width="130" />
              <col width="80" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>담당자 코드</th>
                <th>담당자 구분</th>
                <th>이름</th>
                <th class="left">이메일 주소</th>
                <th class="left">업체명</th>
                <th>사이트 코드</th>
                <th class="left">사이트 회원이름</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="personDetail(item.companyPersonSid)">
                <td>{{ item.companyPersonSid }}</td>
                <td>{{ item.companyPersonKindName }}</td>
                <td>{{ item.companyPersonName }}</td>
                <td class="left">{{ item.companyPersonEmail }}</td>
                <td class="left">{{ item.companyName }}</td>
                <td>{{ item.homepageUserSid }}</td>
                <td class="left">{{ item.homepageUserName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="7">담당자 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(companyPersonSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>담당자 코드</td>
                <td><input type="text" readonly v-model="companyPersonSid" /></td>
              </tr>
              <tr>
                <td class="required">담당자 구분</td>
                <td>
                  <pull-down :data="companyPersonKind" :code="setCode" @selected="selectOn" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">담당자 업체</td>
                <td class="field-div">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" dark @click="showModalPopup()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>사이트 회원코드</td>
                <td class="field-div">
                  <input type="text" class="input-first" readonly v-model="homepageUserSid" />
                  <input type="text" class="input-last" readonly v-model="homepageUserName" />
                  <v-btn small color="primary" dark @click="showUserModalPopup">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td class="required">담당자 이름</td>
                <td><input type="text" v-model="companyPersonName" /></td>
              </tr>
              <tr>
                <td>담당자 정보</td>
                <td><input type="text" v-model="companyPersonInfo" /></td>
              </tr>
              <tr>
                <td>담당자 전화번호</td>
                <td><input type="text" v-model="companyPersonTel" /></td>
              </tr>
              <tr>
                <td class="required">핸드폰번호</td>
                <td><input type="text" v-model="companyPersonHp" /></td>
              </tr>
              <tr>
                <td>담당자 이메일</td>
                <td><input type="text" v-model="companyPersonEmail" /></td>
              </tr>
              <tr>
                <td>사용여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="companyPersonUseFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
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
import userListModal from "@/components/modal/homepage/UserList";
import { getPopupOpt } from "@/utils/modal";
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, PullDown },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //담당자 디테일 데이터
      companyPersonSid: "",
      companySid: "",
      companyPersonKind: "",
      companyPersonKindName: "",
      memberShipSid: "",
      companyPersonName: "",
      companyPersonInfo: "",
      companyPersonTel: "",
      companyPersonHp: "",
      companyPersonEmail: "",
      companyPersonUseFlag: "Y",
      created_at: "",
      updated_at: "",
      companyName: "",
      homepageUserSid: "",
      homepageUserName: "",
      homepageUserEmail: "",
      //셀렉트 설정
      setCode: "SYS21802B001",
    };
  },
  computed: {
    ...mapGetters("companyPerson", ["getManagerList", "getManagerDetail", "setManagerResult", "managerModifyResult", "managerDeleteResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    //풀다운 데이터 emit
    selectOn(data) {
      this.companyPersonKind = data.sysCodeSid;
      this.companyPersonKindName = data.sysCodeName;
    },
    //담당자 업체 모달
    showModalPopup() {
      this.$modal.show(companyListModal, { update: this.update }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    showUserModalPopup() {
      this.$modal.show(userListModal, { update: this.updateUser }, getPopupOpt("userListModal", "700px", "auto", false));
    },
    //모달에서 업체 선택시
    update(data) {
      this.companySid = data.companySid;
      this.companyName = data.companyName;
    },
    updateUser(data) {
      this.homepageUserSid = data.homepageUserSid;
      this.homepageUserName = data.homepageUserName + " " + data.homepageUserEmail;
      this.homepageUserEmail = data.homepageUserEmail;
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
        await this.$store.dispatch("companyPerson/MANAGER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getManagerList.channeltuneApiResult.errorCode == 200) {
          const personList = this.getManagerList.channeltuneApiResult.companyPerson;
          this.list = personList.data;
          this.len = personList.last_page;
        } else {
          this.alim(this.getManagerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //담당자 상세 정보
    async personDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyPerson/MANAGER_DETAIL", {
          companyPersonSid: id,
        });
        if (this.getManagerDetail.channeltuneApiResult.errorCode == 200) {
          const personInfo = this.getManagerDetail.channeltuneApiResult.companyPerson;
          this.companyPersonSid = personInfo.companyPersonSid;
          this.companySid = personInfo.companySid;
          this.companyPersonKind = personInfo.companyPersonKind;
          this.companyPersonKindName = personInfo.companyPersonKindName;
          this.memberShipSid = personInfo.memberShipSid;
          this.companyPersonName = personInfo.companyPersonName;
          this.companyPersonInfo = personInfo.companyPersonInfo;
          this.companyPersonTel = personInfo.companyPersonTel;
          this.companyPersonHp = personInfo.companyPersonHp;
          this.companyPersonEmail = personInfo.companyPersonEmail;
          this.companyPersonUseFlag = personInfo.companyPersonUseFlag;
          this.created_at = personInfo.created_at;
          this.updated_at = personInfo.updated_at;
          this.companyName = personInfo.companyName;
          this.homepageUserSid = personInfo.homepageUserSid;
          this.homepageUserName = personInfo.homepageUserName;
        } else {
          this.alim(this.getManagerDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //담당자 추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyPerson/MANAGER_ADD", {
          companyPersonSid: this.companyPersonSid,
          companySid: this.companySid,
          companyPersonKind: this.companyPersonKind,
          companyPersonKindName: this.companyPersonKindName,
          memberShipSid: this.memberShipSid,
          companyPersonName: this.companyPersonName,
          companyPersonInfo: this.companyPersonInfo,
          companyPersonTel: this.companyPersonTel,
          companyPersonHp: this.companyPersonHp,
          companyPersonEmail: this.companyPersonEmail,
          companyPersonUseFlag: this.companyPersonUseFlag,
          created_at: this.created_at,
          updated_at: this.updated_at,
          companyName: this.companyName,
          homepageUserSid: this.homepageUserSid,
          homepageUserName: this.homepageUserName + " " + this.homepageUserEmail,
        });
        if (this.setManagerResult.channeltuneApiResult.errorCode == 200) {
          this.alim("담당자가 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.setManagerResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        if (this.companyPersonSid !== "") {
          this.alim("담당자 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.companyPersonKind === "" || this.companyPersonKind == null) {
        this.alim("담당자 구분을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyName === "" || this.companyName == null) {
        this.alim("담당자 업체를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyPersonName === "" || this.companyPersonName == null) {
        this.alim("담당자 이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.companyPersonHp === "" || this.companyPersonHp == null) {
        this.alim("핸드폰번호 입력해 주세요.", this.errorColor);
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
        await this.$store.dispatch("companyPerson/MANAGER_MODIFY", {
          companyPersonSid: this.companyPersonSid,
          companySid: this.companySid,
          companyPersonKind: this.companyPersonKind,
          companyPersonKindName: this.companyPersonKindName,
          memberShipSid: this.memberShipSid,
          companyPersonName: this.companyPersonName,
          companyPersonInfo: this.companyPersonInfo,
          companyPersonTel: this.companyPersonTel,
          companyPersonHp: this.companyPersonHp,
          companyPersonEmail: this.companyPersonEmail,
          companyPersonUseFlag: this.companyPersonUseFlag,
          created_at: this.created_at,
          updated_at: this.updated_at,
          companyName: this.companyName,
          homepageUserSid: this.homepageUserSid,
          homepageUserName: this.homepageUserName + " " + this.homepageUserEmail,
        });
        if (this.managerModifyResult.channeltuneApiResult.errorCode == 200) {
          this.reload(2);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.managerModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
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
            await this.$store.dispatch("companyPerson/MANAGER_DEL", this.companyPersonSid);
            if (this.managerDeleteResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.managerDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.companyPersonSid = "";
      this.companySid = "";
      this.companyPersonKind = "";
      this.companyPersonKindName = "";
      this.memberShipSid = "";
      this.companyPersonName = "";
      this.companyPersonInfo = "";
      this.companyPersonTel = "";
      this.companyPersonHp = "";
      this.companyPersonEmail = "";
      this.companyPersonUseFlag = "Y";
      this.created_at = "";
      this.updated_at = "";
      this.companyName = "";
      this.homepageUserSid = "";
      this.homepageUserName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 65% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(35% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.searchText {
  border: 1px solid #ccc;
  height: 30px;
  padding: 0 10px;
  width: 250px;
}
</style>
