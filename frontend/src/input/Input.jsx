import styles from './Input.module.scss';

export default function Input({ type = 'text', ...props }) {
  return (
    <input className={styles.input} type={type} {...props} />
  );
}