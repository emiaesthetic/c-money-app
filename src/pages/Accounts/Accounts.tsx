import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAccounts, useDelayLoading } from '@/hooks';
import { createAccountRequest } from '@/store/accounts';
import { Button } from '@/ui/Button';
import { Heading } from '@/ui/Heading';
import { Preloader } from '@/ui/Preloader';

import { AccountCard } from './AccountCard';
import { SortSelect } from './SortSelect';

import styles from './Accounts.module.css';

type TSortKey = 'account' | 'balance' | 'date' | 'last';

export const Accounts = () => {
  const { data, error, loading } = useAccounts();
  const showLoading = useDelayLoading(loading);
  const [selectedSort, setSelectedSort] = useState<TSortKey | ''>('');

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createAccountRequest());
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value as TSortKey);
  };

  const sortedData = useMemo(() => {
    if (!data) return;

    const dataCopy = [...data];

    switch (selectedSort) {
      case 'account':
        return dataCopy.sort((a, b) => +a.account - +b.account);
      case 'balance':
        return dataCopy.sort((a, b) => a.balance - b.balance);
      case 'date':
        return dataCopy.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      case 'last':
        return dataCopy.sort((a, b) => {
          const transactionA = a.transactions[0];
          const transactionB = b.transactions[0];

          if (!transactionA || !transactionB) return 0;

          return (
            new Date(transactionA.date).getTime() -
            new Date(transactionB.date).getTime()
          );
        });
      default:
        return data;
    }
  }, [selectedSort, data]);

  if (showLoading) return <Preloader />;

  if (error) return <h1>{error}</h1>;

  if (!sortedData) return null;

  return (
    <section className={styles.accounts}>
      <header className={styles.accountsHeader}>
        <Heading>Здравствуйте, Александр!</Heading>
        <Button size="medium" onClick={handleClick} disabled={loading}>
          Открыть новый счет
        </Button>
      </header>

      <div className={styles.accountsContent}>
        <div className={styles.accountsToolbar}>
          <Heading level="h3" size="sizeMedium">
            Мои счета
          </Heading>
          <SortSelect onChange={handleChange} />
        </div>

        <ul className={styles.accountsList}>
          {sortedData.map(card => (
            <AccountCard key={card.account} {...card} />
          ))}
        </ul>
      </div>
    </section>
  );
};
