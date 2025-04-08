import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Main } from '@/components/main';

export const App = () => {
  return (
    <div className="page">
      <Header />
      <Main>
        <h1>C-Money App</h1>
      </Main>
      <Footer />
    </div>
  );
};
