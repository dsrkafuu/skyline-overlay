import 'normalize.css';
import './scss/utils.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { isCEFSharp } from './api';
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
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>{app}</Provider>
    </StrictMode>
  );
}
