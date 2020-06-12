import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/saga';
import produto from './produtos/saga';
import cliente from './clientes/saga';

export default function* rootSaga() {
  return yield all([auth, user, produto, cliente]);
}
