import * as Tsx from 'vue-tsx-support';

export const MuDialog = Tsx.ofType<Props, Events>().convert(require('muse-ui/lib/Dialog').default);

type Props = {
  open?: boolean;
  title?: string;
  width?: string | number;
  maxWidth?: string | number;
  scrollable?: boolean;
  padding?: number;
  fullscreen?: boolean;
  transition?: string;
  dialogClass?: string;
  overlay?: boolean;
  overlayClose?: boolean;
  overlayOpacity?: boolean;
  overlayColor?: string;
  escPressClose?: boolean;
  lockScroll?: boolean;
  appendBody?: boolean;
};

type Events = {
  close: any;
};
