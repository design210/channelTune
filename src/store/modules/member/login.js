import { loginUser, loginout } from "@/api/member/login";
import { saveAccessTokenCookie, adminUserSidCookie, adminUserNameCookie, deleteCookie } from "@/utils/cookie";
const member = {
  namespaced: true,
  state: {
    getLoginInfo: {},
  },
  getters: {
    getLoginInfo: state => {
      return state.getLoginInfo;
    },
  },
  mutations: {
    getLoginInfo(state, userInfo) {
      state.getLoginInfo = userInfo;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      const result = data.channeltuneApiResult.login;
      if (data.channeltuneApiResult.errorCode == 200) {
        saveAccessTokenCookie(result.access_token);
        adminUserSidCookie(result.current_user.adminUserSid);
        adminUserNameCookie(result.current_user.adminUserName);
      }
      commit("getLoginInfo", data);
    },
    async LOGOUT() {
      await loginout();
      deleteCookie("accessToken");
      deleteCookie("adminUserSid");
      deleteCookie("adminUserName");
    },
  },
};

export default member;
