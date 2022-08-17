<template>
  <div class="settlement-table">
    <h1>업체별 총 정산금액 TOP 10</h1>
    <table width="100%" class="tbl-reg column2 mt10">
      <colgroup>
        <col width="40" />
        <col width="*" />
        <col width="120" />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th class="left">업체명</th>
          <th class="pr20 right">정산 누적 금액</th>
        </tr>
      </thead>
    </table>
    <table id="scrolled">
      <colgroup>
        <col width="40" />
        <col width="*" />
        <col width="120" />
      </colgroup>
      <tbody>
        <tr v-for="(item, idx) in data" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td class="left">{{ item.companyName }}</td>
          <td class="pr20 right">{{ item.settlementDepositPriceTotal | comma }}</td>
        </tr>
      </tbody>
      <tfoot v-if="data.length < 1">
        <tr>
          <td colspan="3">정산 업체 리스트가 없습니다.</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  filters: {
    comma(val) {
      const parts = String(val).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  props: ["title", "data"],
};
</script>

<style lang="scss" scoped>
.settlement-table {
  & h1 {
    text-align: center;
  }
  display: flex;
  flex-direction: column;
  margin-right: 5%;

  & table {
    width: 100%;
    & tr {
      height: 30px;
      border-bottom: 1px solid #cacdd1;
    }
    & td {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      text-align: center;
    }
    & thead {
      background-color: #e9ebed;
    }
  }
}
#scrolled {
  margin-top: 0 !important;
  padding-top: 5px;
  overflow-y: auto;
}
.left {
  text-align: left !important;
}
</style>
