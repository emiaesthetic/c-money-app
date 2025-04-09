import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAccount } from '@/types';

const initialState: {
  data: IAccount[];
  error: string;
  loading: boolean;
  creating: boolean;
} = {
  data: [],
  error: '',
  loading: false,
  creating: false,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    accountsRequest: state => {
      state.error = '';
      state.loading = true;
    },
    accountsSuccessRequest: (state, action: PayloadAction<IAccount[]>) => {
      state.data = action.payload;
      state.error = '';
      state.loading = false;
    },
    accountsFailureRequest: (state, action: PayloadAction<string>) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
    },
    createAccountRequest: state => {
      state.error = '';
      state.creating = true;
    },
    createAccountSuccess: (state, action: PayloadAction<IAccount>) => {
      state.data = [...state.data, action.payload];
      state.error = '';
      state.creating = false;
    },
    createAccountFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.creating = false;
    },
  },
});

export const {
  accountsRequest,
  accountsSuccessRequest,
  accountsFailureRequest,
  createAccountRequest,
  createAccountSuccess,
  createAccountFailure,
} = accountsSlice.actions;

export const accountsReducer = accountsSlice.reducer;
