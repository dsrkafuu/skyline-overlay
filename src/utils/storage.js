import { logError } from './loggers';
import { STORAGE_PREFIX } from './constants';

/**
 * set local storage
 * @param {string} key
 */
export function setLS(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key.toUpperCase(), JSON.stringify(value));
  } catch (e) {
    logError(e);
  }
}

/**
 * get local storage
 * @param {string} key
 * @return {any}
 */
export function getLS(key) {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key.toUpperCase())) || null;
  } catch (e) {
    logError(e);
    return null;
  }
}
