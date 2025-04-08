import { Route, Routes } from 'react-router-dom';

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
            <Route path="/accounts" element={<AuthGuard />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </Main>
        <Footer />
      </AuthProvider>
    </div>
  );
};
