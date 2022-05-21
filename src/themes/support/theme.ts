import { Colors } from './colors';

export interface ThemeItem {
  text: string;
  data: {
    author: {
      name: string;
      link: string;
    };
    colors: {
      role: Colors;
      job?: Colors;
    };
  };
}
