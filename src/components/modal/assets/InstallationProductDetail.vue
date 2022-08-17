<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>설치 제품 상세</h1>
    </template>

    <template slot="body">
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <table width="100%" class="tbl-reg column2">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>설치시공일</td>
              <!-- <td><input type="text" class="input-first" readonly/></td> -->
              <td class="field-div">
                <!-- <input type="text" class="input-first" v-model="productInstallionStoreDate" /> -->
                <input type="text" class="input-first" readonly v-model="productInstallionStoreDate" />
              </td>
            </tr>
            <tr>
              <td>선팅설치업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreSuntionCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreSuntionCompanyName" />
              </td>
            </tr>
            <tr>
              <td>설치시공업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreCompanyName" />
              </td>
            </tr>
            <tr>
              <td>프로젝터설치업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreProjectCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreProjectCompanyName" />
              </td>
            </tr>
          </table>
          <div class="com-container" v-if="list.length > 0">
            <div class="mt10" id="scrolled" v-for="item in list" :key="item.productInstallionStoreInfoSid">
              <film v-if="item.productKind === 'SYS21910B007'" :data="item" :read="false"></film>
              <projector v-if="item.productKind === 'SYS21910B005'" :data="item" :read="true"></projector>
              <router v-if="item.productKind === 'SYS21910B006'" :data="item" :read="true"></router>
              <smart-plug v-if="item.productKind === 'SYS21B11B001'" :data="item" :read="true"></smart-plug>
              <tune-controller v-if="item.productKind === 'SYS21910B004'" :data="item" :read="true"></tune-controller>
              <traffic-sensor v-if="item.productKind === 'SYS21B11B002'" :read="true" :data="item"></traffic-sensor>
            </div>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
      </section>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import showPrintModal from "@/components/modal/assets/ProductionSerial";
import { getPopupOpt } from "@/utils/modal";
import Film from "@/views/asset/storeDetail/Film.vue";
import Projector from "@/views/asset/storeDetail/Projector.vue";
import Router from "@/views/asset/storeDetail/Router.vue";
import SmartPlug from "@/views/asset/storeDetail/SmartPlug.vue";
import TuneController from "@/views/asset/storeDetail/TuneController.vue";
import TrafficSensor from "@/views/asset/storeDetail/TrafficSensor.vue";
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
export default {
  components: {
    modalWrap,
    Film,
    Projector,
    Router,
    SmartPlug,
    TuneController,
    TrafficSensor,
    alim,
  },
  mixins: [loading, alimMixin],
  props: ["productInstallionStoreid", "companyStoreid"],
  data() {
    return {
      page: 1,
      size: 8,
      len: null,
      list: [],

      productInstallionStoreSid: "",
      productInstallionStoreDate: "",
      productInstallionStoreSuntionCompanySid: "",
      productInstallionStoreSuntionCompanyName: "",
      productInstallionStoreCompanySid: "",
      productInstallionStoreCompanyName: "",
      productInstallionStoreProjectCompanySid: "",
      productInstallionStoreProjectCompanyName: "",

      existStoreInfo: [], // 설치제품이 있는지 확인하는 배열
    };
  },
  computed: {
    ...mapGetters("assetProduct", ["getProductInstallionStoreInfoList", "getProductInstallionStoreDetail"]),
  },
  mounted() {
    this.productInstallionStoreSid = this.productInstallionStoreid;
    this.companyStoreSid = this.companyStoreid;
    this.getInstallionStoreInfo();
    this.getInstallionStore();
  },
  methods: {
    close() {
      this.$emit("close");
    },

    newProductInstallionStoreDate(data) {
      this.productInstallionStoreDate = data;
    },

    async getInstallionStoreInfo() {
      if (this.productInstallionStoreSid === "" || this.productInstallionStoreSid == null) {
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTOREINFO_LIST", {
          productInstallionStoreSid: this.productInstallionStoreSid,
          size: this.size,
          page: this.page,
        });

        if (this.getProductInstallionStoreInfoList.channeltuneApiResult.errorCode == 200) {
          const response = this.getProductInstallionStoreInfoList.channeltuneApiResult.productInstallionStoreInfo;
          this.list = response.data;
          this.list.sort((a, b) => (a.productKind < b.productKind ? -1 : 1)); //배열 정렬(같은 설치 제품을 순서대로 두기 위함)
          this.len = response.last_page;
        } else {
          this.alim(this.getProductInstallionStoreInfoList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showSerialPrintPopup() {
      this.$modal.show(showPrintModal, { id: this.controllerProductionSid }, getPopupOpt("showPrintModal", "1000px", "auto", false));
    },

    async getInstallionStore() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_DETAIL", this.companyStoreSid);
        const response = this.getProductInstallionStoreDetail.channeltuneApiResult;
        if (response.errorCode === 200) {
          this.companyNation = response.productInstallionStore.companyNation;
          this.companyStoreAddress1 = response.productInstallionStore.companyStoreAddress1;
          this.companyStoreAddress2 = response.productInstallionStore.companyStoreAddress2;
          this.companyStoreAdministrativeZone1 = response.productInstallionStore.companyStoreAdministrativeZone1;
          this.companyStoreAdministrativeZone2 = response.productInstallionStore.companyStoreAdministrativeZone2;
          this.companyStoreAdministrativeZone3 = response.productInstallionStore.companyStoreAdministrativeZone3;
          this.companyStoreAdministrativeZoneName1 = response.productInstallionStore.companyStoreAdministrativeZoneName1;
          this.companyStoreAdministrativeZoneName2 = response.productInstallionStore.companyStoreAdministrativeZoneName2;
          this.companyStoreAdministrativeZoneName3 = response.productInstallionStore.companyStoreAdministrativeZoneName3;
          this.companyStoreAgentSid = response.productInstallionStore.companyStoreAgentSid;
          this.companyStoreAgentName = response.productInstallionStore.companyStoreAgentName;
          this.companyStoreAgentUserHp = response.productInstallionStore.companyStoreAgentUserHp;
          this.companyStoreAgentUserName = response.productInstallionStore.companyStoreAgentUserName;
          this.companyStoreBillboardSize = response.productInstallionStore.companyStoreBillboardSize;
          this.companyStoreBusinessType = response.productInstallionStore.companyStoreBusinessType;
          this.companyStoreBusinessTypeName = response.productInstallionStore.companyStoreBusinessTypeName;
          this.companyStoreCompanySid = response.productInstallionStore.companyStoreCompanySid;
          this.companyStoreCompanyName = response.productInstallionStore.companyStoreCompanyName;
          this.companyStoreMemo = response.productInstallionStore.companyStoreMemo;
          this.companyStoreStatus = response.productInstallionStore.companyStoreStatus;
          this.companyStoreStatusName = response.productInstallionStore.companyStoreStatusName;
          this.companyStoreWorkSlot = response.productInstallionStore.companyStoreWorkSlot;
          this.companyStoreZipcode = response.productInstallionStore.companyStoreZipcode;
          this.companyStoreZone = response.productInstallionStore.companyStoreZone;
          this.prospectiveCustomerSid = response.productInstallionStore.prospectiveCustomerSid;
          this.prospectiveCustomerName = response.productInstallionStore.prospectiveCustomerName;
          this.product_installion_store = response.productInstallionStore.product_installion_store;

          this.productInstallionStoreSid = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreSid
            : "";
          this.productInstallionStoreDate = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreDate
            : "";
          this.productInstallionStoreSuntionCompanySid = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreSuntionCompanySid
            : "";
          this.productInstallionStoreSuntionCompanyName = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreSuntionCompanyName
            : "";
          this.productInstallionStoreCompanySid = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreCompanySid
            : "";
          this.productInstallionStoreCompanyName = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreCompanyName
            : "";
          this.productInstallionStoreProjectCompanySid = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreProjectCompanySid
            : "";
          this.productInstallionStoreProjectCompanyName = response.productInstallionStore.product_installion_store
            ? this.product_installion_store.productInstallionStoreProjectCompanyName
            : "";
        }
        await this.getInstallionStoreInfo();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.store-info-elem {
  margin-bottom: 50px;
}

.print {
  display: flex;
  justify-content: space-between;
}
// .second-column {
//   overflow-y: auto;
//   max-height: 800px;
// }

.tbl-reg {
  & tr {
    & td {
      & .date {
        width: 100% !important;
      }
      & .etc {
        & input[type="text"] {
          width: 250px;
          margin-left: 20px;
        }
      }
    }
  }
  margin-bottom: 80px;
}
.url-create {
  & input {
    width: calc(100% - 160px) !important;
    margin: 0 10px 0 3px;
  }
}

.store-manage {
  & .bottom-sec {
    margin-top: 20px;
  }

  & .store-list {
    width: 600px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }

  & .input-full {
    width: calc(100% - 135px) !important;
    margin: 0 5px;
  }

  & .section-box {
    width: calc(100% - 610px);

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
// .lining {
//   height: 760px !important;
// }
.section-box.border-outside {
  height: 740px !important;
  overflow-y: auto;
}
</style>
