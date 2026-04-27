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
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
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
export function mergeDeep<T extends ObjectLike[]>(...objects: T): UnionToIntersection<T[number]> {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = mergeDeep(result[key] as ObjectLike, current[key] as ObjectLike);
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

/**
 * debounce: only execute after `wait` ms of no calls
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}
