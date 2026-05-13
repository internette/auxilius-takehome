import styles from './Button.module.scss';

export default function Button({ type = 'primary', title, text, onClickHandler, disabled = false }) {
  const htmlType = ['button', 'submit', 'reset'].includes(type) ? type : 'button';

  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      type={htmlType}
      title={title}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

