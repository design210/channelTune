import { createInstanceWithAuth } from "../index";
//companystore
function getCompanyStoreList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    companySid: data?.companySid,
    storeAppraisalGrade: data?.storeAppraisalGrade,
    companyStoreStatusList: data.companyStoreStatusList, // 스토어 상태값(배열)
    containLinkedBridge: data.containLinkedBridge, // 연결된 스토어 포함여부
  };
  return createInstanceWithAuth("/companyStore/list", {}, param, "application/json; charset=utf-8").get();
}
function getCompanyStoreDetail(id) {
  return createInstanceWithAuth(`/companyStore/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function companyStoreModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("companyStoreName", data.companyStoreName);
  frm.append("companyStoreStatus", data.companyStoreStatus);
  frm.append("companyStoreZone", data.companyStoreZone);
  frm.append("companyStoreCompanySid", data.companyStoreCompanySid);
  frm.append("companyStoreLatitude", data.companyStoreLatitude);
  frm.append("companyStoreLongitude", data.companyStoreLongitude);
  frm.append("companyStoreCompanyName", data.companyStoreCompanyName);
  frm.append("companyStoreDayAvgTraffic", data.companyStoreDayAvgTraffic);
  frm.append("companyStoreZipcode", data.companyStoreZipcode);
  frm.append("companyStoreAddress1", data.companyStoreAddress1);
  frm.append("companyStoreAddress2", data.companyStoreAddress2);
  frm.append("shops_id", data.shops_id);
  frm.append("companyStoreMinSlot", data.companyStoreMinSlot);
  frm.append("companyStoreDayCount", data.companyStoreDayCount);
  frm.append("companyStoreAdministrativeZone1", data.companyStoreAdministrativeZone1);
  frm.append("companyStoreAdministrativeZone2", data.companyStoreAdministrativeZone2);
  frm.append("companyStoreAdministrativeZone3", data.companyStoreAdministrativeZone3);
  frm.append("companyStoreBusinessType", data.companyStoreBusinessType);
  frm.append("companyStoreBillboardSize", data.companyStoreBillboardSize);
  frm.append("companyStoreBillboardHorizontal", data.companyStoreBillboardHorizontal);
  frm.append("companyStoreBillboardVertical", data.companyStoreBillboardVertical);
  frm.append("companyStoreAgentSid", data.companyStoreAgentSid);
  frm.append("companyStoreAgentName", data.companyStoreAgentName);
  frm.append("companyStoreAgentUserName", data.companyStoreAgentUserName);
  frm.append("companyStoreAgentUserHp", data.companyStoreAgentUserHp);
  frm.append("companyStoreMemo", data.companyStoreMemo);
  frm.append("companyStoreWorkSlot", data.companyStoreWorkSlot);
  frm.append("companyStoreCpm", data.companyStoreCpm);
  frm.append("companyStoreTrafficCensorHour", data.companyStoreTrafficCensorHour);
  return createInstanceWithAuth(`/companyStore/${data.companyStoreSid}`, frm, {}, "multipart/form-data").post();
}

function companyStoreAdd(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  data.companyStoreBillboardSize === null || data.companyStoreBillboardSize === ""
    ? frm.append("companyStoreBillboardSize", 0)
    : frm.append("companyStoreBillboardSize", data.companyStoreBillboardSize);
  data.companyStoreBillboardHorizontal === null || data.companyStoreBillboardHorizontal === ""
    ? frm.append("companyStoreBillboardHorizontal", 0)
    : frm.append("companyStoreBillboardHorizontal", data.companyStoreBillboardHorizontal);
  data.companyStoreBillboardVertical === null || data.companyStoreBillboardVertical === ""
    ? frm.append("companyStoreBillboardVertical", 0)
    : frm.append("companyStoreBillboardVertical", data.companyStoreBillboardVertical);
  frm.append("companyStoreName", data.companyStoreName);
  frm.append("companyStoreStatus", data.companyStoreStatus);
  frm.append("companyStoreZone", data.companyStoreZone);
  frm.append("companyStoreCompanySid", data.companyStoreCompanySid);
  frm.append("companyStoreCompanyName", data.companyStoreCompanyName);
  frm.append("companyStoreLatitude", data.companyStoreLatitude);
  frm.append("companyStoreLongitude", data.companyStoreLongitude);
  frm.append("companyStoreDayAvgTraffic", data.companyStoreDayAvgTraffic);
  frm.append("companyStoreZipcode", data.companyStoreZipcode);
  frm.append("companyStoreAddress1", data.companyStoreAddress1);
  frm.append("companyStoreAddress2", data.companyStoreAddress2);
  frm.append("companyStoreAdministrativeZone1", data.companyStoreAdministrativeZone1);
  frm.append("companyStoreAdministrativeZone2", data.companyStoreAdministrativeZone2);
  frm.append("companyStoreAdministrativeZone3", data.companyStoreAdministrativeZone3);
  frm.append("companyStoreBusinessType", data.companyStoreBusinessType);
  frm.append("companyStoreAgentSid", data.companyStoreAgentSid);
  frm.append("companyStoreAgentName", data.companyStoreAgentName);
  frm.append("companyStoreAgentUserName", data.companyStoreAgentUserName);
  frm.append("companyStoreAgentUserHp", data.companyStoreAgentUserHp);
  frm.append("shops_id", data.shops_id);
  frm.append("companyStoreMinSlot", data.companyStoreMinSlot);
  frm.append("companyStoreDayCount", data.companyStoreDayCount);
  frm.append("companyStoreMemo", data.companyStoreMemo);
  frm.append("companyStoreWorkSlot", data.companyStoreWorkSlot);
  frm.append("companyStoreCpm", data.companyStoreCpm);
  frm.append("companyStoreTrafficCensorHour", data.companyStoreTrafficCensorHour);
  return createInstanceWithAuth(`/companyStore`, frm, {}, "multipart/form-data").post();
}
function companyDel(id) {
  return createInstanceWithAuth(`/companyStore/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

//timeSchedule
function getStoreTimeSchedule(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchCompanyStoreSid: data.searchCompanyStoreSid,
    searchStartDate: data.searchStartDate,
    searchEndDate: data.searchEndDate,
  };
  return createInstanceWithAuth("/storeTimeSchedule/list", {}, param, "application/json; charset=utf-8").get();
}
function storeTimeScheduleAdd(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    storeTimeScheduleDate: data.storeTimeScheduleDate,
    storeTimeSchedule00: data.storeTimeSchedule00,
    storeTimeSchedule01: data.storeTimeSchedule01,
    storeTimeSchedule02: data.storeTimeSchedule02,
    storeTimeSchedule03: data.storeTimeSchedule03,
    storeTimeSchedule04: data.storeTimeSchedule04,
    storeTimeSchedule05: data.storeTimeSchedule05,
    storeTimeSchedule06: data.storeTimeSchedule06,
    storeTimeSchedule07: data.storeTimeSchedule07,
    storeTimeSchedule08: data.storeTimeSchedule08,
    storeTimeSchedule09: data.storeTimeSchedule09,
    storeTimeSchedule10: data.storeTimeSchedule10,
    storeTimeSchedule11: data.storeTimeSchedule11,
    storeTimeSchedule12: data.storeTimeSchedule12,
    storeTimeSchedule13: data.storeTimeSchedule13,
    storeTimeSchedule14: data.storeTimeSchedule14,
    storeTimeSchedule15: data.storeTimeSchedule15,
    storeTimeSchedule16: data.storeTimeSchedule16,
    storeTimeSchedule17: data.storeTimeSchedule17,
    storeTimeSchedule18: data.storeTimeSchedule18,
    storeTimeSchedule19: data.storeTimeSchedule19,
    storeTimeSchedule20: data.storeTimeSchedule20,
    storeTimeSchedule21: data.storeTimeSchedule21,
    storeTimeSchedule22: data.storeTimeSchedule22,
    storeTimeSchedule23: data.storeTimeSchedule23,
  };
  return createInstanceWithAuth("/storeTimeSchedule", paramData, {}, "application/json; charset=utf-8").post();
}
function getStoreTimeScheduleDetail(id) {
  return createInstanceWithAuth(`/storeTimeSchedule/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function storeDel(id) {
  return createInstanceWithAuth(`/storeTimeSchedule/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function StoreTimeScheduleModify(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    storeTimeScheduleDate: data.storeTimeScheduleDate,
    storeTimeSchedule00: data.storeTimeSchedule00,
    storeTimeSchedule01: data.storeTimeSchedule01,
    storeTimeSchedule02: data.storeTimeSchedule02,
    storeTimeSchedule03: data.storeTimeSchedule03,
    storeTimeSchedule04: data.storeTimeSchedule04,
    storeTimeSchedule05: data.storeTimeSchedule05,
    storeTimeSchedule06: data.storeTimeSchedule06,
    storeTimeSchedule07: data.storeTimeSchedule07,
    storeTimeSchedule08: data.storeTimeSchedule08,
    storeTimeSchedule09: data.storeTimeSchedule09,
    storeTimeSchedule10: data.storeTimeSchedule10,
    storeTimeSchedule11: data.storeTimeSchedule11,
    storeTimeSchedule12: data.storeTimeSchedule12,
    storeTimeSchedule13: data.storeTimeSchedule13,
    storeTimeSchedule14: data.storeTimeSchedule14,
    storeTimeSchedule15: data.storeTimeSchedule15,
    storeTimeSchedule16: data.storeTimeSchedule16,
    storeTimeSchedule17: data.storeTimeSchedule17,
    storeTimeSchedule18: data.storeTimeSchedule18,
    storeTimeSchedule19: data.storeTimeSchedule19,
    storeTimeSchedule20: data.storeTimeSchedule20,
    storeTimeSchedule21: data.storeTimeSchedule21,
    storeTimeSchedule22: data.storeTimeSchedule22,
    storeTimeSchedule23: data.storeTimeSchedule23,
  };
  return createInstanceWithAuth(`/storeTimeSchedule/${data.id}`, paramData, {}, "application/json; charset=utf-8").put();
}

//storeAppraisal

function getStoreAppraisalList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchCompanyStoreSid: data.searchCompanyStoreSid,
    searchYear: data.searchYear,
    searchMonth: data.searchMonth,
  };
  return createInstanceWithAuth("/storeAppraisal/list", {}, param, "application/json; charset=utf-8").get();
}

function getStoreAppraisalListDaily(data) {
  let param = {
    companyStoreSid: data.companyStoreSid,
    month: data.month,
    year: data.year,
  };
  return createInstanceWithAuth("/storeAppraisal/list/daily", {}, param, "application/json; charset=utf-8").get();
}

function getStoreAppraisalListTime(data) {
  let param = {
    companyStoreSid: data.companyStoreSid,
    searchDate: data.searchDate,
  };
  return createInstanceWithAuth("/storeAppraisal/list/timeset", {}, param, "application/json; charset=utf-8").get();
}

function getStoreAppraisalDetail(id) {
  return createInstanceWithAuth(`/storeAppraisal/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function StoreAppraisalReg(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    storeAppraisalYear: data.storeAppraisalYear,
    storeAppraisalMonth: data.storeAppraisalMonth,
    storeAppraisalTrafficAvg: data.storeAppraisalTrafficAvg,
    storeAppraisalStayAvg: data.storeAppraisalStayAvg,
    storeAppraisalGrade: data.storeAppraisalGrade,
  };
  return createInstanceWithAuth("/storeAppraisal", paramData, {}, "application/json; charset=utf-8").post();
}
function StoreAppraisalModify(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    storeAppraisalYear: data.storeAppraisalYear,
    storeAppraisalMonth: data.storeAppraisalMonth,
    storeAppraisalTrafficAvg: data.storeAppraisalTrafficAvg,
    storeAppraisalStayAvg: data.storeAppraisalStayAvg,
    storeAppraisalGrade: data.storeAppraisalGrade,
  };
  return createInstanceWithAuth(`/storeAppraisal/${data.storeAppraisalSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
function setlevel(data) {
  let param = {
    storeAppraisalTrafficAvg: data.storeAppraisalTrafficAvg,
    storeAppraisalStayAvg: data.storeAppraisalStayAvg,
  };
  return createInstanceWithAuth("/storeAppraisal/grade", {}, param, "application/json; charset=utf-8").get();
}
function storeAppraisalDel(id) {
  return createInstanceWithAuth(`/storeAppraisal/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

//storeTrafficDaily
function getStoreTrafficList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchYear: data.searchYear,
    searchMonth: data.searchMonth,
    searchKind: data.searchKind,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth("/storeTrafficDaily/list", {}, param, "application/json; charset=utf-8").get();
}

function storeTrafficDetail(id) {
  return createInstanceWithAuth(`/storeTrafficDaily/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function StoreTrafficlReg(data) {
  const frm = new FormData();
  frm.append("companyStoreSid", data.companyStoreSid);
  frm.append("companyStoreName", data.companyStoreName);
  frm.append("storeTrafficDailyDate", data.storeTrafficDailyDate);
  frm.append("storeTrafficDailyHour", data.storeTrafficDailyHour);
  frm.append("storeTrafficDailyTrafficCount", data.storeTrafficDailyTrafficCount);
  frm.append("storeTrafficDailyVisitCount", data.storeTrafficDailyVisitCount);
  frm.append("storeTrafficDailyVisitRatio", data.storeTrafficDailyVisitRatio);
  frm.append("storeTrafficDaillyStayCount", data.storeTrafficDaillyStayCount);
  frm.append("storeTrafficDailyStayRatio", data.storeTrafficDailyStayRatio);
  frm.append("storeTrafficDailyStayAvg", data.storeTrafficDailyStayAvg);
  return createInstanceWithAuth("/storeTrafficDaily", frm, {}, "multipart/form-data").post();
}

function StoreTrafficModify(data) {
  const frm = new FormData();
  frm.append("companyStoreSid", data.companyStoreSid);
  frm.append("companyStoreName", data.companyStoreName);
  frm.append("storeTrafficDailyDate", data.storeTrafficDailyDate);
  frm.append("storeTrafficDailyHour", data.storeTrafficDailyHour);
  frm.append("storeTrafficDailyTrafficCount", data.storeTrafficDailyTrafficCount);
  frm.append("storeTrafficDailyVisitCount", data.storeTrafficDailyVisitCount);
  frm.append("storeTrafficDailyVisitRatio", data.storeTrafficDailyVisitRatio);
  frm.append("storeTrafficDaillyStayCount", data.storeTrafficDaillyStayCount);
  frm.append("storeTrafficDailyStayRatio", data.storeTrafficDailyStayRatio);
  frm.append("storeTrafficDailyStayAvg", data.storeTrafficDailyStayAvg);
  return createInstanceWithAuth(`/storeTrafficDaily/${data.storeTrafficDailySid}`, frm, {}, "application/json; charset=utf-8").put();
}
function storeTrafficDel(id) {
  return createInstanceWithAuth(`/storeTrafficDaily/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function storeTrafficChangeAll(data) {
  let params = {
    searchCompanyStoreSid: data.searchCompanyStoreSid,
    searchCompanyStoreName: data.searchCompanyStoreName,
    storeTrafficDailyYear: data.storeTrafficDailyYear,
    storeTrafficDailyMonth: data.storeTrafficDailyMonth,
  };
  return createInstanceWithAuth(`/storeTrafficDaily/storeName/change`, params, {}, "application/json; charset=utf-8").put();
}

function strafficFileUpload(data, commit) {
  var frm = new FormData();
  frm.append("excelFile", data.channeltuneFiles);
  return createInstanceWithAuth("/storeTrafficDaily/importExcel", frm, {}, "multipart/form-data", commit).post();
}

//월별 스토어 트래픽 집계
function aggregationByMonth(data) {
  var frm = new FormData();
  frm.append("storeAppraisalYear", data.storeAppraisalYear);
  frm.append("storeAppraisalMonth", data.storeAppraisalMonth);
  frm.append("companyStoreSid", data.companyStoreSid);
  return createInstanceWithAuth("/storeAppraisal/average", frm, {}, "multipart/form-data").post();
}
function aggregationByDay(data) {
  var frm = new FormData();
  frm.append("storeAppraisalYear", data.storeAppraisalYear);
  frm.append("storeAppraisalMonth", data.storeAppraisalMonth);
  frm.append("companyStoreSid", data.companyStoreSid);
  return createInstanceWithAuth("/storeAppraisal/storedailysum", frm, {}, "multipart/form-data").post();
}
function aggregationByTime(data) {
  var frm = new FormData();
  frm.append("storeAppraisalYear", data.storeAppraisalYear);
  frm.append("storeAppraisalMonth", data.storeAppraisalMonth);
  frm.append("companyStoreSid", data.companyStoreSid);
  return createInstanceWithAuth("/storeAppraisal/storetimesetsum", frm, {}, "multipart/form-data").post();
}

//월별 스토어 광고 단가
function getUnitPrice(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    companySid: data.companySid,
  };
  return createInstanceWithAuth(`/companyStore/price/${data.year}/${data.month}`, {}, param, "application/json; charset=utf-8").get();
}

//스토어 노출 불가 일괄처리
function unexposedBatchProcessing() {
  return createInstanceWithAuth(`/companyStore/companyStoreServiceCheck`, {}, {}, "application/json; charset=utf-8").get();
}

function storeTrafficDailyReplace(data) {
  var frm = new URLSearchParams();
  frm.append("originDate", data.originDate);
  frm.append("targetDate", data.targetDate);
  frm.append("allStore", data.allStore);
  frm.append("targetStore", data.targetStore);

  return createInstanceWithAuth("/storeTrafficDaily/replacement/byDate", frm, {}, "application/x-www-form-urlencoded").put();
}
function WalkInsightDataProcessing(data) {
  let params = {
    searchDate: data.searchDate,
  };
  if (data.total === "Y") {
    params["companyStoreSid"] = "";
  } else {
    params["companyStoreSid"] = data.companyStoreSid;
  }
  return createInstanceWithAuth(`/storeTrafficDaily/wi/trafficInsert`, params, {}, "application/json; charset=utf-8").put();
}
export {
  storeTrafficDel,
  setlevel,
  getUnitPrice,
  StoreAppraisalModify,
  StoreTimeScheduleModify,
  getStoreTimeScheduleDetail,
  getCompanyStoreList,
  getCompanyStoreDetail,
  companyStoreModify,
  companyStoreAdd,
  companyDel,
  getStoreTimeSchedule,
  storeTimeScheduleAdd,
  storeDel,
  getStoreAppraisalList,
  getStoreAppraisalDetail,
  getStoreTrafficList,
  StoreAppraisalReg,
  storeAppraisalDel,
  StoreTrafficlReg,
  StoreTrafficModify,
  strafficFileUpload,
  aggregationByDay,
  aggregationByTime,
  aggregationByMonth,
  storeTrafficDetail,
  storeTrafficChangeAll,
  getStoreAppraisalListDaily,
  getStoreAppraisalListTime,
  unexposedBatchProcessing,
  storeTrafficDailyReplace,
  WalkInsightDataProcessing,
};
