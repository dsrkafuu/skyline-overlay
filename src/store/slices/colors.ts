import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { Settings, updateTheme } from './settings';
import { ColorsData, matchPreset } from '../../themes';
import { CSS_VARS_DOM_ID } from '../../utils/constants';
import { ThemeMapKey } from '../../utils/maps';
import { cloneDeep, mergeDeep } from '../../utils/lodash';
import { getAsyncLSSetter, getLS } from '../../utils/storage';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface Colors {
  preset: string; // preset key
  colors: DeepPartial<ColorsData>; // custom colors
}

const save = getAsyncLSSetter<DeepPartial<Colors>>('colors');

/** @redux initialize */

// initial colors
export const defaultColors: Colors = {
  preset: 'default',
  colors: {},
};
let initialState = cloneDeep(defaultColors);

// merge saved colors into default settings
const savedColors = (getLS('colors') || {}) as Partial<Colors>;
try {
  for (const key of Object.keys(savedColors) as Array<keyof Colors>) {
    if (savedColors[key] && typeof savedColors[key] === 'object') {
      // @ts-expect-error merge PartialColors into Colors
      initialState[key] = mergeDeep(initialState[key], savedColors[key]);
    } else {
      // @ts-expect-error merge plain values
      initialState[key] = savedColors[key];
    }
  }
} catch {
  // use default setting if saved settings is invalid
  initialState = {
    ...initialState,
    ...cloneDeep(defaultColors),
  };
}

// apply initial dom variables
function toCSSRGBA(color: RGBAColor): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}
function applyColors(
  theme: ThemeMapKey,
  preset: string,
  colors: DeepPartial<ColorsData>
) {
  let fc = matchPreset(theme, preset);
  fc = mergeDeep(fc, colors);
  let css = `--color-unknown: ${toCSSRGBA(fc.unknown)};\n`;
  css += `--color-self: ${toCSSRGBA(fc.self)};\n`;
  const objKeys = ['ticker', 'jobtype', 'job', 'theme'];
  for (const objKey of objKeys) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = fc[objKey as keyof ColorsData] as any;
    if (obj) {
      for (const varKey of Object.keys(obj)) {
        css += `--color-${objKey}-${varKey}: ${toCSSRGBA(obj[varKey])};\n`;
      }
    }
  }
  css = `body {\n${css}}`;
  const el = document.getElementById(CSS_VARS_DOM_ID);
  if (el) {
    el.innerHTML = css;
  } else {
    const newEl = document.createElement('style');
    newEl.id = CSS_VARS_DOM_ID;
    newEl.innerHTML = css;
    document.head.appendChild(newEl);
  }
}
const theme =
  ((getLS('settings') || {}) as Partial<Settings>).theme || 'default';
const preset = initialState.preset;
const colors = initialState.colors;
applyColors(theme, preset, colors);

/** @redux slice */

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    updatePreset(state, { payload }: PA<string>) {
      state.preset = payload;
      save({ preset: state.preset });
    },
    updateColors(state, { payload }: PA<DeepPartial<ColorsData> | null>) {
      if (!payload) {
        state.colors = {};
      } else {
        state.colors = mergeDeep(state.colors, payload);
      }
      save({ colors: state.colors });
    },
  },
});

export const { updatePreset, updateColors } = colorsSlice.actions;

/** @redux effects */

export const listener = createListenerMiddleware();

// clear custom color when theme changes & preset changes
listener.startListening({
  actionCreator: updateTheme,
  effect: (_, api) => {
    api.dispatch(updateColors(null));
  },
});
listener.startListening({
  actionCreator: updatePreset,
  effect: (_, api) => {
    api.dispatch(updateColors(null));
  },
});

// apply dom variables when color changes
listener.startListening({
  actionCreator: updateColors,
  effect: (_, api) => {
    const state = api.getState() as RootState;
    applyColors(state.settings.theme, state.colors.preset, state.colors.colors);
  },
});

export default {
  reducer: colorsSlice.reducer,
  middleware: listener.middleware,
};
