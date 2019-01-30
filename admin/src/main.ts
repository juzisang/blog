import Vue from "vue";
import App from "@/App";
import router from "./router";
import store from "./store";
import "./permission";
import "./styles/base.scss";
import { MuTheme } from "@/muse";

Vue.config.productionTip = false;

MuTheme.use("app-light");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
