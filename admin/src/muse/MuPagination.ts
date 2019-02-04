import * as Tsx from 'vue-tsx-support';

export const MuPagination = Tsx.ofType<MuPaginationProps, MuPaginationEvents>().convert(require('muse-ui/lib/Pagination').default);

type MuPaginationProps = {
  total?: number;
  current?: number;
  pageSize?: number;
  pageCount?: number;
};

type MuPaginationEvents = {
  change: any;
};
