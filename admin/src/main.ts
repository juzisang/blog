import Vue from "vue";
import App from "@/App";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
