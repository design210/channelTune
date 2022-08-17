import VueCookies from "vue-cookies";
//생성
function saveAccessTokenCookie(value) {
  VueCookies.set("accessToken", value, "0");
}
function adminUserSidCookie(value) {
  VueCookies.set("adminUserSid", value, "0");
}
function adminUserNameCookie(value) {
  VueCookies.set("adminUserName", value, "0");
}
function uiCodeCookie(value) {
  VueCookies.set("uiCode", value, "0");
}
//호출
function getAdminUserNameCookie() {
  return VueCookies.get("adminUserName");
}
function getAccessTokenCookie() {
  return VueCookies.get("accessToken");
}
function getAdminUserSidCookie() {
  return VueCookies.get("adminUserSid");
}
function getUiCodeCookie() {
  return VueCookies.get("uiCode");
}
//삭제
function deleteCookie(value) {
  VueCookies.remove(value);
}

export {
  uiCodeCookie,
  getUiCodeCookie,
  saveAccessTokenCookie,
  adminUserSidCookie,
  adminUserNameCookie,
  deleteCookie,
  getAccessTokenCookie,
  getAdminUserSidCookie,
  getAdminUserNameCookie,
};
