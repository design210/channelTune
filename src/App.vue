<template>
  <v-app>
    <v-main class="main-container">
      <div class="layout-wrap">
        <div><router-view name="top" @open="menuOpen"></router-view></div>
        <div class="layout-right">
          <router-view name="ui" :openprop="open"></router-view>
          <router-view name="contents" :size="size"></router-view>
        </div>
      </div>
      <router-view />
      <div class="loading-wrap" v-if="loadingBgStatus">
        <v-progress-circular :size="70" :width="7" color="amber" indeterminate class="spinner"></v-progress-circular>
      </div>
      <v-progress-circular :size="70" :width="7" color="amber" indeterminate class="spinner" v-if="loadingStatus"></v-progress-circular>
    </v-main>
  </v-app>
</template>

<script>
import bus from "./utils/bus.js";
export default {
  name: "App",
  data() {
    return {
      loadingStatus: false,
      loadingBgStatus: false,
      size: null,
      open: true,
    };
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
    bus.$on("start:spinnerBg", this.startSpinnerBg);
    bus.$on("end:spinnerBg", this.endSpinnerBg);
    let DocHeight = window.innerHeight;
    let TblOffset = 250; //테이블 위치 top은 오류로 사용 불가
    let TblArea = DocHeight - TblOffset - 120; //하단 여백 : 페이징 등 처리;
    let size = parseInt(TblArea / 30);
    this.size = size;
  },
  beforeDestroy() {
    bus.$off("start:spinner", this.startSpinner);
    bus.$off("end:spinner", this.endSpinner);
    bus.$off("start:spinnerBg", this.startSpinnerBg);
    bus.$off("end:spinnerBg", this.endSpinnerBg);
  },
  mounted() {
    document.addEventListener(
      "click",
      e => {
        const ele = this.hasClass(e.target, "select-tbl");
        const multi = this.hasClass(e.target, "select-multi");
        if (ele) {
          const disableTr = ele.closest("table").querySelectorAll("tr");
          disableTr.forEach(ele => ele.classList.remove("active"));
          ele.classList.add("active");
        }
        if (multi) {
          const select = multi.closest("tr");
          if (select.classList.value.includes("active")) {
            multi.classList.remove("active");
          } else {
            multi.classList.add("active");
          }
        }
      },
      false,
    );
    //처음 로딩시 갯수
    let _this = this;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function () {
          let DocHeight = window.innerHeight;
          let TblOffset = 250; //테이블 위치 top은 오류로 사용 불가
          let TblArea = DocHeight - TblOffset - 120; //하단 여백 : 페이징 등 처리;
          let size = parseInt(TblArea / 30);
          _this.size = size;
          if (this.size < 1) {
            this.size = 1;
          }
        }, 500);
      },
      true,
    );
  },
  methods: {
    hasClass(elem, className) {
      if (elem.closest("table")) {
        const DOMTockenList = elem.closest("table").classList.value;
        if (DOMTockenList.includes(className)) {
          return elem.closest("tr");
        }
      }
    },
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
    startSpinnerBg() {
      this.loadingBgStatus = true;
    },
    endSpinnerBg() {
      this.loadingBgStatus = false;
    },
    menuOpen(data) {
      this.open = data;
    },
  },
};
</script>
<style lang="scss">
.loading-wrap {
  position: fixed !important;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  & .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.spinner {
  position: fixed !important;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pdf-bg {
  background: url("./assets/images/pdf.png") no-repeat;
  background-size: cover;
}
//margin, padding setting
@for $i from 0 through 200 {
  .mt#{$i} {
    margin-top: 0.1rem * $i !important;
  }
  .ml#{$i} {
    margin-left: 0.1rem * $i !important;
  }
  .mr#{$i} {
    margin-right: 0.1rem * $i !important;
  }
  .mb#{$i} {
    margin-bottom: 0.1rem * $i !important;
  }
  .pt#{$i} {
    padding-top: 0.1rem * $i !important;
  }
  .pl#{$i} {
    padding-left: 0.1rem * $i !important;
  }
  .pr#{$i} {
    padding-right: 0.1rem * $i !important;
  }
  .pb#{$i} {
    padding-bottom: 0.1rem * $i !important;
  }
}
//width setting
@for $i from 1 through 500 {
  .w#{$i} {
    width: 0.1rem * $i !important;
  }
}
</style>
