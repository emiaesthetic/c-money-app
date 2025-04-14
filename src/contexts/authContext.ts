import { createContext } from 'react';

import { IAuthContext } from '@/types';

const initialState: IAuthContext = {
  isAuth: false,
  error: '',
  loading: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);
