import { createInstanceWithAuth } from "../index";
function getEmployeeList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    lastWorkFlag: data.lastWorkFlag,
  };
  return createInstanceWithAuth("/interbridEmployee/list", {}, param, "application/json; charset=utf-8").get();
}
function getEmployeeDetail(data) {
  return createInstanceWithAuth(`/interbridEmployee/${data.interbridEmployeeSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function employeeAdd(data) {
  let paramData = {
    interbridCode: data.interbridCode,
    interbridEmployeeKorName: data.interbridEmployeeKorName,
    interbridEmployeeEngName: data.interbridEmployeeEngName,
    interbridEmployeeHp: data.interbridEmployeeHp,
    interbridEmployeeEmail: data.interbridEmployeeEmail,
    interbridPositionSid: data.interbridPositionSid,
    interbridDepartmentSid: data.interbridDepartmentSid,
    interbridEmployeeStartWorkDate: data.interbridEmployeeStartWorkDate,
    interbridEmployeeLastWorkDate: data.interbridEmployeeLastWorkDate,
  };
  return createInstanceWithAuth("/interbridEmployee", paramData, {}, "application/json; charset=utf-8").post();
}
function employeeDel(id) {
  return createInstanceWithAuth(`/interbridEmployee/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function employeeModify(data) {
  let paramData = {
    interbridCode: data.interbridCode,
    interbridEmployeeKorName: data.interbridEmployeeKorName,
    interbridEmployeeEngName: data.interbridEmployeeEngName,
    interbridEmployeeHp: data.interbridEmployeeHp,
    interbridEmployeeEmail: data.interbridEmployeeEmail,
    interbridPositionSid: data.interbridPositionSid,
    interbridDepartmentSid: data.interbridDepartmentSid,
    interbridEmployeeStartWorkDate: data.interbridEmployeeStartWorkDate,
    interbridEmployeeLastWorkDate: data.interbridEmployeeLastWorkDate,
  };
  return createInstanceWithAuth(`/interbridEmployee/${data.interbridEmployeeSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getEmployeeList, getEmployeeDetail, employeeAdd, employeeDel, employeeModify };
