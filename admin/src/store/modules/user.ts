import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, getUserInfo } from '@/api/user';
import { ActionContext, Module } from 'vuex';
import { UserState, RootState } from '../interfaces';

export const userModule: Module<UserState, RootState> = {
  state: {
    token: getToken() as string,
    name: '',
    email: '',
    avatar: '',
    slogan: '',
    url: '',
  },
  mutations: {
    SET_USER_INFO(state: UserState, user: IUserInfo) {
      state.name = user.name;
      state.email = user.email;
      state.avatar = user.avatar;
      state.slogan = user.slogan;
      state.url = user.url;
    },
    SET_USER_TOKEN(state: UserState, token: string) {
      state.token = token;
    },
  },
  actions: {
    // 登录
    async Login(content: ActionContext<UserState, RootState>, user: any) {
      const body = await login({ ...user });
      content.commit('SET_USER_TOKEN', body);
      setToken(body);
      return body;
    },
    // 获取用户信息
    async GetInfo(content: ActionContext<UserState, RootState>) {
      const body = await getUserInfo();
      content.commit('SET_USER_INFO', body);
      return body;
    },
    // 退出登录
    async LogOut(content: ActionContext<UserState, RootState>) {
      content.commit('SET_USER_INFO', {});
      removeToken();
      localStorage.clear();
    },
  },
};
