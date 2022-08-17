import { createInstanceWithAuth } from "../index";
function fileDelete(id) {
  return createInstanceWithAuth(`/file/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function getMenuList(id) {
  return createInstanceWithAuth(`/menumanagement/adminmenu/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getNoticeList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/notice/list", {}, param, "application/json; charset=utf-8").get();
}
function getNoticeDetail(id) {
  return createInstanceWithAuth(`/notice/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function noticeDel(id) {
  return createInstanceWithAuth(`/notice/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function noticeModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardNoticeTopFlag", data.boardNoticeTopFlag);
  frm.append("boardNoticeTitle", data.boardNoticeTitle);
  frm.append("boardNoticeContent", data.boardNoticeContent);
  frm.append("boardNoticeCreateName", data.boardNoticeCreateName);
  frm.append("boardNoticeGroupNo", data.boardNoticeGroupNo);
  frm.append("boardNoticeGroupSort", data.boardNoticeGroupSort);
  frm.append("boardNoticeGroupDepth", data.boardNoticeGroupDepth);
  return createInstanceWithAuth(`/notice/${data.boardNoticeSid}`, frm, {}, "multipart/form-data").post();
}
function noticeWrite(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardNoticeTopFlag", data.boardNoticeTopFlag);
  frm.append("boardNoticeTitle", data.boardNoticeTitle);
  frm.append("boardNoticeContent", data.boardNoticeContent);
  frm.append("boardNoticeCreateName", data.boardNoticeCreateName);
  frm.append("boardNoticeGroupNo", data.boardNoticeGroupNo);
  frm.append("boardNoticeGroupSort", data.boardNoticeGroupSort);
  frm.append("boardNoticeGroupDepth", data.boardNoticeGroupDepth);
  return createInstanceWithAuth("/notice", frm, {}, "multipart/form-data").post();
}

function getFaqList(data) {
  let param = {
    size: data.size,
    page: data.page,
    boardCategorySids: data.boardCategorySids,
  };
  return createInstanceWithAuth("/faq/list", {}, param, "application/json; charset=utf-8").get();
}

function getFaqDetail(id) {
  return createInstanceWithAuth(`/faq/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function faqModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardFaqTopFlag", data.boardFaqTopFlag);
  frm.append("boardFaqGroupNo", data.boardFaqGroupNo);
  frm.append("boardFaqGroupSort", data.boardFaqGroupSort);
  frm.append("boardFaqCreateName", data.boardFaqCreateName);
  frm.append("boardFaqGroupDepth", data.boardFaqGroupDepth);
  frm.append("boardFaqTitle", data.boardFaqTitle);
  frm.append("boardFaqContent", data.boardFaqContent);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth(`/faq/${data.boardFaqSid}`, frm, {}, "multipart/form-data").post();
}
function faqWrite(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardFaqTopFlag", data.boardFaqTopFlag);
  frm.append("boardFaqGroupNo", data.boardFaqGroupNo);
  frm.append("boardFaqGroupSort", data.boardFaqGroupSort);
  frm.append("boardFaqCreateName", data.boardFaqCreateName);
  frm.append("boardFaqGroupDepth", data.boardFaqGroupDepth);
  frm.append("boardFaqTitle", data.boardFaqTitle);
  frm.append("boardFaqContent", data.boardFaqContent);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth("/faq", frm, {}, "multipart/form-data").post();
}
function faqDel(id) {
  return createInstanceWithAuth(`/faq/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function setStrativeZone(data) {
  let param = {
    zone1: data.zone1,
    zone2: data.zone2,
    zone3: data.zone3,
  };

  return createInstanceWithAuth("/administrativezone", {}, param, "application/json; charset=utf-8").get();
}

// comment
function getCommentDetail(id) {
  return createInstanceWithAuth(`/comment/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function commentAdd(data) {
  var frm = new FormData();
  frm.append("systemCommentDbName", data.systemCommentDbName);
  frm.append("systemCommentDbPkey", data.systemCommentDbPkey);
  frm.append("systemCommentKind", data.systemCommentKind);
  frm.append("systemCommentDocument", data.systemCommentDocument);
  frm.append("systemCommentDateTime", data.systemCommentDateTime);
  frm.append("systemCommentWriteName", data.systemCommentWriteName);
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  return createInstanceWithAuth(`/comment`, frm, {}, "application/json; charset=utf-8").post();
}
function commentUpdate(data) {
  let param = {
    systemCommentDbName: data.systemCommentDbName,
    systemCommentDbPkey: data.systemCommentDbPkey,
    systemCommentKind: data.systemCommentKind,
    systemCommentDocument: data.systemCommentDocument,
    systemCommentDateTime: data.systemCommentDateTime,
    systemCommentWriteName: data.systemCommentWriteName,
  };
  return createInstanceWithAuth(`/comment/${data.systemCommentSid}`, param, {}, "application/json; charset=utf-8").put();
}
function commentDelete(id) {
  return createInstanceWithAuth(`/comment/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

// video file
// video trnas
const getVideoDetail = d => {
  return createInstanceWithAuth(`/video/${d.tableName}/${d.sid}`, {}, {}, "application/json; charset=utf-8").get();
};
// video trans detail
const getVideoTransDetail = id => {
  return createInstanceWithAuth(`/video/trans/${id}`, {}, {}, "application/json; charset=utf-8").get();
};
// video trans detail
const addVideo = (d, commit) => {
  let f = new FormData();
  if (d.channeltuneFiles.length > 0) {
    d.channeltuneFiles.forEach(row => {
      f.append("channeltuneFiles[]", row);
    });
  }

  f.append("videoKind", d.videoKind);
  f.append("videoTableName", d.videoTableName);
  f.append("videoTableSid", d.videoTableSid);
  return createInstanceWithAuth(`/video`, f, {}, "application/json; charset=utf-8", commit).post();
};

// 영상파일 삭제
const deleteVideo = sid => {
  return createInstanceWithAuth(`/video/${sid}`, {}, {}, "application/json; charset=utf-8").delete();
};

// 영상파일 변환
const convertVideo = d => {
  let f = new FormData();
  f.append("type", d.type);
  return createInstanceWithAuth(`/video/convert/${d.sid}`, f, {}, "application/json; charset=utf-8").post();
};

// news
const getNews = d => {
  let param = {
    size: d.size,
    page: d.page,
    // boardCategorySids: data.boardCategorySids,
  };
  return createInstanceWithAuth("/news/list", {}, param, "application/json; charset=utf-8").get();
};
const detailNews = id => {
  return createInstanceWithAuth(`/news/${id}`, {}, {}, "application/json; charset=utf-8").get();
};
const addNews = d => {
  let f = new FormData();
  f.append("boardNewsTopFlag", d.boardNewsTopFlag);
  f.append("boardNewsURL", d.boardNewsURL);

  return createInstanceWithAuth("/news", f, {}, "application/json; charset=utf-8").post();
};
const updateNews = d => {
  let param = {
    boardNewsTopFlag: d.boardNewsTopFlag,
    boardNewsURL: d.boardNewsURL,
  };
  return createInstanceWithAuth(`/news/${d.boardNewsSid}`, param, {}, "application/json; charset=utf-8").put();
};
const deleteNews = sid => {
  return createInstanceWithAuth(`/news/${sid}`, {}, {}, "application/json; charset=utf-8").delete();
};

function getPartnerNoticeList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/partnernotice/list", {}, param, "application/json; charset=utf-8").get();
}

function getPartnerNoticeDetail(id) {
  return createInstanceWithAuth(`/partnernotice/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function partnerModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardNoticeTopFlag", data.boardNoticeTopFlag);
  frm.append("boardNoticeTitle", data.boardNoticeTitle);
  frm.append("boardNoticeContent", data.boardNoticeContent);
  frm.append("boardNoticeCreateName", data.boardNoticeCreateName);
  frm.append("boardNoticeGroupNo", data.boardNoticeGroupNo);
  frm.append("boardNoticeGroupSort", data.boardNoticeGroupSort);
  frm.append("boardNoticeGroupDepth", data.boardNoticeGroupDepth);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth(`/partnernotice/${data.boardNoticeSid}`, frm, {}, "multipart/form-data").post();
}
function partnerNoticeDel(id) {
  return createInstanceWithAuth(`/partnernotice/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function partnerNoticeWrite(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardNoticeTopFlag", data.boardNoticeTopFlag);
  frm.append("boardNoticeTitle", data.boardNoticeTitle);
  frm.append("boardNoticeContent", data.boardNoticeContent);
  frm.append("boardNoticeCreateName", data.boardNoticeCreateName);
  frm.append("boardNoticeGroupNo", data.boardNoticeGroupNo);
  frm.append("boardNoticeGroupSort", data.boardNoticeGroupSort);
  frm.append("boardNoticeGroupDepth", data.boardNoticeGroupDepth);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth("/partnernotice", frm, {}, "multipart/form-data").post();
}

function getPartnerFaqList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/partnerfaq/list", {}, param, "application/json; charset=utf-8").get();
}

function getPartnerFaqDetail(id) {
  return createInstanceWithAuth(`/partnerfaq/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function partnerFaqModify(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardFaqTopFlag", data.boardFaqTopFlag);
  frm.append("boardFaqTitle", data.boardFaqTitle);
  frm.append("boardFaqContent", data.boardFaqContent);
  frm.append("boardFaqCreateName", data.boardFaqCreateName);
  frm.append("boardFaqGroupNo", data.boardFaqGroupNo);
  frm.append("boardFaqGroupSort", data.boardFaqGroupSort);
  frm.append("boardFaqGroupDepth", data.boardFaqGroupDepth);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth(`/partnerfaq/${data.boardFaqSid}`, frm, {}, "multipart/form-data").post();
}
function partnerFaqDel(id) {
  return createInstanceWithAuth(`/partnerfaq/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function partnerFaqWrite(data) {
  var frm = new FormData();
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("boardFaqTopFlag", data.boardFaqTopFlag);
  frm.append("boardFaqTitle", data.boardFaqTitle);
  frm.append("boardFaqContent", data.boardFaqContent);
  frm.append("boardFaqCreateName", data.boardFaqCreateName);
  frm.append("boardFaqGroupNo", data.boardFaqGroupNo);
  frm.append("boardFaqGroupSort", data.boardFaqGroupSort);
  frm.append("boardFaqGroupDepth", data.boardFaqGroupDepth);
  frm.append("boardCategorySids", data.boardCategorySids);
  return createInstanceWithAuth("/partnerfaq", frm, {}, "multipart/form-data").post();
}
export {
  partnerFaqWrite,
  partnerFaqDel,
  partnerFaqModify,
  getPartnerFaqDetail,
  getPartnerFaqList,
  partnerNoticeWrite,
  partnerNoticeDel,
  partnerModify,
  getPartnerNoticeDetail,
  getPartnerNoticeList,
  faqDel,
  faqWrite,
  setStrativeZone,
  fileDelete,
  getMenuList,
  getNoticeList,
  getNoticeDetail,
  noticeDel,
  noticeModify,
  noticeWrite,
  getFaqList,
  getFaqDetail,
  faqModify,
  // comment
  getCommentDetail,
  commentAdd,
  commentUpdate,
  commentDelete,
  // video file
  getVideoDetail,
  getVideoTransDetail,
  addVideo,
  deleteVideo,
  convertVideo,
  // news
  getNews,
  detailNews,
  addNews,
  updateNews,
  deleteNews,
};
