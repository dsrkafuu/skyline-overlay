import { defaultSettings, Settings } from '@/store/slices/settings';
import { defaultTheme, ThemeState } from '@/store/slices/theme';
import { EXPORT_PREFIX } from '@/utils/constants';
import { getLS, removeLS, setLS } from '@/utils/storage';

export function exportSettings() {
  const settings = getLS<DeepPartial<Settings>>('settings');
  let settingsEncoded = '';
  if (settings && typeof settings === 'object') {
    try {
      settingsEncoded = window.btoa(JSON.stringify(settings));
    } catch {
      settingsEncoded = '';
    }
  }
  const theme = getLS<DeepPartial<ThemeState>>('theme');
  let themeEncoded = '';
  if (theme && typeof theme === 'object') {
    try {
      themeEncoded = window.btoa(JSON.stringify(theme));
    } catch {
      themeEncoded = '';
    }
  }
  return EXPORT_PREFIX + settingsEncoded + '_' + themeEncoded;
}

export function importSettings(payload: string) {
  if (!payload.startsWith(EXPORT_PREFIX)) {
    return;
  }
  const payloadArr = payload.slice(EXPORT_PREFIX.length).split('_');
  const settingsEncoded = payloadArr[0];
  const themeEncoded = payloadArr[1];

  if (settingsEncoded) {
    const validSettingsKeys = Object.keys(defaultSettings);
    try {
      const settings = JSON.parse(window.atob(settingsEncoded));
      if (settings && typeof settings === 'object') {
        const filteredSettings = {} as any;
        for (const key of Object.keys(settings)) {
          if (validSettingsKeys.includes(key)) {
            filteredSettings[key] = settings[key];
          }
        }
        setLS('settings', settings);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }

  if (themeEncoded) {
    const validThemeKeys = Object.keys(defaultTheme);
    try {
      const theme = JSON.parse(window.atob(themeEncoded));
      if (theme && typeof theme === 'object') {
        const filteredTheme = {} as any;
        for (const key of Object.keys(theme)) {
          if (validThemeKeys.includes(key)) {
            filteredTheme[key] = theme[key];
          }
        }
        setLS('theme', theme);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }
}

export function clearSettings() {
  removeLS('settings');
  removeLS('theme');
}
