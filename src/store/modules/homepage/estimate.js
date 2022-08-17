import { getEstimateList, getEstimateDetail, estimateAdd, estimateModify, estimateDelete } from "@/api/homepage/estimate";
const estimate = {
  namespaced: true,
  state: {
    getEstimateList: {},
    getEstimateDetail: {},
    estimateAdd: {},
    estimateModify: {},
    estimateDelete: {},
  },
  getters: {
    getEstimateList: state => {
      return state.getEstimateList;
    },
    getEstimateDetail: state => {
      return state.getEstimateDetail;
    },
    estimateAdd: state => {
      return state.estimateAdd;
    },
    estimateModify: state => {
      return state.estimateModify;
    },
    estimateDelete: state => {
      return state.estimateDelete;
    },
  },
  mutations: {
    getEstimateList(state, data) {
      state.getEstimateList = data;
    },
    getEstimateDetail(state, data) {
      state.getEstimateDetail = data;
    },
    estimateAdd(state, data) {
      state.estimateAdd = data;
    },
    estimateModify(state, data) {
      state.estimateModify = data;
    },
    estimateDelete(state, data) {
      state.estimateDelete = data;
    },
  },
  actions: {
    async ESTIMATE_LIST({ commit }, datas) {
      const { data } = await getEstimateList(datas);
      commit("getEstimateList", data);
    },
    async ESTIMATE_DETAIL({ commit }, id) {
      const { data } = await getEstimateDetail(id);
      commit("getEstimateDetail", data);
    },
    async ESTIMATE_ADD({ commit }, datas) {
      const { data } = await estimateAdd(datas);

      commit("estimateAdd", data);
    },
    async ESTIMATE_MODIFY({ commit }, datas) {
      const { data } = await estimateModify(datas);

      commit("estimateModify", data);
    },
    async ESTIMATE_DELETE({ commit }, id) {
      const { data } = await estimateDelete(id);

      commit("estimateDelete", data);
    },
  },
};

export default estimate;
