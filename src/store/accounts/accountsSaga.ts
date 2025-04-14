import axios, { AxiosError, AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { API, authStorage } from '@/services';
import { IAccountResponse, IAccountsResponse } from '@/types';

import {
  accountsFailureRequest,
  accountsRequest,
  accountsSuccessRequest,
  createAccountFailure,
  createAccountRequest,
  createAccountSuccess,
} from './accountsSlice';

function* fetchAccounts() {
  const token = authStorage.getToken();
  if (!token) return;

  try {
    const response: AxiosResponse<IAccountsResponse> = yield axios(
      `${API.BASE_URL}/accounts`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );

    const data = response.data;

    if (data.error) {
      yield put(accountsFailureRequest(data.error));
      return;
    }

    yield put(accountsSuccessRequest(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(accountsFailureRequest(message));
  }
}

function* createAccount() {
  const token = authStorage.getToken();
  if (!token) return;

  try {
    const response: AxiosResponse<IAccountResponse> = yield axios(
      `${API.BASE_URL}/create-account`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );

    const data = response.data;

    if (data.error) {
      yield put(createAccountFailure(data.error));
      return;
    }

    yield put(createAccountSuccess(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(accountsFailureRequest(message));
  }
}

export function* watchAccounts() {
  yield takeLatest(accountsRequest.type, fetchAccounts);
  yield takeLatest(createAccountRequest.type, createAccount);
}
