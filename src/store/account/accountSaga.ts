import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import { API, authStorage } from '@/services';
import { IAccountResponse, ITransactionForm } from '@/types';

import { RootState } from '..';
import {
  accountFailureRequest,
  accountRequest,
  accountSuccessRequest,
  accountTransactionFailure,
  accountTransactionRequest,
  accountTransactionSuccess,
} from './accountSlice';

function* fetchAccount(action: PayloadAction<string>) {
  const token = authStorage.getToken();
  if (!token) return;

  const accountID = action.payload;
  if (!accountID) return;

  try {
    const response: AxiosResponse<IAccountResponse> = yield axios(
      `${API.BASE_URL}/account/${accountID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );

    const data = response.data;
    if (data.error) {
      yield put(accountFailureRequest(data.error));
      return;
    }

    yield put(accountSuccessRequest(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(accountFailureRequest(message));
  }
}

function* fetchTransaction(action: PayloadAction<ITransactionForm>) {
  const token = authStorage.getToken();
  if (!token) return;

  const { account: to, amount } = action.payload;
  const { account: from } = yield select(
    (state: RootState) => state.account.data,
  );

  try {
    const response: AxiosResponse<IAccountResponse> = yield axios(
      `${API.BASE_URL}/transfer-funds`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`,
        },
        data: {
          from,
          to,
          amount,
        },
      },
    );

    const data = response.data;

    if (data.error) {
      yield put(accountTransactionFailure(data.error));
      return;
    }

    yield put(accountTransactionSuccess(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(accountFailureRequest(message));
  }
}

export function* watchAccount() {
  yield takeLatest(accountRequest.type, fetchAccount);
  yield takeLatest(accountTransactionRequest.type, fetchTransaction);
}
