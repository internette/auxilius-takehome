import TaskCard from '../../../taskCard/TaskCard';
import styles from './ColumnBody.module.scss';

export default function ColumnBody({ tasks, flashIds, onEdit, onDelete }) {
  return (
    <div className={styles['column-body']}>
      {tasks.length === 0 ? (
        <div className={styles['empty-col']}><span>○</span>No tasks yet</div>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            flash={flashIds.has(task.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
