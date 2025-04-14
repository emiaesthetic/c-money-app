import React from 'react';
import { FixedSizeList as TransactionList } from 'react-window';

import { ITransaction } from '@/types';
import { Heading } from '@/ui/Heading';

import { TransactionItem } from './TransactionItem';

import styles from './TransactionHistory.module.css';

interface Props {
  account: string;
  transactions: ITransaction[];
}

interface ListChildComponentProps {
  index: number;
  style: React.CSSProperties;
}

export const TransactionHistory = ({ account, transactions }: Props) => {
  return (
    <div className={styles.transactionHistory}>
      <Heading level="h3" size="sizeMedium" marginBottom="mbSmall">
        История переводов
      </Heading>

      <div className={styles.transactionHistoryContent}>
        <div
          className={`${styles.transactionHistoryHeader} ${transactions.length > 9 ? styles.hasScroll : ''}`}
          role="rowgroup"
        >
          <div className={styles.transactionHistoryCell}>Счет</div>
          <div className={styles.transactionHistoryCell}>Сумма</div>
          <div className={styles.transactionHistoryCell}>Дата</div>
        </div>

        <TransactionList
          height={372}
          itemCount={transactions.length}
          itemSize={42}
          width="100%"
          className={styles.virtualList}
        >
          {({ index, style }: ListChildComponentProps) => (
            <TransactionItem
              key={index}
              account={account}
              transaction={transactions[index]}
              style={style}
            />
          )}
        </TransactionList>
      </div>
    </div>
  );
};
