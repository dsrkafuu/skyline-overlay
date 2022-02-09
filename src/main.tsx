import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/utils.scss';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import DevPlayground from './DevPlayground';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: `${sentryDsn}`,
    integrations: [new Integrations.BrowserTracing()],
    sampleRate: 1, // report all errors
    tracesSampleRate: 0.05, // report 5% of traces
    // show dialog when error
    // beforeSend(event) {
    //   if (event.exception) {
    //     Sentry.showReportDialog({ eventId: event.event_id });
    //   }
    //   return event;
    // },
  });
}

import ReactDOM from 'react-dom';
import { StoreContext, store } from './store';
import App from './App';

let app = <App />;
if (import.meta.env.DEV) {
  app = <DevPlayground>{app}</DevPlayground>
}

ReactDOM.render(
  <StoreContext.Provider value={store}>
    {app}
  </StoreContext.Provider>,
  document.getElementById('root')
);
