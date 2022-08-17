import { createInstanceWithAuth } from "../index";
function getProductList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    productKind: data.productKind,
  };
  return createInstanceWithAuth("/advertisingProduct/list", {}, param, "application/json; charset=utf-8").get();
}
function getProductDetail(id) {
  return createInstanceWithAuth(`/advertisingProduct/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function productReg(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  if (data.channeltune1Files.length > 0) {
    data.channeltune1Files.forEach((row) => {
      frm.append("channeltune1Files[]", row);
    });
  }
  if (data.channeltune2Files.length > 0) {
    data.channeltune2Files.forEach((row) => {
      frm.append("channeltune2Files[]", row);
    });
  }
  frm.append("advertisingProductKind", data.advertisingProductKind);
  frm.append("advertisingProductContentKind", data.advertisingProductContentKind);
  frm.append("advertisingProductContentTitle", data.advertisingProductContentTitle);
  frm.append("advertisingProductName", data.advertisingProductName);
  frm.append("advertisingProductSummary", data.advertisingProductSummary);
  frm.append("advertisingProductOptionSummary", data.advertisingProductOptionSummary);
  frm.append("advertisingProductContent", data.advertisingProductContent);
  frm.append("advertisingProductPrice", data.advertisingProductPrice);
  frm.append("advertisingProductCostPrice", data.advertisingProductCostPrice);
  frm.append("advertisingProductPriceRate", data.advertisingProductPriceRate);
  frm.append("advertisingProductPriceUnit", data.advertisingProductPriceUnit);
  frm.append("advertisingProductPriceOpenFlag", data.advertisingProductPriceOpenFlag);
  frm.append("advertisingProductOpenDevice", data.advertisingProductOpenDevice);
  frm.append("advertisingProductStatus", data.advertisingProductStatus);
  frm.append("advertisingProductMainFlag", data.advertisingProductMainFlag);
  return createInstanceWithAuth("/advertisingProduct", frm, {}, "application/json; charset=utf-8").post();
}
function productModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  if (data.channeltune1Files.length > 0) {
    data.channeltune1Files.forEach((row) => {
      frm.append("channeltune1Files[]", row);
    });
  }
  if (data.channeltune2Files.length > 0) {
    data.channeltune2Files.forEach((row) => {
      frm.append("channeltune2Files[]", row);
    });
  }
  frm.append("advertisingProductKind", data.advertisingProductKind);
  frm.append("advertisingProductName", data.advertisingProductName);
  frm.append("advertisingProductContentKind", data.advertisingProductContentKind);
  frm.append("advertisingProductContentTitle", data.advertisingProductContentTitle);
  frm.append("advertisingProductSummary", data.advertisingProductSummary);
  frm.append("advertisingProductOptionSummary", data.advertisingProductOptionSummary);
  frm.append("advertisingProductContent", data.advertisingProductContent);
  frm.append("advertisingProductPrice", data.advertisingProductPrice);
  frm.append("advertisingProductPriceUnit", data.advertisingProductPriceUnit);
  frm.append("advertisingProductCostPrice", data.advertisingProductCostPrice);
  frm.append("advertisingProductPriceRate", data.advertisingProductPriceRate);
  frm.append("advertisingProductPriceOpenFlag", data.advertisingProductPriceOpenFlag);
  frm.append("advertisingProductOpenDevice", data.advertisingProductOpenDevice);
  frm.append("advertisingProductStatus", data.advertisingProductStatus);
  frm.append("advertisingProductMainFlag", data.advertisingProductMainFlag);
  return createInstanceWithAuth(`/advertisingProduct/${data.advertisingProductSid}`, frm, {}, "application/json; charset=utf-8").post();
}
function productDelete(id) {
  return createInstanceWithAuth(`/advertisingProduct/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// advertisingProductTrans
function productTransTransOptionDetail(sid) {
  return createInstanceWithAuth(`/advertisingProductTrans/${sid}`, {}, {}, "application/json; charset=utf-8").get();
}

function getProductTransTransOption(id) {
  return createInstanceWithAuth(`/advertisingProductVideoTrans/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function productTransTransOptionAdd(data) {
  var frm = new FormData();
  frm.append("advertisingProductSid", data.advertisingProductSid);
  frm.append("advertisingProductOptionContentFlag", data.advertisingProductOptionContentFlag);
  frm.append("advertisingProductOptionArea", data.advertisingProductOptionArea);
  frm.append("advertisingProductOptionAreaChoice", data.advertisingProductOptionAreaChoice);
  frm.append("advertisingProductOptionGrade", data.advertisingProductOptionGrade);
  frm.append("advertisingProductOptionGradeChoice", data.advertisingProductOptionGradeChoice);
  frm.append("advertisingProductOptionSlot", data.advertisingProductOptionSlot);
  frm.append("advertisingProductOptionSlotCount", data.advertisingProductOptionSlotCount);
  frm.append("advertisingProductOptionStoreType", data.advertisingProductOptionStoreType);
  frm.append("advertisingProductOptionStoreTypeChoice", data.advertisingProductOptionStoreTypeChoice);
  frm.append("advertisingProductOptionStoreList", data.advertisingProductOptionStoreList);
  frm.append("advertisingProductOptionStoreListChoice", data.advertisingProductOptionStoreListChoice);
  return createInstanceWithAuth("/advertisingProductTrans/option/save", frm, {}, "application/json; charset=utf-8").post();
}

function productTransTransBenefitAdd(data) {
  var frm = new FormData();
  frm.append("advertisingProductSid", data.advertisingProductSid);
  frm.append("advertisingProductBenefitChoice", data.advertisingProductBenefitChoice);
  frm.append("advertisingProductBenefitChoiceVal", data.advertisingProductBenefitChoiceVal);
  frm.append("advertisingProductBenefitChoiceAbove", data.advertisingProductBenefitChoiceAbove);
  frm.append("advertisingProductBenefitKind", data.advertisingProductBenefitKind);
  frm.append("advertisingProductBenefitKindSale", data.advertisingProductBenefitKindSale);
  frm.append("advertisingProductBenefitKindSaleVal", data.advertisingProductBenefitKindSaleVal);
  frm.append("advertisingProductBenefitKindGift", data.advertisingProductBenefitKindGift);
  frm.append("advertisingProductBenefitKindGiftVal", data.advertisingProductBenefitKindGiftVal);
  frm.append("advertisingProductBenefitKindGiftStoreList", data.advertisingProductBenefitKindGiftStoreList);
  return createInstanceWithAuth("/advertisingProductTrans/benefit/save", frm, {}, "application/json; charset=utf-8").post();
}

//광고 영상 상품 옵션 관리
function advertisingProductVideoTransAdd(data, commit) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("advertisingProductSid", data.advertisingProductSid);
  frm.append("advertisingProductVideoShoot", data.advertisingProductVideoShoot);
  frm.append("advertisingProductVideoEditType", data.advertisingProductVideoEditType);
  frm.append("advertisingProductVideoVideoLength", data.advertisingProductVideoVideoLength);
  frm.append("advertisingProductVideoModification", data.advertisingProductVideoModification);
  frm.append("advertisingProductVideoPriceEdit", data.advertisingProductVideoPriceEdit);
  frm.append("advertisingProductVideoAppend", data.advertisingProductVideoAppend);
  frm.append("advertisingProductVideoRefundPolicy", data.advertisingProductVideoRefundPolicy);
  frm.append("advertisingProductVideoShootType", data.advertisingProductVideoShootType);
  frm.append("advertisingProductVideoSoundFlag", data.advertisingProductVideoSoundFlag);

  return createInstanceWithAuth("/advertisingProductVideoTrans/option", frm, {}, "application/json; charset=utf-8", commit).post();
}

//영상상품 샘플관리
function getAdvertisingProductVideoSample(data) {
  let param = {
    size: data.size,
    page: data.page,
    advertisingProductSid: data.advertisingProductSid,
  };
  return createInstanceWithAuth("/advertisingProductVideoSample/list", {}, param, "application/json; charset=utf-8").get();
}

function getAdvertisingProductVideoSampleDetail(id) {
  return createInstanceWithAuth(`/advertisingProductVideoSample/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function advertisingProductVideoSampleadd(data, commit) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("advertisingProductSid", data.advertisingProductSid);
  frm.append("advertisingProductVideoSampleTitle", data.advertisingProductVideoSampleTitle);
  frm.append("advertisingProductVideoSampleClientName", data.advertisingProductVideoSampleClientName);
  return createInstanceWithAuth("/advertisingProductVideoSample", frm, {}, "application/json; charset=utf-8", commit).post();
}

function advertisingProductVideoSampleUpdate(data, commit) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("advertisingProductVideoSampleTitle", data.advertisingProductVideoSampleTitle);
  frm.append("advertisingProductVideoSampleClientName", data.advertisingProductVideoSampleClientName);
  return createInstanceWithAuth(`/advertisingProductVideoSample/${data.id}`, frm, {}, "application/json; charset=utf-8", commit).post();
}

function advertisingProductVideoSampleDelete(id) {
  return createInstanceWithAuth(`/advertisingProductVideoSample/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

export {
  getProductList,
  getProductDetail,
  productReg,
  productModify,
  productDelete,
  productTransTransOptionDetail,
  productTransTransOptionAdd,
  productTransTransBenefitAdd,
  advertisingProductVideoTransAdd,
  getProductTransTransOption,
  getAdvertisingProductVideoSample,
  getAdvertisingProductVideoSampleDetail,
  advertisingProductVideoSampleadd,
  advertisingProductVideoSampleUpdate,
  advertisingProductVideoSampleDelete,
};
