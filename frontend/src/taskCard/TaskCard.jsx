import styles from './TaskCard.module.scss';

export default function TaskCard({ task, onEdit, onDelete, flash }) {
  return (
    <div className={`${styles.taskCard} ${flash ? styles.flash : ''}`} onClick={() => onEdit(task)}>
      <div className={styles.taskTitle}>{task.title}</div>
      {task.description && <div className={styles.taskDesc}>{task.description}</div>}
      <div className={styles.taskMeta}>
        <span className={styles.taskAuthor}>@{task.author}</span>
        <div className={styles.taskActions} onClick={e => e.stopPropagation()}>
          <button className={styles.actionBtn} title="Edit" onClick={() => onEdit(task)}>✏️</button>
          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete" onClick={() => onDelete(task.id)}>🗑</button>
        </div>
      </div>
    </div>
  );
}
