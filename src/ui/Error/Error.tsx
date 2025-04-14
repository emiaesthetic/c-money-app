import styles from './Error.module.css';

export const Error = ({ message }: { message: string | undefined }) => {
  if (!message) return null;

  return <span className={`${styles.error}`}>{message}</span>;
};
