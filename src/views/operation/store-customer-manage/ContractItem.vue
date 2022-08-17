<template>
  <div class="overflow border border-outside">
    <div class="d-flex justify-space-between align-center">
      <h4>스토어 업체 계약 리스트</h4>
      <v-btn small color="primary" @click="showStoreContractModalPopup">스토어 업체 계약 처리</v-btn>
    </div>
    <table width="100%" class="tbl tbl-box mt20">
      <colgroup>
        <col width="50" />
        <col width="80" />
        <col width="80" />
        <col width="150" />
        <col width="100" />
        <col width="*" />
        <col width="110" />
      </colgroup>
      <thead>
        <tr>
          <th>코드</th>
          <th>시작날짜</th>
          <th>종료날짜</th>
          <th class="left">정산업체명</th>
          <th>계약서 고유코드</th>
          <th class="left">계약서명</th>
          <th class="left">계약서종류</th>
        </tr>
      </thead>
    </table>
    <table width="100%" class="tbl-box tbl select-tbl" id="scrolled">
      <colgroup>
        <col width="50" />
        <col width="80" />
        <col width="80" />
        <col width="150" />
        <col width="100" />
        <col width="*" />
        <col width="110" />
      </colgroup>
      <tbody>
        <tr v-for="(item, index) in storeContractList" :key="index" @click="showStoreContractModalPopup(item.contractStoreLinkSid)">
          <td>{{ item.contractStoreLinkSid }}</td>
          <td>{{ item.contractStoreLinkStartDate }}</td>
          <td>{{ item.contractStoreLinkEndDate }}</td>
          <td class="left">{{ item.companyName }}</td>
          <td>{{ item.contractSid }}</td>
          <td class="left">{{ item.contractTitle }}</td>
          <td class="left">{{ item.contractStoreLinkKindName }}</td>
        </tr>
      </tbody>
      <tfoot v-if="storeContractList.length < 1">
        <tr>
          <td colspan="7">계약서 리스트가 없습니다.</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import storeContractModal from "@/components/modal/operation/StoreContract.vue";
import { getPopupOpt } from "@/utils/modal";
export default {
  props: ["storeContractList", "sid"],
  methods: {
    showStoreContractModalPopup(id) {
      if (this.sid === undefined || this.sid === "") {
        return this.$emit("alims", "스토어를 선택해주세요");
      }
      this.$modal.show(
        storeContractModal,
        { update: this.updateStoreContract, contractStoreLinkSid: id, CSid: this.sid },
        getPopupOpt("storeContractModal", "800px", "auto", false),
      );
    },
    updateStoreContract() {
      this.$emit("updates", this.sid);
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
#scrolled {
  margin-top: 0 !important;
  padding-top: 5px;
  overflow-y: auto;
}
</style>
