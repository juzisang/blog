import * as Tsx from "vue-tsx-support";
import { Pagination } from "muse-ui";

type Props = {
  total?: number;
  current?: number;
  pageSize?: number;
  pageCount?: number;
};

type Events = {
  change: any;
};

export const MuPagination = Tsx.ofType<Props, Events>().convert(
  Pagination as any
);
