import { useState } from 'react';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Field from '../field/Field';
import styles from './TaskModal.module.scss';

export default function TaskModal({ isOpen, task, onClose, onSave, defaultStatus }) {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? <><em className={styles.titleEm}>New</em> Task</> : <>Edit <em className={styles.titleEm}>Task</em></>}
      actions={
        <>
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
        </>
      }
    >
      <Field label="Title *" inputType="input" autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" maxLength={120} />

      <Field label="Description" inputType="textarea" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional details…" maxLength={600} />

      <Field label="Status" inputType="select" value={status} onChange={e => setStatus(e.target.value)} options={[
        { value: 'todo', label: 'To Do' },
        { value: 'inprogress', label: 'In Progress' },
        { value: 'done', label: 'Done' }
      ]} />
    </Modal>
  );
}
