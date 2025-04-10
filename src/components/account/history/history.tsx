import { ITransaction } from '@/types';
import { Heading } from '@/ui/heading';
import { formatDate } from '@/utils';

import styles from './history.module.css';

interface Props {
  account: string;
  transactions: ITransaction[];
}

export const History = ({ account, transactions }: Props) => {
  return (
    <div className={styles.history}>
      <Heading level="h3" size="sizeMedium" marginBottom="mbSmall">
        История переводов
      </Heading>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableTh}>Счет</th>
              <th className={styles.tableTh}>Сумма</th>
              <th className={styles.tableTh}>Дата</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {[...transactions]
              .reverse()
              .slice(0, 20)
              .map(({ amount, date, to, from }, index) => (
                <tr key={index}>
                  <td className={styles.tableTd}>
                    {from === account ? to : from}
                  </td>
                  <td
                    className={`${styles.tableTd} ${from === account ? styles.negativeNum : styles.positiveNum}`}
                  >
                    {amount}
                  </td>
                  <td className={styles.tableTd}>{formatDate(date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
