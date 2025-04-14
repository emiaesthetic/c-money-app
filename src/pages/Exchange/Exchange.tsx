import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useDelayLoading, useExchange } from '@/hooks';
import {
  closeCurrencyRatesStream,
  connectToCurrencyRatesStream,
} from '@/services';
import { changeCurrenciesRequest } from '@/store/exchange';
import { IConverterForm, IRate } from '@/types';
import { Heading } from '@/ui/Heading';
import { Notification } from '@/ui/Notification';
import { Preloader } from '@/ui/Preloader';
import { getErrorMessage } from '@/utils';

import { CurrencyConverter } from './CurrencyConverter';
import { CurrencyRates } from './CurrencyRates';
import { UserCurrencies } from './UserCurrencies';

import styles from './Exchange.module.css';

const MAX_RATES_LENGTH = 10;

export const Exchange = () => {
  const { all, mine, error, convertError, loading } = useExchange();
  const showLoading = useDelayLoading(loading);
  const [rates, setRates] = useState<IRate[]>([]);
  const [ratesError, setRatesError] = useState<string>('');

  const dispatch = useDispatch();
  const [hasConvertCompleted, setHasConvertCompleted] = useState(false);

  const handleSubmit = (data: IConverterForm) => {
    dispatch(changeCurrenciesRequest(data));
    setHasConvertCompleted(true);
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

  useEffect(() => {
    if (hasConvertCompleted) {
      const timer = setTimeout(() => {
        setHasConvertCompleted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasConvertCompleted]);

  if (showLoading) return <Preloader />;

  if (error) return <h1>{error}</h1>;

  return (
    <>
      <section className={styles.exchange}>
        <Heading size="sizeMedium" marginBottom="mbMedium">
          Обмен валюты
        </Heading>

        <div className={styles.exchangeContent}>
          <CurrencyRates data={rates} error={ratesError} />
          <div className={styles.exchangeContentWrapper}>
            <CurrencyConverter
              all={all}
              mine={mine}
              isLoading={loading}
              onSubmit={handleSubmit}
            />
            <UserCurrencies data={mine} />
          </div>
        </div>
      </section>
      {hasConvertCompleted && convertError && (
        <Notification type="error" message={getErrorMessage(convertError)} />
      )}
      {hasConvertCompleted && !convertError && (
        <Notification type="success" message="Обмен валют успешно выполнен!" />
      )}
    </>
  );
};
