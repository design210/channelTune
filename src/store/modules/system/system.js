import { getTree, getTreeDetail, addItem, delItem, modifyItem } from "@/api/system/tree";
const system = {
  namespaced: true,
  state: {
    setTree: {},
    setTreeDetail: {},
    addItemResult: {},
    delItemResult: {},
    modifyItemResult: {},
  },
  getters: {
    setTree: state => {
      return state.setTree;
    },
    setTreeDetail: state => {
      return state.setTreeDetail;
    },
    addItemResult: state => {
      return state.addItemResult;
    },
    delItemResult: state => {
      return state.delItemResult;
    },
    modifyItemResult: state => {
      return state.modifyItemResult;
    },
  },
  mutations: {
    setTree(state, setTree) {
      state.setTree = setTree;
    },
    setTreeDetail(state, setTreeDetail) {
      state.setTreeDetail = setTreeDetail;
    },
    addItemResult(state, result) {
      state.addItemResult = result;
    },
    delItemResult(state, result) {
      state.delItemResult = result;
    },
    modifyItemResult(state, result) {
      state.modifyItemResult = result;
    },
  },
  actions: {
    async TREE({ commit }, id) {
      const { data } = await getTree(id);
      commit("setTree", data);
    },
    async TREE_DETAIL({ commit }, id) {
      const { data } = await getTreeDetail(id);
      commit("setTreeDetail", data);
    },
    async REG({ commit }, datas) {
      const { data } = await addItem(datas);
      commit("addItemResult", data);
    },
    async DEL({ commit }, id) {
      const { data } = await delItem(id);
      commit("delItemResult", data);
    },
    async MODIFY({ commit }, datas) {
      const { data } = await modifyItem(datas);
      commit("modifyItemResult", data);
    },
  },
};

export default system;
