import { LANG_KEY } from '../utils/constants';
import lang from '../lang';

// NGLD's FFXIV Overly
declare global {
  interface Window {
    OverlayPluginApi: unknown;
    [LANG_KEY]: keyof typeof lang;
  }
}

export {};
