import { getUserList, getUserDetail, setUser, userDelete, userModify } from "@/api/system/user";
const member = {
  namespaced: true,
  state: {
    getUserList: {},
    getUserDetail: {},
    userModify: {},
    userAdd: {},
    userDel: {},
  },
  getters: {
    getUserList: state => {
      return state.getUserList;
    },
    getUserDetail: state => {
      return state.getUserDetail;
    },
    userModify: state => {
      return state.userModify;
    },
    userAdd: state => {
      return state.userAdd;
    },
    userDel: state => {
      return state.userDelete;
    },
  },
  mutations: {
    getUserList(state, userList) {
      state.getUserList = userList;
    },
    getUserDetail(state, userData) {
      state.getUserDetail = userData;
    },
    userModify(state, result) {
      state.userModify = result;
    },
    userAdd(state, result) {
      state.userAdd = result;
    },
    userDel(state, result) {
      state.userDel = result;
    },
  },
  actions: {
    async USER_LIST({ commit }, listData) {
      const { data } = await getUserList(listData);
      commit("getUserList", data);
    },
    async USER_DETAIL({ commit }, listData) {
      const { data } = await getUserDetail(listData);
      commit("getUserDetail", data);
    },
    async USER_ADD({ commit }, userData) {
      const { data } = await setUser(userData);
      commit("userAdd", data);
    },
    async USER_DEL({ commit }, id) {
      const { data } = await userDelete(id);
      commit("userDel", data);
    },
    async USER_MODIFY({ commit }, userData) {
      const { data } = await userModify(userData);
      commit("userModify", data);
    },
  },
};

export default member;
