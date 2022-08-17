import {
  getCompanyList,
  getCompanyDetail,
  setPower,
  setAllPower,
  powerDelete,
  powerAdminDelete,
  getAdminList,
  getAdminDetail,
  dashBoard,
  getNumOfMonthRegister,
  getChildSysCode,
} from "@/api/system/menu";
const menu = {
  namespaced: true,
  state: {
    getCompanyList: {},
    getCompanyDetail: {},
    getAdminList: {},
    getAdminDetail: {},
    powerAdminDeleteResult: {},
    setPowerResult: {},
    setAllPowerResult: {},
    powerDeleteResult: {},
    dashBoard: {},
    getNumOfMonthRegister: {},
    getChildSysCode: {},
  },
  getters: {
    getCompanyList: (state) => {
      return state.getCompanyList;
    },
    getCompanyDetail: (state) => {
      return state.getCompanyDetail;
    },
    getAdminList: (state) => {
      return state.getAdminList;
    },
    getAdminDetail: (state) => {
      return state.getAdminDetail;
    },
    powerAdminDeleteResult: (state) => {
      return state.powerAdminDeleteResult;
    },
    setPowerResult: (state) => {
      return state.setPowerResult;
    },
    setAllPowerResult: (state) => {
      return state.setAllPowerResult;
    },
    powerDeleteResult: (state) => {
      return state.powerDeleteResult;
    },
    dashBoard: (state) => {
      return state.dashBoard;
    },
    getNumOfMonthRegister: (state) => {
      return state.getNumOfMonthRegister;
    },
    getChildSysCode: (state) => {
      return state.getChildSysCode;
    },
  },
  mutations: {
    getCompanyList(state, companyList) {
      state.getCompanyList = companyList;
    },
    getCompanyDetail(state, companyData) {
      state.getCompanyDetail = companyData;
    },
    getAdminList(state, adminList) {
      state.getAdminList = adminList;
    },
    getAdminDetail(state, adminData) {
      state.getAdminDetail = adminData;
    },
    powerAdminDeleteResult(state, result) {
      state.powerAdminDeleteResult = result;
    },
    setPowerResult(state, result) {
      state.setPowerResult = result;
    },
    setAllPowerResult(state, result) {
      state.setAllPowerResult = result;
    },
    powerDeleteResult(state, result) {
      state.powerDeleteResult = result;
    },
    dashBoard(state, result) {
      state.dashBoard = result;
    },
    getNumOfMonthRegister(state, result) {
      state.getNumOfMonthRegister = result;
    },
    getChildSysCode(state, result) {
      state.getChildSysCode = result;
    },
  },
  actions: {
    async COMPANY_LIST({ commit }, datas) {
      const { data } = await getCompanyList(datas);
      commit("getCompanyList", data);
    },
    async COMPANY_DETAIL({ commit }, listData) {
      const { data } = await getCompanyDetail(listData);
      commit("getCompanyDetail", data);
    },
    async ADMIN_LIST({ commit }, datas) {
      const { data } = await getAdminList(datas);
      commit("getAdminList", data);
    },
    async ADMIN_DETAIL({ commit }, listData) {
      const { data } = await getAdminDetail(listData);
      commit("getAdminDetail", data);
    },
    async POWER_ADMIN_DEL({ commit }, id) {
      const { data } = await powerAdminDelete(id);
      commit("powerAdminDeleteResult", data);
    },
    async POWER_SET({ commit }, datas) {
      const { data } = await setPower(datas);
      commit("setPowerResult", data);
    },
    async POWER_ALLSET({ commit }, datas) {
      const { data } = await setAllPower(datas);
      commit("setAllPowerResult", data);
    },
    async POWER_DEL({ commit }, id) {
      const { data } = await powerDelete(id);
      commit("powerDeleteResult", data);
    },
    async DASHBOARD({ commit }) {
      const { data } = await dashBoard();
      commit("dashBoard", data);
    },
    async GET_NUMBER_OF_REGISTER({ commit }, datas) {
      const { data } = await getNumOfMonthRegister(datas);
      commit("getNumOfMonthRegister", data);
    },
    async GET_CHILD_SYS_CODE({ commit }, id) {
      const { data } = await getChildSysCode(id);

      commit("getChildSysCode", data);
    },
  },
};

export default menu;
