import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/utils.scss';

// [tree-shakable] dynamic import sentry
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (import.meta.env.PROD && sentryDsn) {
  Promise.all([import('@sentry/react'), import('@sentry/tracing')]).then(
    ([Sentry, { Integrations }]) => {
      Sentry.init({
        dsn: `${sentryDsn}`,
        integrations: [new Integrations.BrowserTracing()],
        sampleRate: 1, // report all errors
        tracesSampleRate: 0.05, // report 5% of traces
      });
    }
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isCEFSharp } from 'ffxiv-overlay-api';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import DevPanel from './DevPanel';

let app = <App />;
// [tree-shakable] development panel
if (import.meta.env.DEV && !isCEFSharp()) {
  app = <DevPanel>{app}</DevPanel>;
}
// mount the app
const root = document.getElementById('root');
root &&
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>{app}</Provider>
    </StrictMode>
  );
