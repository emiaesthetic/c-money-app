import { CurrencyBalance } from '@/types';
import { formatCurrencyAmount } from '@/utils';

import styles from './UserCurrencies.module.css';

export const UserCurrencies = ({ data }: { data: CurrencyBalance[] }) => {
  return (
    <div className={styles.userCurrencies}>
      <span className={styles.userCurrenciesTitle}>Мои валюты</span>

      <ul className={styles.userCurrenciesList}>
        {data.map(currency => (
          <li key={currency.code} className={styles.userCurrenciesItem}>
            <span className={styles.userCurrenciesLabel}>{currency.code}</span>
            <span className={styles.userCurrenciesValue}>
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
