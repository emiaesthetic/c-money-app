import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { Button } from '@/ui/button';
import { Layout } from '@/ui/layout';
import { Logo } from '@/ui/logo';

import styles from './header.module.css';

import ExitIcon from './img/exit.svg?react';

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
