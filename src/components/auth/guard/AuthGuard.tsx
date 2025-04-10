import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const AuthGuard = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
};
