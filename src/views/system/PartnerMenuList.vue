<template>
  <section class="container">
    <div class="title-wrap">
      <h1>파트너사 페이지 메뉴 관리</h1>
    </div>
    <div class="search-wrap">
      <div>
        <input type="text" placeholder="업체명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload" />
        <v-btn small color="primary" dark @click="reload()" class="btn-search">조회</v-btn>
      </div>
      <div class="btn-group outside">
        <v-btn small color="success" dark @click="allRegModal()" class="mr10">등록및 일괄처리</v-btn>
        <v-btn small color="error" dark @click="confirm(companyId)">선택 업체 권한 삭제</v-btn>
      </div>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <table class="tbl user-list-tbl select-tbl">
            <caption>
              리스트 테이블
            </caption>
            <thead>
              <tr>
                <th>업체고유코드</th>
                <th>업체명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in companyList" :key="index" @click="companyDetail(item.sid)">
                <td>{{ item.sid }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
            <tfoot v-if="companyList.length < 1">
              <tr>
                <td colspan="2">업체 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <table class="tbl user-list-tbl">
            <caption>
              리스트 테이블
            </caption>
            <colgroup>
              <col width="10%" />
              <col width="42%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
              <col width="12%" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>메뉴명</th>
                <th>보기(View) 권한</th>
                <th>등록(Write)권한</th>
                <th>수정(Rewrite)권한</th>
                <th>삭제(Delete)권한</th>
              </tr>
            </thead>
          </table>
          <div v-for="(item, index) in menuDataList" :key="index" class="menu-control-group">
            <span>{{ item.sysCodeSid }}</span>
            <span class="align-left">{{ item.sysCodeName }}</span>
            <span class="checkbox"
              ><v-checkbox v-model="depths1FlagChecked" @change="depthsFlag(item.sysCodeSid, 'YV' + index, 1)" :value="'YV' + index"></v-checkbox
            ></span>
            <span class="checkbox"
              ><v-checkbox v-model="depths1FlagChecked" @change="depthsFlag(item.sysCodeSid, 'YW' + index, 1)" :value="'YW' + index"></v-checkbox
            ></span>
            <span class="checkbox"
              ><v-checkbox v-model="depths1FlagChecked" @change="depthsFlag(item.sysCodeSid, 'YR' + index, 1)" :value="'YR' + index"></v-checkbox
            ></span>
            <span class="checkbox"
              ><v-checkbox v-model="depths1FlagChecked" @change="depthsFlag(item.sysCodeSid, 'YD' + index, 1)" :value="'YD' + index"></v-checkbox
            ></span>
            <div v-if="item.submenu !== undefined">
              <div v-for="(item, index1) in item.submenu" :key="index1">
                <span>{{ item.sysCodeSid }}</span>
                <span class="align-left depths2"><v-icon>mdi-arrow-right-bottom</v-icon>{{ item.sysCodeName }}</span>
                <span class="checkbox"
                  ><v-checkbox
                    v-model="depths2FlagChecked"
                    @change="depthsFlag(item.sysCodeSid, 'YV' + index + index1, 2)"
                    :value="'YV' + index + index1"
                  ></v-checkbox
                ></span>
                <span class="checkbox"
                  ><v-checkbox
                    v-model="depths2FlagChecked"
                    @change="depthsFlag(item.sysCodeSid, 'YW' + index + index1, 2)"
                    :value="'YW' + index + index1"
                  ></v-checkbox
                ></span>
                <span class="checkbox"
                  ><v-checkbox
                    v-model="depths2FlagChecked"
                    @change="depthsFlag(item.sysCodeSid, 'YR' + index + index1, 2)"
                    :value="'YR' + index + index1"
                  ></v-checkbox
                ></span>
                <span class="checkbox"
                  ><v-checkbox
                    v-model="depths2FlagChecked"
                    @change="depthsFlag(item.sysCodeSid, 'YD' + index + index1, 2)"
                    :value="'YD' + index + index1"
                  ></v-checkbox
                ></span>
                <div v-if="item.submenu !== undefined">
                  <div v-for="(item, index2) in item.submenu" :key="index2">
                    <span>{{ item.sysCodeSid }}</span>
                    <span class="align-left depths3"><v-icon>mdi-arrow-right-bottom</v-icon>{{ item.sysCodeName }}</span>
                    <span class="checkbox"
                      ><v-checkbox
                        v-model="depths3FlagChecked"
                        @change="depthsFlag(item.sysCodeSid, 'YV' + index + index1 + index2, 3)"
                        :value="'YV' + index + index1 + index2"
                      ></v-checkbox
                    ></span>
                    <span class="checkbox"
                      ><v-checkbox
                        v-model="depths3FlagChecked"
                        @change="depthsFlag(item.sysCodeSid, 'YW' + index + index1 + index2, 3)"
                        :value="'YW' + index + index1 + index2"
                      ></v-checkbox
                    ></span>
                    <span class="checkbox"
                      ><v-checkbox
                        v-model="depths3FlagChecked"
                        @change="depthsFlag(item.sysCodeSid, 'YR' + index + index1 + index2, 3)"
                        :value="'YR' + index + index1 + index2"
                      ></v-checkbox
                    ></span>
                    <span class="checkbox"
                      ><v-checkbox
                        v-model="depths3FlagChecked"
                        @change="depthsFlag(item.sysCodeSid, 'YD' + index + index1 + index2, 3)"
                        :value="'YD' + index + index1 + index2"
                      ></v-checkbox
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="menuDataList.length < 1" class="alim">업체를 선택해 주세요.</div>
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
import { getPopupOpt } from "@/utils/modal";
import allRegModal from "@/components/modal/system/MenuList.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm },
  mixins: [loading, alimMixin, deleteMixin],
  data() {
    return {
      //데이터
      companyId: "",
      companyList: [],
      searchText: "",
      companySelectAll: false,
      menuDataList: [],
      depths1FlagChecked: [],
      depths2FlagChecked: [],
      depths3FlagChecked: [],
    };
  },
  computed: {
    ...mapGetters("menu", ["getCompanyList", "getCompanyDetail", "powerDeleteResult"]),
  },
  mounted() {
    this.reload();
    String.prototype.replaceAt = function (index, character) {
      return this.substr(0, index) + character + this.substr(index + character.length);
    };
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/COMPANY_LIST", this.searchText);
        if (this.getCompanyList.channeltuneApiResult.errorCode == 200) {
          this.companyList = this.getCompanyList.channeltuneApiResult.menuMemberList;
        } else {
          this.alim(this.getCompanyList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async companyDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/COMPANY_DETAIL", id);
        if (this.getCompanyDetail.channeltuneApiResult.errorCode == 200) {
          this.companyId = id;
          //총 갯수
          const count = Object.keys(this.getCompanyDetail.channeltuneApiResult.menuMemberList).length;
          //새로운 배열
          const list = [];
          for (let i = 0; i < count; i++) {
            await list.push(this.getCompanyDetail.channeltuneApiResult.menuMemberList[i]);
          }
          this.menuDataList = list;
          let depths1FlagChecked = [];
          let depths2FlagChecked = [];
          let depths3FlagChecked = [];
          this.menuDataList.forEach((ele, index) => {
            if (ele.menuManagementViewFlag === null) {
              ele.menuManagementViewFlag = "Y";
            }
            if (ele.menuManagementWriteFlag === null) {
              ele.menuManagementWriteFlag = "Y";
            }
            if (ele.menuManagementModifyFlag === null) {
              ele.menuManagementModifyFlag = "Y";
            }
            if (ele.menuManagementDeleteFlag === null) {
              ele.menuManagementDeleteFlag = "Y";
            }
            if (ele.menuManagementViewFlag === "Y") {
              depths1FlagChecked.push(ele.menuManagementViewFlag + "V" + index);
            }
            if (ele.menuManagementWriteFlag === "Y") {
              depths1FlagChecked.push(ele.menuManagementWriteFlag + "W" + index);
            }
            if (ele.menuManagementModifyFlag === "Y") {
              depths1FlagChecked.push(ele.menuManagementModifyFlag + "R" + index);
            }
            if (ele.menuManagementDeleteFlag === "Y") {
              depths1FlagChecked.push(ele.menuManagementDeleteFlag + "D" + index);
            }
            if (ele.submenu !== undefined) {
              const depths1 = index;
              ele.submenu.forEach((ele, index) => {
                if (ele.menuManagementViewFlag === null) {
                  ele.menuManagementViewFlag = "Y";
                }
                if (ele.menuManagementWriteFlag === null) {
                  ele.menuManagementWriteFlag = "Y";
                }
                if (ele.menuManagementModifyFlag === null) {
                  ele.menuManagementModifyFlag = "Y";
                }
                if (ele.menuManagementDeleteFlag === null) {
                  ele.menuManagementDeleteFlag = "Y";
                }
                if (ele.menuManagementViewFlag === "Y") {
                  depths2FlagChecked.push(ele.menuManagementViewFlag + "V" + depths1 + index);
                }
                if (ele.menuManagementWriteFlag === "Y") {
                  depths2FlagChecked.push(ele.menuManagementWriteFlag + "W" + depths1 + index);
                }
                if (ele.menuManagementModifyFlag === "Y") {
                  depths2FlagChecked.push(ele.menuManagementModifyFlag + "R" + depths1 + index);
                }
                if (ele.menuManagementDeleteFlag === "Y") {
                  depths2FlagChecked.push(ele.menuManagementDeleteFlag + "D" + depths1 + index);
                }
                if (ele.submenu !== undefined) {
                  let depths2 = index;
                  ele.submenu.forEach((ele, index) => {
                    if (ele.menuManagementViewFlag === null) {
                      ele.menuManagementViewFlag = "Y";
                    }
                    if (ele.menuManagementWriteFlag === null) {
                      ele.menuManagementWriteFlag = "Y";
                    }
                    if (ele.menuManagementModifyFlag === null) {
                      ele.menuManagementModifyFlag = "Y";
                    }
                    if (ele.menuManagementDeleteFlag === null) {
                      ele.menuManagementDeleteFlag = "Y";
                    }
                    if (ele.menuManagementViewFlag === "Y") {
                      depths3FlagChecked.push(ele.menuManagementViewFlag + "V" + depths1 + depths2 + index);
                    }
                    if (ele.menuManagementWriteFlag === "Y") {
                      depths3FlagChecked.push(ele.menuManagementWriteFlag + "W" + depths1 + depths2 + index);
                    }
                    if (ele.menuManagementModifyFlag === "Y") {
                      depths3FlagChecked.push(ele.menuManagementModifyFlag + "R" + depths1 + depths2 + index);
                    }
                    if (ele.menuManagementDeleteFlag === "Y") {
                      depths3FlagChecked.push(ele.menuManagementDeleteFlag + "D" + depths1 + depths2 + index);
                    }
                  });
                }
              });
            }
          });
          this.depths1FlagChecked = depths1FlagChecked;
          this.depths2FlagChecked = depths2FlagChecked;
          this.depths3FlagChecked = depths3FlagChecked;
        } else {
          this.alim(this.getCompanyDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async depthsFlag(menu, power, depths) {
      let view = power.replaceAt(1, "V");
      let write = power.replaceAt(1, "W");
      let rewrite = power.replaceAt(1, "R");
      let del = power.replaceAt(1, "D");
      let viewCheck = null;
      let writeCheck = null;
      let rewriteCheck = null;
      let delCheck = null;
      let menuManagementViewFlag = "";
      let menuManagementWriteFlag = "";
      let menuManagementModifyFlag = "";
      let menuManagementDeleteFlag = "";

      if (depths === 1) {
        viewCheck = this.depths1FlagChecked.includes(view);
        writeCheck = this.depths1FlagChecked.includes(write);
        rewriteCheck = this.depths1FlagChecked.includes(rewrite);
        delCheck = this.depths1FlagChecked.includes(del);
      }
      if (depths === 2) {
        viewCheck = this.depths2FlagChecked.includes(view);
        writeCheck = this.depths2FlagChecked.includes(write);
        rewriteCheck = this.depths2FlagChecked.includes(rewrite);
        delCheck = this.depths2FlagChecked.includes(del);
      }
      if (depths === 3) {
        viewCheck = this.depths3FlagChecked.includes(view);
        writeCheck = this.depths3FlagChecked.includes(write);
        rewriteCheck = this.depths3FlagChecked.includes(rewrite);
        delCheck = this.depths3FlagChecked.includes(del);
      }
      if (viewCheck === true) {
        menuManagementViewFlag = "Y";
      } else {
        menuManagementViewFlag = "N";
      }
      if (writeCheck === true) {
        menuManagementWriteFlag = "Y";
      } else {
        menuManagementWriteFlag = "N";
      }
      if (rewriteCheck === true) {
        menuManagementModifyFlag = "Y";
      } else {
        menuManagementModifyFlag = "N";
      }
      if (delCheck === true) {
        menuManagementDeleteFlag = "Y";
      } else {
        menuManagementDeleteFlag = "N";
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/POWER_SET", {
          menuManagementMenuId: menu,
          menuManagementMember: this.companyId,
          menuManagementKind: "SYS21928B004",
          menuManagementViewFlag: menuManagementViewFlag,
          menuManagementWriteFlag: menuManagementWriteFlag,
          menuManagementModifyFlag: menuManagementModifyFlag,
          menuManagementDeleteFlag: menuManagementDeleteFlag,
        });
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    menuGroupProp(data) {
      this.menuGroup = data.sysCodeName;
    },
    //등록및일괄처리 모달
    allRegModal() {
      this.$modal.show(allRegModal, { update: this.update }, getPopupOpt("allRegModal", "665px", "auto", false));
    },
    update(id) {
      this.reload();
      this.companyDetail(id);
    },
    //선택 업체 권한 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("menu/POWER_DEL", this.companyId);
            if (this.powerDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.reload();
              this.menuDetalList = [];
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.powerDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
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
  },
};
</script>

<style lang="scss" scoped>
.alim {
  text-align: center;
  padding-top: 7px;
}
.menu-control-group {
  & span {
    border-bottom: 1px solid #ebecec;
    max-height: 30px;
    height: 30px;
    vertical-align: top !important;
    &:nth-child(1) {
      width: 10%;
      text-align: center;
      padding-top: 6px;
    }
    &:nth-child(2) {
      width: 42%;
      text-align: center;
      padding-top: 6px;
    }
    &:nth-child(3) {
      width: 12%;
      text-align: center;
    }
    &:nth-child(4) {
      width: 12%;
      text-align: center;
    }
    &:nth-child(5) {
      width: 12%;
      text-align: center;
    }
    &:nth-child(6) {
      width: 12%;
      text-align: center;
    }
    &.align-left {
      text-align: left;
      padding-left: 10px;
    }
    &.depths2 {
      padding-left: 20px;
      & .v-icon {
        font-size: 7px;
        vertical-align: 3px;
        padding-right: 3px;
      }
    }
    &.depths3 {
      padding-left: 40px;
      & .v-icon {
        font-size: 7px;
        vertical-align: 3px;
        padding-right: 3px;
      }
    }
  }
}
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 25% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(75% - 25px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  & .btn-group {
    display: flex;
    align-items: center;
  }
  & .search-input {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
    width: 200px;
    margin-right: 5px;
  }
}
</style>
