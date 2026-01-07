import api from './slices/api';
import settings from './slices/settings';
import theme from './slices/theme';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    api: api.reducer,
    settings: settings.reducer,
    theme: theme.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(api.middleware)
      .prepend(settings.middleware)
      .prepend(theme.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
