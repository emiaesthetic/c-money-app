import { ReactNode } from 'react';

import styles from './label.module.css';

interface Props {
  htmlFor: string;
  children: ReactNode;
}

export const Label = ({ htmlFor, children }: Props) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
