import { ReactNode } from 'react';

import { Layout } from '@/ui/layout';

import styles from './main.module.css';

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <main className={styles.main}>
      <Layout>{children}</Layout>
    </main>
  );
};
