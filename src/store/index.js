import Vue from "vue";
import Vuex from "vuex";

// common
import common from "@/store/modules/common/common.js";

// system
import system from "@/store/modules/system/system.js";
import member from "@/store/modules/system/member.js";
import menu from "@/store/modules/system/menu.js";
import systemCode from "@/store/modules/system/systemCode.js";
import languageSet from "@/store/modules/system/languageSet.js";

// member
import login from "@/store/modules/member/login.js";

// operation
import company from "@/store/modules/operation/company.js";
import companyPerson from "@/store/modules/operation/companyPerson.js";
import prospectiveCustomer from "@/store/modules/operation/prospectiveCustomer.js";
import companyStore from "@/store/modules/operation/companyStore.js";
import actualSurvey from "@/store/modules/operation/actualSurvey.js";
import contract from "@/store/modules/operation/contract.js";
import actualSurveyPartner from "@/store/modules/operation/actualSurveyPartner.js";
import storeZoneAnalysis from "@/store/modules/operation/storeZoneAnalysis.js";

// hr
import interbridPosition from "@/store/modules/hr/interbridPosition.js";
import interbridDepartment from "@/store/modules/hr/interbridDepartment.js";
import interbridEmployee from "@/store/modules/hr/interbridEmployee.js";
import tangibleAssets from "@/store/modules/hr/tangibleAssets.js";

//calculate
import settlementProcessing from "@/store/modules/calculate/settlementProcessing.js";
import settlementNotice from "@/store/modules/calculate/settlementNotice.js";

// homepage
import user from "@/store/modules/homepage/user.js";
import inquire from "@/store/modules/homepage/inquire.js";
import product from "@/store/modules/homepage/advertisingProduct.js";
import estimate from "@/store/modules/homepage/estimate.js";
import event from "@/store/modules/homepage/event.js";
import banner from "@/store/modules/homepage/banner.js";
import ad from "@/store/modules/homepage/ad.js";
import sales from "@/store/modules/homepage/sales.js";
// import popup from '@/store/modules/homepage/popup.js';

// asset
import assetProduct from "@/store/modules/asset/product.js";
import assetStoreList from "@/store/modules/asset/storeList.js";

// ad
import organizeAd from "@/store/modules/ad/organizeAd.js";
import campaign from "@/store/modules/ad/campaign.js";
import qr from "@/store/modules/ad/qr.js";
import player from "@/store/modules/ad/player.js";

import video from "@/store/modules/utility/video.js";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    common,
    player,

    system,
    member,
    menu,
    systemCode,

    login,

    company,
    companyPerson,
    prospectiveCustomer,
    companyStore,
    actualSurvey,
    contract,
    actualSurveyPartner,
    storeZoneAnalysis,

    interbridPosition,
    interbridDepartment,
    interbridEmployee,
    tangibleAssets,

    settlementProcessing,
    settlementNotice,

    user,
    languageSet,
    inquire,
    product,
    estimate,
    banner,
    event,
    ad,
    sales,
    // popup,
    video,

    assetProduct,
    assetStoreList,

    organizeAd,
    campaign,
    qr,
  },
});
