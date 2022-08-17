<template>
  <section class="container">
    <div class="title-wrap">
      <h1>시스템 사용자 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>사용자 리스트</h2>
            <div class="search">
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              사용자 리스트 테이블
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="120" />
              <col width="50" />
              <col width="180" />
              <col width="180" />
            </colgroup>
            <thead>
              <tr>
                <th>회원코드</th>
                <th class="left">ID</th>
                <th>이름</th>
                <th>회원레벨</th>
                <th>가입일시</th>
                <th>최종로그인일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="userDetail(item.adminUserSid)">
                <td>{{ item.adminUserSid }}</td>
                <td class="left">{{ item.adminUserEmail }}</td>
                <td>{{ item.adminUserName }}</td>
                <td>{{ item.adminUserLevel }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.updated_at }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">관리자 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(adminUserSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <form>
              <table width="100%" class="tbl-reg">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>사용자 고유코드</td>
                  <td><input type="text" readonly v-model="adminUserSid" /></td>
                </tr>
                <tr>
                  <td>사용자 이름</td>
                  <td><input type="text" v-model="adminUserName" /></td>
                </tr>
                <tr>
                  <td>이메일 주소</td>
                  <td><input type="text" v-model="adminUserEmail" /></td>
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td><input type="password" v-model="password" /></td>
                </tr>
                <tr>
                  <td>비밀번호 확인</td>
                  <td><input type="password" v-model="password_confirmation" /></td>
                </tr>
                <tr>
                  <td>레벨</td>
                  <td><input type="text" v-model="adminUserLevel" maxlength="2" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" /></td>
                </tr>
                <tr>
                  <td>사용여부</td>
                  <td>
                    <div class="radio">
                      <v-radio-group v-model="adminUserUseFlag" :mandatory="false">
                        <v-radio label="사용함" value="Y"></v-radio>
                        <v-radio label="사용안함" value="N"></v-radio>
                      </v-radio-group>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>등록자</td>
                  <td><input type="text" readonly v-model="created_name" /></td>
                </tr>
              </table>
            </form>
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
import { CheckPassword, verifyEmail } from "@/utils/validate";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import resMixin from "@/mixins/response.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm },
  mixins: [loading, alimMixin, deleteMixin, resMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //유저 디테일 데이터
      adminUserSid: "",
      adminUserName: "",
      adminUserEmail: "",
      adminUserLevel: "",
      password: "",
      password_confirmation: "",
      adminUserUseFlag: "Y",
      created_name: "",
      created_at: "",
      updated_at: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getUserList", "getUserDetail", "userAdd", "userDeleteResult"]),
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
        await this.$store.dispatch("member/USER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getUserList.channeltuneApiResult.errorCode === 200) {
          const userList = this.getUserList.channeltuneApiResult.adminUserMaster;
          this.list = userList.data;
          this.len = userList.last_page;
        } else {
          this.alim(this.getUserList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유저 상세 정보
    async userDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/USER_DETAIL", {
          adminUserSid: id,
        });
        if (this.getUserDetail.channeltuneApiResult.errorCode === 200) {
          const userDetail = this.getUserDetail.channeltuneApiResult.adminUserMaster;
          this.adminUserSid = userDetail.adminUserSid;
          this.adminUserName = userDetail.adminUserName;
          this.adminUserEmail = userDetail.adminUserEmail;
          this.adminUserLevel = userDetail.adminUserLevel;
          this.adminUserUseFlag = userDetail.adminUserUseFlag;
          this.created_name = userDetail.created_name;
          this.created_at = userDetail.created_at;
          this.updated_at = userDetail.updated_at;
          this.password = "";
          this.password_confirmation = "";
        } else {
          this.alim(this.getUserDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유저 추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/USER_ADD", {
          adminUserName: this.adminUserName,
          adminUserEmail: this.adminUserEmail,
          password: this.password,
          password_confirmation: this.password_confirmation,
          adminUserLevel: this.adminUserLevel,
          adminUserUseFlag: this.adminUserUseFlag,
        });
        if (this.userAdd.channeltuneApiResult.errorCode == 200) {
          this.alim("관리자가 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.userAdd.channeltuneApiResult.errorMessage, this.errorColor);
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
        if (this.adminUserSid !== "") {
          this.alim("사용자 고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
        if (this.password === "") {
          this.alim("비밀번호를 입력해 주세요.", this.errorColor);
          return false;
        }
        if (this.password !== "") {
          let result = !CheckPassword(this.password);
          if (result === false) {
            this.alim("비밀번호는 영문 또는 숫자 8자리 이상이어야 합니다.", this.errorColor);
            return false;
          }
        }
        if (this.password_confirmation === "") {
          this.alim("비밀번호 확인을 입력해 주세요.", this.errorColor);
          return false;
        }
        if (this.password !== this.password_confirmation) {
          this.alim("비밀번호가 일치하지 않습니다.", this.errorColor);
          return false;
        }
      }
      if (this.adminUserName === "") {
        this.alim("사용자 이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.adminUserEmail === "") {
        this.alim("이메일을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.adminUserEmail !== "") {
        let result = verifyEmail(this.adminUserEmail);
        if (result === false) {
          this.alim("이메일 형식이 틀렸습니다.", this.errorColor);
          return false;
        }
      }
      if (this.adminUserLevel === "") {
        this.alim("레벨을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //유저 수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("member/USER_MODIFY", {
          adminUserSid: this.adminUserSid,
          adminUserName: this.adminUserName,
          adminUserEmail: this.adminUserEmail,
          password: this.password,
          password_confirmation: this.password_confirmation,
          adminUserLevel: this.adminUserLevel,
          adminUserUseFlag: this.adminUserUseFlag,
        });
        this.__responseCheck(res, this.alim, this.reload);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유저 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("member/USER_DEL", this.adminUserSid);
            if (this.userDeleteResult.channeltuneApiResult.errorCode === 200) {
              this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.userDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
      this.password = "";
      this.password_confirmation = "";
      this.adminUserSid = "";
      this.adminUserName = "";
      this.adminUserEmail = "";
      this.adminUserLevel = "";
      this.adminUserUseFlag = "Y";
      this.created_name = "";
      this.created_at = "";
      this.updated_at = "";
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
</style>
