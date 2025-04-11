import { IAccount } from '@/types';

export const getIsoDate = (date: string) => {
  if (!date) return undefined;
  return new Date(date).toISOString().split('T')[0];
};

export const formatDate = (date: string) => {
  if (!date) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return new Intl.DateTimeFormat('ru', options).format(new Date(date));
};

export const formatBalance = (balance: number) => {
  if (typeof balance !== 'number') return null;

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
  };

  return new Intl.NumberFormat('ru', options).format(balance);
};

export const processAccountTransactions = (account: IAccount) => {
  const transactions = [...(account.transactions || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  let runningBalance = account.balance;
  const transactionsWithBalance = transactions.map(transaction => {
    const balanceAfter = runningBalance;
    runningBalance =
      transaction.from === account.account
        ? runningBalance + transaction.amount
        : runningBalance - transaction.amount;

    return {
      ...transaction,
      balanceBefore: runningBalance,
      balanceAfter,
      formattedDate: formatDate(transaction.date),
      isoDate: getIsoDate(transaction.date),
    };
  });

  return transactionsWithBalance;
};
