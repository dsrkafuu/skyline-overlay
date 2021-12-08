/**
 * simple deep clone
 */
export function cloneDeep<T>(src: T): T {
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
