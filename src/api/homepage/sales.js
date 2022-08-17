import { createInstanceWithAuth } from "../index";

// 광고상품 결제 조회
const getBuyPaymentList = (d) => {
  let param = {
    size: d.size,
    page: d.page,
    buyStartDateTime: d.buyStartDateTime,
    buyEndDateTime: d.buyEndDateTime,
    buyStatus: d.buyStatus === "All" ? "" : d.buyStatus,
    searchText: d.searchText,
    buyKind: d.buyKind,
  };
  return createInstanceWithAuth("/buyPaymentList", {}, param, "application/json; charset=utf-8").get();
};

const buyRunStatus = (d) => {
  let param = {
    buyKind: d.buyKind,
    status: d.status,
  };
  return createInstanceWithAuth(`/buyRunStatus/${d.sid}`, param, {}, "application/json; charset=utf-8").put();
};

//광고 상품 상태 조회
const getSalesStatus = (id) => {
  return createInstanceWithAuth(`/buyStatus/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

//광고 상품 상태 변경
const setSalesStatus = (d) => {
  let paramData = {
    buyStatusLogStatus: d.buyStatusLogStatus,
    buyStatusLogStartDateTime: d.buyStatusLogStartDateTime,
    buyStatusLogEndDateTime: d.buyStatusLogEndDateTime,
    buyStatusLogPrice: d.buyStatusLogPrice,
    buyStatusLogEtc: d.buyStatusLogEtc,
    buyStatusLogDepositLimit: d.buyStatusLogDepositLimit,
    buyStatusLogDepositBank: d.buyStatusLogDepositBank,
    buyStatusLogRefundPaymentKind: d.buyStatusLogRefundPaymentKind,
  };
  return createInstanceWithAuth(`/buyStatus/${d.buySid}`, paramData, {}, "application/json; charset=utf-8").put();
};
//광고상품 상세 정보
const setSalesInfoDetail = (id) => {
  return createInstanceWithAuth(`/buyStatus/info/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 광고상품 결제 상세조회
const getBuyPaymentAdvertising = (id) => {
  return createInstanceWithAuth(`/buyPaymentAdvertising/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 영상상품 결제 상세조회
const getBuyPaymentVideo = (id) => {
  return createInstanceWithAuth(`/buyPaymentVideo/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 상품환불 취소 상세
const getBuyRefund = (id) => {
  return createInstanceWithAuth(`/buyRefund/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 상품환불 취소 처리
const buyRefund = (d) => {
  let param = {
    buyRefundPrice: d.buyRefundPrice,
    buyRefundDemandDate: d.buyRefundDemandDate,
    buyRefundDate: d.buyRefundDate,
    buyRefundKind: d.buyRefundKind,
    buyStatus: d.buyStatus,
    buyRefundEtc: d.buyRefundEtc,
  };

  return createInstanceWithAuth(`/buyRefund/${d.buySid}`, param, {}, "application/json; charset=utf-8").put();
};

export {
  setSalesInfoDetail,
  setSalesStatus,
  getSalesStatus,
  getBuyPaymentList,
  getBuyPaymentAdvertising,
  getBuyPaymentVideo,
  getBuyRefund,
  buyRefund,
  buyRunStatus,
};
