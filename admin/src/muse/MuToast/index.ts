import Vue from "vue";
import { MuIcon } from "../MuIcon";
import { MuButton } from "../MuButton";
import { MuSnackbar } from "../MuSnackbar";
import { ToastOptions } from "muse-ui-toast";

Vue.component(MuIcon.name, MuIcon);
Vue.component(MuButton.name, MuButton);
Vue.component(MuSnackbar.name, MuSnackbar);

const _Toast = require("muse-ui-toast").default;

export default class Toast {
  static message: (options: ToastOptions) => {};
  static success: (options: string | ToastOptions) => {};
  static info: (options: string | ToastOptions) => {};
  static warning: (options: string | ToastOptions) => {};
  static error: (options: string | ToastOptions) => {};
  static close: (options: string | ToastOptions) => {};
}
