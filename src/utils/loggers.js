import { isProd } from './env';

/**
 * log info
 * @param {...any} args
 */
export function logInfo(...args) {
  console.info('%c[skyline-overlay]', 'color: #8aa2d3', ...args);
}

/**
 * log error
 * @param {...any} args
 */
export function logError(...args) {
  console.error('[skyline-overlay]', ...args);
}

/**
 * log component rerender
 * @param {any} args
 */
export function logRender(...args) {
  if (isProd()) {
    return;
  }
  console.info('%c[rerendered]', 'color: #a893aa', ...args);
}
