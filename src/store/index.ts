import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { accountReducer } from './account';
import { accountsReducer } from './accounts';
import { authReducer } from './auth';
import { exchangeReducer } from './exchange';
import { tokenMiddleware } from './middleware';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    accounts: accountsReducer,
    exchange: exchangeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
