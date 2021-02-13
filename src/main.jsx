/* deps */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
/* css */
import 'normalize.css';
import './scss/themes.scss';
import './scss/global.scss';
import './scss/utils.scss';
/* components */
import App from './App';
/* store */
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
