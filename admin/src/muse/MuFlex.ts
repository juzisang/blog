import * as Tsx from 'vue-tsx-support';

export const MuFlex = Tsx.ofType<Props>().convert(require('muse-ui/lib/Grid/Flex').default);

type Props = {
  tag?: string;
  inline?: boolean;
  direction?: string;
  wrap?: string;
  fill?: boolean;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignItems?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  alignSelf?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
};
