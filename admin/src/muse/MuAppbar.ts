import * as Tsx from "vue-tsx-support";
import { AppBar } from "muse-ui";

type Props = {
  color?: string;
  textColor?: string;
  title?: string;
  zDepth?: number;
};

type Slots = {
  left?: any;
  right?: any;
  default?: any;
};

export const MuAppBar = Tsx.ofType<Props, any, Slots>().convert(AppBar as any);
