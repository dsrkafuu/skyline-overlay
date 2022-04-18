import { EXPORT_PREFIX, ThemeMapKey } from '../utils/constants';
import { getLS, removeLS, setLS } from '../utils/storage';
import { defaultSettings, Settings } from '../store/slices/settings';
import themes from "../themes"
import { ThemeColors, RGBAColor } from '../types/configuration';

export function exportSettings() {
  const settings = getLS('settings') as Partial<Settings>;
  if (settings && typeof settings === 'object') {
    try {
      return EXPORT_PREFIX + window.btoa(JSON.stringify(settings));
    } catch {
      return '';
    }
  }
  return '';
}

export function importSettings(payload: string) {
  if (!payload.startsWith(EXPORT_PREFIX)) {
    return false;
  }
  payload = payload.slice(EXPORT_PREFIX.length);
  const validKeys = Object.keys(defaultSettings);
  try {
    const settings = JSON.parse(window.atob(payload));
    if (!settings || typeof settings !== 'object') {
      return false;
    }
    for (const key of Object.keys(settings)) {
      if (!validKeys.includes(key)) {
        return false;
      }
    }
    setLS('settings', settings);
    return true;
  } catch {
    return false;
  }
}

export function getDefaultThemeColors() {
  const colors: {[key: ThemeMapKey]: ThemeColors} = {}

  Object.keys(themes).forEach(theme => {
    if (themes[theme].colors) {
      if (colors[theme]) {
        // merge old set colors with theme colors
        // this covers the case where themes add/subtract colors,
        // we keep backwards compatibility
        const themeColors: ThemeColors = {};
        Object.keys(themes[theme].colors!).forEach(colorKey => {
          themeColors[colorKey] = colors[theme][colorKey] || themes[theme].colors![colorKey]
        })
        colors[theme] = themeColors
      } else {
        // no colors have been set for this theme, so just default them
        colors[theme] = themes[theme].colors!;
      }
    } else {
      // no colors for this theme are available
      colors[theme] = {};
    }
  });

  console.log(colors)
  return colors
}

export function clearSettings() {
  removeLS('settings');
}
