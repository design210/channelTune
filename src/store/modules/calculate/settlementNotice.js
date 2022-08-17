import {
  settlementNoticeList,
  settlementNoticeDetail,
  setSettlementNotice,
  modifySettlementNotice,
  deleteSettlementNotice,
  getSettlementNoticeTrance,
  setSettlementTrance,
  cancelSettlementTrance,
  getSettlementNoticeTranceDetail,
  companyPersonUpdate,
  sendMail,
  sendSms,
  SettlementDashboard,
  getSettlementDashboardYear,
  getSettlementDashboardMonth,
} from "@/api/calculate/settlementNotice";

const settlementNotice = {
  namespaced: true,

  state: {
    getSettlementNoticeList: {},
    getSettlementNoticeDetail: {},
    setSettlementNotice: {},
    modifySettlementNotice: {},
    deleteSettlementNotice: {},
    getSettlementNoticeTrance: {},
    setSettlementTrance: {},
    cancelSettlementTrance: {},
    getSettlementNoticeTranceDetail: {},
    companyPersonUpdate: {},
    sendMail: {},
    sendSms: {},
    SettlementDashboard: {},
    getSettlementDashboardYear: {},
    getSettlementDashboardMonth: {},
  },
  getters: {
    getSettlementNoticeList: (state) => {
      return state.getSettlementNoticeList;
    },
    getSettlementNoticeDetail: (state) => {
      return state.getSettlementNoticeDetail;
    },
    setSettlementNotice: (state) => {
      return state.setSettlementNotice;
    },
    modifySettlementNotice: (state) => {
      return state.modifySettlementNotice;
    },
    deleteSettlementNotice: (state) => {
      return state.deleteSettlementNotice;
    },
    getSettlementNoticeTrance: (state) => {
      return state.getSettlementNoticeTrance;
    },
    setSettlementTrance: (state) => {
      return state.setSettlementTrance;
    },
    cancelSettlementTrance: (state) => {
      return state.cancelSettlementTrance;
    },
    getSettlementNoticeTranceDetail: (state) => {
      return state.getSettlementNoticeTranceDetail;
    },
    companyPersonUpdate: (state) => {
      return state.companyPersonUpdate;
    },
    sendMail: (state) => {
      return state.sendMail;
    },
    sendSms: (state) => {
      return state.sendSms;
    },
    SettlementDashboard: (state) => {
      return state.SettlementDashboard;
    },
    getSettlementDashboardYear: (state) => {
      return state.getSettlementDashboardYear;
    },
    getSettlementDashboardMonth: (state) => {
      return state.getSettlementDashboardMonth;
    },
  },
  mutations: {
    getSettlementNoticeList(state, list) {
      state.getSettlementNoticeList = list;
    },
    getSettlementNoticeDetail(state, list) {
      state.getSettlementNoticeDetail = list;
    },
    setSettlementNotice(state, list) {
      state.setSettlementNotice = list;
    },
    modifySettlementNotice(state, list) {
      state.modifySettlementNotice = list;
    },
    deleteSettlementNotice(state, list) {
      state.deleteSettlementNotice = list;
    },
    getSettlementNoticeTrance(state, list) {
      state.getSettlementNoticeTrance = list;
    },
    setSettlementTrance(state, list) {
      state.setSettlementTrance = list;
    },
    cancelSettlementTrance(state, list) {
      state.cancelSettlementTrance = list;
    },
    getSettlementNoticeTranceDetail(state, list) {
      state.getSettlementNoticeTranceDetail = list;
    },
    companyPersonUpdate(state, list) {
      state.companyPersonUpdate = list;
    },
    sendMail(state, list) {
      state.sendMail = list;
    },
    sendSms(state, list) {
      state.sendSms = list;
    },
    SettlementDashboard(state, list) {
      state.SettlementDashboard = list;
    },
    getSettlementDashboardYear(state, list) {
      state.getSettlementDashboardYear = list;
    },
    getSettlementDashboardMonth(state, list) {
      state.getSettlementDashboardMonth = list;
    },
  },
  actions: {
    async GET_SETTLEMENT_NOTICE({ commit }, year) {
      const { data } = await settlementNoticeList(year);
      commit("getSettlementNoticeList", data);
    },
    async GET_SETTLEMENT_NOTICE_DETAIL({ commit }, id) {
      const { data } = await settlementNoticeDetail(id);
      commit("getSettlementNoticeDetail", data);
    },
    async SET_SETTLEMENT_NOTICE({ commit }, datas) {
      const { data } = await setSettlementNotice(datas);
      commit("setSettlementNotice", data);
    },
    async MODIFY_SETTLEMENT_NOTICE({ commit }, datas) {
      const { data } = await modifySettlementNotice(datas);
      commit("modifySettlementNotice", data);
    },
    async DELETE_SETTLEMENT_NOTICE({ commit }, id) {
      const { data } = await deleteSettlementNotice(id);
      commit("deleteSettlementNotice", data);
    },
    async SETTLEMENT_NOTICE_TRANCE({ commit }, datas) {
      const { data } = await getSettlementNoticeTrance(datas);
      commit("getSettlementNoticeTrance", data);
    },
    async SET_SETTLEMENT_TRANCE({ commit }, datas) {
      const { data } = await setSettlementTrance(datas);
      commit("setSettlementTrance", data);
    },
    async CANCEL_SETTLEMENT_TRANCE({ commit }, id) {
      const { data } = await cancelSettlementTrance(id);
      commit("cancelSettlementTrance", data);
    },
    async GET_SETTLEMENT_NOTICE_TRANCE({ commit }, id) {
      const { data } = await getSettlementNoticeTranceDetail(id);
      commit("getSettlementNoticeTranceDetail", data);
    },
    async COMPANY_PERSON_UPDATE({ commit }, id) {
      const { data } = await companyPersonUpdate(id);
      commit("companyPersonUpdate", data);
    },
    async SEND_MAIL({ commit }, datas) {
      const { data } = await sendMail(datas);
      commit("sendMail", data);
    },
    async SEND_SMS({ commit }, datas) {
      const { data } = await sendSms(datas);
      commit("sendSms", data);
    },
    async GET_SETTLEMENT_DASH_BOARD({ commit }) {
      const { data } = await SettlementDashboard();
      commit("SettlementDashboard", data);
    },
    async GET_SETTLEMENT_DASH_BOARD_YEAR({ commit }, year) {
      const { data } = await getSettlementDashboardYear(year.substr(0, 4));
      commit("getSettlementDashboardYear", data);
    },
    async GET_SETTLEMENT_DASH_BOARD_MONTH({ commit }, datas) {
      const { data } = await getSettlementDashboardMonth(datas);
      commit("getSettlementDashboardMonth", data);
    },
  },
};

export default settlementNotice;
