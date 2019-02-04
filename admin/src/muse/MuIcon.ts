import * as Tsx from 'vue-tsx-support';
import { Icon } from 'muse-ui';

export const MuIcon = Tsx.ofType<MuIconProps>().convert(Icon as any);

type MuIconProps = {
  value?: string;
  size?: string | number;
  left?: boolean;
  right?: boolean;
  color?: string;
};
