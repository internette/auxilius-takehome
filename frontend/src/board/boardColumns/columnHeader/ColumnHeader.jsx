import styles from './ColumnHeader.module.scss';

export default function ColumnHeader({ label, dotClass, count }) {
  return (
    <div className={styles.columnHeader}>
      <span className={styles.colLabel}>
        <span className={`${styles.colDot} ${styles[dotClass]}`} />
        {label}
      </span>
      <span className={styles.colCount}>{count}</span>
    </div>
  );
}
