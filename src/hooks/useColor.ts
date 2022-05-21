import themes from '../themes';
import { Colors } from '../themes/support/colors';
import { mergeDeep } from '../utils/lodash';
import useAppSelector from './useAppSelector';

/**
 * hook for use of color
 */
function useColor<T>(getter: (colors: Colors) => T) {
  const theme = useAppSelector((state) => state.theme.theme);
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const colors = useAppSelector((state) => state.theme.colors);
  // merge full colors
  const themeData = themes[theme].data;
  let themeColors = themeData.colors[themeMode];
  if (!themeColors) {
    themeColors = themeData.colors.role;
  }
  const fullColors = mergeDeep(themeColors, colors) as Colors;
  // get color use selector
  return getter(fullColors);
}

export default useColor;
