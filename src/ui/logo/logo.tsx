import { Link } from 'react-router-dom';

import styles from './logo.module.css';

import LogoIcon from './img/logo.svg?react';

interface Props {
  isAuth: boolean;
}

export const Logo = ({ isAuth }: Props) => {
  return (
    <Link
      className={styles.logo}
      to={isAuth ? '/accounts' : '/'}
      aria-label="Логотип C-Money"
    >
      <LogoIcon />
    </Link>
  );
};
