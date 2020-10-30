/**
 * log info
 * @param {any} err
 * @param {...any} params
 */
export function logInfo(info, ...params) {
  console.info('[LOGGER]', info, ...params);
}

/**
 * log error
 * @param {Error} err
 * @param {...any} params
 */
export function logError(err, ...params) {
  console.error('[ERROR]', err, ...params);
}
