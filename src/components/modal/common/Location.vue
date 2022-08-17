<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header v-application">
        <h1>지역선택</h1>
        <div class="btn-group">
          <v-btn small color="warning" class="mr20" @click="save">저장</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="" style="display: flex; justify-content: space-around">
        <div class="sido elem">
          <span>시도</span>
          <pull-down :data="sidoCode" :code="locationCode" @selected="sidoSelect" class="pull-down"></pull-down>
        </div>
        <div class="sigun elem">
          <span>시/군</span>
          <pull-down :data="sigunCode" :code="sendSidoCode" @selected="sigunSelect" class="pull-down"></pull-down>
        </div>
        <!-- 아직안쓰신다고함 -->
        <div class="gudongli elem" style="display: none">
          <span>구/동/리</span>
          <pull-down :data="gudongliCode" :code="sendSigunCode" @selected="gudongliSelect" class="pull-down"></pull-down>
        </div>
        <div class="btn-group elem v-application">
          <v-btn small color="primary" @click="addLocation">추가</v-btn>
          <v-btn small @click="init">초기화</v-btn>
        </div>
      </div>

      <div class="location-list">
        <div v-for="(item, index) in selectedItems" :key="index">
          <span>{{ index + 1 }}. </span>
          <span>{{ item.sidoCodeName }}</span>
          <span v-if="item.sigunCode && item.sigunCodeName">&nbsp; / &nbsp;</span>
          <span>{{ item.sigunCodeName }}</span>
          <span v-if="item.gudongliCode && item.gudongliCodeName">&nbsp; / &nbsp;</span>
          <span>{{ item.gudongliCodeName }}</span>
        </div>
      </div>

      <!-- 알럿 -->
      <alim class="v-application" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import PullDown from "@/components/form/PullDown.vue";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
export default {
  components: { modalWrap, PullDown, alim },
  mixins: [alimMixin],
  data() {
    return {
      // 추가한 지역
      selectedItems: [],

      locationCode: "SYS21A15B001",
      sendSidoCode: "",
      sendSigunCode: "",

      sidoCode: "",
      sidoCodeName: "",
      sigunCode: "",
      sigunCodeName: "",
      gudongliCode: "",
      gudongliCodeName: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    sidoSelect(data) {
      this.sidoCode = data.sysCodeSid;
      this.sidoCodeName = data.sysCodeName;

      this.sendSidoCode = data.sysCodeSid;
    },
    sigunSelect(data) {
      this.sigunCode = data.sysCodeSid;
      this.sigunCodeName = data.sysCodeName;

      this.sendSigunCode = data.sysCodeSid;
    },
    gudongliSelect(data) {
      this.gudongliCode = data.sysCodeSid;
      this.gudongliCodeName = data.sysCodeName;
    },
    addLocation() {
      if (this.sidoCode == "" || this.sidoCodeName == "") {
        this.alim("시도까진 선택해야합니다.", this.errorColor);
        return false;
      }

      this.selectedItems = [
        ...this.selectedItems,
        {
          sidoCode: this.sidoCode,
          sidoCodeName: this.sidoCodeName,
          sigunCode: this.sigunCode,
          sigunCodeName: this.sigunCodeName,
          gudongliCode: this.gudongliCode,
          gudongliCodeName: this.gudongliCodeName,
        },
      ];
      this.sendSidoCode = "";
      this.sendSigunCode = "";

      this.sidoCode = "";
      this.sidoCodeName = "";
      this.sigunCode = "";
      this.sigunCodeName = "";
      this.gudongliCode = "";
      this.gudongliCodeName = "";
    },
    save() {
      this.$attrs.update(this.selectedItems);
      this.$emit("close");
    },
    init() {
      this.selectedItems = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.btn-group {
  & button {
    margin-left: 5px;
  }
}

.elem {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pull-down {
  margin-left: 10px;
  width: 150px;
}

.location-list {
  margin-top: 20px;
  border: 1px solid #aaaaaa;
  padding: 20px;
  height: 300px;
  overflow-y: scroll;
}
</style>
