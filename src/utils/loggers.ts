/**
 * log info
 */
export function logInfo(...args: unknown[]) {
  console.info('[skyline-overlay]', ...args);
}

/**
 * log error
 */
export function logError(...args: unknown[]) {
  console.error('[skyline-overlay]', ...args);
}

let debug = false;
if (import.meta.env.DEV) {
  debug = true;
}
const url = new URL(window.location.href);
if (/debug=[^0&]/gi.test(url.search)) {
  debug = true;
}

/**
 * log component rerender
 */
export function logDebug(...args: unknown[]) {
  if (!debug) {
    return;
  }
  console.info('[skyline-debug]', ...args);
}
