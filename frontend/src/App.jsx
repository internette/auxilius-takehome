import React, { useState, useCallback } from 'react';
import LoginPage from './login/LoginPage';
import Board from './board/Board';

// ── Helpers ──────────────────────────────────────────────────────────────────
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; }
    catch { return init; }
  });
  const set = useCallback(v => {
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
  }, [key]);
  return [val, set];
}

// ── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [username, setUsername] = useLocalStorage('kanban_user', null);

  return username
    ? <Board username={username} onLogout={() => setUsername(null)} />
    : <LoginPage onLogin={setUsername} />;
}
