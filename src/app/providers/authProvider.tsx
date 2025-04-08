import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts';
import { RootState } from '@/store';
import { authClearState, authRequest, authUpdateState } from '@/store/auth';
import { IFormData } from '@/types';
import { authStorage } from '@/utils';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { isAuth, error, loading } = useSelector(
    (state: RootState) => state.auth,
  );
  const token = authStorage.getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(authUpdateState(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (loading) return;

    const currentPath = location.pathname;
    const isAuthPage = ['/', '/login'].includes(currentPath);

    if (isAuth && isAuthPage) {
      navigate('/accounts', { replace: true });
      return;
    }

    if (!isAuth && !isAuthPage) {
      navigate('/login', { replace: true });
      return;
    }
  }, [isAuth, loading, navigate]);

  const login = (data: IFormData) => {
    dispatch(authRequest(data));
  };

  const logout = () => {
    dispatch(authClearState());
  };

  return (
    <AuthContext.Provider value={{ isAuth, error, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
