import * as Tsx from 'vue-tsx-support';

export const MuPaper = Tsx.ofType<Props>().convert(require('muse-ui/lib/Paper').default);

type Props = {
  zDepth?: number;
  round?: boolean;
  circle?: boolean;
};
