import * as Tsx from "vue-tsx-support";

export const MuBadge = Tsx.ofType<Props, any, Slots>().convert(require("muse-ui/lib/Badge").default);

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
