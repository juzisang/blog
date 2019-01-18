import axios, { AxiosRequestConfig } from "axios";
import router from "../router";
import { getToken } from "./auth";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 120000
});

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.statusCode !== 200) {
      return Promise.reject(new Error(res ? JSON.stringify(res) : "系统错误"));
    } else {
      return res.body;
    }
  },
  error => {
    if (!error.response && error instanceof Error) {
      console.error(error);
    } else {
      switch (error.response.status) {
        case 401:
          router.replace({ name: "Login" });
          break;
        default:
          console.error(error);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default function(data: AxiosRequestConfig): Promise<any> {
  return service(data);
}
