import styles from './Toasts.module.scss';

export default function Toasts({ toasts }) {
  return (
    <div className={styles['toast-container']}>
      {toasts.map(t => (
        <div key={t.id} className={styles[`toast-${t.type}`]}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
