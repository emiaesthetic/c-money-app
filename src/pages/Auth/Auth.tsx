import { useAuth } from '@/hooks';
import { Notification } from '@/ui/Notification';
import { getErrorMessage } from '@/utils';

import { AuthForm } from './AuthForm';

import styles from './Auth.module.css';

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
