import { Module, ActionContext } from 'vuex';
import { RootState, ThemeState } from '../interfaces';
import { appDark, appLight } from '@/theme';
import { MuTheme } from '@/muse';

export const themeModule: Module<ThemeState, RootState> = {
  state: {
    ...appLight,
  },
  mutations: {
    SET_THEME_INFO(state: ThemeState, theme: ThemeState) {
      Object.assign(state, theme);
    },
  },
  actions: {
    UseTheme(content: ActionContext<ThemeState, RootState>, name: string) {
      switch (name) {
        case 'light':
          MuTheme.use('app-light');
          content.commit('SET_THEME_INFO', appLight);
          break;
        case 'dark':
          MuTheme.use('app-dark');
          content.commit('SET_THEME_INFO', appDark);
          break;
      }
    },
  },
};
