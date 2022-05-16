import { configureStore } from '@reduxjs/toolkit';
import api from './slices/api';
import settings from './slices/settings';
import colors from './slices/colors';

export const store = configureStore({
  reducer: {
    api: api.reducer,
    settings: settings.reducer,
    colors: colors.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(api.middleware)
      .prepend(settings.middleware)
      .prepend(colors.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
