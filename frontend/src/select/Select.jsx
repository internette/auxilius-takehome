import styles from './Select.module.scss';

export default function Select({ children, ...props }) {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  );
}