import { getPopUpList, popUpAdd, getPopUpDetail, popUpUpdate, popUpDelete } from "@/api/homepage/popup";
const popup = {
  namespaced: true,
  state: {
    getPopUpList: {},
    getPopUpDetail: {},
    popUpAdd: {},
    popUpUpdate: {},
    popUpDelete: {},
  },
  getters: {
    getPopUpList: (state) => {
      return state.getPopUpList;
    },
    getPopUpDetail: (state) => {
      return state.getPopUpDetail;
    },
    popUpAdd: (state) => {
      return state.popUpAdd;
    },
    popUpUpdate: (state) => {
      return state.popUpUpdate;
    },
    popUpDelete: (state) => {
      return state.popUpDelete;
    },
  },
  mutations: {
    getPopUpList(state, data) {
      state.getPopUpList = data;
    },
    getPopUpDetail(state, data) {
      state.getPopUpDetail = data;
    },
    popUpAdd(state, data) {
      state.popUpAdd = data;
    },
    popUpUpdate(state, data) {
      state.popUpUpdate = data;
    },
    popUpDelete(state, data) {
      state.popUpDelete = data;
    },
  },
  actions: {
    async POPUP_LIST({ commit }, datas) {
      const { data } = await getPopUpList(datas);
      commit("getPopUpList", data);
    },
    async POPUP_DETAIL({ commit }, id) {
      const { data } = await getPopUpDetail(id);
      commit("getPopUpDetail", data);
    },
    async POPUP_ADD({ commit }, datas) {
      const { data } = await popUpAdd(datas);
      commit("popUpAdd", data);
    },
    async POPUP_UPDATE({ commit }, datas) {
      const { data } = await popUpUpdate(datas);
      commit("popUpUpdate", data);
    },
    async POPUP_DELETE({ commit }, id) {
      const { data } = await popUpDelete(id);
      commit("popUpDelete", data);
    },
  },
};

export default popup;
