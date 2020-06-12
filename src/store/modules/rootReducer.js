import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import produto from './produtos/reducer';
import cliente from './clientes/reducer';

const reducers = combineReducers({
  auth,
  user,
  produto,
  cliente,
});

export default reducers;
