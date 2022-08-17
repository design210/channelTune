<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="adform-header v-application">
        <h1>광고 편성등록</h1>
      </div>
    </template>

    <template slot="body">
      <section class="ad-manage v-application">
        <section class="ad-list section-box border-outside">
          <div class="border">
            <div class="header flx">
              <h2>광고 상품 편성</h2>
              <div class="flx search">
                <input type="text" class="search-input" v-model="searchText" @keyup.enter="getDataList(1)" />
                <v-btn small color="primary">조회</v-btn>
              </div>
            </div>

            <div>
              <table class="tbl mt20 selected-tbl">
                <!-- <colgroup>
								<col width="50" />
								<col width="120" />
								<col width="*" />
								<col width="100" />
								<col width="100" />
								<col width="100" />
							</colgroup> -->
                <thead>
                  <tr>
                    <th>결제 고유코드</th>
                    <th>결제회원(광고주)</th>
                    <th>상품명</th>
                    <th>광고 캠페인 명</th>
                    <th>편성 여부</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in leftList"
                    :key="index"
                    @click="getRightList(item.buyAdvertisingProductSid)"
                    :class="buySid === item.buyAdvertisingProductSid ? 'actived' : ''"
                  >
                    <td>{{ item.buySid }}</td>
                    <td>{{ item.homepageUserName }}</td>
                    <td>{{ item.buyGoodName }}</td>
                    <td>{{ item.buyAdvertisingCampaignName }}</td>
                    <td>{{ item.buyAdvertisingOrganizeFlag }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="leftList.length < 1">
                  <tr>
                    <td colspan="5">편성 리스트가 없습니다</td>
                  </tr>
                </tfoot>
              </table>
              <div class="text-center mt30">
                <v-pagination v-model="page1" :length="leftLen" :total-visible="7"></v-pagination>
              </div>
            </div>
          </div>
        </section>

        <section class="ad-list-right init-wrap section-box border-outside">
          <div class="border">
            <div class="header">
              <h2>상품 광고 편성</h2>
              <div class="btn-group">
                <v-btn small color="warning" @click="knittingProcessing">편성처리</v-btn>
                <v-btn small color="error" @click="Cancellation">편성취소</v-btn>
              </div>
            </div>
            <div class="field mt10">
              <table width="100%" class="tbl-reg column2 mt0">
                <colgroup>
                  <col width="130" />
                  <col width="*" />
                  <col width="100" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>결제 고유코드</td>
                  <td class="field-div">
                    <input type="text" class="input-first" v-model="buyAdvertisingProductSid" readonly />
                  </td>
                  <td>광고 편성 슬롯 수</td>
                  <td><input type="text" readonly v-model="buyAdvertisingProductSlotCount" /></td>
                </tr>
                <tr>
                  <td>광고 캠페인 명</td>
                  <td colspan="3"><input type="text" readonly v-model="buyAdvertisingCampaignName" /></td>
                </tr>
                <tr>
                  <td>광고편성 시작날짜</td>
                  <td>
                    <date-picker :readOnly="true" :propdate="buyAdvertisingProductStartDate" @updateDate="newStartDate" />
                  </td>
                  <td>광고편성 종료날짜</td>
                  <td>
                    <date-picker :readOnly="true" :propdate="buyAdvertisingProductEndDate" @updateDate="newEndDate" />
                  </td>
                </tr>
              </table>

              <table class="tbl mt20">
                <!-- <colgroup>
								<col width="120" />
								<col width="*" />
								<col width="100" />
								<col width="100" />
								<col width="100" />
							</colgroup> -->
                <thead>
                  <tr>
                    <th>스토어고유코드</th>
                    <th class="left">스토어명</th>
                    <th>편성슬롯/최대슬롯</th>
                    <th>스토어 상태</th>
                  </tr>
                </thead>
              </table>
              <div class="scr">
                <table class="tbl">
                  <colgroup>
                    <col width="120" />
                    <col width="*" />
                    <col width="100" />
                    <col width="100" />
                  </colgroup>
                  <tbody>
                    <tr v-for="(item, index) in rightList" :key="index">
                      <td>{{ item.companyStoreSid }}</td>
                      <td class="left">{{ item.companyStoreName }}</td>
                      <td>{{ item.companyStoreWorkSlot }}</td>
                      <td>{{ item.companyStoreStatusName }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr v-if="rightList.length < 1">
                      <td colspan="4">편성 스토어 리스트가 없습니다</td>
                    </tr>
                  </tfoot>
                </table>
                <div class="text-center mt30">
                  <v-pagination v-model="page2" :length="rightLen" :total-visible="7"></v-pagination>
                </div>
              </div>
            </div>
          </div>

          <!-- 알럿 -->

          <!-- 삭제 컨펌 -->
          <!-- <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm> -->
        </section>
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import { mapGetters } from "vuex";
import modalWrap from "@/components/modal/ModalTemplate";
import DatePicker from "@/components/form/DatePicker";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { modalWrap, DatePicker, alim },
  mixins: [loading, alimMixin, deleteMixin],
  data() {
    return {
      buySid: "",
      buyAdvertisingCampaignName: "",
      buyAdvertisingProductSlotCount: "",
      buyAdvertisingProductStartDate: "",
      buyAdvertisingProductEndDate: "",
      buyAdvertisingProductSid: "",
      searchText: "",
      page1: 1,
      page2: 1,
      size1: 15,
      size2: 11,
      leftLen: null,
      rightLen: null,
      leftList: [],
      rightList: [],
      sid: "",
    };
  },
  computed: {
    ...mapGetters("campaign", [
      "getOrganizeAdvertisementStoreList",
      "detailOrganizeAdvertisementStoreList",
      "addOrganizeAdvertisementStoreList",
      "deleteOrganizeAdvertisementStoreList",
    ]),
  },
  watch: {
    page1() {
      this.getDataList(0);
    },
    page2() {
      this.getRightList();
    },
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    newStartDate(data) {
      this.buyAdvertisingProductStartDate = data;
    },
    newEndDate(data) {
      this.buyAdvertisingProductEndDate = data;
    },
    async getDataList(num) {
      if (num === 1) {
        this.page1 = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/GET_ORGANIZE_ADVERTISEMENT_STORE_LIST", {
          size: this.size1,
          page: this.page1,
          searchText: this.searchText,
        });
        const res = this.getOrganizeAdvertisementStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.leftList = res.buyAdvertisingProduct.data;
        this.leftLen = res.buyAdvertisingProduct.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async getRightList(sid) {
      if (sid !== undefined) {
        this.sid = sid;
        this.page2 = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/DETAIL_ORGANIZE_ADVERTISEMENT_STORE_LIST", {
          size: this.size2,
          page: this.page2,
          id: this.sid,
        });
        const res = this.detailOrganizeAdvertisementStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.buySid = sid;
        this.buyAdvertisingCampaignName = res.buyAdvertisingProduct.info.buyAdvertisingCampaignName;
        this.buyAdvertisingProductSlotCount = res.buyAdvertisingProduct.info.buyAdvertisingProductSlotCount;
        this.buyAdvertisingProductStartDate = res.buyAdvertisingProduct.info.buyAdvertisingProductStartDate;
        this.buyAdvertisingProductEndDate = res.buyAdvertisingProduct.info.buyAdvertisingProductEndDate;
        this.rightList = res.buyAdvertisingProduct.list.data;
        this.rightLen = res.buyAdvertisingProduct.list.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async knittingProcessing() {
      if (this.sid === null || this.sid === "") {
        return this.alim("편성 처리할 리스트를 선택해 주세요", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/ADD_ORGANIZE_ADVERTISEMENT_STORE_LIST", {
          buyAdvertisingProductSid: this.sid,
        });
        const res = this.addOrganizeAdvertisementStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.getDataList(1);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async Cancellation() {
      if (this.sid === null || this.sid === "") {
        return this.alim("편성 취소할 리스트를 선택해 주세요", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/DELETE_ORGANIZE_ADVERTISEMENT_STORE_LIST", {
          buyAdvertisingProductSid: this.sid,
        });
        const res = this.deleteOrganizeAdvertisementStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          bus.$emit("end:spinner");
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        await this.getDataList(1);
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
.flx {
  display: flex;
}
.ad-manage {
  display: flex;
  justify-content: space-between;
  height: 95%;
  width: 100%;

  & .search-box {
    margin: 5px 0;
    display: flex;
    align-items: center;
    & input {
      flex: 1;
      border: 1px solid #000000;
      height: 28px;
      padding: 0 5px;
    }

    & button {
      margin-left: 5px;
    }
  }

  & .ad-list {
    width: 48% !important;
    & .border {
      min-height: 370px;
    }
  }

  & .ad-list-right {
    width: calc(100% - 49%);
  }

  & .btn-group {
    & input {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 10px;
    }
  }

  & .field {
    & .field-div {
      & .location {
        display: flex;
        align-content: center;
        & .pull-down {
          flex: 1;
          width: 130px;
          &:nth-child(2) {
            margin: 0 5px;
          }
        }
        & div {
          display: flex;
          align-items: center;
          & span {
            width: 50px !important;
          }
        }
      }
    }
  }
}
.tbl::v-deep {
  & .v-input__slot {
    margin: 0 !important;
  }
  & .v-messages {
    display: none !important;
  }
}
.scr {
  height: 400px;
  overflow: auto;
}
.selected-tbl {
  & tr {
    &:hover {
      & td {
        background: rgb(224, 224, 224);
      }
    }
  }
}
.actived {
  & td {
    background: #c8cdda;
  }
}
</style>
