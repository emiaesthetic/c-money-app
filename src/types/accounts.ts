interface ITransaction {
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
