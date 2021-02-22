import { useSelector, useDispatch } from 'react-redux';

import * as updaters from '@/store/slices/settings';
import { logError } from '@/utils/loggers';

/**
 * get settings and setters
 * @param {string} key
 * @return
 */
function useSettings(key) {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings[key]);
  const camelCase = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;

  let setSettings = null;
  if (updaters[`update${camelCase}`]) {
    setSettings = (payload) => dispatch(updaters[`update${camelCase}`](payload));
  } else {
    setSettings = () => {
      try {
        updaters[`update${camelCase}`]();
      } catch (e) {
        logError(e);
      }
    };
  }

  return [settings, setSettings];
}

export default useSettings;
