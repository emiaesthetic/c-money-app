import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { useAccount, useDelayLoading } from '@/hooks';
import { accountTransactionRequest } from '@/store/account';
import { ITransactionForm } from '@/types';
import { Heading } from '@/ui/heading';
import { Notification } from '@/ui/notification';
import { Preloader } from '@/ui/preloader';
import { getErrorMessage, prepareChartData } from '@/utils';

import { Dynamic } from './dynamic';
import { History } from './history';
import { TransactionForm } from './transactionForm';

import styles from './account.module.css';

import ArrowIcon from './img/arrow.svg?react';

export const Account = () => {
  const { id } = useParams();
  const { data, error, errorTransaction, loading, isProcessing } =
    useAccount(id);
  const showLoading = useDelayLoading(loading);
  console.log(errorTransaction);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [chartData, setChartData] = useState(
    prepareChartData(data?.account, data?.transactions, year),
  );

  const dispatch = useDispatch();

  const getSelectOptions = () => {
    if (!data) return [];

    const startYear = new Date(data.date).getFullYear();
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index,
    ).reverse();
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  const handleSubmit = (data: ITransactionForm) => {
    dispatch(accountTransactionRequest(data));
  };

  useEffect(() => {
    if (data) {
      setChartData(prepareChartData(data.account, data.transactions, year));
    }
  }, [data, year]);

  if (showLoading) return <Preloader />;

  if (error) return <h1>{error}</h1>;

  if (!data) return null;

  return (
    <>
      <section className={styles.account}>
        <header className={styles.accountHeader}>
          <Heading size="sizeMedium">Счет №{`${data.account}`}</Heading>
          <Link className={styles.accountLink} to="/accounts">
            <ArrowIcon className={styles.accountIcon} />
            <span>Вернуться</span>
          </Link>
        </header>
        <div className={styles.accountContent}>
          <Dynamic
            data={chartData}
            onChange={handleChange}
            selectOptions={getSelectOptions()}
          />
          <History {...data} />
        </div>

        <TransactionForm loading={isProcessing} onSubmit={handleSubmit} />
      </section>
      {errorTransaction && (
        <Notification
          type="error"
          message={getErrorMessage(errorTransaction)}
        />
      )}
    </>
  );
};
