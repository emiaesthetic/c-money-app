export interface ITransaction {
  amount: number;
  date: string;
  from: string;
  to: string;
  balanceBefore?: number;
  balanceAfter?: number;
  formattedDate?: string | null;
  isoDate?: string | undefined;
}

export interface IAccount {
  account: string;
  balance: number;
  date: string;
  mine: boolean;
  transactions: ITransaction[];
  formattedBalance?: string | null;
  formattedDate?: string | null;
  isoDate?: string | undefined;
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
