import { Link } from 'react-router-dom';

import { IAccount } from '@/types';

import styles from './AccountCard.module.css';

export const AccountCard = ({
  account,
  transactions,
  formattedBalance,
  formattedDate,
  isoDate,
}: IAccount) => {
  return (
    <li className={styles.accountCard}>
      <Link className={`${styles.accountCardLink}`} to={`/account/${account}`}>
        <span className={`visuallyHidden`}>{`Перейти к счету ${account}`}</span>
      </Link>
      <p className={styles.accountCardId} aria-hidden="true">
        {account}
      </p>
      <p className={styles.accountCardBalance}>{formattedBalance}</p>
      <div className={styles.accountCardInfo}>
        <div className={styles.accountCardOpen}>
          <p className={styles.accountCardLabel}>открыт</p>
          <time className={styles.accountCardTime} dateTime={isoDate}>
            {formattedDate}
          </time>
        </div>

        {transactions[0] && (
          <div className={styles.accountCardLast}>
            <p className={styles.accountCardLabel}>последняя операция</p>
            <time
              className={styles.accountCardTime}
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
