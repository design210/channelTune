import { createInstanceWithAuth } from "../index";
function getStoreZoneAnalysisList(id) {
  return createInstanceWithAuth(`/storeZoneAnalysis/list?companyStoreSid=${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getStoreZoneAnalysisStoreList(datas) {
  let param = {
    size: datas.size,
    page: datas.page,
    searchText: datas.searchText,
    companyStoreStatus: datas.companyStoreStatus,
    standardDate: datas.standardDate,
  };
  return createInstanceWithAuth("/storeZoneAnalysis/storelist", {}, param, "application/json; charset=utf-8").get();
}
function searchAnalysisData(data) {
  let param = {
    size: data.size,
    page: data.page,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth("/storeZoneAnalysis/list", {}, param, "application/json; charset=utf-8").get();
}
function getStoreZoneAnalysisDetail(id) {
  return createInstanceWithAuth(`/storeZoneAnalysis/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getStoreZoneAnalysisAdd(data) {
  let param = {
    companyStoreSid: data.companyStoreSid,
    storeZoneAnalysisStartDate: data.storeZoneAnalysisStartDate,
    storeZoneAnalysisZoneGrade: data.storeZoneAnalysisZoneGrade,
    storeZoneAnalysisLocationGrade: data.storeZoneAnalysisLocationGrade,
    storeZoneAnalysisMalePercent: data.storeZoneAnalysisMalePercent,
    storeZoneAnalysisFemalePercent: data.storeZoneAnalysisFemalePercent,
    storeZoneAnalysisTeenagePercent: data.storeZoneAnalysisTeenagePercent,
    storeZoneAnalysisTwentiesPercent: data.storeZoneAnalysisTwentiesPercent,
    storeZoneAnalysisThirtiesPercent: data.storeZoneAnalysisThirtiesPercent,
    storeZoneAnalysisFortiesPercent: data.storeZoneAnalysisFortiesPercent,
    storeZoneAnalysisFiftiesPercent: data.storeZoneAnalysisFiftiesPercent,
    storeZoneAnalysisOverSixtiesPercent: data.storeZoneAnalysisOverSixtiesPercent,
  };
  return createInstanceWithAuth(`/storeZoneAnalysis`, param, {}, "application/json; charset=utf-8").post();
}
function getStoreZoneAnalysisUpdate(data) {
  let param = {
    storeZoneAnalysisZoneGrade: data.storeZoneAnalysisZoneGrade,
    storeZoneAnalysisLocationGrade: data.storeZoneAnalysisLocationGrade,
    storeZoneAnalysisMalePercent: data.storeZoneAnalysisMalePercent,
    storeZoneAnalysisFemalePercent: data.storeZoneAnalysisFemalePercent,
    storeZoneAnalysisTeenagePercent: data.storeZoneAnalysisTeenagePercent,
    storeZoneAnalysisTwentiesPercent: data.storeZoneAnalysisTwentiesPercent,
    storeZoneAnalysisThirtiesPercent: data.storeZoneAnalysisThirtiesPercent,
    storeZoneAnalysisFortiesPercent: data.storeZoneAnalysisFortiesPercent,
    storeZoneAnalysisFiftiesPercent: data.storeZoneAnalysisFiftiesPercent,
    storeZoneAnalysisOverSixtiesPercent: data.storeZoneAnalysisOverSixtiesPercent,
  };
  return createInstanceWithAuth(`/storeZoneAnalysis/${data.storeZoneAnalysisSid}`, param, {}, "application/json; charset=utf-8").put();
}
function getStoreZoneAnalysisDelete(id) {
  return createInstanceWithAuth(`/storeZoneAnalysis/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
export { getStoreZoneAnalysisList, getStoreZoneAnalysisDetail, getStoreZoneAnalysisAdd, getStoreZoneAnalysisUpdate, getStoreZoneAnalysisDelete, getStoreZoneAnalysisStoreList, searchAnalysisData };
