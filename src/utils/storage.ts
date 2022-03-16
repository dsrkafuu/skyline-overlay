import { logError } from './loggers';
import { STORAGE_PREFIX } from './constants';

/**
 * set local storage
 */
export function setLS(key: string, value: unknown) {
  try {
    localStorage.setItem(
      STORAGE_PREFIX + key.toUpperCase(),
      JSON.stringify(value)
    );
  } catch (e) {
    logError(e);
  }
}

/**
 * get local storage
 */
export function getLS(key: string): unknown {
  try {
    const realKey = STORAGE_PREFIX + key.toUpperCase();
    const data = JSON.parse(localStorage.getItem(realKey) || 'null');
    return data;
  } catch (e) {
    logError(e);
    return null;
  }
}

/**
 * remove local storage
 */
export function removeLS(key: string) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key.toUpperCase());
  } catch (e) {
    logError(e);
  }
}
