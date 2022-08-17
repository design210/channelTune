import { createInstanceWithAuth } from "../index";
function getPositionList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/interbridPosition/list", {}, param, "application/json; charset=utf-8").get();
}
function getPositionDetail(data) {
  return createInstanceWithAuth(`/interbridPosition/${data.interbridPositionSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setPosition(data) {
  let paramData = {
    interbridPositionName: data.interbridPositionName,
    interbridPositionStatus: data.interbridPositionStatus,
  };
  return createInstanceWithAuth("/interbridPosition", paramData, {}, "application/json; charset=utf-8").post();
}
function delPosition(id) {
  return createInstanceWithAuth(`/interbridPosition/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function modifyPosition(data) {
  let paramData = {
    interbridPositionName: data.interbridPositionName,
    interbridPositionStatus: data.interbridPositionStatus,
  };
  return createInstanceWithAuth(`/interbridPosition/${data.interbridPositionSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getPositionList, getPositionDetail, setPosition, delPosition, modifyPosition };
