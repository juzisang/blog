import * as Tsx from 'vue-tsx-support';

export const MuTextField = Tsx.ofType<MuTextFieldProps, MuTextFieldEvents, MuTextFieldSlots>().convert(require('muse-ui/lib/TextField').default);

type MuTextFieldProps = {
  color?: string;
  icon?: string;
  label?: string;
  labelFloat?: boolean;
  errorText?: string;
  helpText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  multiLine?: boolean;
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

type MuTextFieldEvents = {
  change: any;
};

type MuTextFieldSlots = {
  prepend: any;
  append: any;
  default: any;
};
