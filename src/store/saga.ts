import { all } from 'redux-saga/effects';

import { watchAccount } from './account';
import { watchAccounts } from './accounts';
import { watchAuth } from './auth';
import { watchExchange } from './exchange';

export function* rootSaga() {
  yield all([watchAuth(), watchAccounts(), watchAccount(), watchExchange()]);
}
