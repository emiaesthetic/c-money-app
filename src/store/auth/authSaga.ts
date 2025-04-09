import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { IFormData } from '@/types';
import { API } from '@/utils';

import {
  authFailureRequest,
  authRequest,
  authSuccessRequest,
} from './authSlice';

interface IAuthResponse {
  payload: { token: string } | null;
  error: string;
}

function* fetchToken(action: PayloadAction<IFormData>) {
  const { username: login, password } = action.payload;

  try {
    const response: AxiosResponse<IAuthResponse> = yield axios(
      `${API.BASE_URL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          login,
          password,
        },
      },
    );

    const data = response.data;

    if (!data.payload && data.error) {
      yield put(authFailureRequest(data.error));
      return;
    }

    if (data.payload) {
      yield put(authSuccessRequest(data.payload.token));
    }
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Что-то пошло не так...';

    yield put(authFailureRequest(message));
  }
}

export function* watchAuth() {
  yield takeLatest(authRequest.type, fetchToken);
}
