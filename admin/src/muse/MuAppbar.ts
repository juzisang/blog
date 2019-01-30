import * as Tsx from 'vue-tsx-support';

export const MuAppBar = Tsx.ofType<Props, any, Slots>().convert(require('muse-ui/lib/AppBar').default);

type Props = {
  color?: string;
  textColor?: string;
  title?: string;
  zDepth?: number;
};

type Slots = {
  left?: any;
  right?: any;
  default?: any;
};
