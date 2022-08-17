<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header v-application">
        <h1>광고 상품 옵션 설정</h1>
        <div class="btn-group">
          <v-btn small color="warning mr20" @click="save">저장</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="border v-application">
        <table width="100%" class="tbl-reg column2" style="margin-top: 0px">
          <colgroup>
            <col width="100" />
            <col width="120" />
            <col width="*" />
          </colgroup>
          <tr>
            <td>고유코드</td>
            <td class="field-div"><input type="text" class="input-first" readonly v-model="advertisingProductTransSid" /></td>
          </tr>
          <tr>
            <td>설치제품</td>
            <td class="field-div" colspan="2">
              <input type="text" class="input-first" readonly v-model="advertisingProductSid" />
              <input type="text" class="input-last" readonly v-model="advertisingProductName" />
            </td>
          </tr>
          <tr>
            <td>* 컨텐츠유무</td>
            <td>
              <div class="radio">
                <!-- <v-radio-group v-model="estimateExposureContentFlag"> -->
                <v-radio-group v-model="advertisingProductOptionContentFlag">
                  <v-radio label="있음허용" value="T"></v-radio>
                  <v-radio label="없음허용" value="F"></v-radio>
                  <v-radio label="모두허용" value="A"></v-radio>
                </v-radio-group>
              </div>
            </td>
          </tr>
          <tr>
            <td>* 지역</td>
            <td colspan="2">
              <div class="radio flex-div">
                <v-radio-group v-model="advertisingProductOptionArea">
                  <v-radio label="모든범위허용" value="A"></v-radio>
                  <v-radio label="선택값조정" value="C"></v-radio>
                </v-radio-group>
                <div class="location-select-btn btn-group" v-if="advertisingProductOptionArea == 'C'">
                  <v-btn small color="primary" @click="showLocationModal">선택값설정</v-btn>
                  <v-btn small color="error" @click="initLocations">초기화</v-btn>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="advertisingProductOptionArea == 'C'">
            <td></td>
            <td colspan="2">
              <div class="location-list">
                <div v-for="(item, index) in showAdvertisingProductOptionAreaChoice" :key="index">
                  <span>{{ index + 1 }}.&nbsp;&nbsp;</span>
                  <span>{{ item.sidoCodeName }}</span>
                  <span v-if="item.sigunCode && item.sigunCodeName">&nbsp; / &nbsp;</span>
                  <span>{{ item.sigunCodeName }}</span>
                  <span v-if="item.gudongliCode && item.gudongliCodeName">&nbsp; / &nbsp;</span>
                  <span>{{ item.gudongliCodeName }}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>* 등급</td>
            <td colspan="2">
              <div class="radio flex-div">
                <!-- <v-radio-group v-model="estimateExposureContentFlag"> -->
                <v-radio-group v-model="advertisingProductOptionGrade">
                  <v-radio label="모두허용" value="A"></v-radio>
                  <v-radio label="선택값고정" value="C"></v-radio>
                </v-radio-group>
                <div v-if="advertisingProductOptionGrade == 'C'">
                  <pull-down-multi
                    ref="pullDownMulti"
                    :data="advertisingProductOptionGradeChoice"
                    :code="'SYS21A22B001'"
                    @selected="gradeProp"
                    class="pull-down multi"
                    :onlySelectPullDown="true"
                  >
                  </pull-down-multi>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>* 슬롯수</td>
            <td colspan="2">
              <div class="radio flex-div">
                <!-- <v-radio-group v-model="estimateExposureContentFlag"> -->
                <v-radio-group v-model="advertisingProductOptionSlot">
                  <v-radio label="모두허용" value="A"></v-radio>
                  <v-radio label="슬롯수고정" value="C"></v-radio>
                </v-radio-group>
                <div v-if="advertisingProductOptionSlot == 'C'">
                  <input type="text" placeholder="슬롯수를 입력하세요" v-model="advertisingProductOptionSlotCount" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>* 희망스토어업종</td>
            <td colspan="2">
              <div class="radio flex-div">
                <v-radio-group v-model="advertisingProductOptionStoreType">
                  <v-radio label="모두허용" value="A"></v-radio>
                  <v-radio label="선택값고정" value="C"></v-radio>
                </v-radio-group>
                <div class="" v-if="advertisingProductOptionStoreType == 'C'">
                  <pull-down-multi
                    ref="pullDownMulti"
                    :data="advertisingProductOptionStoreTypeChoice"
                    :code="'SYS21A15B012'"
                    @selected="storeProp"
                    class="pull-down multi"
                    :onlySelectPullDown="true"
                  >
                  </pull-down-multi>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>* 튠스토어리스트</td>
            <td colspan="2">
              <div class="radio flex-div">
                <v-radio-group v-model="advertisingProductOptionStoreList">
                  <v-radio label="모두허용" value="A"></v-radio>
                  <v-radio label="선택값고정" value="C"></v-radio>
                </v-radio-group>
                <div class="tune-select-btn btn-group" v-if="advertisingProductOptionStoreList == 'C'">
                  <v-btn small color="primary" @click="showStoreListMultiModal">선택값설정</v-btn>
                  <v-btn small color="error" @click="initStoreList">초기화</v-btn>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="advertisingProductOptionStoreList == 'C'">
            <td></td>
            <td colspan="2">
              <div class="store-list">
                <div v-for="(item, index) in showAdvertisingProductOptionStoreListChoice" :key="index">
                  <span>{{ index + 1 }}.&nbsp;&nbsp;</span>
                  <!-- <span>{{ item.companyStoreCompanyName }}</span> -->
                  <!-- <span>&nbsp;/&nbsp;</span> -->
                  <span>{{ item.companyStoreName }}</span>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- 얼럿 -->
        <alim class="" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import PullDownMulti from "@/components/form/PullDownMulti.vue";
import locationModal from "@/components/modal/common/Location.vue";
import storeListMultiModal from "@/components/modal/common/StoreListMulti.vue";
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { getPopupOpt } from "@/utils/modal";
import { mapGetters } from "vuex";
export default {
  components: { modalWrap, PullDownMulti, alim },
  mixins: [loading, alimMixin],
  props: ["advertisingProductSid", "advertisingProductName"],
  data() {
    return {
      isWatching: true,

      advertisingProductTransSid: "",
      advertisingProductOptionContentFlag: "", // 컨탠츠 유무(A:모두허용,T:있음허용,F:없음허용) *

      advertisingProductOptionArea: "", // 지역(모든범위허용:A,선택값고정:C) *
      advertisingProductOptionAreaChoice: "", // 지역 리스트(멀티등록 ','로구분)
      showAdvertisingProductOptionAreaChoice: [], // 보여줄 지역리스트

      advertisingProductOptionGrade: "", // 등급(모든범위허용:A,선택값고정:C) *
      advertisingProductOptionGradeChoice: "", // 등급 코드(멀티등록 ','로구분)
      advertisingProductOptionGradeChoiceName: [], // 등급 코드이름

      advertisingProductOptionSlot: "", // 슬롯수(모든범위허용:A,선택값고정:C) *
      advertisingProductOptionSlotCount: 0, // 슬롯수 *

      advertisingProductOptionStoreType: "", // 희망스토어 업종(모든범위허용:A,선택값고정:C) *
      advertisingProductOptionStoreTypeChoice: "", // 희망스토어(멀티등록 ','로구분)
      advertisingProductOptionStoreTypeChoiceName: [], // 희망스토어이름(멀티등록 ','로구분)

      advertisingProductOptionStoreList: "", // 스토어 리스트(모든범위허용:A,선택값고정:C) *
      advertisingProductOptionStoreListChoice: "", // 스토어리스트(멀티등록 ','로구분)
      showAdvertisingProductOptionStoreListChoice: [], // 보여줄스토어리스트
    };
  },
  computed: {
    ...mapGetters("product", ["productTransTransOptionDetail", "productTransTransOptionAdd"]),
  },
  mounted() {
    this.getOption();
  },
  methods: {
    close() {
      this.$emit("close");
    },

    // 멀티 pull down
    gradeProp(data) {
      let selectSids = [];
      let selectNames = [];
      data.forEach(ele => {
        selectSids = [...selectSids, ele.sysCodeSid];
        selectNames = [...selectNames, ele.sysCodeName];
      });
      this.advertisingProductOptionGradeChoice = selectSids.join();
      this.advertisingProductOptionGradeChoiceName = selectNames;
    },
    // 멀티 pull down
    storeProp(data) {
      let selectSids = [];
      data.forEach(ele => {
        selectSids = [...selectSids, ele.sysCodeSid];
      });
      this.advertisingProductOptionStoreTypeChoice = selectSids.join();
    },

    // 지역선택 모달
    showLocationModal() {
      this.$modal.show(locationModal, { update: this.locationUpdate }, getPopupOpt("locationModal", "1000px", "auto", false));
    },
    locationUpdate(data) {
      if (data.length == 0 || data == null) return;

      let arr = [];
      data.forEach(item => {
        if (item.gudongliCode != "" && item.gudongliCode != null) {
          arr = [...arr, item.gudongliCode];
        } else if (item.sigunCode != "" && item.sigunCode != null) {
          arr = [...arr, item.sigunCode];
        } else if (item.sidoCode != "" && item.sidoCode != null) {
          arr = [...arr, item.sidoCode];
        }
      });

      this.showAdvertisingProductOptionAreaChoice = [...this.showAdvertisingProductOptionAreaChoice, ...data];
      this.advertisingProductOptionAreaChoice += this.advertisingProductOptionAreaChoice == "" ? arr.join() : `,${arr.join()}`;
    },
    initLocations() {
      this.showAdvertisingProductOptionAreaChoice = [];
      this.advertisingProductOptionAreaChoice = "";
    },

    // 튠스토어리스트 모달
    showStoreListMultiModal() {
      this.$modal.show(storeListMultiModal, { update: this.storeListMultiUpdate }, getPopupOpt("storeListMultiModal", "1200px", "auto", false));
    },
    storeListMultiUpdate(data) {
      if (data.length == 0 || data == null) return;

      let arr = [];
      data.forEach(item => {
        arr = [...arr, item.companyStoreSid];
      });

      this.showAdvertisingProductOptionStoreListChoice = [...this.showAdvertisingProductOptionStoreListChoice, ...data];
      this.advertisingProductOptionStoreListChoice += this.advertisingProductOptionStoreListChoice == "" ? arr.join() : `,${arr.join()}`;
    },
    initStoreList() {
      this.showAdvertisingProductOptionStoreListChoice = [];
      this.advertisingProductOptionStoreListChoice = "";
    },
    async getOption() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCTTRANS_OPTION_DETAIL", this.advertisingProductSid);

        const res = this.productTransTransOptionDetail.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }
        if (res.advertisingProductTrans === null) {
          bus.$emit("end:spinner");
          return;
        }

        const data = res.advertisingProductTrans;
        this.advertisingProductTransSid = data.advertisingProductTransSid;
        this.advertisingProductOptionContentFlag = data.advertisingProductOptionContentFlag;

        this.advertisingProductOptionArea = data.advertisingProductOptionArea;
        this.advertisingProductOptionAreaChoice = data.advertisingProductOptionAreaChoice;
        this.showAdvertisingProductOptionAreaChoice = data.advertisingProductOptionAreaChoiceList;

        this.advertisingProductOptionGrade = data.advertisingProductOptionGrade;
        this.advertisingProductOptionGradeChoice = data.advertisingProductOptionGradeChoice;
        this.advertisingProductOptionGradeChoiceName = data.advertisingProductOptionGradeChoiceList.map(item => item.sysCodeName);

        this.advertisingProductOptionSlot = data.advertisingProductOptionSlot;
        this.advertisingProductOptionSlotCount = data.advertisingProductOptionSlotCount;
        this.advertisingProductOptionStoreType = data.advertisingProductOptionStoreType;

        this.advertisingProductOptionStoreTypeChoice = data.advertisingProductOptionStoreTypeChoice;
        this.advertisingProductOptionStoreTypeChoiceName = data.advertisingProductOptionStoreTypeChoiceList.map(item => item.sysCodeName);

        this.advertisingProductOptionStoreList = data.advertisingProductOptionStoreList;
        this.advertisingProductOptionStoreListChoice = data.advertisingProductOptionStoreListChoice;
        this.showAdvertisingProductOptionStoreListChoice = data.advertisingProductOptionStoreListChoiceList;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    // 저장
    async save() {
      if (this.advertisingProductOptionContentFlag == "") {
        this.alim("컨텐츠유무를 선택하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionArea == "") {
        this.alim("지역을 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductOptionArea == "C" && this.advertisingProductOptionAreaChoice == "") {
        this.alim("지역 선택값을 설정하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionGrade == "") {
        this.alim("등급을 설정하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionGrade == "C" && this.advertisingProductOptionGradeChoice == "") {
        this.alim("등급 선택값을 설정하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionSlot == "") {
        this.alim("슬롯수을 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductOptionSlot == "C" && this.advertisingProductOptionSlotCount == "") {
        this.alim("슬롯수 선택값을 입력하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionStoreType == "") {
        this.alim("희망스토어업종을 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductOptionStoreType == "C" && this.advertisingProductOptionStoreTypeChoice == "") {
        this.alim("희망스토어업종 선택값을 설정하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductOptionStoreList == "") {
        this.alim("튠스토어리스트를 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductOptionStoreList == "C" && this.advertisingProductOptionStoreListChoice == "") {
        this.alim("튠스토어리스트 선택값을 설정하세요.", this.errorColor);
        return false;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCTTRANS_OPTION_ADD", {
          advertisingProductSid: this.advertisingProductSid,
          advertisingProductOptionContentFlag: this.advertisingProductOptionContentFlag,
          advertisingProductOptionArea: this.advertisingProductOptionArea,
          advertisingProductOptionAreaChoice: this.advertisingProductOptionArea == "A" ? "" : this.advertisingProductOptionAreaChoice,
          advertisingProductOptionGrade: this.advertisingProductOptionGrade,
          advertisingProductOptionGradeChoice: this.advertisingProductOptionGrade == "A" ? "" : this.advertisingProductOptionGradeChoice,
          advertisingProductOptionSlot: this.advertisingProductOptionSlot,
          advertisingProductOptionSlotCount: this.advertisingProductOptionSlot == "A" ? "" : this.advertisingProductOptionSlotCount,
          advertisingProductOptionStoreType: this.advertisingProductOptionStoreType,
          advertisingProductOptionStoreTypeChoice: this.advertisingProductOptionStoreType == "A" ? "" : this.advertisingProductOptionStoreTypeChoice,
          advertisingProductOptionStoreList: this.advertisingProductOptionStoreList,
          advertisingProductOptionStoreListChoice: this.advertisingProductOptionStoreList == "A" ? "" : this.advertisingProductOptionStoreListChoice,
        });

        const res = this.productTransTransOptionAdd.channeltuneApiResult;
        if (res.errorCode != 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("광고상품옵션이 저장되었습니다.", this.successColor);
        await this.getOption();
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
.header {
  display: flex;
  justify-content: space-between;
}

.btn-group {
  & button {
    margin-left: 5px;
  }
}

.location-list,
.store-list {
  border: 1px solid #aaaaaa;
  padding: 20px;
  height: 100px;
  overflow-y: scroll;
}

.pull-down {
  width: 150px;
}

.flex-div {
  display: flex;
  justify-content: space-between;
}
</style>
