import { useContext } from 'react';
import { StoreContext } from '../store';

/**
 * hook for use of store
 */
function useTranslation() {
  const store = useContext(StoreContext);
  return (key: string, idx?: number) => {
    const str = store.translation.data[key] || key;
    if (idx !== undefined) {
      const strs = str.split('|');
      return strs[idx] || '';
    } else {
      return str;
    }
  };
}

export default useTranslation;
