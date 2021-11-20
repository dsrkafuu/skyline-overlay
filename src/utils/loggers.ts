import { isProd } from './env';

/**
 * log info
 */
export function logInfo(...args: unknown[]) {
  console.info('%c[skyline-overlay]', 'color: #8aa2d3', ...args);
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
  console.info('%c[rerendered]', 'color: #a893aa', ...args);
}
