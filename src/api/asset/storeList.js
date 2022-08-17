import { createInstanceWithAuth } from "../index";

function getStoreList(data) {
  let param = {
    size: data.size,
    page: data.page,
    productInstallionStoreStartDate: data.productInstallionStoreStartDate,
    productInstallionStoreEndDate: data.productInstallionStoreEndDate,
    companySid: data.companySid,
    companyStoreSid: data.companyStoreSid,
    productInstallionStoreStatus: data.productInstallionStoreStatus,
  };
  return createInstanceWithAuth("/storeTuneList/list", {}, param, "application/json; charset=utf-8").get();
}

function getProductStoreList(data) {
  let param = {
    size: data.size,
    page: data.page,
    productKind: data.productKind,
    companySid: data.companySid,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth("/storeTuneList/productlist", {}, param, "application/json; charset=utf-8").get();
}

export { getStoreList, getProductStoreList };
