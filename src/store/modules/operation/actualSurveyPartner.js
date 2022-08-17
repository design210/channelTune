import { getActualSurveyPartnerList, getActualSurveyParnterDetail, actualSurveyParnterStatus, actualSurveyParnterCustomer, getActualSurveyParnterUpdate } from "@/api/operation/actualSurveyPartner";
const actualSurveyPartner = {
  namespaced: true,
  state: {
    getActualSurveyPartnerList: {},
    getActualSurveyPartnerDetail: {},
    actualSurveyParnterStatusResult: {},
    actualSurveyParnterCustomerResult: {},
    getActualSurveyParnterUpdateResult: {},
  },
  getters: {
    getActualSurveyPartnerList: state => {
      return state.getActualSurveyPartnerList;
    },
    getActualSurveyPartnerDetail: state => {
      return state.getActualSurveyPartnerDetail;
    },
    actualSurveyParnterStatusResult: state => {
      return state.actualSurveyParnterStatusResult;
    },
    actualSurveyParnterCustomerResult: state => {
      return state.actualSurveyParnterCustomerResult;
    },
    getActualSurveyParnterUpdateResult: state => {
      return state.getActualSurveyParnterUpdateResult;
    },
  },
  mutations: {
    getActualSurveyPartnerList(state, data) {
      state.getActualSurveyPartnerList = data;
    },
    getActualSurveyPartnerDetail(state, data) {
      state.getActualSurveyPartnerDetail = data;
    },
    actualSurveyParnterStatusResult(state, result) {
      state.actualSurveyParnterStatusResult = result;
    },
    actualSurveyParnterCustomerResult(state, result) {
      state.actualSurveyParnterCustomerResult = result;
    },
    getActualSurveyParnterUpdateResult(state, result) {
      state.getActualSurveyParnterUpdateResult = result;
    },
  },
  actions: {
    async ACTUALSURVEYPARTNER_LIST({ commit }, datas) {
      const { data } = await getActualSurveyPartnerList(datas);
      commit("getActualSurveyPartnerList", data);
    },
    async ACTUALSURVEYPARTNER_DETAIL({ commit }, id) {
      const { data } = await getActualSurveyParnterDetail(id);
      commit("getActualSurveyPartnerDetail", data);
    },
    async ACTUALSURVEYPARTNER_STATUS({ commit }, datas) {
      const { data } = await actualSurveyParnterStatus(datas);
      commit("actualSurveyParnterStatusResult", data);
    },
    async ACTUALSURVEYPARTNER_CUSTOMER({ commit }, id) {
      const { data } = await actualSurveyParnterCustomer(id);
      commit("actualSurveyParnterCustomerResult", data);
    },
    async ACTUALSURVEYPARTNER_UPDATE({ commit }, datas) {
      const { data } = await getActualSurveyParnterUpdate(datas);
      commit("getActualSurveyParnterUpdateResult", data);
    },
  },
};

export default actualSurveyPartner;
