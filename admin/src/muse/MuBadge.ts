import * as Tsx from "vue-tsx-support";
import { Badge } from "muse-ui";

type Props = {
  color?: string;
  content?: string;
  circle?: boolean;
  badgeClass?: string;
};

type Slots = {
  content?: string;
  default?: any;
};

export const MuBadge = Tsx.ofType<Props, any, Slots>().convert(Badge as any);
