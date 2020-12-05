/**
 * check if development
 * @returns {Boolean}
 */
function isDev() {
  const process = window.process;
  if (process && process?.env?.NODE_ENV === 'development') {
    return true;
  }
  return false;
}

export default isDev;
