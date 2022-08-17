<template>
  <div class="v-application height">
    <div v-for="(item, index) in items" :key="index" class="check-group">
      <v-checkbox :readonly="onlyRead === true" v-model="selected" class="mr10" :label="item.sysCodeName" :value="item.sysCodeSid"></v-checkbox>
    </div>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alimMixin from "@/mixins/alim";
import alim from "@/components/dialog/Alim";
export default {
  components: { alim },
  mixins: [alimMixin],
  props: ["code", "data", "clear", "onlyRead"],
  data() {
    return {
      selected: [],
      items: [],
      check1: "",
    };
  },
  computed: {
    ...mapGetters("systemCode", ["getCode"]),
  },
  watch: {
    //초기화
    clear(o, n) {
      if (o !== n) {
        this.select = "";
      }
    },
    //체크박스 값 받아오기
    data(val) {
      if (val !== null) {
        const arr = val.split("|");
        this.selected = arr;
      }
    },
    //체크박스 변경시
    selected(data) {
      let dataJoin = data.join("|");
      this.$emit("selected", dataJoin);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("systemCode/GET_CODE", this.code);
      if (this.getCode.channeltuneApiResult.errorCode == 200) {
        this.items = this.getCode.channeltuneApiResult.sysCodeList;
      } else {
        this.alim(this.getCode.channeltuneApiResult.errorMessage, this.errorColor);
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    }
  },
};
</script>

<style scoped>
.check-group {
  display: flex;
}
.height {
  height: 30px;
}
</style>
