import { createContext } from 'react';
import { configure } from 'mobx';

// store modules
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
 * @class
 * combined root store
 */
class Store {
  /**
   * @constructor
   */
  constructor() {
    this.api = new API(this);
    this.settings = new Settings(this);
  }
}

// init store instance
export const store = new Store();
export const StoreContext = createContext(store);
