import * as Tsx from "vue-tsx-support";

export const MuCircularProgress = Tsx.ofType<Props>().convert(require("muse-ui/lib/Progress").CircularProgress);

type Props = {
  mode?: "indeterminate" | "determinate";
  max?: number;
  min?: number;
  value?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
};
