import { createContext } from 'react';
import { configure } from 'mobx';

// store modules
import Translation from './modules/Translation';
import API from './modules/API';
import Settings from './modules/Settings';

// strict mobx linter
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});

/**
 * combined root store
 */
class Store {
  translation = new Translation();
  settings = new Settings(this.translation);
  api = new API(this.settings);
}

// init store instance
export const store = new Store();
export const StoreContext = createContext(store);
