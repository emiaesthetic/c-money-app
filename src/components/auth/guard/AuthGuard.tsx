import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const AuthGuard = () => {
  const { isAuth } = useAuth();
  return !isAuth ? <Navigate to="/login" replace /> : <Outlet />;
};
