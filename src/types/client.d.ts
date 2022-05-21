// vite
/// <reference types="vite/client" />

// svgr
/// <reference types="vite-plugin-svgr/client" />

declare type RGBAColor = number[];

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
