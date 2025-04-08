import styles from './logo.module.css';

import LogoIcon from './img/logo.svg?react';

interface Props {
  isAuth: boolean;
}

export const Logo = ({ isAuth }: Props) => {
  return (
    <a
      className={styles.logo}
      href={isAuth ? '/accounts' : '/'}
      aria-label="Логотип C-Money"
    >
      <LogoIcon />
    </a>
  );
};
