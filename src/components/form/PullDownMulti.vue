<template>
  <div class="v-application">
    <v-select v-model="select" :items="itemList" item-text="item" item-value="value" multiple @blur="blurEvent" ref="vSelect"></v-select>
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
  props: [
    "code",
    "data",
    "clear",
    "codeReload",
    "onlySelectPullDown", // 검색없이 선택만 하는 pulldown일경우, blurEvent()에서사용
    "selectDefault",
  ],
  data() {
    return {
      select: [],
      codelist: [],
      items: [],
      itemsCopy: [],
      search: "",
      itemList: [],
    };
  },
  computed: {
    ...mapGetters("systemCode", ["getCode"]),
  },
  watch: {
    codeReload() {
      this.reload();
    },
    code() {
      this.reload();
    },
    //초기화
    clear(o, n) {
      if (o !== n) {
        this.select = [];
      }
    },
    selectDefault(n) {
      setTimeout(() => {
        this.select = n;
      }, 500);
    },
    //셀렉트 선택시 시스템 코드 데이터 emit
    select(val) {
      const selectCodeList = [];
      if (val == undefined || val == null) {
        return;
      }
      if (val.length > 0) {
        this.codelist.forEach(ele => {
          val.forEach(name => {
            if (name === ele.sysCodeSid) {
              selectCodeList.push(ele);
            }
          });
        });
      }
      this.$emit("selected", selectCodeList);
    },
  },
  mounted() {
    this.reload();
  },
  methods: {
    // 모달에서 바깥쪽 클릭해도 v-select 안사라져서 추가
    blurEvent(data) {
      if (this.onlySelectPullDown != "" && this.onlySelectPullDown) {
        this.$refs.vSelect.blur();
      }
    },
    //검색 옵션
    searchAction() {
      if (!this.search) {
        this.itemList = this.itemsCopy;
      } else {
        this.itemList = this.itemsCopy.filter(items => {
          return items.item.includes(this.search);
        });
      }
    },
    async reload() {
      if (this.code !== "") {
        try {
          await this.$store.dispatch("systemCode/GET_CODE", this.code);
          const kind = this.getCode.channeltuneApiResult.sysCodeList;
          const itemList = [];
          const codeList = [];
          kind.forEach(ele => {
            codeList.push({
              sysCodeName: ele.sysCodeName,
              sysCodeSid: ele.sysCodeSid,
              sysCodeVal: ele.sysCodeVal,
            });
            itemList.push({
              item: ele.sysCodeName,
              value: ele.sysCodeSid,
            });
          });
          this.codelist = codeList;
          this.itemList = itemList;
          this.itemsCopy = [...this.itemList];
        } catch (error) {
          this.alim(error, this.errorColor);
        }
      }
      this.select = this.data.split(",");
    },
  },
};
</script>

<style></style>
