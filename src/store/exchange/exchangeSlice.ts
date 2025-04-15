import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencyBalance, IConverterForm, TCurrency } from '@/types';

const initialState: {
  all: TCurrency[];
  mine: CurrencyBalance[];
  error: string;
  convertStatus: '' | 'success' | 'error';
  loading: boolean;
} = {
  all: [],
  mine: [],
  error: '',
  convertStatus: '',
  loading: false,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    allCurrenciesRequest: state => {
      state.error = '';
      state.convertStatus = '';
      state.loading = true;
    },
    allCurrenciesSuccess: (state, action: PayloadAction<TCurrency[]>) => {
      state.all = action.payload.sort();
      state.loading = false;
    },
    allCurrenciesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    mineCurrenciesRequest: state => {
      state.error = '';
      state.convertStatus = '';
      state.loading = true;
    },
    mineCurrenciesSuccess: (
      state,
      action: PayloadAction<Record<TCurrency, CurrencyBalance>>,
    ) => {
      state.mine = Object.values(action.payload)
        .filter(currency => currency.amount > 0)
        .sort();
      state.loading = false;
    },
    mineCurrenciesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    changeCurrenciesRequest: (state, _: PayloadAction<IConverterForm>) => {
      state.error = '';
      state.convertStatus = '';
      state.loading = true;
    },
    changeCurrenciesSuccess: (
      state,
      action: PayloadAction<Record<TCurrency, CurrencyBalance>>,
    ) => {
      state.mine = Object.values(action.payload)
        .filter(currency => currency.amount > 0)
        .sort();
      state.convertStatus = 'success';
      state.loading = false;
    },
    changeCurrenciesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.convertStatus = 'error';
      state.loading = false;
    },
  },
});

export const {
  allCurrenciesRequest,
  allCurrenciesSuccess,
  allCurrenciesFailure,
  mineCurrenciesRequest,
  mineCurrenciesSuccess,
  mineCurrenciesFailure,
  changeCurrenciesRequest,
  changeCurrenciesSuccess,
  changeCurrenciesFailure,
} = exchangeSlice.actions;

export const exchangeReducer = exchangeSlice.reducer;
