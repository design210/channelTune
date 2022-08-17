<template>
  <section class="container">
    <div class="title-wrap">
      <h1>제품 등록</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>제품 리스트</h2>
            <div class="search">
              <input type="text" placeholder="제품명을 입력하세요" v-model="searchText" class="search-input input-size" @keyup.enter="reload(1)" />
              <v-btn small color="primary" @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              제품 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="120" />
              <col width="*" />
              <col width="80" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th class="left">제품구분</th>
                <th class="left">제품명</th>
                <th>제품버전</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="productDetail(item.productSid)">
                <td>{{ item.productSid }}</td>
                <td class="left">{{ item.productKindName }}</td>
                <td class="left">{{ item.productName }}</td>
                <td>{{ item.productVersion }}</td>
                <td>{{ item.productStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">제품 리스트가 없습니다.</td>
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
            <h2>항목</h2>
            <div class="btn-group">
              <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
              <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
              <v-btn small color="error" @click="confirm(productSid)">삭제</v-btn>
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
              <tr>
                <td>제품 고유코드</td>
                <td><input type="text" readonly v-model="productSid" /></td>
                <td class="required">상태</td>
                <td>
                  <pull-down :data="productStatus" :code="statusCode" @selected="productStatusNameProp" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">제품명</td>
                <td colspan="3"><input type="text" v-model="productName" /></td>
              </tr>
              <tr>
                <td>제품 모델명</td>
                <td colspan="3"><input type="text" v-model="productModelName" /></td>
              </tr>
              <tr>
                <td class="required">제품 종류</td>
                <td><pull-down :data="productKind" :code="kindCode" @selected="productKindNameProp" class="pull-down"></pull-down></td>
                <td class="required">제품 단위</td>
                <td>
                  <pull-down :data="productUnit" :code="unitCode" @selected="productUnitNameProp" class="pull-down"></pull-down>
                </td>
              </tr>
              <tr>
                <td>제품 규격(정격전압)</td>
                <td><input type="text" v-model="productStandardVoltage" /></td>
                <td>제품등록번호</td>
                <td><input type="text" v-model="productRegistrationNumber" /></td>
              </tr>
              <tr>
                <td>제품 규격</td>
                <td><input type="text" v-model="productStandardDoc" /></td>
                <td class="required">제품 버전</td>
                <td><input type="text" v-model="productVersion" /></td>
              </tr>
              <tr>
                <td>제품 상세 설명</td>
                <td colspan="3"><textarea v-model="productDescription"></textarea></td>
              </tr>
              <tr>
                <td>등록일시</td>
                <td><input type="text" readonly v-model="created_at" /></td>
                <td>수정일시</td>
                <td><input type="text" readonly v-model="updated_at" /></td>
              </tr>
              <tr>
                <td>파일 첨부</td>
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
                            :src="`${url}/file/fileView/${item.url}?size=80`"
                            @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
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
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import PullDown from "@/components/form/PullDown.vue";
import isEmpty from "@/utils/empty";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
export default {
  components: { alim, confirm, PullDown, FileUpload },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //디테일 데이터
      productSid: "",
      productKind: "",
      productKindName: "",
      productName: "",
      productModelName: "",
      productStatus: "",
      productStatusName: "",
      productUnit: "",
      productUnitName: "",
      productStandardVoltage: "",
      productRegistrationNumber: "",
      productStandardDoc: "",
      productVersion: "",
      productDescription: "",
      created_at: "",
      updated_at: "",
      message: true,
      channeltuneFiles: [],
      file: [],
      codeReload: true,
      storeContractList: [],
      //파일 삭제 아이디
      delId: "",
      statusCode: "SYS21910B008",
      kindCode: "SYS21910B003",
      unitCode: "SYS21B09B004",
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("assetProduct", ["getProductList", "getProductDetail", "productAdd", "productModify", "productDelete"]),
    ...mapGetters("common", ["fileDeleteResult"]),
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
        await this.$store.dispatch("assetProduct/PRODUCT_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getProductList.channeltuneApiResult.errorCode == 200) {
          const productList = this.getProductList.channeltuneApiResult.product;
          this.list = productList.data;
          this.len = productList.last_page;
        } else {
          this.alim(this.getProductList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async productDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_DETAIL", id);
        if (this.getProductDetail.channeltuneApiResult.errorCode == 200) {
          const prodectDetail = this.getProductDetail.channeltuneApiResult.product;
          this.productSid = prodectDetail.productSid;
          this.productKind = prodectDetail.productKind;
          this.productName = prodectDetail.productName;
          this.productModelName = isEmpty(prodectDetail.productModelName);
          this.productStandardVoltage = isEmpty(prodectDetail.productStandardVoltage);
          this.productStandardDoc = isEmpty(prodectDetail.productStandardDoc);
          this.productRegistrationNumber = isEmpty(prodectDetail.productRegistrationNumber);
          this.productVersion = prodectDetail.productVersion;
          this.productStatus = prodectDetail.productStatus;
          this.productUnit = prodectDetail.productUnit;
          this.created_at = prodectDetail.created_at;
          this.updated_at = prodectDetail.updated_at;
          this.productKindName = prodectDetail.productKindName;
          this.productStatusName = prodectDetail.productStatusName;
          this.productUnitName = prodectDetail.productUnitName;
          this.productDescription = isEmpty(prodectDetail.productDescription);
          this.file = [];
          prodectDetail.fileResult.forEach(row => {
            if (row.fileSid !== "") {
              //pdf 업로드 가능시 보내야할 데이터
              this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
          });
          if (this.file[0] === undefined) {
            this.message = true;
          } else {
            this.message = false;
          }
          this.deleteAllChip();
        } else {
          this.alim(this.getProductDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    productStatusNameProp(data) {
      this.productStatus = data.sysCodeSid;
      this.productStatusName = data.sysCodeName;
    },
    productKindNameProp(data) {
      this.productKind = data.sysCodeSid;
      this.productKindName = data.sysCodeName;
    },
    productUnitNameProp(data) {
      this.productUnit = data.sysCodeSid;
      this.productUnitName = data.sysCodeName;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.reload, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    //validate
    validate(status) {
      if (status == "reg") {
        if (this.productSid !== "") {
          this.alim("고유코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.productStatus == "" || this.productStatus == null) {
        this.alim("상태를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.productName == "" || this.productName == null) {
        this.alim("제품명을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.productKind == "" || this.productKind == null) {
        this.alim("제품 종류를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.productUnit == "" || this.productUnit == null) {
        this.alim("제품단위를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.productVersion == "" || this.productVersion == null) {
        this.alim("제품버전을 입력해주세요.", this.errorColor);
        return false;
      }
      if (status == "reg") {
        this.reg();
      }
      if (status == "modify") {
        this.modify();
      }
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_ADD", {
          productKind: this.productKind,
          productName: this.productName,
          productModelName: this.productModelName,
          productStandardVoltage: this.productStandardVoltage,
          productStandardDoc: this.productStandardDoc,
          productRegistrationNumber: this.productRegistrationNumber,
          productVersion: this.productVersion,
          productStatus: this.productStatus,
          productUnit: this.productUnit,
          productDescription: this.productDescription,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.productAdd.channeltuneApiResult;
        if (res.errorCode === 200) {
          this.deleteAllChip();
          this.alim(res.errorMessage, this.successColor);
          this.reload(0);
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      if (this.productSid == "") {
        this.alim("상품을 선택해 주세요.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MODIFY", {
          productSid: this.productSid,
          productKind: this.productKind,
          productName: this.productName,
          productModelName: this.productModelName,
          productStandardVoltage: this.productStandardVoltage,
          productStandardDoc: this.productStandardDoc,
          productRegistrationNumber: this.productRegistrationNumber,
          productVersion: this.productVersion,
          productStatus: this.productStatus,
          productUnit: this.productUnit,
          productDescription: this.productDescription,
          channeltuneFiles: this.channeltuneFiles,
        });
        if (this.productModify.channeltuneApiResult.errorCode == 200) {
          this.deleteAllChip();
          this.productDetail(this.productSid);
          this.reload();
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.productModify.channeltuneApiResult.errorMessage, this.errorColor);
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
            await this.$store.dispatch("assetProduct/PRODUCT_DEL", this.productSid);
            if (this.productDelete.channeltuneApiResult.errorCode == 200) {
              this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.file = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.productDelete.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
        if (data.type === "file") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            if (this.fileDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              this.productDetail(this.productSid);
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
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.productSid = "";
      this.productKind = "";
      this.productKindName = "";
      this.productName = "";
      this.productModelName = "";
      this.productStatus = "";
      this.productStatusName = "";
      this.productUnit = "";
      this.productUnitName = "";
      this.productStandardVoltage = "";
      this.productRegistrationNumber = "";
      this.productStandardDoc = "";
      this.productVersion = "";
      this.productDescription = "";
      this.created_at = "";
      this.updated_at = "";
      this.deleteAllChip();
    },
  },
};
</script>

<style lang="scss" scoped>
.event-link {
  & > div {
    height: 25px;
  }
  & span {
    white-space: nowrap;
    margin-right: 5px;
  }
  & button {
    margin-left: 5px;
  }
}
.download-wrap {
  width: 100%;
  margin-left: 40px;
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
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 800px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 810px);
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
