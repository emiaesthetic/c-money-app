import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { accountRequest } from '@/store/account';

export const useAccount = (id: string | undefined) => {
  const { data, error, transactionStatus, loading } = useSelector(
    (state: RootState) => state.account,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(accountRequest(id));
    }
  }, [id, dispatch]);

  return { data, error, transactionStatus, loading };
};
