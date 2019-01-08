import { GetterTree } from "vuex";
import { RootState } from "./interfaces";

export const getters: GetterTree<RootState, any> = {
  token: state => state.user.token
};
