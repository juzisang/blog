import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { getters } from "./getters";
import { userModule as user } from "./modules/user";
import { RootState } from "./interfaces";

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  getters,
  modules: {
    user
  },
  actions: {
    init(context: ActionContext<any, any>) {
      store.dispatch("GetInfo");
    }
  }
});

export default store;
