import { ofType } from 'vue-tsx-support';

export const MuSubHeader = ofType<Props>().convert(require('muse-ui/lib/SubHeader').default);

type Props = {
  inset?: boolean;
};
