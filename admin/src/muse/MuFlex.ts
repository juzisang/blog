import * as Tsx from 'vue-tsx-support';
import 'muse-ui/lib/styles/components/bootstrap-grid.less';

export const MuFlex = Tsx.ofType<MuFlexProps>().convert(require('muse-ui/lib/Grid/Flex').default);

type MuFlexProps = {
  tag?: string;
  inline?: boolean;
  direction?: 'column' | 'row';
  wrap?: string;
  fill?: boolean;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignItems?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  alignSelf?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
};
