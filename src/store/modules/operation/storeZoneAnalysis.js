import {
  getStoreZoneAnalysisList,
  getStoreZoneAnalysisDetail,
  getStoreZoneAnalysisAdd,
  getStoreZoneAnalysisUpdate,
  getStoreZoneAnalysisDelete,
  getStoreZoneAnalysisStoreList,
  searchAnalysisData,
} from "@/api/operation/storeZoneAnalysis";
const StoreZoneAnalysis = {
  namespaced: true,
  state: {
    getStoreZoneAnalysisList: {},
    getStoreZoneAnalysisStoreList: {},
    searchAnalysisData: {},
    getStoreZoneAnalysisDetail: {},
    getStoreZoneAnalysisAdd: {},
    getStoreZoneAnalysisUpdate: {},
    getStoreZoneAnalysisDelete: {},
  },
  getters: {
    getStoreZoneAnalysisList: state => {
      return state.getStoreZoneAnalysisList;
    },
    getStoreZoneAnalysisStoreList: state => {
      return state.getStoreZoneAnalysisStoreList;
    },
    searchAnalysisData: state => {
      return state.searchAnalysisData;
    },
    getStoreZoneAnalysisDetail: state => {
      return state.getStoreZoneAnalysisDetail;
    },
    getStoreZoneAnalysisAdd: state => {
      return state.getStoreZoneAnalysisAdd;
    },
    getStoreZoneAnalysisUpdate: state => {
      return state.getStoreZoneAnalysisUpdate;
    },
    getStoreZoneAnalysisDelete: state => {
      return state.getStoreZoneAnalysisDelete;
    },
  },
  mutations: {
    getStoreZoneAnalysisList(state, data) {
      state.getStoreZoneAnalysisList = data;
    },
    getStoreZoneAnalysisStoreList(state, data) {
      state.getStoreZoneAnalysisStoreList = data;
    },
    searchAnalysisData(state, data) {
      state.searchAnalysisData = data;
    },
    getStoreZoneAnalysisDetail(state, data) {
      state.getStoreZoneAnalysisDetail = data;
    },
    getStoreZoneAnalysisAdd(state, data) {
      state.getStoreZoneAnalysisAdd = data;
    },
    getStoreZoneAnalysisUpdate(state, data) {
      state.getStoreZoneAnalysisUpdate = data;
    },
    getStoreZoneAnalysisDelete(state, data) {
      state.getStoreZoneAnalysisDelete = data;
    },
  },
  actions: {
    async STOREZONEANALYSIS_LIST({ commit }, id) {
      const { data } = await getStoreZoneAnalysisList(id);
      commit("getStoreZoneAnalysisList", data);
    },
    async STOREZONEANALYSIS_STORE_LIST({ commit }, datas) {
      const { data } = await getStoreZoneAnalysisStoreList(datas);
      commit("getStoreZoneAnalysisStoreList", data);
    },
    async SEARCH_ANALYSIS_DATA({ commit }, datas) {
      const { data } = await searchAnalysisData(datas);
      commit("searchAnalysisData", data);
    },

    async STOREZONEANALYSIS_DETAIL({ commit }, id) {
      const { data } = await getStoreZoneAnalysisDetail(id);
      commit("getStoreZoneAnalysisDetail", data);
    },
    async STOREZONEANALYSIS_ADD({ commit }, datas) {
      const { data } = await getStoreZoneAnalysisAdd(datas);
      commit("getStoreZoneAnalysisAdd", data);
    },
    async STOREZONEANALYSIS_UPDATE({ commit }, datas) {
      const { data } = await getStoreZoneAnalysisUpdate(datas);
      commit("getStoreZoneAnalysisUpdate", data);
    },
    async STOREZONEANALYSIS_DELETE({ commit }, id) {
      const { data } = await getStoreZoneAnalysisDelete(id);
      commit("getStoreZoneAnalysisDelete", data);
    },
  },
};

export default StoreZoneAnalysis;
