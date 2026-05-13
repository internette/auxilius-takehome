import TaskCard from '../../../taskCard/TaskCard';
import './ColumnBody.module.scss';

export default function ColumnBody({ tasks, flashIds, onEdit, onDelete }) {
  return (
    <div className="column-body">
      {tasks.length === 0 ? (
        <div className="empty-col"><span>○</span>No tasks yet</div>
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
