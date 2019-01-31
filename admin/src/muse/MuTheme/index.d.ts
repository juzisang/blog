import { ThemeOptions } from 'muse-ui/types/theme';

interface Theme {
  addCreateTheme(theme: ThemeOptions): void;
  add(name: string, theme: ThemeOptions, extendName: string): void;
  use(name: string): void;
  generate(name: string): void;
}

export declare const MuTheme: Theme;
