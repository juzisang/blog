import * as Tsx from 'vue-tsx-support';
import { Drawer } from 'muse-ui';

export const MuDrawer = Tsx.ofType<Props>().convert(Drawer as any);

type Props = {
  open?: boolean;
  right?: boolean;
  docked?: boolean;
  width?: string | number;
  zDepth?: number;
};
