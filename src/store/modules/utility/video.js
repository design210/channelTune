import { getVideoView, deleteVideo } from "@/api/utility/video";

const video = {
  namespaced: true,
  state: {
    getVideoView: {},
    deleteVideo: {},
  },
  getters: {
    getVideoView: state => {
      return state.getVideoView;
    },
    deleteVideo: state => {
      return state.deleteVideo;
    },
  },
  mutations: {
    getVideoView(state, result) {
      state.getVideoView = result;
    },
    deleteVideo(state, result) {
      state.deleteVideo = result;
    },
  },
  actions: {
    async GET_VIDEO_VIEW({ commit }, datas) {
      const { data } = await getVideoView(datas);
      commit("getVideoView", data);
    },
    async DELETE_VIDEO({ commit }, id) {
      const { data } = await deleteVideo(id);
      commit("deleteVideo", data);
    },
  },
};

export default video;
