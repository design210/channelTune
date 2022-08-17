import {
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
  setStrativeZone,
  faqWrite,
  faqDel,

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

  //partner
  getPartnerNoticeList,
  getPartnerNoticeDetail,
  partnerModify,
  partnerNoticeDel,
  partnerNoticeWrite,
  getPartnerFaqList,
  getPartnerFaqDetail,
  partnerFaqModify,
  partnerFaqDel,
  partnerFaqWrite,
} from "@/api/common/common";
const common = {
  namespaced: true,
  state: {
    getMenuList: {},
    getNoticeList: {},
    getNoticeDetail: {},
    getFaqList: {},
    getFaqDetail: {},
    setStrativeZoneResult: {},
    fileDeleteResult: {},
    noticeDelResult: {},
    noticeModifyResult: {},
    noticeWriteResult: {},
    faqModifyResult: {},
    faqDelResult: {},
    faqWriteResult: {},

    // comment
    getCommentDetail: {},
    commentAdd: {},
    commentUpdate: {},
    commentDelete: {},

    // video file
    getVideoDetail: {},
    getVideoTransDetail: {},
    addVideo: {},
    deleteVideo: {},
    convertVideo: {},
    percentage: 0,

    // news
    getNews: {},
    detailNews: {},
    addNews: {},
    updateNews: {},
    deleteNews: {},

    //partner
    partnerNoticeList: {},
    partnerNoticeDetail: {},
    partnerModifyResult: {},
    partnerNoticeDelResult: {},
    partnerNoticeWriteResult: {},
    partnerFaqList: {},
    partnerFaqDetail: {},
    partnerFaqModifyResult: {},
    partnerFaqDelResult: {},
    partnerFaqWriteResult: {},

    //ui
    code1depths: [],
    SYS21728B060: [], //운영관리
    SYS21728B061: [], //자산관리
    SYS21728B062: [], //홈페이지 관리
    SYS21B22B037: [], //광고편성 관리
    SYS21728B063: [], //정산관리
    SYS21A05B003: [], //인사관리
    SYS21728B064: [], //시스템관리
  },
  getters: {
    getMenuList: state => {
      return state.getMenuList;
    },
    getNoticeList: state => {
      return state.getNoticeList;
    },
    getNoticeDetail: state => {
      return state.getNoticeDetail;
    },
    getFaqList: state => {
      return state.getFaqList;
    },
    getFaqDetail: state => {
      return state.getFaqDetail;
    },

    setStrativeZoneResult: state => {
      return state.setStrativeZoneResult;
    },
    fileDeleteResult: state => {
      return state.fileDeleteResult;
    },
    noticeDelResult: state => {
      return state.noticeDelResult;
    },
    noticeModifyResult: state => {
      return state.noticeModifyResult;
    },
    noticeWriteResult: state => {
      return state.noticeWriteResult;
    },
    faqModifyResult: state => {
      return state.faqModifyResult;
    },
    faqDelResult: state => {
      return state.faqDelResult;
    },
    faqWriteResult: state => {
      return state.faqWriteResult;
    },

    // comment
    getCommentDetail: state => {
      return state.getCommentDetail;
    },
    commentAdd: state => {
      return state.commentAdd;
    },
    commentUpdate: state => {
      return state.commentUpdate;
    },
    commentDelete: state => {
      return state.commentDelete;
    },

    // video file
    getVideoDetail: state => {
      return state.getVideoDetail;
    },
    getVideoTransDetail: state => {
      return state.getVideoTransDetail;
    },
    addVideo: state => {
      return state.addVideo;
    },
    deleteVideo: state => {
      return state.deleteVideo;
    },
    convertVideo: state => {
      return state.convertVideo;
    },
    percentage: state => {
      return state.percentage;
    },

    // news
    getNews: state => {
      return state.getNews;
    },
    detailNews: state => {
      return state.detailNews;
    },
    addNews: state => {
      return state.addNews;
    },
    updateNews: state => {
      return state.updateNews;
    },
    deleteNews: state => {
      return state.deleteNews;
    },

    //partner
    partnerNoticeList: state => {
      return state.partnerNoticeList;
    },
    partnerNoticeDetail: state => {
      return state.partnerNoticeDetail;
    },
    partnerModifyResult: state => {
      return state.partnerModifyResult;
    },
    partnerNoticeDelResult: state => {
      return state.partnerNoticeDelResult;
    },
    partnerNoticeWriteResult: state => {
      return state.partnerNoticeWriteResult;
    },

    partnerFaqList: state => {
      return state.partnerFaqList;
    },
    partnerFaqDetail: state => {
      return state.partnerFaqDetail;
    },
    partnerFaqModifyResult: state => {
      return state.partnerFaqModifyResult;
    },
    partnerFaqDelResult: state => {
      return state.partnerFaqDelResult;
    },
    partnerFaqWriteResult: state => {
      return state.partnerFaqWriteResult;
    },
    code1depths: state => {
      return state.code1depths;
    },
    SYS21728B060: state => {
      return state.SYS21728B060;
    },
    SYS21728B061: state => {
      return state.SYS21728B061;
    },
    SYS21728B062: state => {
      return state.SYS21728B062;
    },
    SYS21B22B037: state => {
      return state.SYS21B22B037;
    },
    SYS21728B063: state => {
      return state.SYS21728B063;
    },
    SYS21A05B003: state => {
      return state.SYS21A05B003;
    },
    SYS21728B064: state => {
      return state.SYS21728B064;
    },
  },
  mutations: {
    getMenuList(state, data) {
      state.getMenuList = data;
    },
    getNoticeList(state, data) {
      state.getNoticeList = data;
    },
    getNoticeDetail(state, data) {
      state.getNoticeDetail = data;
    },
    getFaqList(state, data) {
      state.getFaqList = data;
    },
    getFaqDetail(state, data) {
      state.getFaqDetail = data;
    },

    setStrativeZoneResult(state, result) {
      state.setStrativeZoneResult = result;
    },
    fileDeleteResult(state, result) {
      state.fileDeleteResult = result;
    },
    noticeDelResult(state, result) {
      state.noticeDelResult = result;
    },
    noticeModifyResult(state, result) {
      state.noticeModifyResult = result;
    },
    noticeWriteResult(state, result) {
      state.noticeWriteResult = result;
    },
    faqModifyResult(state, result) {
      state.faqModifyResult = result;
    },
    faqDelResult(state, result) {
      state.faqDelResult = result;
    },
    faqWriteResult(state, result) {
      state.faqWriteResult = result;
    },

    // comment
    getCommentDetail(state, result) {
      state.getCommentDetail = result;
    },
    commentAdd(state, result) {
      state.commentAdd = result;
    },
    commentUpdate(state, result) {
      state.commentUpdate = result;
    },
    commentDelete(state, result) {
      state.commentDelete = result;
    },

    // video file
    getVideoDetail(state, result) {
      state.getVideoDetail = result;
    },
    getVideoTransDetail(state, result) {
      state.getVideoTransDetail = result;
    },
    addVideo(state, result) {
      state.addVideo = result;
    },
    deleteVideo(state, result) {
      state.deleteVideo = result;
    },
    convertVideo(state, result) {
      state.convertVideo = result;
    },
    percentage(state, list) {
      state.percentage = list;
    },

    // news
    getNews(state, list) {
      state.getNews = list;
    },
    detailNews(state, list) {
      state.detailNews = list;
    },
    addNews(state, list) {
      state.addNews = list;
    },
    updateNews(state, list) {
      state.updateNews = list;
    },
    deleteNews(state, list) {
      state.deleteNews = list;
    },

    //partner
    partnerNoticeList(state, list) {
      state.partnerNoticeList = list;
    },
    partnerNoticeDetail(state, list) {
      state.partnerNoticeDetail = list;
    },
    partnerModifyResult(state, list) {
      state.partnerModifyResult = list;
    },
    partnerNoticeDelResult(state, list) {
      state.partnerNoticeDelResult = list;
    },
    partnerNoticeWriteResult(state, list) {
      state.partnerNoticeWriteResult = list;
    },
    partnerFaqList(state, list) {
      state.partnerFaqList = list;
    },
    partnerFaqDetail(state, list) {
      state.partnerFaqDetail = list;
    },
    partnerFaqModifyResult(state, list) {
      state.partnerFaqModifyResult = list;
    },
    partnerFaqDelResult(state, list) {
      state.partnerFaqDelResult = list;
    },
    partnerFaqWriteResult(state, list) {
      state.partnerFaqWriteResult = list;
    },

    //left Ui
    code1depths(state, list) {
      state.code1depths = list;
    },
    SYS21728B060(state, list) {
      state.SYS21728B060 = list;
    },
    SYS21728B061(state, list) {
      state.SYS21728B061 = list;
    },
    SYS21728B062(state, list) {
      state.SYS21728B062 = list;
    },
    SYS21B22B037(state, list) {
      state.SYS21B22B037 = list;
    },
    SYS21728B063(state, list) {
      state.SYS21728B063 = list;
    },
    SYS21A05B003(state, list) {
      state.SYS21A05B003 = list;
    },
    SYS21728B064(state, list) {
      state.SYS21728B064 = list;
    },
  },
  actions: {
    //파트너
    async PARTNER_NOTICE_LIST({ commit }, datas) {
      const { data } = await getPartnerNoticeList(datas);
      commit("partnerNoticeList", data);
    },
    async PARTNER_NOTICE_DETAIL({ commit }, datas) {
      const { data } = await getPartnerNoticeDetail(datas);
      commit("partnerNoticeDetail", data);
    },
    async PARTNER_NOTICE_MODIFY({ commit }, datas) {
      const { data } = await partnerModify(datas);
      commit("partnerModifyResult", data);
    },
    async PARTNER_NOTICE_DEL({ commit }, id) {
      const { data } = await partnerNoticeDel(id);
      commit("partnerNoticeDelResult", data);
    },
    async PARTNER_NOTICE_WRITE({ commit }, datas) {
      const { data } = await partnerNoticeWrite(datas);
      commit("partnerNoticeWriteResult", data);
    },
    async PARTNER_FAQ_LIST({ commit }, datas) {
      const { data } = await getPartnerFaqList(datas);
      commit("partnerFaqList", data);
    },
    async PARTNER_FAQ_DETAIL({ commit }, datas) {
      const { data } = await getPartnerFaqDetail(datas);
      commit("partnerFaqDetail", data);
    },
    async PARTNER_FAQ_MODIFY({ commit }, datas) {
      const { data } = await partnerFaqModify(datas);
      commit("partnerFaqModifyResult", data);
    },
    async PARTNER_FAQ_DEL({ commit }, id) {
      const { data } = await partnerFaqDel(id);
      commit("partnerFaqDelResult", data);
    },
    async PARTNER_FAQ_WRITE({ commit }, datas) {
      const { data } = await partnerFaqWrite(datas);
      commit("partnerFaqWriteResult", data);
    },
    async MENU_LIST({ commit }, id) {
      const { data } = await getMenuList(id);
      commit("getMenuList", data);
    },
    async NOTICE_LIST({ commit }, datas) {
      const { data } = await getNoticeList(datas);
      commit("getNoticeList", data);
    },
    async NOTICE_DETAIL({ commit }, datas) {
      const { data } = await getNoticeDetail(datas);
      commit("getNoticeDetail", data);
    },
    async FAQ_LIST({ commit }, datas) {
      const { data } = await getFaqList(datas);
      commit("getFaqList", data);
    },
    async FAQ_DETAIL({ commit }, datas) {
      const { data } = await getFaqDetail(datas);
      commit("getFaqDetail", data);
    },
    async STRATIVE_ZONE({ commit }, datas) {
      const { data } = await setStrativeZone(datas);
      commit("setStrativeZoneResult", data);
    },
    async FILE_DELETE({ commit }, id) {
      const { data } = await fileDelete(id);
      commit("fileDeleteResult", data);
    },
    async NOTICE_DEL({ commit }, id) {
      const { data } = await noticeDel(id);
      commit("noticeDelResult", data);
    },
    async NOTICE_MODIFY({ commit }, datas) {
      const { data } = await noticeModify(datas);
      commit("noticeModifyResult", data);
    },
    async NOTICE_WRITE({ commit }, datas) {
      const { data } = await noticeWrite(datas);
      commit("noticeWriteResult", data);
    },
    async FAQ_MODIFY({ commit }, datas) {
      const { data } = await faqModify(datas);
      commit("faqModifyResult", data);
    },
    async FAQ_DEL({ commit }, id) {
      const { data } = await faqDel(id);
      commit("faqDelResult", data);
    },
    async FAQ_WRITE({ commit }, datas) {
      const { data } = await faqWrite(datas);
      commit("faqWriteResult", data);
    },

    // comment
    async COMMENT_DETAIL({ commit }, id) {
      const { data } = await getCommentDetail(id);
      commit("getCommentDetail", data);
    },
    async COMMENT_ADD({ commit }, datas) {
      const { data } = await commentAdd(datas);
      commit("commentAdd", data);
    },
    async COMMENT_UPDATE({ commit }, datas) {
      const { data } = await commentUpdate(datas);
      commit("commentUpdate", data);
    },
    async COMMENT_DELETE({ commit }, id) {
      const { data } = await commentDelete(id);
      commit("commentDelete", data);
    },

    // video file
    async GET_VIDEO_DETAIL({ commit }, d) {
      const { data } = await getVideoDetail(d);
      commit("getVideoDetail", data);
    },
    async GET_VIDEO_TRANS_DETAIL({ commit }, id) {
      const { data } = await getVideoTransDetail(id);
      commit("getVideoTransDetail", data);
    },
    async ADD_VIDEO({ commit }, d) {
      const { data } = await addVideo(d, commit);
      commit("addVideo", data);
    },
    async DELETE_VIDEO({ commit }, id) {
      const { data } = await deleteVideo(id);
      commit("deleteVideo", data);
    },
    async CONVERT_VIDEO({ commit }, id) {
      const { data } = await convertVideo(id);
      commit("convertVideo", data);
    },
    async GET_PERCENTAGE({ commit }) {
      commit("percentage");
    },

    // news
    async GET_NEWS({ commit }, d) {
      const { data } = await getNews(d);
      commit("getNews", data);
    },
    async DETAIL_NEWS({ commit }, id) {
      const { data } = await detailNews(id);
      commit("detailNews", data);
    },
    async ADD_NEWS({ commit }, d) {
      const { data } = await addNews(d);
      commit("addNews", data);
    },
    async UPDATE_NEWS({ commit }, d) {
      const { data } = await updateNews(d);
      commit("updateNews", data);
    },
    async DELETE_NEWS({ commit }, id) {
      const { data } = await deleteNews(id);
      commit("deleteNews", data);
    },
  },
};

export default common;
