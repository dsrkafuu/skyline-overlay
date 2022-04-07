import { configureStore } from '@reduxjs/toolkit';
import api from './slices/api';
import settings from './slices/settings';

export const store = configureStore({
  reducer: {
    api: api.reducer,
    settings: settings.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(api.middleware).prepend(settings.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
