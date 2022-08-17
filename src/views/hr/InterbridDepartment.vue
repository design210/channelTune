<template>
  <section class="container">
    <div class="title-wrap">
      <h1>부서관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>부서 리스트</h2>
            <div class="search">
              <input type="text" placeholder="부서를 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              부서 리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>부서코드</th>
                <th class="left">부서명</th>
                <th>부서상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="Detail(item.interbridDepartmentSid)">
                <td>{{ item.interbridDepartmentSid }}</td>
                <td class="left">{{ item.interbridDepartmentName }}</td>
                <td>{{ item.interbridDepartmentStatus }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="3">직책 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(interbridDepartmentSid)">삭제</v-btn>
              <v-btn small @click="clear">clear</v-btn>
            </div>
          </div>
          <div class="field">
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>직책 코드</td>
                <td><input type="text" readonly v-model="interbridDepartmentSid" /></td>
              </tr>
              <tr>
                <td>직책명</td>
                <td><input type="text" v-model="interbridDepartmentName" /></td>
              </tr>
              <tr>
                <td>사용여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="interbridDepartmentStatus" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg">
              <colgroup>
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>생성일시</td>
                <td><input type="text" readonly v-model="created_at" /></td>
              </tr>
              <tr>
                <td>업데이트 일시</td>
                <td><input type="text" readonly v-model="updated_at" /></td>
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
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //직책 디테일 데이터
      interbridDepartmentSid: "",
      interbridDepartmentName: "",
      interbridDepartmentStatus: "Y",
      created_at: "",
      updated_at: "",
    };
  },
  computed: {
    ...mapGetters("interbridDepartment", ["getPartList", "getPartDetail", "setPartResult", "delPartResult", "modifyPartResult"]),
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
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridDepartment/PART_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getPartList.channeltuneApiResult.errorCode == 200) {
          const list = this.getPartList.channeltuneApiResult.interbridDepartment;
          this.list = list.data;
          this.len = list.last_page;
        } else {
          this.alim(this.getPartList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //상세 정보
    async Detail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridDepartment/PART_DETAIL", {
          interbridDepartmentSid: id,
        });
        if (this.getPartDetail.channeltuneApiResult.errorCode == 200) {
          const info = this.getPartDetail.channeltuneApiResult.interbridDepartment;
          this.interbridDepartmentSid = info.interbridDepartmentSid;
          this.interbridDepartmentName = info.interbridDepartmentName;
          this.interbridDepartmentStatus = info.interbridDepartmentStatus;
          this.created_at = info.created_at;
          this.updated_at = info.updated_at;
        } else {
          this.alim(this.getPartDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridDepartment/PART_ADD", {
          interbridDepartmentName: this.interbridDepartmentName,
          interbridDepartmentStatus: this.interbridDepartmentStatus,
        });
        if (this.setPartResult.channeltuneApiResult.errorCode == 200) {
          this.alim("부서가 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.setPartResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //등록 validate
    validate(status) {
      if (status === "reg") {
        if (this.interbridDepartmentSid !== "") {
          this.alim("부서 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.interbridDepartmentName === "" || this.interbridDepartmentName == null) {
        this.alim("부서명을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (status === "reg") {
        this.reg();
      }
      if (status === "modify") {
        this.modify();
      }
    },
    //삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("interbridDepartment/PART_DEL", this.interbridDepartmentSid);
            if (this.delPartResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.delPartResult.channeltuneApiResult.errorMessage, this.errorColor);
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
    //수정
    async modify() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridDepartment/PART_MODIFY", {
          interbridDepartmentSid: this.interbridDepartmentSid,
          interbridDepartmentName: this.interbridDepartmentName,
          interbridDepartmentStatus: this.interbridDepartmentStatus,
        });
        if (this.modifyPartResult.channeltuneApiResult.errorCode == 200) {
          await this.reload(2);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.modifyPartResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
      this.interbridDepartmentSid = "";
      this.interbridDepartmentName = "";
      this.interbridDepartmentStatus = "Y";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 65% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(35% - 20px);
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
