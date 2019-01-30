const Theme = require("muse-ui/lib/theme").default as any;

Theme.add(
  "app-light",
  {
    primary: "#009688",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#ffeb3b"
  },
  "light"
);

export class MuTheme {
  static use(theme: string) {
    Theme.use(theme);
  }
}
