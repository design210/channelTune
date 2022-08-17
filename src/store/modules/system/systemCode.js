import { getCode, getCodeDetail } from "@/api/system/code";
const systemCode = {
  namespaced: true,
  state: {
    getCode: {},
    getCodeDetail: {},
  },
  getters: {
    getCode: state => {
      return state.getCode;
    },
    getCodeDetail: state => {
      return state.getCodeDetail;
    },
  },
  mutations: {
    getCode(state, data) {
      state.getCode = data;
    },
    getCodeDetail(state, data) {
      state.getCodeDetail = data;
    },
  },
  actions: {
    async GET_CODE({ commit }, id) {
      const { data } = await getCode(id);
      commit("getCode", data);
    },
    async GET_CODE_DETAIL({ commit }, id) {
      const { data } = await getCodeDetail(id);
      commit("getCodeDetail", data);
    },
  },
};

export default systemCode;
