import * as Tsx from 'vue-tsx-support';

export const MuSelect = Tsx.ofType<MuSelectProps, MuSelectEvents, MuSelectSlots>().convert(require('muse-ui/lib/Select').Select);

export const MuOption = Tsx.ofType<MuOptionProps>().convert(require('muse-ui/lib/Select').Option);

type MuSelectProps = {
  multiple?: boolean;
  filterable?: boolean;
  chips?: boolean;
  maxHeight?: string | number;
  separator?: string;
  popoverClass?: string;
  noDataText?: string;
  textline?: 'two-line' | 'three-line';
  dense?: boolean;
  value?: any;
  color?: string;
  icon?: string;
  label?: string;
  labelFloat?: boolean;
  errorText?: string;
  helpText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  actionIcon?: string;
  solo?: boolean;
  underlineColor?: string;
};

type MuSelectEvents = {
  change: any;
};

type MuSelectSlots = {
  prepend: any;
  append: any;
  default: any;
};

type MuOptionProps = {
  label?: string;
  value?: any;
  searchText?: string;
  ripple?: boolean;
  avatar?: boolean;
  disabled?: boolean;
};
