import { getBannerList, getBannerDetail, bannerAdd, bannerUpdate, bannerDelete } from "@/api/homepage/banner";
const banner = {
  namespaced: true,
  state: {
    getBannerList: {},
    getBannerDetail: {},
    bannerAdd: {},
    bannerUpdate: {},
    bannerDelete: {},
  },
  getters: {
    getBannerList: state => {
      return state.getBannerList;
    },
    getBannerDetail: state => {
      return state.getBannerDetail;
    },
    bannerAdd: state => {
      return state.bannerAdd;
    },
    bannerUpdate: state => {
      return state.bannerUpdate;
    },
    bannerDelete: state => {
      return state.bannerDelete;
    },
  },
  mutations: {
    getBannerList(state, data) {
      state.getBannerList = data;
    },
    getBannerDetail(state, data) {
      state.getBannerDetail = data;
    },
    bannerAdd(state, data) {
      state.bannerAdd = data;
    },
    bannerUpdate(state, data) {
      state.bannerUpdate = data;
    },
    bannerDelete(state, data) {
      state.bannerDelete = data;
    },
  },
  actions: {
    async BANNER_LIST({ commit }, datas) {
      const { data } = await getBannerList(datas);
      commit("getBannerList", data);
    },
    async BANNER_DETAIL({ commit }, id) {
      const { data } = await getBannerDetail(id);
      commit("getBannerDetail", data);
    },
    async BANNER_ADD({ commit }, datas) {
      const { data } = await bannerAdd(datas);
      commit("bannerAdd", data);
    },
    async BANNER_UPDATE({ commit }, datas) {
      const { data } = await bannerUpdate(datas);
      commit("bannerUpdate", data);
    },
    async BANNER_DELETE({ commit }, id) {
      const { data } = await bannerDelete(id);
      commit("bannerDelete", data);
    },
  },
};

export default banner;
