import { CurrencyBalance } from '@/types';
import { formatCurrencyAmount } from '@/utils';

import styles from './currencies.module.css';

export const Currencies = ({ data }: { data: CurrencyBalance[] }) => {
  return (
    <div className={styles.currencies}>
      <span className={styles.currenciesTitle}>Мои валюты</span>

      <ul className={styles.currenciesList}>
        {data.map(currency => (
          <li key={currency.code} className={styles.currenciesItem}>
            <span className={styles.currenciesLabel}>{currency.code}</span>
            <span className={styles.currenciesValue}>
              {currency.code === 'RUB'
                ? `${formatCurrencyAmount(currency.amount)} ₽`
                : formatCurrencyAmount(currency.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
