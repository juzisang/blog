import * as Tsx from 'vue-tsx-support';

export const MuTextField = Tsx.ofType<Props, Events, Slots>().convert(require('muse-ui/lib/TextField').default);

type Props = {
  color?: string;
  icon?: string;
  label?: string;
  labelFloat?: boolean;
  errorText?: string;
  helpText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  multiLine?: string;
  maxLength?: number;
  rows?: number;
  rowsMax?: number;
  actionIcon?: string;
  actionClick?: Function;
  solo?: boolean;
  underlineColor?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  type?: string;
};

type Events = {
  change: any;
};

type Slots = {
  prepend: any;
  append: any;
  default: any;
};
