import * as Tsx from "vue-tsx-support";

type Props = {
  mode?: "indeterminate" | "determinate";
  max?: number;
  min?: number;
  value?: number;
  size?: number;
  color?: string;
};

export const MuLinearProgress = Tsx.ofType<Props>().convert(
  require("muse-ui/lib/Progress").LinearProgress
);
