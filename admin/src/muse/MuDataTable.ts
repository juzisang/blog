import { ofType } from 'vue-tsx-support';

export const MuDataTable = ofType<MuDataTableProps, MuDataTableEvents>().convert(require('muse-ui/lib/DataTable').default);

type MuDataTableProps = {
  data?: any[];
  columns?: MuDataTableColumns[];
  noDataText?: string;
  minColWidth?: number;
  height?: number | string;
  maxHeight?: number | string;
  selectable?: boolean;
  selectAll?: boolean;
  selects?: any[];
  sort?: any;
  checkbox?: boolean;
  checkboxColWidth?: number;
  stripe?: boolean;
  border?: boolean;
  loading?: boolean;
  expandRowIndex?: number;
  autoExpand?: boolean;
  hideHeader?: string | Function;
  rowClassName?: boolean;
  rowKey?: string;
  fit?: boolean;
  hover?: boolean;
};

type MuDataTableColumns = {
  name?: string;
  title?: string;
  width?: number | any;
  sortable?: string;
  align?: 'left' | 'center' | 'right' | string;
  cellAlign?: 'left' | 'center' | 'right' | string;
  class?: string;
  tooltip?: string;
  formatter?: string;
};

type MuDataTableEvents = {
  rowClick: any;
  rowDblclick: any;
  rowMouseenter: any;
  rowMouseleave: any;
  rowContextmenu: any;
  selectChange: any;
  sortChange: any;
};
