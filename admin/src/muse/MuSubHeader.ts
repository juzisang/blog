import { ofType } from 'vue-tsx-support';

export const MuSubHeader = ofType<MuSubHeaderProps>().convert(require('muse-ui/lib/SubHeader').default);

type MuSubHeaderProps = {
  inset?: boolean;
};
