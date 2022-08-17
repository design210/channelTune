import {
  getTangibleAssetsList,
  getTangibleDetail,
  addTangibleAsset,
  modifyTangibleAsset,
  deleteTangibleAsset,
  getTransTangibleAssetsList,
  detailTransTangibleAssetsList,
  addTransTangibleAsset,
  modifyTransTangibleAsset,
  deleteTransTangibleAsset,
} from "@/api/hr/tangibleAssetManagement";

const tangibleAssets = {
  namespaced: true,
  state: {
    getTangibleAssetsList: {},
    addTangibleAsset: {},
    getTangibleDetail: {},
    modifyTangibleAsset: {},
    deleteTangibleAsset: {},
    getTransTangibleAssetsList: {},
    detailTransTangibleAssetsList: {},
    addTransTangibleAsset: {},
    modifyTransTangibleAsset: {},
    deleteTransTangibleAsset: {},
  },
  getters: {
    getTangibleAssetsList: (state) => {
      return state.getTangibleAssetsList;
    },
    getTangibleDetail: (state) => {
      return state.getTangibleDetail;
    },
    addTangibleAsset: (state) => {
      return state.addTangibleAsset;
    },
    modifyTangibleAsset: (state) => {
      return state.modifyTangibleAsset;
    },
    deleteTangibleAsset: (state) => {
      return state.deleteTangibleAsset;
    },
    getTransTangibleAssetsList: (state) => {
      return state.getTransTangibleAssetsList;
    },
    detailTransTangibleAssetsList: (state) => {
      return state.detailTransTangibleAssetsList;
    },
    addTransTangibleAsset: (state) => {
      return state.addTransTangibleAsset;
    },
    modifyTransTangibleAsset: (state) => {
      return state.modifyTransTangibleAsset;
    },
    deleteTransTangibleAsset: (state) => {
      return state.deleteTransTangibleAsset;
    },
  },
  mutations: {
    getTangibleAssetsList(state, result) {
      state.getTangibleAssetsList = result;
    },
    getTangibleDetail(state, result) {
      state.getTangibleDetail = result;
    },
    addTangibleAsset(state, result) {
      state.addTangibleAsset = result;
    },
    modifyTangibleAsset(state, result) {
      state.modifyTangibleAsset = result;
    },
    deleteTangibleAsset(state, result) {
      state.deleteTangibleAsset = result;
    },
    getTransTangibleAssetsList(state, result) {
      state.getTransTangibleAssetsList = result;
    },
    detailTransTangibleAssetsList(state, result) {
      state.detailTransTangibleAssetsList = result;
    },
    addTransTangibleAsset(state, result) {
      state.addTransTangibleAsset = result;
    },
    modifyTransTangibleAsset(state, result) {
      state.modifyTransTangibleAsset = result;
    },
    deleteTransTangibleAsset(state, result) {
      state.deleteTransTangibleAsset = result;
    },
  },
  actions: {
    async GET_TANGIBLE_ASSETS_LIST({ commit }, datas) {
      const { data } = await getTangibleAssetsList(datas);
      commit("getTangibleAssetsList", data);
    },
    async DETAIL_TANGIBLE_ASSETS({ commit }, id) {
      const { data } = await getTangibleDetail(id);
      commit("getTangibleDetail", data);
    },
    async ADD_TANGIBLE_ASSET({ commit }, datas) {
      const { data } = await addTangibleAsset(datas);
      commit("addTangibleAsset", data);
    },
    async MODIFY_TANGIBLE_ASSET({ commit }, datas) {
      const { data } = await modifyTangibleAsset(datas);
      commit("modifyTangibleAsset", data);
    },
    async DELETE_TANGIBLE_ASSET({ commit }, id) {
      const { data } = await deleteTangibleAsset(id);
      commit("deleteTangibleAsset", data);
    },
    async GET_TRANS_TANGIBLE_ASSETS_LIST({ commit }, datas) {
      const { data } = await getTransTangibleAssetsList(datas);
      commit("getTransTangibleAssetsList", data);
    },
    async DETAIL_TRANS_TANGIBLE_ASSET({ commit }, id) {
      const { data } = await detailTransTangibleAssetsList(id);
      commit("detailTransTangibleAssetsList", data);
    },
    async ADD_TRANS_TANGIBLE_TRANS_ASSET({ commit }, datas) {
      const { data } = await addTransTangibleAsset(datas);
      commit("addTransTangibleAsset", data);
    },
    async MODIFY_TRANS_TANGIBLE_ASSET({ commit }, datas) {
      const { data } = await modifyTransTangibleAsset(datas);
      commit("modifyTransTangibleAsset", data);
    },
    async DELETE_TRANS_TANGIBLE_ASSET({ commit }, id) {
      const { data } = await deleteTransTangibleAsset(id);
      commit("deleteTransTangibleAsset", data);
    },
  },
};

export default tangibleAssets;
