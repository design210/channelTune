import { getStoreList, getProductStoreList } from "@/api/asset/storeList";

const assetStoreList = {
  namespaced: true,

  state: {
    getStoreList: {},
    getProductStoreList: {},
  },

  getters: {
    getStoreList: (state) => {
      return state.getStoreList;
    },
    getProductStoreList: (state) => {
      return state.getProductStoreList;
    },
  },

  mutations: {
    getStoreList(state, list) {
      state.getStoreList = list;
    },
    getProductStoreList(state, list) {
      state.getProductStoreList = list;
    },
  },

  actions: {
    async STORE_LIST({ commit }, datas) {
      const { data } = await getStoreList(datas);
      commit("getStoreList", data);
    },
    async GET_PRODUCT_STORE_LIST({ commit }, datas) {
      const { data } = await getProductStoreList(datas);
      commit("getProductStoreList", data);
    },
  },
};

export default assetStoreList;
