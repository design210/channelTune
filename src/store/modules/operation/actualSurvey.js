import { getActualSurveyList, getActualSurveyDetail, getActualSurveyUpdate, getActualSurveyReg } from "@/api/operation/actualSurvey";
const ActualSurvey = {
  namespaced: true,
  state: {
    getActualSurveyList: {},
    getActualSurveyDetail: {},
    getActualSurveyReg: {},
    getActualSurveyUpdateResult: {},
  },
  getters: {
    getActualSurveyList: state => {
      return state.getActualSurveyList;
    },
    getActualSurveyDetail: state => {
      return state.getActualSurveyDetail;
    },
    getActualSurveyReg: state => {
      return state.getActualSurveyReg;
    },
    getActualSurveyUpdateResult: state => {
      return state.getActualSurveyUpdateResult;
    },
  },
  mutations: {
    getActualSurveyList(state, data) {
      state.getActualSurveyList = data;
    },
    getActualSurveyDetail(state, data) {
      state.getActualSurveyDetail = data;
    },
    getActualSurveyReg(state, data) {
      state.getActualSurveyReg = data;
    },
    getActualSurveyUpdateResult(state, result) {
      state.getActualSurveyUpdateResult = result;
    },
  },
  actions: {
    async ACTUALSURVEY_LIST({ commit }, datas) {
      const { data } = await getActualSurveyList(datas);
      commit("getActualSurveyList", data);
    },
    async ACTUALSURVEY_DETAIL({ commit }, id) {
      const { data } = await getActualSurveyDetail(id);
      commit("getActualSurveyDetail", data);
    },
    async ACTUALSURVEY_UPDATE({ commit }, datas) {
      const { data } = await getActualSurveyUpdate(datas);
      commit("getActualSurveyUpdateResult", data);
    },
    async ACTUALSURVEY_REG({ commit }, datas) {
      const { data } = await getActualSurveyReg(datas);
      commit("getActualSurveyReg", data);
    },
  },
};

export default ActualSurvey;
