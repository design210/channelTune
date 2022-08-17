import bus from "@/utils/bus";
// : vuex 접근 코드를 줄이고자... mapGetter를 쓸필요 x
let response = {
  methods: {
    // vuex actions만 입력해서 vuex state 얻는 func
    async __getResponse(actionName, payload) {
      bus.$emit("start:spinner");
      await this.$store.dispatch(actionName, payload);
      const stateInfo = this.__getGetterName(actionName);
      bus.$emit("end:spinner");
      const d = this.$store.getters[`${stateInfo[0]}/${stateInfo[1]}`];
      return d[Object.keys(d)[0]];
    },

    // action name to getter name
    __getGetterName(actionName) {
      let total = actionName.split("/");
      return [
        total[0],
        total[1]
          .toLowerCase()
          .split("_")
          .map((e, i) => (i === 0 ? e : e.charAt(0).toUpperCase() + e.substr(1)))
          .join(""),
      ];
    },

    __responseCheck(res, alim, reload) {
      if (res.errorCode !== 200) {
        alim(res.errorMessage, this.errorColor);
      } else {
        alim(res.errorMessage, this.successColor);
        reload(0);
      }
    },
  },
};
export default response;
