<template>
  <div class="side-bar">
    <nav class="lnb">
      <ul>
        <li v-for="(item, index) in subList" :key="index" :class="{ 'init-depths': item.submenuCount > 0 }">
          <router-link :to="item.sysCodeVal1" :class="{ depths1: item.submenuCount > 0 }"
            ><span class="icon"
              ><v-icon>{{ item.sysCodeVal2 }}</v-icon></span
            >{{ item.sysCodeName }}
            <!--						<span class="arrow" v-if="item.submenuCount > 0"><v-icon>mdi-chevron-down</v-icon></span>-->
          </router-link>
          <ul class="depths2">
            <li v-for="(item2, index) in item.children" :key="index">
              <router-link :to="item2.sysCodeVal1">{{ item2.sysCodeName }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUiCodeCookie } from "@/utils/cookie.js";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      sid: "",
      subList: [],
      depths3List: [],
      depthsShow: false,
      id: "",
      subId: "",
      uiCode: ["SYS21728B060", "SYS21728B061", "SYS21728B062", "SYS21B22B037", "SYS21728B063", "SYS21A05B003", "SYS21728B064"],
      SYS21728B060_DATA: [],
      SYS21728B061_DATA: [],
      SYS21728B062_DATA: [],
      SYS21B22B037_DATA: [],
      SYS21728B063_DATA: [],
      SYS21A05B003_DATA: [],
      SYS21728B064_DATA: [],
      statusArray: [],
    };
  },
  computed: {
    ...mapGetters("common", [
      "getMenuList",
      "code1depths",
      "SYS21728B060",
      "SYS21728B061",
      "SYS21728B062",
      "SYS21B22B037",
      "SYS21728B063",
      "SYS21A05B003",
      "SYS21728B064",
    ]),
  },
  watch: {
    SYS21728B060_DATA(n) {
      this.$store.commit("common/SYS21728B060", n);
    },
    SYS21728B061_DATA(n) {
      this.$store.commit("common/SYS21728B061", n);
    },
    SYS21728B062_DATA(n) {
      this.$store.commit("common/SYS21728B062", n);
    },
    SYS21B22B037_DATA(n) {
      this.$store.commit("common/SYS21B22B037", n);
    },
    SYS21728B063_DATA(n) {
      this.$store.commit("common/SYS21728B063", n);
    },
    SYS21A05B003_DATA(n) {
      this.$store.commit("common/SYS21A05B003", n);
    },
    SYS21728B064_DATA(n) {
      this.$store.commit("common/SYS21728B064", n);
    },
  },
  created() {
    bus.$on("uiSet", this.uiChange);
  },
  mounted() {
    this.reload();
  },
  beforeDestroy() {
    bus.$off("uiSet", this.uiChange);
  },
  methods: {
    reload() {
      this.id = getUiCodeCookie();
      try {
        this.uiCode.forEach(async elm => {
          await this.$store.dispatch("common/MENU_LIST", elm);
          const list = this.getMenuList.channeltuneApiResult;
          for (const ele of list.menu) {
            if (ele.submenuCount > 0) {
              await this.$store.dispatch("common/MENU_LIST", ele.sysCodeSid);
              ele.children = this.getMenuList.channeltuneApiResult.menu;
              this[`${elm}_DATA`].push(ele);
            } else {
              this[`${elm}_DATA`].push(ele);
            }
          }
          this.subList = this[this.id];
        });
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    },
    uiChange() {
      this.code1depths.forEach(ele => {
        this[ele].length === 0 ? this.statusArray.push(0) : this.statusArray.push(1);
      });
      this.statusArray.includes(1) ? this.change() : this.reload();
    },
    change() {
      this.id = getUiCodeCookie();
      this.subList = this[this.id];
    },
  },
};
</script>
<style scoped>
.depths2 {
  height: auto !important;
}
</style>
