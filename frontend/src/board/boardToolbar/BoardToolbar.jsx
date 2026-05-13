import Button from '../../button/Button';
import styles from './BoardToolbar.module.scss';

export default function BoardToolbar({ tasksCount, columnsCount, onNewTask }) {
  return (
    <div className={styles['board-toolbar']}>
      <span className={styles['board-title']}>
        {tasksCount} task{tasksCount !== 1 ? 's' : ''} across {columnsCount} columns
      </span>
      <Button type="primary" text="+ New task" onClickHandler={onNewTask} />
    </div>
  );
}
