import { getManagerList, getManagerDetail, setManager, managerModify, managerDelete } from "@/api/operation/companyPerson";
const person = {
  namespaced: true,
  state: {
    getManagerList: {},
    getManagerDetail: {},
    managerDeleteResult: {},
    setManagerResult: {},
    managerModifyResult: {},
  },
  getters: {
    getManagerList: state => {
      return state.getManagerList;
    },
    getManagerDetail: state => {
      return state.getManagerDetail;
    },
    managerDeleteResult: state => {
      return state.managerDeleteResult;
    },
    setManagerResult: state => {
      return state.setManagerResult;
    },
    managerModifyResult: state => {
      return state.managerModifyResult;
    },
  },
  mutations: {
    getManagerList(state, managerList) {
      state.getManagerList = managerList;
    },
    getManagerDetail(state, managerData) {
      state.getManagerDetail = managerData;
    },
    managerDeleteResult(state, result) {
      state.managerDeleteResult = result;
    },
    setManagerResult(state, result) {
      state.setManagerResult = result;
    },
    managerModifyResult(state, result) {
      state.managerModifyResult = result;
    },
  },
  actions: {
    async MANAGER_LIST({ commit }, managerData) {
      const { data } = await getManagerList(managerData);
      commit("getManagerList", data);
    },
    async MANAGER_DETAIL({ commit }, managerData) {
      const { data } = await getManagerDetail(managerData);
      commit("getManagerDetail", data);
    },
    async MANAGER_DEL({ commit }, id) {
      const { data } = await managerDelete(id);
      commit("managerDeleteResult", data);
    },
    async MANAGER_ADD({ commit }, managerData) {
      const { data } = await setManager(managerData);
      commit("setManagerResult", data);
    },
    async MANAGER_MODIFY({ commit }, companyData) {
      const { data } = await managerModify(companyData);
      commit("managerModifyResult", data);
    },
  },
};

export default person;
