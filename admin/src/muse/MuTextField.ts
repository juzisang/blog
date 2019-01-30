import * as Tsx from 'vue-tsx-support';
import { TextField } from 'muse-ui';

export const MuTextField = Tsx.ofType<Props, Events, Slots>().convert(TextField as any);

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
