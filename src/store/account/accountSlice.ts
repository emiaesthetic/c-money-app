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
  transactionStatus: '' | 'success' | 'error';
  loading: boolean;
} = {
  data: null,
  error: '',
  transactionStatus: '',
  loading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountRequest: (state, _: PayloadAction<string>) => {
      state.error = '';
      state.transactionStatus = '';
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
      state.loading = false;
    },
    accountFailureRequest: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
    accountTransactionRequest: (state, _: PayloadAction<ITransactionForm>) => {
      state.error = '';
      state.transactionStatus = '';
      state.loading = true;
    },
    accountTransactionSuccess: (state, action: PayloadAction<IAccount>) => {
      state.data = {
        ...action.payload,
        transactions: processAccountTransactions(action.payload),
        formattedBalance: formatBalance(action.payload.balance),
        formattedDate: formatDate(action.payload.date),
        isoDate: getIsoDate(action.payload.date),
      };
      state.transactionStatus = 'success';
      state.loading = false;
    },
    accountTransactionFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.transactionStatus = 'error';
      state.loading = false;
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
