import * as Tsx from 'vue-tsx-support';

export const MuBreadcrumbs = Tsx.ofType<BreadcrumbsProps, any, BreadcrumbsSlots>().convert(require('muse-ui/lib/Breadcrumbs').Breadcrumbs);

export const MuBreadcrumbsItem = Tsx.ofType<BreadcrumbsItemProps>().convert(require('muse-ui/lib/Breadcrumbs').BreadcrumbsItem);

type BreadcrumbsProps = {
  divider?: string;
};

type BreadcrumbsSlots = {
  divider?: any;
  default?: any;
};

type BreadcrumbsItemProps = {
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
