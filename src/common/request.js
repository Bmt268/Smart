import axios from "axios";
import env from "@/config/env";
import router from "../router";
import Vue from "vue";
import { Loading } from "element-ui";
let requestInn = [];
let loadingInstance = Loading.service({
  lock: false,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)"
});
loadingInstance.close();

/**
 * 自定义Axios实例
 */
const AJAX = axios.create({
  baseURL: env.baseUrl,
  timeout: 30000,
  withCredentials: env.credential
});

// 判断是否支持webp
let is_safari =
  /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

let webp = "1";
is_safari && (webp = "0");
// 添加请求拦截器
AJAX.interceptors.request.use(
  function (config) {
    // const noLoading = [
    //   "homeIndex",
    //   "planList",
    //   "imageDetail",
    //   "login",
    //   "editteachplan",
    //   "editdayplan"
    // ];
    // const noLoadingUrl = [
    //   "/maxwell/v1.0/schedule/v4/target/edit"
    // ]
    loadingInstance && loadingInstance.close();
    loadingInstance =
      //   (!noLoading.includes(router.app.$route.name) && !noLoadingUrl.includes(config.url))&&
      Loading.service({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    // 最多30秒
    setTimeout(() => {
      loadingInstance && loadingInstance.close();
    }, 30000);
    // 在发送请求之前
    // if (process.env.NODE_ENV === "development") {
    //   config.url = `https://${location.host}` + config.url;
    // }
    let token;
    if (localStorage.token) {
      token = localStorage.token;
    } else {
      token = "MTIsemhlbmdqaW5pdSwxNTU4Njk4MDQ";
    }
    if (token) {
      // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
      config.headers.token = token;
      config.headers.type = 1;
      config.headers.webp = webp;
    }
    config.method == "post" && (config.data.uid = localStorage.uid);
    config.method == "get" && (config.params.uid = localStorage.uid);
    config.method == "put" && (config.data.uid = localStorage.uid);
    if (config.method == "delete") {
      config.url += `?uid=${localStorage.uid}`;
    }

    // config.headers.type = 1;
    requestInn.push(config);
    return config;
  },
  function (error) {
    console.log("请求拦截器--", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
AJAX.interceptors.response.use(
  function (response) {
    requestInn.splice(0, 1);
    if (requestInn.length === 0) loadingInstance && loadingInstance.close();
    if (response.headers.return_token) {
      localStorage.setItem("token", response.headers.return_token);
    }
    // console.log("response", response);
    if (response.data) {
      loadingInstance && loadingInstance.close();

      let fromSchool = localStorage.getItem("school_website_route");
      let loginPath = fromSchool ? "/user/schoolLogin" : "/user/login";
      switch (response.data.errcode) {
        case 40001:
          // localStorage.setItem("token", "");
          // router.replace({
          //   path: loginPath
          // });
          break;

        case 40003:
          localStorage.setItem("token", "");
          localStorage.setItem("uid", "");
          router.replace({
            path: loginPath
          });
          break;
        case 40006:
          localStorage.setItem("token", "");
          localStorage.setItem("uid", "");
          router.replace({
            path: loginPath
          });
          break;
        case 50007:
          router.app.$route.name != "login" &&
            localStorage.setItem("token", "");
          router.app.$route.name != "login" && localStorage.setItem("uid", "");
          router.replace({
            path: loginPath
          });
          break;
        case 50008:
          localStorage.setItem("token", "");
          localStorage.setItem("uid", "");
          router.replace({
            path: loginPath,
            query: {
              isDayLate: true
            }
          });
          break;
        case 50010:
          router.replace({
            path: loginPath,
            query: {
              forbidden: true
            }
          });
          localStorage.setItem("token", "");
          localStorage.setItem("uid", "");
          break;
      }
    }
    // 处理响应数据 , JSON.stringify(response.data, null, "\t")
    // console.log(response.config, response.data)
    if ([401, 402].includes(response.data.code)) {
      localStorage.setItem("token", "");
      localStorage.setItem("uid", "");
    }
    return response.data;
  },
  function (error) {
    loadingInstance && loadingInstance.close();
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes("timeout")) {
      Vue.prototype.$message("网络错误，请刷新重试");
      console.log("错误回调", error);
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

// 定义对外Get、Post、File请求
export default {
  get(url, param, headers = {}) {
    return AJAX.get(url, {
      params: {
        ...param
      },
      headers
    });
  },
  post(url, param, headers = {}) {
    return AJAX.post(
      url,
      {
        ...param
      },
      {
        ...headers
      }
    );
  },
  put(url, param = null, headers = {}) {
    return AJAX.put(url, param, {
      headers
    });
  },
  file(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  },
  delete(url, param = null, headers = {}) {
    return AJAX.delete(url, {
      param,
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  }
};
