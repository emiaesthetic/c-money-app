import styles from './error.module.css';

interface Props {
  message: string | undefined;
}

export const Error = ({ message }: Props) => {
  if (!message) return null;

  return <span className={styles.error}>{message}</span>;
};
