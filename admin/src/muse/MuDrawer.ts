import * as Tsx from 'vue-tsx-support';

export const MuDrawer = Tsx.ofType<Props>().convert(require('muse-ui/lib/Drawer').default);

type Props = {
  open?: boolean;
  right?: boolean;
  docked?: boolean;
  width?: string | number;
  zDepth?: number;
};
