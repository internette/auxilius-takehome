import Button from '../../button/Button';
import styles from './Header.module.scss';

export default function Header({ username, connected, onLogout }) {
  return (
    <header>
      <div className={styles['header-brand']}>
        <h1>🪶To-Do</h1>
        <div
          className={[styles['live-dot'], !connected && styles.offline].filter(Boolean).join(' ')}
          title={connected ? 'Live' : 'Offline'}
        />
      </div>
      <div className={styles['header-right']}>
        <span className={styles['header-user']}>
          signed in as <strong>@{username}</strong>
        </span>
        <Button type="secondary" text="Sign out" onClickHandler={onLogout} />
      </div>
    </header>
  );
}
