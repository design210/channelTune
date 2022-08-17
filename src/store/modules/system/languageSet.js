import {
  getLanguageSetList,
  getLanguageDetail,
  addLanguageSet,
  updateLanguageSet,
  deleteLanguageDetail,
  getLanguageDataType,
} from "@/api/system/languageSet";
const languageSet = {
  namespaced: true,
  state: {
    getLanguageSetList: {},
    getLanguageDetail: {},
    addLanguageSet: {},
    updateLanguageSet: {},
    deleteLanguageDetail: {},
    getLanguageDataType: {},
  },
  getters: {
    getLanguageSetList: (state) => {
      return state.getLanguageSetList;
    },
    getLanguageDetail: (state) => {
      return state.getLanguageDetail;
    },
    addLanguageSet: (state) => {
      return state.addLanguageSet;
    },
    updateLanguageSet: (state) => {
      return state.updateLanguageSet;
    },
    deleteLanguageDetail: (state) => {
      return state.deleteLanguageDetail;
    },
    getLanguageDataType: (state) => {
      return state.getLanguageDataType;
    },
  },
  mutations: {
    getLanguageSetList(state, result) {
      state.getLanguageSetList = result;
    },
    getLanguageDetail(state, result) {
      state.getLanguageDetail = result;
    },
    addLanguageSet(state, result) {
      state.addLanguageSet = result;
    },
    updateLanguageSet(state, result) {
      state.updateLanguageSet = result;
    },
    deleteLanguageDetail(state, result) {
      state.deleteLanguageDetail = result;
    },
    getLanguageDataType(state, result) {
      state.getLanguageDataType = result;
    },
  },
  actions: {
    async GET_LANGUAGE_SET_LIST({ commit }, listData) {
      const { data } = await getLanguageSetList(listData);

      commit("getLanguageSetList", data);
    },
    async GET_LANGUAGE_DETAIL({ commit }, id) {
      const { data } = await getLanguageDetail(id);
      commit("getLanguageDetail", data);
    },
    async ADD_LANGUAGE_SET({ commit }, languageData) {
      const { data } = await addLanguageSet(languageData);
      commit("addLanguageSet", data);
    },
    async UPDATE_LANGUAGE_SET({ commit }, languageData) {
      const { data } = await updateLanguageSet(languageData);
      commit("updateLanguageSet", data);
    },
    async DELETE_LANGUAGE_SET({ commit }, ud) {
      const { data } = await deleteLanguageDetail(ud);
      commit("deleteLanguageDetail", data);
    },
    async GET_LANGUAGE_DATA_TYPE({ commit }, datas) {
      const { data } = await getLanguageDataType(datas);
      commit("getLanguageDataType", data);
    },
  },
};

export default languageSet;
