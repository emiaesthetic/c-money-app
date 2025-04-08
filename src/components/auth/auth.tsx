import { useAuth } from '@/hooks';
import { Notification } from '@/ui/notification';
import { getErrorMessage } from '@/utils';

import { AuthForm } from './form';

import styles from './auth.module.css';

export const Auth = () => {
  const { loading, error, login } = useAuth();

  return (
    <>
      <div className={styles.auth}>
        <div className={styles.wrapper}>
          <AuthForm loading={loading} onSubmit={login} />
        </div>
      </div>
      {error && <Notification type="error" message={getErrorMessage(error)} />}
    </>
  );
};
