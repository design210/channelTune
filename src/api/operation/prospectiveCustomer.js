import { createInstanceWithAuth } from "../index";
function getCustomerList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchProspectiveCustomerDate_start: data.searchProspectiveCustomerDate_start,
    searchProspectiveCustomerDate_end: data.searchProspectiveCustomerDate_end,
    searchProspectiveCustomerStoreKind: data.searchProspectiveCustomerStoreKind,
    searchProspectiveCustomerStatus: data.searchProspectiveCustomerStatus,
  };
  return createInstanceWithAuth("/prospectiveCustomer/list", {}, param, "application/json; charset=utf-8").get();
}
function getCustomerDetail(data) {
  return createInstanceWithAuth(`/prospectiveCustomer/${data.prospectiveCustomerSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setCustomer(data) {
  let paramData = {
    prospectiveCustomerDate: data.prospectiveCustomerDate,
    prospectiveCustomerStoreName: data.prospectiveCustomerStoreName,
    prospectiveCustomerStoreKind: data.prospectiveCustomerStoreKind,
    prospectiveCustomerStoreNation: data.prospectiveCustomerStoreNation,
    prospectiveCustomerStoreArea: data.prospectiveCustomerStoreArea,
    companySid: data.companySid,
    companyPersonSid: data.companyPersonSid,
    prospectiveCustomerName: data.prospectiveCustomerName,
    prospectiveCustomerHp: data.prospectiveCustomerHp,
    prospectiveCustomerZipCode: data.prospectiveCustomerZipCode,
    prospectiveCustomerAddress1: data.prospectiveCustomerAddress1,
    prospectiveCustomerAddress2: data.prospectiveCustomerAddress2,
    prospectiveCustomerAnalyzeVolume: data.prospectiveCustomerAnalyzeVolume,
    prospectiveCustomerAnalyzeLocation: data.prospectiveCustomerAnalyzeLocation,
    prospectiveCustomerFloatingPopulation20: data.prospectiveCustomerFloatingPopulation20,
    prospectiveCustomerFloatingPopulation30: data.prospectiveCustomerFloatingPopulation30,
    prospectiveCustomerFloatingPopulation40: data.prospectiveCustomerFloatingPopulation40,
    prospectiveCustomerFloatingPopulation50: data.prospectiveCustomerFloatingPopulation50,
    prospectiveCustomerMemo: data.prospectiveCustomerMemo,
    prospectiveCustomerConsultationMemo: data.prospectiveCustomerConsultationMemo,
    prospectiveCustomerSurveyDate: data.prospectiveCustomerSurveyDate,
    prospectiveCustomerEquipPlanDate: data.prospectiveCustomerEquipPlanDate,
    prospectiveCustomerWindowTintingDate: data.prospectiveCustomerWindowTintingDate,
    prospectiveCustomerConsultationDate: data.prospectiveCustomerConsultationDate,
    prospectiveCustomerEquipCompleteDate: data.prospectiveCustomerEquipCompleteDate,
    prospectiveCustomerStatus: data.prospectiveCustomerStatus,
    prospectiveCustomerStoreKindName: data.prospectiveCustomerStoreKindName,
    prospectiveCustomerStoreNationName: data.prospectiveCustomerStoreNationName,
    prospectiveCustomerStatusName: data.prospectiveCustomerStatusName,
    prospectiveCustomerAnalyzeVolumeName: data.prospectiveCustomerAnalyzeVolumeName,
    prospectiveCustomerAnalyzeLocationName: data.prospectiveCustomerAnalyzeLocationName,
    interbridEmployeeName: data.interbridEmployeeName,
    interbridEmployeeSid: data.interbridEmployeeSid,
    companyName: data.companyName,
    companyPersonName: data.companyPersonName,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth("/prospectiveCustomer", paramData, {}, "application/json; charset=utf-8").post();
}
function customerDelete(id) {
  return createInstanceWithAuth(`/prospectiveCustomer/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function customerModify(data) {
  let paramData = {
    prospectiveCustomerDate: data.prospectiveCustomerDate,
    prospectiveCustomerStoreName: data.prospectiveCustomerStoreName,
    prospectiveCustomerStoreKind: data.prospectiveCustomerStoreKind,
    prospectiveCustomerStoreNation: data.prospectiveCustomerStoreNation,
    prospectiveCustomerStoreArea: data.prospectiveCustomerStoreArea,
    companySid: data.companySid,
    companyPersonSid: data.companyPersonSid,
    prospectiveCustomerName: data.prospectiveCustomerName,
    prospectiveCustomerHp: data.prospectiveCustomerHp,
    prospectiveCustomerZipCode: data.prospectiveCustomerZipCode,
    prospectiveCustomerAddress1: data.prospectiveCustomerAddress1,
    prospectiveCustomerAddress2: data.prospectiveCustomerAddress2,
    prospectiveCustomerAnalyzeVolume: data.prospectiveCustomerAnalyzeVolume,
    prospectiveCustomerAnalyzeLocation: data.prospectiveCustomerAnalyzeLocation,
    prospectiveCustomerFloatingPopulation20: data.prospectiveCustomerFloatingPopulation20,
    prospectiveCustomerFloatingPopulation30: data.prospectiveCustomerFloatingPopulation30,
    prospectiveCustomerFloatingPopulation40: data.prospectiveCustomerFloatingPopulation40,
    prospectiveCustomerFloatingPopulation50: data.prospectiveCustomerFloatingPopulation50,
    prospectiveCustomerMemo: data.prospectiveCustomerMemo,
    prospectiveCustomerConsultationMemo: data.prospectiveCustomerConsultationMemo,
    prospectiveCustomerSurveyDate: data.prospectiveCustomerSurveyDate,
    prospectiveCustomerEquipPlanDate: data.prospectiveCustomerEquipPlanDate,
    prospectiveCustomerWindowTintingDate: data.prospectiveCustomerWindowTintingDate,
    prospectiveCustomerConsultationDate: data.prospectiveCustomerConsultationDate,
    prospectiveCustomerEquipCompleteDate: data.prospectiveCustomerEquipCompleteDate,
    prospectiveCustomerStatus: data.prospectiveCustomerStatus,
    prospectiveCustomerStoreKindName: data.prospectiveCustomerStoreKindName,
    prospectiveCustomerStoreNationName: data.prospectiveCustomerStoreNationName,
    prospectiveCustomerStatusName: data.prospectiveCustomerStatusName,
    prospectiveCustomerAnalyzeVolumeName: data.prospectiveCustomerAnalyzeVolumeName,
    prospectiveCustomerAnalyzeLocationName: data.prospectiveCustomerAnalyzeLocationName,
    interbridEmployeeName: data.interbridEmployeeName,
    interbridEmployeeSid: data.interbridEmployeeSid,
    companyName: data.companyName,
    companyPersonName: data.companyPersonName,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth(`/prospectiveCustomer/${data.prospectiveCustomerSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getCustomerList, getCustomerDetail, customerModify, setCustomer, customerDelete };
