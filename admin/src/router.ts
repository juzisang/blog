import Vue from "vue";
import Router from "vue-router";
import Layout from "./views/layout/Layout";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/login/Login")
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      name: "Home",
      path: "/home",
      component: Layout
    }
  ]
});
