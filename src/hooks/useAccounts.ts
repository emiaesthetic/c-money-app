import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { accountsRequest } from '@/store/accounts';

export const useAccounts = () => {
  const { data, error, loading } = useSelector(
    (state: RootState) => state.accounts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountsRequest());
  }, [dispatch]);

  return { data, error, loading };
};
