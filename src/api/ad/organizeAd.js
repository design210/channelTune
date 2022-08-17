import { createInstanceWithAuth } from "../index";

// 광고상품 편성 스토어 검색
const getOrganizeAdStoreList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
    companyStoreSid: d.companyStoreSid,
    companySid: d.companySid,
    zone1: d.zone1,
    zone2: d.zone2,
    businessType: d.businessType,
    companyStoreStatus: d.companyStoreStatus,
    searchText: d.searchText,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/storelist", {}, param, "application/json; charset=utf-8").get();
};

// 광고상품 편성 검색
const getOrganizeAdList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
    companyStoreSid: d.companyStoreSid,
    searchDate: d.searchDate,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/list", {}, param, "application/json; charset=utf-8").get();
};

// 광고상품 편성 상세 조회
const getOrganizeAdDetail = (id) => {
  return createInstanceWithAuth(`/OrganizeAdvertisement/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 광고상품 편성 등록
const organizeAdAdd = (d) => {
  let f = new FormData();
  f.append("companyStoreSid", d.companyStoreSid);
  f.append("buySid", d.buySid);
  f.append("organizeCampaignSid", d.organizeCampaignSid);
  f.append("organizeAdvertisementSlot", d.organizeAdvertisementSlot);
  f.append("organizeAdvertisementStartDate", d.organizeAdvertisementStartDate);
  f.append("organizeAdvertisementEndDate", d.organizeAdvertisementEndDate);
  f.append("organizeAdvertisementStatus", d.organizeAdvertisementStatus);
  f.append("organizeAdvertisementSort", d.organizeAdvertisementSort);
  return createInstanceWithAuth("/OrganizeAdvertisement", f, {}, "application/json; charset=utf-8").post();
};

//광고상품 편성 수정
const organizeAdUpdate = (data) => {
  let param = {
    companyStoreSid: data.companyStoreSid,
    buySid: data.buySid,
    organizeAdvertisementCampaignName: data.organizeAdvertisementCampaignName,
    organizeAdvertisementSlot: data.organizeAdvertisementSlot,
    organizeAdvertisementStartDate: data.organizeAdvertisementStartDate,
    organizeAdvertisementEndDate: data.organizeAdvertisementEndDate,
    organizeAdvertisementStatus: data.organizeAdvertisementStatus,
    organizeAdvertisementSort: data.organizeAdvertisementSort,
  };
  return createInstanceWithAuth(`/OrganizeAdvertisement/${data.organizeAdvertisementSid}`, param, {}, "application/json; charset=utf-8").put();
};

const OrganizeAdvertisementSequence = (data) => {
  let param = {
    organizeAdvertisementSort: data.organizeAdvertisementSort,
    companyStoreSid: data.companyStoreSid,
    organizeAdvertisementStartDate: data.organizeAdvertisementStartDate,
  };
  return createInstanceWithAuth(`/OrganizeAdvertisementSequence`, param, {}, "application/json; charset=utf-8").post();
};

// 광고상품 편성 삭제
const organizeAdDelete = (id) => {
  return createInstanceWithAuth(`/OrganizeAdvertisement/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

const organizeAdChangeSort = (data) => {
  let param = {
    companyStoreSid: data.companyStoreSid,
    fromSort: data.fromSort,
    toSort: data.toSort,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/changeSort", param, {}, "application/json; charset=utf-8").put();
};

// 광고상품 편성 결제 리스트
const getOrganizeAdBuyAdProductList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
    searchText: d.searchText,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/buyAdvertisingProduct/list", param, {}, "application/json; charset=utf-8").get();
};

// 광고상품 편성 결제 스토어 리스트
const getOrganizeAdBuyAdProductStoreList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
  };
  return createInstanceWithAuth(
    `/OrganizeAdvertisement/buyAdvertisingProduct/storeList/${d.buySid}`,
    {},
    param,
    "application/json; charset=utf-8"
  ).get();
};

// 광고상품 편성 등록
const organizeAdBuyAdProductStoreAdd = (d) => {
  let param = {
    buyAdvertisingProductSid: d.buyAdvertisingProductSid,
  };

  return createInstanceWithAuth("/OrganizeAdvertisement/buyAvertisingProductStoreInsert", param, {}, "application/json; charset=utf-8").put();
};
// 광고상품 편성 등록 취소
const organizeAdBuyAdProductStoreDelete = (d) => {
  let param = {
    buyAdvertisingProductSid: d.buyAdvertisingProductSid,
  };

  return createInstanceWithAuth("/OrganizeAdvertisement/buyAvertisingProductStoreDelete", param, {}, "application/json; charset=utf-8").put();
};

export {
  getOrganizeAdStoreList,
  getOrganizeAdList,
  getOrganizeAdDetail,
  organizeAdAdd,
  organizeAdDelete,
  getOrganizeAdBuyAdProductList,
  getOrganizeAdBuyAdProductStoreList,
  organizeAdBuyAdProductStoreAdd,
  organizeAdBuyAdProductStoreDelete,
  organizeAdUpdate,
  OrganizeAdvertisementSequence,
  organizeAdChangeSort,
};
