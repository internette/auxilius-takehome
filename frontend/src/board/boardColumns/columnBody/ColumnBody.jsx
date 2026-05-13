import { useState } from 'react';
import TaskCard from '../../../taskCard/TaskCard';
import styles from './ColumnBody.module.scss';

export default function ColumnBody({ status, tasks, flashIds, onEdit, onDelete, onMove }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const rawId = e.dataTransfer.getData('text/plain');
    if (!rawId) return;
    const id = /^[0-9]+$/.test(rawId) ? Number(rawId) : rawId;
    onMove(id, status);
  };

  return (
    <div
      className={`${styles['column-body']} ${dragOver ? styles['drag-over'] : ''}`}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
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
