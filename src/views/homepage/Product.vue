<template>
  <section class="container">
    <div class="title-wrap">
      <h1>상품 등록</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>상품 리스트</h2>
            <div class="search d-flex">
              <div class="w200 mr5">
                <pull-down :data="productKindSearch" code="SYS21A28B002" @selected="productKindProp" class="pull-down"></pull-down>
              </div>
              <input type="text" placeholder="상품명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" @click="reload(1)" class="btn-search">조회</v-btn>
              <v-btn small @click="reset" class="btn-search">검색 초기화</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              상품 리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="100" />
              <col width="*" />
              <col width="90" />
              <col width="90" />
              <col width="90" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>상품종류</th>
                <th class="left">상품명</th>
                <th class="right">상품가격</th>
                <th>상품노출</th>
                <th>상품상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="productDetail(item.advertisingProductSid)">
                <td>{{ item.advertisingProductSid }}</td>
                <td>{{ item.advertisingProductKindName }}</td>
                <td class="left">{{ item.advertisingProductName }}</td>
                <td class="right">{{ item.advertisingProductPrice }}</td>
                <td>{{ item.advertisingProductPriceOpenFlag }}</td>
                <td>{{ item.advertisingProductStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">상품 리스트가 없습니다.</td>
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
          <div class="header">
            <h2>설정</h2>
            <div class="btn-group">
              <v-btn small color="primary" dark @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" dark @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(advertisingProductSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr v-if="showOptionBenefit === true">
                <td colspan="4">
                  <div v-show="advertisingProductKind === 'SYS21A28B006'" class="option-benefit-btn-group">
                    <v-btn small color="primary" @click="showOptionModal">광고상품 옵션설정</v-btn>
                    <v-btn small color="primary" @click="showBenefitModal">광고상품 혜택설정</v-btn>
                  </div>
                  <div v-show="advertisingProductKind === 'SYS21A28B007'" class="option-benefit-btn-group">
                    <v-btn
                      small
                      color="primary"
                      @click="__showModalTemplate(require('@/components/modal/ad/AdVideoOptionAdd.vue'), { Sid: advertisingProductSid }, 900)"
                      >광고영상 옵션등록</v-btn
                    >
                    <v-btn
                      small
                      color="primary"
                      @click="__showModalTemplate(require('@/components/modal/ad/AdVideoPortFolio.vue'), { Sid: advertisingProductSid }, 1200)"
                      >광고영상 포트폴리오</v-btn
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <td>고유 코드</td>
                <td><input type="text" readonly v-model="advertisingProductSid" /></td>
                <td class="required">메인상품 여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="advertisingProductMainFlag" :mandatory="false">
                      <v-radio label="사용" value="Y"></v-radio>
                      <v-radio label="미사용" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">상품 종류</td>
                <td>
                  <pull-down
                    :data="advertisingProductKind"
                    code="SYS21A28B002"
                    @selected="advertisingProductKindNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">가격 노출 여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="advertisingProductPriceOpenFlag" :mandatory="false">
                      <v-radio label="노출" value="Y"></v-radio>
                      <v-radio label="미노출" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">원가</td>
                <td><input type="text" v-model="advertisingProductCostPrice" /></td>
                <td class="required">가격비율</td>
                <td><input type="text" v-model="advertisingProductPriceRate" /></td>
              </tr>
              <tr>
                <td class="required">상품 가격</td>
                <td><input type="text" v-model="advertisingProductPrice" /></td>
                <td class="required">상품가격 단위</td>
                <td>
                  <pull-down
                    :data="advertisingProductPriceUnit"
                    code="SYS21A28B003"
                    @selected="advertisingProductPriceUnitNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">상품명</td>
                <td colspan="3"><input type="text" v-model="advertisingProductName" /></td>
              </tr>
              <tr>
                <td class="required">상품 노출 디바이스</td>
                <td>
                  <pull-down
                    :data="advertisingProductOpenDevice"
                    :code="deviceCode"
                    @selected="advertisingProductOpenDeviceNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">상품 상태</td>
                <td>
                  <pull-down
                    :data="advertisingProductStatus"
                    :code="statusCode"
                    @selected="advertisingProductStatusNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>썸네일 이미지 첨부</td>
                <td class="file-add" colspan="3">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in file" :key="index">
                        <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
                          <img
                            v-else
                            :src="`${urlPath}/file/fileView/${item.url}`"
                            @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">상품 개요</td>
                <td colspan="3"><textarea v-model="advertisingProductSummary"></textarea></td>
              </tr>
              <tr>
                <td>상품 라벨 명</td>
                <td colspan="3"><input type="text" v-model="advertisingProductOptionSummary" /></td>
              </tr>
              <tr>
                <td>상품 상세 종류 선택</td>
                <td class="radio">
                  <v-radio-group v-model="advertisingProductContentKind">
                    <v-radio label="이미지" value="SYS22228B002"></v-radio>
                    <v-radio label="텍스트" value="SYS22228B003"></v-radio>
                  </v-radio-group>
                </td>
              </tr>

              <tr v-if="advertisingProductContentKind === 'SYS22228B002'">
                <td>이미지 첨부(모바일)</td>
                <td class="file-add" colspan="3">
                  <div class="file-wrap">
                    <file-upload-img :deleteAll="deleteAllFiles" @uploadFiles1="uploadFiles1" :fileType="'image/*'"></file-upload-img>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in file1" :key="index">
                        <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message1 === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
                          <img
                            v-else
                            :src="`${urlPath}/file/fileView/${item.url}`"
                            @click="thumbnailModal1({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message1 === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr v-if="advertisingProductContentKind === 'SYS22228B002'">
                <td>이미지 첨부(Web)</td>
                <td class="file-add" colspan="3">
                  <div class="file-wrap">
                    <file-upload-web :deleteAll="deleteAllFiles" @uploadFiles2="uploadFiles2" :fileType="'image/*'"></file-upload-web>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in file2" :key="index">
                        <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message2 === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
                          <img
                            v-else
                            :src="`${urlPath}/file/fileView/${item.url}`"
                            @click="thumbnailModal2({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message2 === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr v-if="advertisingProductContentKind === 'SYS22228B003'">
                <td>타이틀</td>
                <td colspan="3">
                  <input type="text" v-model="advertisingProductContentTitle" />
                </td>
              </tr>

              <tr class="absol" v-if="advertisingProductContentKind === 'SYS22228B003'">
                <td>세부내용(HTML)</td>
                <td colspan="3"><textarea v-model="advertisingProductContent" class="content"></textarea></td>
              </tr>
              <tr>
                <td>언어셋 설정</td>
                <td class="with-btn d-flex" colspan="3">
                  <v-select outlined class="select-basic id" v-model="languagebtn" item-text="key" item-value="value" :items="languageSetArr" />
                  <v-btn small color="#D0A9F5" dark style="margin-left: 5px" @click="showLanguageSetModalPopup(-1, languagebtn)">언어셋</v-btn>
                </td>
              </tr>
            </table>
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
import PullDown from "@/components/form/PullDown.vue";
import isEmpty from "@/utils/empty";
import FileUpload from "@/components/form/FileUpload.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import modalMixin from "@/mixins/showModal.js";
import deleteMixin from "@/mixins/delete.js";
import productOptionModal from "@/components/modal/homepage/ProductOption.vue";
import productBenefitModal from "@/components/modal/homepage/ProductBenefit.vue";
import FileUploadImg from "../../components/form/FileUploadImg.vue";
import FileUploadWeb from "../../components/form/FileUploadWeb.vue";
export default {
  components: { alim, confirm, PullDown, FileUpload, FileUploadImg, FileUploadWeb },
  mixins: [modalMixin, loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //날짜 초기 데이터
      date: "",
      //게시물 설정
      page: 1,
      searchText: "",
      productKindName: "",
      productKind: "",
      len: null,
      list: [],
      //디테일 데이터
      productKindSearch: "",
      productKindNameSearch: "",
      advertisingProductName: "",
      advertisingProductContentTitle: "",
      advertisingProductContentKind: "",
      advertisingProductPrice: "",
      advertisingProductSid: "",
      advertisingProductKind: "",
      advertisingProductKindName: "",
      advertisingProductPriceOpenFlag: "",
      advertisingProductMainFlag: "",
      advertisingProductPriceUnit: "",
      advertisingProductPriceUnitName: "",
      advertisingProductOpenDevice: "",
      advertisingProductCostPrice: "", //원가
      advertisingProductPriceRate: "", //비율
      advertisingProductOpenDeviceName: "",
      advertisingProductStatus: "",
      advertisingProductStatusName: "",
      advertisingProductSummary: "",
      advertisingProductOptionSummary: "",
      advertisingProductContent: "",
      productDetailSelect: "",
      message: true,
      message1: true,
      message2: true,
      channeltuneFiles: [],
      channeltune1Files: [],
      channeltune2Files: [],
      languagebtn: "",
      languageSetArr: [
        {
          key: "상품명",
          value: "advertisingProductName",
        },
        {
          key: "상품개요",
          value: "advertisingProductSummary",
        },
        {
          key: "상품 라벨명",
          value: "advertisingProductOptionSummary",
        },
      ],
      file: [],
      file1: [], //모바일 이미지
      file2: [], //Web 이미지
      //셀렉트 설정
      searchCode: "SYS21A28B002",
      priceCode: "SYS21A28B003",
      deviceCode: "SYS21A28B004",
      statusCode: "SYS21A28B005",

      showOptionBenefit: false,
    };
  },
  computed: {
    ...mapGetters("product", ["getProductList", "getProductDetail", "productRegResult", "productModifyResult", "productDeleteResult"]),
    ...mapGetters("common", ["fileDeleteResult"]),
    urlPath() {
      return process.env.VUE_APP_API;
    },
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num == 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num == 1) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          productKind: this.productKindSearch,
        });

        const res = this.getProductList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.advertisingProduct;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    reset() {
      this.searchText = "";
      this.productKindSearch = "";
      this.productKindNameSearch = "";
      this.reload(1);
    },
    //풀다운 데이터 emit
    productKindProp(data) {
      this.productKindSearch = data.sysCodeSid;
      this.productKindNameSearch = data.sysCodeName;
    },
    advertisingProductKindNameProp(data) {
      this.advertisingProductKind = data.sysCodeSid;
      this.advertisingProductKindName = data.sysCodeName;
    },
    advertisingProductPriceUnitNameProp(data) {
      this.advertisingProductPriceUnit = data.sysCodeSid;
      this.advertisingProductPriceUnitName = data.sysCodeName;
    },
    advertisingProductOpenDeviceNameProp(data) {
      this.advertisingProductOpenDevice = data.sysCodeSid;
      this.advertisingProductOpenDeviceName = data.sysCodeName;
    },
    advertisingProductStatusNameProp(data) {
      this.advertisingProductStatus = data.sysCodeSid;
      this.advertisingProductStatusName = data.sysCodeName;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //썸네일 모달
    thumbnailModal1(data) {
      const file1 = this.file1;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file1, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //썸네일 모달
    thumbnailModal2(data) {
      const file2 = this.file2;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file2, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //사진을 모달에서 삭제시
    detailUpdate() {
      this.productDetail(this.advertisingProductSid);
    },
    //상세 정보
    async productDetail(id) {
      this.file = [];
      this.file1 = [];
      this.file2 = [];

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCT_DETAIL", id);

        const res = this.getProductDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const productInfo = res.advertisingProduct;
        this.advertisingProductSid = productInfo.advertisingProductSid;
        this.advertisingProductKind = productInfo.advertisingProductKind;
        this.advertisingProductKindName = productInfo.advertisingProductKindName;
        this.advertisingProductPriceOpenFlag = productInfo.advertisingProductPriceOpenFlag;
        this.advertisingProductPrice = productInfo.advertisingProductPrice;
        this.advertisingProductContentTitle = isEmpty(productInfo.advertisingProductContentTitle);
        this.advertisingProductContentKind = productInfo.advertisingProductContentKind;
        this.advertisingProductPriceUnit = productInfo.advertisingProductPriceUnit;
        this.advertisingProductPriceUnitName = productInfo.advertisingProductPriceUnitName;
        this.advertisingProductName = productInfo.advertisingProductName;
        this.advertisingProductOpenDevice = productInfo.advertisingProductOpenDevice;
        this.advertisingProductOpenDeviceName = productInfo.advertisingProductOpenDeviceName;
        this.advertisingProductStatus = productInfo.advertisingProductStatus;
        this.advertisingProductStatusName = productInfo.advertisingProductStatusName;
        this.advertisingProductCostPrice = productInfo.advertisingProductCostPrice;
        this.advertisingProductPriceRate = productInfo.advertisingProductPriceRate;
        this.advertisingProductSummary = productInfo.advertisingProductSummary;
        this.advertisingProductOptionSummary = productInfo.advertisingProductOptionSummary;
        this.advertisingProductContent = productInfo.advertisingProductContent;
        this.advertisingProductOptionSummary = isEmpty(productInfo.advertisingProductOptionSummary);

        this.advertisingProductMainFlag = productInfo.advertisingProductMainFlag;
        productInfo.productImageResult.forEach((row) => {
          if (row.fileSid !== "") {
            //pdf 업로드 가능시 보내야할 데이터
            this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
          }
        });
        this.file[0] === undefined ? (this.message = true) : (this.message = false);
        productInfo.productInfoImageMobile.forEach((row) => {
          if (row.fileSid !== "") {
            //pdf 업로드 가능시 보내야할 데이터
            this.file1.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
          }
        });
        if (this.file[0] === undefined) {
          this.message1 = true;
        } else {
          this.message1 = false;
        }
        productInfo.productInfoImageWeb.forEach((row) => {
          if (row.fileSid !== "") {
            //pdf 업로드 가능시 보내야할 데이터
            this.file2.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
          }
        });
        this.file[0] === undefined ? (this.message2 = true) : (this.message2 = false);

        this.showOptionBenefit = true;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.advertisingProductSid !== "") {
          this.alim("고유 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.advertisingProductKind === "") {
        this.alim("상품종류를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductMainFlag === "") {
        this.alim("메인상품 여부를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductPriceOpenFlag === "") {
        this.alim("가격노출 여부를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductCostPrice === "") {
        this.alim("원가를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductPriceRate === "") {
        this.alim("할인비율을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductPrice === "") {
        this.alim("상품가격을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductPriceUnit === "") {
        this.alim("상품가격 단위를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductName === "") {
        this.alim("상품명을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductOpenDevice === "") {
        this.alim("상품노출 디바이스를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductStatus === "") {
        this.alim("상품상태를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductSummary === "") {
        this.alim("상품개요를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCT_ADD", {
          advertisingProductKind: this.advertisingProductKind,
          advertisingProductName: this.advertisingProductName,
          advertisingProductSummary: this.advertisingProductSummary,
          advertisingProductOptionSummary: this.advertisingProductOptionSummary,
          advertisingProductContent: this.advertisingProductContent,
          advertisingProductPrice: this.advertisingProductPrice,
          advertisingProductCostPrice: this.advertisingProductCostPrice,
          advertisingProductPriceRate: this.advertisingProductPriceRate,
          advertisingProductContentTitle: this.advertisingProductContentTitle,
          advertisingProductContentKind: this.advertisingProductContentKind,
          advertisingProductPriceUnit: this.advertisingProductPriceUnit,
          advertisingProductPriceOpenFlag: this.advertisingProductPriceOpenFlag,
          advertisingProductOpenDevice: this.advertisingProductOpenDevice,
          advertisingProductStatus: this.advertisingProductStatus,
          channeltuneFiles: this.channeltuneFiles,
          channeltune1Files: this.channeltune1Files,
          channeltune2Files: this.channeltune2Files,
          advertisingProductMainFlag: this.advertisingProductMainFlag,
        });

        const res = this.productRegResult.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.deleteAllChip();
        this.alim("상품이 추가 되었습니다.", this.successColor);
        await this.reload(0);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCT_MODIFY", {
          advertisingProductSid: this.advertisingProductSid,
          advertisingProductKind: this.advertisingProductKind,
          advertisingProductName: this.advertisingProductName,
          advertisingProductSummary: this.advertisingProductSummary,
          advertisingProductContentTitle: this.advertisingProductContentTitle,
          advertisingProductContentKind: this.advertisingProductContentKind,
          advertisingProductOptionSummary: this.advertisingProductOptionSummary,
          advertisingProductContent: this.advertisingProductContent,
          advertisingProductPrice: this.advertisingProductPrice,
          advertisingProductCostPrice: this.advertisingProductCostPrice,
          advertisingProductPriceRate: this.advertisingProductPriceRate,
          advertisingProductPriceUnit: this.advertisingProductPriceUnit,
          advertisingProductPriceOpenFlag: this.advertisingProductPriceOpenFlag,
          advertisingProductOpenDevice: this.advertisingProductOpenDevice,
          advertisingProductStatus: this.advertisingProductStatus,
          channeltuneFiles: this.channeltuneFiles,
          channeltune1Files: this.channeltune1Files,
          channeltune2Files: this.channeltune2Files,
          advertisingProductMainFlag: this.advertisingProductMainFlag,
        });

        const res = this.productModifyResult.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        await this.reload();
        this.deleteAllChip();
        await this.productDetail(this.advertisingProductSid);
        this.alim("수정 되었습니다.", this.successColor);
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
      this.deleteAllChip();
      this.file = [];
      this.advertisingProductName = "";
      this.advertisingProductPrice = "";
      this.advertisingProductSid = "";
      this.advertisingProductKind = "";
      this.advertisingProductKindName = "";
      this.advertisingProductPriceOpenFlag = "";
      this.advertisingProductPriceUnit = "";
      this.advertisingProductPriceUnitName = "";
      this.advertisingProductOpenDevice = "";
      this.advertisingProductOpenDeviceName = "";
      this.advertisingProductCostPrice = "";
      this.advertisingProductPriceRate = "";
      this.advertisingProductStatus = "";
      this.advertisingProductStatusName = "";
      this.advertisingProductSummary = "";
      this.advertisingProductOptionSummary = "";
      this.advertisingProductContent = "";
      this.advertisingProductMainFlag = "";
      this.languagebtn = "";
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);

            const res = this.fileDeleteResult.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              bus.$emit("end:spinner");
              return false;
            }
            this.alim("삭제 되었습니다.", this.successColor);
            await this.productDetail(this.advertisingProductSid);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("product/PRODUCT_DEL", this.advertisingProductSid);
            const res = this.productDeleteResult.channeltuneApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            await this.reload(0);
            if (this.list.length < 1) {
              this.page = this.page - 1;
            }

            this.showOptionBenefit = false;
            this.alim("삭제 되었습니다.", this.successColor);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
    showOptionModal() {
      const obj = {
        advertisingProductSid: this.advertisingProductSid,
        advertisingProductName: this.advertisingProductName,
      };
      this.$modal.show(productOptionModal, obj, getPopupOpt("productOptionModal", "800px", "auto", false));
    },
    showLanguageSetModalPopup(id, name) {
      if (this.advertisingProductSid === "") {
        return this.alim("스토어를 선택해주세요", this.errorColor);
      }
      if (this.languagebtn === "") {
        return this.alim("설정할 언어셋을 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "advertisingProduct",
          tableSid: this.advertisingProductSid,
          fieldName: name,
          languageKindSysCode: "db",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false)
      );
    },
    showBenefitModal() {
      const obj = {
        advertisingProductSid: this.advertisingProductSid,
        advertisingProductName: this.advertisingProductName,
      };
      this.$modal.show(productBenefitModal, obj, getPopupOpt("productBenefitModal", "800px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 300px;
}
.date-width {
  width: 100px;
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.option-benefit-btn-group {
  float: right;
  & button {
    margin-left: 5px;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 60% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(40% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.search-input {
  height: 32px !important;
}
.with-btn {
  & .id {
    margin-right: 0 !important;
    width: calc(100% - 65.3px) !important;
  }
}
</style>
