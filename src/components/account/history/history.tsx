import React from 'react';
import { FixedSizeList as List } from 'react-window';

import { ITransaction } from '@/types';
import { Heading } from '@/ui/heading';
import { formatDate } from '@/utils';

import styles from './history.module.css';

interface Props {
  account: string;
  transactions: ITransaction[];
}

interface ListChildComponentProps {
  index: number;
  style: React.CSSProperties;
}

const Row = ({
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
    <div className={styles.row} style={style} role="row">
      <div className={styles.rowCell} role="cell">
        {isOutgoing ? to : from}
      </div>
      <div
        className={`${styles.rowCell} ${isOutgoing ? styles.negativeNum : styles.positiveNum}`}
        role="cell"
      >
        {amount}
      </div>
      <div className={styles.rowCell} role="cell">
        {formatDate(date)}
      </div>
    </div>
  );
};

export const History = ({ account, transactions }: Props) => {
  return (
    <div className={styles.history}>
      <Heading level="h3" size="sizeMedium" marginBottom="mbSmall">
        История переводов
      </Heading>

      <div className={styles.tableWrapper}>
        <div
          className={`${styles.header} ${transactions.length > 9 ? styles.hasScroll : ''}`}
          role="rowgroup"
        >
          <div className={styles.headerCell}>Счет</div>
          <div className={styles.headerCell}>Сумма</div>
          <div className={styles.headerCell}>Дата</div>
        </div>

        <List
          height={372}
          itemCount={transactions.length}
          itemSize={42}
          width="100%"
          className={styles.virtualList}
        >
          {({ index, style }: ListChildComponentProps) => (
            <Row
              key={index}
              account={account}
              transaction={transactions[index]}
              style={style}
            />
          )}
        </List>
      </div>
    </div>
  );
};
