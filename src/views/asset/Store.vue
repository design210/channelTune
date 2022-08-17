<template>
  <section class="container">
    <div class="title-wrap">
      <h1>스토어 설치 제품 등록</h1>
    </div>
    <section class="store-manage">
      <section class="store-list init-wrap section-box border-outside">
        <div class="border">
          <table width="100%" class="tbl-reg column2">
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="100" />
              <col width="*" />
              <col width="100" />
            </colgroup>
            <tr>
              <td>고유코드</td>
              <td class="field-div" colspan="4">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreSid" />
                <div class="td-btn-group">
                  <v-btn small color="primary" dark @click="InstallionValidate('add')">등록</v-btn>
                  <v-btn small color="warning" dark @click="InstallionValidate('update')">수정</v-btn>
                  <v-btn small color="error" dark @click="InstallionValidate('delete')">삭제</v-btn>
                  <v-btn small @click="clearInstallionStore">CLEAR</v-btn>
                </div>
              </td>
            </tr>
            <tr>
              <td>스토어</td>
              <td class="field-div" colspan="4">
                <input type="text" style="width: 100px; margin-right: 5px" readonly v-model="companyStoreSid" />
                <input type="text" style="width: 240px" readonly v-model="companyStoreName" />
                <div class="td-btn-group">
                  <v-btn small color="primary" dark @click="showStoreModalPopup">검색</v-btn>
                  <v-btn small color="teal" dark @click="Search">조회</v-btn>
                </div>
              </td>
            </tr>
            <tr>
              <td>스토어유형</td>
              <td>
                <input type="text" class="input-first" readonly v-model="companyStoreBusinessTypeName" />
              </td>
              <td>내부담당자</td>
              <td colspan="2">
                <input type="text" class="input-first" readonly v-model="companyStoreAgentName" />
              </td>
            </tr>
            <tr>
              <td>스토어국가</td>
              <td>
                <input type="text" class="input-first" readonly v-model="companyNation" />
              </td>
              <td>스토어지역</td>
              <td colspan="2">
                <input type="text" class="input-first" readonly v-model="companyStoreZone" />
              </td>
            </tr>
            <tr>
              <td>스토어담당자</td>
              <td>
                <input type="text" class="input-first" readonly v-model="companyStoreAgentUserName" />
              </td>
              <td>스토어연락처</td>
              <td colspan="2">
                <input type="text" class="input-first" readonly v-model="companyStoreAgentUserHp" />
              </td>
            </tr>
            <tr>
              <td>스토어주소</td>
              <td class="field-div" colspan="4">
                <input type="text" class="input-first" readonly v-model="companyStoreZipcode" />
                <input type="text" class="input-full" readonly v-model="fullAddress" />
              </td>
            </tr>
          </table>
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
                <date-picker :propdate="productInstallionStoreDate" @updateDate="newProductInstallionStoreDate" class="modal-date"></date-picker>
              </td>
            </tr>
            <tr>
              <td>선팅설치업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreSuntionCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreSuntionCompanyName" />
                <v-btn small color="primary" dark @click="showCompanyModalPopup('sunting')">검색</v-btn>
              </td>
            </tr>
            <tr>
              <td>설치시공업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreCompanyName" />
                <v-btn small color="primary" dark @click="showCompanyModalPopup('construction')">검색</v-btn>
              </td>
            </tr>
            <tr>
              <td>프로젝터설치업체</td>
              <td class="field-div" colspan="3">
                <input type="text" class="input-first" readonly v-model="productInstallionStoreProjectCompanySid" />
                <input type="text" class="input-last" readonly v-model="productInstallionStoreProjectCompanyName" />
                <v-btn small color="primary" dark @click="showCompanyModalPopup('projector')">검색</v-btn>
              </td>
            </tr>
            <tr>
              <td class="required">설치상태</td>
              <td class="field-div" colspan="3">
                <pull-down
                  :data="productInstallionStoreStatus"
                  :code="'SYS21C03B002'"
                  @selected="newProductInstallionStoreStatus"
                  class="pull-down"
                ></pull-down>
              </td>
            </tr>
          </table>

          <section class="bottom-sec">
            <div class="title-wrap">
              <h2>설치 제품 등록</h2>
            </div>

            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="productInstallionStoreInfoSid" />
                  <div class="td-btn-group">
                    <v-btn small color="primary" dark @click="InstallionInfoValidate('add')">등록</v-btn>
                    <v-btn small color="error" dark @click="InstallionInfoValidate('delete')">삭제</v-btn>
                    <v-btn small @click="clearInstallionStoreInfo">CLEAR</v-btn>
                  </div>
                </td>
              </tr>
              <tr>
                <td>설치제품</td>
                <td class="field-div" colspan="3">
                  <input type="text" class="input-first" readonly v-model="productSid" />
                  <input type="text" class="input-last" readonly v-model="productName" />
                  <v-btn small color="primary" @click="showProductModalPopup">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>제품Serial번호</td>
                <td class="field-div" colspan="3">
                  <!-- <input type="text" class="input-first" readonly v-model="productSid"/>
									<input type="text" class="input-last" readonly v-model="productName"/> -->
                  <input type="text" class="input-first" v-model="productionTransSid" style="width: calc(100% - 55px)" />
                  <v-btn small color="primary" @click="showSerialModalPopup" style="margin-left: 5px">검색</v-btn>
                </td>
              </tr>
            </table>

            <!-- 정보 테이블 -->
            <table class="tbl mt10 select-tbl">
              <caption>
                설치 제품 등록 테이블
              </caption>
              <colgroup>
                <col width="120" />
                <col width="120" />
                <col width="120" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>제품코드</th>
                  <th class="left">제품명</th>
                  <th>제품시리얼번호</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in list"
                  :key="index"
                  @click="
                    selectStoreInfo({
                      productInstallionStoreInfoSid: item.productInstallionStoreInfoSid,
                      productSid: item.productSid,
                      productName: item.productName,
                      productionTransSid: item.productionTransSid,
                    })
                  "
                >
                  <td>{{ item.productInstallionStoreInfoSid }}</td>
                  <td>{{ item.productSid }}</td>
                  <td class="left">{{ item.productName }}</td>
                  <td>{{ item.productionTransSid }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="4">설치제품 리스트가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </section>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>

      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="title-wrap">
            <h1>설치 제품 상세</h1>
            <div class="btn-group">
              <v-btn small color="primary" dark @click="setFlag">저장</v-btn>
              <v-btn small @click="clear">CLEAR</v-btn>
            </div>
          </div>
          <div class="com-container" v-if="list.length > 0">
            <div class="mt10" id="scrolled" v-for="item in list" :key="item.productInstallionStoreInfoSid">
              <film
                v-if="item.productKind === 'SYS21910B007'"
                :data="item"
                :read="false"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></film>
              <projector
                v-if="item.productKind === 'SYS21910B005'"
                :data="item"
                :read="false"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></projector>
              <router
                v-if="item.productKind === 'SYS21910B006'"
                :data="item"
                :read="false"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></router>
              <smart-plug
                v-if="item.productKind === 'SYS21B11B001'"
                :data="item"
                :read="false"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></smart-plug>
              <tune-controller
                v-if="item.productKind === 'SYS21910B004'"
                :data="item"
                :read="false"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></tune-controller>
              <traffic-sensor
                v-if="item.productKind === 'SYS21B11B002'"
                :read="false"
                :data="item"
                @emits="emitFunc"
                :flag="flag"
                :clearFlag="clearFlag"
              ></traffic-sensor>
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" :kind="dialogKind" @resetConfirm="confirmDeleteModal"></confirm>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import storeModal from "@/components/modal/common/StoreList";
import companyModal from "@/components/modal/common/CompanyList";
import serialModal from "@/components/modal/assets/SerialList";
import { getPopupOpt } from "@/utils/modal";
import DatePicker from "@/components/form/DatePicker.vue";
import productModal from "@/components/modal/assets/AssetProductList";
import PullDown from "@/components/form/PullDown.vue";
import Film from "./storeDetail/Film.vue";
import Projector from "./storeDetail/Projector.vue";
import Router from "./storeDetail/Router.vue";
import SmartPlug from "./storeDetail/SmartPlug.vue";
import TuneController from "./storeDetail/TuneController.vue";
import TrafficSensor from "./storeDetail/TrafficSensor.vue";
export default {
  components: { alim, confirm, DatePicker, PullDown, Film, Projector, Router, SmartPlug, TuneController, TrafficSensor },
  mixins: [loading, alimMixin, deleteMixin],
  data() {
    return {
      page: 1,
      size: 8,
      len: null,
      list: [],

      companyStoreSid: "",
      companyStoreName: "",
      companyNation: "",
      companyStoreAddress1: "",
      companyStoreAddress2: "",
      companyStoreAdministrativeZone1: "",
      companyStoreAdministrativeZone2: "",
      companyStoreAdministrativeZone3: "",
      companyStoreAdministrativeZoneName1: "",
      companyStoreAdministrativeZoneName2: "",
      companyStoreAdministrativeZoneName3: "",
      companyStoreAgentSid: "",
      companyStoreAgentName: "",
      companyStoreAgentUserHp: "",
      companyStoreAgentUserName: "",
      companyStoreBillboardSize: "",
      companyStoreBusinessType: "",
      companyStoreBusinessTypeName: "",
      companyStoreCompanySid: "",
      companyStoreCompanyName: "",
      companyStoreMemo: "",
      companyStoreStatus: "",
      companyStoreStatusName: "",
      companyStoreWorkSlot: "",
      companyStoreZipcode: "",
      companyStoreZone: "",
      prospectiveCustomerSid: "",
      prospectiveCustomerName: "",
      product_installion_store: {},

      productInstallionStoreSid: "",
      productInstallionStoreStatus: "",
      productInstallionStoreStatusName: "",
      productInstallionStoreDate: "",
      productInstallionStoreSuntionCompanySid: "",
      productInstallionStoreSuntionCompanyName: "",
      productInstallionStoreCompanySid: "",
      productInstallionStoreCompanyName: "",
      productInstallionStoreProjectCompanySid: "",
      productInstallionStoreProjectCompanyName: "",

      productInstallionStoreInfoSid: "",
      productSid: "",
      productName: "",
      productionTransSid: "",
      productionSid: "",
      emitList: [],

      flag: false,
      clearFlag: false,
      existStoreInfo: [], // 설치제품이 있는지 확인하는 배열
    };
  },
  computed: {
    ...mapGetters("assetProduct", [
      // productionInstallionStore
      "getProductInstallionStoreList",
      "getProductInstallionStoreDetail",
      "productInstallionStoreModify",
      "productInstallionStoreAdd",
      "productInstallionStoreDelete",

      // productionInstallionStoreInfo
      "getProductInstallionStoreInfoList",
      "getProductInstallionStoreInfoAdd",
      "getProductInstallionStoreInfoSave",
      "getProductInstallionStoreInfoDelete",
    ]),
    fullAddress() {
      return `${this.companyStoreAddress1} ${this.companyStoreAddress2}`;
    },
  },
  watch: {
    page() {
      this.getInstallionStoreInfo();
    },
    size() {
      this.getInstallionStoreInfo();
    },
    filmWidth(val) {
      this.filmArea = val * this.filmHeight * this.filmQty;
    },
    filmHeight(val) {
      this.filmArea = val * this.filmWidth * this.filmQty;
    },
    filmQty(val) {
      this.filmArea = val * this.filmWidth * this.filmHeight;
    },
    filmArea(val) {
      if (typeof val === "number") {
        this.filmArea = val.toFixed(2);
      }
    },
    emitList(val) {
      if (val.length === this.list.length) {
        this.saveStoreInfo();
      }
    },
    clearFlag(val) {
      if (val) {
        setTimeout(() => {
          this.clearFlag = false;
        }, 2000);
      }
    },
  },
  methods: {
    // 스토어 모달
    showStoreModalPopup() {
      this.$modal.show(storeModal, { update: this.storeUpdate }, getPopupOpt("storeModal", "1000px", "auto", false));
    },
    storeUpdate(data) {
      this.companyStoreSid = data.id;
      this.companyStoreName = data.name;
      // this.clearInstallionStoreInfoList(true, true);
      this.getInstallionStore();
    },

    setFlag() {
      this.flag = true;
    },
    emitFunc(data) {
      let info = {};
      //데이터 가공
      switch (data.productKind) {
        case "SYS21910B007": //film
          info.productInstallionStoreInfoSid = data.filmSid;
          info.width = data.filmWidth;
          info.qty = data.filmQty;
          info.color = data.filmColor;
          info.height = data.filmHeight;
          info.area = data.filmArea;
          info.cohesion = data.filmCohesion;
          break;
        case "SYS21910B005": //projector
          info.productInstallionStoreInfoSid = data.projectorSid;
          info.company = data.projectorCompany;
          info.method = data.projectorMethod;
          info.mac = data.projectorMac;
          info.model = data.projectorModel;
          info.serialNumber = data.projectorSerialNumber;
          info.staticIp = data.projectorStaticIp;
          info.count = data.projectorCount;
          info.shortThrow = data.projectorShortThrow;
          info.quality = data.projectorQuality;
          info.ansi = data.projectorAnsi;
          info.contrastRatio = data.projectorContrastRatio;
          info.ntp = data.projectorNtp;
          break;
        case "SYS21910B006": //router
          info.productInstallionStoreInfoSid = data.routerSid;
          info.ssid = data.routerSsid;
          info.pw = data.routerPw;
          info.ctn = data.routerCtn;
          info.imei = data.routerImei;
          info.mac = data.routerMac;
          info.quality = data.routerQuality;
          info.reboot = data.routerReboot;
          info.serialNumber = data.routerSerialNumber;
          info.vpn = data.routerVpn;
          info.vpnId = data.routerVpnId;
          info.vpnPw = data.routerVpnPw;
          info.projectorIp = data.routerProjectorIp;
          info.projectorId = data.routerProjectorId;
          info.projectorPw = data.routerProjectorPw;
          break;
        case "SYS21B11B001": //Smart Plug
          info.productInstallionStoreInfoSid = data.plugSid;
          info.kind = data.plugKind;
          info.serialNumber = data.plugSerialNumber;
          info.mac = data.plugMac;
          info.productName = data.plugProductName;
          info.staticIp = data.plugStaticIp;
          break;
        case "SYS21910B004": //TUNE Controller
          info.productInstallionStoreInfoSid = data.controllerSid;
          info.watt = data.controllerWatt;
          info.crType = data.controllerCrType;
          info.switch = data.controllerSwitch;
          info.modelName = data.controllerModelName;
          info.setTopName = data.controllerSetTopName;
          info.mac = data.controllerMac;
          info.ip = data.controllerIp;
          break;
        case "SYS21B11B002": //Traffic Sensor
          info.productInstallionStoreInfoSid = data.sensorSid;
          info.modelName = data.sensorModelName;
          info.serialNumber = data.sensorSerialNumber;
          info.lan = data.sensorLan;
          info.mac = data.sensorMac;
          info.ip = data.sensorIp;
          break;
      }
      this.emitList.push(info);
    },
    // 업체 모달
    showCompanyModalPopup(type) {
      this.$modal.show(companyModal, { update: this.companyUpdate, type }, getPopupOpt("companyModal", "1000px", "auto", false));
    },
    companyUpdate(data) {
      switch (data.type) {
        case "sunting":
          this.productInstallionStoreSuntionCompanySid = data.companySid;
          this.productInstallionStoreSuntionCompanyName = data.companyName;
          break;
        case "construction":
          this.productInstallionStoreCompanySid = data.companySid;
          this.productInstallionStoreCompanyName = data.companyName;
          break;
        case "projector":
          this.productInstallionStoreProjectCompanySid = data.companySid;
          this.productInstallionStoreProjectCompanyName = data.companyName;
          break;
      }
    },
    // 제품 모달
    showProductModalPopup() {
      this.$modal.show(productModal, { update: this.productUpdate }, getPopupOpt("productModal", "1200px", "auto", false));
    },
    productUpdate(data) {
      this.productSid = data.productSid;
      this.productName = data.productName;
    },
    // 제품 시리얼모달
    showSerialModalPopup() {
      this.$modal.show(serialModal, { update: this.serialUpdate, productSid: this.productSid }, getPopupOpt("serialModal", "1200px", "auto", false));
    },
    serialUpdate(data) {
      this.productionTransSid = data.productionTransSid;
    },
    async getInstallionStore() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_DETAIL", this.companyStoreSid);
        if (this.getProductInstallionStoreDetail.channeltuneApiResult.errorCode == 200) {
          const response = this.getProductInstallionStoreDetail.channeltuneApiResult.productInstallionStore;
          this.companyNation = response.companyNation;
          this.companyStoreAddress1 = response.companyStoreAddress1;
          this.companyStoreAddress2 = response.companyStoreAddress2;
          this.companyStoreAdministrativeZone1 = response.companyStoreAdministrativeZone1;
          this.companyStoreAdministrativeZone2 = response.companyStoreAdministrativeZone2;
          this.companyStoreAdministrativeZone3 = response.companyStoreAdministrativeZone3;
          this.companyStoreAdministrativeZoneName1 = response.companyStoreAdministrativeZoneName1;
          this.companyStoreAdministrativeZoneName2 = response.companyStoreAdministrativeZoneName2;
          this.companyStoreAdministrativeZoneName3 = response.companyStoreAdministrativeZoneName3;
          this.companyStoreAgentSid = response.companyStoreAgentSid;
          this.companyStoreAgentName = response.companyStoreAgentName;
          this.companyStoreAgentUserHp = response.companyStoreAgentUserHp;
          this.companyStoreAgentUserName = response.companyStoreAgentUserName;
          this.companyStoreBillboardSize = response.companyStoreBillboardSize;
          this.companyStoreBusinessType = response.companyStoreBusinessType;
          this.companyStoreBusinessTypeName = response.companyStoreBusinessTypeName;
          this.companyStoreCompanySid = response.companyStoreCompanySid;
          this.companyStoreCompanyName = response.companyStoreCompanyName;
          this.companyStoreMemo = response.companyStoreMemo;
          this.companyStoreStatus = response.companyStoreStatus;
          this.companyStoreStatusName = response.companyStoreStatusName;
          this.companyStoreWorkSlot = response.companyStoreWorkSlot;
          this.companyStoreZipcode = response.companyStoreZipcode;
          this.companyStoreZone = response.companyStoreZone;
          this.prospectiveCustomerSid = response.prospectiveCustomerSid;
          this.prospectiveCustomerName = response.prospectiveCustomerName;
          this.product_installion_store = response.product_installion_store;
          this.productInstallionStoreSid = this.product_installion_store?.productInstallionStoreSid || "";
          this.productInstallionStoreStatus = this.product_installion_store?.productInstallionStoreStatus || "";
          this.productInstallionStoreStatusName = this.product_installion_store?.productInstallionStoreStatusName || "";
          this.productInstallionStoreDate = this.product_installion_store?.productInstallionStoreDate || "";
          this.productInstallionStoreSuntionCompanySid = this.product_installion_store?.productInstallionStoreSuntionCompanySid || "";
          this.productInstallionStoreSuntionCompanyName = this.product_installion_store?.productInstallionStoreSuntionCompanyName || "";
          this.productInstallionStoreCompanySid = this.product_installion_store?.productInstallionStoreCompanySid || "";
          this.productInstallionStoreCompanyName = this.product_installion_store?.productInstallionStoreCompanyName || "";
          this.productInstallionStoreProjectCompanySid = this.product_installion_store?.productInstallionStoreProjectCompanySid || "";
          this.productInstallionStoreProjectCompanyName = this.product_installion_store?.productInstallionStoreProjectCompanyName || "";
          this.getInstallionStoreInfo();
        } else {
          this.alim(this.getProductInstallionStoreDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // (공통) 삭제 확인 모달
    confirmDeleteModal(data) {
      if (data?.del == "Y" && data?.type == "list") {
        switch (data?.kind) {
          case "store":
            this.InstallionDelete();
            break;
          case "storeInfo":
            this.storeInfoDelete();
            break;
          default:
            break;
        }
      }
      this.resetDeleteData();
    },

    Search() {
      if (this.companyStoreSid === "" || this.companyStoreSid === null) {
        this.alim("스토어를 선택해주세요", this.errorColor);
      } else {
        this.getInstallionStore();
      }
    },

    // store 스토어 설치제품 validate
    InstallionValidate(method) {
      if (method == "add") {
        if (this.companyStoreSid == "" || this.companyStoreSid == null) {
          this.alim("스토어를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.productInstallionStoreDate == "" || this.productInstallionStoreDate == null) {
          this.alim("설치시공일을 입력하세요.", this.errorColor);
          return false;
        }
      }

      if (method == "add" || method == "update") {
        if (this.productInstallionStoreCompanySid == "" || this.productInstallionStoreCompanySid == null) {
          this.alim("설치시공업체를 선택하세요.", this.errorColor);
          return false;
        }
        if (this.productInstallionStoreProjectCompanySid == "" || this.productInstallionStoreProjectCompanySid == null) {
          this.alim("프로젝터설치업체 선택하세요.", this.errorColor);
          return false;
        }
        if (this.productInstallionStoreStatus == "" || this.productInstallionStoreStatus == null) {
          this.alim("설치 상태를 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (method == "update" || method == "delete") {
        if (this.productInstallionStoreSid == "" || this.productInstallionStoreSid == null) {
          this.alim("스토어 설치제품이 존재하지 않습니다.", this.errorColor);
          return false;
        }
      }

      switch (method) {
        case "add":
          this.installionAdd();
          break;
        case "update":
          this.installionUpdate();
          break;
        case "delete":
          this.confirm(this.productInstallionStoreSid, "store");
          break;
      }
    },
    // 설치 제품 등록
    async installionAdd() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_ADD", {
          companyStoreSid: this.companyStoreSid,
          productInstallionStoreDate: this.productInstallionStoreDate,
          productInstallionStoreSuntionCompanySid: this.productInstallionStoreSuntionCompanySid, // 선팅시공업체
          productInstallionStoreCompanySid: this.productInstallionStoreCompanySid, // 설치시공업체
          productInstallionStoreProjectCompanySid: this.productInstallionStoreProjectCompanySid, // 프로젝터시공업체
          productInstallionStoreStatus: this.productInstallionStoreStatus, // 설치상태
        });
        if (this.productInstallionStoreAdd.channeltuneApiResult.errorCode == 200) {
          const response = this.productInstallionStoreAdd.channeltuneApiResult.productInstallionStore;
          this.alim("설치제품이 등록되었습니다.", this.successColor);
          this.productInstallionStoreSid = response.productInstallionStoreSid;
        } else {
          this.alim(this.productInstallionStoreAdd.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 설치 제품 수정
    async installionUpdate() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_MODIFY", {
          productInstallionStoreSid: this.productInstallionStoreSid,
          productInstallionStoreDate: this.productInstallionStoreDate,
          productInstallionStoreSuntionCompanySid: this.productInstallionStoreSuntionCompanySid, // 선팅시공업체
          productInstallionStoreCompanySid: this.productInstallionStoreCompanySid, // 설치시공업체
          productInstallionStoreProjectCompanySid: this.productInstallionStoreProjectCompanySid, // 프로젝터시공업체
          productInstallionStoreStatus: this.productInstallionStoreStatus, // 설치상태
        });
        if (this.productInstallionStoreModify.channeltuneApiResult.errorCode == 200) {
          this.alim("설치제품이 수정되었습니다.", this.successColor);
          this.getInstallionStore();
        } else {
          this.alim(this.productInstallionStoreModify.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 설치 제품 삭제
    async InstallionDelete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_DELETE", this.productInstallionStoreSid);
        if (this.productInstallionStoreDelete.channeltuneApiResult.errorCode == 200) {
          this.alim("설치제품이 삭제되었습니다.", this.successColor);
          // this.clearInstallionStoreInfoList(true, true);
          this.getInstallionStore();
        } else {
          this.alim(this.productInstallionStoreDelete.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // StoreInfo
    async getInstallionStoreInfo() {
      if (this.productInstallionStoreSid == "" || this.productInstallionStoreSid == null) {
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
    newProductInstallionStoreStatus(data) {
      this.productInstallionStoreStatus = data.sysCodeSid;
      this.productInstallionStoreStatusName = data.sysCodeName;
    },
    InstallionInfoValidate(method) {
      if (method == "add") {
        if (this.productInstallionStoreSid == "" || this.productInstallionStoreSid == null) {
          this.alim("스토어 설치제품이 존재하지 않습니다.", this.errorColor);
          return false;
        }

        if (this.productSid == "" || this.productSid == null) {
          this.alim("설치제품을 선택하세요.", this.errorColor);
          return false;
        }

        if (this.productionTransSid == "" || this.productionTransSid == null) {
          this.alim("제품Serial번호를 입력하거나 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (method == "delete") {
        if (this.productInstallionStoreInfoSid == "" || this.productInstallionStoreInfoSid == null) {
          this.alim("스토어 설치제품을 선택하세요.", this.errorColor);
          return false;
        }
      }

      switch (method) {
        case "add":
          this.storeInfoAdd();
          break;
        case "delete":
          this.confirm(this.productInstallionStoreInfoSid, "storeInfo");
          break;
      }
    },
    async storeInfoAdd() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTOREINFO_ADD", {
          productInstallionStoreSid: this.productInstallionStoreSid,
          productSid: this.productSid,
          productionTransSid: this.productionTransSid,
        });
        if (this.getProductInstallionStoreInfoAdd.channeltuneApiResult.errorCode == 200) {
          const response = this.getProductInstallionStoreInfoAdd.channeltuneApiResult.productInstallionStoreInfo;
          this.productInstallionStoreInfoSid = response.productInstallionStoreInfoSid;
          this.getInstallionStoreInfo();
        } else {
          this.alim(this.getProductInstallionStoreInfoAdd.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async storeInfoDelete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTOREINFO_DELETE", this.productInstallionStoreInfoSid);
        if (this.getProductInstallionStoreInfoDelete.channeltuneApiResult.errorCode == 200) {
          this.productInstallionStoreInfoSid = "";
          this.productSid = "";
          this.productName = "";
          this.productionTransSid = "";
          // this.clearInstallionStoreInfoList(false, true);
          this.getInstallionStoreInfo();
        } else {
          this.alim(this.setManagerResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // StoreInfo 아이템 선택시
    selectStoreInfo(data) {
      this.productInstallionStoreInfoSid = data.productInstallionStoreInfoSid;
      this.productSid = data.productSid;
      this.productName = data.productName;
      this.productionTransSid = data.productionTransSid;
      this.getInstallionStoreInfo();
    },
    // 설치제품 상세(json)
    async saveStoreInfo() {
      // 각 sid가 존재하는 항목만 추출, 각항목을 JSON으로
      const existSidArr = this.emitList.filter(item => {
        return parseInt(item.productInstallionStoreInfoSid) != 0;
      });
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTOREINFO_SAVE", {
          infoList: existSidArr,
        });
        if (this.getProductInstallionStoreInfoSave.channeltuneApiResult.errorCode == 200) {
          this.alim("설치 제품 상세가 저장되었습니다.", this.successColor);
        } else {
          this.alim(this.getProductInstallionStoreInfoSave.channeltuneApiResult.errorMessage, this.errorColor);
        }
        this.flag = false;
        this.emitList = [];
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clearInstallionStore() {
      this.companyStoreSid = "";
      this.companyStoreName = "";
      this.companyStoreBusinessTypeName = "";
      this.companyStoreAgentName = "";
      this.companyNation = "";
      this.companyStoreZone = "";
      this.companyStoreAgentUserName = "";
      this.companyStoreAgentUserHp = "";
      this.companyStoreZipcode = "";
      this.companyStoreAddress1 = "";
      this.companyStoreAddress2 = "";
      this.productInstallionStoreSid = "";
      this.productInstallionStoreDate = "";
      this.productInstallionStoreSuntionCompanySid = "";
      this.productInstallionStoreCompanySid = "";
      this.productInstallionStoreProjectCompanySid = "";
      this.productInstallionStoreSuntionCompanyName = "";
      this.productInstallionStoreCompanyName = "";
      this.productInstallionStoreProjectCompanyName = "";
      this.list = [];
    },
    clearInstallionStoreInfo() {
      this.productSid = "";
      this.productName = "";
      this.productionTransSid = "";
    },
    clear() {
      this.clearFlag = true;
    },

    newProductInstallionStoreDate(data) {
      this.productInstallionStoreDate = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;

  & .print {
    display: flex;
    justify-content: space-between;
  }
}
.store-manage {
  display: flex;
  justify-content: space-between;

  & .bottom-sec {
    margin-top: 20px;
  }
  & .com-container {
    height: 80vh;
    overflow-y: auto;
  }
  & .td-btn-group,
  .btn-group {
    float: right;
    & button {
      margin-left: 5px;
    }
  }

  & .store-list {
    width: 650px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }

  & .input-full {
    width: calc(100% - 130px) !important;
    margin: 0 0 0 5px;
  }

  & .section-box {
    width: calc(100% - 660px);
    height: 100%;
    & .title-wrap {
      display: flex;
      justify-content: space-between;
    }

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
</style>
