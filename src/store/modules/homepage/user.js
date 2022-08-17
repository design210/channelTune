import { getUserList, getUserDetail, userAdd, userDelete, userModify } from "@/api/homepage/user";
const contact = {
  namespaced: true,
  state: {
    getUserList: {},
    getUserDetail: {},
    userDeleteResult: {},
    userAdd: {},
    userModify: {},
  },
  getters: {
    getUserList: state => {
      return state.getUserList;
    },
    getUserDetail: state => {
      return state.getUserDetail;
    },
    userDeleteResult: state => {
      return state.userDeleteResult;
    },
    userAdd: state => {
      return state.userAdd;
    },
    userModify: state => {
      return state.userModify;
    },
  },
  mutations: {
    getUserList(state, list) {
      state.getUserList = list;
    },
    getUserDetail(state, detail) {
      state.getUserDetail = detail;
    },
    userDeleteResult(state, result) {
      state.userDeleteResult = result;
    },
    userAdd(state, result) {
      state.userAdd = result;
    },
    userModify(state, result) {
      state.userModify = result;
    },
  },
  actions: {
    async GET_USER_LIST({ commit }, datas) {
      const { data } = await getUserList(datas);
      commit("getUserList", data);
    },
    async GET_USER_DETAIL({ commit }, id) {
      const { data } = await getUserDetail(id);
      commit("getUserDetail", data);
    },
    async USER_DELETE_RESULT({ commit }, id) {
      const { data } = await userDelete(id);
      commit("userDeleteResult", data);
    },
    async USER_ADD({ commit }, datas) {
      const { data } = await userAdd(datas);
      commit("userAdd", data);
    },
    async USER_MODIFY({ commit }, datas) {
      const { data } = await userModify(datas);
      commit("userModify", data);
    },
  },
};

export default contact;
