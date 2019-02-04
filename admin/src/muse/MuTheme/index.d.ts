import { ThemeOptions as MuThemeOptions } from 'muse-ui/types/theme';

interface Theme {
  addCreateTheme(theme: MuThemeOptions): void;
  add(name: string, theme: MuThemeOptions, extendName: string): void;
  use(name: string): void;
  generate(name: string): void;
}

export declare const MuTheme: Theme;
