import { ofType } from 'vue-tsx-support';

export const MuRadio = ofType<MuRadioProps, MuRadioEvents>().convert(require('muse-ui/lib/Radio').default);

type MuRadioProps = {
  label?: string;
  labelLeft?: boolean;
  uncheckIcon?: string;
  checkedIcon?: string;
  inputValue?: boolean | any[];
  disabled?: boolean;
  color?: string;
  ripple?: boolean;
};

type MuRadioEvents = {
  onChange: any;
};
