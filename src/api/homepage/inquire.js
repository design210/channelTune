import { createInstanceWithAuth } from "../index";
function getContactList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    serchInquireStartDate: data.serchInquireStartDate,
    serchInquireEndDate: data.serchInquireEndDate,
    serchInquireKind: data.serchInquireKind,
    serchInquireStatus: data.serchInquireStatus,
  };
  return createInstanceWithAuth("/inquire/list", {}, param, "application/json; charset=utf-8").get();
}
function getcontactDetail(data) {
  return createInstanceWithAuth(`/inquire/${data.inquireSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function contactDelete(id) {
  return createInstanceWithAuth(`/inquire/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function contactModify(data) {
  let paramData = {
    inquireAnswer: data.inquireAnswer,
  };
  return createInstanceWithAuth(`/inquire/${data.inquireSid}`, paramData, {}, "application/json; charset=utf-8").put();
}

function getPartnerContactList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    serchInquireStartDate: data.serchInquireStartDate,
    serchInquireEndDate: data.serchInquireEndDate,
    serchInquireType: data.serchInquireKind,
    serchInquireStatus: data.serchInquireStatus,
  };
  return createInstanceWithAuth("/partnerinquire/list", {}, param, "application/json; charset=utf-8").get();
}
function getPartnerContactDetail(data) {
  return createInstanceWithAuth(`/partnerinquire/${data.inquireSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function contactPartnerDelete(id) {
  return createInstanceWithAuth(`/partnerinquire/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function contactPartnerModify(data) {
  let paramData = {
    inquireAnswer: data.inquireAnswer,
  };
  return createInstanceWithAuth(`/partnerinquire/${data.inquireSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export {
  contactPartnerDelete,
  contactPartnerModify,
  getPartnerContactDetail,
  getPartnerContactList,
  getContactList,
  getcontactDetail,
  contactDelete,
  contactModify,
};
