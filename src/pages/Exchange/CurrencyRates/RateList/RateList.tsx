import { IRate } from '@/types';

import { RateItem } from '../RateItem';

import styles from './RateList.module.css';

export const RateList = ({ data }: { data: IRate[] }) => {
  return (
    <ul className={styles.ratesList}>
      {data.map(rate => (
        <RateItem key={`${rate.from}/${rate.to}`} rate={rate} />
      ))}
    </ul>
  );
};
