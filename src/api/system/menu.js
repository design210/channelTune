import { createInstanceWithAuth } from "../index";
function getCompanyList(searchText) {
  let param = {
    menuManagementKind: "SYS21928B004",
    searchText: searchText,
  };
  return createInstanceWithAuth("/menumanagement/memberlist", {}, param, "application/json; charset=utf-8").get();
}
function getCompanyDetail(id) {
  let param = {
    menuManagementKind: "SYS21928B004",
    menuManagementMember: id,
  };
  return createInstanceWithAuth("/menumanagement/membermenulist", {}, param, "application/json; charset=utf-8").get();
}
function setPower(data) {
  let paramData = {
    menuManagementKind: data.menuManagementKind,
    menuManagementMember: data.menuManagementMember,
    menuManagementMenuId: data.menuManagementMenuId,
    menuManagementViewFlag: data.menuManagementViewFlag,
    menuManagementWriteFlag: data.menuManagementWriteFlag,
    menuManagementModifyFlag: data.menuManagementModifyFlag,
    menuManagementDeleteFlag: data.menuManagementDeleteFlag,
  };
  return createInstanceWithAuth("/menumanagement", paramData, {}, "application/json; charset=utf-8").post();
}
function setAllPower(data) {
  let paramData = {
    menuManagementKind: data.menuManagementKind,
    menuManagementMember: data.menuManagementMember,
    menuGroup: data.menuGroup,
    menuManagementViewFlag: data.menuManagementViewFlag,
    menuManagementWriteFlag: data.menuManagementWriteFlag,
    menuManagementModifyFlag: data.menuManagementModifyFlag,
    menuManagementDeleteFlag: data.menuManagementDeleteFlag,
  };
  return createInstanceWithAuth("/menumanagement/macro", paramData, {}, "application/json; charset=utf-8").post();
}
function powerDelete(id) {
  return createInstanceWithAuth(`/menumanagement/SYS21928B004/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

function getAdminList(searchText) {
  let param = {
    menuManagementKind: "SYS21928B009",
    searchText: searchText,
  };
  return createInstanceWithAuth("/menumanagement/memberlist", {}, param, "application/json; charset=utf-8").get();
}
function getAdminDetail(id) {
  let param = {
    menuManagementKind: "SYS21928B009",
    menuManagementMember: id,
  };
  return createInstanceWithAuth("/menumanagement/membermenulist", {}, param, "application/json; charset=utf-8").get();
}
function getChildSysCode(id) {
  return createInstanceWithAuth(`/menumanagement/menulist/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function setAdminPower(data) {
  let paramData = {
    menuManagementKind: data.menuManagementKind,
    menuManagementMember: data.menuManagementMember,
    menuManagementMenuId: data.menuManagementMenuId,
    menuManagementViewFlag: data.menuManagementViewFlag,
    menuManagementWriteFlag: data.menuManagementWriteFlag,
    menuManagementModifyFlag: data.menuManagementModifyFlag,
    menuManagementDeleteFlag: data.menuManagementDeleteFlag,
  };
  return createInstanceWithAuth("/menumanagement", paramData, {}, "application/json; charset=utf-8").post();
}
function powerAdminDelete(id) {
  return createInstanceWithAuth(`/menumanagement/SYS21928B009/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

function dashBoard() {
  return createInstanceWithAuth("/dashboard", {}, {}, "application/json; charset=utf-8").get();
}

function getNumOfMonthRegister(data) {
  let param = {
    year: data.year,
    month: data.month,
  };
  return createInstanceWithAuth("/dashboard/userMonthInfo", {}, param, "application/json; charset=utf-8").get();
}
export {
  getCompanyList,
  getCompanyDetail,
  setPower,
  setAllPower,
  powerDelete,
  getAdminList,
  getAdminDetail,
  setAdminPower,
  powerAdminDelete,
  dashBoard,
  getNumOfMonthRegister,
  getChildSysCode,
};
