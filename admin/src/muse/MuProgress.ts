import Vue from "vue";
import { MuLinearProgress } from "./MuLinearProgress";
import { MuFadeTransition } from "./MuTransition";
import { default as Progress } from "muse-ui-progress";
import "muse-ui-progress/dist/muse-ui-progress.css";

Vue.component(MuLinearProgress.name, MuLinearProgress);
Vue.component(MuFadeTransition.name, MuFadeTransition);

export const MuProgress = require("muse-ui-progress").default as Progress;
