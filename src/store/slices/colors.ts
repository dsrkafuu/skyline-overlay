import {
  createListenerMiddleware,
  createSlice,
  PayloadAction as PA,
} from '@reduxjs/toolkit';
import { cloneDeep, mergeDeep } from '../../utils/lodash';
import { getAsyncLSSetter, getLS } from '../../utils/storage';
import { ColorsData } from '../../themes';
import { updateTheme } from './settings';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface Colors {
  preset: string; // preset key
  colors: Partial<ColorsData>; // custom colors
}

const saveColors = getAsyncLSSetter<DeepPartial<Colors>>('colors');

/** @redux initialize */

// initial colors
export const defaultColors: Colors = {
  preset: 'default',
  colors: {},
};
let initialState = cloneDeep(defaultColors);

// merge saved colors into default settings
const savedColors = (getLS('colors') || {}) as DeepPartial<Colors>;
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

/** @redux slice */

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    updatePreset(state, { payload }: PA<string>) {
      state.preset = payload;
      saveColors({ preset: state.preset });
    },
    updateColors(state, { payload }: PA<DeepPartial<ColorsData> | null>) {
      if (!payload) {
        state.colors = {};
      } else {
        state.colors = mergeDeep(state.colors, payload);
      }
      saveColors({ colors: state.colors });
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
    console.log(1);
    api.dispatch(updateColors(null));
  },
});
listener.startListening({
  actionCreator: updatePreset,
  effect: (_, api) => {
    api.dispatch(updateColors(null));
  },
});

export default {
  reducer: colorsSlice.reducer,
  middleware: listener.middleware,
};
