let alim = {
  data() {
    return {
      snackbar: false,
      text: "",
      color: "",
      errorColor: "orange darken-3",
      successColor: "light-blue darken-4",
      closeModal: false,
    };
  },
  methods: {
    //알림리셋
    emitReset() {
      this.snackbar = false;
      this.text = "";
    },
    //알림 호출
    alim(text, color) {
      this.snackbar = true;
      this.text = text;
      this.color = color;
      const _this = this;
      let time = setTimeout(function () {
        _this.snackbar = false;
        _this.text = "";
        _this.color = "";
        clearInterval(time);
        if (_this.closeModal === true) {
          _this.close();
        }
      }, 3000);
    },
  },
};
export default alim;
