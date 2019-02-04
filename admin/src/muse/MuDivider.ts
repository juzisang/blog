import * as Tsx from 'vue-tsx-support';

export const MuDivider = Tsx.ofType<MuDividerProps>().convert(require('muse-ui/lib/Divider').default);

type MuDividerProps = {
  inset?: boolean;
  shallowInset?: boolean;
};
