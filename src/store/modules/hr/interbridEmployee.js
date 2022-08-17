import { getEmployeeList, getEmployeeDetail, employeeAdd, employeeDel, employeeModify } from "@/api/hr/interbridEmployee";
const employee = {
  namespaced: true,
  state: {
    getEmployeeList: {},
    getEmployeeDetail: {},
    employeeAddResult: {},
    employeeDelResult: {},
    employeeModifyResult: {},
  },
  getters: {
    getEmployeeList: state => {
      return state.getEmployeeList;
    },
    getEmployeeDetail: state => {
      return state.getEmployeeDetail;
    },
    employeeAddResult: state => {
      return state.employeeAddResult;
    },
    employeeDelResult: state => {
      return state.employeeDelResult;
    },
    employeeModifyResult: state => {
      return state.employeeModifyResult;
    },
  },
  mutations: {
    getEmployeeList(state, list) {
      state.getEmployeeList = list;
    },
    getEmployeeDetail(state, detail) {
      state.getEmployeeDetail = detail;
    },
    employeeAddResult(state, result) {
      state.employeeAddResult = result;
    },
    employeeDelResult(state, result) {
      state.employeeDelResult = result;
    },
    employeeModifyResult(state, result) {
      state.employeeModifyResult = result;
    },
  },
  actions: {
    async EMPLOYEE_LIST({ commit }, datas) {
      const { data } = await getEmployeeList(datas);
      commit("getEmployeeList", data);
    },
    async EMPLOYEE_DETAIL({ commit }, id) {
      const { data } = await getEmployeeDetail(id);
      commit("getEmployeeDetail", data);
    },
    async EMPLOYEE_ADD({ commit }, datas) {
      const { data } = await employeeAdd(datas);
      commit("employeeAddResult", data);
    },
    async EMPLOYEE_DEL({ commit }, id) {
      const { data } = await employeeDel(id);
      commit("employeeDelResult", data);
    },
    async EMPLOYEE_MODIFY({ commit }, datas) {
      const { data } = await employeeModify(datas);
      commit("employeeModifyResult", data);
    },
  },
};

export default employee;
