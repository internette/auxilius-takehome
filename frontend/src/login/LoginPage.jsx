import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  const submit = e => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setErr('Please enter a username.'); return; }
    if (trimmed.length < 2) { setErr('Username must be at least 2 characters.'); return; }
    onLogin(trimmed);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Kan<em>ban</em></h1>
        <p>Real-time collaborative task board. Enter a username to get started.</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>Username</label>
            <input
              autoFocus
              value={name}
              onChange={e => { setName(e.target.value); setErr(''); }}
              placeholder="e.g. alice"
              maxLength={32}
            />
            {err && <span className="error-msg">{err}</span>}
          </div>
          <button className="btn-primary" type="submit">Enter board →</button>
        </form>
      </div>
    </div>
  );
}
