import styles from './TaskCard.module.scss';
import Button from '../button/Button';

export default function TaskCard({ task, onEdit, onDelete, flash }) {
  const handleDragStart = event => {
    event.dataTransfer.setData('text/plain', `${task.id}`);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${styles.taskCard} ${flash ? styles.flash : ''}`}
      onClick={() => onEdit(task)}
      draggable
      onDragStart={handleDragStart}
    >
      <div className={styles.taskTitle}>{task.title}</div>
      {task.description && <div className={styles.taskDesc}>{task.description}</div>}
      <div className={styles.taskMeta}>
        <span className={styles.taskAuthor}>@{task.author}</span>
        <div className={styles.taskActions} onClick={e => e.stopPropagation()}>
          <Button type="secondary" text="✏️" title="Edit" onClickHandler={() => onEdit(task)} isIcon={true} />
          <Button type="secondary" text="🗑️" title="Delete" onClickHandler={() => onDelete(task.id)} isIcon={true} />
        </div>
      </div>
    </div>
  );
}
