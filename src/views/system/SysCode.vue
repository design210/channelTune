<template>
  <section class="container">
    <div class="title-wrap">
      <h1>시스템 코드 관리</h1>
    </div>
    <section class="tree-menu section-box">
      <v-treeview v-model="selection" :items="items" class="tree-view" activatable @update:open="open">
        <template slot="label" slot-scope="{ item, open }">
          <v-icon>
            {{ open ? "mdi-folder-open" : "mdi-folder" }}
          </v-icon>
          <a @click="treeSet(item.id)">{{ item.name }}</a>
        </template>
      </v-treeview>

      <section class="init-wrap section-box border-inside">
        <div class="border">
          <div class="header">
            <h2>시스템 코드설정</h2>
            <div class="btn-group">
              <v-btn small color="primary" dark @click="reg">등록</v-btn>
              <v-btn small color="warning" dark @click="modify">수정</v-btn>
              <v-btn small color="error" dark @click="confirm(sysCodeSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="info-box">
            <p>루트에 메뉴 생성할때는 <span>부모코드에 '1'</span> 을 입력해 주세요.</p>
            <p>하위메뉴 생성할때는 상위 폴더를 선택 후 <span>하위 추가</span> 버튼 클릭해 시스템 코드를 설정하고 정보를 넣어주세요.</p>
          </div>
          <div class="field">
            <table class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>시스템 코드</td>
                <td class="with-btn">
                  <input type="text" v-model="sysCodeSid" readonly class="id" />
                  <v-btn small color="primary" dark @click="copyParentId" class="child-add">하위 추가</v-btn>
                </td>
                <td class="required">부모 코드</td>
                <td>
                  <input type="text" v-model="sysCodeParentsSid" class="parent" placeholder="필수 항목" />
                </td>
              </tr>
              <tr>
                <td class="required">코드이름</td>
                <td class="with-btn">
                  <input type="text" v-model="sysCodeName" class="id name" placeholder="필수 항목" />
                  <v-btn small color="#D0A9F5" dark @click="showLanguageSetModalPopup(-1, 'sysCodeSid')" class="child-add">언어셋</v-btn>
                </td>
                <td>코드정렬</td>
                <td><input type="text" class="parent" v-model="sysCodeSort" /></td>
              </tr>
              <tr>
                <td>시스템 코드명</td>
                <td><input type="text" v-model="sysCodeValName" /></td>
                <td>시스템 코드값</td>
                <td><input type="text" v-model="sysCodeVal" /></td>
              </tr>
              <tr>
                <td>시스템 코드명1</td>
                <td><input type="text" v-model="sysCodeVal1Name" /></td>
                <td>시스템 코드값1</td>
                <td><input type="text" v-model="sysCodeVal1" /></td>
              </tr>
              <tr>
                <td>시스템 코드명2</td>
                <td><input type="text" v-model="sysCodeVal2Name" /></td>
                <td>시스템 코드값2</td>
                <td><input type="text" v-model="sysCodeVal2" /></td>
              </tr>
              <tr>
                <td>시스템 코드명3</td>
                <td><input type="text" v-model="sysCodeVal3Name" /></td>
                <td>시스템 코드값3</td>
                <td><input type="text" v-model="sysCodeVal3" /></td>
              </tr>
              <tr>
                <td>시스템 코드명4</td>
                <td><input type="text" v-model="sysCodeVal4Name" /></td>
                <td>시스템 코드값4</td>
                <td><input type="text" v-model="sysCodeVal4" /></td>
              </tr>
              <tr>
                <td>사용 여부</td>
                <td colspan="3">
                  <div class="radio">
                    <v-radio-group v-model="sysCodeUse" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>등록자</td>
                <td><input type="text" v-model="sysCodeRegUserName" readonly /></td>
                <td>등록일시</td>
                <td><input type="text" v-model="sysCodeRegDateTime" readonly /></td>
              </tr>
            </table>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm
            :parentSid="sysCodeParentsSid"
            :type="type"
            :open="dialog"
            :txt="dialogText"
            :h1="dialogTitle"
            @resetConfirm="emitResetConfirm"
          ></confirm>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import LanguageSetModal from "@/components/modal/system/LanguageSetModal";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import { getPopupOpt } from "@/utils/modal";
export default {
  components: { alim, confirm },
  mixins: [alimMixin, deleteMixin],
  data() {
    return {
      //트리 데이터
      selection: [],
      items: [],
      itemTemp: [],
      sysCodeSid: "",
      sysCodeParentsSid: 1,
      sysCodeName: "",
      sysCodeSort: "",
      sysCodeValName: "",
      sysCodeVal: "",
      sysCodeVal1Name: "",
      sysCodeVal1: "",
      sysCodeVal2Name: "",
      sysCodeVal2: "",
      sysCodeVal3Name: "",
      sysCodeVal3: "",
      sysCodeVal4Name: "",
      sysCodeVal4: "",
      sysCodeUse: "Y",
      sysCodeRegUserName: "",
      sysCodeRegDateTime: "",
      temp: [],
      arr: "",
      newArr: [],
    };
  },
  computed: {
    ...mapGetters("system", ["setTree", "setTreeDetail", "addItemResult", "delItemResult", "modifyItemResult"]),
  },
  watch: {
    //트리 클릭시
    temp(arr1, arr2) {
      //선택값 추출
      let arr = arr1.filter(x => !arr2.includes(x));

      this.arr = arr[0];
      if (this.arr !== "" && this.arr !== undefined) {
        this.callTree(this.arr, this.newArr);
      }
    },
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("system/TREE", 1);
      let sysCodeList = this.setTree.channeltuneApiResult.sysCodeList;
      const list = [];
      sysCodeList.forEach(element => {
        if (element.childrenSid !== null) {
          list.push({
            name: element.sysCodeName,
            id: element.sysCodeSid,
            children: [{}],
          });
        } else {
          list.push({ name: element.sysCodeName, id: element.sysCodeSid });
        }
      });
      this.items = list;
    } catch (error) {
      this.alim(error, this.errorColor);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    //트리 클릭 변수
    open(selection) {
      if (!this.isEmptyArr(selection)) {
        this.temp = selection;
      }
    },
    //트리 호출
    async callTree(select) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("system/TREE", select);
        let sysSubCodeList = this.setTree.channeltuneApiResult.sysCodeList;
        //데이터 전송후 필요 데이터 배열생성
        let sublist = [];
        sysSubCodeList.forEach(element => {
          if (element.childrenSid !== null) {
            sublist.push({
              name: element.sysCodeName,
              id: element.sysCodeSid,
              children: [{}],
            });
          } else {
            sublist.push({ name: element.sysCodeName, id: element.sysCodeSid, children: [] });
          }
        });
        const _this = this;
        (function recursive(depth, c) {
          (c < 1 ? _this.items : depth).find(item => {
            if (item.id === select) {
              item.children = sublist;
            }
            if (item.children !== undefined && (item.children[0]?.name || "") !== "") {
              recursive(item.children, ++c);
            }
          });
        })([], 0);
        this.fold();
        this.itemTemp = [...this.items];
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //초기 빈배열 확인
    isEmptyArr(arr) {
      return Array.isArray(arr) && arr.length === 0;
    },
    showLanguageSetModalPopup(id, name) {
      if (this.sysCodeSid === "") {
        return this.alim("시스템 코드를 선택해주세요", this.errorColor);
      }
      this.$modal.show(
        LanguageSetModal,
        {
          languageSid: id,
          storeLanguageSetFlag: true,
          flagType: "syscodemanager",
          tableSid: this.sysCodeSid,
          fieldName: name,
          languageKindSysCode: "syscode",
        },
        getPopupOpt("LanguageSetModal", "850px", "auto", false),
      );
    },
    //항목 인풋 init
    async treeSet(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("system/TREE_DETAIL", id);
        let sysCodeDetail = this.setTreeDetail.channeltuneApiResult.sysCodeList;
        this.sysCodeSid = sysCodeDetail.sysCodeSid;
        this.sysCodeParentsSid = sysCodeDetail.sysCodeParentsSid;
        this.sysCodeName = sysCodeDetail.sysCodeName;
        this.sysCodeSort = sysCodeDetail.sysCodeSort;
        this.sysCodeValName = sysCodeDetail.sysCodeValName;
        this.sysCodeVal = sysCodeDetail.sysCodeVal;
        this.sysCodeVal1Name = sysCodeDetail.sysCodeVal1Name;
        this.sysCodeVal1 = sysCodeDetail.sysCodeVal1;
        this.sysCodeVal2Name = sysCodeDetail.sysCodeVal2Name;
        this.sysCodeVal2 = sysCodeDetail.sysCodeVal2;
        this.sysCodeVal3Name = sysCodeDetail.sysCodeVal3Name;
        this.sysCodeVal3 = sysCodeDetail.sysCodeVal3;
        this.sysCodeVal4Name = sysCodeDetail.sysCodeVal4Name;
        this.sysCodeVal4 = sysCodeDetail.sysCodeVal4;
        this.sysCodeUse = sysCodeDetail.sysCodeUse;
        this.sysCodeRegUserName = sysCodeDetail.sysCodeRegUserName;
        this.sysCodeRegDateTime = sysCodeDetail.sysCodeRegDateTime;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //항목 추가
    async reg() {
      if (this.sysCodeName === "") {
        this.alim("코드이름을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.sysCodeParentsSid === "") {
        this.alim("부모코드를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.sysCodeName !== "" || this.sysCodeParentsSid !== "") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("system/REG", {
            sysCodeSid: this.sysCodeSid,
            sysCodeParentsSid: this.sysCodeParentsSid,
            sysCodeName: this.sysCodeName,
            sysCodeSort: this.sysCodeSort,
            sysCodeValName: this.sysCodeValName,
            sysCodeVal: this.sysCodeVal,
            sysCodeVal1Name: this.sysCodeVal1Name,
            sysCodeVal1: this.sysCodeVal1,
            sysCodeVal2Name: this.sysCodeVal2Name,
            sysCodeVal2: this.sysCodeVal2,
            sysCodeVal3Name: this.sysCodeVal3Name,
            sysCodeVal3: this.sysCodeVal3,
            sysCodeVal4Name: this.sysCodeVal4Name,
            sysCodeVal4: this.sysCodeVal4,
            sysCodeUse: this.sysCodeUse,
          });
          if (this.addItemResult.channeltuneApiResult.errorCode == 200) {
            const id = this.addItemResult.channeltuneApiResult.sysCodeList.sysCodeSid;
            const _this = this;
            (function recursive(depth, c) {
              if (_this.sysCodeParentsSid == 1) {
                _this.items.push({
                  id: id,
                  name: _this.sysCodeName,
                  children: [],
                });
                return;
              }
              (c < 1 ? _this.items : depth).find(item => {
                if (item.id === _this.sysCodeParentsSid) {
                  if ("children" in item) {
                    item.children.push({
                      id: id,
                      name: _this.sysCodeName,
                      children: [],
                    });
                  } else {
                    item.children = [
                      {
                        id: id,
                        name: _this.sysCodeName,
                        children: [],
                      },
                    ];
                  }
                }
                if (item.children !== undefined && (item.children[0]?.name || "") !== "") {
                  recursive(item.children, ++c);
                }
              });
            })([], 0);
            this.alim("등록 되었습니다.", this.successColor);
          } else {
            this.alim(this.addItemResult.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
    //항목 수정
    async modify() {
      if (this.sysCodeSid !== "") {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("system/MODIFY", {
            sysCodeSid: this.sysCodeSid,
            sysCodeParentsSid: this.sysCodeParentsSid,
            sysCodeName: this.sysCodeName,
            sysCodeSort: this.sysCodeSort,
            sysCodeValName: this.sysCodeValName,
            sysCodeVal: this.sysCodeVal,
            sysCodeVal1Name: this.sysCodeVal1Name,
            sysCodeVal1: this.sysCodeVal1,
            sysCodeVal2Name: this.sysCodeVal2Name,
            sysCodeVal2: this.sysCodeVal2,
            sysCodeVal3Name: this.sysCodeVal3Name,
            sysCodeVal3: this.sysCodeVal3,
            sysCodeVal4Name: this.sysCodeVal4Name,
            sysCodeVal4: this.sysCodeVal4,
            sysCodeUse: this.sysCodeUse,
          });
          if (this.modifyItemResult.channeltuneApiResult.errorCode == 200) {
            const _this = this;
            (function recursive(depth, c) {
              (c < 1 ? _this.items : depth).find(item => {
                if (item.id === _this.sysCodeSid) {
                  item.name = _this.sysCodeName;
                  return;
                }
                if (item.children !== undefined && (item.children[0]?.name || "") !== "") {
                  recursive(item.children, ++c);
                }
              });
            })([], 0);
            this.alim("수정 되었습니다.", this.successColor);
          } else {
            this.alim(this.modifyItemResult.channeltuneApiResult.errorMessage, this.errorColor);
          }
        } catch (error) {
          this.alim(error, this.errorColor);
        } finally {
          bus.$emit("end:spinner");
        }
      } else {
        this.alim("시스템 코드가 없습니다.", this.errorColor);
      }
    },
    //항목 제거
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("system/DEL", this.sysCodeSid);
            if (this.delItemResult.channeltuneApiResult.errorCode == 200) {
              const _this = this;
              (function recursive(depth, c) {
                (c < 1 ? _this.items : depth).find(item => {
                  if (data.parentSid == 1) {
                    _this.items.find((elm, index) => {
                      if (elm?.id === _this.sysCodeSid) {
                        _this.items.splice(index, 1);
                      }
                    });
                    return;
                  }
                  if (item.id === data.parentSid) {
                    item.children.find((elm, index) => {
                      if (elm?.id === _this.sysCodeSid) {
                        item.children.splice(index, 1);
                      }
                    });
                    return;
                  }
                  if (item.children !== undefined && (item.children[0]?.name || "") !== "") {
                    recursive(item.children, ++c);
                  }
                });
              })([], 0);
              this.alim("삭제 되었습니다.", this.successColor);
              this.clear();
            } else {
              this.alim(this.delItemResult.channeltuneApiResult.errorMessage, this.errorColor);
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
      this.sysCodeSid = "";
      this.sysCodeName = "";
      this.sysCodeSort = "";
      this.sysCodeValName = "";
      this.sysCodeVal = "";
      this.sysCodeVal1Name = "";
      this.sysCodeVal1 = "";
      this.sysCodeVal2Name = "";
      this.sysCodeVal2 = "";
      this.sysCodeVal3Name = "";
      this.sysCodeVal3 = "";
      this.sysCodeVal4Name = "";
      this.sysCodeVal4 = "";
      this.sysCodeUse = "Y";
    },
    //폴딩시 텍스트 못볼러올경우 트릭
    fold() {
      setTimeout(() => {
        const tree = document.querySelectorAll(".tree-menu .v-treeview-node");
        tree.forEach(ele => {
          const label = ele.querySelector(".v-treeview-node__label");
          const links = label.querySelectorAll("a");
          links.forEach(ele => {
            if (ele.textContent === "") {
              console.log(ele.parentNode);
              ele.closest(".v-treeview-node__children").style.display = "none";
              ele
                .closest(".v-treeview-node__children")
                .previousElementSibling.querySelector("button")
                .classList.remove("v-treeview-node__toggle--open");
              ele.closest(".v-treeview-node__children").previousElementSibling.querySelector("i").classList.remove("mdi-folder-open");
              ele.closest(".v-treeview-node__children").previousElementSibling.querySelector("i").classList.add("mdi-folder");
            }
          });
        });
      }, 10);
    },
    //시스템 코드 복사
    copyParentId() {
      this.sysCodeParentsSid = this.sysCodeSid;
      this.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  display: block !important;
  height: auto !important;
}
.tree-menu {
  display: flex;
  justify-content: space-between;
  & .tree-view {
    border: 1px solid #ccc;
    width: 30%;
    min-height: calc(100vh - 215px);
    overflow: auto;
    & .v-icon {
      margin-right: 5px;
      vertical-align: -4px;
    }
    & a {
      color: #000;
    }
  }
  & .init-wrap {
    width: calc(70% - 20px);
  }
}
</style>
