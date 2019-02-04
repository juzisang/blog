import * as Tsx from 'vue-tsx-support';

export const MuLinearProgress = Tsx.ofType<MuLinearProgressProps>().convert(require('muse-ui/lib/Progress').LinearProgress);

type MuLinearProgressProps = {
  mode?: 'indeterminate' | 'determinate';
  max?: number;
  min?: number;
  value?: number;
  size?: number;
  color?: string;
};
