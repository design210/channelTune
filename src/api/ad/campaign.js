import { createInstanceWithAuth } from "../index";

//캠페인 리스트 조회
const getCampaignList = data => {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/OrganizeCampaign/list", {}, param, "application/json; charset=utf-8").get();
};

//캠페인 리스트 상세조회
const getCampaignDetail = id => {
  return createInstanceWithAuth(`/OrganizeCampaign/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

//캠페인 등록
const addCampaign = data => {
  let param = {
    organizeCampaignTitle: data.organizeCampaignTitle,
    organizeCampaignType: data.organizeCampaignType,
    organizeCampaignSlot: data.organizeCampaignSlot,
    organizeCampaignSettlementFlag: data.organizeCampaignSettlementFlag,
  };
  return createInstanceWithAuth(`/OrganizeCampaign`, param, {}, "application/json; charset=utf-8").post();
};

//캠페인 수정
const updateCampaign = data => {
  let param = {
    organizeCampaignTitle: data.organizeCampaignTitle,
    organizeCampaignType: data.organizeCampaignType,
    organizeCampaignSlot: data.organizeCampaignSlot,
    organizeCampaignSettlementFlag: data.organizeCampaignSettlementFlag,
  };
  return createInstanceWithAuth(`/OrganizeCampaign/${data.id}`, param, {}, "application/json; charset=utf-8").put();
};

//캠페인 삭제
const deleteCampaign = id => {
  return createInstanceWithAuth(`/OrganizeCampaign/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

// 광고 캠페인별(광고상품 편성 검색)
const getCampaignAdvertisement = data => {
  let param = {
    size: data.size,
    page: data.page,
    organizeCampaignSid: data.organizeCampaignSid,
  };
  return createInstanceWithAuth(`/OrganizeAdvertisement/list`, {}, param, "application/json; charset=utf-8").get();
};

const adCampaignDetail = id => {
  return createInstanceWithAuth(`/OrganizeAdvertisement/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

//광고 상품 편성 일괄처리
const organizeAdvertisementBatch = data => {
  const frm = new FormData();
  if (data.companyStoreSids.length > 0) {
    data.companyStoreSids.forEach(row => {
      frm.append("companyStoreSids[]", row.companyStoreSid);
    });
  }
  frm.append("organizeCampaignSid", data.organizeCampaignSid);
  frm.append("organizeAdvertisementSlot", data.organizeAdvertisementSlot);
  frm.append("organizeAdvertisementSort", data.organizeAdvertisementSort);
  frm.append("organizeAdvertisementStartDate", data.organizeAdvertisementStartDate);
  frm.append("organizeAdvertisementEndDate", data.organizeAdvertisementEndDate);
  frm.append("organizeAdvertisementStatus", data.organizeAdvertisementStatus);
  return createInstanceWithAuth("/OrganizeAdvertisement/batch", frm, {}, "application/json; charset=utf-8").post();
};

const organizeAdvertisementBatchDelete = arr => {
  const txt = arr
    .map(item => {
      return item.organizeAdvertisementSid;
    })
    .join(",");
  return createInstanceWithAuth(`/OrganizeAdvertisement/${txt}`, {}, {}, "application/json; charset=utf-8").delete();
};

const getOrganizeAdvertisementStoreList = data => {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/buyAdvertisingProduct/list", {}, param, "application/json; charset=utf-8").get();
};

const detailOrganizeAdvertisementStoreList = data => {
  let param = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth(`/OrganizeAdvertisement/buyAdvertisingProduct/storeList/${data.id}`, {}, param, "application/json; charset=utf-8").get();
};

const addOrganizeAdvertisementStoreList = data => {
  let param = {
    buyAdvertisingProductSid: data.buyAdvertisingProductSid,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/buyAvertisingProductStoreInsert", param, {}, "application/json; charset=utf-8").put();
};

const deleteOrganizeAdvertisementStoreList = data => {
  let param = {
    buyAdvertisingProductSid: data.buyAdvertisingProductSid,
  };
  return createInstanceWithAuth("/OrganizeAdvertisement/buyAvertisingProductStoreDelete", param, {}, "application/json; charset=utf-8").put();
};
export {
  getCampaignList,
  getCampaignDetail,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignAdvertisement,
  organizeAdvertisementBatch,
  adCampaignDetail,
  organizeAdvertisementBatchDelete,
  getOrganizeAdvertisementStoreList,
  detailOrganizeAdvertisementStoreList,
  addOrganizeAdvertisementStoreList,
  deleteOrganizeAdvertisementStoreList,
};
