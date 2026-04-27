import 'normalize.css';
import './scss/utils.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { store } from './store';

let app = <App />;

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>{app}</Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}
