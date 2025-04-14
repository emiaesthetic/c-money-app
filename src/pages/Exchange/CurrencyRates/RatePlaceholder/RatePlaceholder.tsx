import styles from './RatePlaceholder.module.css';

export const RatePlaceholder = () => {
  return (
    <ul className={styles.rateList}>
      <li key="placeholder" className={styles.rateItem}>
        <span className={styles.ratePlaceholder}></span>
      </li>
    </ul>
  );
};
