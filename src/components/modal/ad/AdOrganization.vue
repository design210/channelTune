<template>
  <modalWrap @close="close" :hideLine="true">
    <template slot="body">
      <div class="body">
        <section class="left-section v-application">
          <div class="section-header">
            <h1>광고 상품 편성</h1>
            <div class="btn-group">
              <input type="text" placeholder="캠페인 명" v-model="searchText" />
              <v-btn small color="primary" @click="search(1)">조회</v-btn>
            </div>
          </div>
          <div>
            <table class="tbl mt20 select-tbl buy-ad-product-tbl">
              <caption>
                광고상품편성
              </caption>
              <colgroup>
                <col width="120" />
                <col width="120" />
                <col width="*" />
                <col width="*" />
                <col width="60" />
              </colgroup>
              <thead>
                <tr>
                  <th>결제고유코드</th>
                  <th>결제회원(광고주)</th>
                  <th>상품명</th>
                  <th>캠페인명</th>
                  <th>편성여부</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in adList" :key="index" @click="getList(item.buyAdvertisingProductSid, 1)">
                  <td>{{ item.buySid }}</td>
                  <td>{{ item.homepageUserName }}({{ item.userAdvertiserCompanyName }})</td>
                  <td>{{ item.buyGoodName }}</td>
                  <td>{{ item.buyAdvertisingCampaignName }}</td>
                  <td>{{ item.buyAdvertisingOrganizeFlag }}</td>
                </tr>
              </tbody>
              <tfoot v-if="adList.length < 1">
                <tr>
                  <td colspan="5">상품 편성 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="adPage" :length="adLen" :total-visible="7"></v-pagination>
            </div>
          </div>
        </section>

        <section class="right-section v-application">
          <div class="section-header">
            <h1>상품 광고 편성</h1>
            <hr />
            <div class="btn-group">
              <v-btn v-if="buyAdvertisingOrganizeFlag === 'N'" small color="warning" @click="customConfirm('p')">편성처리</v-btn>
              <v-btn v-if="buyAdvertisingOrganizeFlag === 'Y'" small color="error" @click="customConfirm('c')">편성취소</v-btn>
            </div>
          </div>
          <div>
            <table width="100%" class="tbl-reg column2 mt0">
              <colgroup>
                <col width="130" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>결제 고유코드</td>
                <td colspan="2"><input type="text" readonly v-model="buyAdvertisingProductSid" /></td>
              </tr>
              <tr>
                <td>광고편성 캠페인 명</td>
                <td><input type="text" readonly v-model="buyAdvertisingCampaignName" /></td>
                <td>광고편성 슬롯 수</td>
                <td><input type="text" readonly v-model="buyAdvertisingProductSlotCount" /></td>
              </tr>
              <tr>
                <td>광고편성 시작일</td>
                <td><input type="text" readonly v-model="buyAdvertisingProductStartDate" /></td>
                <td>광고편성 종료일</td>
                <td><input type="text" readonly v-model="buyAdvertisingProductEndDate" /></td>
              </tr>
            </table>
          </div>
          <div>
            <table class="tbl mt20">
              <caption>
                광고상품편성
              </caption>
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="120" />
              </colgroup>
              <thead>
                <tr>
                  <th>스토어고유코드</th>
                  <th>스토어명</th>
                  <th>편성슬롯/최대슬롯</th>
                  <th>스토어상태</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                <tr v-for="(item, index) in pdList" :key="index">
                  <td>{{ item.companyStoreSid }}</td>
                  <td>{{ item.companyStoreName }}</td>
                  <td>{{ item.companyStoreWorkSlot }}</td>
                  <td>{{ item.companyStoreStatusName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="pdList.length < 1">
                <tr>
                  <td colspan="4">상품 광고편성 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="pdPage" :length="pdLen" :total-visible="7"></v-pagination>
            </div>
          </div>
        </section>

        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <confirm
          :type="type"
          :open="dialog"
          :txt="dialogText"
          :h1="dialogTitle"
          :kind="dialogKind"
          @resetConfirm="emitResetConfirm"
          :deleteText="'확인'"
        >
        </confirm>
      </div>
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import confirm from "@/components/dialog/Confirm";
export default {
  components: { alim, modalWrap, confirm },
  mixins: [loading, alimMixin, deleteMixin],
  data() {
    return {
      adSize: 15,
      adPage: 1,
      adLen: null,
      adList: [],
      searchText: "",

      pdSize: 15,
      pdPage: 1,
      pdLen: null,
      pdList: [],

      buyAdvertisingProductSid: "",
      buyAdvertisingCampaignName: "",
      buyAdvertisingOrganizeFlag: "",
      buyAdvertisingProductStoreList: "",
      buyAdvertisingProductSlotCount: "",
      buyAdvertisingProductStartDate: "",
      buyAdvertisingProductEndDate: "",

      confirmTitle: "편성처리/취소 확인",
      confirmText: "편성처리/취소 하시겠습니까?",
    };
  },
  computed: {
    ...mapGetters("organizeAd", [
      "getOrganizeAdBuyAdProductList",
      "getOrganizeAdBuyAdProductStoreList",
      "organizeAdBuyAdProductStoreAdd",
      "organizeAdBuyAdProductStoreDelete",
    ]),
  },
  watch: {
    adPage() {
      this.search();
    },
    pdPage() {
      this.getList(this.buyAdvertisingProductSid);
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    // 광고상품 편성 결제 리스트
    async search(num) {
      if (num === 1) {
        this.adPage = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_BUY_AD_PRODUCT_LIST", {
          size: this.adSize,
          page: this.adPage,
          searchText: this.searchText,
        });

        const res = this.getOrganizeAdBuyAdProductList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.buyAdvertisingProduct;
        this.adList = data.data;
        this.adLen = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 광고상품 편성 결제 스토어 리스트
    async getList(sid, num) {
      if (num === 1) {
        this.pdPage = 1;
      }

      this.buyAdvertisingProductSid = sid;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_BUY_AD_PRODUCT_STORE_LIST", {
          size: this.pdSize,
          page: this.pdPage,
          buySid: sid,
        });

        const res = this.getOrganizeAdBuyAdProductStoreList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.buyAdvertisingProduct;
        this.buyAdvertisingProductSid = data.info.buyAdvertisingProductSid;
        this.buyAdvertisingCampaignName = data.info.buyAdvertisingCampaignName;
        this.buyAdvertisingOrganizeFlag = data.info.buyAdvertisingOrganizeFlag;
        this.buyAdvertisingProductSlotCount = data.info.buyAdvertisingProductSlotCount;
        this.buyAdvertisingProductStoreList = data.info.buyAdvertisingProductStoreList;
        this.buyAdvertisingProductStartDate = data.info.buyAdvertisingProductStartDate;
        this.buyAdvertisingProductEndDate = data.info.buyAdvertisingProductEndDate;

        this.pdList = data.list.data;
        this.pdLen = data.list.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    emitResetConfirm({ del, type, kind }) {
      if (del === "Y" && type === "list") {
        // 편성 처리
        if (kind === "p") {
          this.adProcess();
        }

        // 편성 취소
        if (kind === "c") {
          this.adCancel();
        }
      }
      this.resetDeleteData();
    },

    // 광고편성처리
    async adProcess() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/ORGANIZE_AD_BUY_AD_PRODUCT_STORE_INSERT", {
          buyAdvertisingProductSid: this.buyAdvertisingProductSid,
        });

        const res = this.organizeAdBuyAdProductStoreAdd.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        await this.search(1);
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 광고편성 취소
    async adCancel() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/ORGANIZE_AD_BUY_AD_PRODUCT_STORE_DELETE", {
          buyAdvertisingProductSid: this.buyAdvertisingProductSid,
        });

        const res = this.organizeAdBuyAdProductStoreDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        await this.search(1);
        this.clear();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    close() {
      bus.$emit("end:spinner");
      this.$emit("close");
    },
    clear() {
      document.querySelector(".buy-ad-product-tbl tr").classList.remove("active");
      this.buyAdvertisingProductSid = "";
      this.buyAdvertisingCampaignName = "";
      this.buyAdvertisingOrganizeFlag = "";
      this.buyAdvertisingProductStoreList = "";
      this.buyAdvertisingProductSlotCount = "";
      this.buyAdvertisingProductStartDate = "";
      this.buyAdvertisingProductEndDate = "";
      this.pdList = [];
      this.pdLen = null;
    },
  },
};
</script>

<style lang="scss" scoped>
div.body {
  display: flex;
  justify-content: space-between;

  & .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & input {
      border: 1px solid #aaaaaa;
      height: 28px;
      width: 250px;
      padding: 0 5px;
    }

    & .btn-group {
      & button {
        margin-left: 5px;
      }
    }
  }

  & .left-section {
    display: flex;
    flex-direction: column;
    width: 700px !important;
    padding: 10px;
  }

  & .right-section {
    display: flex;
    flex-direction: column;
    width: calc(100% - 710px);
    padding: 10px;
  }
}
</style>
