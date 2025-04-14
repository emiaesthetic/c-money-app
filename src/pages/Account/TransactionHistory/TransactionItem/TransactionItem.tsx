import { ITransaction } from '@/types';
import { formatDate } from '@/utils';

import styles from './TransactionItem.module.css';

export const TransactionItem = ({
  account,
  transaction,
  style,
}: {
  account: string;
  transaction: ITransaction;
  style: React.CSSProperties;
}) => {
  const { amount, date, to, from } = transaction;
  const isOutgoing = from === account;

  return (
    <div className={styles.transactionItem} style={style} role="row">
      <div className={styles.transactionItemCell} role="cell">
        {isOutgoing ? to : from}
      </div>
      <div
        className={`${styles.transactionItemCell} ${isOutgoing ? styles.negativeNum : styles.positiveNum}`}
        role="cell"
      >
        {amount}
      </div>
      <div className={styles.transactionItemCell} role="cell">
        {formatDate(date)}
      </div>
    </div>
  );
};
