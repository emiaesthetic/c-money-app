import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, IFormData } from '@/types';

const initialState: IAuthState = {
  isAuth: false,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: (state, _action: PayloadAction<IFormData>) => {
      state.error = '';
      state.loading = true;
    },
    authSuccessRequest: (state, action: PayloadAction<string>) => {
      state.isAuth = !!action.payload;
      state.error = '';
      state.loading = false;
    },
    authFailureRequest: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.error = action.payload;
      state.loading = false;
    },
    authUpdateState: (state, action: PayloadAction<string>) => {
      state.isAuth = !!action.payload;
      state.loading = false;
    },
    authClearState: () => initialState,
  },
});

export const {
  authRequest,
  authSuccessRequest,
  authFailureRequest,
  authUpdateState,
  authClearState,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
