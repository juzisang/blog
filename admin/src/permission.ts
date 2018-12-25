import router from "./router";
import { getToken } from "@/utils/auth";

router.beforeEach((to, from, next) => {
  // 没有Token
  if (!getToken()) {
    return next("/login");
  }
  // 有Token，直接进入Home
  if (to.path === "/login") {
    return next("/");
  }

  next();
});
