/**
 * check if in development mode
 * @returns {boolean}
 */
export function isDev() {
  const process = window.process;
  if (process && process?.env?.NODE_ENV === 'development') {
    return true;
  }
  return false;
}
