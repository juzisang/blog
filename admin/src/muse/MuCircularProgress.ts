import * as Tsx from 'vue-tsx-support';

export const MuCircularProgress = Tsx.ofType<MuCircularProgressProps>().convert(require('muse-ui/lib/Progress').CircularProgress);

type MuCircularProgressProps = {
  mode?: 'indeterminate' | 'determinate';
  max?: number;
  min?: number;
  value?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
};
