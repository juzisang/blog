import router from "./router";
import store from "./store";

router.beforeEach((to, from, next) => {
  // 没有Token
  if (!store.getters.token) {
    return to.path === "/login" ? next() : next("/login");
  }
  // 有Token，直接进入Home
  if (to.path === "/login") {
    return next("/");
  }
  // 不验证了，直接进入页面
  next();
});
