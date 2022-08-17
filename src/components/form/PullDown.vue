<template>
  <div>
    <div class="v-application">
      <v-select
        v-model="select"
        :items="itemList"
        item-text="item"
        item-value="value"
        attach
        @blur="blurEvent"
        ref="vSelect"
        :label="customLabel == '' ? '' : customLabel"
        :readonly="readOnly === true"
      >
        <template v-slot:prepend-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field v-model="search" placeholder="검색" @input="searchAction"></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: [
    "code",
    "data",
    "clear",
    "codeReload",
    "si",
    "gu",
    "dong",
    "customLabel",
    "includeTotalElem",
    "onlySelectPullDown", // 검색없이 선택만 하는 pulldown일경우, blurEvent()에서사용
    "readOnly",
    "hiddenToggle", //필요없는 option이 있으면 선택,
    "hiddenops", //필요없는 옵션 값들(배열)
    "zipUpdate",
  ],
  data() {
    return {
      select: "",
      codelist: [],
      itemsCopy: [],
      search: "",
      itemList: [],
      dataTemp: "",
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
        let code = this.codelist.filter((arr) => arr.sysCodeSid == val);
        if (code[0] !== undefined) {
          this.$emit("selected", code[0]);
        }
      }
      if (val === "전체") {
        this.$emit("selected", "All");
      }
    },
  },
  mounted() {
    this.reload();
    const siButton = document.querySelector(".pull-down.si");
    if (siButton) {
      siButton.addEventListener("click", () => {
        const textItem = document.querySelector(".pull-down.si .v-list-item__title");
        if (textItem.textContent === "데이터가 없습니다.") textItem.textContent = "주소검색을 해주세요.";
      });
    }
    const guButton = document.querySelector(".pull-down.gu");
    if (guButton) {
      guButton.addEventListener("click", () => {
        const textItem = document.querySelector(".pull-down.gu .v-list-item__title");
        if (textItem.textContent === "데이터가 없습니다.") textItem.textContent = "행정구역을 먼저 선택해 주세요.";
      });
    }
    const dongButton = document.querySelector(".pull-down.dong");
    if (dongButton) {
      dongButton.addEventListener("click", () => {
        const textItem = document.querySelector(".pull-down.dong .v-list-item__title");
        if (textItem.textContent === "데이터가 없습니다.") textItem.textContent = "행정구를 먼저 선택해 주세요.";
      });
    }
  },
  methods: {
    // 모달에서 바깥쪽 클릭해도 v-select 안사라져서 추가
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
        this.itemList = this.itemsCopy.filter((items) => {
          return items.item.includes(this.search);
        });
      }
    },
    async reload() {
      try {
        if (this.code !== "") {
          await this.$store.dispatch("systemCode/GET_CODE", this.code);
          let kind = this.getCode.channeltuneApiResult.sysCodeList;
          const codeList = [];

          const itemList = [];
          //보이지 않아야 할 옵션이 있다면 값을 삭제
          if (this.hiddenToggle) {
            kind = kind.filter((item) => !this.hiddenops.includes(item.sysCodeSid));
          }
          kind.forEach((ele) => {
            if (["SYS21910B012"].includes(this.code)) {
              if (ele.sysCodeVal === "Y") {
                codeList.push({
                  sysCodeName: ele.sysCodeName,
                  sysCodeSid: ele.sysCodeSid,
                  sysCodeVal: ele.sysCodeVal,
                  sysCodeVal1: ele.sysCodeVal1,
                  sysCodeVal2: ele.sysCodeVal2,
                  sysCodeVal3: ele.sysCodeVal3,
                  sysCodeVal4: ele.sysCodeVal4,
                });
                itemList.push({
                  item: ele.sysCodeName,
                  value: ele.sysCodeSid,
                });
              }
            } else {
              codeList.push({
                sysCodeName: ele.sysCodeName,
                sysCodeSid: ele.sysCodeSid,
                sysCodeVal: ele.sysCodeVal,
                sysCodeVal1: ele.sysCodeVal1,
                sysCodeVal2: ele.sysCodeVal2,
                sysCodeVal3: ele.sysCodeVal3,
                sysCodeVal4: ele.sysCodeVal4,
              });
              itemList.push({
                item: ele.sysCodeName,
                value: ele.sysCodeSid,
              });
            }
          });
          this.itemList = itemList;
          this.codelist = codeList;

          if (this.includeTotalElem === true) {
            this.itemList = [{ item: "전체", value: "All" }, ...this.itemList];
            this.codelist = [
              {
                sysCodeName: "전체",
                sysCodeSid: "All",
                sysCodeVal: "",
                sysCodeVal1: "",
                sysCodeVal2: "",
                sysCodeVal3: "",
                sysCodeVal4: "",
              },
              ...this.codelist,
            ];
          }

          this.itemsCopy = [...this.itemList];
          this.dataTemp = this.data;
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    },
  },
};
</script>

<style></style>
