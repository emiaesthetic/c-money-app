import { useAuth } from '@/hooks';
import { Layout } from '@/ui/Layout';
import { Logo } from '@/ui/Logo';

import styles from './Footer.module.css';

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
