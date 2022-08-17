import { getPositionList, getPositionDetail, setPosition, delPosition, modifyPosition } from "@/api/hr/interbridPosition";
const position = {
  namespaced: true,
  state: {
    getPositionList: {},
    getPositionDetail: {},
    setPositionResult: {},
    delPositionResult: {},
    modifyPositionResult: {},
  },
  getters: {
    getPositionList: state => {
      return state.getPositionList;
    },
    getPositionDetail: state => {
      return state.getPositionDetail;
    },
    setPositionResult: state => {
      return state.setPositionResult;
    },
    delPositionResult: state => {
      return state.delPositionResult;
    },
    modifyPositionResult: state => {
      return state.modifyPositionResult;
    },
  },
  mutations: {
    getPositionList(state, positionList) {
      state.getPositionList = positionList;
    },
    getPositionDetail(state, positionDetail) {
      state.getPositionDetail = positionDetail;
    },
    setPositionResult(state, result) {
      state.setPositionResult = result;
    },
    delPositionResult(state, result) {
      state.delPositionResult = result;
    },
    modifyPositionResult(state, result) {
      state.modifyPositionResult = result;
    },
  },
  actions: {
    async POSITION_LIST({ commit }, datas) {
      const { data } = await getPositionList(datas);
      commit("getPositionList", data);
    },
    async POSITION_DETAIL({ commit }, datas) {
      const { data } = await getPositionDetail(datas);
      commit("getPositionDetail", data);
    },
    async POSITION_ADD({ commit }, datas) {
      const { data } = await setPosition(datas);
      commit("setPositionResult", data);
    },
    async POSITION_DEL({ commit }, id) {
      const { data } = await delPosition(id);
      commit("delPositionResult", data);
    },
    async POSITION_MODIFY({ commit }, datas) {
      const { data } = await modifyPosition(datas);
      commit("modifyPositionResult", data);
    },
  },
};

export default position;
