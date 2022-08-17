<template>
  <section class="top">
    <div class="d-flex align-center" :style="background">
      <div class="logo">
        <a @click="lnbSet2()"><span>Channel</span> TUNE</a>
      </div>
      <nav class="gnb">
        <ul>
          <li
            v-for="item in menuList"
            :key="item.sysCodeSid"
            @click="lnbSet({ sid: item.sysCodeSid, link: item.sysCodeVal1, sort: item.sysCodeSort })"
            class="gnblist"
            :class="item.sysCodeSid"
          >
            <a
              ><span>{{ item.sysCodeName }}</span></a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="logout">
      <a href="javascript:;" @click="logout"><v-icon>mdi-logout</v-icon>로그아웃</a>
    </div>
    <!--    <FloatMenu />-->
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import { deleteCookie, uiCodeCookie } from "@/utils/cookie.js";
import { debounce } from "lodash";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim";
export default {
  components: { alim },
  mixins: [alimMixin],
  data() {
    return {
      open: true,
      sid: "",
      menuList: [],
      background: {
        background: "",
      },
      codes: [],
    };
  },
  computed: {
    ...mapGetters("common", ["getMenuList"]),
  },
  watch: {
    codes(n) {
      this.$store.commit("common/code1depths", n);
    },
  },
  async mounted() {
    if (process.env.VUE_APP_API === "https://devapi.channeltune.net/api/v1") {
      this.background.background = "#035DBA";
    } else {
      this.background.background = "#ea5959";
    }
    try {
      await this.$store.dispatch("common/MENU_LIST", "SYS21928B009");
      if (this.getMenuList.channeltuneApiResult.errorCode === 200) {
        this.getMenuList.channeltuneApiResult.menu.map(ele => this.codes.push(ele.sysCodeSid));
        this.menuList = this.getMenuList.channeltuneApiResult.menu;
      } else {
        this.alim(this.getMenuList.channeltuneApiResult.errorMessage, this.errorColor);
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("login/LOGOUT");
        await this.$router.push("/login");
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    },
    firstOpen() {
      this.open = !this.open;
      this.$emit("open", this.open);
    },
    lnbSet: debounce(function debounceRead(data) {
      uiCodeCookie(data.sid);
      bus.$emit("uiSet", data.sid);
      const element = document.querySelectorAll(".gnblist");
      element.forEach(ele => {
        ele.classList.remove("active");
        if (ele.classList.contains(data.sid)) {
          ele.classList.add("active");
        }
      });
      this.$router.push(data.link);
    }, 300),
    lnbSet2() {
      const element = document.querySelectorAll(".gnblist");
      element.forEach(ele => {
        ele.classList.remove("active");
      });
      deleteCookie("uiCode");
      this.$router.push("/main");
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1550px;
  position: relative;
  z-index: 2;
  & .d-flex {
    width: 100%;
  }
  & .gnb {
    & ul {
      display: flex;
      & li {
        margin-right: 20px;
        position: relative;
        & a {
          color: #fff;
          font-size: 1.4rem;
          display: block;
          padding: 0 15px;
          position: relative;
          z-index: 10;
          & span {
            position: relative;
            z-index: 2;
          }
          &:hover {
            color: #000;
            &:after {
              content: "";
              position: absolute;
              left: 0;
              top: -10px;
              background: #fff;
              width: 100%;
              height: 45px;
              border-radius: 5px 5px 0 0;
            }
            & a {
              color: #212345;
            }
          }
        }
        &.active {
          & a {
            color: #000;
            &:after {
              content: "";
              position: absolute;
              left: 0;
              top: -10px;
              background: #fff;
              width: 100%;
              height: 45px;
              border-radius: 5px 5px 0 0;
            }
          }
        }
      }
    }
  }
  & .logout {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 30px;
    line-height: 30px;
    margin: 0 20px 0 0;
    & a {
      color: rgba(0, 0, 0, 0.54);
      & .v-icon {
        vertical-align: -4px;
      }
    }
  }
  & .fix-menu {
    background: #fff;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding: 0 25px;
    margin: 0 10px 0 0;
    @include boxshadow(0px, 3px, 6px, 0px, rgba(0, 0, 0, 0.1));
    display: flex;
    & .letter {
      color: #21dce2;
    }
    & .alert {
      color: #ea5959;
    }
    & .time {
      font-family: "Roboto";
      font-weight: 400;
      color: rgb(133, 133, 133);
    }
  }
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 49px;
}
</style>
