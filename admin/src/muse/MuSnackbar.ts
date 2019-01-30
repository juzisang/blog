import * as Tsx from 'vue-tsx-support';

export const MuSnackbar = Tsx.ofType<Props>().convert(require('muse-ui/lib/Snackbar').default);

type Props = {
  color?: string;
  textColor?: string;
  message?: string;
  position?: 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end';
  open?: boolean;
};
