<template>
  <div class="set-left">
    <table width="100%" class="tbl-reg">
      <colgroup>
        <col width="90" />
        <col width="*" />
        <col width="105" />
        <col width="*" />
        <col width="60" />
        <col width="*" />
      </colgroup>
      <tr>
        <td>WI 고유코드</td>
        <td colspan="3"><input type="text" v-model="shops_id" /></td>
      </tr>
      <tr>
        <td class="required">최대 광고 슬롯수</td>
        <td colspan="3"><input type="text" v-model="companyStoreWorkSlot" /></td>
      </tr>
      <tr>
        <td class="required">CPM</td>
        <td colspan="3"><input type="text" v-model="companyStoreCpm" /></td>
      </tr>
      <tr>
        <td class="required">트래픽 운영 시간</td>
        <td colspan="3"><input type="text" v-model="companyStoreTrafficCensorHour" /></td>
      </tr>
      <tr>
        <td class="required" colspan="2">기본 일일 평균 통행량</td>
        <td colspan="2"><input type="text" v-model="companyStoreDayAvgTraffic" /></td>
      </tr>
      <tr>
        <td class="required" colspan="2">최소 광고 슬롯 수</td>
        <td colspan="2"><input type="text" v-model="companyStoreMinSlot" /></td>
      </tr>
      <tr>
        <td class="required" colspan="2">최소 광고 일수</td>
        <td colspan="2"><input type="text" v-model="companyStoreDayCount" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  props: ["sensor", "status"],
  data() {
    return {
      companyStoreWorkSlot: "",
      companyStoreCpm: "",
      companyStoreTrafficCensorHour: "",
      companyStoreDayAvgTraffic: "",
      shops_id: "",
      companyStoreMinSlot: "",
      companyStoreDayCount: "",
    };
  },
  watch: {
    sensor(val) {
      this.shops_id = val.shops_id;
      this.companyStoreWorkSlot = val.companyStoreWorkSlot;
      this.companyStoreCpm = val.companyStoreCpm;
      this.companyStoreTrafficCensorHour = val.companyStoreTrafficCensorHour;
      this.companyStoreDayAvgTraffic = val.companyStoreDayAvgTraffic;
      this.companyStoreMinSlot = val.companyStoreMinSlot;
      this.companyStoreDayCount = val.companyStoreDayCount;
    },
    status(val) {
      if (val) {
        return this.returnEmitData();
      }
    },
  },
  methods: {
    clear() {
      this.shops_id = "";
      this.companyStoreWorkSlot = "";
      this.companyStoreCpm = "";
      this.companyStoreTrafficCensorHour = "";
      this.companyStoreDayAvgTraffic = "";
      this.companyStoreMinSlot = "";
      this.companyStoreDayCount = "";
    },
    returnEmitData() {
      if (this.companyStoreWorkSlot == "" || this.companyStoreWorkSlot == null) {
        return this.$emit("alims", "최대 광고 슬롯 수를 입력해주세요.");
      }
      if (this.companyStoreCpm == "" || this.companyStoreCpm == null) {
        return this.$emit("alims", "CPM을 입력해주세요.");
      }
      if (this.companyStoreTrafficCensorHour == "" || this.companyStoreTrafficCensorHour == null) {
        return this.$emit("alims", "트래픽 운영 시간을 입력해주세요.");
      }
      if (this.companyStoreDayAvgTraffic == "" || this.companyStoreDayAvgTraffic == null) {
        return this.$emit("alims", "일일 평균 통행량을 입력해주세요.");
      }
      if (this.companyStoreMinSlot == "" || this.companyStoreMinSlot == null) {
        return this.$emit("alims", "최소 광고 슬롯 수를 입력해주세요.");
      }
      if (this.companyStoreDayCount == "" || this.companyStoreDayCount == null) {
        return this.$emit("alims", "최소 광고 일수를 입력해주세요.");
      }
      bus.$emit("getSensorData", this.$data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tbl-wrap {
  border: 1px solid #e7e7e7;
  & .overflow {
    max-height: 595px;
    overflow-y: auto;
  }
}
.input-size {
  width: 150px !important;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.field-div {
  & .input-first {
    width: 110px !important;
  }
  & .input-last {
    width: calc(100% - 175px) !important;
  }
}
.field {
  display: flex;
  justify-content: space-between;
  & .set-left {
    width: calc(50% - 10px);
  }
  & .set-right {
    width: calc(50% - 10px);
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 35% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    margin-left: 1%;
    width: calc(100% - 36%);
    & .border {
      & .header {
        & .search {
          & input[type="text"] {
            border: 1px solid #ccc;
            height: 30px;
            padding: 0 10px;
            width: 200px;
          }
          & button {
            margin-left: 5px;
          }
        }
      }
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.td-overflow {
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
