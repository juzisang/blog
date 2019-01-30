import * as Tsx from "vue-tsx-support";
import { Paper } from "muse-ui";

export const MuPaper = Tsx.ofType<Props>().convert(Paper as any);

type Props = {
  zDepth?: number;
  round?: boolean;
  circle?: boolean;
};
