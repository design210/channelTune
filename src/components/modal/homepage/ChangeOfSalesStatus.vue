<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>판매상태 변경</h2>
    </template>
    <template slot="body">
      <div>
        <section class="info-box v-application">
          <div>
            <h2>광고 취소</h2>
            <ul>
              <li>광고 집행일 제외 2주 이전(11영업일 전)까지는 자유롭게 광고 취소 가능</li>
              <li>단, 광고 집행일 기준 2주(10영업일)이내 취소 요청 할 경우 광고비의 10% 위약금 발생</li>
              <li>광고 송출 이후에는 취소 환불이 불가합니다.</li>
            </ul>
            <h2 class="mt10">환불 기준</h2>
            <ul>
              <li>
                광고 집행(송출)일 2주 이전(11영업일 전) 취소 시 광고비의 100% 환불 <br />
                - 근거 : 광고 집행일 2주 전 광고 편성 시작
              </li>
              <li>단, 광고 집행일 기준 2주(10영업일)이내 취소 요청이 있는 경우 광고비의 10% 위약금이 발생함에 따라 광고비의 90% 환불</li>
              <li>최종 환불 금액은 백원 단위 절사 적용된 금액입니다.</li>
            </ul>
          </div>
          <div>
            <h2>가. 기본 환불 규정</h2>
            <ol>
              <li>자사와 의뢰인의 상호 협의하에 철회 및 환불이 가능합니다.</li>
              <li>섭외, 대여 등 사전 준비 도중 청약 철회 시, 해당 비용을 공제한 금액을 환불 가능합니다.</li>
              <li>촬영 또는 편집 작업 착수 이후 청약 철회 시, 진행된 작업량 또는 작업 일수를 산정한 금액을 공제한 금액을 환불 가능합니다.</li>
            </ol>
            <h3 class="mt20">[ 환불 가이드라인 ]</h3>
            <p>기획 단계에서 철회 : 총 결제 금액의 80% 환불 가능</p>
            <p>촬영 착수 후 철회 : 총 결제 금액의 40% 환불 가능</p>
            <p>편집 진행 중 철회 : 총 결제 금액의 20% 환불 가능</p>
            <p>시안 제출 후 청약 철회 : 환불 불가</p>
            <h2 class="mt20">나. 자사 책임 사유</h2>
            <ol>
              <li>소비자 피해 보상 규정에 의거하여 촬영 원본의 멸실 및 재해로 인한 피해 발생 시, 전액 환불합니다.</li>
              <li>작업 기간 미준수, 작업 태만 및 이에 상응하는 전문가 책임으로 인한 철회 시, 환불 및 촬영 원본 제공이 가능합니다.</li>
            </ol>
            <h2 class="mt20">다. 의뢰인 책임 사유</h2>
            <p>작업이 시작되면 단순 변심 또는 의뢰인 책임 사유로 인한 전액 환불이 불가능합니다</p>
          </div>
        </section>
        <section class="data-wrap v-application">
          <div>
            <table class="tbl-reg column2 mt20">
              <colgroup>
                <col width="80" />
                <col width="*" />
                <col width="80" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <td>고유코드</td>
                  <td><input type="text" readonly :value="buyInfo.buySid" /></td>
                  <td>매출일시</td>
                  <td><input type="text" readonly :value="buyInfo.buyDateTime" /></td>
                </tr>
                <tr>
                  <td>회원정보</td>
                  <td colspan="3" class="input-group">
                    <input type="text" readonly :value="buyInfo.homepageUserSid" />
                    <input type="text" readonly :value="buyInfo.homepageUserName" />
                    <input type="text" readonly :value="buyInfo.homepageUserEmail" />
                  </td>
                </tr>
                <tr>
                  <td>결제정보</td>
                  <td colspan="3" class="buy-input-group">
                    <input type="text" readonly :value="buyInfo.buyKindName" />
                    <input type="text" readonly :value="buyInfo.buyPaymentKindName" />
                    <input type="text" readonly :value="buyInfo.buyStatusName" />
                  </td>
                </tr>
                <tr>
                  <td>결제그룹상품명</td>
                  <td colspan="3">
                    <input type="text" readonly :value="buyInfo.buyGoodName" />
                  </td>
                </tr>
                <tr>
                  <td>판매금액</td>
                  <td><input type="text" readonly :value="buyInfo.buyPrice !== undefined ? buyInfo.buyPrice.toLocaleString() : ''" /></td>
                  <td>입금기한</td>
                  <td><input type="text" readonly :value="buyInfo.buyDepositLimit" /></td>
                </tr>
              </tbody>
            </table>
            <section class="item-wrap mt35">
              <div class="v-application head">
                <h2>항목</h2>
                <div>
                  <v-btn small color="primary" class="mr5" @click="save">저장</v-btn>
                  <v-btn small @click="clear">clear</v-btn>
                </div>
              </div>
              <table class="tbl-reg column2 mt10">
                <colgroup>
                  <col width="100" />
                  <col width="*" />
                  <col width="60" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>판매상태</td>
                    <td>
                      <pull-down
                        :data="buyStatusLogStatus"
                        :clear="clearField"
                        :code="statusCode"
                        @selected="levelProp"
                        class="pull-down w175"
                      ></pull-down>
                    </td>
                    <td>요청일시</td>
                    <td><date-time-picker :clear="clearField" @date="startDay" class="date-time"></date-time-picker></td>
                  </tr>
                  <tr>
                    <td>입금은행</td>
                    <td><input type="text" v-model="buyStatusLogDepositBank" placeholder="(계좌번호  은행  예금주)" /></td>
                    <td>완료일시</td>
                    <td><date-time-picker :clear="clearField" @date="endDay" class="date-time"></date-time-picker></td>
                  </tr>
                  <tr>
                    <td>결제/환불/취소금액</td>
                    <td>
                      <input type="number" v-model="buyStatusLogPrice" />
                    </td>
                    <td>{{ nameToggle }}</td>
                    <td v-if="buyStatusLogStatus !== 'SYS21B19B006'"><date-time-picker :clear="clearField" @date="limitDay" class="date-time" /></td>
                    <td v-else>
                      <pull-down
                        v-model="buyStatusLogRefundPaymentKind"
                        code="SYS21B22B029"
                        @selected="RefundMethodProp"
                        class="pull-down"
                        :hiddenToggle="true"
                        :hiddenops="['SYS21B22B033']"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>메모<br />(환불 계좌번호 등)</td>
                    <td colspan="3">
                      <textarea v-model="buyStatusLogEtc" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <div class="tbl-wrap">
            <table class="tbl mt20 user-list-tbl select-tbl">
              <caption>
                처리정보
              </caption>
              <colgroup>
                <col width="100" />
                <col width="100" />
                <col width="*" />
                <col width="*" />
                <col width="80" />
              </colgroup>
              <thead>
                <tr>
                  <th>고유코드</th>
                  <th>판매상태</th>
                  <th>요청일시</th>
                  <th>처리일시</th>
                  <th>처리자</th>
                </tr>
              </thead>
              <tbody v-if="buyStatusLogList.length > 0">
                <tr
                  v-for="item in buyStatusLogList"
                  :key="item.buyStatusLogSid"
                  @click="__showModalTemplate(require('@/components/modal/homepage/BuyStatusDetail.vue'), { id: item.buyStatusLogSid }, 700)"
                >
                  <td>{{ item.buySid }}</td>
                  <td>{{ item.buyStatusLogStatusName }}</td>
                  <td>{{ item.buyStatusLogStartDateTime }}</td>
                  <td>{{ item.buyStatusLogEndDateTime }}</td>
                  <td>{{ item.buyStatusLogAdminName }}</td>
                </tr>
              </tbody>
              <tfoot v-else>
                <tr>
                  <td colspan="5" class="center">항목이 없습니다.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
        <!-- 알럿 -->
        <div class="v-application"><alim :modalClose="closeModal" :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim></div>
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
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import DateTimePicker from "@/components/form/DateTimePicker";
import modalMixin from "@/mixins/showModal";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { modalWrap, PullDown, alim, DateTimePicker },
  mixins: [alimMixin, modalMixin, loading],
  props: ["buySid"],

  data() {
    return {
      clearField: false,
      buyInfo: {
        buyDateTime: "",
      },
      buyStatusLogList: [],
      buyStatusLogStatus: "",
      buyStatusLogStatusName: "",
      statusCode: "SYS21B19B002",
      buyStatusLogPrice: "",
      buyStatusLogStartDateTime: "",
      buyStatusLogEndDateTime: "",
      buyStatusLogEtc: "",
      buyStatusLogDepositBank: "",
      buyStatusLogDepositLimit: "",
      buyStatusLogRefundPaymentKind: "",
      buyStatusLogRefundPaymentKindName: "",
    };
  },
  computed: {
    ...mapGetters("sales", ["getSalesStatus", "setSalesStatus"]),
    nameToggle() {
      return this.buyStatusLogStatus !== "SYS21B19B006" ? "입금기한" : "환불방식";
    },
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/SALES_STATUS", this.buySid);
        if (this.getSalesStatus.channeltuneApiResult.errorCode == 200) {
          this.buyInfo = this.getSalesStatus.channeltuneApiResult.buyStatusLog.buyInfo;
          this.buyStatusLogStatus = this.buyInfo.buyStatus;
          this.buyStatusLogStatusName = this.buyInfo.buyStatusName;
          this.buyStatusLogList = this.getSalesStatus.channeltuneApiResult.buyStatusLog.buyStatusLogList;
          this.buyInfo.buyDateTime = this.$date(this.buyInfo.buyDateTime).local().format("YYYY-MM-DD HH:mm:ss");
          this.buyInfo.buyDepositLimit = this.$date(this.buyInfo.buyDepositLimit).local().format("YYYY-MM-DD HH:mm:ss");
          this.buyStatusLogList.forEach(ele => {
            ele.buyStatusLogStartDateTime = this.$date(ele.buyStatusLogStartDateTime).local().format("YYYY-MM-DD HH:mm:ss");
            ele.buyStatusLogEndDateTime = this.$date(ele.buyStatusLogEndDateTime).local().format("YYYY-MM-DD HH:mm:ss");
          });
        } else {
          this.alim(this.getSalesStatus.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      if (this.closeModal === true) {
        this.$attrs.update(this.sid);
      }
      this.$emit("close");
    },
    levelProp(data) {
      this.buyStatusLogStatus = data.sysCodeSid;
      this.buyStatusLogStatusName = data.sysCodeName;
    },
    RefundMethodProp(data) {
      this.buyStatusLogRefundPaymentKind = data.sysCodeSid;
      this.buyStatusLogRefundPaymentKindName = data.sysCodeName;
    },
    startDay(date) {
      this.buyStatusLogStartDateTime = date;
    },
    endDay(date) {
      this.buyStatusLogEndDateTime = date;
    },
    limitDay(date) {
      this.buyStatusLogDepositLimit = date;
    },
    async save() {
      if (this.buyStatusLogStatus === "") {
        this.alim("판매상태를 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogStartDateTime === "") {
        this.alim("요청일시를 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogDepositBank === "") {
        this.alim("입금은행과 계좌번호를 입력해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogEndDateTime === "") {
        this.alim("완료일시를 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogPrice === "") {
        this.alim("환불취소금액을 입력해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogStatus !== "SYS21B19B006" && this.buyStatusLogDepositLimit === "") {
        this.alim("입금기한을 선택해 주세요", this.errorColor);
        return false;
      }
      if (this.buyStatusLogStatus === "SYS21B19B006" && this.buyStatusLogRefundPaymentKindName === "") {
        this.alim("환불방식을 선택해 주세요", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("sales/SET_SALES_STATUS", {
          buySid: this.buyInfo.buySid,
          buyStatusLogStatus: this.buyStatusLogStatus,
          buyStatusLogStartDateTime: this.$date(this.buyStatusLogStartDateTime).utc(),
          buyStatusLogEndDateTime: this.$date(this.buyStatusLogEndDateTime).utc(),
          buyStatusLogDepositLimit: this.$date(this.buyStatusLogDepositLimit).utc(),
          buyStatusLogPrice: this.buyStatusLogPrice,
          buyStatusLogDepositBank: this.buyStatusLogDepositBank,
          buyStatusLogEtc: this.buyStatusLogEtc,
          buyStatusLogRefundPaymentKind: this.buyStatusLogRefundPaymentKind,
        });
        if (this.setSalesStatus.channeltuneApiResult.errorCode === 200) {
          this.alim("저장 되었습니다.", this.successColor);
          this.reload();
        } else {
          this.alim(this.setSalesStatus.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    clear() {
      this.clearField = !this.clearField;
      this.buyStatusLogStatus = "";
      this.buyStatusLogPrice = "";
      this.buyStatusLogEtc = "";
    },
  },
};
</script>

<style lang="scss">
.modal-wrap {
  overflow-y: visible !important;
}
.info-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  overflow-y: auto;
  height: 250px;
  & > div {
    width: calc(50% - 20px);
    & h2 {
      font-size: 1.5rem;
    }
    & h3 {
      font-size: 1.3rem;
    }
    & ul {
      margin-top: 5px;
      & li {
        position: relative;
        padding-left: 10px;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #333;
        }
      }
    }
    & ol {
      margin-top: 5px;
      & li {
        position: relative;
        padding-left: 12px;
        &:nth-child(1) {
          &:before {
            content: "1. ";
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        &:nth-child(2) {
          &:before {
            content: "2. ";
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        &:nth-child(3) {
          &:before {
            content: "3. ";
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
}
.data-wrap {
  display: flex;
  justify-content: space-between;
  & > div {
    width: calc(50% - 20px);
    & .input-group {
      & input {
        &:nth-child(1) {
          width: 60px !important;
        }
        &:nth-child(2) {
          width: 100px !important;
          margin: 0 5px;
        }
        &:nth-child(3) {
          width: calc(100% - 170px) !important;
        }
      }
    }
    & .buy-input-group {
      & input {
        &:nth-child(1) {
          width: calc(100% - 260px) !important;
        }
        &:nth-child(2) {
          width: 150px !important;
          margin: 0 5px;
        }
        &:nth-child(3) {
          width: 100px !important;
        }
      }
    }
  }
}
.item-wrap {
  & .head {
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }
}
.tbl-wrap {
  height: 483px;
  overflow-y: auto;
}
</style>
