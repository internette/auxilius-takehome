import { useState } from 'react';
import Button from '../Button';
import styles from './TaskModal.module.scss';

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
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{isNew ? <><em className={styles.titleEm}>New</em> Task</> : <>Edit <em className={styles.titleEm}>Task</em></>}</h2>

        <div className={styles.field}>
          <label className={styles.label}>Title *</label>
          <input className={styles.input} autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" maxLength={120} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea className={`${styles.input} ${styles.textarea}`} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional details…" maxLength={600} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select className={styles.input} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={styles.actions}>
          <Button
            type="secondary"
            title="Cancel"
            text="Cancel"
            onClickHandler={onClose}
          />
          <Button
            type="primary"
            title={isNew ? 'Create task' : 'Save changes'}
            text={saving ? 'Saving…' : isNew ? 'Create task' : 'Save changes'}
            onClickHandler={handleSave}
            disabled={!title.trim() || saving}
          />
        </div>
      </div>
    </div>
  );
}
