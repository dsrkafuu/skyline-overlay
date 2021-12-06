import 'normalize.css';
import './themes';
import './scss/fonts.scss';
import './scss/global.scss';

import ReactDOM from 'react-dom';
import { StoreContext, store } from './store';
import './i18n';
import App from './App';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
