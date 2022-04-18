
export type RGBAColor = {
  r: number,
  g: number,
  b: number,
  a: number,
}

export type Author = {
  name: string;
  link: string;
}

export type ThemeColors = {
  [k: string]: RGBAColor
}

export type Theme = {
  text: string,
  colors?: ThemeColors,
  data?: {
    author: Author
  }
}