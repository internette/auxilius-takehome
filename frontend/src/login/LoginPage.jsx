import { useState } from 'react';
import Button from '../button/Button';
import Field from '../field/Field';
import styles from './Login.module.scss';

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
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Kan<em>ban</em></h1>
        <p>Real-time collaborative task board. Enter a username to get started.</p>
        <form onSubmit={submit}>
          <Field label="Username" inputType="input" autoFocus value={name} onChange={e => { setName(e.target.value); setErr(''); }} placeholder="e.g. alice" maxLength={32} />
          {err && <span className={styles.errorMsg}>{err}</span>}
          <Button type="primary" htmlType="submit" text="Enter board →" />
        </form>
      </div>
    </div>
  );
}
