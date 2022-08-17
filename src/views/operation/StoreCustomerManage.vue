<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어 등록</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header" style="padding-bottom: 5px !important">
            <h2>스토어 리스트</h2>
            <div class="search">
              <input type="text" placeholder="스토어명을 입력하세요" v-model="searchText" class="search-input input-size" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              스토어 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="*" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">업체명</th>
                <th class="left">스토어명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="companyDetail(item.companyStoreSid)">
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreCompanyName }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td>{{ item.companyStoreStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">스토어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header-wrap d-flex justify-space-between">
            <ul class="tab-wrap">
              <li :class="change === 'aaa' ? 'active' : ''" @click="view('aaa')">기본 항목</li>
              <li :class="change === 'bbb' ? 'active' : ''" @click="view('bbb')">운영 항목</li>
              <li :class="change === 'ccc' ? 'active' : ''" @click="view('ccc')">계약 항목</li>
            </ul>
            <div class="btn-group" v-if="change !== 'ccc'">
              <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" @click="validate('modify')" class="mr5 ml5">수정</v-btn>
              <v-btn small color="error" @click="confirm(companyStoreSid)">삭제</v-btn>
              <v-btn small @click="clear" class="ml5">clear</v-btn>
            </div>
          </div>

          <div class="field">
            <base-items
              v-show="change === 'aaa'"
              :base="base"
              :status="emitStatus"
              @baseOK="baseOK"
              @alims="alimFunc"
              @updates="detailUpdate"
              @deletePhoto="delPhoto"
              @addMod="getBaseData"
            />
          </div>
          <div>
            <operation-items v-show="change === 'bbb'" :sensor="sensor" :status="propOperationItem" @updates="detailUpdate" @alims="alimFunc" />
            <contract-item
              v-show="change === 'ccc'"
              :storeContractList="storeContractList"
              @alims="alimFunc"
              @updates="detailUpdate"
              :sid="companyStoreSid"
            />
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import fileUploadMixin from "@/mixins/fileUpload";
import BaseItems from "./store-customer-manage/BaseItems.vue";
import ContractItem from "./store-customer-manage/ContractItem.vue";
import OperationItems from "./store-customer-manage/OperationItems.vue";
import isEmpty from "@/utils/empty";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, BaseItems, ContractItem, OperationItems },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //스토어 디테일 데이터

      companyStoreTrafficCensorHour: "",
      message: true,
      channeltuneFiles: [],
      file: [],
      codeReload: true,
      storeContractList: [],
      //셀렉트 설정
      storeStatusCode: "SYS21A15B014",
      siCode: "SYS21A15B001",
      guCode: "",
      dongCode: "",
      typeCode: "SYS21A15B012",
      //파일 삭제 아이디
      delId: "",
      //셀렉트 클리어
      dongClear: false,
      guClear: false,

      change: "aaa",
      base: {},
      sensor: {},
      operation: {},
      emitStatus: false,
      emitBase: {},
      emitSensor: {},
      txt: "",
      companyStoreSid: "",

      sendBaseData: {},
      baseCheck: false,
      sensorChecked: false,
      propOperationItem: false,
    };
  },
  computed: {
    ...mapGetters("companyStore", [
      "companyDelResult",
      "getCompanyStoreList",
      "getCompanyStoreDetail",
      "companyStoreAddResult",
      "companyStoreModifyResult",
    ]),
    ...mapGetters("contract", ["getContractStoreList", "getHistory"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    companyNationName(value) {
      value === "대한민국" || value === ""
        ? (document.querySelector(".zip-status").readOnly = true)
        : (document.querySelector(".zip-status").readOnly = false);
    },
    size() {
      this.reload(0);
    },
    load(data) {
      if (data === false) {
        bus.$emit("end:spinner");
        document.querySelector(".btn-group button").disabled = false;
        this.load = true;
      }
    },
    companyStoreAdministrativeZoneName1() {
      this.guClear = !this.guClear;
      this.dongClear = !this.dongClear;
    },
    sendBaseData(val) {
      if (Object.keys(val).length > 0) {
        if (this.txt === "reg") {
          this.reg();
        } else if (this.txt === "modify") {
          this.modify();
        }
      }
    },
    baseCheck(val) {
      const _this = this;
      if (val) {
        this.propOperationItem = true;
      }
      setTimeout(() => {
        _this.propOperationItem = false;
      }, 200);
    },
  },
  mounted() {
    this.reload(1);
  },
  methods: {
    //사진을 모달에서 삭제시
    detailUpdate(datas) {
      this.companyDetail(datas);
    },

    companyStoreAdministrativeZoneProp3(data) {
      this.companyStoreAdministrativeZone3 = data.sysCodeSid;
      this.companyStoreAdministrativeZoneName3 = data.sysCodeName;
    },
    companyStoreBusinessTypeProp(data) {
      this.companyStoreBusinessType = data.sysCodeSid;
      this.companyStoreBusinessTypeName = data.sysCodeName;
    },
    //스토어 업체 모달

    //모달에서 업체 선택시
    updateStore(data) {
      this.companyStoreCompanySid = data.companySid;
      this.companyStoreCompanyName = data.companyName;
    },

    //code emit
    companyStoreStatusProp(data) {
      this.companyStoreStatus = data.sysCodeSid;
      this.companyStoreStatusName = data.sysCodeName;
    },
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getCompanyStoreList.channeltuneApiResult.errorCode == 200) {
          const companyList = this.getCompanyStoreList.channeltuneApiResult.companyStore;
          this.list = companyList.data;
          this.len = companyList.last_page;
        } else {
          this.alim(this.getCompanyStoreList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 상세 정보
    async companyDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/GET_COMPANY_STORE_DETAIL", id);
        if (this.getCompanyStoreDetail.channeltuneApiResult.errorCode == 200) {
          const companyInfo = this.getCompanyStoreDetail.channeltuneApiResult.companyStore;
          const arr = companyInfo.fileResult.map((row) => {
            if (row.fileSid !== "") {
              //pdf 업로드 가능시 보내야할 데이터
              return { url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName };
            }
          });
          arr[0] === undefined ? (this.message = true) : (this.message = false);
          this.companyStoreSid = companyInfo.companyStoreSid;
          this.base = {
            companyStoreSid: companyInfo.companyStoreSid,
            companyStoreStatus: companyInfo.companyStoreStatus,
            companyStoreStatusName: companyInfo.companyStoreStatusName,
            companyStoreName: isEmpty(companyInfo.companyStoreName),
            companyStoreZone: isEmpty(companyInfo.companyStoreZone),
            companyStoreCompanySid: companyInfo.companyStoreCompanySid,
            companyStoreLatitude: companyInfo.companyStoreLatitude,
            companyStoreLongitude: companyInfo.companyStoreLongitude,
            companyStoreCompanyName: companyInfo.companyStoreCompanyName,
            companyStoreZipcode: companyInfo.companyStoreZipcode,
            companyStoreAddress1: companyInfo.companyStoreAddress1,
            companyStoreAddress2: companyInfo.companyStoreAddress2,
            companyStoreAdministrativeZone1: companyInfo.companyStoreAdministrativeZone1,
            companyStoreAdministrativeZoneName1: companyInfo.companyStoreAdministrativeZoneName1,
            companyStoreAdministrativeZone2: companyInfo.companyStoreAdministrativeZone2,
            companyStoreAdministrativeZoneName2: companyInfo.companyStoreAdministrativeZoneName2,
            companyStoreAdministrativeZone3: companyInfo.companyStoreAdministrativeZone3,
            companyStoreAdministrativeZoneName3: companyInfo.companyStoreAdministrativeZoneName3,
            companyStoreAgentSid: companyInfo.companyStoreAgentSid,
            companyStoreBusinessTypeName: companyInfo.companyStoreBusinessTypeName,
            companyStoreBusinessType: companyInfo.companyStoreBusinessType,
            companyStoreAgentName: companyInfo.companyStoreAgentName,
            companyStoreAgentUserName: isEmpty(companyInfo.companyStoreAgentUserName),
            companyStoreAgentUserHp: isEmpty(companyInfo.companyStoreAgentUserHp),
            companyStoreMemo: isEmpty(companyInfo.companyStoreMemo),
            companyStoreBillboardSize: companyInfo.companyStoreBillboardSize,
            companyStoreBillboardHorizontal: companyInfo.companyStoreBillboardHorizontal,
            companyStoreBillboardVertical: companyInfo.companyStoreBillboardVertical,
            file: arr,
            message: this.message,
          };
          this.sensor = {
            companyStoreCpm: companyInfo.companyStoreCpm,
            shops_id: companyInfo.shops_id,
            companyStoreMinSlot: companyInfo.companyStoreMinSlot,
            companyStoreDayCount: companyInfo.companyStoreDayCount,
            companyStoreWorkSlot: companyInfo.companyStoreWorkSlot,
            companyStoreTrafficCensorHour: companyInfo.companyStoreTrafficCensorHour,
            companyStoreDayAvgTraffic: companyInfo.companyStoreDayAvgTraffic,
          };
          await this.historyList(id);
        } else {
          this.alim(this.getCompanyStoreDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 추가
    async reg() {
      if (this.companyStoreSid === "") {
        this.companyStoreSid = null;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_ADD", this.sendBaseData);
        if (this.companyStoreAddResult.channeltuneApiResult.errorCode == 200) {
          this.deleteAllChip();
          this.alim("업체가 추가 되었습니다.", this.successColor);
          this.reload(0);
          this.sendBaseData = {};
        } else {
          this.alim(this.companyStoreAddResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      this.txt = status;
      if (status === "reg") {
        if (this.companyStoreSid !== "") {
          this.alim("고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      //설정값 초기화
      this.baseCheck = false;
      this.propOperationItem = false;
      this.emitStatus = !this.emitStatus;
    },
    //업체 수정
    async modify() {
      if (this.companyStoreSid === "") {
        this.alim("스토어를 선택해 주세요.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_MODIFY", { companyStoreSid: this.companyStoreSid, ...this.sendBaseData });
        if (this.companyStoreModifyResult.channeltuneApiResult.errorCode == 200) {
          this.deleteAllChip();
          await this.companyDetail(this.companyStoreSid);
          await this.reload();
          this.alim("수정 되었습니다.", this.successColor);

          this.sendBaseData = {};
        } else {
          this.alim(this.companyStoreModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("companyStore/COMPANY_DEL", this.companyStoreSid);
            if (this.companyDelResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.companyDelResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            if (this.fileDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              await this.companyDetail(this.companyStoreSid);
            } else {
              this.alim(this.fileDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    view(value) {
      this.change = value;
    },
    alimFunc(data) {
      this.emitStatus = false;
      this.baseCheck = false;
      this.propOperationItem = false;
      return this.alim(data, this.errorColor);
    },
    delPhoto(data) {
      this.confirmPhoto(data);
    },
    getBaseData(data) {
      this.sendBaseData = {};
      this.sendBaseData = data;
    },
    baseOK(status) {
      this.baseCheck = status;
    },
    async historyList(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("contract/CONTRACT_HISTORY", id);
        if (this.getHistory.channeltuneApiResult.errorCode == 200) {
          this.storeContractList = this.getHistory.channeltuneApiResult.contractStoreLink;
        } else {
          this.alim(this.getHistory.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach((ele) => ele.classList.remove("active"));
      this.companyStoreSid = "";
      this.base = {};
      this.sensor = {};
      this.operation = {};
      this.storeContractList = [];
      this.channeltuneFiles = [];
      this.sendBaseData = {};
      this.emitStatus = false;
      this.baseCheck = false;
      this.propOperationItem = false;
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
    border: 1px solid rgb(173, 173, 173);
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    margin-left: 1%;
    width: calc(100% - 36%);
    & .border {
      & .header-wrap {
        position: relative;
        border-bottom: 1px solid #dfdfdf;
        & .tab-wrap {
          display: flex;
          & > li {
            border-top: 1px solid #dfdfdf;
            border-right: 1px solid #dfdfdf;
            border-left: 1px solid #dfdfdf;
            padding: 5px 15px;
            margin-right: 5px;
            border-radius: 3px 3px 0 0;
            cursor: pointer;
            font-size: 1.3rem;
            position: relative;
            color: #333;
            &.active {
              background: #23b395;
              border-color: #23b395;
              color: #fff;
            }
          }
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
.td-overflow {
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
