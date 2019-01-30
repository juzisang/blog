import * as Tsx from "vue-tsx-support";

export const Breadcrumbs = Tsx.ofType<BreadcrumbsProps, any, BreadcrumbsSlots>().convert(require("muse-ui/lib/index").Breadcrumbs);

export const BreadcrumbsItem = Tsx.ofType<BreadcrumbsItemProps, any>().convert(require("muse-ui/lib/index").BreadcrumbsItem);

type BreadcrumbsProps = {
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

type BreadcrumbsSlots = {
  divider?: any;
  default?: any;
};

type BreadcrumbsItemProps = {
  divider: string;
};
