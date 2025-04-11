import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAccount, ITransactionForm } from '@/types';
import {
  formatBalance,
  formatDate,
  getIsoDate,
  processAccountTransactions,
} from '@/utils';

const initialState: {
  data: IAccount | null;
  error: string;
  errorTransaction: string;
  loading: boolean;
  isProcessing: boolean;
} = {
  data: null,
  error: '',
  errorTransaction: '',
  loading: false,
  isProcessing: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountRequest: (state, _: PayloadAction<string>) => {
      state.error = '';
      state.errorTransaction = '';
      state.loading = true;
    },
    accountSuccessRequest: (state, action: PayloadAction<IAccount>) => {
      state.data = {
        ...action.payload,
        transactions: processAccountTransactions(action.payload),
        formattedBalance: formatBalance(action.payload.balance),
        formattedDate: formatDate(action.payload.date),
        isoDate: getIsoDate(action.payload.date),
      };
      state.error = '';
      state.loading = false;
    },
    accountFailureRequest: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
    accountTransactionRequest: (state, _: PayloadAction<ITransactionForm>) => {
      state.errorTransaction = '';
      state.isProcessing = true;
    },
    accountTransactionSuccess: (state, action: PayloadAction<IAccount>) => {
      state.data = {
        ...action.payload,
        transactions: processAccountTransactions(action.payload),
        formattedBalance: formatBalance(action.payload.balance),
        formattedDate: formatDate(action.payload.date),
        isoDate: getIsoDate(action.payload.date),
      };
      state.errorTransaction = '';
      state.isProcessing = false;
    },
    accountTransactionFailure: (state, action: PayloadAction<string>) => {
      state.errorTransaction = action.payload;
      state.isProcessing = false;
    },
  },
});

export const {
  accountRequest,
  accountSuccessRequest,
  accountFailureRequest,
  accountTransactionRequest,
  accountTransactionSuccess,
  accountTransactionFailure,
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
