import {
  getCompanyStoreList,
  getCompanyStoreDetail,
  companyStoreModify,
  companyStoreAdd,
  companyDel,
  getStoreTimeSchedule,
  storeTimeScheduleAdd,
  getStoreTimeScheduleDetail,
  storeDel,
  StoreTimeScheduleModify,
  getStoreAppraisalList,
  getStoreAppraisalListDaily,
  getStoreAppraisalListTime,
  getStoreAppraisalDetail,
  getStoreTrafficList,
  StoreAppraisalReg,
  StoreAppraisalModify,
  setlevel,
  getUnitPrice,
  storeAppraisalDel,
  StoreTrafficlReg,
  StoreTrafficModify,
  storeTrafficDel,
  strafficFileUpload,
  storeTrafficDetail,
  storeTrafficChangeAll,
  aggregationByDay,
  aggregationByTime,
  aggregationByMonth,
  unexposedBatchProcessing,
  storeTrafficDailyReplace,
  WalkInsightDataProcessing,
} from "@/api/operation/companyStore";
const companyStore = {
  namespaced: true,
  state: {
    getCompanyStoreList: {},
    getCompanyStoreDetail: {},
    getStoreTimeSchedule: {},
    getStoreTimeScheduleDetail: {},
    StoreTimeScheduleAdd: {},
    getStoreAppraisalList: {},
    getStoreAppraisalListDaily: {},
    getStoreAppraisalListTime: {},
    getStoreAppraisalDetail: {},
    getStoreTrafficList: {},
    setlevel: {},
    storeAppraisalReg: {},
    StoreTrafficlReg: {},
    strafficFileUploadResult: {},
    companyStoreModifyResult: {},
    companyStoreAddResult: {},
    companyDelResult: {},
    storeDelResult: {},
    StoreTimeScheduleModifyResult: {},
    StoreAppraisalModifyResult: {},
    storeAppraisalDelResult: {},
    StoreTrafficModifyResult: {},
    storeTrafficDelResult: {},
    storeTrafficDetail: {},
    storeTrafficChangeAll: {},
    aggregationByDay: {},
    aggregationByTime: {},
    aggregationByMonth: {},
    getUnitPrice: {},
    unexposedBatchProcessing: {},
    storeTrafficDailyReplace: {},
    WalkInsightDataProcessing: {},
  },
  getters: {
    getCompanyStoreList: (state) => {
      return state.getCompanyStoreList;
    },
    getCompanyStoreDetail: (state) => {
      return state.getCompanyStoreDetail;
    },
    getStoreTimeSchedule: (state) => {
      return state.getStoreTimeSchedule;
    },
    getStoreTimeScheduleDetail: (state) => {
      return state.getStoreTimeScheduleDetail;
    },
    StoreTimeScheduleAdd: (state) => {
      return state.StoreTimeScheduleAdd;
    },
    getStoreAppraisalList: (state) => {
      return state.getStoreAppraisalList;
    },
    getStoreAppraisalListDaily: (state) => {
      return state.getStoreAppraisalListDaily;
    },
    getStoreAppraisalListTime: (state) => {
      return state.getStoreAppraisalListTime;
    },
    getStoreAppraisalDetail: (state) => {
      return state.getStoreAppraisalDetail;
    },
    getStoreTrafficList: (state) => {
      return state.getStoreTrafficList;
    },
    setlevel: (state) => {
      return state.setlevel;
    },
    storeAppraisalReg: (state) => {
      return state.storeAppraisalReg;
    },
    StoreTrafficlReg: (state) => {
      return state.StoreTrafficlReg;
    },
    strafficFileUploadResult: (state) => {
      return state.strafficFileUploadResult;
    },
    companyStoreModifyResult: (state) => {
      return state.companyStoreModifyResult;
    },
    companyStoreAddResult: (state) => {
      return state.companyStoreAddResult;
    },
    companyDelResult: (state) => {
      return state.companyDelResult;
    },
    storeDelResult: (state) => {
      return state.storeDelResult;
    },
    StoreTimeScheduleModifyResult: (state) => {
      return state.StoreTimeScheduleModifyResult;
    },
    StoreAppraisalModifyResult: (state) => {
      return state.StoreAppraisalModifyResult;
    },
    storeAppraisalDelResult: (state) => {
      return state.storeAppraisalDelResult;
    },
    StoreTrafficModifyResult: (state) => {
      return state.StoreTrafficModifyResult;
    },
    storeTrafficDelResult: (state) => {
      return state.storeTrafficDelResult;
    },
    storeTrafficDetail: (state) => {
      return state.storeTrafficDetail;
    },
    storeTrafficChangeAll: (state) => {
      return state.storeTrafficChangeAll;
    },
    aggregationByMonth: (state) => {
      return state.aggregationByMonth;
    },
    aggregationByTime: (state) => {
      return state.aggregationByTime;
    },
    aggregationByDay: (state) => {
      return state.aggregationByDay;
    },
    getUnitPrice: (state) => {
      return state.getUnitPrice;
    },
    unexposedBatchProcessing: (state) => {
      return state.unexposedBatchProcessing;
    },
    storeTrafficDailyReplace: (state) => {
      return state.storeTrafficDailyReplace;
    },
    WalkInsightDataProcessing: (state) => {
      return state.WalkInsightDataProcessing;
    },
  },
  mutations: {
    getCompanyStoreList(state, data) {
      state.getCompanyStoreList = data;
    },
    getCompanyStoreDetail(state, data) {
      state.getCompanyStoreDetail = data;
    },
    getStoreTimeSchedule(state, data) {
      state.getStoreTimeSchedule = data;
    },
    getStoreTimeScheduleDetail(state, data) {
      state.getStoreTimeScheduleDetail = data;
    },
    StoreTimeScheduleAdd(state, data) {
      state.StoreTimeScheduleAdd = data;
    },
    getStoreAppraisalList(state, data) {
      state.getStoreAppraisalList = data;
    },
    getStoreAppraisalListDaily(state, data) {
      state.getStoreAppraisalListDaily = data;
    },
    getStoreAppraisalListTime(state, data) {
      state.getStoreAppraisalListTime = data;
    },
    getStoreAppraisalDetail(state, data) {
      state.getStoreAppraisalDetail = data;
    },
    getStoreTrafficList(state, data) {
      state.getStoreTrafficList = data;
    },
    setlevel(state, data) {
      state.setlevel = data;
    },
    storeAppraisalReg(state, data) {
      state.storeAppraisalReg = data;
    },
    StoreTrafficlReg(state, data) {
      state.StoreTrafficlReg = data;
    },
    strafficFileUploadResult(state, data) {
      state.strafficFileUploadResult = data;
    },
    companyStoreModifyResult(state, result) {
      state.companyStoreModifyResult = result;
    },
    companyStoreAddResult(state, result) {
      state.companyStoreAddResult = result;
    },
    companyDelResult(state, result) {
      state.companyDelResult = result;
    },
    storeDelResult(state, result) {
      state.storeDelResult = result;
    },
    StoreTimeScheduleModifyResult(state, result) {
      state.StoreTimeScheduleModifyResult = result;
    },
    StoreAppraisalModifyResult(state, result) {
      state.StoreAppraisalModifyResult = result;
    },
    storeAppraisalDelResult(state, result) {
      state.storeAppraisalDelResult = result;
    },
    StoreTrafficModifyResult(state, result) {
      state.StoreTrafficModifyResult = result;
    },
    storeTrafficDelResult(state, result) {
      state.storeTrafficDelResult = result;
    },
    storeTrafficDetail(state, result) {
      state.storeTrafficDetail = result;
    },
    storeTrafficChangeAll(state, result) {
      state.storeTrafficChangeAll = result;
    },
    aggregationByDay(state, result) {
      state.aggregationByDay = result;
    },
    aggregationByTime(state, result) {
      state.aggregationByTime = result;
    },
    aggregationByMonth(state, result) {
      state.aggregationByMonth = result;
    },
    getUnitPrice(state, result) {
      state.getUnitPrice = result;
    },
    unexposedBatchProcessing(state, result) {
      state.unexposedBatchProcessing = result;
    },
    storeTrafficDailyReplace(state, result) {
      state.storeTrafficDailyReplace = result;
    },
    WalkInsightDataProcessing(state, result) {
      state.WalkInsightDataProcessing = result;
    },
  },
  actions: {
    async COMPANY_STORE_LIST({ commit }, datas) {
      const { data } = await getCompanyStoreList(datas);
      commit("getCompanyStoreList", data);
    },
    async GET_COMPANY_STORE_DETAIL({ commit }, datas) {
      const { data } = await getCompanyStoreDetail(datas);
      commit("getCompanyStoreDetail", data);
    },
    async COMPANY_STORE_MODIFY({ commit }, datas) {
      const { data } = await companyStoreModify(datas);
      commit("companyStoreModifyResult", data);
    },
    async COMPANY_STORE_ADD({ commit }, datas) {
      const { data } = await companyStoreAdd(datas);
      commit("companyStoreAddResult", data);
    },
    async COMPANY_DEL({ commit }, id) {
      const { data } = await companyDel(id);
      commit("companyDelResult", data);
    },
    async STORE_TIME_SCHEDULE({ commit }, datas) {
      const { data } = await getStoreTimeSchedule(datas);
      commit("getStoreTimeSchedule", data);
    },
    async STORE_TIME_SCHEDULE_ADD({ commit }, datas) {
      const { data } = await storeTimeScheduleAdd(datas);
      commit("StoreTimeScheduleAdd", data);
    },
    async STORE_TIME_SCHEDULE_DETAIL({ commit }, id) {
      const { data } = await getStoreTimeScheduleDetail(id);
      commit("getStoreTimeScheduleDetail", data);
    },
    async STORE_DEL({ commit }, id) {
      const { data } = await storeDel(id);
      commit("storeDelResult", data);
    },
    async STORE_TIME_SCHEDULE_MODIFY({ commit }, datas) {
      const { data } = await StoreTimeScheduleModify(datas);
      commit("StoreTimeScheduleModifyResult", data);
    },
    async STORE_APPRAISAL_LIST({ commit }, datas) {
      const { data } = await getStoreAppraisalList(datas);
      commit("getStoreAppraisalList", data);
    },
    async GET_STORE_APPRAISAL_LIST_DAILY({ commit }, datas) {
      const { data } = await getStoreAppraisalListDaily(datas);
      commit("getStoreAppraisalListDaily", data);
    },
    async GET_STORE_APPRAISAL_LIST_TIME({ commit }, datas) {
      const { data } = await getStoreAppraisalListTime(datas);
      commit("getStoreAppraisalListTime", data);
    },
    async STORE_APPRAISAL_DETAIL({ commit }, id) {
      const { data } = await getStoreAppraisalDetail(id);
      commit("getStoreAppraisalDetail", data);
    },
    async STORE_TRAFFIC_LIST({ commit }, datas) {
      const { data } = await getStoreTrafficList(datas);
      commit("getStoreTrafficList", data);
    },
    async STORE_TRAFFIC_DETAIL({ commit }, id) {
      const { data } = await storeTrafficDetail(id);
      commit("storeTrafficDetail", data);
    },
    async STORE_APPRAISAL_REG({ commit }, datas) {
      const { data } = await StoreAppraisalReg(datas);
      commit("storeAppraisalReg", data);
    },
    async STORE_APPRAISAL_MODIFY({ commit }, datas) {
      const { data } = await StoreAppraisalModify(datas);
      commit("StoreAppraisalModifyResult", data);
    },
    async GET_LEVEL({ commit }, datas) {
      const { data } = await setlevel(datas);
      commit("setlevel", data);
    },
    async STORE_APPRAISAL_DEL({ commit }, id) {
      const { data } = await storeAppraisalDel(id);
      commit("storeAppraisalDelResult", data);
    },
    async STORE_TRAFFIC_REG({ commit }, datas) {
      const { data } = await StoreTrafficlReg(datas);
      commit("StoreTrafficlReg", data);
    },
    async STORE_TRAFFIC_MODIFY({ commit }, datas) {
      const { data } = await StoreTrafficModify(datas);
      commit("StoreTrafficModifyResult", data);
    },
    async STORE_TRAFFIC_DEL({ commit }, id) {
      const { data } = await storeTrafficDel(id);
      commit("storeTrafficDelResult", data);
    },
    async TRAFFIC_FILE_UPLOAD({ commit }, file) {
      const { data } = await strafficFileUpload(file, commit);
      commit("strafficFileUploadResult", data);
    },
    async STORE_TRAFFIC_CHANGE_ALL({ commit }, datas) {
      const { data } = await storeTrafficChangeAll(datas);
      commit("storeTrafficChangeAll", data);
    },
    async AGGREGATION_BY_DAY({ commit }, datas) {
      const { data } = await aggregationByDay(datas);
      commit("aggregationByDay", data);
    },

    async AGGREGATION_BY_TIME({ commit }, datas) {
      const { data } = await aggregationByTime(datas);
      commit("aggregationByTime", data);
    },

    async AGGREGATION_BY_MONTH({ commit }, datas) {
      const { data } = await aggregationByMonth(datas);
      commit("aggregationByMonth", data);
    },
    async GET_UNIT_PRICE({ commit }, datas) {
      const { data } = await getUnitPrice(datas);
      commit("getUnitPrice", data);
    },
    async UNEXPOSED_BATCH_PROCESSING({ commit }) {
      const { data } = await unexposedBatchProcessing();
      commit("unexposedBatchProcessing", data);
    },
    async STORE_TRAFFIC_DAILY_REPLACE({ commit }, datas) {
      const { data } = await storeTrafficDailyReplace(datas);
      commit("storeTrafficDailyReplace", data);
    },
    async WALK_INSIGHT_DATA({ commit }, datas) {
      const { data } = await WalkInsightDataProcessing(datas);
      commit("WalkInsightDataProcessing", data);
    },
  },
};

export default companyStore;
