import { ChangeEvent } from 'react';

import styles from './sort.module.css';

interface Props {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Sort = ({ onChange }: Props) => {
  return (
    <div className={styles.sort}>
      <span className={styles.sortTitle}>Сортировка:</span>
      <select
        className={styles.sortSelect}
        name="sort"
        id="sort"
        onChange={onChange}
      >
        <option value="">Выберите значение</option>
        <option value="account">Номер счёта</option>
        <option value="balance">Баланс</option>
        <option value="date">Дата открытия</option>
        <option value="last">Дата последней транзакции</option>
      </select>
    </div>
  );
};
