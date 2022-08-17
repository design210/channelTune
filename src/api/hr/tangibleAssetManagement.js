import { createInstanceWithAuth } from "../index";

const getTangibleAssetsList = (datas) => {
  let param = {
    page: datas.page,
    size: datas.size,
    joinKind: datas.joinKind,
    searchCondition: JSON.stringify(datas.searchCondition),
  };
  return createInstanceWithAuth("/tangibleAssets/list", {}, param, "application/json; charset=utf-8").get();
};

const getTangibleDetail = (data) => {
  return createInstanceWithAuth(`/tangibleAssets/${data.id}?joinKind=${data.joinKind}`, {}, {}, "application/json; charset=utf-8").get();
};

const addTangibleAsset = (data) => {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("tangibleAssetsName", data.tangibleAssetsName);
  frm.append("tangibleAssetsYear", data.tangibleAssetsYear);
  frm.append("tangibleAssetsSerialNo", data.tangibleAssetsSerialNo); //시리얼번호
  frm.append("tangibleAssetsCompany", data.tangibleAssetsCompany); //제조사
  frm.append("tangibleAssetsModelName", data.tangibleAssetsModelName); //모델명
  frm.append("tangibleAssetsDate", data.tangibleAssetsDate); //제조일
  frm.append("tangibleAssetsBuyCompany", data.tangibleAssetsBuyCompany); //구입처
  frm.append("tangibleAssetsPrice", data.tangibleAssetsPrice); //구입가격
  frm.append("tangibleAssetsEtc", data.tangibleAssetsEtc); //비고
  return createInstanceWithAuth("/tangibleAssets", frm, {}, "application/json; charset=utf-8").post();
};

const modifyTangibleAsset = (data) => {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("tangibleAssetsName", data.tangibleAssetsName);
  frm.append("tangibleAssetsSerialNo", data.tangibleAssetsSerialNo);
  frm.append("tangibleAssetsCompany", data.tangibleAssetsCompany);
  frm.append("tangibleAssetsYear", data.tangibleAssetsYear);
  frm.append("tangibleAssetsModelName", data.tangibleAssetsModelName);
  frm.append("tangibleAssetsDate", data.tangibleAssetsDate);
  frm.append("tangibleAssetsBuyCompany", data.tangibleAssetsBuyCompany);
  frm.append("tangibleAssetsPrice", data.tangibleAssetsPrice);
  frm.append("tangibleAssetsEtc", data.tangibleAssetsEtc);
  return createInstanceWithAuth(`/tangibleAssets/${data.id}`, frm, {}, "application/json; charset=utf-8").post();
};

const deleteTangibleAsset = (id) => {
  return createInstanceWithAuth(`/tangibleAssets/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

// 유형 자산 내역
const getTransTangibleAssetsList = (datas) => {
  return createInstanceWithAuth(`/tangibleAssets/${datas}/trans/list`, {}, {}, "application/json; charset=utf-8").get();
};

const detailTransTangibleAssetsList = (datas) => {
  return createInstanceWithAuth(`/tangibleAssets/trans/${datas}`, {}, {}, "application/json; charset=utf-8").get();
};

const addTransTangibleAsset = (data) => {
  const frm = new FormData();
  frm.append("tangibleAssetsTransKind", data.tangibleAssetsTransKind);
  frm.append("tangibleAssetsTransDate", data.tangibleAssetsTransDate);
  frm.append("tangibleAssetsTransEtc", data.tangibleAssetsTransEtc);
  frm.append("tangibleAssetsTransLocation", data.tangibleAssetsTransLocation);
  frm.append("tangibleAssetsTransGiveKind", data.tangibleAssetsTransGiveKind);
  frm.append("tangibleAssetsTransMasterSid", data.tangibleAssetsTransMasterSid);
  frm.append("tangibleAssetsTransSlaveSid", data.tangibleAssetsTransSlaveSid);
  return createInstanceWithAuth(`/tangibleAssets/${data.sid}/trans`, frm, {}, "application/json; charset=utf-8").post();
};

const modifyTransTangibleAsset = (data) => {
  let param = {
    tangibleAssetsTransKind: data.tangibleAssetsTransKind,
    tangibleAssetsTransDate: data.tangibleAssetsTransDate,
    tangibleAssetsTransEtc: data.tangibleAssetsTransEtc,
    tangibleAssetsTransLocation: data.tangibleAssetsTransLocation,
    tangibleAssetsTransGiveKind: data.tangibleAssetsTransGiveKind,
    tangibleAssetsTransMasterSid: data.tangibleAssetsTransMasterSid,
    tangibleAssetsTransSlaveSid: data.tangibleAssetsTransSlaveSid,
  };

  return createInstanceWithAuth(`/tangibleAssets/trans/${data.id}`, param, {}, "application/json; charset=utf-8").put();
};

const deleteTransTangibleAsset = (id) => {
  return createInstanceWithAuth(`/tangibleAssets/trans/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

export {
  getTangibleAssetsList,
  getTangibleDetail,
  addTangibleAsset,
  modifyTangibleAsset,
  deleteTangibleAsset,
  getTransTangibleAssetsList,
  addTransTangibleAsset,
  modifyTransTangibleAsset,
  deleteTransTangibleAsset,
  detailTransTangibleAssetsList,
};
