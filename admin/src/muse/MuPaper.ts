import * as Tsx from 'vue-tsx-support';

export const MuPaper = Tsx.ofType<MuPaperProps>().convert(require('muse-ui/lib/Paper').default);

type MuPaperProps = {
  zDepth?: number;
  round?: boolean;
  circle?: boolean;
};
