import { Link } from 'react-router-dom';

import { IAccount } from '@/types';

import styles from './card.module.css';

export const Card = ({
  account,
  transactions,
  formattedBalance,
  formattedDate,
  isoDate,
}: IAccount) => {
  return (
    <li className={styles.card}>
      <Link className={`${styles.cardLink}`} to={`/account/${account}`}>
        <span className={`visuallyHidden`}>{`Перейти к счету ${account}`}</span>
      </Link>
      <p className={styles.cardId} aria-hidden="true">
        {account}
      </p>
      <p className={styles.cardBalance}>{formattedBalance}</p>
      <div className={styles.cardInfo}>
        <div className={styles.cardOpen}>
          <p className={styles.cardLabel}>открыт</p>
          <time className={styles.cardTime} dateTime={isoDate}>
            {formattedDate}
          </time>
        </div>

        {transactions[0] && (
          <div className={styles.cardLast}>
            <p className={styles.cardLabel}>последняя операция</p>
            <time
              className={styles.cardTime}
              dateTime={transactions[0].isoDate}
            >
              {transactions[0].formattedDate}
            </time>
          </div>
        )}
      </div>
    </li>
  );
};
