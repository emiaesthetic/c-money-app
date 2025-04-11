import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAccount } from '@/types';
import {
  formatBalance,
  formatDate,
  getIsoDate,
  processAccountTransactions,
} from '@/utils';

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
      state.data = action.payload.map(account => ({
        ...account,
        transactions: processAccountTransactions(account),
        formattedBalance: formatBalance(account.balance),
        formattedDate: formatDate(account.date),
        isoDate: getIsoDate(account.date),
      }));
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
      const newAccount = {
        ...action.payload,
        formattedBalance: formatBalance(action.payload.balance),
        formattedDate: formatDate(action.payload.date),
        isoDate: getIsoDate(action.payload.date),
      };
      state.data = [newAccount, ...state.data];
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
