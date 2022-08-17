import {
  // product
  getProductList,
  getProductDetail,
  productAdd,
  productModify,
  productDelete,

  // productMaintenance
  getProductMaintenanceList,
  getProductMaintenanceDetail,
  getProductMaintenanceAdd,
  getProductMaintenanceUpdate,
  getProductMaintenanceDelete,

  // production
  getProductionList,
  getProductionDetail,
  getProductionSerial,
  productionAdd,
  productionModify,
  productionDelete,

  // production
  getProductionTestList,
  getProductionTestDetail,
  productionTestAdd,
  productionTestModify,
  productionTestDelete,

  // productionPrint
  getProductionPrintDetail,

  // productionInstallionStore
  getProductInstallionStoreList,
  getProductInstallionStoreDetail,
  productInstallionStoreModify,
  productInstallionStoreAdd,
  productInstallionStoreDelete,

  // productionInstallionStoreInfo
  getProductInstallionStoreInfoList,
  getProductInstallionStoreInfoAdd,
  getProductInstallionStoreInfoSave,
  getProductInstallionStoreInfoDelete,
} from "@/api/asset/product";
const assetProduct = {
  namespaced: true,
  state: {
    // product
    getProductList: {},
    getProductDetail: {},
    productAdd: {},
    productModify: {},
    productDelete: {},

    // productMaintenance
    getProductMaintenanceList: {},
    getProductMaintenanceDetail: {},
    getProductMaintenanceAdd: {},
    getProductMaintenanceUpdate: {},
    getProductMaintenanceDelete: {},

    // production(제품생산)
    getProductionList: {},
    getProductionDetail: {},
    getProductionSerial: {},
    productionAdd: {},
    productionModify: {},
    productionDelete: {},

    // productionTest(제품검수)
    getProductionTestList: {},
    getProductionTestDetail: {},
    productionTestAdd: {},
    productionTestModify: {},
    productionTestDelete: {},

    // LOT라벨 인쇄 및 시리얼 인쇄
    getProductionPrintDetail: {},

    // 스토어제품설치
    getProductInstallionStoreList,
    getProductInstallionStoreDetail,
    productInstallionStoreModify,
    productInstallionStoreAdd,
    productInstallionStoreDelete,

    // 스토어제품설치 등록리스트
    getProductInstallionStoreInfoList,
    getProductInstallionStoreInfoAdd,
    getProductInstallionStoreInfoSave,
    getProductInstallionStoreInfoDelete,
  },
  getters: {
    // product
    getProductList: (state) => {
      return state.getProductList;
    },
    getProductDetail: (state) => {
      return state.getProductDetail;
    },
    productAdd: (state) => {
      return state.productAdd;
    },
    productModify: (state) => {
      return state.productModify;
    },
    productDelete: (state) => {
      return state.productDelete;
    },

    // productMaintenance
    getProductMaintenanceList: (state) => {
      return state.getProductMaintenanceList;
    },
    getProductMaintenanceDetail: (state) => {
      return state.getProductMaintenanceDetail;
    },
    getProductMaintenanceAdd: (state) => {
      return state.getProductMaintenanceAdd;
    },
    getProductMaintenanceUpdate: (state) => {
      return state.getProductMaintenanceUpdate;
    },
    getProductMaintenanceDelete: (state) => {
      return state.getProductMaintenanceDelete;
    },

    // production
    getProductionList: (state) => {
      return state.getProductionList;
    },
    getProductionDetail: (state) => {
      return state.getProductionDetail;
    },
    getProductionSerial: (state) => {
      return state.getProductionSerial;
    },
    productionAdd: (state) => {
      return state.productionAdd;
    },
    productionModify: (state) => {
      return state.productionModify;
    },
    productionDelete: (state) => {
      return state.productionDelete;
    },

    // productionTest
    getProductionTestList: (state) => {
      return state.getProductionTestList;
    },
    getProductionTestDetail: (state) => {
      return state.getProductionTestDetail;
    },
    productionTestAdd: (state) => {
      return state.productionTestAdd;
    },
    productionTestModify: (state) => {
      return state.productionTestModify;
    },
    productionTestDelete: (state) => {
      return state.productionTestDelete;
    },

    // productionPrint
    getProductionPrintDetail: (state) => {
      return state.getProductionPrintDetail;
    },

    // productionInstallionStore
    getProductInstallionStoreList: (state) => {
      return state.getProductInstallionStoreList;
    },
    getProductInstallionStoreDetail: (state) => {
      return state.getProductInstallionStoreDetail;
    },
    productInstallionStoreModify: (state) => {
      return state.productInstallionStoreModify;
    },
    productInstallionStoreAdd: (state) => {
      return state.productInstallionStoreAdd;
    },
    productInstallionStoreDelete: (state) => {
      return state.productInstallionStoreDelete;
    },

    // productionInstallionStoreInfo
    getProductInstallionStoreInfoList: (state) => {
      return state.getProductInstallionStoreInfoList;
    },
    getProductInstallionStoreInfoAdd: (state) => {
      return state.getProductInstallionStoreInfoAdd;
    },
    getProductInstallionStoreInfoSave: (state) => {
      return state.getProductInstallionStoreInfoSave;
    },
    getProductInstallionStoreInfoDelete: (state) => {
      return state.getProductInstallionStoreInfoDelete;
    },
  },
  mutations: {
    // product
    getProductList(state, list) {
      state.getProductList = list;
    },
    getProductDetail(state, list) {
      state.getProductDetail = list;
    },
    productAdd(state, result) {
      state.productAdd = result;
    },
    productModify(state, result) {
      state.productModify = result;
    },
    productDelete(state, result) {
      state.productDelete = result;
    },

    // productMaintenance
    getProductMaintenanceList(state, result) {
      state.getProductMaintenanceList = result;
    },
    getProductMaintenanceDetail(state, result) {
      state.getProductMaintenanceDetail = result;
    },
    getProductMaintenanceAdd(state, result) {
      state.getProductMaintenanceAdd = result;
    },
    getProductMaintenanceUpdate(state, result) {
      state.getProductMaintenanceUpdate = result;
    },
    getProductMaintenanceDelete(state, result) {
      state.getProductMaintenanceDelete = result;
    },

    // production
    getProductionList(state, list) {
      state.getProductionList = list;
    },
    getProductionDetail(state, list) {
      state.getProductionDetail = list;
    },
    getProductionSerial(state, list) {
      state.getProductionSerial = list;
    },
    productionAdd(state, result) {
      state.productionAdd = result;
    },
    productionModify(state, result) {
      state.productionModify = result;
    },
    productionDelete(state, result) {
      state.productionDelete = result;
    },

    // productionTest
    getProductionTestList(state, list) {
      state.getProductionTestList = list;
    },
    getProductionTestDetail(state, list) {
      state.getProductionTestDetail = list;
    },
    productionTestAdd(state, result) {
      state.productionTestAdd = result;
    },
    productionTestModify(state, result) {
      state.productionTestModify = result;
    },
    productionTestDelete(state, result) {
      state.productionTestDelete = result;
    },

    // productionPrint
    getProductionPrintDetail(state, list) {
      state.getProductionPrintDetail = list;
    },

    // productionInstallation
    getProductInstallionStoreList(state, list) {
      state.getProductInstallionStoreList = list;
    },
    getProductInstallionStoreDetail(state, list) {
      state.getProductInstallionStoreDetail = list;
    },
    productInstallionStoreModify(state, result) {
      state.productInstallionStoreModify = result;
    },
    productInstallionStoreAdd(state, result) {
      state.productInstallionStoreAdd = result;
    },
    productInstallionStoreDelete(state, result) {
      state.productInstallionStoreDelete = result;
    },

    // productionInstallionStoreInfo
    getProductInstallionStoreInfoList(state, result) {
      state.getProductInstallionStoreInfoList = result;
    },
    getProductInstallionStoreInfoAdd(state, result) {
      state.getProductInstallionStoreInfoAdd = result;
    },
    getProductInstallionStoreInfoSave(state, result) {
      state.getProductInstallionStoreInfoSave = result;
    },
    getProductInstallionStoreInfoDelete(state, result) {
      state.getProductInstallionStoreInfoDelete = result;
    },
  },
  actions: {
    // product
    async PRODUCT_LIST({ commit }, datas) {
      const { data } = await getProductList(datas);
      commit("getProductList", data);
    },
    async PRODUCT_DETAIL({ commit }, id) {
      const { data } = await getProductDetail(id);
      commit("getProductDetail", data);
    },
    async PRODUCT_MODIFY({ commit }, datas) {
      const { data } = await productModify(datas);
      commit("productModify", data);
    },
    async PRODUCT_ADD({ commit }, datas) {
      const { data } = await productAdd(datas);
      commit("productAdd", data);
    },
    async PRODUCT_DEL({ commit }, id) {
      const { data } = await productDelete(id);
      commit("productDelete", data);
    },

    // productMaintenance
    async PRODUCT_MAINTENANCE_LIST({ commit }, id) {
      const { data } = await getProductMaintenanceList(id);
      commit("getProductMaintenanceList", data);
    },
    async PRODUCT_MAINTENANCE_DETAIL({ commit }, id) {
      const { data } = await getProductMaintenanceDetail(id);
      commit("getProductMaintenanceDetail", data);
    },
    async PRODUCT_MAINTENANCE_ADD({ commit }, d) {
      const { data } = await getProductMaintenanceAdd(d);
      commit("getProductMaintenanceAdd", data);
    },
    async PRODUCT_MAINTENANCE_UPDATE({ commit }, d) {
      const { data } = await getProductMaintenanceUpdate(d);
      commit("getProductMaintenanceUpdate", data);
    },
    async PRODUCT_MAINTENANCE_DELETE({ commit }, id) {
      const { data } = await getProductMaintenanceDelete(id);
      commit("getProductMaintenanceDelete", data);
    },

    // production
    async PRODUCTION_LIST({ commit }, datas) {
      const { data } = await getProductionList(datas);
      commit("getProductionList", data);
    },
    async PRODUCTION_DETAIL({ commit }, id) {
      const { data } = await getProductionDetail(id);
      commit("getProductionDetail", data);
    },
    async PRODUCTION_SERIAL({ commit }, datas) {
      const { data } = await getProductionSerial(datas);
      commit("getProductionSerial", data);
    },
    async PRODUCTION_MODIFY({ commit }, datas) {
      const { data } = await productionModify(datas);
      commit("productionModify", data);
    },
    async PRODUCTION_ADD({ commit }, datas) {
      const { data } = await productionAdd(datas);
      commit("productionAdd", data);
    },
    async PRODUCTION_DEL({ commit }, id) {
      const { data } = await productionDelete(id);
      commit("productionDelete", data);
    },

    // productionTest
    async PRODUCTIONTEST_LIST({ commit }, datas) {
      const { data } = await getProductionTestList(datas);
      commit("getProductionTestList", data);
    },
    async PRODUCTIONTEST_DETAIL({ commit }, id) {
      const { data } = await getProductionTestDetail(id);
      commit("getProductionTestDetail", data);
    },
    async PRODUCTIONTEST_MODIFY({ commit }, datas) {
      const { data } = await productionTestModify(datas);
      commit("productionTestModify", data);
    },
    async PRODUCTIONTEST_ADD({ commit }, datas) {
      const { data } = await productionTestAdd(datas);
      commit("productionTestAdd", data);
    },
    async PRODUCTIONTEST_DEL({ commit }, id) {
      const { data } = await productionTestDelete(id);
      commit("productionTestDelete", data);
    },

    // productionPrint
    async PRODUCTIONPRINT_DETAIL({ commit }, datas) {
      const { data } = await getProductionPrintDetail(datas);
      commit("getProductionPrintDetail", data);
    },

    // productionInstallionStore
    async PRODUCTIONINSTALLIONSTORE_LIST({ commit }, datas) {
      const { data } = await getProductInstallionStoreList(datas);
      commit("getProductInstallionStoreList", data);
    },
    async PRODUCTIONINSTALLIONSTORE_DETAIL({ commit }, datas) {
      const { data } = await getProductInstallionStoreDetail(datas);
      commit("getProductInstallionStoreDetail", data);
    },
    async PRODUCTIONINSTALLIONSTORE_MODIFY({ commit }, datas) {
      const { data } = await productInstallionStoreModify(datas);
      commit("productInstallionStoreModify", data);
    },
    async PRODUCTIONINSTALLIONSTORE_ADD({ commit }, datas) {
      const { data } = await productInstallionStoreAdd(datas);
      commit("productInstallionStoreAdd", data);
    },
    async PRODUCTIONINSTALLIONSTORE_DELETE({ commit }, id) {
      const { data } = await productInstallionStoreDelete(id);
      commit("productInstallionStoreDelete", data);
    },

    // productionInstallionStoreInfo
    async PRODUCTIONINSTALLIONSTOREINFO_LIST({ commit }, datas) {
      const { data } = await getProductInstallionStoreInfoList(datas);
      commit("getProductInstallionStoreInfoList", data);
    },
    // productionInstallionStoreInfo
    async PRODUCTIONINSTALLIONSTOREINFO_ADD({ commit }, datas) {
      const { data } = await getProductInstallionStoreInfoAdd(datas);
      commit("getProductInstallionStoreInfoAdd", data);
    },
    async PRODUCTIONINSTALLIONSTOREINFO_SAVE({ commit }, datas) {
      const { data } = await getProductInstallionStoreInfoSave(datas);
      commit("getProductInstallionStoreInfoSave", data);
    },
    async PRODUCTIONINSTALLIONSTOREINFO_DELETE({ commit }, id) {
      const { data } = await getProductInstallionStoreInfoDelete(id);
      commit("getProductInstallionStoreInfoDelete", data);
    },
  },
};

export default assetProduct;
