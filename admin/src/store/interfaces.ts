import { ThemeOptions } from 'muse-ui/types/theme';

export interface RootState {
  user: UserState;
}

export interface UserState {
  token: string;
  name: string;
  email: string;
  avatar: string;
  slogan: string;
  url: string;
}

export interface ThemeState extends ThemeOptions {}
