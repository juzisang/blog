import * as Tsx from 'vue-tsx-support';

export const MuBadge = Tsx.ofType<MuBadgeProps, any, MuBadgeSlots>().convert(require('muse-ui/lib/Badge').default);

type MuBadgeProps = {
  color?: string;
  content?: string;
  circle?: boolean;
  badgeClass?: string;
};

type MuBadgeSlots = {
  content?: string;
  default?: any;
};
