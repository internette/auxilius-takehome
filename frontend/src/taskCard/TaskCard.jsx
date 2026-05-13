export default function TaskCard({ task, onEdit, onDelete, flash }) {
  return (
    <div className={`task-card${flash ? ' flash' : ''}`} onClick={() => onEdit(task)}>
      <div className="task-title">{task.title}</div>
      {task.description && <div className="task-desc">{task.description}</div>}
      <div className="task-meta">
        <span className="task-author">@{task.author}</span>
        <div className="task-actions" onClick={e => e.stopPropagation()}>
          <button className="action-btn" title="Edit" onClick={() => onEdit(task)}>✏️</button>
          <button className="action-btn delete" title="Delete" onClick={() => onDelete(task.id)}>🗑</button>
        </div>
      </div>
    </div>
  );
}
