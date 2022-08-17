import { getPopupOpt } from "@/utils/modal";
const modalMixin = {
  methods: {
    //인자로 컴포넌트, Props, 너비를 받아서 모달을 리턴
    __showModalTemplate(Component, getDataObject, wid) {
      this.$modal.show(Component.default, getDataObject, getPopupOpt(Component.default.name, `${wid}px`, "auto", false));
    },
  },
};

export default modalMixin;
