import { ChartData } from 'chart.js';

import { ITransaction } from '@/types';

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

const calculateRunningBalance = (
  account: string,
  data: ITransaction[],
  year: number,
): number => {
  return data.reduce((balance, { amount, date, to, from }) => {
    if (new Date(date).getFullYear() >= year) return balance;
    return account === to
      ? balance + amount
      : account === from
        ? balance - amount
        : balance;
  }, 0);
};

const groupDataByMonth = (
  account: string | undefined,
  data: ITransaction[] | undefined,
  year: number | undefined,
): number[] => {
  if (!account || !data || !year) return [];

  const monthlyData = new Array(12).fill(0);

  const yearTransactions = getYearTransactions(data, year);

  let runningBalance = calculateRunningBalance(account, data, year);

  yearTransactions.map(({ amount, date, to }) => {
    const month = new Date(date).getMonth();
    runningBalance =
      account === to ? runningBalance + amount : runningBalance - amount;
    monthlyData[month] = runningBalance;
  });

  return monthlyData;
};

export const prepareChartData = (
  account: string | undefined,
  data: ITransaction[] | undefined,
  year: number | undefined,
): ChartData<'line', number[], string> => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Динамика',
        data: groupDataByMonth(account, data, year),
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
