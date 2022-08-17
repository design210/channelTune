import { getCustomerList, getCustomerDetail, customerModify, setCustomer, customerDelete } from "@/api/operation/prospectiveCustomer";
const prospectiveCustomer = {
  namespaced: true,
  state: {
    getCustomerList: {},
    getCustomerDetail: {},
    setCustomerResult: {},
    customerModifyResult: {},
    customerDeleteResult: {},
  },
  getters: {
    getCustomerList: state => {
      return state.getCustomerList;
    },
    getCustomerDetail: state => {
      return state.getCustomerDetail;
    },
    setCustomerResult: state => {
      return state.setCustomerResult;
    },
    customerModifyResult: state => {
      return state.customerModifyResult;
    },
    customerDeleteResult: state => {
      return state.customerDeleteResult;
    },
  },
  mutations: {
    getCustomerList(state, customerList) {
      state.getCustomerList = customerList;
    },
    getCustomerDetail(state, customerData) {
      state.getCustomerDetail = customerData;
    },
    setCustomerResult(state, result) {
      state.setCustomerResult = result;
    },
    customerModifyResult(state, result) {
      state.customerModifyResult = result;
    },
    customerDeleteResult(state, result) {
      state.customerDeleteResult = result;
    },
  },
  actions: {
    async CUSTOMER_LIST({ commit }, datas) {
      const { data } = await getCustomerList(datas);
      commit("getCustomerList", data);
    },
    async CUSTOMER_ADD({ commit }, datas) {
      const { data } = await setCustomer(datas);
      commit("setCustomerResult", data);
    },
    async CUSTOMER_MODIFY({ commit }, datas) {
      const { data } = await customerModify(datas);
      commit("customerModifyResult", data);
    },
    async CUSTOMER_DETAIL({ commit }, id) {
      const { data } = await getCustomerDetail(id);
      commit("getCustomerDetail", data);
    },
    async CUSTOMER_DEL({ commit }, id) {
      const { data } = await customerDelete(id);
      commit("customerDeleteResult", data);
    },
  },
};

export default prospectiveCustomer;
