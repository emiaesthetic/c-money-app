import { useAuth } from '@/hooks';
import { Layout } from '@/ui/layout';
import { Logo } from '@/ui/logo';

import styles from './footer.module.css';

export const Footer = () => {
  const { isAuth } = useAuth();

  return (
    <footer className={styles.footer}>
      <Layout>
        <div className={styles.container}>
          <Logo isAuth={isAuth} />
          <span className={styles.copyright}>© C-Money, 2025</span>
        </div>
      </Layout>
    </footer>
  );
};
