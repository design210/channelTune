import { createInstanceWithAuth } from "../index";

function getSettlementList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchYear: data.searchYear,
  };
  return createInstanceWithAuth("/settlement/list", {}, param, "application/json; charset=utf-8").get();
}

function getSettlementDetail(id) {
  return createInstanceWithAuth(`/settlement/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

const addSettlement = data => {
  let param = {
    settlementTitle: data.settlementTitle,
    settlementYear: data.settlementYear,
    settlementMonth: data.settlementMonth,
    settlementFlag: data.settlementFlag,
    settlementFinalFlag: data.settlementFinalFlag,
  };
  return createInstanceWithAuth(`/settlement`, param, {}, "application/json; charset=utf-8").post();
};

const updateSettlement = data => {
  let param = {
    settlementTitle: data.settlementTitle,
  };
  return createInstanceWithAuth(`/settlement/${data.id}`, param, {}, "application/json; charset=utf-8").put();
};

const deleteSettlement = id => {
  return createInstanceWithAuth(`/settlement/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

//정산 처리 조회
const getSettlementData = data => {
  let param = {
    size: data.size,
    page: data.page,
    settlementSid: data.settlementSid,
    companySid: data.companySid,
  };
  return createInstanceWithAuth("/settlementStore", {}, param, "application/json; charset=utf-8").get();
};

const getExcelData = id => {
  return createInstanceWithAuth(`/settlementStore/xlsx?settlementSid=${id}`, {}, {}, "application/json; charset=utf-8").get();
};

const postSettlementStore = data => {
  let frm = new FormData();
  frm.append("settlementYear", data.settlementYear.slice(0, 4));
  frm.append("settlementMonth", data.settlementMonth);
  frm.append("settlementKind", data.settlementKind);
  return createInstanceWithAuth("/settlementStore", frm, {}, "application/json; charset=utf-8").post();
};

const getSettlementDeposit = data => {
  let param = {
    size: data.size,
    page: data.page,
    settlementSid: data.settlementSid,
    companySid: data.companySid,
  };
  return createInstanceWithAuth("/settlementDeposit", {}, param, "application/json; charset=utf-8").get();
};

const settlementDepositDetail = id => {
  return createInstanceWithAuth(`/settlementDeposit/${id}`, {}, {}, "application/json; charset=utf-8").get();
};
const postSettlementDeposit = data => {
  let frm = new FormData();
  frm.append("settlementSid", data.settlementSid);
  frm.append("settlementKind", data.settlementKind);
  return createInstanceWithAuth("/settlementDeposit", frm, {}, "application/json; charset=utf-8").post();
};
const settlementUpdateCheck = data => {
  let param = {
    actionKind: data.action,
    companyPaymentKind: data.companyPaymentKind,
    settlementDepositPrice: data.settlementDepositPrice,
    settlementDepositBank: data.settlementDepositBank,
    settlementDepositBankAccount: data.settlementDepositBankAccount,
    settlementDepositBankAccountHolder: data.settlementDepositBankAccountHolder,
    settlementDepositStatus: data.settlementDepositStatus,
    settlementDepositStatusDoc: data.settlementDepositStatusDoc,
  };
  return createInstanceWithAuth(`/settlementDeposit/${data.id}`, param, {}, "application/json; charset=utf-8").put();
};

export {
  getSettlementList,
  getSettlementDetail,
  addSettlement,
  getExcelData,
  updateSettlement,
  deleteSettlement,
  postSettlementStore,
  getSettlementData,
  getSettlementDeposit,
  postSettlementDeposit,
  settlementDepositDetail,
  settlementUpdateCheck,
};
