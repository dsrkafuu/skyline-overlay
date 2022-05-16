import { ColorsData, matchPreset } from '../themes';
import { mergeDeep } from '../utils/lodash';
import useAppSelector from './useAppSelector';

/**
 * hook for use of color
 */
function useColor<T>(getter: (colors: ColorsData) => T) {
  const theme = useAppSelector((state) => state.settings.theme);
  const preset = useAppSelector((state) => state.colors.preset);
  const colors = useAppSelector((state) => state.colors.colors);
  let fullColors = matchPreset(theme, preset);
  fullColors = mergeDeep(fullColors, colors);
  // get color use selector
  return getter(fullColors);
}

export default useColor;
