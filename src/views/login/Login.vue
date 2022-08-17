<template>
  <div class="login-container" :class="{ dev: develop === true }">
    <div class="login-box">
      <h1 v-if="develop === true"><img src="@/assets/images/icon_dev.png" alt="" class="icon" />{{ title }}</h1>
      <h1 v-else><img src="@/assets/images/icon.png" alt="" class="icon" />{{ title }}</h1>
      <h1 style="display: none">pipeline test tag</h1>
      <form @submit.prevent="submitLogin">
        <div class="mt30 field">
          <v-icon>mdi-account</v-icon>
          <input type="text" v-model="username" placeholder="아이디를 입력하세요." />
        </div>
        <div class="mt10 field">
          <v-icon>mdi-shield-key</v-icon>
          <input type="password" v-model="password" placeholder="비밀번호를 입력하세요." />
        </div>
        <button type="submit" class="btn-login mt25" :disabled="!username || !password" :class="{ dev: develop === true }">로그인 하기</button>
        <p class="error-message">{{ logMessage }}</p>
      </form>
    </div>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </div>
</template>

<script>
import alim from "@/components/dialog/Alim.vue";
import { getAccessTokenCookie, getAdminUserSidCookie, deleteCookie } from "@/utils/cookie";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim },
  mixins: [loading, alimMixin],
  data() {
    return {
      username: "",
      password: "",
      logMessage: "",
      develop: false,
      title: "",
    };
  },
  computed: {
    ...mapGetters("login", ["getLoginInfo"]),
  },
  mounted() {
    if (process.env.VUE_APP_API === "https://devapi.channeltune.net/api/v1") {
      this.develop = true;
      this.title = "개발서버 로그인";
    } else {
      this.develop = false;
      this.title = "관리자 로그인";
    }
    let token = getAccessTokenCookie();
    let id = getAdminUserSidCookie();
    if (token == null && id !== null) {
      alert("토근이 만료됬습니다.");
      deleteCookie("adminUserSid");
    }
  },
  methods: {
    async submitLogin() {
      try {
        bus.$emit("start:spinner");
        const userData = {
          adminUserEmail: this.username,
          password: this.password,
        };
        await this.$store.dispatch("login/LOGIN", userData);
        if (this.getLoginInfo.channeltuneApiResult.errorCode == 200) {
          await this.$router.push("/main");
        } else {
          this.logMessage = this.getLoginInfo.channeltuneApiResult.errorMessage;
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        this.initForm();
        bus.$emit("end:spinner");
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/images/bg.jpg");
  &.dev {
    background-image: url("../../assets/images/dev_bg.jpg");
  }
  & .login-box {
    background: #fff;
    border-radius: 10px;
    padding: 30px;
    width: 400px;
    @include boxshadow(0px, 3px, 6px, 0px, rgba(0, 0, 0, 0.05));
    & .icon {
      width: 28px;
      vertical-align: -4px;
      margin-right: 10px;
    }
    & .field {
      position: relative;
      & .v-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        color: rgb(226, 226, 226);
      }
    }
    & h1 {
      text-align: center;
      & .icon {
        vertical-align: -6px;
      }
    }
    & input {
      height: 45px !important;
      width: 100%;
      border: 1px solid rgb(214, 214, 214);
      padding: 0 10px 0 40px;
      border-radius: 5px;
    }
    & button {
      width: 100%;
      height: 50px;
      background: #ea5959;
      color: #fff;
      border-radius: 5px;
      font-size: 1.8rem;
      &:disabled {
        background: #ccc;
      }
      &.dev {
        background: #035dba;
      }
    }
    .flex-between {
      & a {
        color: rgb(51, 51, 51);
      }
    }
    & .error-message {
      text-align: center;
      padding: 10px 0;
      color: red;
    }
  }
}
</style>
