import { createInstanceWithAuth } from "../index";
function getLanguageSetList(data) {
  let params = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    languageKind: data.languageKind,
    languageSiteKind: data.languageSiteKind,
    languageTableName: data.languageTableName,
    languageVersion: data.languageVersion,
    languageDocumentCodes: data.languageDocumentCodes,
    languageDeviceKind: data.languageDeviceKind,
    languageTableSid: data.languageTableSid,
    languageCategory: data.languageCategory,
    languageCodeName: data.languageCodeName,
  };
  return createInstanceWithAuth(`/language/list`, {}, params, "application/json; charset=utf-8").get();
}
function getLanguageDetail(id) {
  return createInstanceWithAuth(`/language/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function deleteLanguageDetail(data) {
  let url = "";
  if (data.documentSid === "" || data.documentSid === null) {
    url = `/language/${data.id}`;
  } else {
    url = `/language/${data.id}/${data.documentSid}`;
  }
  return createInstanceWithAuth(url, {}, {}, "application/json; charset=utf-8").delete();
}
function addLanguageSet(data) {
  let params = {
    languageSiteKind: data.languageSiteKind,
    languageKind: data.languageKind,
    languageDeviceKind: data.languageDeviceKind,
    languageTableName: data.languageTableName,
    languageTableSid: data.languageTableSid,
    languageVersion: data.languageVersion,
    languageCategory: data.languageCategory,
    languageCodeName: data.languageCodeName,
    languageDocumentCode: data.languageDocumentCode,
    languageDocument: data.languageDocument,
  };
  return createInstanceWithAuth(`/language`, params, {}, "application/json; charset=utf-8").post();
}

function updateLanguageSet(data) {
  let url = "";
  if (data.documentSid === "" || data.documentSid === null) {
    url = `/language/${data.id}`;
  } else {
    url = `/language/${data.id}/${data.documentSid}`;
  }
  let params = {
    languageSiteKind: data.languageSiteKind,
    languageKind: data.languageKind,
    languageDeviceKind: data.languageDeviceKind,
    languageTableName: data.languageTableName,
    languageTableSid: data.languageTableSid,
    languageVersion: data.languageVersion,
    languageCategory: data.languageCategory,
    languageCodeName: data.languageCodeName,
    languageDocumentCode: data.languageDocumentCode,
    languageDocument: data.languageDocument,
  };
  return createInstanceWithAuth(`${url}`, params, {}, "application/json; charset=utf-8").put();
}

function getLanguageDataType(data) {
  let params = {
    languageKind: data.languageKind,
    languageSiteKind: data.languageSiteKind,
    languageDeviceKind: data.languageDeviceKind,
    languageVersion: data.languageVersion,
    languageDocumentCode: data.languageDocumentCode,
    languageDataType: data.languageDataType,
  };
  return createInstanceWithAuth("/language/data/languageDataTypeView", {}, params, "application/json; charset=utf-8").get();
}

export { getLanguageSetList, getLanguageDetail, addLanguageSet, updateLanguageSet, deleteLanguageDetail, getLanguageDataType };
