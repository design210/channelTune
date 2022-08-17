import { createInstanceWithAuth } from "../index";

// 광고주 검색 리스트
const getAdvertiserList = d => {
  let param = {
    size: d.size,
    page: d.page,
    searchText: d.searchText,
  };
  return createInstanceWithAuth("/userAdvertiser/list", {}, param, "application/json; charset=utf-8").get();
};

// 광고주 상세검색
const getAdvertiserDetail = id => {
  return createInstanceWithAuth(`/userAdvertiser/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 광고주 추가
const advertiserAdd = data => {
  let frm = new FormData();
  frm.append("homepageUserSid", data.homepageUserSid);
  frm.append("userAdvertiserUserHp", data.userAdvertiserUserHp);
  frm.append("userAdvertiserLocalKind", data.userAdvertiserLocalKind);
  frm.append("userAdvertiserCompanyCrNum", data.userAdvertiserCompanyCrNum);
  frm.append("userAdvertiserCompanyName", data.userAdvertiserCompanyName);
  frm.append("userAdvertiserCompanyCeo", data.userAdvertiserCompanyCeo);
  frm.append("userAdvertiserCompanyZipCode", data.userAdvertiserCompanyZipCode);
  frm.append("userAdvertiserCompanyAddress1", data.userAdvertiserCompanyAddress1);
  frm.append("userAdvertiserCompanyAddress2", data.userAdvertiserCompanyAddress2);
  frm.append("userAdvertiserCompanyTypeOfBusiness", data.userAdvertiserCompanyTypeOfBusiness);
  frm.append("userAdvertiserCompanyIndustries", data.userAdvertiserCompanyIndustries);
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  return createInstanceWithAuth(`/userAdvertiser`, frm, {}, "application/json; charset=utf-8").post();
};

// 광고주 수정
const advertiserUpdate = data => {
  let frm = new FormData();
  frm.append("homepageUserSid", data.homepageUserSid);
  frm.append("userAdvertiserUserHp", data.userAdvertiserUserHp);
  frm.append("userAdvertiserLocalKind", data.userAdvertiserLocalKind);
  frm.append("userAdvertiserCompanyCrNum", data.userAdvertiserCompanyCrNum);
  frm.append("userAdvertiserCompanyName", data.userAdvertiserCompanyName);
  frm.append("userAdvertiserCompanyCeo", data.userAdvertiserCompanyCeo);
  frm.append("userAdvertiserCompanyZipCode", data.userAdvertiserCompanyZipCode);
  frm.append("userAdvertiserCompanyAddress1", data.userAdvertiserCompanyAddress1);
  frm.append("userAdvertiserCompanyAddress2", data.userAdvertiserCompanyAddress2);
  frm.append("userAdvertiserCompanyTypeOfBusiness", data.userAdvertiserCompanyTypeOfBusiness);
  frm.append("userAdvertiserCompanyIndustries", data.userAdvertiserCompanyIndustries);
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  return createInstanceWithAuth(`/userAdvertiser/${data.userAdvertiserSid}`, frm, {}, "application/json; charset=utf-8").post();
};

// 광고주 정보 삭제
const advertiserDelete = id => {
  return createInstanceWithAuth(`/userAdvertiser/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

const getContractUserAdvertiserLinkList = id => {
  let param = {
    userAdvertiserSid: id,
  };

  return createInstanceWithAuth("/contractUserAdvertiserLink/list", {}, param, "application/json; charset=utf-8").get();
};

const getContractUserAdvertiserLinkDetail = id => {
  return createInstanceWithAuth(`/contractUserAdvertiserLink/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

const getContractUserAdvertiserLinkHistory = id => {
  let param = {
    userAdvertiserSid: id,
  };

  return createInstanceWithAuth("/contractUserAdvertiserLink/history", {}, param, "application/json; charset=utf-8").get();
};

const getContractUserAdvertiserLinkAdd = data => {
  let f = new FormData();
  f.append("userAdvertiserSid", data.userAdvertiserSid);
  f.append("contractUserAdvertiserLinkKind", data.contractUserAdvertiserLinkKind);
  f.append("contractUserAdvertiserLinkStartDate", data.contractUserAdvertiserLinkStartDate);
  f.append("contractUserAdvertiserLinkEndDate", data.contractUserAdvertiserLinkEndDate);
  f.append("companySid", data.companySid);
  f.append("contractSid", data.contractSid);
  return createInstanceWithAuth("/contractUserAdvertiserLink", f, {}, "application/json; charset=utf-8").post();
};

const getContractUserAdvertiserLinkUpdate = data => {
  let f = new FormData();
  f.append("userAdvertiserSid", data.userAdvertiserSid);
  f.append("contractUserAdvertiserLinkKind", data.contractUserAdvertiserLinkKind);
  f.append("contractUserAdvertiserLinkStartDate", data.contractUserAdvertiserLinkStartDate);
  f.append("contractUserAdvertiserLinkEndDate", data.contractUserAdvertiserLinkEndDate);
  f.append("companySid", data.companySid);
  f.append("contractSid", data.contractSid);
  return createInstanceWithAuth(`/contractUserAdvertiserLink/${data.contractUserAdvertiserLinkSid}`, f, {}, "application/json; charset=utf-8").post();
};

const getContractUserAdvertiserLinkDelete = id => {
  return createInstanceWithAuth(`/contractUserAdvertiserLink/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

export {
  getAdvertiserList,
  getAdvertiserDetail,
  advertiserAdd,
  advertiserUpdate,
  advertiserDelete,
  getContractUserAdvertiserLinkList,
  getContractUserAdvertiserLinkDetail,
  getContractUserAdvertiserLinkHistory,
  getContractUserAdvertiserLinkAdd,
  getContractUserAdvertiserLinkUpdate,
  getContractUserAdvertiserLinkDelete,
};
