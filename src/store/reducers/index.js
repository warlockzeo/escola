import { combineReducers } from 'redux';

import escola from './escola';
import user from './user';

export default combineReducers({
  escola, user
});
