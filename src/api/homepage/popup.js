import { createInstanceWithAuth } from "../index";
function getPopUpList(data) {
  let param = {
    size: data.size,
    page: data.page,
    popupName: data.popupName,
  };
  return createInstanceWithAuth("/popup/list", {}, param, "application/json; charset=utf-8").get();
}

function getPopUpDetail(id) {
  return createInstanceWithAuth(`/popup/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function popUpAdd(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("popupTitle", data.popupTitle);
  frm.append("popupContent", data.popupContent);
  frm.append("popupStartDate", data.popupStartDate);
  frm.append("popupEndDate", data.popupEndDate);
  frm.append("popupKind", data.popupKind);
  frm.append("popupTarget", data.popupTarget);
  frm.append("popupOpen", data.popupOpen);
  frm.append("popupOpenDevice", data.popupOpenDevice);
  frm.append("popupLink", data.popupLink);
  return createInstanceWithAuth(`/popup`, frm, {}, "application/json; charset=utf-8").post();
}

function popUpUpdate(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach((row) => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("popupTitle", data.popupTitle);
  frm.append("popupContent", data.popupContent);
  frm.append("popupStartDate", data.popupStartDate);
  frm.append("popupEndDate", data.popupEndDate);
  frm.append("popupTarget", data.popupTarget);
  frm.append("popupOpen", data.popupOpen);
  frm.append("popupOpenDevice", data.popupOpenDevice);
  frm.append("popupLink", data.popupLink);

  return createInstanceWithAuth(`/popup/${data.popupSid}`, frm, {}, "application/json; charset=utf-8").post();
}

function popUpDelete(id) {
  return createInstanceWithAuth(`/popup/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

export { getPopUpList, popUpAdd, getPopUpDetail, popUpUpdate, popUpDelete };
