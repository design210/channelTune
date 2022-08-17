import { createInstanceWithAuth } from "../index";
function getUserList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/adminUser/list", {}, param, "application/json; charset=utf-8").get();
}
function getUserDetail(data) {
  return createInstanceWithAuth(`/adminUser/${data.adminUserSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setUser(data) {
  let paramData = {
    adminUserName: data.adminUserName,
    adminUserEmail: data.adminUserEmail,
    password: data.password,
    password_confirmation: data.password_confirmation,
    adminUserLevel: data.adminUserLevel,
    adminUserUseFlag: data.adminUserUseFlag,
  };
  return createInstanceWithAuth("/adminUser", paramData, {}, "application/json; charset=utf-8").post();
}
function userDelete(id) {
  return createInstanceWithAuth(`/adminUser/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function userModify(data) {
  let paramData = {
    adminUserName: data.adminUserName,
    adminUserEmail: data.adminUserEmail,
    password: data.password,
    password_confirmation: data.password_confirmation,
    adminUserLevel: data.adminUserLevel,
    adminUserUseFlag: data.adminUserUseFlag,
  };
  return createInstanceWithAuth(`/adminUser/${data.adminUserSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getUserList, getUserDetail, setUser, userDelete, userModify };
