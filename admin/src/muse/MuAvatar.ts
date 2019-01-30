import * as Tsx from "vue-tsx-support";
import { Avatar } from "muse-ui";

type Props = {
  color?: string;
  textColor?: string;
  size?: number | string;
};

export const MuAvatar = Tsx.ofType<Props>().convert(Avatar as any);
