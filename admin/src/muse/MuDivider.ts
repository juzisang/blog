import * as Tsx from 'vue-tsx-support';
import { Divider } from 'muse-ui';

export const MuDivider = Tsx.ofType<Props>().convert(Divider as any);

type Props = {
  inset?: boolean;
  shallowInset?: boolean;
};
