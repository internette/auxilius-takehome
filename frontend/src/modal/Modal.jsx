import styles from './Modal.module.scss';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
        <div className={styles.actions}>
          {actions}
        </div>
      </div>
    </div>
  );
}