import { QrGenerator, downLoadQr, QrEventLog } from "@/api/ad/qr";

const qr = {
  namespaced: true,
  state: {
    QrGenerator: {},
    QrEventLog: {},
    downLoadQr: {},
  },
  getters: {
    QrGenerator: state => {
      return state.QrGenerator;
    },
    downLoadQr: state => {
      return state.downLoadQr;
    },
    QrEventLog: state => {
      return state.QrEventLog;
    },
  },
  mutations: {
    QrGenerator(state, list) {
      state.QrGenerator = list;
    },
    downLoadQr(state, list) {
      state.downLoadQr = list;
    },
    QrEventLog(state, list) {
      state.QrEventLog = list;
    },
  },
  actions: {
    async QR_GENERATOR({ commit }, datas) {
      const { data } = await QrGenerator(datas);
      commit("QrGenerator", data);
    },
    async DOWNLOAD_QR({ commit }, id) {
      const { data } = await downLoadQr(id);
      commit("downLoadQr", data);
    },
    async QR_EVENT_LOG({ commit }, id) {
      const { data } = await QrEventLog(id);
      commit("QrEventLog", data);
    },
  },
};
export default qr;
