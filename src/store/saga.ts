import { all } from 'redux-saga/effects';

import { watchAuth } from './auth/authSaga';

export function* rootSaga() {
  yield all([watchAuth()]);
}
