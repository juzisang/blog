import * as Tsx from 'vue-tsx-support';

export const MuForm = Tsx.ofType<MuFormProps>().convert(require('muse-ui/lib/Form').Form);

export const MuFormItem = Tsx.ofType<FormItemProps>().convert(require('muse-ui/lib/Form').FormItem);

type MuFormProps = {
  model: object;
  inline?: boolean;
  labelWidth?: string | number;
  labelPosition?: 'top' | 'left' | 'right';
  autoValidate?: boolean;
};

type FormItemProps = {
  prop?: string;
  icon?: string;
  label?: string;
  labelFloat?: boolean;
  labelWidth?: string | number;
  labelPosition?: 'top' | 'left' | 'right';
  rules?: Array<MuFormRules>;
  helpText?: string;
  errorText?: string;
};

type MuFormRules = {
  validate?: (val: any) => any;
  message?: string;
};
