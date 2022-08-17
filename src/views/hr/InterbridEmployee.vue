<template>
  <section class="container">
    <div class="title-wrap">
      <h1>직원관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>직원 리스트</h2>
            <div class="search">
              <input type="text" placeholder="이름을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <div class="mt20 tab">
            <ul class="d-flex">
              <li :class="{ active: tab === true }" @click="work">재직자</li>
              <li :class="{ active: tab === false }" @click="out">퇴사자</li>
            </ul>
          </div>
          <table class="tbl user-list-tbl select-tbl mt5">
            <caption>
              테이블
            </caption>
            <colgroup>
              <col width="80" />
              <col width="120" />
              <col width="120" />
              <col width="130" />
              <col width="*" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>이름</th>
                <th>직책</th>
                <th>부서</th>
                <th>전화번호</th>
                <th>이메일</th>
                <th>입사일</th>
                <th>퇴사일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="Detail(item.interbridEmployeeSid)">
                <td>{{ item.interbridEmployeeKorName }}</td>
                <td>{{ item.interbridPositionName }}</td>
                <td>{{ item.interbridDepartmentName }}</td>
                <td>{{ item.interbridEmployeeHp }}</td>
                <td>{{ item.interbridEmployeeEmail }}</td>
                <td>{{ item.interbridEmployeeStartWorkDate }}</td>
                <td>{{ item.interbridEmployeeLastWorkDate }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="7">직원 리스트가 없습니다.</td>
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
              <v-btn small color="error" dark @click="confirm(interbridEmployeeSid)">삭제</v-btn>
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
                <td>직원코드</td>
                <td><input type="text" readonly v-model="interbridEmployeeSid" /></td>
              </tr>
              <tr>
                <td class="required">인터브리드 코드</td>
                <td><input type="text" v-model="interbridCode" /></td>
              </tr>
              <tr>
                <td class="required">이름</td>
                <td><input type="text" v-model="interbridEmployeeKorName" /></td>
              </tr>
              <tr>
                <td class="required">영문이름</td>
                <td><input type="text" v-model="interbridEmployeeEngName" /></td>
              </tr>
              <tr>
                <td class="required">전화번호</td>
                <td><input type="text" v-model="interbridEmployeeHp" /></td>
              </tr>
              <tr>
                <td class="required">이메일</td>
                <td><input type="text" v-model="interbridEmployeeEmail" /></td>
              </tr>
              <tr>
                <td class="required">직책</td>
                <td>
                  <pull-down-hr
                    :position="position"
                    :data="interbridPositionSid"
                    @selected="interbridPositionNameProp"
                    class="pull-down"
                  ></pull-down-hr>
                </td>
              </tr>
              <tr>
                <td class="required">부서</td>
                <td>
                  <pull-down-hr
                    :department="department"
                    :data="interbridDepartmentSid"
                    @selected="interbridDepartmentNameProp"
                    class="pull-down"
                  ></pull-down-hr>
                </td>
              </tr>
              <tr>
                <td class="required">입사일</td>
                <td class="date-100">
                  <date-picker :propdate="interbridEmployeeStartWorkDate" @updateDate="interbridEmployeeStartWorkDateProp"></date-picker>
                </td>
              </tr>
              <tr>
                <td>퇴사일</td>
                <td class="date-100">
                  <date-picker :propdate="interbridEmployeeLastWorkDate" @updateDate="interbridEmployeeLastWorkDateProp"></date-picker>
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
import DatePicker from "@/components/form/DatePicker.vue";
import PullDownHr from "../../components/form/PullDownHr.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: { alim, confirm, DatePicker, PullDownHr },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      //풀다운 구분
      position: true,
      department: true,
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      //직원 디테일 데이터
      interbridEmployeeSid: "",
      interbridCode: "",
      interbridEmployeeKorName: "",
      interbridEmployeeEngName: "",
      interbridEmployeeHp: "",
      interbridEmployeeEmail: "",
      interbridDepartmentSid: "",
      interbridPositionSid: "",
      interbridDepartmentName: "",
      interbridPositionName: "",
      interbridEmployeeStartWorkDate: "",
      interbridEmployeeLastWorkDate: "",
      created_at: "",
      updated_at: "",
      //탭
      tab: true,
      //직원구분
      lastWorkFlag: "Y",
    };
  },
  computed: {
    ...mapGetters("interbridEmployee", ["getEmployeeList", "getEmployeeDetail", "employeeAddResult", "employeeDelResult", "employeeModifyResult"]),
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
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          lastWorkFlag: this.lastWorkFlag,
        });
        if (this.getEmployeeList.channeltuneApiResult.errorCode == 200) {
          const list = this.getEmployeeList.channeltuneApiResult.interbridEmployee;
          this.list = list.data;
          this.len = list.last_page;
        } else {
          this.alim(this.getEmployeeList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    work() {
      this.tab = true;
      this.lastWorkFlag = "Y";
      this.reload();
    },
    out() {
      this.tab = false;
      this.lastWorkFlag = "N";
      this.reload();
    },
    //상세 정보
    async Detail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_DETAIL", {
          interbridEmployeeSid: id,
        });
        if (this.getEmployeeDetail.channeltuneApiResult.errorCode == 200) {
          const info = this.getEmployeeDetail.channeltuneApiResult.interbridEmployee;
          this.interbridEmployeeSid = info.interbridEmployeeSid;
          this.interbridCode = info.interbridCode;
          this.interbridEmployeeKorName = info.interbridEmployeeKorName;
          this.interbridEmployeeEngName = info.interbridEmployeeEngName;
          this.interbridEmployeeHp = info.interbridEmployeeHp;
          this.interbridEmployeeEmail = info.interbridEmployeeEmail;
          this.interbridEmployeeStartWorkDate = info.interbridEmployeeStartWorkDate;
          this.interbridEmployeeLastWorkDate = info.interbridEmployeeLastWorkDate;
          this.interbridDepartmentSid = info.interbridDepartmentSid;
          this.interbridPositionSid = info.interbridPositionSid;
          this.interbridDepartmentName = info.interbridDepartmentName;
          this.interbridPositionName = info.interbridPositionName;
          this.created_at = info.created_at;
          this.updated_at = info.updated_at;
        } else {
          this.alim(this.getEmployeeDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //풀다운 데이터 emit
    interbridPositionNameProp(data) {
      this.interbridPositionSid = data.sysCodeSid;
      this.interbridPositionName = data.sysCodeName;
    },
    interbridDepartmentNameProp(data) {
      this.interbridDepartmentSid = data.sysCodeSid;
      this.interbridDepartmentName = data.sysCodeName;
    },
    //날짜 입력받기 emit
    interbridEmployeeStartWorkDateProp(date) {
      this.interbridEmployeeStartWorkDate = date;
    },
    interbridEmployeeLastWorkDateProp(date) {
      this.interbridEmployeeLastWorkDate = date;
    },
    //추가
    async reg() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_ADD", {
          interbridCode: this.interbridCode,
          interbridEmployeeKorName: this.interbridEmployeeKorName,
          interbridEmployeeEngName: this.interbridEmployeeEngName,
          interbridEmployeeHp: this.interbridEmployeeHp,
          interbridEmployeeEmail: this.interbridEmployeeEmail,
          interbridPositionSid: this.interbridPositionSid,
          interbridDepartmentSid: this.interbridDepartmentSid,
          interbridEmployeeStartWorkDate: this.interbridEmployeeStartWorkDate,
          interbridEmployeeLastWorkDate: this.interbridEmployeeLastWorkDate,
        });
        if (this.employeeAddResult.channeltuneApiResult.errorCode == 200) {
          this.alim("직원이 추가 되었습니다.", this.successColor);
          await this.reload(0);
        } else {
          this.alim(this.employeeAddResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        if (this.interbridEmployeeSid !== "") {
          this.alim("직원 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.interbridCode === "" || this.interbridCode == null) {
        this.alim("인터브리드 코드를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeKorName === "" || this.interbridEmployeeKorName == null) {
        this.alim("이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeEngName === "" || this.interbridEmployeeEngName == null) {
        this.alim("영문이름을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeHp === "" || this.interbridEmployeeHp == null) {
        this.alim("전화번호를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeEmail === "" || this.interbridEmployeeEmail == null) {
        this.alim("이메일을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridPositionName === "" || this.interbridPositionName == null) {
        this.alim("직책을 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridDepartmentName === "" || this.interbridDepartmentName == null) {
        this.alim("부서를 입력해 주세요.", this.errorColor);
        return false;
      }
      if (this.interbridEmployeeStartWorkDate === "" || this.interbridEmployeeStartWorkDate == null) {
        this.alim("입사일을 입력해 주세요.", this.errorColor);
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
            await this.$store.dispatch("interbridEmployee/EMPLOYEE_DEL", this.interbridEmployeeSid);
            if (this.employeeDelResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.employeeDelResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        await this.$store.dispatch("interbridEmployee/EMPLOYEE_MODIFY", {
          interbridEmployeeSid: this.interbridEmployeeSid,
          interbridCode: this.interbridCode,
          interbridEmployeeKorName: this.interbridEmployeeKorName,
          interbridEmployeeEngName: this.interbridEmployeeEngName,
          interbridEmployeeHp: this.interbridEmployeeHp,
          interbridEmployeeEmail: this.interbridEmployeeEmail,
          interbridPositionSid: this.interbridPositionSid,
          interbridDepartmentSid: this.interbridDepartmentSid,
          interbridEmployeeStartWorkDate: this.interbridEmployeeStartWorkDate,
          interbridEmployeeLastWorkDate: this.interbridEmployeeLastWorkDate,
        });
        if (this.employeeModifyResult.channeltuneApiResult.errorCode == 200) {
          await this.reload(2);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.employeeModifyResult.channeltuneApiResult.errorMessage, this.errorColor);
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
      this.interbridEmployeeSid = "";
      this.interbridCode = "";
      this.interbridEmployeeKorName = "";
      this.interbridEmployeeEngName = "";
      this.interbridEmployeeHp = "";
      this.interbridEmployeeEmail = "";
      this.interbridEmployeeStartWorkDate = "";
      this.interbridEmployeeLastWorkDate = "";
      this.interbridDepartmentSid = "";
      this.interbridPositionSid = "";
      this.interbridDepartmentName = "";
      this.interbridPositionName = "";
      this.created_at = "";
      this.updated_at = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  position: relative;
  & li {
    border: 1px solid #ccc;
    @include NotoSans(1.3, 400, #333);
    padding: 5px 20px;
    border-radius: 3px 3px 0 0;
    margin-right: 2px;
    cursor: pointer;
    &.active {
      background-color: #1976d2;
      border-color: #1976d2;
      color: #fff !important;
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid #ccc;
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
