// Vite
/// <reference types="vite/client" />

// SVGR
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
