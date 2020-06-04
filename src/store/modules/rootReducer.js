import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import produto from './produtos/reducer';

const reducers = combineReducers({
  auth,
  user,
  produto,
});

export default reducers;
