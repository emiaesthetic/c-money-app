import { IAccount } from '@/types';
import { formatBalance, formatDate, getIsoDate } from '@/utils';

import styles from './card.module.css';

export const Card = ({ account, balance, date, transactions }: IAccount) => {
  return (
    <li className={styles.card}>
      <a className={`${styles.cardLink}`} href="/account">
        <span className={`visuallyHidden`}>{`Перейти к счету ${account}`}</span>
      </a>
      <p className={styles.cardId} aria-hidden="true">
        {account}
      </p>
      <p className={styles.cardBalance}>{formatBalance(balance)}</p>
      <div className={styles.cardInfo}>
        <div className={styles.cardOpen}>
          <p className={styles.cardLabel}>открыт</p>
          <time className={styles.cardTime} dateTime={getIsoDate(date)}>
            {formatDate(date)}
          </time>
        </div>

        {transactions[0] && (
          <div className={styles.cardLast}>
            <p className={styles.cardLabel}>последняя операция</p>
            <time
              className={styles.cardTime}
              dateTime={getIsoDate(transactions[0].date)}
            >
              {formatDate(transactions[0].date)}
            </time>
          </div>
        )}
      </div>
    </li>
  );
};
