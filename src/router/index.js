import Vue from "vue";
import VueRouter from "vue-router";
import { getAccessTokenCookie } from "@/utils/cookie";
const ui = () => import("@/components/common/Ui.vue");
const top = () => import("@/components/common/Top.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    //메뉴 활성 세팅
    {
      path: "/system",
      redirect: "/system/syscode",
    },
    {
      path: "/hr",
      redirect: "/hr/interbridPosition",
    },
    {
      path: "/asset/category/",
      redirect: "/asset/category/TangibleAssetList",
    },
    {
      path: "/calculate",
      redirect: "/calculate/DashBoard",
    },
    {
      path: "/ad",
      redirect: "/ad/manage_campaign",
    },
    {
      path: "/homepage",
      redirect: "/homepage/user",
    },
    {
      // 게시판 관리
      path: "/homepage/board/",
      redirect: "/homepage/board/notice",
    },
    {
      // 공지사항 리스트
      path: "/homepage/board/notice/",
      redirect: "/homepage/board/notice/list",
    },
    {
      // faq 리스트
      path: "/homepage/board/faq/",
      redirect: "/homepage/board/faq/list",
    },
    {
      // 보도 리스트
      path: "/homepage/board/news/",
      redirect: "/homepage/board/news/list",
    },
    {
      // 파트너
      path: "/homepage/partners/",
      redirect: "/homepage/partners/contact",
    },
    {
      path: "/asset",
      redirect: "/asset/product",
    },
    {
      path: "/operation",
      redirect: "/operation/company",
    },
    {
      path: "/asset/product",
      redirect: "/asset/product/product",
    },
    {
      path: "/operation/customer/",
      redirect: "/operation/customer/prospectiveCustomerList",
    },
    {
      path: "/system/menu/",
      redirect: "/system/menu/adminmenulist",
    },
    {
      path: "/operation/store/",
      redirect: "/operation/store/storeCustomerManage",
    },

    {
      path: "/homepage/sales",
      redirect: "/homepage/sales/ad",
    },
    {
      path: "/homepage/event",
      redirect: "/homepage/event/addtuneEvent",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login.vue"),
      meta: { unauthorized: true },
    },
    {
      path: "/main",
      name: "main",
      meta: { lnb: "system" },
      components: {
        top,
        contents: () => import("@/views/main.vue"),
      },
    },
    //시스템 관리
    {
      path: "/system/syscode",
      name: "syscode",
      meta: { lnb: "시스템 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/system/SysCode.vue"),
      },
    },
    {
      path: "/system/adminuser",
      name: "adminuser",
      meta: { lnb: "시스템 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/system/AdminUser.vue"),
      },
    },
    {
      path: "/system/languageset",
      name: "languageset",
      meta: { lnb: "시스템 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/system/LanguageSet.vue"),
      },
    },
    {
      path: "/system/menu/adminmenulist",
      name: "adminmenulist",
      meta: { lnb: "시스템 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/system/AdminMenuList.vue"),
      },
    },
    {
      path: "/system/menu/partnermenulist",
      name: "partnermenulist",
      meta: { lnb: "시스템 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/system/PartnerMenuList.vue"),
      },
    },
    //운영 관리
    {
      path: "/operation/company",
      name: "company",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/Company.vue"),
      },
    },
    {
      path: "/operation/companyPerson",
      name: "companyPerson",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/CompanyPerson.vue"),
      },
    },
    {
      path: "/operation/customer/prospectiveCustomer",
      name: "prospectiveCustomer",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/prospectiveCustomer.vue"),
      },
    },
    {
      path: "/operation/customer/prospectiveCustomerList",
      name: "prospectiveCustomerList",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/prospectiveCustomerList.vue"),
      },
    },
    {
      path: "/operation/actualSurvey",
      name: "actualSurvey",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/ActualSurvey.vue"),
      },
    },
    {
      path: "/operation/actualSurveyPartner",
      name: "actualSurveyPartner",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/ActualSurveyPartner.vue"),
      },
    },
    {
      path: "/operation/store/storeCustomerManage",
      name: "storeCustomerManage",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/StoreCustomerManage.vue"),
      },
    },
    {
      path: "/operation/store/storeMonthTrafic",
      name: "storeMonthTrafic",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/StoreMonthTrafic.vue"),
      },
    },
    {
      path: "/operation/store/MonthlyStoreTrafficAggregation",
      name: "MonthlyStoreTrafficAggregation",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/MonthlyStoreTrafficAggregation.vue"),
      },
    },
    {
      path: "/operation/store/AdvertisementUnitPrice",
      name: "AdvertisementUnitPrice",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/AdvertisementUnitPrice.vue"),
      },
    },
    {
      path: "/operation/store/storeSendTime",
      name: "storeSendTime",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/StoreSendTime.vue"),
      },
    },
    {
      path: "/operation/store/storeCommercialManage",
      name: "storeCommercialManage",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/StoreCommercialManage.vue"),
      },
    },
    {
      path: "/operation/store/storeList",
      name: "storeList",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/StoreList.vue"),
      },
    },
    {
      path: "/operation/contract",
      name: "contract",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/Contract.vue"),
      },
    },
    {
      path: "/operation/partnerSite/",
      name: "partnerSite",
      meta: { lnb: "운영 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/operation/PartnerSite.vue"),
      },
    },
    //자산 관리
    {
      path: "/asset/product/product",
      name: "assets_product",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/Product.vue"),
      },
    },
    {
      path: "/asset/product/production",
      name: "assets_production",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/Production.vue"),
      },
    },
    {
      path: "/asset/product/store",
      name: "assets_store",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/Store.vue"),
      },
    },
    {
      path: "/asset/status/installationStatus",
      name: "installationStatus",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/InstallationStatus.vue"),
      },
    },
    {
      path: "/asset/status/ProductTuneStatus",
      name: "ProductTuneStatus",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/ProductTuneStatus.vue"),
      },
    },

    {
      // 스토어튠 유지관리
      path: "/asset/maintain",
      name: "maintain",
      meta: { lnb: "자산 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/asset/Maintain.vue"),
      },
    },
    {
      path: "/asset/category/TangibleAssetList",
      name: "TangibleAssetList",
      meta: { lnb: "자산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/hr/TangibleAssetList.vue"),
      },
    },
    {
      path: "/asset/category/TangibleAssetManagement",
      name: "TangibleAssetManagement",
      meta: { lnb: "자산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/hr/TangibleAssetManagement.vue"),
      },
    },

    //홈페이지 관리
    {
      path: "/homepage/customer/inquire",
      name: "contact",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Inquire.vue"),
      },
    },
    {
      path: "/homepage/user",
      name: "user",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/User.vue"),
      },
    },
    {
      path: "/homepage/board/notice/list",
      name: "notice_list",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Notice.vue"),
      },
    },
    {
      path: "/homepage/board/notice/write",
      name: "notice_write",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/NoticeWrite.vue"),
      },
    },
    {
      path: "/homepage/board/notice/view/:id",
      name: "notice_view",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/NoticeView.vue"),
      },
    },
    {
      path: "/homepage/board/faq/list",
      name: "faq",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Faq.vue"),
      },
    },
    {
      path: "/homepage/board/faq/write",
      name: "faq_write",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/FaqWrite.vue"),
      },
    },
    {
      path: "/homepage/board/faq/view/:id",
      name: "faq_view",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/FaqView.vue"),
      },
    },
    {
      path: "/homepage/board/news/list",
      name: "news",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/News.vue"),
      },
    },
    {
      path: "/homepage/board/news/write",
      name: "news_write",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/NewsWrite.vue"),
      },
    },
    {
      path: "/homepage/board/news/view/:id",
      name: "news_view",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/NewsView.vue"),
      },
    },
    {
      path: "/homepage/product",
      name: "product",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Product.vue"),
      },
    },
    {
      path: "/homepage/estimate",
      name: "estimate",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Estimate.vue"),
      },
    },
    {
      path: "/homepage/event/addtuneEvent",
      name: "event",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Event.vue"),
      },
    },
    {
      path: "/homepage/event/tuneEvent",
      name: "tuneEvent",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/TuneEvent.vue"),
      },
    },
    {
      path: "/homepage/banner",
      name: "banner",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Banner.vue"),
      },
    },
    {
      path: "/homepage/advertiser",
      name: "advertiser",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/Advertiser.vue"),
      },
    },
    {
      path: "/homepage/sales/ad",
      name: "adSales",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/AdSales.vue"),
      },
    },
    {
      path: "/homepage/sales/video",
      name: "videoSales",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/VideoSales.vue"),
      },
    },
    {
      path: "/homepage/partners/contact",
      name: "partners_contact",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersContact.vue"),
      },
    },
    {
      path: "/homepage/partners/faq",
      name: "partners_faq",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersFaq.vue"),
      },
    },
    {
      path: "/homepage/partners/faq/view/:id",
      name: "partners_faq_detail",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersFaqDetail.vue"),
      },
    },
    {
      path: "/homepage/partners/faq/write",
      name: "partners_faq_write",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersFaqWrite.vue"),
      },
    },
    {
      path: "/homepage/partners/notice",
      name: "partners_notice",
      meta: { lnb: "홈페이지 관리", menuOpen: true },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersNotice.vue"),
      },
    },
    {
      path: "/homepage/partners/notice/view/:id",
      name: "partners_notice_detail",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersNoticeDetail.vue"),
      },
    },
    {
      path: "/homepage/partners/notice/write",
      name: "partners_notice_write",
      meta: { lnb: "홈페이지 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/homepage/PartnersNoticeWrite.vue"),
      },
    },
    // 광고편성관리
    {
      path: "/ad/management",
      name: "management",
      meta: { lnb: "광고편성 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/ad/Management.vue"),
      },
    },
    {
      path: "/ad/manage_campaign",
      name: "managemen ByCampaign",
      meta: { lnb: "광고편성 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/ad/ManagementByCampaign.vue"),
      },
    },
    {
      path: "/ad/advertisement_management",
      name: "admanagement",
      meta: { lnb: "광고편성 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/ad/AdManagement.vue"),
      },
    },
    {
      path: "/ad/playerapp",
      name: "playerapp",
      meta: { lnb: "광고편성 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/ad/PlayerApp.vue"),
      },
    },
    {
      path: "/ad/player",
      name: "player",
      meta: { lnb: "광고편성 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/ad/Player.vue"),
      },
    },
    //정산 관리
    {
      path: "/calculate/DashBoard",
      name: "SettlementDashBoard",
      meta: { lnb: "정산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/calculate/SettlementDashBoard.vue"),
      },
    },
    {
      path: "/calculate/SettlementProcessing",
      name: "SettlementProcessing",
      meta: { lnb: "정산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/calculate/SettlementProcessing.vue"),
      },
    },
    {
      path: "/calculate/monthlySalesByStore",
      name: "monthlySalesByStore",
      meta: { lnb: "정산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/calculate/MonthlySalesByStore.vue"),
      },
    },
    {
      path: "/calculate/SettlementNotice",
      name: "SettlementNotice",
      meta: { lnb: "정산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/calculate/SettlementNotice.vue"),
      },
    },
    {
      path: "/calculate/SettlementAccumulate",
      name: "SettlementAccumulate",
      meta: { lnb: "정산 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/calculate/SettlementAccumulate.vue"),
      },
    },
    //인사 관리
    {
      path: "/hr/interbridPosition",
      name: "interbridPosition",
      meta: { lnb: "인사 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/hr/InterbridPosition.vue"),
      },
    },
    {
      path: "/hr/interbridDepartment",
      name: "interbridDepartment",
      meta: { lnb: "인사 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/hr/InterbridDepartment.vue"),
      },
    },
    {
      path: "/hr/interbridEmployee",
      name: "interbridEmployee",
      meta: { lnb: "인사 관리" },
      components: {
        ui,
        top,
        contents: () => import("@/views/hr/InterbridEmployee.vue"),
      },
    },

    //404
    {
      path: "*",
      name: "pageNotFound",
      component: () => import("@/views/error/NotFoundPage.vue"),
    },
  ],
});

//router guard
router.beforeEach(async (to, from, next) => {
  //액세스 토큰이 있을 경우
  if (getAccessTokenCookie() !== null) {
    return next();
  }

  //로그인 필요 없는 페이지
  if (to.matched.some(record => record.meta.unauthorized) || getAccessTokenCookie()) {
    return next();
  }

  //액세스 토큰이 없을 경우
  return next("/login");
});

export default router;
