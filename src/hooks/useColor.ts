import themes, { ColorsData } from '../themes';
import { mergeDeep } from '../utils/lodash';
import useAppSelector from './useAppSelector';

const matchMap = new Map<string, ColorsData>();

/**
 * hook for use of color
 */
function useColor<T>(getter: (colors: ColorsData) => T) {
  const theme = useAppSelector((state) => state.settings.theme);
  const preset = useAppSelector((state) => state.colors.preset);

  // colors in theme preset
  const matchKey = `${theme}|${preset}`;
  let presetColors = matchMap.get(matchKey);
  if (!presetColors) {
    const themeColorPresets = themes[theme].data.presets;
    let matchedPreset = themeColorPresets.find((item) => item.key === preset);
    if (!matchedPreset) {
      matchedPreset = themeColorPresets[0];
    }
    presetColors = matchedPreset.data;
    matchMap.set(matchKey, presetColors);
  }
  // colors custom selected by user
  const customColors = useAppSelector((state) => state.colors.colors);
  // merge to full colors map
  const fullColors: ColorsData = mergeDeep(presetColors, customColors);
  // get color use selector
  return getter(fullColors);
}

export default useColor;
