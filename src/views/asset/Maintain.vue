<template>
  <section class="container">
    <section class="maintain-manage">
      <!-- left side -->
      <section class="maintain-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>스토어 튠 설치 유지관리</h2>
          </div>

          <div class="field">
            <table width="100%" class="tbl-reg tune-list">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="80" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>스토어</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" readonly v-model="companyStoreName" style="width: calc(100% - 250px); margin: 0 5px" />
                  <v-btn
                    small
                    color="primary"
                    @click="__showModalTemplate(require('@/components/modal/common/StoreList'), { update: updateStore }, 1200)"
                    style="margin-right: 5px"
                  >
                    검색</v-btn
                  >
                  <v-btn small color="success" @click="search">조회</v-btn>
                </td>
              </tr>
              <tr>
                <td>스토어유형</td>
                <td><input type="text" class="space-input" readonly v-model="companyStoreBusinessTypeName" /></td>
                <td>내부담당자</td>
                <td><input type="text" readonly v-model="companyStoreAgentName" /></td>
              </tr>
              <tr>
                <td>스토어국가</td>
                <td><input type="text" class="space-input" readonly v-model="companyNation" /></td>
                <td>스토어지역</td>
                <td><input type="text" readonly v-model="companyStoreZone" /></td>
              </tr>
              <tr>
                <td>스토어담당자</td>
                <td><input type="text" class="space-input" readonly v-model="companyStoreAgentUserName" /></td>
                <td>스토어연락처</td>
                <td><input type="text" readonly v-model="companyStoreAgentUserHp" /></td>
              </tr>
              <tr>
                <td>스토어주소</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreZipcode" />
                  <input type="text" class="input-last" readonly v-model="companyStoreFullAddress" />
                </td>
              </tr>
            </table>
          </div>

          <div>
            <table class="tbl mt20 select-tbl">
              <caption>
                유지관리 업체 리스트
              </caption>
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="80" />
                <col width="*" />
                <col width="100" />
                <col width="80" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>스토어</th>
                  <th>관리구분</th>
                  <th>관리업체</th>
                  <th>시작일시</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="getDetail(item.productMaintenanceSid)">
                  <td>{{ item.productMaintenanceSid }}</td>
                  <td>{{ item.companyStoreName }}</td>
                  <td>{{ item.productMaintenanceKindName }}</td>
                  <td>{{ item.companyName }}</td>
                  <td>{{ item.productMaintenanceStartDateTime }}</td>
                  <td>{{ item.productMaintenanceStatusName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="6">유지관리 내역이 없습니다</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
          </div>
        </div>
      </section>

      <!-- right side -->
      <section class="maintain-list-right init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>항목</h2>

            <div class="btn-group">
              <v-btn small color="primary" @click="validate('add')">등록</v-btn>
              <v-btn small color="warning" @click="validate('update')">수정</v-btn>
              <v-btn small color="error" @click="validate('delete')">삭제</v-btn>
              <v-btn small @click="clear">CLEAR</v-btn>
            </div>
          </div>

          <div class="field">
            <table width="100%" class="tbl-reg elem-table">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="90" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유코드</td>
                <td><input type="text" class="space-input" readonly v-model="productMaintenanceSid" /></td>
                <td>유지관리상태</td>
                <td>
                  <pull-down
                    :data="productMaintenanceStatus"
                    :code="'SYS21C23B012'"
                    @selected="newProductMaintenanceStatus"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>스토어</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyStoreSid" />
                  <input type="text" class="input-last" readonly v-model="companyStoreName" />
                </td>
              </tr>
              <tr>
                <td>유지관리구분</td>
                <td>
                  <pull-down :data="productMaintenanceKind" :code="'SYS21C23B011'" @selected="newProductMaintenanceKind" class="pull-down" />
                </td>
                <td v-show="productMaintenanceKind !== '' && productMaintenanceKindCode !== 'SYS21C23B015'">유지관리구분 상세</td>
                <td v-show="productMaintenanceKind !== '' && productMaintenanceKindCode !== 'SYS21C23B015'">
                  <pull-down
                    :data="productMaintenanceSubKind"
                    :code="productMaintenanceKindCode"
                    @selected="newProductMaintenanceSubKind"
                    class="pull-down"
                  />
                </td>
              </tr>
              <tr>
                <td>유지시작일시</td>
                <td>
                  <date-time-picker
                    :clear="clearStartDate"
                    :current="productMaintenanceStartDateTime"
                    @date="newProductMaintenanceStartDateTime"
                    class="date-time"
                  ></date-time-picker>
                </td>
                <td>유지종료일시</td>
                <td>
                  <date-time-picker
                    :clear="clearEndDate"
                    :current="productMaintenanceEndDateTime"
                    @date="newProductMaintenanceEndDateTime"
                    class="date-time"
                  ></date-time-picker>
                </td>
              </tr>
              <tr>
                <td>유지관리업체</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                  <v-btn
                    small
                    color="primary"
                    @click="__showModalTemplate(require('@/components/modal/common/CompanyList'), { update: updateCompany }, 800)"
                    >검색</v-btn
                  >
                </td>
              </tr>
              <tr>
                <td>업체담당자</td>
                <td colspan="3" class="field-div">
                  <input type="text" class="input-first" readonly v-model="companyPersonSid" />
                  <input type="text" class="input-last" readonly v-model="companyPersonName" />
                  <v-btn
                    small
                    color="primary"
                    @click="__showModalTemplate(require('@/components/modal/system/EmployeeList'), { update: updateEmployee }, 600)"
                    >검색</v-btn
                  >
                </td>
              </tr>
              <tr>
                <td>유지관리이미지</td>
                <td colspan="3">
                  <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                </td>
              </tr>
              <tr>
                <td></td>
                <td colspan="3">
                  <div class="file-list-div">
                    <ul v-if="fileList.length > 0" class="file-list">
                      <li v-for="(item, index) in fileList" :key="index">
                        <div class="elem">
                          <v-icon @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                          <div
                            @click="
                              __showModalTemplate(
                                require('@/components/modal/common/Thumbnail'),
                                {
                                  updateData: updateData,
                                  file: fileList,
                                  data: {
                                    id: item.url,
                                    fileExt: item.fileExt,
                                    name: item.name,
                                  },
                                },
                                1200
                              )
                            "
                          >
                            <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                          </div>
                        </div>
                      </li>
                      <!-- <div v-if="message === true">첨부된 파일이 없습니다.</div> -->
                    </ul>
                    <div v-else>첨부된 파일이 없습니다.</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>유지관리내용</td>
                <td colspan="3">
                  <textarea v-model="productMaintenanceEtc"></textarea>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="confirmDelete"></confirm>
  </section>
</template>

<script>
import loading from "@/mixins/loading";
import alim from "@/components/dialog/Alim";
import alimMixin from "@/mixins/alim";
import FileUpload from "@/components/form/FileUpload";
import fileUploadMixin from "@/mixins/fileUpload";
import confirm from "@/components/dialog/Confirm";
import deleteMixin from "@/mixins/delete";
import modalMixin from "@/mixins/showModal";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import { calculateDate } from "@/utils/yearSet";
import PullDown from "@/components/form/PullDown";
import DateTimePicker from "@/components/form/DateTimePicker";
import isEmpty from "@/utils/empty";
export default {
  components: { alim, FileUpload, confirm, PullDown, DateTimePicker },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin, modalMixin],
  data() {
    return {
      //게시물 설정
      page: 1,
      len: null,
      list: [],
      size: 7,

      channeltuneFiles: [],
      companyStoreSid: "",
      companyStoreName: "",

      // productInstallation
      companyStoreBusinessTypeName: "",
      companyStoreAgentName: "",
      companyNation: "",
      companyStoreZone: "",
      companyStoreAgentUserName: "",
      companyStoreAgentUserHp: "",
      companyStoreZipcode: "",
      companyStoreAddress1: "",
      companyStoreAddress2: "",

      // productMaintenance
      productMaintenanceSid: "",
      productMaintenanceStatus: "",
      productMaintenanceStatusName: "",
      productMaintenanceKind: "",
      productMaintenanceKindCode: "",
      productMaintenanceKindName: "",
      productMaintenanceStartDateTime: "",
      productMaintenanceSubKind: "",
      productMaintenanceSubKindName: "",
      productMaintenanceEndDateTime: "",
      companySid: "",
      companyName: "",
      companyPersonSid: "",
      companyPersonName: "",
      productMaintenanceEtc: "",
      fileList: [],

      clearStartDate: false,
      clearEndDate: false,
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("assetProduct", [
      "getProductInstallionStoreDetail",

      // productMaintenance
      "getProductMaintenanceList",
      "getProductMaintenanceDetail",
      "getProductMaintenanceAdd",
      "getProductMaintenanceUpdate",
      "getProductMaintenanceDelete",
    ]),
    ...mapGetters("common", ["fileDeleteResult"]),
    companyStoreFullAddress() {
      return `${this.companyStoreAddress1} ${this.companyStoreAddress2}`;
    },
  },
  watch: {
    page() {
      this.getList();
    },
    productMaintenanceKind(val) {
      if (val === "SYS21C23B015") {
        this.productMaintenanceSubKind = "";
        this.productMaintenanceSubKindName = "";
      }
    },
  },
  methods: {
    // 파라미터 확인
    validate(type) {
      if (type === "add") {
        if ((this.productMaintenanceSid || "") !== "") {
          this.alim("항목이 선택되어있으면 등록이 불가능합니다.", this.errorColor);
          return false;
        }
      }

      if (type === "add" || type === "update") {
        if ((this.companyStoreSid || "") === "") {
          this.alim("스토어를 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.productMaintenanceKind || "") === "") {
          this.alim("유지관리구분을 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.companySid || "") === "") {
          this.alim("업체를 선택하세요.", this.errorColor);
          return false;
        }
        if ((this.productMaintenanceStartDateTime || "") === "") {
          this.alim("시작일시를 선택하세요.", this.errorColor);
          return false;
        }
      }

      if (type === "update" || type === "delete") {
        if ((this.productMaintenanceSid || "") === "") {
          this.alim("항목을 선택하세요.", this.errorColor);
          return false;
        }
      }

      switch (type) {
        case "add":
          this.add();
          break;
        case "update":
          this.update();
          break;
        case "delete":
          this.confirm(1);
          break;
      }
    },

    // 기본(추가, 수정) 파라미터
    getBasicParams() {
      return {
        companyStoreSid: this.companyStoreSid,
        productMaintenanceKind: this.productMaintenanceKind,
        companySid: this.companySid,
        companyPersonSid: this.companyPersonSid,
        productMaintenanceStartDateTime: calculateDate(this.productMaintenanceStartDateTime, "-", 9),
        productMaintenanceEndDateTime: calculateDate(this.productMaintenanceEndDateTime, "-", 9),
        productMaintenanceStatus: this.productMaintenanceStatus,
        productMaintenanceEtc: this.productMaintenanceEtc,
        productMaintenanceSubKind: this.productMaintenanceSubKind,
        channeltuneFiles: this.channeltuneFiles,
      };
    },

    // 추가
    async add() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MAINTENANCE_ADD", this.getBasicParams());
        const res = this.getProductMaintenanceAdd.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim(res.errorMessage, this.successColor);
        this.clear();
        this.getList(1);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 수정
    async update() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MAINTENANCE_UPDATE", {
          productMaintenanceSid: this.productMaintenanceSid,
          ...this.getBasicParams(),
        });
        const res = this.getProductMaintenanceUpdate.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim(res.errorMessage, this.successColor);
        this.getList(1);
        this.getDetail(res.ProductMaintenance.productMaintenanceSid);
        this.deleteAllChip();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 삭제
    async delete() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MAINTENANCE_DELETE", this.productMaintenanceSid);
        const res = this.getProductMaintenanceDelete.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim(res.errorMessage, this.successColor);
        this.clear();
        this.getList(1);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 삭제확인
    async confirmDelete({ del, type }) {
      if (del === "Y") {
        if (type === "list") {
          this.delete();
        }

        if (type === "photo") {
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
            this.getDetail(this.productMaintenanceSid);
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }

      this.resetDeleteData();
    },

    // 유지관리 리스트
    async getList(num) {
      if (num) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MAINTENANCE_LIST", {
          page: this.page,
          size: this.size,
          companyStoreSid: this.companyStoreSid,
        });

        const res = this.getProductMaintenanceList.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.ProductMaintenance;
        this.list = data.data;
        this.len = data.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 상세
    async getDetail(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCT_MAINTENANCE_DETAIL", sid);
        const res = this.getProductMaintenanceDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const data = res.ProductMaintenance;

        this.productMaintenanceKindCode = isEmpty(data.productMaintenanceKind);
        this.productMaintenanceSid = data.productMaintenanceSid;
        this.productMaintenanceStatus = isEmpty(data.productMaintenanceStatus);
        this.productMaintenanceStatusName = isEmpty(data.productMaintenanceStatusName);
        this.productMaintenanceKind = isEmpty(data.productMaintenanceKind);
        this.productMaintenanceSubKind = isEmpty(data.productMaintenanceSubKind);
        this.productMaintenanceKindName = isEmpty(data.productMaintenanceKindName);
        this.productMaintenanceSubKindName = isEmpty(data.productMaintenanceSubKindName);
        this.productMaintenanceStartDateTime = calculateDate(data.productMaintenanceStartDateTime, "+", 9);
        this.productMaintenanceEndDateTime = calculateDate(data.productMaintenanceEndDateTime, "+", 9);
        this.companySid = isEmpty(data.companySid);
        this.companyName = isEmpty(data.companyName);
        this.companyPersonSid = isEmpty(data.companyPersonSid);
        this.companyPersonName = isEmpty(data.companyPersonName);
        this.productMaintenanceEtc = isEmpty(data.productMaintenanceEtc);
        this.fileList = data.ProductMaintenanceImageResult.map((row) => ({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName }));
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 설치제품 상세정보
    async getProductionInstallationStoreDetail(sid) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONINSTALLIONSTORE_DETAIL", sid);
        const res = this.getProductInstallionStoreDetail.channeltuneApiResult;
        if (parseInt(res.errorCode) !== 200) {
          bus.$emit("end:spinner");
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        const data = res.productInstallionStore;
        this.companyStoreBusinessTypeName = data.companyStoreBusinessTypeName;
        this.companyStoreAgentName = data.companyStoreAgentName;
        this.companyNation = data.companyNation;
        this.companyStoreZone = data.companyStoreZone;
        this.companyStoreAgentUserName = data.companyStoreAgentUserName;
        this.companyStoreAgentUserHp = data.companyStoreAgentUserHp;
        this.companyStoreZipcode = data.companyStoreZipcode;
        this.companyStoreAddress1 = data.companyStoreAddress1;
        this.companyStoreAddress2 = data.companyStoreAddress2;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // 조회
    search() {
      if ((this.companyStoreSid || "") === "") {
        this.alim("스토어를 선택하세요", this.errorColor);
        return;
      }

      this.getProductionInstallationStoreDetail(this.companyStoreSid);
      this.getList(1);
    },

    // clear
    clear() {
      this.productMaintenanceSid = "";
      this.productMaintenanceStatus = "";
      this.productMaintenanceStatusName = "";
      this.productMaintenanceKind = "";
      this.productMaintenanceKindName = "";
      this.productMaintenanceStartDateTime = "";
      this.productMaintenanceEndDateTime = "";
      this.companySid = "";
      this.companyName = "";
      this.companyPersonSid = "";
      this.companyPersonName = "";
      this.productMaintenanceEtc = "";
      this.productMaintenanceSubKind = "";
      this.productMaintenanceSubKindName = "";
      this.productMaintenanceKindCode = "";
      this.fileList = "";
      this.clearStartDate = !this.clearStartDate;
      this.clearEndDate = !this.clearEndDate;
      this.deleteAllChip();
    },

    // datepickertime
    newProductMaintenanceStartDateTime(data) {
      this.productMaintenanceStartDateTime = data;
    },
    newProductMaintenanceEndDateTime(data) {
      this.productMaintenanceEndDateTime = data;
    },

    // pulldown
    newProductMaintenanceKind({ sysCodeSid, sysCodeName }) {
      this.productMaintenanceKind = sysCodeSid;
      this.productMaintenanceKindCode = sysCodeSid;
      this.productMaintenanceKindName = sysCodeName;
    },
    newProductMaintenanceSubKind({ sysCodeSid, sysCodeName }) {
      this.productMaintenanceSubKindName = sysCodeName;
      this.productMaintenanceSubKind = sysCodeSid;
    },
    newProductMaintenanceStatus({ sysCodeSid, sysCodeName }) {
      this.productMaintenanceStatus = sysCodeSid;
      this.productMaintenanceStatusName = sysCodeName;
    },

    // modal result
    updateData(deleteList) {
      this.fileList = this.fileList.filter((i) => !deleteList.includes(i.url));
    },
    updateStore({ id, name }) {
      this.companyStoreSid = id;
      this.companyStoreName = name;

      this.getProductionInstallationStoreDetail(this.companyStoreSid);
      this.getList(1);
    },
    updateCompany({ companySid, companyName }) {
      this.companySid = companySid;
      this.companyName = companyName;
    },
    updateEmployee({ interbridEmployeeSid, interbridEmployeeKorName }) {
      this.companyPersonSid = interbridEmployeeSid;
      this.companyPersonName = interbridEmployeeKorName;
    },
  },
};
</script>

<style lang="scss" scoped>
.maintain-manage {
  display: flex;
  justify-content: space-between;
  height: 80vh;
  width: 100%;

  & input.space-input {
    width: calc(100% - 5px) !important;
  }

  & .maintain-list {
    width: 700px;
  }

  & .maintain-list-right {
    width: calc(100% - 710px);
    & .field {
      & .elem-table {
        & .file-list-div {
          & .file-list {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            & .elem {
              position: relative;
              margin: 2px;
              & button {
                position: absolute;
                top: 3px;
                right: 3px;
              }

              & img {
                width: 70px !important;
                height: 70px !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
