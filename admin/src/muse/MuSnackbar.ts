import * as Tsx from "vue-tsx-support";
import { Snackbar } from "muse-ui";

type Props = {
  color?: string;
  textColor?: string;
  message?: string;
  position?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";
  open?: boolean;
};

export const MuSnackbar = Tsx.ofType<Props>().convert(Snackbar as any);
