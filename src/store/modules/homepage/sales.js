import { setSalesStatus, getBuyPaymentList, getBuyPaymentAdvertising, getBuyPaymentVideo, getBuyRefund, buyRefund, buyRunStatus, getSalesStatus, setSalesInfoDetail } from "@/api/homepage/sales";
const sales = {
  namespaced: true,
  state: {
    getBuyPaymentList: {},
    getBuyPaymentAdvertising: {},
    getBuyPaymentVideo: {},
    getBuyRefund: {},
    buyRefund: {},
    buyRunStatus: {},
    getSalesStatus: {},
    setSalesStatus: {},
    setSalesInfoDetail: {},
  },
  getters: {
    getBuyPaymentList: state => {
      return state.getBuyPaymentList;
    },
    getBuyPaymentAdvertising: state => {
      return state.getBuyPaymentAdvertising;
    },
    getBuyPaymentVideo: state => {
      return state.getBuyPaymentVideo;
    },
    getBuyRefund: state => {
      return state.getBuyRefund;
    },
    buyRefund: state => {
      return state.buyRefund;
    },
    buyRunStatus: state => {
      return state.buyRunStatus;
    },
    getSalesStatus: state => {
      return state.getSalesStatus;
    },
    setSalesStatus: state => {
      return state.setSalesStatus;
    },
    setSalesInfoDetail: state => {
      return state.setSalesInfoDetail;
    },
  },
  mutations: {
    getBuyPaymentList(state, data) {
      state.getBuyPaymentList = data;
    },
    getBuyPaymentAdvertising(state, data) {
      state.getBuyPaymentAdvertising = data;
    },
    getBuyPaymentVideo(state, data) {
      state.getBuyPaymentVideo = data;
    },
    getBuyRefund(state, data) {
      state.getBuyRefund = data;
    },
    buyRefund(state, data) {
      state.buyRefund = data;
    },
    buyRunStatus(state, data) {
      state.buyRunStatus = data;
    },
    getSalesStatus(state, data) {
      state.getSalesStatus = data;
    },
    setSalesStatus(state, data) {
      state.setSalesStatus = data;
    },
    setSalesInfoDetail(state, data) {
      state.setSalesInfoDetail = data;
    },
  },
  actions: {
    async GET_BUY_PAYMENT_LIST({ commit }, d) {
      const { data } = await getBuyPaymentList(d);
      commit("getBuyPaymentList", data);
    },
    async GET_BUY_PAYMENT_ADVERTISING({ commit }, id) {
      const { data } = await getBuyPaymentAdvertising(id);
      commit("getBuyPaymentAdvertising", data);
    },
    async GET_BUY_PAYMENT_VIDEO({ commit }, id) {
      const { data } = await getBuyPaymentVideo(id);
      commit("getBuyPaymentVideo", data);
    },
    async GET_BUY_REFUND({ commit }, id) {
      const { data } = await getBuyRefund(id);
      commit("getBuyRefund", data);
    },
    async BUY_REFUND({ commit }, d) {
      const { data } = await buyRefund(d);
      commit("buyRefund", data);
    },
    async BUY_RUN_STATUS({ commit }, datas) {
      const { data } = await buyRunStatus(datas);
      commit("buyRunStatus", data);
    },
    async SALES_STATUS({ commit }, id) {
      const { data } = await getSalesStatus(id);
      commit("getSalesStatus", data);
    },
    async SET_SALES_STATUS({ commit }, datas) {
      const { data } = await setSalesStatus(datas);
      commit("setSalesStatus", data);
    },
    async SALES_INFO_DETAIL({ commit }, id) {
      const { data } = await setSalesInfoDetail(id);
      commit("setSalesInfoDetail", data);
    },
  },
};

export default sales;
