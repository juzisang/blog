import * as Tsx from "vue-tsx-support";
import { Icon } from "muse-ui";

export const MuIcon = Tsx.ofType<Props>().convert(Icon as any);

type Props = {
  value?: string;
  size?: string | number;
  left?: boolean;
  right?: boolean;
  color?: string;
};
