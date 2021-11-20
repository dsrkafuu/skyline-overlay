/**
 * check if in development env
 */
export function isDev() {
  return Boolean(import.meta.env.DEV);
}

/**
 * check if in production env
 */
export function isProd() {
  return Boolean(import.meta.env.PROD);
}

/**
 * check if in overlay plugin emblemed cef
 */
export function isCEF() {
  return Boolean(window.OverlayPluginApi);
}
