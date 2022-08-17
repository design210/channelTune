import { createInstanceWithAuth } from "../index";

// 플레이어 리스트
const getPlayerList = data => {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/cms/playerApp/list", {}, param, "application/json; charset=utf-8").get();
};

// 플레이어 상세
const getPlayerDetail = id => {
  return createInstanceWithAuth(`/cms/playerApp/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// 플레이어 삭제
const setPlayerDelete = id => {
  return createInstanceWithAuth(`/cms/playerApp/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

//플레이어 등록
const setPlayer = data => {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("addtunePlayerAppName", data.addtunePlayerAppName);
  frm.append("addtunePlayerAppVersion", data.addtunePlayerAppVersion);
  frm.append("addtunePlayerAppStartOs", data.addtunePlayerAppStartOs);
  frm.append("addtunePlayerAppEndOs", data.addtunePlayerAppEndOs);
  frm.append("addtunePlayerAppStatus", data.addtunePlayerAppStatus);
  frm.append("addtunePlayerAppOpenFlag", data.addtunePlayerAppOpenFlag);
  frm.append("addtunePlayerAppDocument", data.addtunePlayerAppDocument);
  return createInstanceWithAuth("/cms/playerApp", frm, {}, "application/json; charset=utf-8").post();
};

//플레이어 수정
const setPlayerModify = data => {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("addtunePlayerAppName", data.addtunePlayerAppName);
  frm.append("addtunePlayerAppVersion", data.addtunePlayerAppVersion);
  frm.append("addtunePlayerAppStartOs", data.addtunePlayerAppStartOs);
  frm.append("addtunePlayerAppEndOs", data.addtunePlayerAppEndOs);
  frm.append("addtunePlayerAppStatus", data.addtunePlayerAppStatus);
  frm.append("addtunePlayerAppOpenFlag", data.addtunePlayerAppOpenFlag);
  frm.append("addtunePlayerAppDocument", data.addtunePlayerAppDocument);
  return createInstanceWithAuth(`/cms/playerApp/${data.sid}`, frm, {}, "application/json; charset=utf-8").post();
};

// CMS 플레이어 리스트
const getCmsPlayerList = data => {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/cms/player/list", {}, param, "application/json; charset=utf-8").get();
};

// CMS 플레이어 상세
const getCmsPlayerDetail = id => {
  return createInstanceWithAuth(`/cms/player/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

// CMS 플레이어 삭제
const setCmsPlayerDelete = id => {
  return createInstanceWithAuth(`/cms/player/${id}`, {}, {}, "application/json; charset=utf-8").delete();
};

//CMS 플레이어 등록
const setCmsPlayer = data => {
  const frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("addtunePlayerAccessSid", data.addtunePlayerAccessSid);
  frm.append("addtunePlayerKind", data.addtunePlayerKind);
  frm.append("addtunePlayerName", data.addtunePlayerName);
  frm.append("companyStoreSid", data.companyStoreSid);
  frm.append("addtunePlayerBoardType", data.addtunePlayerBoardType);
  frm.append("addtunePlayerStatus", data.addtunePlayerStatus);
  frm.append("addtunePlayerAutoRunFlag", data.addtunePlayerAutoRunFlag);
  frm.append("addtunePlayerAudioVolume", data.addtunePlayerAudioVolume);
  frm.append("addtunePlayerRotation", data.addtunePlayerRotation);
  frm.append("addtunePlayerRebootingDay", data.addtunePlayerRebootingDay);
  frm.append("addtunePlayerRebootingTime", data.addtunePlayerRebootingTime);
  frm.append("addtunePlayerContentUpdateInterval", data.addtunePlayerContentUpdateInterval);
  return createInstanceWithAuth("/cms/player", frm, {}, "application/json; charset=utf-8").post();
};

export {
  setCmsPlayer,
  setCmsPlayerDelete,
  getPlayerList,
  getPlayerDetail,
  setPlayerDelete,
  setPlayer,
  setPlayerModify,
  getCmsPlayerList,
  getCmsPlayerDetail,
};
