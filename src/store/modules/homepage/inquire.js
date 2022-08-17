import {
  getPartnerContactList,
  getPartnerContactDetail,
  contactPartnerModify,
  contactPartnerDelete,
  getContactList,
  getcontactDetail,
  contactDelete,
  contactModify,
} from "@/api/homepage/inquire";
const contact = {
  namespaced: true,
  state: {
    getContactList: {},
    getcontactDetail: {},
    contactModifyResult: {},
    contactDeleteResult: {},
    getPartnerContactListResult: {},
    partnerContactDetailResult: {},
    contactPartnerModifyResult: {},
    contactPartnerDeleteResult: {},
  },
  getters: {
    getContactList: state => {
      return state.getContactList;
    },
    getcontactDetail: state => {
      return state.getcontactDetail;
    },
    contactModifyResult: state => {
      return state.contactModifyResult;
    },
    contactDeleteResult: state => {
      return state.contactDeleteResult;
    },
    getPartnerContactList: state => {
      return state.getPartnerContactListResult;
    },
    getPartnerContactDetail: state => {
      return state.partnerContactDetailResult;
    },
    contactPartnerModify: state => {
      return state.contactPartnerModifyResult;
    },
    contactPartnerDelete: state => {
      return state.contactPartnerDeleteResult;
    },
  },
  mutations: {
    getContactList(state, contactList) {
      state.getContactList = contactList;
    },
    getcontactDetail(state, detail) {
      state.getcontactDetail = detail;
    },
    contactModifyResult(state, result) {
      state.contactModifyResult = result;
    },
    contactDeleteResult(state, result) {
      state.contactDeleteResult = result;
    },
    getPartnerContactList(state, contactList) {
      state.getPartnerContactListResult = contactList;
    },
    partnerContactDetail(state, detail) {
      state.partnerContactDetailResult = detail;
    },
    contactPartnerModify(state, result) {
      state.contactPartnerModifyResult = result;
    },
    contactPartnerDelete(state, result) {
      state.contactPartnerDeleteResult = result;
    },
  },
  actions: {
    async CONTACT_LIST({ commit }, datas) {
      const { data } = await getContactList(datas);
      commit("getContactList", data);
    },
    async CONTACT_DETAIL({ commit }, id) {
      const { data } = await getcontactDetail(id);
      commit("getcontactDetail", data);
    },
    async CONTACT_MODIFY({ commit }, datas) {
      const { data } = await contactModify(datas);
      commit("contactModifyResult", data);
    },
    async CONTACT_DEL({ commit }, id) {
      const { data } = await contactDelete(id);
      commit("contactDeleteResult", data);
    },
    //partner
    async PARTNER_CONTACT_LIST({ commit }, datas) {
      const { data } = await getPartnerContactList(datas);
      commit("getPartnerContactList", data);
    },
    async PARTNER_CONTACT_DETAIL({ commit }, id) {
      const { data } = await getPartnerContactDetail(id);
      commit("partnerContactDetail", data);
    },
    async PARTNER_CONTACT_MODIFY({ commit }, datas) {
      const { data } = await contactPartnerModify(datas);
      commit("contactPartnerModify", data);
    },
    async PARTNER_CONTACT_DEL({ commit }, id) {
      const { data } = await contactPartnerDelete(id);
      commit("contactPartnerDelete", data);
    },
  },
};

export default contact;
