import { createContext } from 'react';
import { configure } from 'mobx';

// store modules
import API from './modules/API';
import Settings from './modules/Settings';
import Translation from './modules/Translation';

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
export class Store {
  api = new API(this);
  settings = new Settings(this);
  translation = new Translation(this);
}

// init store instance
export const store = new Store();
export const StoreContext = createContext(store);
