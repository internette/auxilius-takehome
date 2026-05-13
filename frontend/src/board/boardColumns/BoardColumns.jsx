import React from 'react';
import TaskCard from '../../taskCard/TaskCard';

const COLUMNS = [
  { key: 'todo',       label: 'To Do',       dotClass: 'todo' },
  { key: 'inprogress', label: 'In Progress',  dotClass: 'inprogress' },
  { key: 'done',       label: 'Done',         dotClass: 'done' },
];

export default function BoardColumns({ tasks, flashIds, onEdit, onDelete }) {
  return (
    <div className="board-columns">
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.key);
        return (
          <div key={col.key} className="column" data-status={col.key}>
            <div className="column-header">
              <span className="col-label">
                <span className={`col-dot ${col.dotClass}`} />
                {col.label}
              </span>
              <span className="col-count">{colTasks.length}</span>
            </div>
            <div className="column-body">
              {colTasks.length === 0
                ? <div className="empty-col"><span>○</span>No tasks yet</div>
                : colTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      flash={flashIds.has(task.id)}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}
