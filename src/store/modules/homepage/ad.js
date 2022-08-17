import {
  getAdvertiserList,
  getAdvertiserDetail,
  advertiserAdd,
  advertiserUpdate,
  advertiserDelete,
  getContractUserAdvertiserLinkList,
  getContractUserAdvertiserLinkDetail,
  getContractUserAdvertiserLinkHistory,
  getContractUserAdvertiserLinkAdd,
  getContractUserAdvertiserLinkUpdate,
  getContractUserAdvertiserLinkDelete,
} from "@/api/homepage/ad";
const ad = {
  namespaced: true,
  state: {
    getAdvertiserList: {},
    getAdvertiserDetail: {},
    advertiserAdd: {},
    advertiserUpdate: {},
    advertiserDelete: {},

    getContractUserAdvertiserLinkList: {},
    getContractUserAdvertiserLinkDetail: {},
    getContractUserAdvertiserLinkHistory: {},
    getContractUserAdvertiserLinkAdd: {},
    getContractUserAdvertiserLinkUpdate: {},
    getContractUserAdvertiserLinkDelete: {},
  },
  getters: {
    getAdvertiserList: state => {
      return state.getAdvertiserList;
    },
    getAdvertiserDetail: state => {
      return state.getAdvertiserDetail;
    },
    advertiserAdd: state => {
      return state.advertiserAdd;
    },
    advertiserUpdate: state => {
      return state.advertiserUpdate;
    },
    advertiserDelete: state => {
      return state.advertiserDelete;
    },

    getContractUserAdvertiserLinkList: state => {
      return state.getContractUserAdvertiserLinkList;
    },
    getContractUserAdvertiserLinkDetail: state => {
      return state.getContractUserAdvertiserLinkDetail;
    },
    getContractUserAdvertiserLinkHistory: state => {
      return state.getContractUserAdvertiserLinkHistory;
    },
    getContractUserAdvertiserLinkAdd: state => {
      return state.getContractUserAdvertiserLinkAdd;
    },
    getContractUserAdvertiserLinkUpdate: state => {
      return state.getContractUserAdvertiserLinkUpdate;
    },
    getContractUserAdvertiserLinkDelete: state => {
      return state.getContractUserAdvertiserLinkDelete;
    },
  },
  mutations: {
    getAdvertiserList(state, list) {
      state.getAdvertiserList = list;
    },
    getAdvertiserDetail(state, list) {
      state.getAdvertiserDetail = list;
    },
    advertiserAdd(state, list) {
      state.advertiserAdd = list;
    },
    advertiserUpdate(state, list) {
      state.advertiserUpdate = list;
    },
    advertiserDelete(state, list) {
      state.advertiserDelete = list;
    },

    getContractUserAdvertiserLinkList(state, list) {
      state.getContractUserAdvertiserLinkList = list;
    },
    getContractUserAdvertiserLinkDetail(state, list) {
      state.getContractUserAdvertiserLinkDetail = list;
    },
    getContractUserAdvertiserLinkHistory(state, list) {
      state.getContractUserAdvertiserLinkHistory = list;
    },
    getContractUserAdvertiserLinkAdd(state, list) {
      state.getContractUserAdvertiserLinkAdd = list;
    },
    getContractUserAdvertiserLinkUpdate(state, list) {
      state.getContractUserAdvertiserLinkUpdate = list;
    },
    getContractUserAdvertiserLinkDelete(state, list) {
      state.getContractUserAdvertiserLinkDelete = list;
    },
  },
  actions: {
    async GET_ADVERTISER_LIST({ commit }, datas) {
      const { data } = await getAdvertiserList(datas);
      commit("getAdvertiserList", data);
    },
    async GET_ADVERTISER_DETAIL({ commit }, id) {
      const { data } = await getAdvertiserDetail(id);
      commit("getAdvertiserDetail", data);
    },
    async ADVERTISER_ADD({ commit }, datas) {
      const { data } = await advertiserAdd(datas);
      commit("advertiserAdd", data);
    },
    async ADVERTISER_UPDATE({ commit }, datas) {
      const { data } = await advertiserUpdate(datas);
      commit("advertiserUpdate", data);
    },
    async ADVERTISER_DELETE({ commit }, id) {
      const { data } = await advertiserDelete(id);
      commit("advertiserDelete", data);
    },

    async GET_CONTRACT_USER_ADVERTISER_LINK_LIST({ commit }, id) {
      const { data } = await getContractUserAdvertiserLinkList(id);
      commit("getContractUserAdvertiserLinkList", data);
    },
    async GET_CONTRACT_USER_ADVERTISER_LINK_DETAIL({ commit }, id) {
      const { data } = await getContractUserAdvertiserLinkDetail(id);
      commit("getContractUserAdvertiserLinkDetail", data);
    },
    async GET_CONTRACT_USER_ADVERTISER_LINK_HISTORY({ commit }, id) {
      const { data } = await getContractUserAdvertiserLinkHistory(id);
      commit("getContractUserAdvertiserLinkHistory", data);
    },
    async GET_CONTRACT_USER_ADVERTISER_LINK_ADD({ commit }, datas) {
      const { data } = await getContractUserAdvertiserLinkAdd(datas);
      commit("getContractUserAdvertiserLinkAdd", data);
    },
    async GET_CONTRACT_USER_ADVERTISER_LINK_UPDATE({ commit }, datas) {
      const { data } = await getContractUserAdvertiserLinkUpdate(datas);
      commit("getContractUserAdvertiserLinkUpdate", data);
    },
    async GET_CONTRACT_USER_ADVERTISER_LINK_DELETE({ commit }, id) {
      const { data } = await getContractUserAdvertiserLinkDelete(id);
      commit("getContractUserAdvertiserLinkDelete", data);
    },
  },
};

export default ad;
