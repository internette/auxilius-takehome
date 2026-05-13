export default function ColumnHeader({ label, dotClass, count }) {
  return (
    <div className="column-header">
      <span className="col-label">
        <span className={`col-dot ${dotClass}`} />
        {label}
      </span>
      <span className="col-count">{count}</span>
    </div>
  );
}
