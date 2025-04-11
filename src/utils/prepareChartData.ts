import { ChartData } from 'chart.js';

import { IAccount, ITransaction } from '@/types';

const MONTHS = [
  'Янв',
  'Фев',
  'Март',
  'Апр',
  'Май',
  'Июнь',
  'Июль',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

const getYearTransactions = (data: ITransaction[], year: number) =>
  data.filter(transaction => new Date(transaction.date).getFullYear() === year);

const getPrevBalance = (
  balance: number,
  data: ITransaction[],
  year: number,
): number | undefined => {
  if (year <= 2000) return balance;

  const prevTransaction = data.find(
    transaction => new Date(transaction.date).getFullYear() === year,
  );
  return prevTransaction
    ? prevTransaction.balanceAfter
    : getPrevBalance(balance, data, year - 1);
};

const groupDataByMonth = (account: IAccount, year: number): number[] => {
  if (!account || !year) return [];

  const monthlyData = new Array(12).fill(null);
  const yearTransactions = getYearTransactions(account.transactions, year);

  yearTransactions.reverse().forEach(({ date, balanceAfter }) => {
    const month = new Date(date).getMonth();
    monthlyData[month] = balanceAfter;
  });

  for (let i = 0; i < monthlyData.length; i++) {
    if (!monthlyData[i] && monthlyData[i - 1]) {
      monthlyData[i] = monthlyData[i - 1];
    }
  }

  if (yearTransactions.length === 0) {
    const prevBalance = getPrevBalance(
      account.balance,
      account.transactions,
      year,
    );
    monthlyData.fill(prevBalance);
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (year === currentYear) {
    return monthlyData.slice(0, currentMonth + 1);
  }

  return monthlyData;
};

export const prepareChartData = (
  account: IAccount,
  year: number,
): ChartData<'line', number[], string> => {
  const monthlyData = groupDataByMonth(account, year);

  return {
    labels: MONTHS.slice(0, monthlyData.length),
    datasets: [
      {
        label: 'Динамика',
        data: monthlyData,
        backgroundColor: '#392350',
        borderColor: '#b865d6',
        borderWidth: 5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#392350',
        pointHoverBorderWidth: 3,
      },
    ],
  };
};
