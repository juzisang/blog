import * as Tsx from 'vue-tsx-support';

export const MuAppBar = Tsx.ofType<MuAppBarProps, any, MuAppBarSlots>().convert(require('muse-ui/lib/AppBar').default);

type MuAppBarProps = {
  color?: string;
  textColor?: string;
  title?: string;
  zDepth?: number;
};

type MuAppBarSlots = {
  left?: any;
  right?: any;
  default?: any;
};
