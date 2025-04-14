import { IRate } from '@/types';

import styles from './RateItem.module.css';

import IndicatorIcon from './img/indicator.svg?react';

export const RateItem = ({ rate }: { rate: IRate }) => {
  return (
    <li className={styles.rateItem}>
      <span className={styles.rateCurrency} aria-label="Валютная пара">
        {rate.from}/{rate.to}
      </span>
      <span className={styles.rateDecor} aria-hidden="true"></span>
      <span className={styles.rateValue} aria-label="Изменение значения">
        <strong
          className={`${rate.change > 0 ? styles.ratePositive : styles.rateNegative}`}
        >
          {rate.rate}
        </strong>
        <IndicatorIcon
          className={`${styles.rateIndicate} ${rate.change > 0 ? styles.indicatePositive : styles.indicateNegative}`}
          aria-hidden="true"
        />
      </span>
    </li>
  );
};
