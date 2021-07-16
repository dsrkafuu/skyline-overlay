import { createContext } from 'react';
import { configure } from 'mobx';

// store modules
import Combat from './modules/Combat';
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
    this.combat = new Combat(this);
    this.settings = new Settings(this);
  }
}

// init store instance
export const store = new Store();
export const StoreContext = createContext(store);
