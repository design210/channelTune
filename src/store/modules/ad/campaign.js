import {
  getCampaignList,
  getCampaignDetail,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignAdvertisement,
  adCampaignDetail,
  organizeAdvertisementBatch,
  organizeAdvertisementBatchDelete,
  getOrganizeAdvertisementStoreList,
  detailOrganizeAdvertisementStoreList,
  addOrganizeAdvertisementStoreList,
  deleteOrganizeAdvertisementStoreList,
} from "@/api/ad/campaign";

const campaign = {
  namespaced: true,
  state: {
    getCampaignList: {},
    getCampaignDetail: {},
    addCampaign: {},
    updateCampaign: {},
    deleteCampaign: {},
    getCampaignAdvertisement: {},
    adCampaignDetail: {},
    organizeAdvertisementBatch: {},
    organizeAdvertisementBatchDelete: {},
    getOrganizeAdvertisementStoreList: {},
    detailOrganizeAdvertisementStoreList: {},
    addOrganizeAdvertisementStoreList: {},
    deleteOrganizeAdvertisementStoreList: {},
  },
  getters: {
    getCampaignList: state => {
      return state.getCampaignList;
    },
    getCampaignDetail: state => {
      return state.getCampaignDetail;
    },
    addCampaign: state => {
      return state.addCampaign;
    },
    updateCampaign: state => {
      return state.updateCampaign;
    },
    deleteCampaign: state => {
      return state.deleteCampaign;
    },
    getCampaignAdvertisement: state => {
      return state.getCampaignAdvertisement;
    },
    adCampaignDetail: state => {
      return state.adCampaignDetail;
    },
    organizeAdvertisementBatch: state => {
      return state.organizeAdvertisementBatch;
    },
    organizeAdvertisementBatchDelete: state => {
      return state.organizeAdvertisementBatchDelete;
    },
    getOrganizeAdvertisementStoreList: state => {
      return state.getOrganizeAdvertisementStoreList;
    },
    detailOrganizeAdvertisementStoreList: state => {
      return state.detailOrganizeAdvertisementStoreList;
    },
    addOrganizeAdvertisementStoreList: state => {
      return state.addOrganizeAdvertisementStoreList;
    },
    deleteOrganizeAdvertisementStoreList: state => {
      return state.deleteOrganizeAdvertisementStoreList;
    },
  },
  mutations: {
    getCampaignList(state, result) {
      state.getCampaignList = result;
    },
    getCampaignDetail(state, result) {
      state.getCampaignDetail = result;
    },
    addCampaign(state, result) {
      state.addCampaign = result;
    },
    updateCampaign(state, result) {
      state.updateCampaign = result;
    },
    deleteCampaign(state, result) {
      state.deleteCampaign = result;
    },
    getCampaignAdvertisement(state, result) {
      state.getCampaignAdvertisement = result;
    },
    adCampaignDetail(state, result) {
      state.adCampaignDetail = result;
    },
    organizeAdvertisementBatch(state, result) {
      state.organizeAdvertisementBatch = result;
    },
    organizeAdvertisementBatchDelete(state, result) {
      state.organizeAdvertisementBatchDelete = result;
    },
    getOrganizeAdvertisementStoreList(state, result) {
      state.getOrganizeAdvertisementStoreList = result;
    },
    detailOrganizeAdvertisementStoreList(state, result) {
      state.detailOrganizeAdvertisementStoreList = result;
    },
    addOrganizeAdvertisementStoreList(state, result) {
      state.addOrganizeAdvertisementStoreList = result;
    },
    deleteOrganizeAdvertisementStoreList(state, result) {
      state.deleteOrganizeAdvertisementStoreList = result;
    },
  },
  actions: {
    async GET_CAMPAIGN_LIST({ commit }, datas) {
      const { data } = await getCampaignList(datas);
      commit("getCampaignList", data);
    },
    async GET_CAMPAIGN_LIST_DETAIL({ commit }, id) {
      const { data } = await getCampaignDetail(id);
      commit("getCampaignDetail", data);
    },
    async ADD_CAMPAIGN({ commit }, datas) {
      const { data } = await addCampaign(datas);
      commit("addCampaign", data);
    },
    async UPDATE_CAMPAIGN({ commit }, datas) {
      const { data } = await updateCampaign(datas);
      commit("updateCampaign", data);
    },
    async DELETE_CAMPAIGN({ commit }, id) {
      const { data } = await deleteCampaign(id);
      commit("deleteCampaign", data);
    },

    async GET_CAMPAIGN_ADVERTISEMENT({ commit }, datas) {
      const { data } = await getCampaignAdvertisement(datas);
      commit("getCampaignAdvertisement", data);
    },
    async AD_CAMPAIGN_DETAIL({ commit }, id) {
      const { data } = await adCampaignDetail(id);
      commit("adCampaignDetail", data);
    },

    async ORGANIZE_ADVERTISEMENT_BATCH({ commit }, datas) {
      const { data } = await organizeAdvertisementBatch(datas);
      commit("organizeAdvertisementBatch", data);
    },
    async ORGANIZE_ADVERTISEMENT_BATCH_DELETE({ commit }, arr) {
      const { data } = await organizeAdvertisementBatchDelete(arr);
      commit("organizeAdvertisementBatchDelete", data);
    },
    async GET_ORGANIZE_ADVERTISEMENT_STORE_LIST({ commit }, datas) {
      const { data } = await getOrganizeAdvertisementStoreList(datas);
      commit("getOrganizeAdvertisementStoreList", data);
    },
    async DETAIL_ORGANIZE_ADVERTISEMENT_STORE_LIST({ commit }, datas) {
      const { data } = await detailOrganizeAdvertisementStoreList(datas);
      commit("detailOrganizeAdvertisementStoreList", data);
    },
    async ADD_ORGANIZE_ADVERTISEMENT_STORE_LIST({ commit }, datas) {
      const { data } = await addOrganizeAdvertisementStoreList(datas);
      commit("addOrganizeAdvertisementStoreList", data);
    },
    async DELETE_ORGANIZE_ADVERTISEMENT_STORE_LIST({ commit }, datas) {
      const { data } = await deleteOrganizeAdvertisementStoreList(datas);
      commit("deleteOrganizeAdvertisementStoreList", data);
    },
  },
};

export default campaign;
