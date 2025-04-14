import { IRate } from '@/types';
import { Heading } from '@/ui/Heading';
import { Notification } from '@/ui/Notification';

import { RateList } from './RateList';
import { RatePlaceholder } from './RatePlaceholder';

import styles from './CurrencyRates.module.css';

export const CurrencyRates = ({
  data,
  error,
}: {
  data: IRate[];
  error: string;
}) => {
  const loading = !data.length && !error;

  return (
    <>
      <div className={styles.currencyRates}>
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
