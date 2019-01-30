import * as Tsx from "vue-tsx-support";
import {} from "muse-ui";

export const MuFlex = Tsx.ofType<Props>().convert(require("muse-ui/lib/Grid/Flex").default as any);

type Props = {
  tag?: string;
  inline?: boolean;
  direction?: string;
  wrap?: string;
  fill?: boolean;
  justifyContent?: "start" | "center" | "end" | "between" | "around";
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  alignSelf?: "start" | "center" | "end" | "baseline" | "stretch";
};
