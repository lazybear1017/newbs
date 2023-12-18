import axios from "axios";
import Toast from "react-native-toast-message";
import _ from "lodash";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const request = axios.create({
  baseURL: "http://yzs.beatschool.cn/wfdata/bs",
  timeout: 3000, // 请求超时时间 这里的意思是当请求时间超过5秒还未取得结果时 提示用户请求超时
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // config.headers.Authorization = token;
    console.log(config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status === 200 || response.status === 400) {
      return response.data;
    } else {
      console.error("请求出错!");
    }
    return response;
  },
  function (error) {
    if (error.response) {
      const {
        status,
        statusText,
        request: { responseURL },
      } = error.response;
      const statusKey: keyof typeof codeMessage = status;
      const errorText = codeMessage[statusKey] || statusText;
      Toast.show({
        type: "info",
        text1: `请求错误 ${status}: ${responseURL}`,
        text2: errorText,
        position: "bottom",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "您的网络发生异常，无法连接服务器",
        text2: "网络异常",
        position: "bottom",
      });
    }
  }
);

/**
 * 统一的接口调用处理
 */
type CbFunc = () => void;

const handleFetchRes = (
  data: any,
  action: string | CbFunc,
  successCb?: CbFunc,
  errorCb?: CbFunc
) => {
  if (data.ret === 0 && data.msg === "succ") {
    if (_.isString(action)) {
      Toast.show({
        type: "success",
        text1: `${action}成功`,
        position: "top",
      });
    } else {
      action();
    }
    if (successCb) successCb();
  } else {
    Toast.show({
      type: "error",
      text1: data.msg || `${action}失败`,
      position: "top",
    });
    if (errorCb) errorCb();
  }
};

export { request, handleFetchRes };
