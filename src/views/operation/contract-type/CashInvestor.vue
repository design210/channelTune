<template>
  <div>
    <h2 class="mt50">현금 투자자 계약</h2>

    <div v-for="(item, idx) in arr" :key="item.sysCodeSid">
      <h3 class="mt20">
        {{ idx + 1 }}.&nbsp; <v-checkbox v-model="contractCashmemberKind" :label="item.sysCodeName" :value="item.sysCodeSid"></v-checkbox>
      </h3>
      <div :ref="item.sysCodeSid">
        투자금액
        <input type="text" class="basic w80" v-model="item.contractCashmemberInvestmentAmount" :readonly="item.read" />에 대한 연 이자율
        <input type="text" class="basic w80" v-model="item.contractCashmemberConsecutiveInterest" :readonly="item.read" /> %를 12개월로 나눈 값과,
        투자 광고 매출액의 <input type="text" class="basic w80" v-model="item.contractCashmemberInvestmentRate" :readonly="item.read" /> %를 수수료로
        한다.
      </div>
    </div>

    <h3 class="mt30">6.&nbsp; <v-checkbox v-model="contractCashmemberKind" label="P" value="SYS22331B007"></v-checkbox></h3>
    <div>
      투자금액 <input type="text" class="basic w80" v-model="contractCashmemberInvestmentAmount5" :readonly="stat" />에 대한 연 이자율
      <input type="text" class="basic w80" v-model="contractCashmemberConsecutiveInterest5" :readonly="stat" /> %를 12개월로 나눈 값을 수수료로 한다.
    </div>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { alim },
  mixins: [alimMixin, loading],
  props: ["status", "contractCashmember"],
  data() {
    return {
      contractCashmemberKind: [],
      contractCashmemberInvestmentAmount: [],
      contractCashmemberConsecutiveInterest: [],
      contractCashmemberInvestmentRate: [],
      contractCashmemberInvestmentAmount5: "",
      contractCashmemberConsecutiveInterest5: "",
      arr: [],
      arr2: [
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "A",
          sysCodeSid: "SYS22331B002",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "B",
          sysCodeSid: "SYS22331B003",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C",
          sysCodeSid: "SYS22331B004",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C-11호",
          sysCodeSid: "SYS22331B005",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C-12호",
          sysCodeSid: "SYS22331B006",
        },
      ], //캐싱을 위함
      stat: true,
    };
  },
  computed: {
    ...mapGetters("systemCode", ["getCode"]),
  },
  watch: {
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
    contractCashmember(val) {
      this.getObjData(val);
    },
    contractCashmemberKind(val, news) {
      //체크를 풀었을 때
      if (news.length > val.length) {
        const list = news.filter(x => !val.includes(x)); //두 배열 중 체크 푼 값을 찾아서
        if (list[0] === "SYS22331B007") {
          this.contractCashmemberInvestmentAmount5 = "";
          this.contractCashmemberConsecutiveInterest5 = "";
          this.stat = true;
        }
        this.arr.forEach((item, idx, thisAr) => {
          //값을 빈 값으로 초기화
          if (list[0] === item.sysCodeSid) {
            thisAr[idx].contractCashmemberInvestmentAmount = "";
            thisAr[idx].contractCashmemberConsecutiveInterest = "";
            thisAr[idx].contractCashmemberInvestmentRate = "";
            thisAr[idx].read = true;
          }
        });
      }
      val.forEach(item => {
        if (item === "SYS22331B007") {
          this.stat = false;
        }
        this.arr.forEach((obj, idx, arr) => {
          if (item === obj.sysCodeSid) {
            arr[idx].read = false;
          }
        });
      });
    },
  },
  mounted() {
    this.getSysCode();
  },
  methods: {
    getObjData(propArr) {
      if (propArr.length !== 0) {
        this.refresh();
        this.contractCashmemberKind = [];
        this.contractCashmemberInvestmentAmount5 = "";
        this.contractCashmemberConsecutiveInterest5 = "";

        for (let i = 0; i < propArr.length; i++) {
          this.contractCashmemberKind.push(propArr[i].contractCashmemberKind);
          if (propArr[i].contractCashmemberKind === "SYS22331B007") {
            this.contractCashmemberInvestmentAmount5 = propArr[i].contractCashmemberInvestmentAmount;
            this.contractCashmemberConsecutiveInterest5 = propArr[i].contractCashmemberConsecutiveInterest;
          } else {
            const idx = this.arr.findIndex(item => item.sysCodeSid === propArr[i].contractCashmemberKind);
            this.arr[idx].contractCashmemberInvestmentAmount = propArr[i].contractCashmemberInvestmentAmount;
            this.arr[idx].contractCashmemberConsecutiveInterest = propArr[i].contractCashmemberConsecutiveInterest;
            this.arr[idx].contractCashmemberInvestmentRate = propArr[i].contractCashmemberInvestmentRate;
          }
        }
      }
    },
    returnEmitData() {
      //보낼 배열 데이터 초기화(등록 에러 났을 때 중첩되는 데이터들 없애기 위함)
      this.contractCashmemberInvestmentAmount = [];
      this.contractCashmemberConsecutiveInterest = [];
      this.contractCashmemberInvestmentRate = [];

      //for문 돌면서 투자 P에 대한 값 담기
      for (let i = 0; i < this.contractCashmemberKind.length; i++) {
        if (this.contractCashmemberKind[i] === "SYS22331B007") {
          this.contractCashmemberInvestmentAmount = [...this.contractCashmemberInvestmentAmount, this.contractCashmemberInvestmentAmount5];
          this.contractCashmemberConsecutiveInterest = [...this.contractCashmemberConsecutiveInterest, this.contractCashmemberConsecutiveInterest5];
          this.contractCashmemberInvestmentRate = [...this.contractCashmemberInvestmentRate, 0];
        }

        //P를 제외한 나머지 값을 담기
        for (let j = 0; j < this.arr.length; j++) {
          if (this.contractCashmemberKind[i] === this.arr[j].sysCodeSid) {
            this.contractCashmemberInvestmentAmount = [...this.contractCashmemberInvestmentAmount, this.arr[j].contractCashmemberInvestmentAmount];
            this.contractCashmemberConsecutiveInterest = [
              ...this.contractCashmemberConsecutiveInterest,
              this.arr[j].contractCashmemberConsecutiveInterest,
            ];
            this.contractCashmemberInvestmentRate = [...this.contractCashmemberInvestmentRate, this.arr[j].contractCashmemberInvestmentRate];
          }
        }
      }

      if (this.contractCashmemberKind.length < 1) {
        return this.$emit("alims", "투자 시리즈를 하나 이상 선택해주세요.");
      }
      const idx = this.contractCashmemberKind.map(item => {
        return this.arr.findIndex(items => item === items.sysCodeSid);
      });

      for (let i = 0; i < idx.length; i++) {
        if (idx[i] === -1) {
          if (this.contractCashmemberInvestmentAmount5 === "") {
            return this.$emit("alims", `투자 시리즈 P의 투자금액을 입력해주세요.`);
          }
          if (this.contractCashmemberConsecutiveInterest5 === "") {
            return this.$emit("alims", `투자 시리즈 P의 연 이자율을 입력해주세요.`);
          }
        } else {
          if (!this.arr[idx[i]].read) {
            if (this.arr[idx[i]].contractCashmemberInvestmentAmount === "") {
              return this.$emit("alims", `투자 시리즈 ${this.arr[idx[i]].sysCodeName}의 투자금액을 입력해주세요.`);
            }
            if (this.arr[idx[i]].contractCashmemberConsecutiveInterest === "") {
              return this.$emit("alims", `투자 시리즈 ${this.arr[idx[i]].sysCodeName}의 연 이자율을 입력해주세요.`);
            }
            if (this.arr[idx[i]].contractCashmemberInvestmentRate === "") {
              return this.$emit("alims", `투자 시리즈 ${this.arr[idx[i]].sysCodeName}의 매출액의 수수료 비율을 입력해주세요.`);
            }
          }
        }
      }
      const sendData = {
        contractCashmemberKind: this.contractCashmemberKind,
        contractCashmemberInvestmentAmount: this.contractCashmemberInvestmentAmount,
        contractCashmemberConsecutiveInterest: this.contractCashmemberConsecutiveInterest,
        contractCashmemberInvestmentRate: this.contractCashmemberInvestmentRate,
      };
      this.$emit("watcher", sendData);
    },
    clear() {
      this.contractCashmemberKind = [];
      this.contractCashmemberInvestmentAmount = [];
      this.contractCashmemberConsecutiveInterest = [];
      this.contractCashmemberInvestmentRate = [];
      this.contractCashmemberInvestmentAmount5 = "";
      this.contractCashmemberConsecutiveInterest5 = "";
      this.arr = [];
      this.stat = true;
    },
    async getSysCode() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("systemCode/GET_CODE", "SYS22331B001");
        const kind = this.getCode.channeltuneApiResult.sysCodeList;
        const result = kind.map(item => {
          const data = {};
          data[`contractCashmemberInvestmentAmount`] = "";
          data[`contractCashmemberConsecutiveInterest`] = "";
          data[`contractCashmemberInvestmentRate`] = "";
          data[`read`] = true;
          return {
            sysCodeSid: item.sysCodeSid,
            sysCodeName: item.sysCodeName,
            ...data,
          };
        });
        result.splice(-1, 1);
        this.arr = result;
        if (this.contractCashmember.length > 0) {
          this.getObjData(this.contractCashmember);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    refresh() {
      this.arr = [
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "A",
          sysCodeSid: "SYS22331B002",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "B",
          sysCodeSid: "SYS22331B003",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C",
          sysCodeSid: "SYS22331B004",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C-11호",
          sysCodeSid: "SYS22331B005",
        },
        {
          contractCashmemberConsecutiveInterest: "",
          contractCashmemberInvestmentAmount: "",
          contractCashmemberInvestmentRate: "",
          read: true,
          sysCodeName: "C-12호",
          sysCodeSid: "SYS22331B006",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  display: flex;
}
</style>
