import * as Tsx from "vue-tsx-support";
import { Pagination } from "muse-ui";

export const MuPagination = Tsx.ofType<Props, Events>().convert(Pagination as any);

type Props = {
  total?: number;
  current?: number;
  pageSize?: number;
  pageCount?: number;
};

type Events = {
  change: any;
};
