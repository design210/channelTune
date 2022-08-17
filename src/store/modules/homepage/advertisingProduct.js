import {
  getProductList,
  getProductDetail,
  productReg,
  productModify,
  productDelete,
  productTransTransOptionDetail,
  productTransTransOptionAdd,
  productTransTransBenefitAdd,
  advertisingProductVideoTransAdd,
  getProductTransTransOption,
  getAdvertisingProductVideoSample,
  getAdvertisingProductVideoSampleDetail,
  advertisingProductVideoSampleadd,
  advertisingProductVideoSampleUpdate,
  advertisingProductVideoSampleDelete,
} from "@/api/homepage/advertisingProduct";
const product = {
  namespaced: true,
  state: {
    getProductList: {},
    getProductDetail: {},
    productRegResult: {},
    productModifyResult: {},
    productDeleteResult: {},

    // advertisingProductTrnas 광고상품 옵션, 혜택 저장
    productTransTransOptionDetail: {},
    productTransTransOptionAdd: {},
    productTransTransBenefitAdd: {},

    advertisingProductVideoTransAdd: {},
    getProductTransTransOption: {},
    percentage: 0,

    getAdvertisingProductVideoSample: {},
    getAdvertisingProductVideoSampleDetail: {},
    advertisingProductVideoSampleAdd: {},
    advertisingProductVideoSampleUpdate: {},
    advertisingProductVideoSampleDelete: {},
  },
  getters: {
    getProductList: state => {
      return state.getProductList;
    },
    getProductDetail: state => {
      return state.getProductDetail;
    },
    productRegResult: state => {
      return state.productRegResult;
    },
    productModifyResult: state => {
      return state.productModifyResult;
    },
    productDeleteResult: state => {
      return state.productDeleteResult;
    },

    // advertisingProductTrnas 광고상품 옵션, 혜택 저장
    productTransTransOptionDetail: state => {
      return state.productTransTransOptionDetail;
    },
    productTransTransOptionAdd: state => {
      return state.productTransTransOptionAdd;
    },
    productTransTransBenefitAdd: state => {
      return state.productTransTransBenefitAdd;
    },

    advertisingProductVideoTransAdd: state => {
      return state.advertisingProductVideoTransAdd;
    },
    getProductTransTransOption: state => {
      return state.getProductTransTransOption;
    },
    percentage: state => {
      return state.percentage;
    },

    getAdvertisingProductVideoSample: state => {
      return state.getAdvertisingProductVideoSample;
    },
    getAdvertisingProductVideoSampleDetail: state => {
      return state.getAdvertisingProductVideoSampleDetail;
    },
    advertisingProductVideoSampleAdd: state => {
      return state.advertisingProductVideoSampleAdd;
    },
    advertisingProductVideoSampleUpdate: state => {
      return state.advertisingProductVideoSampleUpdate;
    },
    advertisingProductVideoSampleDelete: state => {
      return state.advertisingProductVideoSampleDelete;
    },
  },
  mutations: {
    getProductList(state, data) {
      state.getProductList = data;
    },
    getProductDetail(state, data) {
      state.getProductDetail = data;
    },
    productRegResult(state, result) {
      state.productRegResult = result;
    },
    productModifyResult(state, result) {
      state.productModifyResult = result;
    },
    productDeleteResult(state, result) {
      state.productDeleteResult = result;
    },

    // advertisingProductTrnas 광고상품 옵션, 혜택 저장
    productTransTransOptionDetail(state, result) {
      state.productTransTransOptionDetail = result;
    },
    productTransTransOptionAdd(state, result) {
      state.productTransTransOptionAdd = result;
    },
    productTransTransBenefitAdd(state, result) {
      state.productTransTransBenefitAdd = result;
    },

    advertisingProductVideoTransAdd(state, list) {
      state.advertisingProductVideoTransAdd = list;
    },
    getProductTransTransOption(state, list) {
      state.getProductTransTransOption = list;
    },
    percentage(state, list) {
      state.percentage = list;
    },

    //광고영상상품 샘플관리
    getAdvertisingProductVideoSample(state, list) {
      state.getAdvertisingProductVideoSample = list;
    },
    getAdvertisingProductVideoSampleDetail(state, list) {
      state.getAdvertisingProductVideoSampleDetail = list;
    },
    advertisingProductVideoSampleAdd(state, list) {
      state.advertisingProductVideoSampleAdd = list;
    },
    advertisingProductVideoSampleUpdate(state, list) {
      state.advertisingProductVideoSampleUpdate = list;
    },
    advertisingProductVideoSampleDelete(state, list) {
      state.advertisingProductVideoSampleDelete = list;
    },
  },
  actions: {
    async PRODUCT_LIST({ commit }, datas) {
      const { data } = await getProductList(datas);
      commit("getProductList", data);
    },
    async PRODUCT_DETAIL({ commit }, id) {
      const { data } = await getProductDetail(id);
      commit("getProductDetail", data);
    },
    async PRODUCT_ADD({ commit }, datas) {
      const { data } = await productReg(datas);
      commit("productRegResult", data);
    },
    async PRODUCT_MODIFY({ commit }, datas) {
      const { data } = await productModify(datas);
      commit("productModifyResult", data);
    },
    async PRODUCT_DEL({ commit }, datas) {
      const { data } = await productDelete(datas);
      commit("productDeleteResult", data);
    },

    // advertisingProductTrnas 광고상품 옵션, 혜택 저장
    async PRODUCTTRANS_OPTION_DETAIL({ commit }, datas) {
      const { data } = await productTransTransOptionDetail(datas);
      commit("productTransTransOptionDetail", data);
    },
    async PRODUCTTRANS_OPTION_ADD({ commit }, datas) {
      const { data } = await productTransTransOptionAdd(datas);
      commit("productTransTransOptionAdd", data);
    },
    async PRODUCTTRANS_BENEFIT_ADD({ commit }, datas) {
      const { data } = await productTransTransBenefitAdd(datas);
      commit("productTransTransBenefitAdd", data);
    },

    async ADVERTISING_PRODUCT_VIDEO_TRANS_ADD({ commit }, datas) {
      const { data } = await advertisingProductVideoTransAdd(datas, commit);
      commit("advertisingProductVideoTransAdd", data);
    },

    async GET_ADVERTISING_PRODUCT_VIDEO_TRANS({ commit }, id) {
      const { data } = await getProductTransTransOption(id);
      commit("getProductTransTransOption", data);
    },
    async GET_PERCENTAGE({ commit }) {
      commit("percentage");
    },

    //광고영상상품 샘플 관리

    async GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE({ commit }, id) {
      const { data } = await getAdvertisingProductVideoSample(id);
      commit("getAdvertisingProductVideoSample", data);
    },

    async GET_ADVERTISING_PRODUCT_VIDEO_SAMPLE_DETAIL({ commit }, id) {
      const { data } = await getAdvertisingProductVideoSampleDetail(id);
      commit("getAdvertisingProductVideoSampleDetail", data);
    },
    async ADVERTISING_PRODUCT_VIDEO_SAMPLE_ADD({ commit }, datas) {
      const { data } = await advertisingProductVideoSampleadd(datas, commit);
      commit("advertisingProductVideoSampleAdd", data);
    },
    async ADVERTISING_PRODUCT_VIDEO_SAMPLE_UPDATE({ commit }, datas) {
      const { data } = await advertisingProductVideoSampleUpdate(datas, commit);
      commit("advertisingProductVideoSampleUpdate", data);
    },

    async ADVERTISING_PRODUCT_VIDEO_SAMPLE_DELETE({ commit }, id) {
      const { data } = await advertisingProductVideoSampleDelete(id);
      commit("advertisingProductVideoSampleDelete", data);
    },
  },
};

export default product;
