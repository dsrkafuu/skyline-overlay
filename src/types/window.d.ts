import { OverlayAPI } from '../api';

declare global {
  interface Window {
    OverlayPluginApi: {
      callHandler(
        msg: string,
        cb?: (...args: unknown[]) => void
      ): Promise<void>;
      endEncounter(...args: unknown[]): Promise<void>;
      ready: boolean;
    };
    __OverlayCallback(...args: unknown[]): void;
    dispatchOverlayEvent(...args: unknown[]): void;
    OverlayAPI: typeof OverlayAPI;
  }
}

export {};
