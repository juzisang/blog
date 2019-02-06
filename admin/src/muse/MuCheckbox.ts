import { ofType } from 'vue-tsx-support';

export const MuCheckbox = ofType<MuCheckboxProps, MuCheckboxEvents>().convert(require('muse-ui/lib/Checkbox').default);

type MuCheckboxProps = {
  label?: string;
  labelLeft?: boolean;
  uncheckIcon?: string;
  checkedIcon?: string;
  inputValue?: boolean | any[];
  disabled?: boolean;
  color?: string;
  ripple?: boolean;
};

type MuCheckboxEvents = {
  onChange: any;
};
