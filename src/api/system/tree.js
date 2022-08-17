import { createInstanceWithAuth } from "../index";
function getTree(id) {
  return createInstanceWithAuth(`/syscode/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getTreeDetail(id) {
  return createInstanceWithAuth(`/syscode/detail/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function addItem(data) {
  return createInstanceWithAuth(
    "/syscode",
    {
      sysCodeSid: data.sysCodeSid,
      sysCodeParentsSid: data.sysCodeParentsSid,
      sysCodeName: data.sysCodeName,
      sysCodeSort: data.sysCodeSort,
      sysCodeValName: data.sysCodeValName,
      sysCodeVal: data.sysCodeVal,
      sysCodeVal1Name: data.sysCodeVal1Name,
      sysCodeVal1: data.sysCodeVal1,
      sysCodeVal2Name: data.sysCodeVal2Name,
      sysCodeVal2: data.sysCodeVal2,
      sysCodeVal3Name: data.sysCodeVal3Name,
      sysCodeVal3: data.sysCodeVal3,
      sysCodeVal4Name: data.sysCodeVal4Name,
      sysCodeVal4: data.sysCodeVal4,
      sysCodeUse: data.sysCodeUse,
    },
    {},
    "application/json; charset=utf-8",
  ).post();
}
function delItem(id) {
  return createInstanceWithAuth(`/syscode/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function modifyItem(data) {
  return createInstanceWithAuth(
    `/syscode/${data.sysCodeSid}`,
    {
      sysCodeSid: data.sysCodeSid,
      sysCodeParentsSid: data.sysCodeParentsSid,
      sysCodeName: data.sysCodeName,
      sysCodeSort: data.sysCodeSort,
      sysCodeValName: data.sysCodeValName,
      sysCodeVal: data.sysCodeVal,
      sysCodeVal1Name: data.sysCodeVal1Name,
      sysCodeVal1: data.sysCodeVal1,
      sysCodeVal2Name: data.sysCodeVal2Name,
      sysCodeVal2: data.sysCodeVal2,
      sysCodeVal3Name: data.sysCodeVal3Name,
      sysCodeVal3: data.sysCodeVal3,
      sysCodeVal4Name: data.sysCodeVal4Name,
      sysCodeVal4: data.sysCodeVal4,
      sysCodeUse: data.sysCodeUse,
    },
    {},
    "application/json; charset=utf-8",
  ).put();
}

export { getTree, getTreeDetail, addItem, delItem, modifyItem };
