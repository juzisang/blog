import * as Tsx from "vue-tsx-support";

type Props = {
  mode?: "indeterminate" | "determinate";
  max?: number;
  min?: number;
  value?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const MuCircularProgress = Tsx.ofType<Props>().convert(
  require("muse-ui/lib/Progress").CircularProgress
);
