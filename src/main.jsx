import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/global.scss';
import './scss/utils.scss';

import ga from './plugins/ga';
ga();

import { StoreContext, store } from './store';
import './i18n';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
