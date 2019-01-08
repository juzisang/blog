import router from "./router";
import { getToken } from "@/utils/auth";
import store from "./store";

router.beforeEach((to, from, next) => {
  // 没有Token
  if (!getToken()) {
    return to.path === "/login" ? next() : next("/login");
  }
  // 有Token，直接进入Home
  if (to.path === "/login") {
    return next("/");
  }
  // 判断登录状态
  store
    .dispatch("GetInfo")
    .then(() => next())
    .catch(() => next("/login"));
});
