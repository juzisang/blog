import * as Tsx from 'vue-tsx-support';

export const MuAvatar = Tsx.ofType<MuAvatarProps>().convert(require('muse-ui/lib/Avatar').default);

type MuAvatarProps = {
  color?: string;
  textColor?: string;
  size?: number | string;
};
