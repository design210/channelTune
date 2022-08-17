import {
  getContractList,
  getContractDetail,
  contractDelete,
  setContract,
  contractModify,
  getContractStoreList,
  getCompanyContractList,
  getHistory,
  getContractSelectDetail,
  contractSelectModify,
  contractSelectReg,
  contractSelectDelete,
} from "@/api/operation/contract";
const contract = {
  namespaced: true,
  state: {
    getContractDetail: {},
    getContractList: {},
    getContractStoreList: {},
    getCompanyContractList: {},
    getHistory: {},
    getContractSelectDetail: {},
    getContractSelectReg: {},
    setContractResult: {},
    contractModifyResult: {},
    contractDeleteResult: {},
    contractSelectModifyResult: {},
    contractSelectDeleteResult: {},
  },
  getters: {
    getContractList: state => {
      return state.getContractList;
    },
    getContractDetail: state => {
      return state.getContractDetail;
    },
    getContractStoreList: state => {
      return state.getContractStoreList;
    },
    getCompanyContractList: state => {
      return state.getCompanyContractList;
    },
    getHistory: state => {
      return state.getHistory;
    },
    getContractSelectDetail: state => {
      return state.getContractSelectDetail;
    },
    getContractSelectReg: state => {
      return state.getContractSelectReg;
    },
    setContractResult: state => {
      return state.setContractResult;
    },
    contractModifyResult: state => {
      return state.contractModifyResult;
    },
    contractDeleteResult: state => {
      return state.contractDeleteResult;
    },
    contractSelectModifyResult: state => {
      return state.contractSelectModifyResult;
    },
    contractSelectDeleteResult: state => {
      return state.contractSelectDeleteResult;
    },
  },
  mutations: {
    getContractList(state, contactList) {
      state.getContractList = contactList;
    },
    getContractDetail(state, Data) {
      state.getContractDetail = Data;
    },
    getContractStoreList(state, Data) {
      state.getContractStoreList = Data;
    },
    getCompanyContractList(state, Data) {
      state.getCompanyContractList = Data;
    },
    getHistory(state, Data) {
      state.getHistory = Data;
    },
    getContractSelectDetail(state, Data) {
      state.getContractSelectDetail = Data;
    },
    getContractSelectReg(state, Data) {
      state.getContractSelectReg = Data;
    },
    setContractResult(state, result) {
      state.setContractResult = result;
    },
    contractModifyResult(state, result) {
      state.contractModifyResult = result;
    },
    contractDeleteResult(state, result) {
      state.contractDeleteResult = result;
    },
    contractSelectModifyResult(state, result) {
      state.contractSelectModifyResult = result;
    },
    contractSelectDeleteResult(state, result) {
      state.contractSelectDeleteResult = result;
    },
  },
  actions: {
    async CONTRACT_LIST({ commit }, datas) {
      const { data } = await getContractList(datas);
      commit("getContractList", data);
    },
    async CONTRACT_ADD({ commit }, datas) {
      const { data } = await setContract(datas);
      commit("setContractResult", data);
    },
    async CONTRACT_MODIFY({ commit }, datas) {
      const { data } = await contractModify(datas);
      commit("contractModifyResult", data);
    },
    async CONTRACT_DETAIL({ commit }, id) {
      const { data } = await getContractDetail(id);
      commit("getContractDetail", data);
    },
    async CONTRACT_DEL({ commit }, id) {
      const { data } = await contractDelete(id);
      commit("contractDeleteResult", data);
    },
    async CONTRACT_STORE_LIST({ commit }, id) {
      const { data } = await getContractStoreList(id);
      commit("getContractStoreList", data);
    },
    async CONTRACT_COMPANY_LIST({ commit }, id) {
      const { data } = await getCompanyContractList(id);
      commit("getCompanyContractList", data);
    },
    async CONTRACT_HISTORY({ commit }, id) {
      const { data } = await getHistory(id);
      commit("getHistory", data);
    },
    async CONTRACT_SELECT_DETAIL({ commit }, id) {
      const { data } = await getContractSelectDetail(id);
      commit("getContractSelectDetail", data);
    },
    async CONTRACT_SELECT_MODIFY({ commit }, datas) {
      const { data } = await contractSelectModify(datas);
      commit("contractSelectModifyResult", data);
    },
    async CONTRACT_SELECT_REG({ commit }, datas) {
      const { data } = await contractSelectReg(datas);
      commit("getContractSelectReg", data);
    },
    async CONTRACT_SELECT_DEL({ commit }, id) {
      const { data } = await contractSelectDelete(id);
      commit("contractSelectDeleteResult", data);
    },
  },
};

export default contract;
