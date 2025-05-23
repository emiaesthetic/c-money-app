import PreloaderIcon from './img/preloader.svg?react';

import styles from './Preloader.module.css';

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <PreloaderIcon className={styles.icon} aria-label="Загрузка..." />
    </div>
  );
};
