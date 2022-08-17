<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="ins-header">
        <h1>제품검수</h1>
        <div class="btn-group v-application">
          <v-btn small color="primary" @click="validate('reg')">등록</v-btn>
          <v-btn small color="warning" @click="validate('modify')">수정</v-btn>
          <v-btn small color="error" @click="confirm(productionTestSid)">삭제</v-btn>
          <v-btn small @click="close">닫기</v-btn>
          <!-- <v-btn small @click="clear">clear</v-btn> -->
        </div>
      </div>
    </template>

    <template slot="body">
      <section class="table-section">
        <table width="100%" class="tbl-reg column2">
          <colgroup>
            <col width="130" />
            <col width="*" />
            <col width="100" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>제품 검수 고유코드</td>
            <td class="field-div">
              <input type="text" class="input-first" readonly v-model="productionTestSid" />
            </td>
          </tr>
          <tr>
            <td>제품</td>
            <td class="field-div" colspan="3">
              <input type="text" class="input-first" readonly v-model="productSid" />
              <input type="text" class="input-last" readonly v-model="productName" />
            </td>
          </tr>
          <tr>
            <td>LOT 번호</td>
            <td><input type="text" readonly v-model="productionLotNumbr" /></td>
            <td>Serial 번호</td>
            <td><input type="text" :readonly="productKind === 'SYS21910B004' ? false : true" v-model="productionTransSid" /></td>
          </tr>
          <tr>
            <td>처리 날짜</td>
            <td>
              <!-- <input type="text" v-model="productionTestDate"/> -->
              <date-picker :propdate="productionTestDate" @updateDate="newProductionTestDate" class="modal-date"></date-picker>
            </td>
            <td>제품 처리 상태</td>
            <td>
              <pull-down :data="productionTestStatusName" :code="setCode" @selected="selectOn" class="pull-down"></pull-down>
            </td>
          </tr>
          <tr>
            <td>비고</td>
            <td colspan="3">
              <textarea v-model="productionTestDoc"></textarea>
            </td>
          </tr>
        </table>
      </section>

      <section class="init-wrap section-box border-outside">
        <div class="border">
          <table class="tbl">
            <caption>
              제품검수 테이블
            </caption>
            <colgroup>
              <col width="120" />
              <col width="150" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>검수 처리 날짜</th>
                <th>시리얼 번호</th>
                <th>제품 처리 상태</th>
                <th>처리 사유</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr v-for="(item, index) in list" :key="index" @click="productionTestDetail(item.productionTestSid)">
                <td>{{ item.productionTestDate }}</td>
                <td>{{ item.productionTransSid }}</td>
                <td>{{ item.productionTestStatusName }}</td>
                <td>{{ item.productionTestDoc }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">제품검수 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </div>
      </section>
    </template>

    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import PullDown from "@/components/form/PullDown.vue";
import DatePicker from "@/components/form/DatePicker.vue";
export default {
  components: { alim, confirm, PullDown, modalWrap, DatePicker },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["tSid", "transSid", "tName", "tLot", "tKind"],
  data() {
    return {
      //게시물 설정
      page: 1,
      len: null,
      list: [],
      size: 10,

      productionTestSid: "",
      productionTestDate: "",
      productSid: "",
      productKind: "",
      productionTransSid: "",
      productionTestStatus: "",
      productionTestDoc: "",
      productName: "",
      productionLotNumbr: "",
      productionTestStatusName: "",
      created_at: "",
      updated_at: "",

      setCode: "SYS21910B012",
      sysCodeSid: "",
    };
  },
  computed: {
    ...mapGetters("assetProduct", [
      "productionTestDelete",
      "getProductionTestList",
      "getProductionTestDetail",
      "productionTestAdd",
      "productionTestModify",
    ]),
  },
  watch: {
    page() {
      this.reload();
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    console.log(this.tKind);
    this.productSid = this.tSid;
    this.productionTransSid = this.transSid;
    this.productName = this.tName;
    this.productionLotNumbr = this.tLot;
    this.productKind = this.tKind;
    this.reload(1);
  },
  methods: {
    close() {
      this.$attrs.update(1);
      this.$emit("close");
    },
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }

      bus.$emit("start:spinner");
      await this.$store.dispatch("assetProduct/PRODUCTIONTEST_LIST", {
        size: this.size,
        page: this.page,
        productionTransSid: this.productionTransSid,
      });
      if (this.getProductionTestList.channeltuneApiResult.errorCode == 200) {
        const productionTest = this.getProductionTestList.channeltuneApiResult.productionTest;
        this.list = productionTest.data;
        this.len = productionTest.last_page;
      } else {
        this.alim(this.getProductionTestList.channeltuneApiResult.errorMessage, this.errorColor);
      }
      bus.$emit("end:spinner");
    },
    async productionTestDetail(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONTEST_DETAIL", id);
        if (this.getProductionTestDetail.channeltuneApiResult.errorCode == 200) {
          const response = this.getProductionTestDetail.channeltuneApiResult.productionTest;
          this.productionTestSid = response.productionTestSid;
          this.productionTestDate = response.productionTestDate;
          this.productSid = response.productSid;
          this.productionTransSid = response.productionTransSid;
          this.productionTestDoc = response.productionTestDoc;
          this.productName = response.productName;
          this.productionLotNumbr = response.productionLotNumbr;
          this.productionTestSid = response.productionTestSid;
          this.productionTestStatus = response.productionTestStatus;
          this.productionTestStatusName = response.productionTestStatusName;
          this.created_at = response.created_at;
          this.updated_at = response.updated_at;
        } else {
          this.alim(this.getProductionTestDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    selectOn(data) {
      this.sysCodeSid = data.sysCodeSid;
    },
    //validate
    validate(status) {
      if (this.productSid === "" || this.productionTransSid === "") {
        this.alim("검수하실 항목을 선택하세요.", this.errorColor);
        return false;
      }

      if (this.sysCodeSid === "") {
        this.alim("제품처리 상태를 선택해주세요.", this.errorColor);
        return false;
      }

      if (this.productionTestDate === "" || this.productionTestDate == null) {
        this.alim("처리날짜를 입력해주세요.", this.errorColor);
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
        await this.$store.dispatch("assetProduct/PRODUCTIONTEST_ADD", {
          productionTestDate: this.productionTestDate,
          productSid: this.productSid,
          productionTransSid: this.productionTransSid,
          productionTestStatus: this.sysCodeSid,
          productionTestDoc: this.productionTestDoc,
        });
        if (this.productionTestAdd.channeltuneApiResult.errorCode == 200) {
          this.alim("제품검수가 추가 되었습니다.", this.successColor);
          this.reload();
        } else {
          this.alim(this.productionTestAdd.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //수정
    async modify() {
      if (this.productionSid === "") {
        this.alim("제품생산을 선택해 주세요.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("assetProduct/PRODUCTIONTEST_MODIFY", {
          productionTestSid: this.productionTestSid,
          productionTestDate: this.productionTestDate,
          productionTestStatus: this.sysCodeSid,
          productionTestDoc: this.productionTestDoc,
        });
        if (this.productionTestModify.channeltuneApiResult.errorCode == 200) {
          await this.reload();
          this.alim("수정 되었습니다.", this.successColor);
        } else {
          this.alim(this.productionTestModify.channeltuneApiResult.errorMessage, this.errorColor);
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
            await this.$store.dispatch("assetProduct/PRODUCTIONTEST_DEL", this.productionTestSid);
            if (this.productionTestDelete.channeltuneApiResult.errorCode == 200) {
              await this.reload(0);
              if (this.list.length < 1) {
                this.page = this.page - 1;
              }
              this.alim("삭제 되었습니다.", this.successColor);
            } else {
              this.alim(this.productionTestDelete.channeltuneApiResult.errorMessage, this.errorColor);
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
    newProductionTestDate(data) {
      this.productionTestDate = data;
    },
    clear() {
      // this.productSid='';
      // this.productionTransSid='';
      // this.productName='';
      this.productionTestSid = "";
      this.productionTestDate = "";
      this.productionTestStatus = "";
      this.productionTestDoc = "";
      this.productionLotNumbr = "";
      this.productionTestSid = "";
      this.productionTestStatusName = "";
      this.created_at = "";
      this.updated_at = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.ins-header {
  display: flex;
  justify-content: space-between;
}

.btn-group {
  & button {
    margin-left: 5px;
  }
}

.border {
  min-height: 450px;
  overflow-y: scroll;
}
</style>
