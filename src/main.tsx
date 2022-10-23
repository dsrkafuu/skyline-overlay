import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/utils.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import DevPanel from './DevPanel';

let app = <App />;
// [tree-shakable] development panel
if (import.meta.env.DEV) {
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
