import { createInstanceWithAuth } from "../index";

// product
function getProductList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/product/list", {}, param, "application/json; charset=utf-8").get();
}
function getProductDetail(id) {
  return createInstanceWithAuth(`/product/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function productModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("productKind", data.productKind);
  frm.append("productName", data.productName);
  frm.append("productModelName", data.productModelName);
  frm.append("productStandardVoltage", data.productStandardVoltage);
  frm.append("productStandardDoc", data.productStandardDoc);
  frm.append("productRegistrationNumber", data.productRegistrationNumber);
  frm.append("productVersion", data.productVersion);
  frm.append("productStatus", data.productStatus);
  frm.append("productUnit", data.productUnit);
  frm.append("productDescription", data.productDescription);
  return createInstanceWithAuth(`/product/${data.productSid}`, frm, {}, "application/json; charset=utf-8").post();
}
function productAdd(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("productKind", data.productKind);
  frm.append("productName", data.productName);
  frm.append("productModelName", data.productModelName);
  frm.append("productStandardVoltage", data.productStandardVoltage);
  frm.append("productStandardDoc", data.productStandardDoc);
  frm.append("productRegistrationNumber", data.productRegistrationNumber);
  frm.append("productVersion", data.productVersion);
  frm.append("productStatus", data.productStatus);
  frm.append("productUnit", data.productUnit);
  frm.append("productDescription", data.productDescription);
  return createInstanceWithAuth("/product", frm, {}, "application/json; charset=utf-8").post();
}
function productDelete(id) {
  return createInstanceWithAuth(`/product/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// productMaintenance
const getProductMaintenanceList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
    companyStoreSid: d.companyStoreSid,
  };

  return createInstanceWithAuth("/productmaintenance/list", {}, param, "application/json; charset=utf-8").get();
};
const getProductMaintenanceDetail = (id) => {
  return createInstanceWithAuth(`/productmaintenance/${id}`, {}, {}, "application/json; charset=utf-8").get();
};
const getProductMaintenanceAdd = (d) => {
  let f = new FormData();
  if (d.channeltuneFiles.length > 0) {
    d.channeltuneFiles.forEach((row) => {
      f.append("channeltuneFiles[]", row);
    });
  }
  f.append("companyStoreSid", d.companyStoreSid);
  f.append("productMaintenanceKind", d.productMaintenanceKind);
  f.append("productMaintenanceSubKind", d.productMaintenanceSubKind);
  f.append("companySid", d.companySid);
  f.append("companyPersionSid", d.companyPersionSid);
  f.append("productMaintenanceStartDateTime", d.productMaintenanceStartDateTime);
  f.append("productMaintenanceEndDateTime", d.productMaintenanceEndDateTime);
  f.append("productMaintenanceEtc", d.productMaintenanceEtc);
  f.append("productMaintenanceStatus", d.productMaintenanceStatus);
  return createInstanceWithAuth(`/productmaintenance`, f, {}, "application/json; charset=utf-8").post();
};

const getProductMaintenanceUpdate = (d) => {
  let f = new FormData();
  if (d.channeltuneFiles.length > 0) {
    d.channeltuneFiles.forEach((row) => {
      f.append("channeltuneFiles[]", row);
    });
  }
  f.append("companyStoreSid", d.companyStoreSid);
  f.append("productMaintenanceKind", d.productMaintenanceKind);
  f.append("productMaintenanceSubKind", d.productMaintenanceSubKind);
  f.append("companySid", d.companySid);
  f.append("companyPersonSid", d.companyPersonSid);
  f.append("productMaintenanceStartDateTime", d.productMaintenanceStartDateTime);
  f.append("productMaintenanceEndDateTime", d.productMaintenanceEndDateTime);
  f.append("productMaintenanceEtc", d.productMaintenanceEtc);
  f.append("productMaintenanceStatus", d.productMaintenanceStatus);
  return createInstanceWithAuth(`/productmaintenance/${d.productMaintenanceSid}`, f, {}, "application/json; charset=utf-8").post();
};

const getProductMaintenanceDelete = (id) => {
  return createInstanceWithAuth(`/productmaintenance/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

// production
function getProductionList(data) {
  let param = {
    size: data.size,
    page: data.page,
    productSid: data.productSid,
  };
  return createInstanceWithAuth("/production/list", {}, param, "application/json; charset=utf-8").get();
}
function getProductionDetail(id) {
  return createInstanceWithAuth(`/production/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getProductionSerial(data) {
  let param = {
    size: data.size,
    page: data.page,
    productSid: data.productSid,
    productionTransStatus: data.productionTransStatus,
    searchText: data.searchText,
    productionSid: data.productionSid,
  };

  //?size=${param.size}&page=${param.size}&productionSid=${param.id}
  return createInstanceWithAuth(`/production/serial/list`, {}, param, "application/json; charset=utf-8").get();
}
function productionModify(data) {
  return createInstanceWithAuth(`/production/${data.productionSid}`, data, {}, "application/json; charset=utf-8").put();
}
function productionAdd(data) {
  var frm = new FormData();
  frm.append("productSid", data.productSid);
  frm.append("productionCompany", data.productionCompany);
  frm.append("productionLotNumbr", data.productionLotNumbr);
  frm.append("productionDate", data.productionDate);
  frm.append("productionWorksCompany", data.productionWorksCompany);
  frm.append("productionEnteringDate", data.productionEnteringDate);
  frm.append("productionEnteringAmount", data.productionEnteringAmount);
  frm.append("interbridEmployeeSid", data.interbridEmployeeSid);
  frm.append("productionDoc", data.productionDoc);
  return createInstanceWithAuth("/production", frm, {}, "application/json; charset=utf-8").post();
}
function productionDelete(id) {
  return createInstanceWithAuth(`/production/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// productionTest
function getProductionTestList(data) {
  let param = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth(`/productionTest/list/${data.productionTransSid}`, {}, param, "application/json; charset=utf-8").get();
}
function getProductionTestDetail(id) {
  return createInstanceWithAuth(`/productionTest/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function productionTestModify(data) {
  var frm = new FormData();
  frm.append("productionTestDate", data.productionTestDate);
  frm.append("productionTestStatus", data.productionTestStatus);
  frm.append("productionTestDoc", data.productionTestDoc);
  return createInstanceWithAuth(`/productionTest/${data.productionTestSid}`, data, {}, "application/json; charset=utf-8").post();
}
function productionTestAdd(data) {
  var frm = new FormData();
  frm.append("productionTestDate", data.productionTestDate);
  frm.append("productSid", data.productSid);
  frm.append("productionTransSid", data.productionTransSid);
  frm.append("productionTestStatus", data.productionTestStatus);
  frm.append("productionTestDoc", data.productionTestDoc);
  return createInstanceWithAuth("/productionTest", frm, {}, "application/json; charset=utf-8").post();
}
function productionTestDelete(id) {
  return createInstanceWithAuth(`/productionTest/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// productionPrint 라벨 인쇄
function getProductionPrintDetail(id) {
  return createInstanceWithAuth(`/productionPrint/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

// productInstallionStore 스토어 제품설치
function getProductInstallionStoreList(data) {
  let param = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth(
    `/productInstallionStore/list?size=${param.size}&page=${param.page}`,
    {},
    param,
    "application/json; charset=utf-8"
  ).get();
}
function getProductInstallionStoreDetail(id) {
  return createInstanceWithAuth(`/productInstallionStore/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function productInstallionStoreModify(data) {
  return createInstanceWithAuth(`/productInstallionStore/${data.productInstallionStoreSid}`, data, {}, "application/json; charset=utf-8").put();
}
function productInstallionStoreAdd(data) {
  var frm = new FormData();
  frm.append("companyStoreSid", data.companyStoreSid);
  frm.append("productInstallionStoreDate", data.productInstallionStoreDate);
  frm.append("productInstallionStoreProjectCompanySid", data.productInstallionStoreProjectCompanySid);
  frm.append("productInstallionStoreCompanySid", data.productInstallionStoreCompanySid);
  frm.append("productInstallionStoreSuntionCompanySid", data.productInstallionStoreSuntionCompanySid);
  frm.append("productInstallionStoreStatus", data.productInstallionStoreStatus);
  return createInstanceWithAuth("/productInstallionStore", frm, {}, "application/json; charset=utf-8").post();
}
function productInstallionStoreDelete(id) {
  return createInstanceWithAuth(`/productInstallionStore/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// productionInstallionStoreInfo
function getProductInstallionStoreInfoList(data) {
  let param = {
    size: data.size,
    page: data.page,
    productInstallionStoreSid: data.productInstallionStoreSid,
  };
  return createInstanceWithAuth(`/productInstallionStoreInfo/list`, {}, param, "application/json; charset=utf-8").get();
}
function getProductInstallionStoreInfoAdd(data) {
  let param = {
    productInstallionStoreSid: data.productInstallionStoreSid,
    productSid: data.productSid,
    productionTransSid: data.productionTransSid,
  };
  return createInstanceWithAuth(`/productInstallionStoreInfo`, param, {}, "application/json; charset=utf-8").post();
}
function getProductInstallionStoreInfoSave(data) {
  return createInstanceWithAuth(`/productInstallionStoreInfo/save`, data, {}, "application/json; charset=utf-8").put();
}
function getProductInstallionStoreInfoDelete(id) {
  return createInstanceWithAuth(`/productInstallionStoreInfo/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

export {
  // product
  getProductList,
  getProductDetail,
  productAdd,
  productModify,
  productDelete,
  // productMaintenance
  getProductMaintenanceList,
  getProductMaintenanceDetail,
  getProductMaintenanceAdd,
  getProductMaintenanceUpdate,
  getProductMaintenanceDelete,
  // production
  getProductionList,
  getProductionDetail,
  getProductionSerial,
  productionAdd,
  productionModify,
  productionDelete,
  // production
  getProductionTestList,
  getProductionTestDetail,
  productionTestAdd,
  productionTestModify,
  productionTestDelete,
  // productionPrint
  getProductionPrintDetail,
  // productionInstallationStore
  getProductInstallionStoreList,
  getProductInstallionStoreDetail,
  productInstallionStoreModify,
  productInstallionStoreAdd,
  productInstallionStoreDelete,
  // productionInstallionStoreInfo
  getProductInstallionStoreInfoList,
  getProductInstallionStoreInfoAdd,
  getProductInstallionStoreInfoSave,
  getProductInstallionStoreInfoDelete,
};
