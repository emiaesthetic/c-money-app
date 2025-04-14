export interface IRate {
  type: string;
  from: string;
  to: string;
  rate: number;
  change: number;
}

export interface IConverterForm {
  from: string;
  to: string;
  amount: number;
}

export type TCurrency =
  | 'ETH'
  | 'BTC'
  | 'USD'
  | 'EUR'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'CNH'
  | 'HKD'
  | 'NZD'
  | 'RUB'
  | 'UAH'
  | 'BYR';

export interface IAllCurrenciesResponse {
  payload: TCurrency[];
  error: string;
}

export interface CurrencyBalance {
  code: TCurrency;
  amount: number;
}

export interface IMineCurrency {
  currency: CurrencyBalance;
}

export interface IMineCurrenciesResponse {
  payload: Record<TCurrency, CurrencyBalance>;
  error: string;
}
