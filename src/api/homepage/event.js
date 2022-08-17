import { createInstanceWithAuth } from "../index";
function getEventList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/event/list", {}, param, "application/json; charset=utf-8").get();
}
function getEventDetail(id) {
  return createInstanceWithAuth(`/event/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function eventModify(data) {
  if (data.boardEventReportFlag === true) {
    data.boardEventReportFlag = "Y";
  } else {
    data.boardEventReportFlag = "N";
  }
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardEventStatus", data.boardEventStatus);
  frm.append("boardEventTitle", data.boardEventTitle);
  frm.append("boardEventReportTitle", data.boardEventReportTitle);
  frm.append("boardEventStartDateTime", data.boardEventStartDateTime);
  frm.append("boardEventEndDateTime", data.boardEventEndDateTime);
  frm.append("boardEventContentFlag", data.boardEventContentFlag);
  frm.append("boardEventResource", data.boardEventResource);
  frm.append("boardEventContent", data.boardEventContent);
  frm.append("boardEventMemo", data.boardEventMemo);
  frm.append("boardEventContentEnd", data.boardEventContentEnd);
  frm.append("boardEventReportFlag", data.boardEventReportFlag);
  frm.append("boardEventContentReport", data.boardEventContentReport);
  return createInstanceWithAuth(`/event/${data.boardEventSid}`, frm, {}, "application/json; charset=utf-8").post();
}
function eventAdd(data) {
  if (data.boardEventReportFlag === true) {
    data.boardEventReportFlag = "Y";
  } else {
    data.boardEventReportFlag = "N";
  }
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardEventStatus", data.boardEventStatus);
  frm.append("boardEventTitle", data.boardEventTitle);
  frm.append("boardEventReportTitle", data.boardEventReportTitle);
  frm.append("boardEventStartDateTime", data.boardEventStartDateTime);
  frm.append("boardEventEndDateTime", data.boardEventEndDateTime);
  frm.append("boardEventContentFlag", data.boardEventContentFlag);
  frm.append("boardEventResource", data.boardEventResource);
  frm.append("boardEventContent", data.boardEventContent);
  frm.append("boardEventMemo", data.boardEventMemo);
  frm.append("boardEventContentEnd", data.boardEventContentEnd);
  frm.append("boardEventReportFlag", data.boardEventReportFlag);
  frm.append("boardEventContentReport", data.boardEventContentReport);
  return createInstanceWithAuth("/event", frm, {}, "application/json; charset=utf-8").post();
}
function eventDelete(id) {
  return createInstanceWithAuth(`/event/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

//Tune 이벤트 관리
function getTuneEventList(data) {
  let param = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth("/tuneEvent", {}, param, "application/json; charset=utf-8").get();
}

function getTuneEventTransList(data) {
  let param = {
    size: data.size,
    page: data.page,
    tuneEventMasterSid: data.tuneEventMasterSid,
  };
  return createInstanceWithAuth("/tuneEvent/list", {}, param, "application/json; charset=utf-8").get();
}

function getEventParticipantsInfo(id) {
  return createInstanceWithAuth(`/tuneEvent/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
export { getEventList, getEventDetail, eventModify, eventAdd, eventDelete, getTuneEventList, getTuneEventTransList, getEventParticipantsInfo };
