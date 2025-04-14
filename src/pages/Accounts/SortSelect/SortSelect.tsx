import { ChangeEvent } from 'react';

import styles from './SortSelect.module.css';

interface Props {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SortSelect = ({ onChange }: Props) => {
  return (
    <div className={styles.sort}>
      <span className={styles.sortTitle}>Сортировка:</span>
      <select
        className={styles.sortSelect}
        name="sort"
        id="sort"
        onChange={onChange}
      >
        <option value="" disabled hidden selected>
          Выберите значение
        </option>
        <option value="account">Номер счёта</option>
        <option value="balance">Баланс</option>
        <option value="date">Дата открытия</option>
        <option value="last">Дата последней транзакции</option>
      </select>
    </div>
  );
};
