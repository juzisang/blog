import * as Tsx from 'vue-tsx-support';

export const MuBreadcrumbs = Tsx.ofType<MuBreadcrumbsProps, any, MuBreadcrumbsSlots>().convert(require('muse-ui/lib/Breadcrumbs').Breadcrumbs);

export const MuBreadcrumbsItem = Tsx.ofType<MuBreadcrumbsItemProps>().convert(require('muse-ui/lib/Breadcrumbs').BreadcrumbsItem);

type MuBreadcrumbsProps = {
  divider?: string;
};

type MuBreadcrumbsSlots = {
  divider?: any;
  default?: any;
};

type MuBreadcrumbsItemProps = {
  disabled?: boolean;
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
