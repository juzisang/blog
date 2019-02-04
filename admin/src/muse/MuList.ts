import * as Tsx from 'vue-tsx-support';

export const MuList = Tsx.ofType<MuListProps, MuListEvents>().convert(require('muse-ui/lib/List').List);
export const MuListItem = Tsx.ofType<MuListItemProps>().convert(require('muse-ui/lib/List').ListItem);
export const MuListAction = Tsx.ofType().convert(require('muse-ui/lib/List').ListAction);
export const MuListItemContent = Tsx.ofType().convert(require('muse-ui/lib/List').ListItemContent);
export const MuListItemTitle = Tsx.ofType().convert(require('muse-ui/lib/List').ListItemTitle);
export const MuListItemSubTitle = Tsx.ofType().convert(require('muse-ui/lib/List').ListItemSubTitle);
export const MuListItemAfterText = Tsx.ofType().convert(require('muse-ui/lib/List').ListItemAfterText);

type MuListProps = {
  textline?: 'two-line' | 'three-line';
  dense?: boolean;
  nestedIndent?: boolean;
  toggleNested?: boolean;
  toggleNestedType?: 'expand' | 'popover';
  value?: any;
};

type MuListEvents = {
  change: any;
};

type MuListItemProps = {
  button?: boolean;
  avatar?: boolean;
  nested?: boolean;
  nestedListClass?: boolean;
  open?: boolean;
  value?: any;
  ripple?: boolean;
  href?: string;
  to?: string | object;
  tag?: string;
  activeClass?: string;
  event?: string | Array<string>;
  exact?: boolean;
  exactActiveClass?: string;
  append?: boolean;
  replace?: boolean;
};
