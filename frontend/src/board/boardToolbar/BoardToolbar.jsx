export default function BoardToolbar({ tasksCount, columnsCount, onNewTask }) {
  return (
    <div className="board-toolbar">
      <span className="board-title">
        {tasksCount} task{tasksCount !== 1 ? 's' : ''} across {columnsCount} columns
      </span>
      <button className="btn-new-task" onClick={onNewTask}>
        + New task
      </button>
    </div>
  );
}
