import { ReactNode } from 'react';

import { Layout } from '@/ui/Layout';

import styles from './Main.module.css';

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className={styles.main}>
      <Layout>{children}</Layout>
    </main>
  );
};
