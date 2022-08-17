<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>등록 및 일괄처리</h2>
    </template>
    <template slot="body">
      <div class="v-application modal">
        <div>
          <div class="company-select">
            <div class="name">업체명</div>
            <div class="search">
              <input type="text" v-model="sid" readonly class="id" />
              <input type="text" v-model="name" class="search-input" readonly />
              <v-btn small color="primary" dark @click="showModalPopup()" class="btn-search">조회</v-btn>
            </div>
          </div>
          <div class="menu-select">
            <div class="name">메뉴구분</div>
            <div><pull-down v-model="level" :code="statusCode" @selected="levelProp" class="pull-down w150"></pull-down></div>
          </div>
          <div class="menu-power">
            <v-checkbox v-model="menuManagementViewFlag" value="Y" label="보기(View) 권한"></v-checkbox>
            <v-checkbox v-model="menuManagementWriteFlag" value="Y" label="등록(Write)권한"></v-checkbox>
            <v-checkbox v-model="menuManagementModifyFlag" value="Y" label="수정(Rewrite) 권한"></v-checkbox>
            <v-checkbox v-model="menuManagementDeleteFlag" value="Y" label="삭제(Delete) 권한"></v-checkbox>
          </div>
          <div class="confirm"><v-btn small color="primary" dark @click="confirm" class="btn-search">처리</v-btn></div>
        </div>
        <!-- 알럿 -->
        <alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import PullDown from "@/components/form/PullDown.vue";
import companyListModal from "@/components/modal/common/CompanyList";
import { getPopupOpt } from "@/utils/modal";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, PullDown, alim },
  mixins: [alimMixin, loading],
  data() {
    return {
      level: "",
      sid: "",
      name: "",
      menuManagementViewFlag: "Y",
      menuManagementWriteFlag: "Y",
      menuManagementModifyFlag: "Y",
      menuManagementDeleteFlag: "Y",
      statusCode: "SYS21928B005",
      closeModal: false,
    };
  },
  computed: {
    ...mapGetters("menu", ["setAllPowerResult"]),
  },
  methods: {
    close() {
      if (this.closeModal === true) {
        this.$attrs.update(this.sid);
      }
      this.$emit("close");
    },
    //회사 모달
    showModalPopup() {
      this.$modal.show(companyListModal, { update: this.update }, getPopupOpt("companyListModal", "700px", "auto", false));
    },
    update(data) {
      this.sid = data.companySid;
      this.name = data.companyName;
    },
    levelProp(data) {
      this.level = data.sysCodeVal;
    },
    async confirm() {
      if (this.sid === "") {
        this.alim("업체를 선택해 주세요.", this.errorColor);
        return false;
      }
      if (this.level === "") {
        this.alim("메뉴구분을 선택해 주세요.", this.errorColor);
        return false;
      }
      let menuManagementViewFlag = "";
      let menuManagementWriteFlag = "";
      let menuManagementModifyFlag = "";
      let menuManagementDeleteFlag = "";
      if (this.menuManagementViewFlag == null) {
        menuManagementViewFlag = "N";
      } else {
        menuManagementViewFlag = "Y";
      }
      if (this.menuManagementWriteFlag == null) {
        menuManagementWriteFlag = "N";
      } else {
        menuManagementWriteFlag = "Y";
      }
      if (this.menuManagementModifyFlag == null) {
        menuManagementModifyFlag = "N";
      } else {
        menuManagementModifyFlag = "Y";
      }
      if (this.menuManagementDeleteFlag == null) {
        menuManagementDeleteFlag = "N";
      } else {
        menuManagementDeleteFlag = "Y";
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/POWER_ALLSET", {
          menuManagementKind: "SYS21928B004",
          menuManagementMember: this.sid,
          menuGroup: this.level,
          menuManagementViewFlag: menuManagementViewFlag,
          menuManagementWriteFlag: menuManagementWriteFlag,
          menuManagementModifyFlag: menuManagementModifyFlag,
          menuManagementDeleteFlag: menuManagementDeleteFlag,
        });
        if (this.setAllPowerResult.channeltuneApiResult.errorCode == 200) {
          this.closeModal = true;
          this.alim("등록 되었습니다.", this.successColor);
        } else {
          this.alim(this.setAllPowerResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.company-select {
  display: flex;
  align-items: center;
  & .name {
    width: 80px;
  }
  & .search {
    display: flex;
    align-items: center;
    & .id {
      width: 120px;
      margin-right: 5px;
    }
  }
}
.menu-select {
  margin-top: 10px;
  display: flex;
  align-items: center;
  & .name {
    width: 80px;
  }
}
.menu-power {
  margin: 10px 0 0 80px;
  display: flex;
  & > div {
    margin-right: 20px;
  }
}
.confirm {
  text-align: center;
  margin-top: 20px;
}
</style>
