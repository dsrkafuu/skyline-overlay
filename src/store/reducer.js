import { combineReducers } from '@reduxjs/toolkit';

import combat from './slices/combat';
import settings from './slices/settings';

export default combineReducers({
  combat,
  settings,
});
