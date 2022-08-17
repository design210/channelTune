import { createInstanceWithAuth } from "../index";
function getManagerList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    companySid: data.companySid,
  };
  return createInstanceWithAuth("/companyPerson/list", {}, param, "application/json; charset=utf-8").get();
}
function getManagerDetail(data) {
  return createInstanceWithAuth(`/companyPerson/${data.companyPersonSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setManager(data) {
  let paramData = {
    companyPersonSid: data.companyPersonSid,
    companySid: data.companySid,
    companyPersonKind: data.companyPersonKind,
    companyPersonKindName: data.companyPersonKindName,
    memberShipSid: data.memberShipSid,
    companyPersonName: data.companyPersonName,
    companyPersonInfo: data.companyPersonInfo,
    companyPersonTel: data.companyPersonTel,
    companyPersonHp: data.companyPersonHp,
    companyPersonEmail: data.companyPersonEmail,
    companyPersonUseFlag: data.companyPersonUseFlag,
    companyAddress: data.companyAddress,
    companyName: data.companyName,
    homepageUserSid: data.homepageUserSid,
    homepageUserName: data.homepageUserName,
  };
  return createInstanceWithAuth("/companyPerson", paramData, {}, "application/json; charset=utf-8").post();
}
function managerDelete(id) {
  return createInstanceWithAuth(`/companyPerson/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function managerModify(data) {
  let paramData = {
    companyPersonSid: data.companyPersonSid,
    companySid: data.companySid,
    companyPersonKind: data.companyPersonKind,
    companyPersonKindName: data.companyPersonKindName,
    memberShipSid: data.memberShipSid,
    companyPersonName: data.companyPersonName,
    companyPersonInfo: data.companyPersonInfo,
    companyPersonTel: data.companyPersonTel,
    companyPersonHp: data.companyPersonHp,
    companyPersonEmail: data.companyPersonEmail,
    companyPersonUseFlag: data.companyPersonUseFlag,
    companyAddress: data.companyAddress,
    companyName: data.companyName,
    homepageUserSid: data.homepageUserSid,
    homepageUserName: data.homepageUserName,
  };
  return createInstanceWithAuth(`/companyPerson/${data.companyPersonSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getManagerList, getManagerDetail, setManager, managerModify, managerDelete };
