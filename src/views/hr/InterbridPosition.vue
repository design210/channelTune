<template>
  <section class="container">
    <div class="title-wrap">
      <h1>직책관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>직책 리스트</h2>
            <div class="search">
              <input type="text" placeholder="직책을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              업체리스트 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="*" />
              <col width="120" />
            </colgroup>
            <thead>
              <tr>
                <th>직책코드</th>
                <th class="left">직책명</th>
                <th>직책상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="Detail(item.interbridPositionSid)">
                <td>{{ item.interbridPositionSid }}</td>
                <td class="left">{{ item.interbridPositionName }}</td>
                <td>{{ item.interbridPositionStatus }}</td>
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
              <v-btn small color="error" dark @click="confirm(interbridPositionSid)">삭제</v-btn>
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
                <td><input type="text" readonly v-model="interbridPositionSid" /></td>
              </tr>
              <tr>
                <td>직책명</td>
                <td><input type="text" v-model="interbridPositionName" /></td>
              </tr>
              <tr>
                <td>사용여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="interbridPositionStatus" :mandatory="false">
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
      interbridPositionSid: "",
      interbridPositionName: "",
      interbridPositionStatus: "Y",
      created_at: "",
      updated_at: "",
    };
  },
  computed: {
    ...mapGetters("interbridPosition", ["getPositionList", "getPositionDetail", "setPositionResult", "delPositionResult", "modifyPositionResult"]),
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
        await this.$store.dispatch("interbridPosition/POSITION_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        if (this.getPositionList.channeltuneApiResult.errorCode == 200) {
          const positionList = this.getPositionList.channeltuneApiResult.interbridPosition;
          this.list = positionList.data;
          this.len = positionList.last_page;
        } else {
          this.alim(this.getPositionList.channeltuneApiResult.errorMessage, this.errorColor);
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
        await this.$store.dispatch("interbridPosition/POSITION_DETAIL", {
          interbridPositionSid: id,
        });
        if (this.getPositionDetail.channeltuneApiResult.errorCode == 200) {
          const positionInfo = this.getPositionDetail.channeltuneApiResult.interbridPosition;
          this.interbridPositionSid = positionInfo.interbridPositionSid;
          this.interbridPositionName = positionInfo.interbridPositionName;
          this.interbridPositionStatus = positionInfo.interbridPositionStatus;
          this.created_at = positionInfo.created_at;
          this.updated_at = positionInfo.updated_at;
        } else {
          this.alim(this.getPositionDetail.channeltuneApiResult.errorMessage, this.errorColor);
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
        await this.$store.dispatch("interbridPosition/POSITION_ADD", {
          interbridPositionName: this.interbridPositionName,
          interbridPositionStatus: this.interbridPositionStatus,
        });
        if (this.setPositionResult.channeltuneApiResult.errorCode == 200) {
          this.alim("직책이 추가 되었습니다.", this.successColor);
          this.reload(0);
        } else {
          this.alim(this.setPositionResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        if (this.interbridPositionSid !== "") {
          this.alim("직책 코드가 있으면 등록할 수 없습니다.", this.errorColor);
          return false;
        }
      }
      if (this.interbridPositionName === "" || this.interbridPositionName == null) {
        this.alim("직책명을 입력해 주세요.", this.errorColor);
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
            await this.$store.dispatch("interbridPosition/POSITION_DEL", this.interbridPositionSid);
            if (this.delPositionResult.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.delPositionResult.channeltuneApiResult.errorMessage, this.errorColor);
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
        await this.$store.dispatch("interbridPosition/POSITION_MODIFY", {
          interbridPositionSid: this.interbridPositionSid,
          interbridPositionName: this.interbridPositionName,
          interbridPositionStatus: this.interbridPositionStatus,
        });
        if (this.modifyPositionResult.channeltuneApiResult.errorCode == 200) {
          this.reload(2);
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.modifyPositionResult.channeltuneApiResult.errorMessage, this.errorColor);
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
      this.interbridPositionSid = "";
      this.interbridPositionName = "";
      this.interbridPositionStatus = "Y";
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
