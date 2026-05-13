import { useState } from 'react';

export default function TaskModal({ task, onClose, onSave, defaultStatus }) {
  const isNew = !task;
  const [title, setTitle]       = useState(task?.title || '');
  const [desc, setDesc]         = useState(task?.description || '');
  const [status, setStatus]     = useState(task?.status || defaultStatus || 'todo');
  const [saving, setSaving]     = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    await onSave({ title, description: desc, status });
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{isNew ? <><em>New</em> Task</> : <>Edit <em>Task</em></>}</h2>

        <div className="modal-field">
          <label>Title *</label>
          <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" maxLength={120} />
        </div>

        <div className="modal-field">
          <label>Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional details…" maxLength={600} />
        </div>

        <div className="modal-field">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={!title.trim() || saving}>
            {saving ? 'Saving…' : isNew ? 'Create task' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
