import { logError } from './loggers';
import { STORAGE_PREFIX } from './constants';

export type StorageKey = 'settings' | 'theme' | 'dev';

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
 * delay save local storage (event loop)
 */
export function getAsyncLSSetter<T>(key: StorageKey) {
  return (data: T) => {
    setTimeout(() => {
      try {
        const pre = getLS<T>(key) || {};
        setLS(key, { ...pre, ...data });
      } catch {
        return;
      }
    }, 0);
  };
}

/**
 * get local storage
 */
export function getLS<T>(key: StorageKey): T | null {
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
