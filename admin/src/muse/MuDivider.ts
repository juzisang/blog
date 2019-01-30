import * as Tsx from 'vue-tsx-support';

export const MuDivider = Tsx.ofType<Props>().convert(require('muse-ui/lib/Divider').default);

type Props = {
  inset?: boolean;
  shallowInset?: boolean;
};
