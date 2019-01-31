import * as Tsx from 'vue-tsx-support';

export const MuButton = Tsx.ofType<Props, Events>().convert(require('muse-ui/lib/Button').default);

type Props = {
  color?: string;
  textColor?: string;
  ripple?: boolean;
  fab?: boolean;
  flat?: boolean;
  icon?: boolean;
  small?: boolean;
  large?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: string;
  keyboardFocused?: boolean;
  href?: string;
  to?: string | object;
  tag?: string;
  activeClass?: string;
  event?: string | Array<any>;
  exact?: boolean;
  exactActiveClass?: string;
  append?: boolean;
  replace?: boolean;
};

type Events = {
  onClick: any;
};
