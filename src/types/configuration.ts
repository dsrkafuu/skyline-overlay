
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

export type Theme = {
  text: string,
  colors?: {[k: string]: RGBAColor},
  data?: {
    author: Author
  }
}