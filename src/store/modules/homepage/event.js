import { getEventList, getEventDetail, eventModify, eventAdd, eventDelete, getTuneEventList, getTuneEventTransList, getEventParticipantsInfo } from "@/api/homepage/event";
const event = {
  namespaced: true,
  state: {
    getEventList: {},
    getEventDetail: {},
    eventModify: {},
    eventAdd: {},
    eventDelete: {},
    getTuneEventList: {},
    getTuneEventTransList: {},
    getEventParticipantsInfo: {},
  },
  getters: {
    getEventList: state => {
      return state.getEventList;
    },
    getEventDetail: state => {
      return state.getEventDetail;
    },
    eventModify: state => {
      return state.eventModify;
    },
    eventAdd: state => {
      return state.eventAdd;
    },
    eventDelete: state => {
      return state.eventDelete;
    },

    getTuneEventList: state => {
      return state.getTuneEventList;
    },
    getTuneEventTransList: state => {
      return state.getTuneEventTransList;
    },
    getEventParticipantsInfo: state => {
      return state.getEventParticipantsInfo;
    },
  },
  mutations: {
    getEventList(state, list) {
      state.getEventList = list;
    },
    getEventDetail(state, list) {
      state.getEventDetail = list;
    },
    eventModify(state, result) {
      state.eventModify = result;
    },
    eventAdd(state, result) {
      state.eventAdd = result;
    },
    eventDelete(state, result) {
      state.eventDelete = result;
    },

    getTuneEventList(state, result) {
      state.getTuneEventList = result;
    },
    getTuneEventTransList(state, result) {
      state.getTuneEventTransList = result;
    },
    getEventParticipantsInfo(state, result) {
      state.getEventParticipantsInfo = result;
    },
  },
  actions: {
    async EVENT_LIST({ commit }, datas) {
      const { data } = await getEventList(datas);
      commit("getEventList", data);
    },
    async EVENT_DETAIL({ commit }, id) {
      const { data } = await getEventDetail(id);
      commit("getEventDetail", data);
    },
    async EVENT_MODIFY({ commit }, datas) {
      const { data } = await eventModify(datas);
      commit("eventModify", data);
    },
    async EVENT_ADD({ commit }, datas) {
      const { data } = await eventAdd(datas);
      commit("eventAdd", data);
    },
    async EVENT_DEL({ commit }, id) {
      const { data } = await eventDelete(id);
      commit("eventDelete", data);
    },

    async GET_TUNE_ENENT_LIST({ commit }, datas) {
      const { data } = await getTuneEventList(datas);
      commit("getTuneEventList", data);
    },
    async GET_TUNE_EVENT_TRANS_LIST({ commit }, datas) {
      const { data } = await getTuneEventTransList(datas);
      commit("getTuneEventTransList", data);
    },
    async GET_TUNE_EVENT__PARTICIPANTS_INFO({ commit }, id) {
      const { data } = await getEventParticipantsInfo(id);
      commit("getEventParticipantsInfo", data);
    },
  },
};

export default event;
