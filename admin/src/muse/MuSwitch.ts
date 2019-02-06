import { ofType } from 'vue-tsx-support';

export const MuSwitch = ofType<MuSwitchProps, MuSwitchEvents>().convert(require('muse-ui/lib/Switch').default);

type MuSwitchProps = {
  label?: string;
  labelLeft?: boolean;
  inputValue?: boolean | any[];
  disabled?: boolean;
  color?: string;
  ripple?: boolean;
};

type MuSwitchEvents = {
  onChange: any;
};
