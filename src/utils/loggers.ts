import { isProd } from './env';

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

/**
 * log component rerender
 */
export function logRender(...args: unknown[]) {
  if (isProd()) {
    return;
  }
  console.info('[rerendered]', ...args);
}
