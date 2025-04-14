import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useExchange } from '@/hooks';
import {
  closeCurrencyRatesStream,
  connectToCurrencyRatesStream,
} from '@/services';
import { changeCurrenciesRequest } from '@/store/exchange';
import { IConverterForm, IRate } from '@/types';
import { Heading } from '@/ui/heading';

import { Converter } from './converter';
import { Currencies } from './currencies';
import { Rates } from './rates';

import styles from './exchange.module.css';

const MAX_RATES_LENGTH = 10;

export const Exchange = () => {
  const { all, mine, loading } = useExchange();
  const [rates, setRates] = useState<IRate[]>([]);
  const [ratesError, setRatesError] = useState<string>('');

  const dispatch = useDispatch();

  const handleSubmit = (data: IConverterForm) => {
    dispatch(changeCurrenciesRequest(data));
  };

  const handleNewRate = useCallback((newRate: IRate) => {
    if (newRate.type !== 'EXCHANGE_RATE_CHANGE') return;

    setRates(prevRates => {
      const filtered = prevRates.filter(
        rate => !(rate.from === newRate.from && rate.to === newRate.to),
      );
      return [newRate, ...filtered].slice(0, MAX_RATES_LENGTH);
    });
  }, []);

  useEffect(() => {
    connectToCurrencyRatesStream(handleNewRate, setRatesError);

    return () => {
      closeCurrencyRatesStream();
    };
  }, [handleNewRate]);

  return (
    <section className={styles.exchange}>
      <Heading size="sizeMedium" marginBottom="mbMedium">
        Обмен валюты
      </Heading>

      <div className={styles.exchangeContent}>
        <Rates data={rates} error={ratesError} />
        <div className={styles.exchangeContentWrapper}>
          <Converter
            all={all}
            mine={mine}
            isLoading={loading}
            onSubmit={handleSubmit}
          />
          <Currencies data={mine} />
        </div>
      </div>
    </section>
  );
};
