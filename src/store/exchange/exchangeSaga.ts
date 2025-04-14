import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { API, authStorage } from '@/services';
import {
  IAllCurrenciesResponse,
  IConverterForm,
  IMineCurrenciesResponse,
} from '@/types';

import {
  allCurrenciesFailure,
  allCurrenciesRequest,
  allCurrenciesSuccess,
  changeCurrenciesFailure,
  changeCurrenciesRequest,
  changeCurrenciesSuccess,
  mineCurrenciesFailure,
  mineCurrenciesRequest,
  mineCurrenciesSuccess,
} from './exchangeSlice';

function* fetchAllCurrencies() {
  const token = authStorage.getToken();
  if (!token) return;

  try {
    const response: AxiosResponse<IAllCurrenciesResponse> = yield axios(
      `${API.BASE_URL}/all-currencies`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );

    const data = response.data;

    if (data.error) {
      yield put(allCurrenciesFailure(data.error));
      return;
    }

    yield put(allCurrenciesSuccess(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(allCurrenciesFailure(message));
  }
}

function* fetchMineCurrencies() {
  const token = authStorage.getToken();
  if (!token) return;

  try {
    const response: AxiosResponse<IMineCurrenciesResponse> = yield axios(
      `${API.BASE_URL}/currencies`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );

    const data = response.data;

    if (data.error) {
      yield put(mineCurrenciesFailure(data.error));
      return;
    }

    yield put(mineCurrenciesSuccess(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(mineCurrenciesFailure(message));
  }
}

function* fetchChange(action: PayloadAction<IConverterForm>) {
  const token = authStorage.getToken();
  if (!token) return;

  const { from, to, amount } = action.payload;

  try {
    const response: AxiosResponse<IMineCurrenciesResponse> = yield axios(
      `${API.BASE_URL}/currency-buy`,
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
      yield put(changeCurrenciesFailure(data.error));
      return;
    }

    yield put(changeCurrenciesSuccess(data.payload));
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(changeCurrenciesFailure(message));
  }
}

export function* watchExchange() {
  yield takeLatest(allCurrenciesRequest.type, fetchAllCurrencies);
  yield takeLatest(mineCurrenciesRequest.type, fetchMineCurrencies);
  yield takeLatest(changeCurrenciesRequest.type, fetchChange);
}
