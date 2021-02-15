import { logError } from './loggers';
import { STORAGE_KEY } from './constants';

/**
 * set local storage
 * @param {string} key
 */
export function setLS(key, value) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    data[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return data[key];
  } catch (e) {
    logError(e);
    return null;
  }
}
