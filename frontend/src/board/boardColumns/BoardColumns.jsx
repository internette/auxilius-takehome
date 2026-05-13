import React from 'react';
import styles from './BoardColumns.module.scss';
import ColumnHeader from './columnHeader/ColumnHeader';
import ColumnBody from './columnBody/ColumnBody';

const COLUMNS = [
  { key: 'todo',       label: 'To Do',       dotClass: 'todo' },
  { key: 'inprogress', label: 'In Progress',  dotClass: 'inprogress' },
  { key: 'done',       label: 'Done',         dotClass: 'done' },
];

export default function BoardColumns({ tasks, flashIds, onEdit, onDelete }) {
  return (
    <div className={styles['board-columns']}>
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.key);
        return (
          <div key={col.key} className={styles.column} data-status={col.key}>
            <ColumnHeader label={col.label} dotClass={col.dotClass} count={colTasks.length} />
            <ColumnBody
              tasks={colTasks}
              flashIds={flashIds}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        );
      })}
    </div>
  );
}
