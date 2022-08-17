<template>
  <section class="main-container">
    <div class="time-line">
      {{ time }}
    </div>
    <v-progress-linear :value="timeVal" buffer-value="300" color="#ff4d56" background-color="#f4f4f4"></v-progress-linear>
    <div class="dividing">
      <section class="member-manage">
        <!-- 컨테이너 하단에 갈 경우 이 섹션과 같은 level에서 만들어야 한다. -->
        <section class="member-list section-box">
          <div class="square-container">
            <square titled="전체매출" :total="totalTodal" :month="totalMonth" :day="totalDay"></square>
            <square titled="광고" :total="adverTodal" :month="adverMonth" :day="adverDay"></square>
            <square titled="광고 영상" :total="videoDay" :month="videoMonth" :day="videoDay"></square>
          </div>
        </section>
      </section>
      <section class="righs">
        <div class="d-flex mt10" style="height: 135px">
          <rectangle :naming="dataName" titled="ADDTUNE 회원" status="member" :info="userInfoArr" class="mr10"></rectangle>
          <rectangle :naming="dataName2" titled="ADDTUNE 스토어" :info="storeArr"></rectangle>
        </div>
        <div class="store-traffic-container mt10">
          <h2>스토어 트래픽 센서 상태 <span>(Store Traffice Sensor Status)</span></h2>
          <div class="store-traffic-wrap">
            <div class="num-wrap">
              <ul>
                <li @click="view('total')" :class="stat === 'total' ? 'active' : ''">
                  <div class="subject">전체</div>
                  <div class="data">{{ sensorObj.total }}</div>
                </li>
                <li @click="view('active')" :class="stat === 'active' ? 'active' : ''">
                  <div class="subject">정상</div>
                  <div class="data">{{ sensorObj.active }}</div>
                </li>
                <li @click="view('down')" :class="stat === 'down' ? 'active' : ''">
                  <div class="subject">다운</div>
                  <div class="data" :class="stat === 'down' ? 'activing' : 'warning'">{{ sensorObj.down }}</div>
                </li>
                <li @click="view('warning')" :class="stat === 'warning' ? 'active' : ''">
                  <div class="subject">경고</div>
                  <div class="data" :class="stat === 'warning' ? 'activing' : 'warning'">{{ sensorObj.warning }}</div>
                </li>
                <li @click="view('prog')" :class="stat === 'prog' ? 'active' : ''">
                  <div class="subject">준비중</div>
                  <div class="data">{{ sensorObj.in_progress }}</div>
                </li>
              </ul>
            </div>
            <div class="tbl-wrap">
              <table class="tbl user-list-tbl">
                <colgroup>
                  <col width="70" />
                  <col width="*" />
                  <col width="60" />
                </colgroup>
                <thead>
                  <tr>
                    <th>센서코드</th>
                    <th class="left">스토어명</th>
                    <th class="right pr10">센서수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in sensorList" :key="idx">
                    <td>{{ item.id }}</td>
                    <td class="left">{{ item.name }}</td>
                    <td class="right">{{ item.cnt }}</td>
                  </tr>
                </tbody>
                <tfoot v-if="sensorList.length < 1">
                  <tr>
                    <td colspan="3">항목이 없습니다.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
      </section>
    </div>
  </section>
</template>

<script>
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Square from "@/components/form/Square";
import Rectangle from "@/components/form/Rectangle";
export default {
  components: {
    Square,
    Rectangle,
    alim,
  },
  mixins: [alimMixin, loading],
  data() {
    return {
      content: "",
      time: "",
      dataName: ["회원가입수", "휴먼/탈퇴 (누적)", "DAY", "휴면계정", "누적", "탈퇴 계정"],
      dataName2: ["전체", "운영 준비중", "운영", "운영종료", "노출불가", "운영보류"],
      userInfoArr: ["", "", 0, 0, 0, 0],
      storeArr: [0, 0, 0, 0, 0, 0],
      totalTodal: 0,
      totalMonth: 0,
      totalDay: 0,
      adverTodal: 0,
      adverMonth: 0,
      adverDay: 0,
      videoTodal: 0,
      videoMonth: 0,
      videoDay: 0,
      sensor: {},
      sensorObj: {},
      sensorList: [],
      stat: "",
      timeVal: 0,
    };
  },
  computed: {
    ...mapGetters("menu", ["dashBoard"]),
  },
  watch: {
    timeVal(val) {
      if (Math.floor(val) > 100) {
        this.getDashBoard();
      }
    },
  },
  mounted() {
    this.getDashBoard();
    this.getDay();
    setInterval(this.getDay.bind(this), 1000);
    setInterval(this.timeIncrease.bind(this), 1000);
  },
  methods: {
    send() {
      let frag = document.createElement("div");
      frag.innerHTML = this.content;
      let items = [...frag.querySelectorAll("img")].filter(img => img.getAttribute("src").startsWith("data")).map(img => img.getAttribute("src"));
      let fileList = [];
      items.forEach((imgBase64, index) => {
        // const formData = new FormData();
        // const file = this.DataURIToBlob(imgBase64);
        // formData.append('upload', file, 'image.jpg');
        // formData.append('profile_id', this.profile_id); //other param
        // formData.append('path', 'temp/'); //other param
        // fileList.push(formData);

        //fileList.push(this.DataURIToBlob(imgBase64));
        fileList.push(this.dataURLtoFile(imgBase64, index));
      });
    },
    // DataURIToBlob(dataURI) {
    // 	const splitDataURI = dataURI.split(',');
    // 	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    // 	const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    // 	const ia = new Uint8Array(byteString.length);
    // 	for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    // 	return new Blob([ia], { type: mimeString });
    // },
    dataURLtoFile(dataurl, fileName) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    },
    async getDashBoard() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("menu/DASHBOARD");
        const res = this.dashBoard.channeltuneApiResult.dashboard;
        this.totalTodal = res.buyInfo.total.total;
        this.totalMonth = res.buyInfo.total.month;
        this.totalDay = res.buyInfo.total.day;
        this.adverTodal = res.buyInfo.adver.total;
        this.adverMonth = res.buyInfo.adver.month;
        this.adverDay = res.buyInfo.adver.day;
        this.videoTodal = res.buyInfo.video.total;
        this.videoMonth = res.buyInfo.video.month;
        this.videoDay = res.buyInfo.video.day;
        this.sensorObj = res.wiInfo.count;
        this.sensor = res.wiInfo.list;
        const user = res.userInfo;
        const store = res.storeInfo;
        this.userInfoArr = ["", "", user.dayUser, user.dormancyUser, user.totalUser, user.withdrawalUser];
        this.stat = "total";
        this.sensorList = [...this.sensor.active, ...this.sensor.down, ...this.sensor.warning, ...this.sensor.in_progress];
        this.storeArr = [
          store.companyStoretotal,
          store.companyStoreAfter,
          store.companyStoreStart,
          store.companyStoreEnd,
          store.companyStoreErr,
          store.companyStoreHold,
        ];
        this.timeVal = 0;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    getDay() {
      dayjs.locale("ko");
      this.time = dayjs().format("YYYY. MM. DD. dddd. HH:mm:ss");
    },
    timeIncrease() {
      this.timeVal += 0.2;
    },
    view(status) {
      switch (status) {
        case "total":
          this.stat = "total";
          this.sensorList = [...this.sensor.active, ...this.sensor.down, ...this.sensor.warning, ...this.sensor.in_progress];
          break;
        case "active":
          this.stat = "active";
          this.sensorList = this.sensor.active;
          break;
        case "down":
          this.stat = "down";
          this.sensorList = this.sensor.down;
          break;
        case "warning":
          this.stat = "warning";
          this.sensorList = this.sensor.warning;
          break;
        case "prog":
          this.stat = "prog";
          this.sensorList = this.sensor.in_progress;
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px 20px;
  max-width: 100% !important;
  width: 100%;

  & .square-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 135px;
    & > div {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  & .rectangle-container {
    display: flex;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 100% !important;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
}
.store-traffic-container {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 15px;
  & h2 {
    font-size: 1.6rem;
    & span {
      color: #525252;
      font-size: 1.3rem;
      font-weight: 400;
    }
  }
  & .store-traffic-wrap {
    display: flex;
    justify-content: space-between;

    & .num-wrap {
      min-width: 130px;
      border-radius: 5px;
      & ul {
        margin-top: 15px;
        & li {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          border-top: 1px dashed #ccc;
          padding: 5px 0 2px 0;
          & .subject {
            font-size: 1.3rem;
            padding-left: 5px;
          }
          & .data {
            padding-right: 5px;
            font-size: 1.4rem;
            font-weight: 700;
            &.warning {
              background: #fff !important;
              color: #ff4d56;
            }
          }
        }
      }
    }
    & .tbl-wrap {
      flex-grow: 1;
      margin-left: 30px;
      max-height: 160px;
      overflow-y: auto;
    }
  }
}

.active {
  background-color: rgb(225, 225, 225);
}
.activing {
  background: rgb(225, 225, 225) !important;
  color: #ff4d56;
}
.dividing {
  display: flex;
  justify-content: space-between;
  & .member-manage {
    width: 60% !important;
  }
  & .righs {
    width: calc(40% - 10px);
  }
}
.time-line {
  display: flex;
  justify-content: flex-end;
}
</style>
