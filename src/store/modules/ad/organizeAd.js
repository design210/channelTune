import {
  getOrganizeAdStoreList,
  getOrganizeAdList,
  getOrganizeAdDetail,
  organizeAdAdd,
  organizeAdDelete,
  organizeAdUpdate,
  getOrganizeAdBuyAdProductList,
  getOrganizeAdBuyAdProductStoreList,
  organizeAdBuyAdProductStoreAdd,
  organizeAdBuyAdProductStoreDelete,
  organizeAdChangeSort,
  OrganizeAdvertisementSequence,
} from "@/api/ad/organizeAd";
const organizeAd = {
  namespaced: true,
  state: {
    getOrganizeAdStoreList: {},
    getOrganizeAdList: {},
    getOrganizeAdDetail: {},
    organizeAdAdd: {},
    organizeAdDelete: {},
    organizeAdUpdate: {},

    getOrganizeAdBuyAdProductList: {},
    getOrganizeAdBuyAdProductStoreList: {},
    organizeAdBuyAdProductStoreAdd: {},
    organizeAdBuyAdProductStoreDelete: {},
    organizeAdChangeSort: {},
    OrganizeAdvertisementSequence: {},
  },
  getters: {
    getOrganizeAdStoreList: (state) => {
      return state.getOrganizeAdStoreList;
    },
    getOrganizeAdList: (state) => {
      return state.getOrganizeAdList;
    },
    getOrganizeAdDetail: (state) => {
      return state.getOrganizeAdDetail;
    },
    organizeAdAdd: (state) => {
      return state.organizeAdAdd;
    },
    organizeAdDelete: (state) => {
      return state.organizeAdDelete;
    },
    organizeAdUpdate: (state) => {
      return state.organizeAdUpdate;
    },

    getOrganizeAdBuyAdProductList: (state) => {
      return state.getOrganizeAdBuyAdProductList;
    },
    getOrganizeAdBuyAdProductStoreList: (state) => {
      return state.getOrganizeAdBuyAdProductStoreList;
    },
    organizeAdBuyAdProductStoreAdd: (state) => {
      return state.organizeAdBuyAdProductStoreAdd;
    },
    organizeAdBuyAdProductStoreDelete: (state) => {
      return state.organizeAdBuyAdProductStoreDelete;
    },
    organizeAdChangeSort: (state) => {
      return state.organizeAdChangeSort;
    },
    OrganizeAdvertisementSequence: (state) => {
      return state.OrganizeAdvertisementSequence;
    },
  },
  mutations: {
    getOrganizeAdStoreList(state, list) {
      state.getOrganizeAdStoreList = list;
    },
    getOrganizeAdList(state, list) {
      state.getOrganizeAdList = list;
    },
    getOrganizeAdDetail(state, list) {
      state.getOrganizeAdDetail = list;
    },
    organizeAdAdd(state, list) {
      state.organizeAdAdd = list;
    },
    organizeAdDelete(state, list) {
      state.organizeAdDelete = list;
    },
    organizeAdUpdate(state, list) {
      state.organizeAdUpdate = list;
    },
    organizeAdChangeSort(state, list) {
      state.organizeAdChangeSort = list;
    },

    getOrganizeAdBuyAdProductList(state, list) {
      state.getOrganizeAdBuyAdProductList = list;
    },
    getOrganizeAdBuyAdProductStoreList(state, list) {
      state.getOrganizeAdBuyAdProductStoreList = list;
    },
    organizeAdBuyAdProductStoreAdd(state, list) {
      state.organizeAdBuyAdProductStoreAdd = list;
    },
    organizeAdBuyAdProductStoreDelete(state, list) {
      state.organizeAdBuyAdProductStoreDelete = list;
    },
    OrganizeAdvertisementSequence(state, list) {
      state.OrganizeAdvertisementSequence = list;
    },
  },
  actions: {
    async GET_ORGANIZE_AD_STORE_LIST({ commit }, datas) {
      const { data } = await getOrganizeAdStoreList(datas);
      commit("getOrganizeAdStoreList", data);
    },
    async GET_ORGANIZE_AD_LIST({ commit }, datas) {
      const { data } = await getOrganizeAdList(datas);
      commit("getOrganizeAdList", data);
    },
    async GET_ORGANIZE_AD_DETAIL({ commit }, id) {
      const { data } = await getOrganizeAdDetail(id);
      commit("getOrganizeAdDetail", data);
    },
    async ORGANIZE_AD_UPDATE({ commit }, datas) {
      const { data } = await organizeAdUpdate(datas);
      commit("organizeAdUpdate", data);
    },
    async ORGANIZE_AD_ADD({ commit }, datas) {
      const { data } = await organizeAdAdd(datas);
      commit("organizeAdAdd", data);
    },
    async ORGANIZE_AD_DELETE({ commit }, id) {
      const { data } = await organizeAdDelete(id);
      commit("organizeAdDelete", data);
    },
    async ORGANIZE_AD_CHANGE_SORT({ commit }, datas) {
      const { data } = await organizeAdChangeSort(datas);
      commit("organizeAdChangeSort", data);
    },

    async GET_ORGANIZE_AD_BUY_AD_PRODUCT_LIST({ commit }, datas) {
      const { data } = await getOrganizeAdBuyAdProductList(datas);
      commit("getOrganizeAdBuyAdProductList", data);
    },
    async GET_ORGANIZE_AD_BUY_AD_PRODUCT_STORE_LIST({ commit }, datas) {
      const { data } = await getOrganizeAdBuyAdProductStoreList(datas);
      commit("getOrganizeAdBuyAdProductStoreList", data);
    },
    async ORGANIZE_AD_BUY_AD_PRODUCT_STORE_INSERT({ commit }, datas) {
      const { data } = await organizeAdBuyAdProductStoreAdd(datas);
      commit("organizeAdBuyAdProductStoreAdd", data);
    },
    async ORGANIZE_AD_BUY_AD_PRODUCT_STORE_DELETE({ commit }, datas) {
      const { data } = await organizeAdBuyAdProductStoreDelete(datas);
      commit("organizeAdBuyAdProductStoreDelete", data);
    },
    async ORGANIZE_AD_SEQUENCE({ commit }, datas) {
      const { data } = await OrganizeAdvertisementSequence(datas);
      commit("OrganizeAdvertisementSequence", data);
    },
  },
};

export default organizeAd;
