import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '../Button';

import CloseIcon from './img/close.svg?react';
import ErrorIcon from './img/error.svg?react';
import SuccessIcon from './img/success.svg?react';

import styles from './Notification.module.css';

interface Props {
  type: 'success' | 'error';
  message: string;
  position?: 'topRight';
}

const notifications = {
  success: { title: 'Успешно!', Icon: SuccessIcon },
  error: { title: 'Ошибка!', Icon: ErrorIcon },
};

export const Notification = ({
  type,
  position = 'topRight',
  message,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const { title, Icon } = notifications[type];

  useEffect(() => {
    if (message) {
      setIsShow(true);

      const timer = setTimeout(() => {
        setIsShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isShow || !message) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.notification} ${styles[type]} ${styles[position]}`}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
      </div>

      <Button variant="icon" type="button" onClick={() => setIsShow(false)}>
        <CloseIcon className={`${styles.closeIcon}`} aria-hidden="true" />
      </Button>
    </div>,
    document.getElementById('portal')!,
  );
};
