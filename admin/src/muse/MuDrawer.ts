import * as Tsx from 'vue-tsx-support';

export const MuDrawer = Tsx.ofType<MuDrawerProps>().convert(require('muse-ui/lib/Drawer').default);

type MuDrawerProps = {
  open?: boolean;
  right?: boolean;
  docked?: boolean;
  width?: string | number;
  zDepth?: number;
};
