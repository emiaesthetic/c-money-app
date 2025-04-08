import { createContext } from 'react';

import { IAuthContext } from '@/types';

const initialAuthState: IAuthContext = {
  isAuth: null,
  error: null,
  loading: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialAuthState);
