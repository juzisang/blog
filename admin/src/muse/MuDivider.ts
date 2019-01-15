import * as Tsx from "vue-tsx-support";
import { Divider } from "muse-ui";

type Props = {
  inset?: boolean;
  shallowInset?: boolean;
};

export const MuDivider = Tsx.ofType<Props>().convert(Divider as any);
