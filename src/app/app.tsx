import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Account } from '@/pages/Account';
import { Accounts } from '@/pages/Accounts';
import { Auth } from '@/pages/Auth';
import { AuthGuard } from '@/pages/Auth/AuthGuard';
import { Exchange } from '@/pages/Exchange';
import { authStorage } from '@/services';
import { authUpdateState } from '@/store/auth';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { Main } from '@/widgets/Main';

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
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/account/:id" element={<Account />} />
              <Route path="/exchange" element={<Exchange />} />
            </Route>
          </Routes>
        </Main>
        <Footer />
      </AuthProvider>
    </div>
  );
};
