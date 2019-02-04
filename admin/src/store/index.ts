import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { getters } from './getters';
import { userModule as user } from './modules/user';
import { themeModule as theme } from './modules/theme';
import { RootState } from './interfaces';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  getters,
  modules: {
    user,
    theme,
  },
  actions: {
    // 全局配置
    GlobalInit(context: ActionContext<any, any>) {
      context.dispatch('UseTheme', 'light');
    },
    // 主界面执行
    AppInit(context: ActionContext<any, any>) {
      store.dispatch('GetInfo');
    },
  },
});

store.dispatch('GlobalInit');

export default store;
