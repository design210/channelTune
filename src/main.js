import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VModal from "vue-js-modal";
import "@/plugins/Dayjs";
Vue.use(VModal);
Vue.use(require("vue-moment"));
Vue.config.productionTip = false;
//socket
import io from "socket.io-client";
const socket = io("http://da-sql.addtune.net:3002/api/status/monitoring", {
  reconnectionDelayMax: 10000,
  path: "/android-station",
  transports: ["websocket"],
  query: {
    android_mac: "AC:AC:AC:AC:AC:AC",
    ts: Date.now(),
    android_code: "addTune",
  },
});
socket.on("connect", () => {
  console.log("socket connected");
});
Vue.prototype.$socket = socket;
//video
import VideoPlayer from "vue-video-player";
import VueClipboard from "vue-clipboard2";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
const hls = require("videojs-contrib-hls");
Vue.use(VideoPlayer);
Vue.use(hls);
Vue.use(VueClipboard);
new Vue({
  router,
  store,
  vuetify,
  VModal,
  render: h => h(App),
}).$mount("#app");
