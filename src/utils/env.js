/**
 * check if in development env
 * @return {boolean}
 */
export function isDev() {
  return Boolean(import.meta.env.DEV);
}

/**
 * check if in production env
 * @return {boolean}
 */
export function isProd() {
  return Boolean(import.meta.env.PROD);
}

/**
 * check if in overlay plugin emblemed cef
 * @return {boolean}
 */
export function isCEF() {
  return Boolean(window.OverlayPluginApi);
}
