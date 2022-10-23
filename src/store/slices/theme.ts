import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { ThemeMapKey, ThemeModeMapKey } from '../../utils/maps';
import { mergeDeep } from '../../utils/lodash';
import { getAsyncLSSetter, getLS } from '../../utils/storage';
import { applyColors, Colors } from '../../themes/support/colors';
import { logDebug } from '../../utils/loggers';

export interface ThemeState {
  theme: ThemeMapKey;
  themeMode: ThemeModeMapKey;
  colors: DeepPartial<Colors>;
}

const save = getAsyncLSSetter<DeepPartial<ThemeState>>('theme');

/** @redux initialize */

// initial theme
export const defaultTheme: ThemeState = {
  theme: 'default',
  themeMode: 'role',
  colors: {},
};
let initialState = defaultTheme;

// merge saved theme
const savedTheme = getLS<DeepPartial<ThemeState>>('theme') || {};
try {
  logDebug('Store::Theme::mergeSavedTheme', savedTheme);
  initialState = mergeDeep(initialState, savedTheme);
} catch {
  // use default setting if saved settings is invalid
  logDebug('Store::Theme::invalidSavedTheme', savedTheme);
  initialState = defaultTheme;
}

// apply initial dom
function applyTheme(
  value: ThemeMapKey,
  themeMode: ThemeModeMapKey,
  colors: DeepPartial<Colors>
) {
  logDebug('Store::Theme::applyTheme', value, themeMode, colors);
  document.body.setAttribute('data-theme', value);
  applyColors(value, themeMode, colors);
}
applyTheme(initialState.theme, initialState.themeMode, initialState.colors);

/** @redux slice */

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme(state, { payload }: PA<ThemeMapKey>) {
      logDebug('Store::Theme::updateTheme', payload);
      state.theme = payload;
      save({ theme: state.theme });
    },
    updateThemeMode(state, { payload }: PA<ThemeModeMapKey>) {
      logDebug('Store::Theme::updateThemeMode', payload);
      state.themeMode = payload;
      save({ themeMode: state.themeMode });
    },
    updateColors(state, { payload }: PA<DeepPartial<Colors> | null>) {
      logDebug('Store::Theme::updateColors', payload);
      if (!payload) {
        state.colors = {};
      } else {
        state.colors = mergeDeep(state.colors, payload);
      }
      save({ colors: state.colors });
    },
  },
});

export const { updateTheme, updateThemeMode, updateColors } =
  themeSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// apply dom when theme changed
listener.startListening({
  actionCreator: updateTheme,
  effect: ({ payload }, api) => {
    const state = api.getState() as RootState;
    applyTheme(payload, state.theme.themeMode, state.theme.colors);
  },
});
listener.startListening({
  actionCreator: updateThemeMode,
  effect: ({ payload }, api) => {
    const state = api.getState() as RootState;
    applyTheme(state.theme.theme, payload, state.theme.colors);
  },
});
listener.startListening({
  actionCreator: updateColors,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    applyTheme(state.theme.theme, state.theme.themeMode, state.theme.colors);
  },
});

// reset mode & color when theme changes & mode changes
listener.startListening({
  actionCreator: updateTheme,
  effect: (_, api) => {
    logDebug('Listener::Theme::updateTheme::resetThemeMode');
    api.dispatch(updateThemeMode('role'));
  },
});
listener.startListening({
  actionCreator: updateThemeMode,
  effect: (_, api) => {
    logDebug('Listener::Theme::updateThemeMode::resetColors');
    api.dispatch(updateColors(null));
  },
});

export default {
  reducer: themeSlice.reducer,
  middleware: listener.middleware,
};
