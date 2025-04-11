import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Account } from '@/components/account';
import { Auth } from '@/components/auth';
import { AuthGuard } from '@/components/auth/guard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Home } from '@/components/home';
import { Main } from '@/components/main';
import { authUpdateState } from '@/store/auth';
import { authStorage } from '@/utils';

import { AuthProvider } from './providers';

export const App = () => {
  const dispatch = useDispatch();
  const token = authStorage.getToken();

  if (token) {
    dispatch(authUpdateState(token));
  }

  return (
    <div className="page">
      <AuthProvider>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/login" element={<Auth />} />

            <Route element={<AuthGuard />}>
              <Route path="/accounts" element={<Home />} />
              <Route path="/account/:id" element={<Account />} />
            </Route>
          </Routes>
        </Main>
        <Footer />
      </AuthProvider>
    </div>
  );
};
