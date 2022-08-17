import { createInstanceWithAuth } from "../index";

function settlementNoticeList(year) {
  let param = {
    searchYear: year,
  };
  return createInstanceWithAuth("/settlementNotice/list", {}, param, "application/json; charset=utf-8").get();
}

function settlementNoticeDetail(id) {
  return createInstanceWithAuth(`/settlementNotice/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function setSettlementNotice(data) {
  const paramsData = {
    settlementSid: data.settlementSid,
    settlementNoticeYear: data.settlementNoticeYear,
    settlementNoticeTitle: data.settlementNoticeTitle,
    settlementNoticeDoc: data.settlementNoticeDoc,
    settlementNoticeProductDoc: data.settlementNoticeProductDoc,
    settlementNoticeDepositDate: data.settlementNoticeDepositDate,
    settlementNoticePerson: data.settlementNoticePerson,
    settlementNoticeIssueDate: data.settlementNoticeIssueDate,
    settlementNoticeClosingDate: data.settlementNoticeClosingDate,
  };
  return createInstanceWithAuth("/settlementNotice", paramsData, {}, "application/json; charset=utf-8").post();
}

function modifySettlementNotice(data) {
  const paramsData = {
    settlementSid: data.settlementSid,
    settlementNoticeYear: data.settlementNoticeYear,
    settlementNoticeTitle: data.settlementNoticeTitle,
    settlementNoticeDoc: data.settlementNoticeDoc,
    settlementNoticeProductDoc: data.settlementNoticeProductDoc,
    settlementNoticeDepositDate: data.settlementNoticeDepositDate,
    settlementNoticePerson: data.settlementNoticePerson,
    settlementNoticeIssueDate: data.settlementNoticeIssueDate,
    settlementNoticeClosingDate: data.settlementNoticeClosingDate,
  };
  return createInstanceWithAuth(`/settlementNotice/${data.id}`, paramsData, {}, "application/json; charset=utf-8").put();
}

function deleteSettlementNotice(id) {
  return createInstanceWithAuth(`/settlementNotice/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

function getSettlementNoticeTrance(data) {
  const params = {
    size: data.size,
    page: data.page,
    settlementNoticeSid: data.settlementNoticeSid,
    settlementNoticeTransKind: data.settlementNoticeTransKind,
    settlementNoticeTransStatus: data.settlementNoticeTransStatus,
    companySid: data.companySid,
  };
  return createInstanceWithAuth(`/settlementNoticeTrans/list`, {}, params, "application/json; charset=utf-8").get();
}

function setSettlementTrance(data) {
  const paramData = {
    settlementNoticeSid: data.settlementNoticeSid,
    settlementNoticeTransKind: data.settlementNoticeTransKind,
  };
  return createInstanceWithAuth(`/settlementNoticeTrans`, paramData, {}, "application/json; charset=utf-8").post();
}

function getSettlementNoticeTranceDetail(id) {
  return createInstanceWithAuth(`/settlementNoticeTrans/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function cancelSettlementTrance(id) {
  return createInstanceWithAuth(`/settlementNoticeTrans/noticeDestroy/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

function companyPersonUpdate(id) {
  return createInstanceWithAuth(`/settlementNoticeTrans/info/${id}`, {}, {}, "application/json; charset=utf-8").put();
}
const sendMail = (data) => {
  return createInstanceWithAuth(
    `/settlementNoticeTrans/${data.settlementNoticeSid}/mail/${data.sid}`,
    {},
    {},
    "application/json; charset=utf-8"
  ).get();
};
const sendSms = (data) => {
  return createInstanceWithAuth(
    `/settlementNoticeTrans/${data.settlementNoticeSid}/sms/${data.sid}`,
    {},
    {},
    "application/json; charset=utf-8"
  ).get();
};

const SettlementDashboard = () => {
  return createInstanceWithAuth(`/settlement/dashboard`, {}, {}, "application/json; charset=utf-8").get();
};

const getSettlementDashboardYear = (year) => {
  return createInstanceWithAuth(`/settlement/dashboard/${year}`, {}, {}, "application/json; charset=utf-8").get();
};

const getSettlementDashboardMonth = (data) => {
  return createInstanceWithAuth(`/settlement/dashboard/${data.year.substr(0, 4)}/${data.month}`, {}, {}, "application/json; charset=utf-8").get();
};

export {
  getSettlementNoticeTrance,
  settlementNoticeList,
  settlementNoticeDetail,
  setSettlementNotice,
  modifySettlementNotice,
  deleteSettlementNotice,
  setSettlementTrance,
  cancelSettlementTrance,
  getSettlementNoticeTranceDetail,
  companyPersonUpdate,
  sendMail,
  sendSms,
  SettlementDashboard,
  getSettlementDashboardYear,
  getSettlementDashboardMonth,
};
