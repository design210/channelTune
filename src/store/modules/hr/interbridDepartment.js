import { getPartList, getPartDetail, setPart, delPart, modifyPart } from "@/api/hr/interbridDepartment";
const department = {
  namespaced: true,
  state: {
    getPartList: {},
    getPartDetail: {},
    setPartResult: {},
    delPartResult: {},
    modifyPartResult: {},
  },
  getters: {
    getPartList: state => {
      return state.getPartList;
    },
    getPartDetail: state => {
      return state.getPartDetail;
    },
    setPartResult: state => {
      return state.setPartResult;
    },
    delPartResult: state => {
      return state.delPartResult;
    },
    modifyPartResult: state => {
      return state.modifyPartResult;
    },
  },
  mutations: {
    getPartList(state, list) {
      state.getPartList = list;
    },
    getPartDetail(state, detail) {
      state.getPartDetail = detail;
    },
    setPartResult(state, result) {
      state.setPartResult = result;
    },
    delPartResult(state, result) {
      state.delPartResult = result;
    },
    modifyPartResult(state, result) {
      state.modifyPartResult = result;
    },
  },
  actions: {
    async PART_LIST({ commit }, datas) {
      const { data } = await getPartList(datas);
      commit("getPartList", data);
    },
    async PART_DETAIL({ commit }, datas) {
      const { data } = await getPartDetail(datas);
      commit("getPartDetail", data);
    },
    async PART_ADD({ commit }, datas) {
      const { data } = await setPart(datas);
      commit("setPartResult", data);
    },
    async PART_DEL({ commit }, id) {
      const { data } = await delPart(id);
      commit("delPartResult", data);
    },
    async PART_MODIFY({ commit }, datas) {
      const { data } = await modifyPart(datas);
      commit("modifyPartResult", data);
    },
  },
};

export default department;
