import Modal from '../modal/Modal';
import Button from '../button/Button';
import styles from './DeleteConfirmModal.module.scss';

export default function DeleteConfirmModal({ isOpen, title, onCancel, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirm delete"
      actions={
        <>
          <Button type="secondary" text="Cancel" onClickHandler={onCancel} />
          <Button type="danger" text="Delete" onClickHandler={onConfirm} />
        </>
      }
    >
      <p className={styles.message}>
        Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
      </p>
    </Modal>
  );
}
