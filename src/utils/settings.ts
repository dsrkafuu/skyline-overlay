import { EXPORT_PREFIX } from '../utils/constants';
import { getLS, removeLS, setLS } from '../utils/storage';
import { defaultSettings, SettingsState } from '../store/slices/settings';

export function exportSettings() {
  const settings = getLS('settings') as Partial<SettingsState>;
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

export function clearSettings() {
  removeLS('settings');
}
