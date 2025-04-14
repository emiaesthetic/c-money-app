import styles from './error.module.css';

interface Props {
  message: string | undefined;
  position?: 'top' | 'bottom';
}

export const Error = ({ message, position = 'top' }: Props) => {
  if (!message) return null;

  return (
    <span className={`${styles.error} ${styles[position]}`}>{message}</span>
  );
};
