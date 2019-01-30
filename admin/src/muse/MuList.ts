import * as Tsx from 'vue-tsx-support';

const _List = require('muse-ui/lib/List');

export const MuList = Tsx.ofType<ListProps>().convert(_List.List);
export const MuListItem = Tsx.ofType<ListProps>().convert(_List.ListItem);
export const MuListAction = Tsx.ofType<ListProps>().convert(_List.ListAction);

type ListProps = {
  value?: string;
  size?: string | number;
  left?: boolean;
  right?: boolean;
  color?: string;
};
