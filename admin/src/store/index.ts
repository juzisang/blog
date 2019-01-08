import Vue from "vue";
import Vuex from "vuex";
import { getters } from "./getters";
import { userModule as user } from "./modules/user";
import { RootState } from "./interfaces";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  getters,
  modules: {
    user
  }
});
