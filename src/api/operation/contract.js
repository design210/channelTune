import { createInstanceWithAuth } from "../index";
function getContractList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/contract/list", {}, param, "application/json; charset=utf-8").get();
}
function getContractDetail(id) {
  return createInstanceWithAuth(`/contract/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function contractDelete(id) {
  return createInstanceWithAuth(`/contract/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function setContract(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("contractDate", data.contractDate);
  frm.append("contractKind", data.contractKind);
  frm.append("contractTitle", data.contractTitle);
  frm.append("contractPapersNo", data.contractPapersNo);
  frm.append("contractStartDate", data.contractStartDate);
  frm.append("contractEndDate", data.contractEndDate);
  frm.append("contractStatus", data.contractStatus);
  frm.append("contractEtc", data.contractEtc);
  frm.append("companySid", data.companySid);
  if (data.contractKind === "SYS21811B007") {
    frm.append("contractStoreKind", data.contractStoreKind);
    frm.append("contractStore_advertisingRate", data.contractStore_advertisingRate);
    frm.append("contractStore_advertisingRentFee", data.contractStore_advertisingRentFee);
    frm.append("contractStore_salePrice", data.contractStore_salePrice);
    frm.append("contractStore_saleAdvanceDate", data.contractStore_saleAdvanceDate);
    frm.append("contractStore_saleAdvancePayment", data.contractStore_saleAdvancePayment);
    frm.append("contractStore_saleMiddleDate", data.contractStore_saleMiddleDate);
    frm.append("contractStore_saleMiddlePayment", data.contractStore_saleMiddlePayment);
    frm.append("contractStore_saleBalanceDate", data.contractStore_saleBalanceDate);
    frm.append("contractStore_saleBalancePayment", data.contractStore_saleBalancePayment);
    frm.append("contractStore_saleMonthPayDate", data.contractStore_saleMonthPayDate);
    frm.append("contractStore_saleMonthPay", data.contractStore_saleMonthPay);
    frm.append("contractStore_monthRentFee", data.contractStore_monthRentFee);
    frm.append("contractStore_monthRentPayDay", data.contractStore_monthRentPayDay);
    frm.append("contractStore_rentStartDate", data.contractStore_rentStartDate);
    frm.append("contractStore_rentEnddate", data.contractStore_rentEnddate);
    frm.append("contractStore_rentMonths", data.contractStore_rentMonths);
  }
  if (data.contractKind === "SYS21811B009") {
    frm.append("contractStoreAgent_saleRate", data.contractStoreAgent_saleRate);
    frm.append("contractStoreAgent_saleDay1", data.contractStoreAgent_saleDay1);
    frm.append("contractStoreAgent_saleDay2", data.contractStoreAgent_saleDay2);
    frm.append("contractStoreAgent_monthRentRate", data.contractStoreAgent_monthRentRate);
    frm.append("contractStoreAgent_monthRentDay1", data.contractStoreAgent_monthRentDay1);
    frm.append("contractStoreAgent_advertisingRate", data.contractStoreAgent_advertisingRate);
    frm.append("contractStoreAgent_advertisingMonth1", data.contractStoreAgent_advertisingMonth1);
    frm.append("contractStoreAgent_advertisingDay1", data.contractStoreAgent_advertisingDay1);
    frm.append("contractStoreAgent_advertisingMonth2", data.contractStoreAgent_advertisingMonth2);
    frm.append("contractStoreAgent_advertisingDay2", data.contractStoreAgent_advertisingDay2);
  }
  if (data.contractKind === "SYS21811B010") {
    frm.append("contractStoreAgent2022Kind", data.contractStoreAgent2022Kind);
    frm.append("contractStoreAgent2022Salary", data.contractStoreAgent2022Salary);
    frm.append("contractStoreAgent2022AdvertisingRate", data.contractStoreAgent2022AdvertisingRate);
    frm.append("contractStoreAgent2022SaleRate", data.contractStoreAgent2022SaleRate);
    frm.append("contractStoreAgent2022MonthRentRate", data.contractStoreAgent2022MonthRentRate);
    frm.append("contractStoreAgent2022AdvertiserKind", data.contractStoreAgent2022AdvertiserKind);
    frm.append("contractStoreAgent2022AdvertiserArate", data.contractStoreAgent2022AdvertiserArate);
    frm.append("contractStoreAgent2022AdvertiserBrate", data.contractStoreAgent2022AdvertiserBrate);
  }
  if (data.contractKind === "SYS21811B008") {
    frm.append("contractCashagentKind", data.contractCashagentKind);
    frm.append("contractCashagentAccounts", data.contractCashagentAccounts);
    frm.append("contractCashagentRate", data.contractCashagentRate);
  }
  if (data.contractKind === "SYS21811B011") {
    if (data.contractCashmemberKind.length > 0) {
      data.contractCashmemberKind.forEach((row) => {
        frm.append("contractCashmemberKind[]", row);
      });
    }
    if (data.contractCashmemberInvestmentAmount.length > 0) {
      data.contractCashmemberInvestmentAmount.forEach((row) => {
        frm.append("contractCashmemberInvestmentAmount[]", row);
      });
    }
    if (data.contractCashmemberConsecutiveInterest.length > 0) {
      data.contractCashmemberConsecutiveInterest.forEach((row) => {
        frm.append("contractCashmemberConsecutiveInterest[]", row);
      });
    }
    if (data.contractCashmemberInvestmentRate.length > 0) {
      data.contractCashmemberInvestmentRate.forEach((row) => {
        frm.append("contractCashmemberInvestmentRate[]", row);
      });
    }
  }
  if (data.contractKind === "SYS22504B007") {
    frm.append("contractMediaKind", data.contractMediaKind);
    frm.append("contractMediaCount", data.contractMediaCount);
    frm.append("contractMediaFee", data.contractMediaFee);
  }

  return createInstanceWithAuth("/contract", frm, {}, "multipart/form-data").post();
}

function contractModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("contractDate", data.contractDate);
  frm.append("contractKind", data.contractKind);
  frm.append("contractTitle", data.contractTitle);
  frm.append("contractPapersNo", data.contractPapersNo);
  frm.append("contractStartDate", data.contractStartDate);
  frm.append("contractEndDate", data.contractEndDate);
  frm.append("contractEtc", data.contractEtc);
  frm.append("contractStatus", data.contractStatus);
  frm.append("companySid", data.companySid);
  if (data.contractKind === "SYS21811B007") {
    frm.append("contractStoreKind", data.contractStoreKind);
    frm.append("contractStore_advertisingRate", data.contractStore_advertisingRate);
    frm.append("contractStore_advertisingRentFee", data.contractStore_advertisingRentFee);
    frm.append("contractStore_salePrice", data.contractStore_salePrice);
    frm.append("contractStore_saleAdvanceDate", data.contractStore_saleAdvanceDate);
    frm.append("contractStore_saleAdvancePayment", data.contractStore_saleAdvancePayment);
    frm.append("contractStore_saleMiddleDate", data.contractStore_saleMiddleDate);
    frm.append("contractStore_saleMiddlePayment", data.contractStore_saleMiddlePayment);
    frm.append("contractStore_saleBalanceDate", data.contractStore_saleBalanceDate);
    frm.append("contractStore_saleBalancePayment", data.contractStore_saleBalancePayment);
    frm.append("contractStore_saleMonthPayDate", data.contractStore_saleMonthPayDate);
    frm.append("contractStore_saleMonthPay", data.contractStore_saleMonthPay);
    frm.append("contractStore_monthRentFee", data.contractStore_monthRentFee);
    frm.append("contractStore_monthRentPayDay", data.contractStore_monthRentPayDay);
    frm.append("contractStore_rentStartDate", data.contractStore_rentStartDate);
    frm.append("contractStore_rentEnddate", data.contractStore_rentEnddate);
    frm.append("contractStore_rentMonths", data.contractStore_rentMonths);
  }
  if (data.contractKind === "SYS21811B009") {
    frm.append("contractStoreAgent_saleRate", data.contractStoreAgent_saleRate);
    frm.append("contractStoreAgent_saleDay1", data.contractStoreAgent_saleDay1);
    frm.append("contractStoreAgent_saleDay2", data.contractStoreAgent_saleDay2);
    frm.append("contractStoreAgent_monthRentRate", data.contractStoreAgent_monthRentRate);
    frm.append("contractStoreAgent_monthRentDay1", data.contractStoreAgent_monthRentDay1);
    frm.append("contractStoreAgent_advertisingRate", data.contractStoreAgent_advertisingRate);
    frm.append("contractStoreAgent_advertisingMonth1", data.contractStoreAgent_advertisingMonth1);
    frm.append("contractStoreAgent_advertisingDay1", data.contractStoreAgent_advertisingDay1);
    frm.append("contractStoreAgent_advertisingMonth2", data.contractStoreAgent_advertisingMonth2);
    frm.append("contractStoreAgent_advertisingDay2", data.contractStoreAgent_advertisingDay2);
  }

  if (data.contractKind === "SYS21811B010") {
    frm.append("contractStoreAgent2022Kind", data.contractStoreAgent2022Kind);
    frm.append("contractStoreAgent2022Salary", data.contractStoreAgent2022Salary);
    frm.append("contractStoreAgent2022AdvertisingRate", data.contractStoreAgent2022AdvertisingRate);
    frm.append("contractStoreAgent2022SaleRate", data.contractStoreAgent2022SaleRate);
    frm.append("contractStoreAgent2022MonthRentRate", data.contractStoreAgent2022MonthRentRate);
    frm.append("contractStoreAgent2022AdvertiserKind", data.contractStoreAgent2022AdvertiserKind);
    frm.append("contractStoreAgent2022AdvertiserArate", data.contractStoreAgent2022AdvertiserArate);
    frm.append("contractStoreAgent2022AdvertiserBrate", data.contractStoreAgent2022AdvertiserBrate);
  }

  if (data.contractKind === "SYS21811B008") {
    frm.append("contractCashagentKind", data.contractCashagentKind);
    frm.append("contractCashagentAccounts", data.contractCashagentAccounts);
    frm.append("contractCashagentRate", data.contractCashagentRate);
  }

  if (data.contractKind === "SYS21811B011") {
    if (data.contractCashmemberKind.length > 0) {
      data.contractCashmemberKind.forEach((row) => {
        frm.append("contractCashmemberKind[]", row);
      });
    }
    if (data.contractCashmemberInvestmentAmount.length > 0) {
      data.contractCashmemberInvestmentAmount.forEach((row) => {
        frm.append("contractCashmemberInvestmentAmount[]", row);
      });
    }
    if (data.contractCashmemberConsecutiveInterest.length > 0) {
      data.contractCashmemberConsecutiveInterest.forEach((row) => {
        frm.append("contractCashmemberConsecutiveInterest[]", row);
      });
    }
    if (data.contractCashmemberInvestmentRate.length > 0) {
      data.contractCashmemberInvestmentRate.forEach((row) => {
        frm.append("contractCashmemberInvestmentRate[]", row);
      });
    }
  }
  if (data.contractKind === "SYS22504B007") {
    frm.append("contractMediaKind", data.contractMediaKind);
    frm.append("contractMediaCount", data.contractMediaCount);
    frm.append("contractMediaFee", data.contractMediaFee);
  }

  return createInstanceWithAuth(`/contract/${data.contractSid}`, frm, {}, "multipart/form-data").post();
}
function getContractStoreList(id) {
  let param = {
    companyStoreSid: id,
  };
  return createInstanceWithAuth("/contractStoreLink/list", {}, param, "application/json; charset=utf-8").get();
}
function getCompanyContractList(id) {
  let param = {
    companySid: id,
  };
  return createInstanceWithAuth("/contract/list", {}, param, "application/json; charset=utf-8").get();
}
function getHistory(id) {
  let param = {
    companyStoreSid: id,
  };
  return createInstanceWithAuth("/contractStoreLink/history", {}, param, "application/json; charset=utf-8").get();
}
function getContractSelectDetail(id) {
  return createInstanceWithAuth(`/contractStoreLink/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function contractSelectModify(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    contractStoreLinkKind: data.contractStoreLinkKind,
    contractSid: data.contractSid,
    contractStoreLinkStartDate: data.contractStoreLinkStartDate,
    contractStoreLinkEndDate: data.contractStoreLinkEndDate,
    contractStoreLinkType: data.contractStoreLinkType,
  };
  return createInstanceWithAuth(`/contractStoreLink/${data.contractStoreLinkSid}`, paramData, {}, "application/json; charset=utf-8").post();
}
function contractSelectReg(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    contractStoreLinkKind: data.contractStoreLinkKind,
    contractSid: data.contractSid,
    contractStoreLinkStartDate: data.contractStoreLinkStartDate,
    contractStoreLinkEndDate: data.contractStoreLinkEndDate,
    contractStoreLinkType: data.contractStoreLinkType,
  };
  return createInstanceWithAuth("/contractStoreLink", paramData, {}, "application/json; charset=utf-8").post();
}
function contractSelectDelete(id) {
  return createInstanceWithAuth(`/contractStoreLink/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
export {
  getContractList,
  getContractSelectDetail,
  getContractDetail,
  contractDelete,
  setContract,
  contractModify,
  getContractStoreList,
  getCompanyContractList,
  getHistory,
  contractSelectModify,
  contractSelectReg,
  contractSelectDelete,
};
