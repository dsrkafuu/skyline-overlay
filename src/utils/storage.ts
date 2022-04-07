import { logError } from './loggers';
import { STORAGE_PREFIX } from './constants';

export type StorageKey = 'settings' | 'settings-dev';

/**
 * set local storage
 */
export function setLS(key: StorageKey, value: unknown) {
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
export function getLS(key: StorageKey): unknown {
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
export function removeLS(key: StorageKey) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key.toUpperCase());
  } catch (e) {
    logError(e);
  }
}
