import useAppSelector from './useAppSelector';
import lang from '@/lang';
import { useCallback } from 'react';

/**
 * hook for use of translation
 */
function useTranslation() {
  const key = useAppSelector((state) => state.settings.lang);
  const data = lang[key].translation;

  return useCallback(
    (key: string, idx?: number) => {
      const str = data[key] || key;
      if (idx !== undefined) {
        const strs = str.split('|');
        return strs[idx] || '';
      } else {
        return str;
      }
    },
    [data]
  );
}

export default useTranslation;
