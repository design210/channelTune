<template>
  <!-- TUNE 이벤트 현황 확인 페이지 작업중 -->
  <section class="container">
    <div class="title-wrap">
      <h1>Tune 이벤트</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>TUNE 이벤트</h2>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <colgroup>
              <col width="80" />
              <col width="*" />
              <col width="80" />
              <col width="80" />
              <col width="60" />
            </colgroup>
            <caption>
              튠 이벤트 테이블
            </caption>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>Title</th>
                <th>중복체크</th>
                <th>당첨여부</th>
                <th>Hit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="getEventDetailInfo(item.tuneEventMasterSid)">
                <td>{{ item.tuneEventMasterSid }}</td>
                <td class="left">{{ item.tuneEventMasterTitle }}</td>
                <td>{{ item.tuneEventMasterIpAddressFlag }}</td>
                <td>{{ item.tuneEventMasterWinFlag }}</td>
                <td>{{ item.tuneEventMasterHit }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="10"></v-pagination>
          </div>
        </div>
      </section>

      <section class="init-wrap section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>설정</h2>
            <div class="btn-group">
              <v-btn v-if="file.length > 0" small color="primary" @click="fileTypeCheck(file[0].fileExt)">첨부파일 다운로드</v-btn>
              <v-btn small @click="clear">CLEAR</v-btn>
            </div>
          </div>
          <section class="top-section">
            <section class="left-section">
              <table width="100%" class="tbl-reg column2">
                <colgroup>
                  <col width="80" />
                  <col width="*" />
                  <col width="50" />
                  <col width="*" />
                  <col width="50" />
                  <col width="*" />
                  <col width="50" />
                  <col width="*" />
                </colgroup>
                <tr>
                  <td>이벤트 고유코드</td>
                  <td><input type="text" readonly :value="tuneEventMasterSid" /></td>
                  <td>고유코드</td>
                  <td>
                    <input type="text" readonly :value="tuneEventTransSid" />
                  </td>
                  <td>IP주소</td>
                  <td>
                    <input type="text" readonly :value="tuneEventTrans_ipAddress" />
                  </td>
                  <td>접속일시</td>
                  <td>
                    <input type="text" readonly :value="tuneEventTrans_dateTime" />
                  </td>
                </tr>
              </table>

              <div class="info_wrap" v-if="tuneEventParticipants !== null">
                <div v-for="(value, key) in tuneEventParticipants" :key="key" class="d-flex" style="width: 25%">
                  <span class="txt">{{ getColName(key) }}</span>
                  <div class="ipt_wrap"><input type="text" :value="value" readonly /></div>
                </div>
              </div>
            </section>
          </section>
          <table class="tbl mt20 user-list-tbl select-tbl" style="max-height: 500px !important">
            <thead>
              <tr>
                <th v-for="(value, key) in eventTitleList" :key="key">{{ value }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in eventParticipantsList" :key="idx" @click="getEvetParticipantsInfo(item.tuneEventTransSid)">
                <td>{{ item[sid] }}</td>
                <td v-for="(item2, idx2) in arr" :key="idx2">{{ item[item2] }}</td>
                <td>{{ item[ipaddr] }}</td>
                <td>{{ item[dateTime] }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mt10" v-if="eventParticipantsList.length > 0">
            <v-pagination v-model="TransPage" :length="transLen" :total-visible="10"></v-pagination>
          </div>
        </div>
      </section>
    </section>
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim.vue";
import deleteMixin from "@/mixins/delete.js";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  components: { alim },
  mixins: [fileUploadMixin, alimMixin, deleteMixin],
  props: ["size"],
  data() {
    return {
      page: 1,
      TransPage: 1,
      list: [],
      len: null,
      transLen: null,
      tuneEventTransSid: "",
      tuneEventMasterSid: "",
      tuneEventTrans_ipAddress: "",
      tuneEventTrans_dateTime: "",
      file: [],

      arr: [],
      tuneEventParticipants: {},

      col1: "tuneEventTrans_text",
      sid: "tuneEventTransSid",
      masterSid: "tuneEventMasterSid",
      ipaddr: "tuneEventTrans_ipAddress",
      dateTime: "tuneEventTrans_dateTime",

      eventParticipantsList: [], //참여자 리스트
      eventTitleList: {}, //타이틀 데이터
      eventDataList: [],
    };
  },
  computed: {
    ...mapGetters("event", ["getTuneEventList", "getTuneEventTransList", "getEventParticipantsInfo"]),
    getColName() {
      return val => {
        return this.eventTitleList[`${val}`];
      };
    },
  },
  watch: {
    TransPage() {
      this.getEventDetailInfo(this.tuneEventMasterSid);
    },
    page() {
      this.getTuneEventInfo();
    },
    size() {
      this.getTuneEventInfo();
    },
  },
  mounted() {
    this.getTuneEventInfo();
  },
  methods: {
    //초기 값 가져오기
    async getTuneEventInfo() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/GET_TUNE_ENENT_LIST", {
          page: this.page,
          size: this.size,
        });
        const res = this.getTuneEventList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.list = res.TuneEvent.data;
        this.tuneEventMasterSid = res.TuneEvent.data.tuneEventMasterSid;
        this.len = res.TuneEvent.last_page;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //이벤트 상세 값 가져오기
    async getEventDetailInfo(id) {
      this.tuneEventMasterSid = id;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/GET_TUNE_EVENT_TRANS_LIST", {
          page: this.TransPage,
          size: this.size,
          tuneEventMasterSid: id,
        });
        const res = this.getTuneEventTransList.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.transLen = res.TuneEvent.list.last_page;
        this.getTitleArr(res.TuneEvent.title);
        this.eventParticipantsList = this.getDataArr(res.TuneEvent.list.data);
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //참여자 정보 확인
    async getEvetParticipantsInfo(id) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/GET_TUNE_EVENT__PARTICIPANTS_INFO", id);
        const res = this.getEventParticipantsInfo.channeltuneApiResult;
        if (res.errorCode !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return;
        }
        this.file = res.TuneEvent.fileResult;
        this.tuneEventTransSid = res.TuneEvent.tuneEventTransSid;
        this.tuneEventTrans_dateTime = res.TuneEvent.tuneEventTrans_dateTime;
        this.tuneEventTrans_ipAddress = res.TuneEvent.tuneEventTrans_ipAddress;
        this.tuneEventMasterSid = res.TuneEvent.tuneEventMasterSid;

        for (let key in res.TuneEvent) {
          if (res.TuneEvent[key] !== null) {
            const reg = /\_text/;
            if (reg.test(key)) {
              this.tuneEventParticipants[`${key}`] = res.TuneEvent[key];
            }
          }
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //객체 순회로 null 아닌 값 담기
    getTitleArr(obj) {
      this.arr = [];
      for (let key in obj) {
        //마스터 고유코드라면
        if (key === "tuneEventMasterSid") {
          obj[key] = null;
        }
        if (key === "tuneEventTrans_dateTime") {
          this.eventTitleList["tuneEventTrans_dateTime"] = "생성일시";
        }

        //null이 아닌 값만 넣기
        if (obj[key] !== null) {
          const reg = /\_text/;
          if (reg.test(key)) {
            this.arr = [...this.arr, key];
          }
          const value = key === "tuneEventTransSid" ? "고유코드" : obj[key];
          this.eventTitleList[`${key}`] = value;
        }
      }
    },
    // getObj(obj) {
    //   for (let key in obj) {
    //     //null이 아닌 값만 넣기
    //     if (obj[key] !== null) {
    //       const value = obj[key];
    //       return { key, value };
    //     }
    //   }
    // },
    getDataArr(arr) {
      const newArr = [];
      for (const item of arr) {
        const currObject = {};
        for (const key in item) {
          if (item[key] !== null) currObject[key] = item[key];
        }
        newArr.push(currObject);
      }
      return newArr;
    },
    fileTypeCheck(type) {
      switch (type) {
        case "jpeg":
        case "png":
        case "jpg":
        case "gif":
        case "bmp":
        case "mp4":
        case "m3u8":
        case "ts":
          this.fileDownload({ id: this.file[0].fileSid, fileExt: this.file[0].fileExt, name: this.file[0].fileFileName });
          break;
      }
    },
    clear() {
      this.tuneEventParticipants = {};
      this.tuneEventTransSid = "";
      this.tuneEventMasterSid = "";
      this.tuneEventTrans_ipAddress = "";
      this.tuneEventTrans_dateTime = "";
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
.option-benefit-btn-group {
  float: right;
  & button {
    margin-left: 5px;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 500px !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(100% - 520px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}

.top-section {
  display: flex;

  & .info_wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    & .txt {
      display: flex;
      align-items: center;
      width: 100px;
    }
    & .ipt_wrap {
      width: calc(100% - 100px);
      padding-right: 20px;

      & input[type="text"],
      input[type="password"],
      input[type="number"] {
        border: 1px solid #ccc;
        height: 30px;
        padding: 0 10px;
        width: 100%;
        &:read-only {
          background: #f4f4f4;
        }
      }
    }
    & :nth-child(4n) {
      & .ipt_wrap {
        padding-right: 0;
      }
    }
  }
}
</style>
