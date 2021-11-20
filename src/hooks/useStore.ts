import { useContext } from 'react';
import { StoreContext } from '../store';

/**
 * hook for use of store
 */
function useStore() {
  return useContext(StoreContext);
}

export default useStore;
