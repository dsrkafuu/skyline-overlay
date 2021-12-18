// NGLD's FFXIV Overly
declare global {
  interface Window {
    OverlayPluginApi: unknown;
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
    structuredClone<T>(src: T): T;
  }
}

export {};
