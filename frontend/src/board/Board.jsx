import React, { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import Toasts from '../toasts/Toasts';
import TaskModal from '../taskModal/TaskModal';
import DeleteConfirmModal from '../confirm/DeleteConfirmModal';
import Header from './header/Header';
import BoardToolbar from './boardToolbar/BoardToolbar';
import BoardColumns from './boardColumns/BoardColumns';
import styles from './Board.module.scss';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const COLUMNS = [
  { key: 'todo',       label: 'To Do',       dotClass: 'todo' },
  { key: 'inprogress', label: 'In Progress',  dotClass: 'inprogress' },
  { key: 'done',       label: 'Done',         dotClass: 'done' },
];

let toastId = 0;

export default function Board({ username, onLogout }) {
  const [tasks, setTasks]       = useState([]);
  const [modal, setModal]       = useState(null); // null | { task, defaultStatus }
  const [deleteConfirm, setDeleteConfirm] = useState(null); // null | { id, title }
  const [connected, setConnected] = useState(false);
  const [toasts, setToasts]     = useState([]);
  const [flashIds, setFlashIds] = useState(new Set());
  const socketRef               = useRef(null);

  const addToast = useCallback((msg, type = 'update') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const flashCard = useCallback(id => {
    setFlashIds(prev => new Set([...prev, id]));
    setTimeout(() => setFlashIds(prev => { const s = new Set(prev); s.delete(id); return s; }), 700);
  }, []);

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(r => r.json())
      .then(setTasks)
      .catch(() => addToast('Failed to load tasks', 'delete'));
  }, []);

  useEffect(() => {
    const socket = io(API, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect',    () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('task:created', task => {
      if (task.author === username) return; // already applied optimistically
      setTasks(prev => [...prev, task]);
      addToast(`${task.author} created "${task.title}"`, 'create');
      setTimeout(() => flashCard(task.id), 50);
    });

    socket.on('task:updated', task => {
      if (task.author === username) {
        setTasks(prev => prev.map(t => t.id === task.id ? task : t));
        return;
      }
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      flashCard(task.id);
      addToast(`${task.author} updated "${task.title}"`, 'update');
    });

    socket.on('task:deleted', ({ id }) => {
      setTasks(prev => {
        const t = prev.find(x => x.id === id);
        if (t) addToast(`Task "${t.title}" was deleted`, 'delete');
        return prev.filter(x => x.id !== id);
      });
    });

    return () => socket.disconnect();
  }, [username]);

  const createTask = async ({ title, description, status }) => {
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status, author: username })
    });
    const task = await res.json();
    setTasks(prev => [...prev, task]);
    addToast(`Task "${task.title}" created`, 'create');
    setTimeout(() => flashCard(task.id), 50);
  };

  const updateTask = async (id, fields) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, author: username })
    });
    const task = await res.json();
    setTasks(prev => prev.map(t => t.id === id ? task : t));
  };

  const moveTask = async (id, status) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.status === status) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    await updateTask(id, { status });
  };

  const deleteTask = async id => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    addToast(`Deleted "${task?.title}"`, 'delete');
  };

  const requestDeleteTask = id => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setDeleteConfirm({ id, title: task.title });
  };

  const cancelDeleteTask = () => setDeleteConfirm(null);

  const confirmDeleteTask = async () => {
    if (!deleteConfirm?.id) return;
    await deleteTask(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  const handleSave = async ({ title, description, status }) => {
    if (modal.task) {
      await updateTask(modal.task.id, { title, description, status });
    } else {
      await createTask({ title, description, status });
    }
  };

  return (
    <>
      <Header username={username} connected={connected} onLogout={onLogout} />

      <div className={styles['board-wrap']}>
        <BoardToolbar
          tasksCount={tasks.length}
          columnsCount={COLUMNS.length}
          onNewTask={() => setModal({ task: null, defaultStatus: 'todo' })}
        />

        <BoardColumns
            tasks={tasks}
            flashIds={flashIds}
            onEdit={t => setModal({ task: t, defaultStatus: t.status })}
            onDelete={requestDeleteTask}
            onMove={moveTask}
        />
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmModal
          title={deleteConfirm.title}
          onCancel={cancelDeleteTask}
          onConfirm={confirmDeleteTask}
        />
      )}

      <Toasts toasts={toasts} />
    </>
  );
}
