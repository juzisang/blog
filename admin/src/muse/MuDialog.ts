import * as Tsx from "vue-tsx-support";
import { Dialog } from "muse-ui";

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

export const MuDialog = Tsx.ofType<Props, Events>().convert(Dialog as any);
