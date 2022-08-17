import { createInstanceWithAuth } from "../index";
function getPartList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/interbridDepartment/list", {}, param, "application/json; charset=utf-8").get();
}
function getPartDetail(data) {
  return createInstanceWithAuth(`/interbridDepartment/${data.interbridDepartmentSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setPart(data) {
  let paramData = {
    interbridDepartmentName: data.interbridDepartmentName,
    interbridDepartmentStatus: data.interbridDepartmentStatus,
  };
  return createInstanceWithAuth("/interbridDepartment", paramData, {}, "application/json; charset=utf-8").post();
}
function delPart(id) {
  return createInstanceWithAuth(`/interbridDepartment/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function modifyPart(data) {
  let paramData = {
    interbridDepartmentName: data.interbridDepartmentName,
    interbridDepartmentStatus: data.interbridDepartmentStatus,
  };
  return createInstanceWithAuth(`/interbridDepartment/${data.interbridDepartmentSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getPartList, getPartDetail, setPart, delPart, modifyPart };
