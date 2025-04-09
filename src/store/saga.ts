import { all } from 'redux-saga/effects';

import { watchAccounts } from './accounts';
import { watchAuth } from './auth';

export function* rootSaga() {
  yield all([watchAuth(), watchAccounts()]);
}
