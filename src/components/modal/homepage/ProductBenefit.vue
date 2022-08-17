<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header v-application">
        <h1>광고상품 혜택 설정</h1>
        <div class="btn-group mr20">
          <v-btn small color="warning" @click="save">저장</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="border">
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
            <td>상품</td>
            <td class="field-div" colspan="2">
              <input type="text" class="input-first" readonly v-model="advertisingProductSid" />
              <input type="text" class="input-last" readonly v-model="advertisingProductName" />
            </td>
          </tr>
        </table>

        <div class="top v-application">
          <div>
            <h4>혜택선택</h4>
            <div class="radio mt10">
              <div class="row">
                <v-radio-group v-model="advertisingProductBenefitChoice" class="first">
                  <v-radio label="가격" value="M"></v-radio>
                </v-radio-group>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'M'">
                  <input type="number" class="pl10" v-model="advertisingProductBenefitChoiceVal" placeholder="가격(원)을 입력하세요" />
                </div>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'M'">
                  <v-select
                    v-model="advertisingProductBenefitChoiceAbove"
                    item-text="key"
                    item-value="value"
                    :items="vSelectItems"
                    label="구매시"
                  ></v-select>
                </div>
              </div>

              <div class="row mt0">
                <v-radio-group v-model="advertisingProductBenefitChoice" class="first">
                  <v-radio label="스토어" value="T"></v-radio>
                </v-radio-group>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'T'">
                  <input type="number" class="pl10" v-model="advertisingProductBenefitChoiceVal" placeholder="갯수(개)를 입력하세요" />
                </div>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'T'">
                  <v-select
                    v-model="advertisingProductBenefitChoiceAbove"
                    item-text="key"
                    item-value="value"
                    :items="vSelectItems"
                    label="구매시"
                  ></v-select>
                  <!-- <pull-down :data="advertisingProductBenefitChoiceAbove" :code="1" @selected="selectBenefit" class="pull-down"></pull-down> -->
                </div>
              </div>

              <div class="row mt0">
                <v-radio-group v-model="advertisingProductBenefitChoice" class="first">
                  <v-radio label="슬롯" value="S"></v-radio>
                </v-radio-group>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'S'">
                  <input type="number" class="pl10" v-model="advertisingProductBenefitChoiceVal" placeholder="갯수(개)를 입력하세요" />
                </div>
                <div class="button-group" v-if="advertisingProductBenefitChoice == 'S'">
                  <v-select
                    v-model="advertisingProductBenefitChoiceAbove"
                    item-text="key"
                    item-value="value"
                    :items="vSelectItems"
                    label="구매시"
                  ></v-select>
                  <!-- <pull-down :data="advertisingProductBenefitChoiceAbove" :code="1" @selected="selectBenefit" class="pull-down"></pull-down> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom v-application">
          <div>
            <h4>혜택</h4>
            <div class="radio">
              <div class="">
                <v-radio-group v-model="advertisingProductBenefitKind" class="first">
                  <v-radio label="가격할인" value="S"></v-radio>
                </v-radio-group>

                <div class="sub-wrapper" v-if="advertisingProductBenefitKind == 'S'">
                  <div class="row mt0">
                    <v-radio-group v-model="advertisingProductBenefitKindSale" class="first">
                      <v-radio label="%(비율)" value="R"></v-radio>
                    </v-radio-group>
                    <div class="button-group" v-if="advertisingProductBenefitKindSale == 'R'">
                      <input type="number" class="pl10" v-model="advertisingProductBenefitKindSaleVal" placeholder="%를 입력하세요" />
                    </div>
                  </div>
                  <div class="row mt0">
                    <v-radio-group v-model="advertisingProductBenefitKindSale" class="first">
                      <v-radio label="원(가격)" value="S"></v-radio>
                    </v-radio-group>
                    <div class="button-group" v-if="advertisingProductBenefitKindSale == 'S'">
                      <input type="number" class="pl10" v-model="advertisingProductBenefitKindSaleVal" placeholder="가격(원)을 입력하세요" />
                    </div>
                  </div>
                  <div class="row mt0">
                    <v-radio-group v-model="advertisingProductBenefitKindSale" class="first">
                      <v-radio label="고정가격판매" value="P"></v-radio>
                    </v-radio-group>
                    <div class="button-group" v-if="advertisingProductBenefitKindSale == 'P'">
                      <input type="number" class="pl10" v-model="advertisingProductBenefitKindSaleVal" placeholder="원 으로 고정 판매" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt10">
                <v-radio-group v-model="advertisingProductBenefitKind" class="first">
                  <v-radio label="증정" value="G"></v-radio>
                </v-radio-group>

                <div class="sub-wrapper" v-if="advertisingProductBenefitKind == 'G'">
                  <div class="row mt0">
                    <v-radio-group v-model="advertisingProductBenefitKindGift" class="first">
                      <v-radio label="슬롯" value="S"></v-radio>
                    </v-radio-group>
                    <div class="button-group" v-if="advertisingProductBenefitKindGift == 'S'">
                      <input type="number" class="pl10" v-model="advertisingProductBenefitKindGiftVal" placeholder="개 증정" />
                    </div>
                  </div>
                  <div class="row mt0">
                    <v-radio-group v-model="advertisingProductBenefitKindGift" class="first">
                      <v-radio label="스토어" value="T"></v-radio>
                    </v-radio-group>
                    <div
                      class="button-group v-application"
                      v-if="advertisingProductBenefitKindGift == 'T'"
                      style="display: flex; align-items: center"
                    >
                      <input type="number" class="pl10" v-model="advertisingProductBenefitKindGiftVal" placeholder="개 증정" />
                      <v-btn small color="primary" @click="showStoreListMultiModal" style="margin-left: 30px">선택값 설정</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="list" v-if="advertisingProductBenefitKindGift == 'T'">
            <div v-if="showAdvertisingProductBenefitKindGiftStoreList.length < 1" style="text-align: center">선택한 스토어가 없습니다</div>
            <div v-for="(item, index) in showAdvertisingProductBenefitKindGiftStoreList" :key="index">
              <span>{{ index + 1 }}. </span><span>{{ item.companyStoreName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 얼럿 -->
      <alim class="v-application" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import storeListMultiModal from "@/components/modal/common/StoreListMulti.vue";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { modalWrap, alim },
  mixins: [alimMixin, loading],
  props: ["advertisingProductSid", "advertisingProductName"],
  data() {
    return {
      vSelectItems: [
        {
          key: "이상",
          value: "H",
        },
        {
          key: "일치",
          value: "E",
        },
      ],

      advertisingProductTransSid: "",
      advertisingProductBenefitChoice: "", // 혜택선택(가격:M,스토어:T,슬롯:S) *
      advertisingProductBenefitChoiceVal: "", // 혜택값 *
      advertisingProductBenefitChoiceAbove: "", // 혜택값(이상:H,일치:E) *

      advertisingProductBenefitKind: "", // 혜택내용(가격할인:S,증정:G) *

      advertisingProductBenefitKindSale: "", // 가격할인 내용(비율:R,가격할인:S,고정가격:P)
      advertisingProductBenefitKindSaleVal: "", // 가격할인 값 *

      advertisingProductBenefitKindGift: "", // 증정(슬롯:S,스토어:T)
      advertisingProductBenefitKindGiftVal: "", // 증정값
      advertisingProductBenefitKindGiftStoreList: "", // 증정스토어 리스트
      showAdvertisingProductBenefitKindGiftStoreList: [], // 보여줄 증정스토어 리스트
    };
  },
  computed: {
    ...mapGetters("product", ["productTransTransOptionDetail", "productTransTransBenefitAdd"]),
  },
  watch: {
    advertisingProductBenefitKind(v) {
      switch (v) {
        case "G":
          this.advertisingProductBenefitKindSale = "";
          this.advertisingProductBenefitKindSaleVal = "";
          break;
        case "S":
          this.advertisingProductBenefitKindGift = "";
          this.advertisingProductBenefitKindGiftVal = "";
          this.advertisingProductBenefitKindGiftStoreList = "";
          this.showAdvertisingProductBenefitKindGiftStoreList = [];
          break;
      }
    },
  },
  mounted() {
    this.getBenefit();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    showStoreListMultiModal() {
      this.$modal.show(storeListMultiModal, { update: this.storeListMultiUpdate }, getPopupOpt("storeListMultiModal", "1200px", "auto", false));
    },
    storeListMultiUpdate(data) {
      if (data.length == 0 || data == null) return;
      let sid = data.map(i => i.companyStoreSid).join();
      this.advertisingProductBenefitKindGiftStoreList += this.advertisingProductBenefitKindGiftStoreList == "" ? sid : `,${sid}`;
      this.showAdvertisingProductBenefitKindGiftStoreList = [...this.showAdvertisingProductBenefitKindGiftStoreList, ...data];
    },
    async getBenefit() {
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
        this.advertisingProductBenefitChoice = data.advertisingProductBenefitChoice;
        this.advertisingProductBenefitChoiceVal = data.advertisingProductBenefitChoiceVal;
        this.advertisingProductBenefitChoiceAbove = data.advertisingProductBenefitChoiceAbove;

        this.advertisingProductBenefitKind = data.advertisingProductBenefitKind;

        this.advertisingProductBenefitKindSale = data.advertisingProductBenefitKindSale;
        this.advertisingProductBenefitKindSaleVal = data.advertisingProductBenefitKindSaleVal;

        this.advertisingProductBenefitKindGift = data.advertisingProductBenefitKindGift;
        this.advertisingProductBenefitKindGiftVal = data.advertisingProductBenefitKindGiftVal;
        this.advertisingProductBenefitKindGiftStoreList = data.advertisingProductBenefitKindGiftStoreList;
        this.showAdvertisingProductBenefitKindGiftStoreList = data.advertisingProductBenefitKindGiftStoreListList;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async save() {
      if (this.advertisingProductBenefitChoice === "") {
        this.alim("혜택을 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductBenefitChoiceVal === "") {
        this.alim("혜택값을 입력하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductBenefitChoiceAbove === "") {
        this.alim("혜택값을 선택하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductBenefitKind === "") {
        this.alim("혜택내용을 선택하세요.", this.errorColor);
        return false;
      }
      if (this.advertisingProductBenefitKind === "S" && this.advertisingProductBenefitKindSale == "") {
        this.alim("가격할인항목을 선택하세요.", this.errorColor);
        return false;
      }
      if (
        this.advertisingProductBenefitKind === "S" &&
        this.advertisingProductBenefitKindSale !== "" &&
        this.advertisingProductBenefitKindSaleVal === ""
      ) {
        this.alim("가격할인항목값을 입력하세요.", this.errorColor);
        return false;
      }

      if (this.advertisingProductBenefitKind === "G" && this.advertisingProductBenefitKindGift === "") {
        this.alim("증정항목을 선택하세요.", this.errorColor);
        return false;
      }
      if (
        this.advertisingProductBenefitKind == "G" &&
        this.advertisingProductBenefitKindGift != "" &&
        this.advertisingProductBenefitKindGiftVal == ""
      ) {
        this.alim("증정항목값을 입력하세요.", this.errorColor);
        return false;
      }
      if (
        this.advertisingProductBenefitKind == "G" &&
        this.advertisingProductBenefitKindGift == "T" &&
        this.advertisingProductBenefitKindGiftStoreList == ""
      ) {
        this.alim("증정항목 스토어를 선택하세요.", this.errorColor);
        return false;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("product/PRODUCTTRANS_BENEFIT_ADD", {
          advertisingProductSid: this.advertisingProductSid,
          advertisingProductBenefitChoice: this.advertisingProductBenefitChoice,
          advertisingProductBenefitChoiceVal: this.advertisingProductBenefitChoiceVal,
          advertisingProductBenefitChoiceAbove: this.advertisingProductBenefitChoiceAbove,
          advertisingProductBenefitKind: this.advertisingProductBenefitKind,
          advertisingProductBenefitKindSale: this.advertisingProductBenefitKindSale,
          advertisingProductBenefitKindSaleVal: this.advertisingProductBenefitKindSaleVal,
          advertisingProductBenefitKindGift: this.advertisingProductBenefitKindGift,
          advertisingProductBenefitKindGiftVal: this.advertisingProductBenefitKindGiftVal,
          advertisingProductBenefitKindGiftStoreList:
            this.advertisingProductBenefitKindGift == "T" ? this.advertisingProductBenefitKindGiftStoreList : "",
        });

        const res = this.productTransTransBenefitAdd.channeltuneApiResult;
        if (res.errorCode != 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.alim("광고상품혜택설정이 저장되었습니다.", this.successColor);
        await this.getBenefit();
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

.top,
.bottom {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;

  & h3 {
    margin-bottom: 10px;
  }
}

.pull-down {
  display: inline-block;
}

.radio {
  & .row {
    display: flex;
    align-items: center;
    & .first {
      width: 100px;
      height: 40px;
      padding-top: 10px;
    }

    & .pull-down {
      width: 200px;
    }

    & div {
      margin-right: 15px;
    }

    & input {
      border: 1px solid #ccc !important;
      width: 150px;
      height: 30px;
    }
  }
}

.bottom {
  & .sub-wrapper {
    margin-left: 100px;
  }
}

.list {
  margin-top: 10px;
  padding: 20px;
  border: 1px dotted #ccc;
  width: 200px;
  max-height: 150px;
  overflow: auto;
}
::v-deep {
  & .v-text-field__details {
    display: none;
  }
  & .v-messages {
    display: none;
  }
  & .v-select__slot {
    border: 1px solid #ccc !important;
  }
  & .v-input__slot {
    &:before {
      border: 0 !important;
    }
    & .v-select__selection--comma {
      font-size: 1.2rem !important;
      margin: 0 10px !important;
    }
  }
  & .v-select__slot {
    & .v-label {
      top: -2px;
    }
  }
}
</style>
