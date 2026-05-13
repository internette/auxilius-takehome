import Button from '../../button/Button';
import './Header.scss';

export default function Header({ username, connected, onLogout }) {
  return (
    <header>
      <div className="header-brand">
        <h1>Kan<em>ban</em></h1>
        <div className={`live-dot${connected ? '' : ' offline'}`} title={connected ? 'Live' : 'Offline'} />
      </div>
      <div className="header-right">
        <span className="header-user">signed in as <strong>@{username}</strong></span>
        <Button type="secondary" text="Sign out" onClickHandler={onLogout} />
      </div>
    </header>
  );
}
