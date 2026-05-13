import Button from '../button/Button';
import styles from './DeleteConfirmModal.module.scss';

export default function DeleteConfirmModal({ title, onCancel, onConfirm }) {
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirm delete</h2>
        <p className={styles.message}>
          Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
        </p>
        <div className={styles.actions}>
          <Button type="secondary" text="Cancel" onClickHandler={onCancel} />
          <Button type="danger" text="Delete" onClickHandler={onConfirm} />
        </div>
      </div>
    </div>
  );
}
