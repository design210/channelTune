import { getCompanyList, getCompanyDetail, companyDelete, setCompany, companyModify, companyApproval } from "@/api/operation/company";
const company = {
  namespaced: true,
  state: {
    getCompanyList: {},
    getCompanyInfo: {},
    companyDeleteResult: {},
    setCompanyResult: {},
    companyModifyResult: {},
    companyApproval: {},
  },
  getters: {
    getCompanyList: (state) => {
      return state.getCompanyList;
    },
    getCompanyInfo: (state) => {
      return state.getCompanyInfo;
    },
    companyDeleteResult: (state) => {
      return state.companyDeleteResult;
    },
    setCompanyResult: (state) => {
      return state.setCompanyResult;
    },
    companyModifyResult: (state) => {
      return state.companyModifyResult;
    },
    companyApproval: (state) => {
      return state.companyApproval;
    },
  },
  mutations: {
    getCompanyList(state, companyList) {
      state.getCompanyList = companyList;
    },
    getCompanyInfo(state, companyInfo) {
      state.getCompanyInfo = companyInfo;
    },
    companyDeleteResult(state, result) {
      state.companyDeleteResult = result;
    },
    setCompanyResult(state, result) {
      state.setCompanyResult = result;
    },
    companyModifyResult(state, result) {
      state.companyModifyResult = result;
    },
    companyApproval(state, result) {
      state.companyApproval = result;
    },
  },
  actions: {
    async COMPANY_LIST({ commit }, companyData) {
      const { data } = await getCompanyList(companyData);
      commit("getCompanyList", data);
    },
    async COMPANY_DETAIL({ commit }, companyData) {
      const { data } = await getCompanyDetail(companyData);
      commit("getCompanyInfo", data);
    },
    async COMPANY_DEL({ commit }, id) {
      const { data } = await companyDelete(id);
      commit("companyDeleteResult", data);
    },
    async COMPANY_ADD({ commit }, companyData) {
      const { data } = await setCompany(companyData);
      commit("setCompanyResult", data);
    },
    async COMPANY_MODIFY({ commit }, companyData) {
      const { data } = await companyModify(companyData);
      commit("companyModifyResult", data);
    },
    async COMPANY_APPROVAL({ commit }, datas) {
      const { data } = await companyApproval(datas);
      commit("companyApproval", data);
    },
  },
};

export default company;
