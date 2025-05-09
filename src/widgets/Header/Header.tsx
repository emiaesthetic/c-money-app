import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { Button } from '@/ui/Button';
import { Layout } from '@/ui/Layout';
import { Logo } from '@/ui/Logo';

import ExitIcon from './img/exit.svg?react';

import styles from './Header.module.css';

export const Header = () => {
  const { isAuth, logout } = useAuth();

  return (
    <div className={styles.header}>
      <Layout>
        <div className={styles.container}>
          <Logo isAuth={isAuth} />

          {isAuth && (
            <div className={styles.nav}>
              <ul className={styles.list}>
                <li>
                  <Link className={styles.link} to="/accounts">
                    Счета
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to="/exchange">
                    Обмен
                  </Link>
                </li>
                <li>
                  <Button
                    variant="iconText"
                    gap="gap6"
                    type="button"
                    onClick={logout}
                  >
                    <span>Выход</span>
                    <ExitIcon className={styles.arrow} />
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};
