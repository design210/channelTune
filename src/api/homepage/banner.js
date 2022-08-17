import { createInstanceWithAuth } from "../index";
function getBannerList(data) {
  let param = {
    size: data.size,
    page: data.page,
    bannerKind: data.bannerKind,
  };
  return createInstanceWithAuth("/banner/list", {}, param, "application/json; charset=utf-8").get();
}

function getBannerDetail(id) {
  return createInstanceWithAuth(`/banner/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

function bannerAdd(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("bannerKind", data.bannerKind);
  frm.append("bannerCloseKind", data.bannerCloseKind);
  frm.append("bannerDevice", data.bannerDevice);
  frm.append("bannerTarget", data.bannerTarget);
  frm.append("bannerLink", data.bannerLink);
  frm.append("bannerStartDateTime", data.bannerStartDateTime);
  frm.append("bannerEndDateTime", data.bannerEndDateTime);
  frm.append("bannerOpenFlag", data.bannerOpenFlag);
  frm.append("bannerTitle", data.bannerTitle);
  frm.append("bannerContent", data.bannerContent);
  frm.append("bannerSubTitle", data.bannerSubTitle);
  return createInstanceWithAuth(`/banner`, frm, {}, "application/json; charset=utf-8").post();
}

function bannerUpdate(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }

  frm.append("bannerKind", data.bannerKind);
  frm.append("bannerCloseKind", data.bannerCloseKind);
  frm.append("bannerDevice", data.bannerDevice);
  frm.append("bannerTarget", data.bannerTarget);
  frm.append("bannerLink", data.bannerLink);
  frm.append("bannerStartDateTime", data.bannerStartDateTime);
  frm.append("bannerEndDateTime", data.bannerEndDateTime);
  frm.append("bannerOpenFlag", data.bannerOpenFlag);
  frm.append("bannerContent", data.bannerContent);
  frm.append("bannerTitle", data.bannerTitle);
  frm.append("bannerSubTitle", data.bannerSubTitle);

  return createInstanceWithAuth(`/banner/${data.bannerSid}`, frm, {}, "application/json; charset=utf-8").post();
}

function bannerDelete(id) {
  return createInstanceWithAuth(`/banner/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

export { getBannerList, getBannerDetail, bannerAdd, bannerUpdate, bannerDelete };
