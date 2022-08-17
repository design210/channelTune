<template>
  <div class="v-application">
    <v-select :readonly="onlyRead === true" v-model="select" :items="items" attach></v-select>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import alimMixin from "@/mixins/alim";
export default {
  components: { alim },
  mixins: [alimMixin],
  props: ["code", "data", "clear", "onlyRead"],
  data() {
    return {
      select: "",
      items: [],
      sysCodeVal1: "",
      sysCodeVal2: "",
      sysCodeVal3: "",
      sysCodeVal4: "",
    };
  },
  computed: {
    ...mapGetters("systemCode", ["getCodeDetail"]),
  },
  watch: {
    //초기화
    clear(o, n) {
      if (o !== n) {
        this.select = "";
      }
    },
    //리스트 선택시 상세에 선택값 표기
    data(val) {
      if (val == null) {
        this.select = "";
      } else {
        this.select = val;
      }
    },
    //셀렉트 선택시 시스템 코드 데이터 emit
    select(val) {
      if (val !== "" || val !== undefined) {
        this.$emit("selected", val);
      }
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("systemCode/GET_CODE_DETAIL", this.code);
      const detail = this.getCodeDetail.channeltuneApiResult.sysCodeList;
      this.sysCodeVal1 = detail.sysCodeVal1;
      this.sysCodeVal2 = detail.sysCodeVal2;
      this.sysCodeVal3 = detail.sysCodeVal3;
      this.sysCodeVal4 = detail.sysCodeVal4;
      for (let i = 1; i <= this.sysCodeVal1; i++) {
        this.items.push(i);
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    }
  },
};
</script>

<style></style>
