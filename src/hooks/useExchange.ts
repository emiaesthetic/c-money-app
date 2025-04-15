import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { allCurrenciesRequest, mineCurrenciesRequest } from '@/store/exchange';

export const useExchange = () => {
  const { all, mine, error, convertStatus, loading } = useSelector(
    (state: RootState) => state.exchange,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCurrenciesRequest());
    dispatch(mineCurrenciesRequest());
  }, [dispatch]);

  return { all, mine, error, convertStatus, loading };
};
