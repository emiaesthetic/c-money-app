export interface ITransaction {
  amount: number;
  date: string;
  from: string;
  to: string;
}

export interface IAccount {
  account: string;
  balance: number;
  date: string;
  mine: boolean;
  transactions: ITransaction[];
}

export interface IAccountResponse {
  payload: IAccount;
  error: string;
}

export interface IAccountsResponse {
  payload: IAccount[];
  error: string;
}

export interface ITransactionForm {
  account: string;
  amount: number;
}

export interface ITransactionResponse {
  payload: ITransaction;
  error: string;
}
