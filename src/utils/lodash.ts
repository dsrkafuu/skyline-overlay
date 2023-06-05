/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * simple deep clone polyfill
 */
function cloneDeepPolyfill<T>(src: T): T {
  const map = new Map();
  function _cloneDeep<T>(src: T): T {
    if (src && typeof src === 'object') {
      if (map.has(src)) {
        return map.get(src);
      }
      const ret = (Array.isArray(src) ? [] : {}) as T;
      map.set(src, ret);
      for (const key of Object.keys(src) as Array<keyof T>) {
        ret[key] = _cloneDeep(src[key]);
      }
      return ret;
    } else {
      return src;
    }
  }
  const ret = _cloneDeep(src);
  map.clear();
  return ret;
}

/**
 * native deep clone or simple polyfill
 */
export function cloneDeep<T>(src: T): T {
  if (typeof window.structuredClone === 'function') {
    // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
    return window.structuredClone(src);
  } else {
    return cloneDeepPolyfill(src);
  }
}

interface ObjectLike {
  [key: string]: any;
  length?: never;
}
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
function isObject(obj: any) {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  return false;
}
/**
 * custom deep merge
 */
export function mergeDeep<T extends ObjectLike[]>(
  ...objects: T
): UnionToIntersection<T[number]> {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = mergeDeep(
          result[key] as ObjectLike,
          current[key] as ObjectLike
        );
      } else {
        result[key] = current[key];
      }
    });
    return result;
  }, {}) as any;
}

/**
 * escape simple xss chars
 */
export function xssEscape(str: string) {
  return str.replace(/[<>&]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      default:
        return c;
    }
  });
}

export async function sha1(message: string) {
  const stable = message;
  const msgUint8 = new TextEncoder().encode(stable);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}
