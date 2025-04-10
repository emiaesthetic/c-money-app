import { Route, Routes } from 'react-router-dom';

import { Account } from '@/components/account';
import { Auth } from '@/components/auth';
import { AuthGuard } from '@/components/auth/guard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Home } from '@/components/home';
import { Main } from '@/components/main';

import { AuthProvider } from './providers';

export const App = () => {
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
