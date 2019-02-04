import * as Tsx from 'vue-tsx-support';

export const MuContainer = Tsx.ofType<MuContainerProps>().convert(require('muse-ui/lib/Grid').Container);
export const MuRow = Tsx.ofType<MuRowProps>().convert(require('muse-ui/lib/Grid').Row);
export const MuCol = Tsx.ofType<MuColProps>().convert(require('muse-ui/lib/Grid').Col);

type MuContainerProps = {
  fluid?: boolean;
};

type MuRowProps = {
  tag?: string;
  gutter?: boolean;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  fill?: boolean;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignItems?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  alignSelf?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
};

type MuColProps = {
  tag?: string;
  alignSelf?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  fill?: boolean;
  span?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  order?: number | string;
  offset?: number | string;
};
