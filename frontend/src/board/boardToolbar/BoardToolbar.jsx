import Button from '../../button/Button';
import './BoardToolbar.scss';

export default function BoardToolbar({ tasksCount, columnsCount, onNewTask }) {
  return (
    <div className="board-toolbar">
      <span className="board-title">
        {tasksCount} task{tasksCount !== 1 ? 's' : ''} across {columnsCount} columns
      </span>
      <Button type="primary" text="+ New task" onClickHandler={onNewTask} />
    </div>
  );
}
