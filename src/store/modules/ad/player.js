import {
  getCmsPlayerDetail,
  getPlayerList,
  getPlayerDetail,
  setPlayerDelete,
  setPlayer,
  setPlayerModify,
  getCmsPlayerList,
  setCmsPlayerDelete,
  setCmsPlayer,
} from "@/api/ad/player";
const player = {
  namespaced: true,
  state: {
    playerList: {},
    playerDetail: {},
    playerDelete: {},
    player: {},
    playerModify: {},
    cmsPlayerList: {},
    cmsPlayerDetail: {},
    selectPlayerId: "", //선택한 플레이어 아이디
    cmsPlayerDelete: {},
    cmsPlayer: {},
  },
  getters: {
    playerList: state => {
      return state.playerList;
    },
    playerDetail: state => {
      return state.playerDetail;
    },
    playerDelete: state => {
      return state.playerDelete;
    },
    player: state => {
      return state.player;
    },
    playerModify: state => {
      return state.playerModify;
    },
    cmsPlayerList: state => {
      return state.cmsPlayerList;
    },
    cmsPlayerDetail: state => {
      return state.cmsPlayerDetail;
    },
    selectPlayerId: state => {
      return state.selectPlayerId;
    },
    cmsPlayerDelete: state => {
      return state.cmsPlayerDelete;
    },
    cmsPlayer: state => {
      return state.cmsPlayer;
    },
  },
  mutations: {
    playerList(state, list) {
      state.playerList = list;
    },
    playerDetail(state, list) {
      state.playerDetail = list;
    },
    playerDelete(state, list) {
      state.playerDelete = list;
    },
    player(state, list) {
      state.player = list;
    },
    playerModify(state, list) {
      state.playerModify = list;
    },
    cmsPlayerList(state, list) {
      state.cmsPlayerList = list;
    },
    cmsPlayerDetail(state, list) {
      state.cmsPlayerDetail = list;
    },
    selectPlayerId(state, id) {
      state.selectPlayerId = id;
    },
    cmsPlayerDelete(state, id) {
      state.cmsPlayerDelete = id;
    },
    cmsPlayer(state, id) {
      state.cmsPlayer = id;
    },
  },
  actions: {
    async GET_PLAYER_LIST({ commit }, payload) {
      const { data } = await getPlayerList(payload);
      commit("playerList", data);
    },
    async GET_PLAYER_DETAIL({ commit }, payload) {
      const { data } = await getPlayerDetail(payload);
      commit("playerDetail", data);
    },
    async SET_PLAYER_DELETE({ commit }, payload) {
      const { data } = await setPlayerDelete(payload);
      commit("playerDelete", data);
    },
    async SET_PLAYER({ commit }, payload) {
      const { data } = await setPlayer(payload);
      commit("player", data);
    },
    async SET_PLAYER_MODIFY({ commit }, payload) {
      const { data } = await setPlayerModify(payload);
      commit("playerModify", data);
    },
    async GET_CMS_PLAYER_LIST({ commit }, payload) {
      const { data } = await getCmsPlayerList(payload);
      commit("cmsPlayerList", data);
    },
    async GET_CMS_PLAYER_DETAIL({ commit }, payload) {
      const { data } = await getCmsPlayerDetail(payload);
      commit("cmsPlayerDetail", data);
    },
    async SET_CMS_PLAYER_DELETE({ commit }, payload) {
      const { data } = await setCmsPlayerDelete(payload);
      commit("cmsPlayerDelete", data);
    },
    async SET_CMS_PLAYER({ commit }, payload) {
      const { data } = await setCmsPlayer(payload);
      commit("cmsPlayer", data);
    },
  },
};

export default player;
