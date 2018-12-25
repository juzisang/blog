import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, getUserInfo } from "@/api/user";
import { ActionContext } from "vuex";

export interface UserState {
  token: string;
  name: string;
  email: string;
  avatar: string;
  slogan: string;
  url: string;
}

const state: UserState = {
  token: getToken() as string,
  name: "",
  email: "",
  avatar: "",
  slogan: "",
  url: ""
};

const mutations = {
  SET_USERINFO(state: UserState, user: IUserInfo) {
    state.token = user.token as string;
    state.name = user.name;
    state.email = user.email;
    state.avatar = user.avatar;
    state.slogan = user.slogan;
    state.url = user.url;
  }
};

const actions = {
  // 登录
  async Login(content: ActionContext<UserState, any>, user: any) {
    const body = await login({ ...user });
    setToken(body.token as string);
    content.commit("SET_USERINFO", body);
    return body;
  },
  // 获取用户信息
  async GetInfo(content: ActionContext<UserState, any>) {
    const body = await getUserInfo();
    content.commit("SET_USERINFO", body);
    return body;
  },
  // 退出登录
  async LogOut(content: ActionContext<UserState, any>) {
    content.commit("SET_USERINFO", {});
    removeToken();
    localStorage.clear();
  }
};

export default {
  state,
  mutations,
  actions
};
