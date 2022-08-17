import { createInstanceWithAuth } from "../index";
function getEstimateList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/estimate/list", {}, param, "application/json; charset=utf-8").get();
}
function getEstimateDetail(id) {
  return createInstanceWithAuth(`/estimate/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function estimateAdd(data) {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("userAdvertiserSid", data.userAdvertiserSid);
  frm.append("estimatePrice", data.estimatePrice);
  frm.append("estimateStatus", data.estimateStatus);
  frm.append("estimateDescription", data.estimateDescription);
  frm.append("estimateExposureCountCode", data.estimateExposureCountCode);
  frm.append("estimateExposureCount", data.estimateExposureCount);
  frm.append("estimateExposureAccount", data.estimateExposureAccount);
  frm.append("estimateExposureRate", data.estimateExposureRate);
  frm.append("estimateExposureContentFlag", data.estimateExposureContentFlag);
  frm.append("estimateExposureContentLength", data.estimateExposureContentLength);
  frm.append("estimateExposureCategoryCode", data.estimateExposureCategoryCode);
  frm.append("estimateExposureMonth", data.estimateExposureMonth);
  frm.append("estimateExposureStartDate", data.estimateExposureStartDate);
  frm.append("estimateExposureEndDate", data.estimateExposureEndDate);
  frm.append("estimateExposureTotalCount", data.estimateExposureTotalCount);

  return createInstanceWithAuth(`/estimate`, frm, {}, "application/json; charset=utf-8").post();
}

function estimateModify(data) {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("userAdvertiserSid", data.userAdvertiserSid);
  frm.append("estimatePrice", data.estimatePrice);
  frm.append("estimateStatus", data.estimateStatus);
  frm.append("estimateDescription", data.estimateDescription);
  frm.append("estimateExposureCountCode", data.estimateExposureCountCode);
  frm.append("estimateExposureCount", data.estimateExposureCount);
  frm.append("estimateExposureAccount", data.estimateExposureAccount);
  frm.append("estimateExposureRate", data.estimateExposureRate);
  frm.append("estimateExposureContentFlag", data.estimateExposureContentFlag);
  frm.append("estimateExposureContentLength", data.estimateExposureContentLength);
  frm.append("estimateExposureCategoryCode", data.estimateExposureCategoryCode);
  frm.append("estimateExposureMonth", data.estimateExposureMonth);
  frm.append("estimateExposureStartDate", data.estimateExposureStartDate);
  frm.append("estimateExposureEndDate", data.estimateExposureEndDate);
  frm.append("estimateExposureTotalCount", data.estimateExposureTotalCount);

  return createInstanceWithAuth(`/estimate/${data.estimateSid}`, frm, {}, "application/json; charset=utf-8").post();
}

function estimateDelete(id) {
  return createInstanceWithAuth(`/estimate/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
export { getEstimateList, getEstimateDetail, estimateAdd, estimateModify, estimateDelete };
