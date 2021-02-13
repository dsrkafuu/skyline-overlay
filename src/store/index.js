/**
 * [NOTES]
 *
 * http://bit.ly/373tW7R
 * write code that "mutates" inside the reducer is allowed,
 * like `state.list.push(item)` thanks to that RTK uses Immer to wrap the states,
 * which will safely return a correct immutably updated result
 *
 * http://bit.ly/3aXI03L
 * redux "ducks" pattern,
 * put all your action creators and reducers in one file,
 * do named exports of the action creators,
 * and a default export of the reducer function
 */

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
