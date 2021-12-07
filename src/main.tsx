import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/global.scss';

import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const dsn = import.meta.env.VITE_SENTRY_DSN;
if (dsn && dsn !== 'undefined' && import.meta.env.PROD) {
  Sentry.init({
    dsn: `${dsn}`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

import { StoreContext, store } from './store';
import './i18n';
import App from './App';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
