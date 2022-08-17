<template>
  <section class="container">
    <div class="title-wrap">
      <h1>캠페인 별 광고 편성</h1>
    </div>
    <section class="ad-manage">
      <section class="ad-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>광고 캠페인</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="showAdvertisingProduceOrganizationModal">광고 상품 편성</v-btn>
              <v-btn class="ml20" small color="primary" @click="validate('add')">등록</v-btn>
              <v-btn small color="warning" @click="validate('update')">수정</v-btn>
              <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
              <v-btn small @click="leftSectionClear">CLEAR</v-btn>
            </div>
          </div>
          <table width="100%" class="tbl-reg column2">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
              <col width="50" />
            </colgroup>
            <tr>
              <td>광고 캠페인</td>
              <td colspan="4" class="field_div">
                <input type="text" class="input-first mr5" readonly v-model="organizeCampaignSid" />
                <input type="text" class="input-last mr5" readonly v-model="organizeCampaignTitle" />
                <v-btn small color="primary" class="mr5" @click="showCampaignListModal">검색</v-btn>
                <v-btn small color="primary" @click="finding">조회</v-btn>
              </td>
            </tr>
            <tr>
              <td>광고 편성 슬롯 수</td>
              <td><input type="text" v-model="organizeAdvertisementSlot" /></td>
              <td>편성 순서</td>
              <td colspan="2"><input type="text" v-model="organizeAdvertisementSort" /></td>
            </tr>
            <tr>
              <td>광고 편성 시작날짜</td>
              <td><date-picker :propdate="advertisementStartDate" @updateDate="newAdvertiseStartDate" class="modal-date"></date-picker></td>
              <td>광고 편성 종료날짜</td>
              <td>
                <date-picker
                  :propdate="advertisementEndDate"
                  @updateDate="newAdvertiseEndDate"
                  class="modal-date"
                  :readOnly="checkToggle"
                ></date-picker>
              </td>
              <td>
                <div class="textfield pt3">
                  <v-checkbox v-model="advertisementEndDate" label="상시" value="9999-12-31"></v-checkbox>
                </div>
              </td>
            </tr>
            <tr>
              <td>광고 편성 상태값</td>
              <td>
                <pull-down :data="organizeCampaignType" :code="statusCode" @selected="organizeCampaignTypeNameProp" class="pull-down"></pull-down>
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <table class="tbl mt20 select-tbl">
            <caption>
              스토어 리스트
            </caption>
            <colgroup>
              <col width="40" />
              <col width="100" />
              <col width="*" />
              <col width="70" />
              <col width="70" />
              <col width="75" />
              <col width="70" />
              <col width="70" />
              <col width="70" />
              <col width="70" />
            </colgroup>
            <thead>
              <tr class="poi">
                <th><input type="checkbox" @change="allCapaignCheck" :checked="sendSid.length !== 0 && sendSid.length === list.length" /></th>
                <th @click="storeSidSort = !storeSidSort">스토어고유코드</th>
                <th @click="storeNameSort = !storeNameSort" class="left">스토어명</th>
                <th @click="maxSlotSort = !maxSlotSort">최대슬롯</th>
                <th @click="SlotSort = !SlotSort">편성슬롯</th>
                <th @click="storeStatusSort = !storeStatusSort">스토어 상태</th>
                <th @click="formationOrderSort = !formationOrderSort">편성 순서</th>
                <th @click="startDateSort = !startDateSort">시작날짜</th>
                <th @click="endDateSort = !endDateSort">종료날짜</th>
                <th @click="formationStatusSort = !formationStatusSort">편성 상태</th>
              </tr>
            </thead>
          </table>
          <div class="tbl select-tbl" id="scrolled">
            <table>
              <colgroup>
                <col width="40" />
                <col width="100" />
                <col width="*" />
                <col width="70" />
                <col width="70" />
                <col width="75" />
                <col width="70" />
                <col width="70" />
                <col width="70" />
                <col width="70" />
              </colgroup>
              <tbody>
                <tr class="handle" v-for="(item, index) in list" :key="index" @click="detailCampaign(item.organizeAdvertisementSid)">
                  <td @click="$event.stopPropagation()">
                    <input
                      type="checkbox"
                      @change="campaignChange(item)"
                      :checked="sendSid.findIndex(v => v.companyStoreSid === item.companyStoreSid) !== -1"
                    />
                  </td>
                  <td>{{ item.companyStoreSid }}</td>
                  <td class="left">{{ item.companyStoreName }}</td>
                  <td>{{ item.companyStoreWorkSlot }}</td>
                  <td>{{ item.slotCount }}</td>
                  <td>{{ item.companyStoreStatusName }}</td>
                  <td>{{ item.organizeAdvertisementSort }}</td>
                  <td>{{ item.organizeAdvertisementStartDate }}</td>
                  <td>{{ item.organizeAdvertisementEndDate }}</td>
                  <td>{{ item.organizeAdvertisementStatusName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="10">해당 캠페인에 대한 편성된 스토어가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
      <section class="ad-list-center">
        <v-btn color="primary" @click="moveData"><span style="font-size: x-large"><</span></v-btn>
      </section>

      <section class="ad-list-right init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>스토어 리스트</h2>
            <div class="btn-group">
              <v-btn small @click="rightSectionClear">CLEAR</v-btn>
            </div>
          </div>

          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="70" />
                <col width="*" />
                <col width="70" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>업체</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn small color="primary" @click="showCompanyListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>스토어</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                  <v-btn small color="primary" @click="showStoreListModal">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>스토어 상태값</td>
                <td>
                  <pull-down :data="storeStatusSid" :code="'SYS21A15B014'" @selected="storeStatus" class="pull-down"></pull-down>
                </td>
                <td>업종</td>
                <td>
                  <pull-down :data="btypeCode" :code="'SYS21A15B012'" @selected="btypeSelect" class="pull-down"></pull-down>
                </td>
              </tr>
            </table>
          </div>

          <div class="search-box">
            <input type="text" placeholder="결제 고유코드/ 스토어명" v-model="searchText" @keyup.enter="search(1)" />
            <v-btn small color="primary" @click="search(1)">조회</v-btn>
          </div>

          <div>
            <table class="tbl mt20 select-tbl">
              <caption>
                스토어 리스트
              </caption>
              <colgroup>
                <col width="50" />
                <col width="100" />
                <col width="*" />
                <col width="65" />
                <col width="65" />
                <col width="85" />
              </colgroup>
              <thead>
                <tr>
                  <th><input type="checkbox" @change="allCheck" :checked="dataList.length !== 0 && dataList.length === datalen" /></th>
                  <th>스토어고유코드</th>
                  <th class="left">스토어명</th>
                  <th>최대슬롯</th>
                  <th>편성슬롯</th>
                  <th>스토어상태값</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in storeList" :key="index" @click="onchange(item)">
                  <td>
                    <!-- @change="onchange(item)" :checked="dataList.includes(item.companyStoreSid)" -->
                    <div class="textfield pt3">
                      <input type="checkbox" :checked="dataList.includes(item.companyStoreSid)" />
                    </div>
                  </td>
                  <td>{{ item.companyStoreSid }}</td>
                  <td class="left">{{ item.companyStoreName }}</td>
                  <td>{{ item.companyStoreWorkSlot }}</td>
                  <td>{{ item.slotCount }}</td>
                  <td>{{ item.companyStoreStatusName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="storeList.length < 1">
                <tr>
                  <td colspan="6">편성 스토어 리스트가 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="storePage" :length="storeLen" :total-visible="7"></v-pagination>
            </div>
          </div>
        </div>

        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 삭제 컨펌 -->
        <!-- <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm> -->
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim";
import PullDown from "@/components/form/PullDown";
import AdvertisingProduceOrganization from "@/components/modal/ad/AdvertisingProduceOrganization";
import loading from "@/mixins/loading";
import resMixin from "@/mixins/response";
import bus from "@/utils/bus";
import DatePicker from "@/components/form/DatePicker";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import adAddModal from "@/components/modal/ad/AdAdd.vue";
import adOrganizationModal from "@/components/modal/ad/AdOrganization";
import companyListModal from "@/components/modal/common/CompanyList";
import storeListModal from "@/components/modal/common/StoreList";
import campaignList from "@/components/modal/ad/CampaignList";
export default {
  components: { alim, PullDown, DatePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin, resMixin],
  props: ["size"],
  data() {
    return {
      storeList: [],
      list: [],
      storeLen: null,
      storePage: 1,

      adList: [],
      adSize: 15,
      adLen: 0,
      adPage: 1,
      perPage: 15,
      op: { align: "center" },

      advertisementStartDate: "",
      advertisementEndDate: "",
      statusCode: "SYS21C09B005",
      organizeCampaignSid: "",
      organizeAdvertisementSort: "",
      organizeCampaignTitle: "",
      organizeAdvertisementSlot: "",
      checkedList: [],
      dataList: [],
      datalen: 0,

      sendSid: [], //실제로 보낼 데이더 sid
      sendorganizeAdvertisementSid: [],

      // 검색 조건
      searchText: "",
      companySid: "",
      companyName: "",
      companyStoreSid: "",
      companyStoreName: "",
      searchStoreSid: "", // 검색용 companyStoreSid

      loadingToggle: false,
      disableDraggable: false,

      locationCode: "SYS21A15B001",
      sendSidoCode: "",
      sendSigunCode: "",
      sidoCode: "",
      sidoCodeName: "",
      sigunCode: "",
      sigunCodeName: "",
      btypeCode: "",
      btypeName: "",
      storeStatusSid: "",
      storeStatusName: "",

      organizeAdvertisementSid: 0,
      organizeCampaignTypeName: "",
      organizeCampaignType: "",

      storeSidSort: true,
      storeNameSort: true,
      maxSlotSort: true,
      SlotSort: true,
      storeStatusSort: true,
      formationOrderSort: true,
      endDateSort: true,
      startDateSort: true,
      formationStatusSort: true,

      checkToggle: false,
      toggle: false,
    };
  },
  computed: {
    ...mapGetters("organizeAd", ["getOrganizeAdStoreList", "getOrganizeAdList"]),
    ...mapGetters("campaign", ["getCampaignAdvertisement", "organizeAdvertisementBatch", "adCampaignDetail", "organizeAdvertisementBatchDelete"]),
  },
  watch: {
    storePage() {
      this.adList = [];
      this.adLen = null;
      this.search(0);
    },
    size() {
      this.search(0);
    },
    storeSidSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.companyStoreSid < b.companyStoreSid ? -1 : a.companyStoreSid > b.companyStoreSid ? 1 : 0;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.companyStoreSid < a.companyStoreSid ? -1 : b.companyStoreSid > a.companyStoreSid ? 1 : 0;
        });
      }
    },
    storeNameSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.companyStoreName < b.companyStoreName ? -1 : a.companyStoreName > b.companyStoreName ? 1 : 0;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.companyStoreName < a.companyStoreName ? -1 : b.companyStoreName > a.companyStoreName ? 1 : 0;
        });
      }
    },
    maxSlotSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.companyStoreWorkSlot - b.companyStoreWorkSlot;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.companyStoreWorkSlot - a.companyStoreWorkSlot;
        });
      }
    },
    storeStatusSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.companyStoreStatusName < b.companyStoreStatusName ? -1 : a.companyStoreStatusName > b.companyStoreStatusName ? 1 : 0;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.companyStoreStatusName < a.companyStoreStatusName ? -1 : b.companyStoreStatusName > a.companyStoreStatusName ? 1 : 0;
        });
      }
    },
    SlotSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.organizeAdvertisementSort - b.organizeAdvertisementSort;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.organizeAdvertisementSort - a.organizeAdvertisementSort;
        });
      }
    },
    formationStatusSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          return a.organizeAdvertisementStatusName < b.organizeAdvertisementStatusName
            ? -1
            : a.organizeAdvertisementStatusName > b.organizeAdvertisementStatusName
            ? 1
            : 0;
        });
      } else {
        this.list.sort(function (a, b) {
          return b.organizeAdvertisementStatusName < a.organizeAdvertisementStatusName
            ? -1
            : b.organizeAdvertisementStatusName > a.organizeAdvertisementStatusName
            ? 1
            : 0;
        });
      }
    },
    startDateSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          new Date(a.organizeAdvertisementStartDate) - new Date(b.organizeAdvertisementStartDate);
        });
      } else {
        this.list.sort(function (a, b) {
          new Date(b.organizeAdvertisementStartDate) - new Date(a.organizeAdvertisementStartDate);
        });
      }
    },
    endDateSort(val) {
      if (val) {
        this.list.sort(function (a, b) {
          new Date(a.organizeAdvertisementEndDate) - new Date(b.organizeAdvertisementEndDate);
        });
      } else {
        this.list.sort(function (a, b) {
          new Date(b.organizeAdvertisementEndDate) - new Date(a.organizeAdvertisementEndDate);
        });
      }
    },
    advertisementEndDate(val) {
      if (val === "9999-12-31") {
        this.checkToggle = true;
      } else {
        this.checkToggle = false;
      }
    },
    advertisementStartDate(val) {
      if (val !== undefined) {
        const year = val.substring(0, 4);
        const month = val.substring(5, 7);
        let date = new Date(year, month, 0);
        let day = date.getDate();

        if (this.advertisementEndDate === undefined || this.advertisementEndDate === "") {
          if (!this.toggle) {
            this.advertisementEndDate = val.substring(0, 7) + `-${day}`;
          }
        }
        this.toggle = false;
      }
    },
    toggle(val) {
      if (val) {
        this.advertisementEndDate = "";
      }
    },
  },
  methods: {
    // 스토어리스트
    async search(num) {
      if (num === 1) {
        this.storePage = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_STORE_LIST", {
          size: this.size,
          page: this.storePage,
          searchText: this.searchText,
          companyStoreSid: this.companyStoreSid,
          companySid: this.companySid,
          zone1: this.sidoCode,
          zone2: this.sigunCode,
          businessType: this.btypeCode,
          companyStoreStatus: this.storeStatusSid,
        });

        const res = this.getOrganizeAdStoreList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.OrganizeAdvertisement;
        this.storeList = data.data;
        this.storeLen = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //광고 캠페인 조회
    async finding() {
      if (this.organizeCampaignSid === "" || this.organizeCampaignSid === null) {
        return this.alim("광고 캠페인을 선택해주세요", this.errorColor);
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/GET_CAMPAIGN_ADVERTISEMENT", {
          size: "",
          page: "",
          organizeCampaignSid: this.organizeCampaignSid,
        });
        const res = this.getCampaignAdvertisement.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.OrganizeAdvertisement;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //광고 캠페인 상세보기
    async detailCampaign(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/AD_CAMPAIGN_DETAIL", sid);
        const res = this.adCampaignDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.organizeCampaignSid = res.OrganizeAdvertisement.organizeCampaignSid;
        this.organizeCampaignTitle = res.OrganizeAdvertisement.organizeCampaignTitle;
        this.organizeAdvertisementSlot = res.OrganizeAdvertisement.organizeAdvertisementSlot;
        this.organizeAdvertisementSort = res.OrganizeAdvertisement.organizeAdvertisementSort;
        this.advertisementStartDate = res.OrganizeAdvertisement.organizeAdvertisementStartDate;
        this.advertisementEndDate = res.OrganizeAdvertisement.organizeAdvertisementEndDate;
        this.organizeCampaignType = res.OrganizeAdvertisement.organizeAdvertisementStatus;
        this.organizeCampaignTypeName = res.OrganizeAdvertisement.organizeAdvertisementStatusName;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 광고편성 리스트
    async getList(sid, num) {
      if (num === 1) {
        this.adPage = 1;
      }

      this.searchStoreSid = sid;
      this.loadingToggle = true;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_LIST", {
          size: "",
          page: "",
          companyStoreSid: sid,
        });

        const res = this.getOrganizeAdList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        const data = res.OrganizeAdvertisement;
        this.adList = data;
        this.loadingToggle = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    selectOg(sid) {
      this.organizeAdvertisementSid = parseInt(sid);
    },

    // 광고 편성 등록 modal
    showAdAddModal(id = 0) {
      this.$modal.show(
        adAddModal,
        { sid: id, update: this.adAddUpdate, reload: this.getList, searchSid: this.searchStoreSid },
        getPopupOpt("adAddModal", "700px", "auto", false),
      );
    },
    adAddUpdate(deleteList) {
      // storeSid가 있다면 reload
      if ((this.searchStoreSid || "") !== "") {
        // 삭제한 목록에 있다면 0으로 수정
        if (deleteList.includes(parseInt(this.organizeAdvertisementSid))) {
          document.querySelector(".organize-ad-list-tbl tr").classList.remove("active");
          this.organizeAdvertisementSid = 0;
        }
        this.getList(this.searchStoreSid, 1);
      }
    },
    organizeCampaignTypeNameProp(data) {
      this.organizeCampaignType = data.sysCodeSid;
      this.organizeCampaignTypeName = data.sysCodeName;
    },

    // 광고 상품 편성 modal
    showAdOrganizationModal() {
      this.$modal.show(adOrganizationModal, {}, getPopupOpt("adOrganizationModal", "1500px", "auto", false));
    },

    // 업체 modal
    showCompanyListModal() {
      this.$modal.show(companyListModal, { update: this.companyUpdate }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    companyUpdate({ companySid, companyName }) {
      this.companySid = companySid;
      this.companyName = companyName;
    },

    // 스토어 modal
    showStoreListModal() {
      this.$modal.show(storeListModal, { update: this.storeUpdate }, getPopupOpt("storeListModal", "700px", "auto", false));
    },
    storeUpdate({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;
    },

    // 시도
    sidoSelect(data) {
      this.sidoCode = data.sysCodeSid;
      this.sidoCodeName = data.sysCodeName;

      this.sendSidoCode = data.sysCodeSid;
    },
    // 시군
    sigunSelect(data) {
      this.sigunCode = data.sysCodeSid;
      this.sigunCodeName = data.sysCodeName;

      this.sendSigunCode = data.sysCodeSid;
    },
    //업종
    btypeSelect({ sysCodeSid, sysCodeName }) {
      this.btypeCode = sysCodeSid;
      this.btypeName = sysCodeName;
    },
    //스토어 상태
    storeStatus({ sysCodeSid, sysCodeName }) {
      this.storeStatusSid = sysCodeSid;
      this.storeStatusName = sysCodeName;
    },
    async allCheck(e) {
      if (!e.target.checked) {
        this.dataList = [];
        this.checkedList = [];
        return;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("organizeAd/GET_ORGANIZE_AD_STORE_LIST", {
          size: "",
          page: "",
          searchText: this.searchText,
          companyStoreSid: this.companyStoreSid,
          companySid: this.companySid,
          zone1: this.sidoCode,
          zone2: this.sigunCode,
          businessType: this.btypeCode,
          companyStoreStatus: this.storeStatusSid,
        });
        const res = this.getOrganizeAdStoreList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.align(res.errorMessage, res.errorColor);
          return;
        }
        this.datalen = res.OrganizeAdvertisement.length;
        this.dataList = res.OrganizeAdvertisement.map(item => {
          return item.companyStoreSid;
        });
        this.checkedList = res.OrganizeAdvertisement;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    allCapaignCheck(e) {
      if (!e.target.checked) {
        this.sendSid = [];
        return;
      }
      this.sendSid = this.list;
    },
    campaignChange(val) {
      if (this.sendSid.findIndex(v => v.companyStoreSid === val.companyStoreSid) !== -1) {
        this.sendSid = this.sendSid.filter(item => item.companyStoreSid !== val.companyStoreSid);
      } else {
        this.sendSid = [...this.sendSid, val];
      }
    },
    //스토러
    onchange(val) {
      if (this.dataList.includes(val.companyStoreSid)) {
        this.dataList = this.dataList.filter(item => item !== val.companyStoreSid);
        this.checkedList = this.checkedList.filter(item => item.companyStoreSid !== val.companyStoreSid);
      } else {
        this.dataList = [...this.dataList, val.companyStoreSid];
        this.checkedList = [...this.checkedList, val];
      }
    },
    //데이터 왼쪽 테이블로 이동
    moveData() {
      this.checkedList.forEach(item => {
        if (this.list.find(v => v.companyStoreSid === item.companyStoreSid) === undefined) {
          this.list = [
            ...this.list,
            {
              organizeAdvertisementSid: null,
              companyStoreSid: item.companyStoreSid,
              companyStoreName: item.companyStoreName,
              organizeCampaignSid: "",
              organizeAdvertisementSort: "",
              organizeAdvertisementSlot: "",
              organizeAdvertisementStartDate: "",
              organizeAdvertisementEndDate: "",
              organizeAdvertisementStatus: "",
              organizeCampaignTitle: "",
              organizeAdvertisementStatusName: "",
            },
          ];
        }
      });
      this.dataList = [];
      this.checkedList = [];
    },
    //데이터 일괄처리
    async batchDatas() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/ORGANIZE_ADVERTISEMENT_BATCH", {
          companyStoreSids: this.sendSid,
          organizeCampaignSid: this.organizeCampaignSid,
          organizeAdvertisementSlot: this.organizeAdvertisementSlot,
          organizeAdvertisementSort: this.organizeAdvertisementSort,
          organizeAdvertisementStartDate: this.advertisementStartDate,
          organizeAdvertisementEndDate: this.advertisementEndDate,
          organizeAdvertisementStatus: this.organizeCampaignType,
        });
        const res = this.organizeAdvertisementBatch.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.finding();
        this.toggle = true;
        this.sendSid = [];
        this.organizeAdvertisementSlot = "";
        this.organizeAdvertisementSort = "";
        this.advertisementStartDate = "";
        this.advertisementEndDate = "";
        this.organizeCampaignType = "";
        this.organizeCampaignTypeName = "";
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //데이터 일괄 삭제
    async deleteBatchData() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/ORGANIZE_ADVERTISEMENT_BATCH_DELETE", this.sendSid);
        const res = this.organizeAdvertisementBatchDelete.channeltuneApiResult;
        if (res.errorCode !== "200") {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.finding();
        this.sendSid = [];
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    async sorting(event) {
      this.disableDraggable = true;
      if (event.oldDraggableIndex === event.newDraggableIndex) {
        this.disableDraggable = false;
        return;
      }
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("organizeAd/ORGANIZE_AD_CHANGE_SORT", {
          companyStoreSid: this.searchStoreSid,
          fromSort: event.oldDraggableIndex + 1,
          toSort: event.newDraggableIndex + 1,
        });
        if (res.errorCode !== 200) {
          this.disableDraggable = false;
          this.alim(res.errorMessage, this.errorColor);
        }
        this.disableDraggable = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    newAdvertiseStartDate(data) {
      this.advertisementStartDate = data;
    },
    newAdvertiseEndDate(data) {
      this.advertisementEndDate = data;
    },
    showAdvertisingProduceOrganizationModal() {
      this.$modal.show(AdvertisingProduceOrganization, {}, getPopupOpt("AdvertisingProduceOrganization", "1100px", "auto", false));
    },
    showCampaignListModal() {
      this.$modal.show(campaignList, { update: this.getCampaign }, getPopupOpt("campaignList", "800px", "auto", false));
    },
    getCampaign(data) {
      this.organizeCampaignSid = data.organizeCampaignSid;
      this.organizeCampaignTitle = data.organizeCampaignTitle;
      this.organizeAdvertisementSlot = data.organizeCampaignSlot;
    },
    leftSectionClear() {
      this.toggle = true;
      this.organizeCampaignSid = "";
      this.organizeCampaignTitle = "";
      this.organizeAdvertisementSlot = "";
      this.organizeAdvertisementSort = "";
      this.advertisementStartDate = "";
      this.advertisementEndDate = "";
      this.organizeCampaignType = "";
      this.organizeCampaignTypeName = "";
      this.list = [];
      this.sendSid = [];
    },
    rightSectionClear() {
      this.companySid = "";
      this.companyName = "";
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.sidoCode = "";
      this.sidoCodeName = "";
      this.sigunCode = "";
      this.sigunCodeName = "";
      this.btypeCode = "";
      this.btypeName = "";
      this.storeList = [];
      this.checkedList = [];
      this.dataList = [];
      this.datalen = 0;
      this.storePage = 1;
      this.storeLen = null;
      this.searchText = "";
    },
    validate(val) {
      if (this.sendSid.length < 1) {
        return this.alim("스토어를 한 곳 이상 선택해 주세요.", this.errorColor);
      }
      if (val === "delete") {
        this.deleteBatchData();
      }
      if (this.organizeCampaignSid === null || this.organizeCampaignSid === "") {
        return this.alim("광고 캠페인을 선택해주세요.");
      }
      if (this.organizeAdvertisementSlot === null || this.organizeAdvertisementSlot === "") {
        return this.alim("광고 편성 슬롯 수를 입력해주세요.");
      }
      if (this.organizeAdvertisementSort === null || this.organizeAdvertisementSort === "") {
        return this.alim("편성 순서를 입력 해주세요.");
      }
      if (this.advertisementStartDate === null || this.advertisementStartDate === "") {
        return this.alim("광고 편성 시작 날짜를 입력 해주세요.");
      }
      if (this.advertisementEndDate === null || this.advertisementEndDate === "") {
        return this.alim("광고 편성 종료 날짜를 입력 해주세요.");
      }

      if (this.organizeCampaignType === null || this.organizeCampaignType === "") {
        return this.alim("광고 편성 상태를 선택해주세요.");
      }

      if (val === "add") {
        this.batchDatas();
      } else if (val === "update") {
        this.batchDatas();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ad-manage {
  display: flex;
  justify-content: space-between;
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
    width: calc(60% - 45px);
    & .border {
      min-height: 370px;
    }
  }
  & .ad-list-center::v-deep {
    width: 70px;
    display: flex;
    align-items: center;
    margin: 0 10px;
    & .v-btn {
      height: 30px !important;
    }
  }

  & .ad-list-right {
    width: calc(40% - 45px);
  }

  & .btn-group {
    & input {
      border: 1px solid #ccc;
      height: 30px;
      padding: 0 10px;
    }
  }
  & .field_div {
    & .input-first {
      width: 110px !important;
    }
    & .input-last {
      width: calc(100% - 225px) !important;
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
  #scrolled {
    width: 100%;
    height: 80vh;
    overflow-y: auto;
  }

  .tbr::v-deep {
    & td {
      text-align: center;
      height: 40px;
    }
  }
  .text-center::v-deep {
    height: 40px;
  }
  tfoot::v-deep {
    & td {
      text-align: center;
      font-size: 1.2rem !important;
    }
  }

  // & .section-box {
  // 	width: calc(100% - 370px);
  // 	& .border {
  // 		& .field {
  // 			& .required {
  // 				font-weight: 700;
  // 			}
  // 		}
  // 	}
  // }
}
.handle {
  cursor: pointer;
}
.poi {
  & th {
    cursor: pointer;
  }
}
</style>
