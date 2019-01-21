import Vue from "vue";
import { MuIcon } from "./MuIcon";
import { MuButton } from "./MuButton";
import { MuSnackbar } from "./MuSnackbar";
import { Toast } from "muse-ui-toast";

Vue.component(MuIcon.name, MuIcon);
Vue.component(MuButton.name, MuButton);
Vue.component(MuSnackbar.name, MuSnackbar);

export const MuToast = require("muse-ui-toast").default as Toast;
