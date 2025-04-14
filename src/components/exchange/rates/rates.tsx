import { IRate } from '@/types';
import { Heading } from '@/ui/heading';
import { Notification } from '@/ui/notification';

import styles from './rates.module.css';

import IndicatorIcon from './img/indicator.svg?react';

const RateItem = ({ rate }: { rate: IRate }) => {
  return (
    <li className={styles.ratesItem}>
      <span className={styles.ratesCurrency} aria-label="Валютная пара">
        {rate.from}/{rate.to}
      </span>
      <span className={styles.ratesDecor} aria-hidden="true"></span>
      <span className={styles.ratesValue} aria-label="Изменение значения">
        <strong
          className={`${rate.change > 0 ? styles.ratePositive : styles.rateNegative}`}
        >
          {rate.rate}
        </strong>
        <IndicatorIcon
          className={`${styles.ratesIndicate} ${rate.change > 0 ? styles.indicatePositive : styles.indicateNegative}`}
          aria-hidden="true"
        />
      </span>
    </li>
  );
};

const RateList = ({ data }: { data: IRate[] }) => {
  return (
    <ul className={styles.ratesList}>
      {data.map(rate => (
        <RateItem key={`${rate.from}/${rate.to}`} rate={rate} />
      ))}
    </ul>
  );
};

const RatePlaceholder = () => {
  return (
    <ul className={styles.ratesList}>
      <li key="placeholder" className={styles.ratesItem}>
        <span className={styles.placeholder}></span>
      </li>
    </ul>
  );
};

export const Rates = ({ data, error }: { data: IRate[]; error: string }) => {
  const loading = !data.length && !error;

  return (
    <>
      <div className={styles.rates}>
        <Heading level="h3" size="sizeSmall" marginBottom="mbSmall">
          Изменение курса в&nbsp;режиме реального времени
        </Heading>

        {loading && <RatePlaceholder />}
        {data && data.length > 0 && <RateList data={data} />}
      </div>
      {error && <Notification type="error" message={error} />}
    </>
  );
};
