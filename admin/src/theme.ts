import { MuTheme } from '@/muse';

const dark = require('muse-ui/lib/theme/dark').default;
const light = require('muse-ui/lib/theme/light').default;

export const appDark = {
  ...dark,
};

export const appLight = {
  ...light,
};

MuTheme.add('app-dark', appDark, 'dark');
MuTheme.add('app-light', appLight, 'light');
