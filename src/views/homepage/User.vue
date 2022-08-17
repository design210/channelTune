<template>
  <section class="container">
    <div class="title-wrap">
      <h1>회원 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>회원 리스트</h2>
            <div class="search">
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              리스트 테이블
            </caption>
            <colgroup>
              <col width="50" />
              <col width="80" />
              <col width="150" />
              <col width="150" />
              <col width="80" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>회원코드</th>
                <th>이름</th>
                <th>아이디(이메일)</th>
                <th>가입일시</th>
                <th>회원가입 종류</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="userDetail(item.homepageUserSid)">
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepageUserName }}</td>
                <td>{{ item.homepageUserEmail }}</td>
                <td>{{ item.homePageUserCreateDateTime }}</td>
                <td>{{ item.homepageUserKindName }}</td>
                <td>{{ item.homePageUserStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">회원 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(homepageUserSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <form>
              <table width="100%" class="tbl-reg">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>회원 고유코드</td>
                  <td><input type="text" readonly v-model="homepageUserSid" /></td>
                  <td class="center">회원 계정 구분</td>
                  <td class="radio">
                    <v-radio-group v-model="homepageUserTestFlag" :mandatory="false">
                      <v-radio label="일반 계정" value="N"></v-radio>
                      <v-radio label="테스트 계정" value="Y"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>회원 이름</td>
                  <td colspan="3"><input type="text" v-model="homepageUserName" /></td>
                </tr>
                <tr>
                  <td>이메일 주소</td>
                  <td colspan="3"><input type="text" v-model="homepageUserEmail" /></td>
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td colspan="3"><input type="password" v-model="password" /></td>
                </tr>
                <tr>
                  <td>비밀번호 확인</td>
                  <td colspan="3"><input type="password" v-model="password_confirmation" /></td>
                </tr>
                <tr>
                  <td>회원가입 종류</td>
                  <td colspan="3">
                    <pull-down :data="homepageUserKind" :code="kindCode" @selected="homepageUserKindNameProp" class="pull-down"></pull-down>
                  </td>
                </tr>
                <tr>
                  <td>회원가입 상태</td>
                  <td colspan="3">
                    <pull-down :data="homePageUserStatus" :code="statusCode" @selected="homepageUserStatusProp" class="pull-down"></pull-down>
                  </td>
                </tr>
                <tr>
                  <td>SMS 수신여부</td>
                  <td class="radio">
                    <v-radio-group v-model="homepageUserConfigSmsName" :mandatory="false">
                      <v-radio label="사용" value="SYS22103B009"></v-radio>
                      <v-radio label="미사용" value="SYS22103B010"></v-radio>
                    </v-radio-group>
                  </td>
                  <td>Email 수신여부</td>
                  <td class="radio">
                    <v-radio-group v-model="homepageUserConfigEmailName" :mandatory="false">
                      <v-radio label="사용" value="SYS22103B011"></v-radio>
                      <v-radio label="미사용" value="SYS22103B012"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>푸시 수신여부</td>
                  <td class="radio">
                    <v-radio-group v-model="homepageUserConfigPushName" :mandatory="false">
                      <v-radio label="사용" value="SYS22103B013"></v-radio>
                      <v-radio label="미사용" value="SYS22103B014"></v-radio>
                    </v-radio-group>
                  </td>
                  <td>프로모션 수신여부</td>
                  <td class="radio">
                    <v-radio-group v-model="homepageUserConfigPromotionName" :mandatory="false">
                      <v-radio label="사용" value="SYS22103B007"></v-radio>
                      <v-radio label="미사용" value="SYS22103B008"></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
              </table>
            </form>
            <div class="tbl-div-line"></div>
            <div class="history mt20">
              <div class="header"><h2>회원 상태 HISTORY</h2></div>
              <table class="tbl tbl-reg user-list-tbl select-tbl">
                <caption>
                  히스토리 테이블
                </caption>
                <colgroup>
                  <col width="70" />
                  <col width="90" />
                  <col width="120" />
                  <col width="*" />
                  <col width="80" />
                  <col width="60" />
                  <col width="60" />
                </colgroup>
                <thead>
                  <tr>
                    <th>고유코드</th>
                    <th>상태고유코드</th>
                    <th>상태명</th>
                    <th>적용일시</th>
                    <th>적용코드</th>
                    <th>적용값</th>
                    <th>적용자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in userHistory" :key="idx">
                    <td>{{ item.homepageUserConfigSid }}</td>
                    <td>{{ item.homepageUserConfigKind }}</td>
                    <td>{{ item.homepageUserConfigKindName }}</td>
                    <td>{{ item.homepageUserConfigDate }}</td>
                    <td>{{ item.homepageUserConfigStatus1 }}</td>
                    <td>{{ item.homepageUserConfigStatus1Name }}</td>
                    <td>{{ item.homepageUserConfigSetName }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
import PullDown from "@/components/form/PullDown.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import responseMixin from "@/mixins/response";
export default {
  components: { alim, confirm, PullDown },
  mixins: [loading, alimMixin, deleteMixin, responseMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //유저 디테일 데이터
      homepageUserSid: "",
      homepageUserKind: "",
      homepageUserEmail: "",
      homepageUserName: "",
      homePageUserCreateDateTime: "",
      homepageUserWithdrawDateTime: "",
      homePageUserStatus: "",
      homepageUserTestFlag: "N",
      homepageUserConfigPromotionName: "SYS22103B008",
      homepageUserConfigSmsName: "SYS22103B009",
      homepageUserConfigEmailName: "SYS22103B011",
      homepageUserConfigPushName: "SYS22103B013",
      updated_at: "",
      created_at: "",
      homepageUserKindName: "",
      homepageUserStatus: "",
      password_confirmation: "",
      homePageUserStatusName: "",
      password: "",
      //셀렉트 설정
      kindCode: "SYS21823B002",
      statusCode: "SYS21823B003",
      userHistory: [],
    };
  },
  computed: {
    ...mapGetters("user", ["getUserList", "getUserDetail", "userAddResult", "userModifyResult", "userDeleteResult"]),
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
    homepageUserKindNameProp(data) {
      this.homepageUserKind = data.sysCodeSid;
      this.homepageUserKindName = data.sysCodeName;
    },
    homepageUserStatusProp(data) {
      this.homePageUserStatus = data.sysCodeSid;
      this.homePageUserStatusName = data.sysCodeName;
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
        const res = await this.__getResponse("user/GET_USER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }

        const data = res.homepageUserMaster;
        this.list = data.data;
        this.len = data.last_page;
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
        const res = await this.__getResponse("user/GET_USER_DETAIL", id);

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }

        const userDetail = res.homepageUserMaster;
        this.homepageUserSid = userDetail.homepageUserSid;
        this.homepageUserKind = userDetail.homepageUserKind;
        this.homepageUserEmail = userDetail.homepageUserEmail;
        this.homepageUserName = userDetail.homepageUserName;
        this.homePageUserCreateDateTime = userDetail.homePageUserCreateDateTime;
        this.homepageUserWithdrawDateTime = userDetail.homepageUserWithdrawDateTime;
        this.homePageUserStatus = userDetail.homePageUserStatus;
        this.updated_at = userDetail.updated_at;
        this.created_at = userDetail.created_at;
        this.homepageUserConfigPromotionName = userDetail.homepageUserConfigPromotion;
        this.homepageUserConfigSmsName = userDetail.homepageUserConfigSms;
        this.homepageUserConfigEmailName = userDetail.homepageUserConfigEmail;
        this.homepageUserConfigPushName = userDetail.homepageUserConfigPush;
        this.homepageUserKindName = userDetail.homepageUserKindName;
        this.homePageUserStatusName = userDetail.homePageUserStatusName;
        this.homepageUserTestFlag = userDetail.homepageUserTestFlag;
        this.userHistory = userDetail.userConfig;
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
        const res = await this.__getResponse("user/USER_ADD", {
          homepageUserKind: this.homepageUserKind,
          homepageUserEmail: this.homepageUserEmail,
          homepageUserName: this.homepageUserName,
          homepageUserConfigPromotion: this.homepageUserConfigPromotionName,
          homepageUserConfigSms: this.homepageUserConfigSmsName,
          homepageUserConfigEmail: this.homepageUserConfigEmailName,
          homepageUserConfigPush: this.homepageUserConfigPushName,
          homePageUserStatus: this.homePageUserStatus,
          password_confirmation: this.password_confirmation,
          homepageUserTestFlag: this.homepageUserTestFlag,
          password: this.password,
        });
        // await this.$store.dispatch('user/USER_ADD', {
        // 	homepageUserKind: this.homepageUserKind,
        // 	homepageUserEmail: this.homepageUserEmail,
        // 	homepageUserName: this.homepageUserName,
        // 	homePageUserCreateDateTime: this.homePageUserCreateDateTime,
        // 	homepageUserWithdrawDateTime: this.homepageUserWithdrawDateTime,
        // 	homepageUserStatus: this.homepageUserStatus,
        // 	password_confirmation: this.password_confirmation,
        // 	password: this.password,
        // });

        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return;
        }

        this.alim("회원이 추가 되었습니다.", this.successColor);
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.homepageUserSid !== "") {
          this.alim("회원 고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
        if (this.password === "") {
          this.alim("비밀번호를 입력해 주세요.", this.errorColor);
          return false;
        }
        if (this.password !== "") {
          let result = CheckPassword(this.password);
          if (result) {
            this.alim("비밀번호는 영문 또는 숫자, 특수문자 포함 8자리 이상이어야 합니다.", this.errorColor);
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
      if (this.homepageUserName === "") {
        this.alim("회원 이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.homepageUserEmail === "") {
        this.alim("이메일을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.homepageUserEmail !== "") {
        let result = verifyEmail(this.homepageUserEmail);
        if (result === false) {
          this.alim("이메일 형식이 틀렸습니다.", this.errorColor);
          return false;
        }
      }
      if (this.homepageUserKindName === "") {
        this.alim("회원가입 종류를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.homePageUserStatusName === "") {
        this.alim("회원가입 상태를 입력해 주세요.", this.errorColor);
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
        const res = await this.__getResponse("user/USER_MODIFY", {
          homepageUserSid: this.homepageUserSid,
          homepageUserEmail: this.homepageUserEmail,
          homepageUserName: this.homepageUserName,
          homepageUserConfigPromotion: this.homepageUserConfigPromotionName,
          homepageUserConfigSms: this.homepageUserConfigSmsName,
          homepageUserConfigEmail: this.homepageUserConfigEmailName,
          homepageUserConfigPush: this.homepageUserConfigPushName,
          homePageUserStatus: this.homePageUserStatus,
          homepageUserTestFlag: this.homepageUserTestFlag,
          password: this.password,
        });
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }

        await this.userDetail(this.homepageUserSid);
        this.alim(res.errorMessage, this.successColor);
        await this.reload(0);
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
            const res = await this.__getResponse("user/USER_DELETE_RESULT", this.homepageUserSid);
            if (res.errorCode !== 200) {
              return this.alim(res.errorMessage, this.errorColor);
            }
            await this.reload(0);
            this.alim(res.errorMessage, this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }

          // await this.$store.dispatch('user/USER_DEL', this.homepageUserSid);
          // const res = this.userDeleteResult.channeltuneApiResult;
          // if (res.errorCode !== 200) {
          // 	this.alim(res.errorMessage, this.errorColor);
          // 	bus.$emit('end:spinner');
          // 	return false;
          // }

          // await this.reload(0);
          // if (this.list.length < 1) {
          // 	this.page = this.page - 1;
          // }
          // this.alim('삭제 되었습니다.', this.successColor);
        }
      }
      this.resetDeleteData();
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.homepageUserSid = "";
      this.homepageUserKind = "";
      this.homepageUserEmail = "";
      this.homepageUserName = "";
      this.homePageUserCreateDateTime = "";
      this.homepageUserWithdrawDateTime = "";
      this.homePageUserStatus = "";
      this.updated_at = "";
      this.created_at = "";
      this.homepageUserKindName = "";
      this.homepageUserStatus = "";
      this.password_confirmation = "";
      this.password = "";
      this.homepageUserTestFlag = "N";
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
    width: 50% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(50% - 20px);
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
