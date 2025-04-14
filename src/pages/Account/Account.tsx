import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { useAccount, useDelayLoading } from '@/hooks';
import { accountTransactionRequest } from '@/store/account';
import { ITransactionForm } from '@/types';
import { Heading } from '@/ui/Heading';
import { Notification } from '@/ui/Notification';
import { Preloader } from '@/ui/Preloader';
import { getErrorMessage, prepareChartData } from '@/utils';

import { BalanceDynamics } from './BalanceDynamics';
import { TransactionForm } from './TransactionForm';
import { TransactionHistory } from './TransactionHistory';

import styles from './Account.module.css';

import ArrowIcon from './img/arrow.svg?react';

export const Account = () => {
  const { id } = useParams();
  const { data, error, errorTransaction, loading, isProcessing } =
    useAccount(id);
  const showLoading = useDelayLoading(loading);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [chartData, setChartData] = useState(
    data ? prepareChartData(data, year) : null,
  );

  const dispatch = useDispatch();
  const [hasTransactionCompleted, setHasTransactionCompleted] = useState(false);

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
    setHasTransactionCompleted(true);
  };

  useEffect(() => {
    if (data) {
      setChartData(prepareChartData(data, year));
    }
  }, [data, year]);

  useEffect(() => {
    if (hasTransactionCompleted) {
      const timer = setTimeout(() => {
        setHasTransactionCompleted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasTransactionCompleted]);

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
          <BalanceDynamics
            data={chartData || prepareChartData(data, year)}
            onChange={handleChange}
            selectOptions={getSelectOptions()}
          />
          <TransactionHistory {...data} />
        </div>

        <TransactionForm loading={isProcessing} onSubmit={handleSubmit} />
      </section>
      {hasTransactionCompleted && errorTransaction && (
        <Notification
          type="error"
          message={getErrorMessage(errorTransaction)}
        />
      )}

      {hasTransactionCompleted && !errorTransaction && (
        <Notification type="success" message="Транзакция успешно выполнена!" />
      )}
    </>
  );
};
