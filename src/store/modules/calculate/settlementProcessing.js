import {
  getSettlementList,
  getSettlementDetail,
  addSettlement,
  updateSettlement,
  deleteSettlement,
  postSettlementStore,
  getExcelData,
  getSettlementData,
  getSettlementDeposit,
  settlementDepositDetail,
  postSettlementDeposit,
  settlementUpdateCheck,
} from "@/api/calculate/settlementProcessing";

const settlementProcessing = {
  namespaced: true,

  state: {
    getSettlementList: {},
    getSettlementDetail: {},
    addSettlement: {},
    updateSettlement: {},
    deleteSettlement: {},
    getExcelData: {},
    postSettlementStore: {},
    getSettlementData: {},
    getSettlementDeposit: {},
    postSettlementDeposit: {},
    settlementDepositDetail: {},
    settlementUpdateCheck: {},
  },

  getters: {
    getSettlementList: state => {
      return state.getSettlementList;
    },
    getSettlementDetail: state => {
      return state.getSettlementDetail;
    },
    addSettlement: state => {
      return state.addSettlement;
    },
    updateSettlement: state => {
      return state.updateSettlement;
    },
    getExcelData: state => {
      return state.getExcelData;
    },
    deleteSettlement: state => {
      return state.deleteSettlement;
    },
    postSettlementStore: state => {
      return state.postSettlementStore;
    },
    getSettlementData: state => {
      return state.getSettlementData;
    },
    getSettlementDeposit: state => {
      return state.getSettlementDeposit;
    },
    postSettlementDeposit: state => {
      return state.postSettlementDeposit;
    },
    settlementDepositDetail: state => {
      return state.settlementDepositDetail;
    },
    settlementUpdateCheck: state => {
      return state.settlementUpdateCheck;
    },
  },

  mutations: {
    getSettlementList(state, list) {
      state.getSettlementList = list;
    },
    getSettlementDetail(state, list) {
      state.getSettlementDetail = list;
    },
    addSettlement(state, list) {
      state.addSettlement = list;
    },
    updateSettlement(state, list) {
      state.updateSettlement = list;
    },
    getExcelData(state, list) {
      state.getExcelData = list;
    },
    deleteSettlement(state, list) {
      state.deleteSettlement = list;
    },
    postSettlementStore(state, list) {
      state.postSettlementStore = list;
    },
    getSettlementData(state, list) {
      state.getSettlementData = list;
    },
    getSettlementDeposit(state, list) {
      state.getSettlementDeposit = list;
    },
    postSettlementDeposit(state, list) {
      state.postSettlementDeposit = list;
    },
    settlementDepositDetail(state, list) {
      state.settlementDepositDetail = list;
    },
    settlementUpdateCheck(state, list) {
      state.settlementUpdateCheck = list;
    },
  },

  actions: {
    async GET_SETTLEMENT_PROCESSING({ commit }, datas) {
      const { data } = await getSettlementList(datas);
      commit("getSettlementList", data);
    },
    async GET_SETTLEMENT_PROCESSING_DETAIL({ commit }, id) {
      const { data } = await getSettlementDetail(id);
      commit("getSettlementDetail", data);
    },
    async ADD_SETTLEMENT_PROCESSING({ commit }, datas) {
      const { data } = await addSettlement(datas);
      commit("addSettlement", data);
    },
    async GET_EXCEL_DATA({ commit }, id) {
      const { data } = await getExcelData(id);
      commit("getExcelData", data);
    },
    async UPDATE_SETTLEMENT_PROCESSING({ commit }, datas) {
      const { data } = await updateSettlement(datas);
      commit("updateSettlement", data);
    },
    async DELETE_SETTLEMENT_PROCESSING({ commit }, id) {
      const { data } = await deleteSettlement(id);
      commit("deleteSettlement", data);
    },
    async POST_SETTLEMENT_STORE({ commit }, datas) {
      const { data } = await postSettlementStore(datas);
      commit("postSettlementStore", data);
    },
    async GET_SETTLEMENT_DATA({ commit }, datas) {
      const { data } = await getSettlementData(datas);
      commit("getSettlementData", data);
    },
    async GET_SETTLEMENT_DEPOSIT({ commit }, datas) {
      const { data } = await getSettlementDeposit(datas);
      commit("getSettlementDeposit", data);
    },
    async POST_SETTLEMENT_DEPOSIT({ commit }, datas) {
      const { data } = await postSettlementDeposit(datas);
      commit("postSettlementDeposit", data);
    },
    async SETTLEMENT_DEPOSIT_DETAIL({ commit }, datas) {
      const { data } = await settlementDepositDetail(datas);
      commit("settlementDepositDetail", data);
    },
    async SETTLEMENT_UPDATE_CHECK({ commit }, datas) {
      const { data } = await settlementUpdateCheck(datas);
      commit("settlementUpdateCheck", data);
    },
  },
};

export default settlementProcessing;
