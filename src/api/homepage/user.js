import { createInstanceWithAuth } from "../index";
function getUserList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/homepageUser/list", {}, param, "application/json; charset=utf-8").get();
}
function getUserDetail(id) {
  return createInstanceWithAuth(`/homepageUser/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function userDelete(id) {
  return createInstanceWithAuth(`/homepageUser/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function userAdd(data) {
  let paramData = {
    homepageUserKind: data.homepageUserKind,
    homepageUserEmail: data.homepageUserEmail,
    homepageUserName: data.homepageUserName,
    homepageUserConfigPromotion: data.homepageUserConfigPromotion,
    homepageUserConfigSms: data.homepageUserConfigSms,
    homepageUserConfigEmail: data.homepageUserConfigEmail,
    homepageUserConfigPush: data.homepageUserConfigPush,
    homePageUserStatus: data.homePageUserStatus,
    password_confirmation: data.password_confirmation,
    homepageUserTestFlag: data.homepageUserTestFlag,
    password: data.password,
  };
  return createInstanceWithAuth("/homepageUser", paramData, {}, "application/json; charset=utf-8").post();
}
function userModify(data) {
  let paramData = {
    homepageUserSid: data.homepageUserSid,
    homepageUserEmail: data.homepageUserEmail,
    homepageUserName: data.homepageUserName,
    homepageUserConfigPromotion: data.homepageUserConfigPromotion,
    homepageUserConfigSms: data.homepageUserConfigSms,
    homepageUserConfigEmail: data.homepageUserConfigEmail,
    homepageUserConfigPush: data.homepageUserConfigPush,
    homePageUserStatus: data.homePageUserStatus,
    homepageUserTestFlag: data.homepageUserTestFlag,
    password: data.password,
  };
  return createInstanceWithAuth(`/homepageUser/${data.homepageUserSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getUserList, getUserDetail, userAdd, userDelete, userModify };
