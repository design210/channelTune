import router from "@/router/index";
import { getAccessTokenCookie } from "@/utils/cookie";
import { deleteCookie } from "@/utils/cookie";

export function setInterceprors(instance, data, type, commit) {
  const accessCookie = getAccessTokenCookie();
  const isHaveCommit = arguments[3] === undefined ? false : true;
  instance.interceptors.request.use(
    function (config) {
      config.headers["Content-Type"] = type;
      config.headers["Authorization"] = "Bearer " + accessCookie;
      if (isHaveCommit) {
        config.onUploadProgress = ProgressEvent => {
          let percentage = (ProgressEvent.loaded * 100) / ProgressEvent.total;
          let percentCompleted = Math.round(percentage);

          commit("common/percentage", percentCompleted, { root: true }); // 퍼센테이지 리턴
        };
      }
      config.data = data;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      if (response.status === 401) {
        //alert(response.data.channeltuneApiResult.token.errorMessage);
        deleteCookie("accessToken");
        deleteCookie("adminUserName");
        router.push("/login");
      }
      return response;
    },
    function (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    },
  );

  return instance;
}
