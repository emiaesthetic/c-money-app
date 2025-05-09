import { Link } from 'react-router-dom';

import LogoIcon from './img/logo.svg?react';

import styles from './Logo.module.css';

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
