import * as Tsx from 'vue-tsx-support';

export const MuPagination = Tsx.ofType<Props, Events>().convert(require('muse-ui/lib/Pagination').default);

type Props = {
  total?: number;
  current?: number;
  pageSize?: number;
  pageCount?: number;
};

type Events = {
  change: any;
};
