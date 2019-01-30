import * as Tsx from 'vue-tsx-support';

export const MuAvatar = Tsx.ofType<Props>().convert(require('muse-ui/lib/Avatar').default);

type Props = {
  color?: string;
  textColor?: string;
  size?: number | string;
};
