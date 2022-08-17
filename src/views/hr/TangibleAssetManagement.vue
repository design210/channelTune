<template>
  <section class="container">
    <div class="title-wrap">
      <h1>유형 자산 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>유형 자산 리스트</h2>

            <div class="d-flex search">
              <div class="status mr10">
                <span class="ml15 mr5">조회구분</span>
                <v-select :items="items" v-model="searchKey" item-text="value" item-value="key" outlined class="select-basic w120" />
              </div>
              <div class="d-flex mr10" v-if="searchKey === 'tangibleAssetsPrice'">
                <input type="text" placeholder="가격 범위" class="w80" v-model="startPrice" />
                <span class="ml5 mr5">~</span>
                <input type="text" placeholder="가격 범위" class="w80" v-model="endPrice" />
              </div>
              <input
                v-else
                type="text"
                placeholder="품명, 제조사, 구입처"
                v-model="searchText"
                @keyup.enter="getTangibleList(1)"
                class="search-input input-size"
              />
              <v-btn small color="primary" @click="getTangibleList(1)" class="btn-search">조회</v-btn>
              <v-btn small @click="leftClear" class="btn-search">CLEAR</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              유형자산 목록 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="120" />
              <col width="*" />
              <col width="*" />
              <col width="80" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>자산번호</th>
                <th class="left">품명</th>
                <th>취득일</th>
                <th class="left">구입처</th>
                <th class="right pr10">가격</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in list"
                :key="index"
                @click="detailInfo(item.tangibleAssetsSid)"
                :class="tangibleAssetsSid === item.tangibleAssetsSid ? 'act' : ''"
              >
                <td>{{ item.tangibleAssetsSid }}</td>
                <td class="left">{{ item.tangibleAssetsName }}</td>
                <td>{{ item.acquisitionDate }}</td>
                <td class="left">{{ item.tangibleAssetsBuyCompany }}</td>
                <td class="right">{{ item.tangibleAssetsPrice | comma }}</td>
                <td>{{ item.tangibleAssetsTransKindName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">자산 리스트가 없습니다.</td>
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
              <v-btn class="mr5" dark small color="cyan" @click="showLabelDownLoad">라벨 출력</v-btn>
              <v-btn class="mr5" small color="success" @click="showTangibleModalPopup">제품 처리</v-btn>
              <v-btn class="mr20" small @click="customConfirm('ad')">복사</v-btn>
              <v-btn small color="primary" @click="validate('add')">등록</v-btn>
              <v-btn small color="warning" @click="validate('update')">수정</v-btn>
              <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
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
                <td>자산번호</td>
                <td><input type="text" readonly v-model="tangibleAssetsSid" /></td>
                <td>시리얼 번호</td>
                <td><input type="text" v-model="tangibleAssetsSerialNo" /></td>
              </tr>
              <tr>
                <td class="required">품명</td>
                <td><input type="text" v-model="tangibleAssetsName" /></td>
                <td>모델명</td>
                <td><input type="text" v-model="tangibleAssetsModelName" /></td>
              </tr>
              <tr>
                <td>제조사</td>
                <td><input type="text" v-model="tangibleAssetsCompany" /></td>
                <td>제조일</td>
                <td><date-picker :propdate="tangibleAssetsDate" @updateDate="tangibleMakeDateProp"></date-picker></td>
              </tr>
              <tr>
                <td>구입처</td>
                <td><input type="text" v-model="tangibleAssetsBuyCompany" /></td>
                <td>구입 가격</td>
                <td><input type="text" v-model="tangibleAssetsPrice" /></td>
              </tr>
              <tr>
                <td>내용연수</td>
                <td colspan="3"><input type="text" v-model="tangibleAssetsYear" /></td>
              </tr>
              <tr>
                <td>비고</td>
                <td colspan="3"><textarea type="text" v-model="tangibleAssetsEtc" /></td>
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
              <tr>
                <td colspan="4"><div class="tbl-div-line mb10"></div></td>
              </tr>
              <tr>
                <td>날짜</td>
                <td class="pr20"><input type="text" v-model="tangibleAssetsTransDate" readonly /></td>
              </tr>
              <tr>
                <td>담당자 (정)</td>
                <td><input type="text" v-model="tangibleAssetsTransMaster" readonly /></td>
                <td>담당자 (부)</td>
                <td><input type="text" v-model="tangibleAssetsTransSlave" readonly /></td>
              </tr>
              <tr>
                <td>상태</td>
                <td><input type="text" v-model="tangibleAssetsTransKindName" readonly /></td>
                <td>위치</td>
                <td><input type="text" v-model="tangibleAssetsTransLocation" readonly /></td>
              </tr>
            </table>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm
            :type="type"
            :open="dialog"
            :txt="dialogText"
            :h1="dialogTitle"
            @resetConfirm="emitResetConfirm"
            :kind="dialogKind"
            :deleteText="deleteText"
          ></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import loading from "@/mixins/loading";
import TangibleAssetsModal from "@/components/modal/hr/TangibleAssetsModal";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import VuePdfModal from "@/components/modal/common/PdfViewer";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
import { getAccessTokenCookie } from "@/utils/cookie";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
export default {
  components: { alim, confirm, FileUpload, DatePicker },
  filters: {
    comma(val) {
      if (val === null) {
        return isEmpty(val);
      }
      const parts = val.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      searchText: "",
      list: [],
      len: null,
      page: 1,
      channeltuneFiles: [],
      file: [],
      message: true,
      tangibleAssetsSid: "",
      tangibleAssetsName: "",
      tangibleAssetsSerialNo: "",
      tangibleAssetsYear: "",
      tangibleAssetsCompany: "",
      tangibleAssetsModelName: "",
      tangibleAssetsDate: "",
      tangibleAssetsEtc: "",
      tangibleAssetsBuyCompany: "",
      tangibleAssetsPrice: "",
      tangibleAssetsTransMaster: "",
      tangibleAssetsTransSlave: "",
      tangibleAssetsTransKindName: "",
      tangibleAssetsTransLocation: "",
      tangibleAssetsTransDate: "",
      startPrice: "",
      endPrice: "",
      joinKind: "",
      searchKey: "",
      url: process.env.VUE_APP_API,
      pdfSelection: null,

      confirmTitle: "유형 자산 복사 등록",
      confirmText: "해당 유형 자산을 복사하여 새로 등록 하시겠습니까?",
      deleteText: "확인",
      employee: [],
      items: [
        { key: "tangibleAssetsSid", value: "고유코드" },
        { key: "tangibleAssetsSerialNo", value: "시리얼 번호" },
        { key: "tangibleAssetsCompany", value: "제조사" },
        { key: "tangibleAssetsName", value: "품명" },
        { key: "tangibleAssetsModelName", value: "모델명" },
        { key: "tangibleAssetsYear", value: "내용연수" },
        { key: "tangibleAssetsEtc", value: "기타" },
        { key: "tangibleAssetsTransLocation", value: "위치" },
        { key: "tangibleAssetsBuyCompany", value: "구입처" },
        { key: "tangibleAssetsPrice", value: "가격" },
        { key: "tangibleAssetsDate", value: "제조일" },
        { key: "tangibleAssetsTransMasterSid", value: "담당자(정)" },
        { key: "tangibleAssetsTransSlaveSid", value: "담당자(부)" },
      ],
    };
  },
  computed: {
    ...mapGetters("tangibleAssets", [
      "getTangibleAssetsList",
      "addTangibleAsset",
      "modifyTangibleAsset",
      "deleteTangibleAsset",
      "getTangibleDetail",
      "downLoadLabelOnlyOne",
    ]),
    ...mapGetters("common", ["fileDeleteResult"]),
    ...mapGetters("interbridEmployee", ["getEmployeeList"]),
  },
  watch: {
    page() {
      this.getTangibleList(0);
    },
    size() {
      this.getTangibleList(0);
    },
  },
  async mounted() {
    if (Object.keys(this.$route.params).length !== 0) {
      this.searchText = this.$route.params.tangibleAssets.tangibleAssetsSid;
      this.pdfSelection = this.$route.params.tangibleAssets.tangibleAssetsSid;
      this.searchKey = "tangibleAssetsSid";
      await this.getTangibleList();
      await this.detailInfo(this.$route.params.tangibleAssets.tangibleAssetsSid);
    } else {
      this.getTangibleList();
    }
  },
  methods: {
    tangibleMakeDateProp(date) {
      this.tangibleAssetsDate = date;
    },

    //유형자산 목록조회
    async getTangibleList(num) {
      let employeeSysCode = "";
      if (num === 0) {
        this.clear();
      }
      if (num === 1) {
        this.page = 1;
      }

      if (this.searchKey === "tangibleAssetsPrice") {
        this.searchText = this.startPrice + "," + this.endPrice;
      }
      if (this.searchKey === "tangibleAssetsTransMasterSid" || this.searchKey === "tangibleAssetsTransSlaveSid") {
        const arr = await this.EmployeeList();
        const sysCode = arr.filter((item) => item.interbridEmployeeKorName === this.searchText);

        employeeSysCode = sysCode[0]?.interbridEmployeeSid;
      }
      try {
        const obj = {};

        obj[this.searchKey] =
          (this.searchKey === "tangibleAssetsTransMasterSid" || this.searchKey === "tangibleAssetsTransSlaveSid") && employeeSysCode !== undefined
            ? employeeSysCode
            : this.searchText;
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/GET_TANGIBLE_ASSETS_LIST", {
          page: this.page,
          size: this.size,
          searchCondition: obj,
          joinKind: this.joinKind,
        });
        const res = this.getTangibleAssetsList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.list = res.tangibleAssets.data;
        this.len = res.tangibleAssets.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //유형자산 상세조회
    async detailInfo(id) {
      this.file = [];
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/DETAIL_TANGIBLE_ASSETS", {
          id: id,
          joinKind: this.joinKind,
        });
        const res = this.getTangibleDetail.channeltuneApiResult;

        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        const data = res.tangibleAssets;
        this.tangibleAssetsSid = data.tangibleAssetsSid;
        this.tangibleAssetsName = isEmpty(data.tangibleAssetsName);
        this.tangibleAssetsYear = isEmpty(data.tangibleAssetsYear);
        this.tangibleAssetsSerialNo = isEmpty(data.tangibleAssetsSerialNo);
        this.tangibleAssetsCompany = isEmpty(data.tangibleAssetsCompany);
        this.tangibleAssetsModelName = isEmpty(data.tangibleAssetsModelName);
        this.tangibleAssetsDate = isEmpty(data.tangibleAssetsDate);
        this.tangibleAssetsEtc = isEmpty(data.tangibleAssetsEtc);
        this.tangibleAssetsBuyCompany = isEmpty(data.tangibleAssetsBuyCompany);
        this.tangibleAssetsPrice = data.tangibleAssetsPrice;
        this.tangibleAssetsTransMaster = data.tangibleAssetsTransMasterSidName;
        this.tangibleAssetsTransSlave = data.tangibleAssetsTransSlaveSidName;
        this.tangibleAssetsTransKindName = data.tangibleAssetsTransKindName;
        this.tangibleAssetsTransLocation = data.tangibleAssetsTransLocation;
        this.tangibleAssetsTransDate = data.tangibleAssetsTransDate;
        this.pdfSelection = data.tangibleAssetsSid;

        data.files.forEach((row) => {
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
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록
    async addTangible() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/ADD_TANGIBLE_ASSET", {
          tangibleAssetsName: this.tangibleAssetsName,
          tangibleAssetsSerialNo: this.tangibleAssetsSerialNo,
          tangibleAssetsCompany: this.tangibleAssetsCompany,
          tangibleAssetsModelName: this.tangibleAssetsModelName,
          tangibleAssetsDate: this.tangibleAssetsDate,
          tangibleAssetsEtc: this.tangibleAssetsEtc,
          tangibleAssetsYear: this.tangibleAssetsYear,
          tangibleAssetsBuyCompany: this.tangibleAssetsBuyCompany,
          tangibleAssetsPrice: this.tangibleAssetsPrice,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.addTangibleAsset.channeltuneApiResult;
        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        await this.getTangibleList();
        this.detailInfo(this.list[0].tangibleAssetsSid);
        this.alim(res.errorMessage, this.successColor);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modifyTangible() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("tangibleAssets/MODIFY_TANGIBLE_ASSET", {
          id: this.tangibleAssetsSid,
          tangibleAssetsName: this.tangibleAssetsName,
          tangibleAssetsSerialNo: this.tangibleAssetsSerialNo,
          tangibleAssetsCompany: this.tangibleAssetsCompany,
          tangibleAssetsModelName: this.tangibleAssetsModelName,
          tangibleAssetsDate: this.tangibleAssetsDate,
          tangibleAssetsYear: this.tangibleAssetsYear,
          tangibleAssetsEtc: this.tangibleAssetsEtc,
          tangibleAssetsBuyCompany: this.tangibleAssetsBuyCompany,
          tangibleAssetsPrice: this.tangibleAssetsPrice,
          channeltuneFiles: this.channeltuneFiles,
        });
        const res = this.modifyTangibleAsset.channeltuneApiResult;

        if (res.errorCode !== 200) {
          return this.alim(res.errorMessage, this.errorColor);
        }
        this.alim(res.errorMessage, this.successColor);
        this.deleteAllChip();
        this.getTangibleList();
        this.detailInfo(this.tangibleAssetsSid);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    validate(val) {
      if (val === "add") {
        if (this.tangibleAssetsSid !== null && this.tangibleAssetsSid !== "") {
          return this.alim("자산 번호가 있다면 등록 하실 수 없습니다!", this.errorColor);
        }
        if (this.tangibleAssetsName === null || this.tangibleAssetsName === "") {
          return this.alim("품명을 입력해주세요", this.errorColor);
        }
        this.addTangible();
      } else if (val === "update") {
        if (this.tangibleAssetsSid === null || this.tangibleAssetsSid === "") {
          return this.alim("유형 자산을 선택해주세요.", this.errorColor);
        }
        if (this.tangibleAssetsName === null || this.tangibleAssetsName === "") {
          return this.alim("품명을 입력해주세요", this.errorColor);
        }
        this.modifyTangible();
      } else if (val === "delete") {
        if (this.tangibleAssetsSid === null || this.tangibleAssetsSid === "") {
          return this.alim("유형 자산을 선택해주세요.", this.errorColor);
        }
        this.confirm();
      }
    },
    //삭제
    async emitResetConfirm({ del, type, kind }) {
      if (del === "Y") {
        if (kind === "ad") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("tangibleAssets/ADD_TANGIBLE_ASSET", {
              tangibleAssetsName: this.tangibleAssetsName,
              tangibleAssetsSerialNo: this.tangibleAssetsSerialNo,
              tangibleAssetsCompany: this.tangibleAssetsCompany,
              tangibleAssetsModelName: this.tangibleAssetsModelName,
              tangibleAssetsDate: this.tangibleAssetsDate,
              tangibleAssetsEtc: this.tangibleAssetsEtc,
              tangibleAssetsYear: this.tangibleAssetsYear,
              tangibleAssetsBuyCompany: this.tangibleAssetsBuyCompany,
              tangibleAssetsPrice: this.tangibleAssetsPrice,
              channeltuneFiles: this.channeltuneFiles,
            });
            const res = this.addTangibleAsset.channeltuneApiResult;
            if (res.errorCode !== 200) {
              return this.alim(res.errorMessage, this.errorColor);
            }
            this.alim(res.errorMessage, this.successColor);
            this.list.unshift(res.tangibleAssets);
            this.searchText = res.tangibleAssets.tangibleAssetsSid;
            await this.detailInfo(res.tangibleAssets.tangibleAssetsSid);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        } else {
          if (type === "photo") {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("common/FILE_DELETE", this.delId);

              const res = this.fileDeleteResult.channeltuneApiResult;
              if (Number(res.errorCode) !== 200) {
                this.alim(res.errorMessage, this.errorColor);
                bus.$emit("end:spinner");
                return false;
              }

              await this.detailInfo(this.tangibleAssetsSid);
              this.alim("삭제 되었습니다.", this.successColor);
            } catch (error) {
              this.alim(error, this.errorColor);
            } finally {
              bus.$emit("end:spinner");
            }
          }
          if (type === "list") {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("tangibleAssets/DELETE_TANGIBLE_ASSET", this.tangibleAssetsSid);
              const res = this.deleteTangibleAsset.channeltuneApiResult;
              if (res.errorCode !== 200) {
                return this.alim(res.errorMessage, this.errorColor);
              }
              this.alim(res.errorMessage, this.successColor);
              await this.getTangibleList();
              this.clear();
            } catch (error) {
              this.alim(error, this.errorColor);
            } finally {
              bus.$emit("end:spinner");
            }
          }
        }
      }
      this.resetDeleteData();
    },
    async EmployeeList() {
      //검색할경우 페이징 초기화

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_LIST", {
          lastWorkFlag: "Y",
        });
        if (this.getEmployeeList.channeltuneApiResult.errorCode == 200) {
          const userList = this.getEmployeeList.channeltuneApiResult.interbridEmployee;
          return userList;
        } else {
          this.alim(this.getEmployeeList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    showTangibleModalPopup() {
      if (this.tangibleAssetsSid === "" || this.tangibleAssetsSid === null) {
        return this.alim("유형 자산을 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        TangibleAssetsModal,
        { tangibleAssetsSid: this.tangibleAssetsSid, tangibleAssetsName: this.tangibleAssetsName, update: this.update },
        getPopupOpt("TangibleAssetsModal", "900px", "700px", false)
      );
    },
    update() {
      this.getTangibleList();
      this.detailInfo(this.tangibleAssetsSid);
    },
    thumbnailModal(data) {
      const file = this.file;
      this.$modal.show(thumbnailModal, { updateData: this.detailUpdate, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    detailUpdate() {
      this.detailInfo(this.tangibleAssetsSid);
    },
    clear() {
      this.deleteAllChip();
      this.tangibleAssetsSid = "";
      this.tangibleAssetsName = "";
      this.tangibleAssetsSerialNo = "";
      this.tangibleAssetsCompany = "";
      this.tangibleAssetsModelName = "";
      this.tangibleAssetsYear = "";
      this.tangibleAssetsDate = "";
      this.tangibleAssetsEtc = "";
      this.tangibleAssetsBuyCompany = "";
      this.tangibleAssetsPrice = "";
      this.tangibleAssetsTransMaster = "";
      this.tangibleAssetsTransSlave = "";
      this.tangibleAssetsTransKindName = "";
      this.tangibleAssetsTransLocation = "";
      this.tangibleAssetsTransDate = "";
      this.channeltuneFiles = [];
      this.file = [];
      this.message = true;
    },
    leftClear() {
      this.searchText = "";
      this.searchKey = "";
      this.getTangibleList(0);
    },
    async showLabelDownLoad() {
      try {
        bus.$emit("start:spinner");
        const accessCookie = getAccessTokenCookie();
        const response = await axios({
          method: "get",
          url: `${process.env.VUE_APP_API}/tangibleAssets/pdfLabelShow/${this.pdfSelection}?joinKind=${this.joinKind}`,
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + accessCookie,
          },
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        this.pdfsrc = objectUrl;
        this.$modal.show(VuePdfModal, { pdfUrl: objectUrl }, getPopupOpt("VuePdfModal", "700px", "auto", false));
      } catch (e) {
        console.error(e);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  white-space: nowrap;
  align-items: center;

  span {
    margin-left: 5px;
  }
}
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
.act {
  background: #c8cdda;
}
</style>
