<template>
  <div class="v-application">
    <v-select v-model="select" :items="itemList" item-text="item" item-value="value" attach @blur="blurEvent" ref="vSelect">
      <template v-slot:prepend-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field v-model="search" placeholder="검색" @input="searchAction"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
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
  props: ["code", "data", "clear", "position", "department", "onlySelectPullDown"],
  data() {
    return {
      select: "",
      codelist: [],
      itemList: [],
      itemsCopy: [],
      search: "",
      //초기 로드
      size: "",
      page: "",
      searchText: "",
    };
  },
  computed: {
    ...mapGetters("interbridPosition", ["getPositionList"]),
    ...mapGetters("interbridDepartment", ["getPartList"]),
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
        let code = this.codelist.filter(arr => arr.sysCodeSid == val);
        if (code[0] !== undefined) {
          this.$emit("selected", code[0]);
        }
      }
    },
  },
  async mounted() {
    if (this.position === true) {
      try {
        await this.$store.dispatch("interbridPosition/POSITION_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getPositionList.channeltuneApiResult.errorCode == 200) {
          const kind = this.getPositionList.channeltuneApiResult.interbridPosition;
          const itemList = [];
          const codeList = [];
          kind.forEach(ele => {
            codeList.push({
              sysCodeName: ele.interbridPositionName,
              sysCodeSid: ele.interbridPositionSid,
            });
            itemList.push({
              item: ele.interbridPositionName,
              value: ele.interbridPositionSid,
            });
          });
          this.codelist = codeList;
          this.itemList = itemList;
          this.itemsCopy = [...this.itemList];
        } else {
          this.alim(this.getPositionList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    }
    if (this.department === true) {
      try {
        await this.$store.dispatch("interbridDepartment/PART_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getPartList.channeltuneApiResult.errorCode == 200) {
          const kind = this.getPartList.channeltuneApiResult.interbridDepartment;
          const itemList = [];
          const codeList = [];
          kind.forEach(ele => {
            codeList.push({
              sysCodeName: ele.interbridDepartmentName,
              sysCodeSid: ele.interbridDepartmentSid,
            });
            itemList.push({
              item: ele.interbridDepartmentName,
              value: ele.interbridDepartmentSid,
            });
          });
          this.codelist = codeList;
          this.itemList = itemList;
          this.itemsCopy = [...this.itemList];
        } else {
          this.alim(this.getPartList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    }
  },
  methods: {
    blurEvent() {
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
  },
};
</script>

<style></style>
