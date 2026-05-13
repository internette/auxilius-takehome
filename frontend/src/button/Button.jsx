import styles from './Button.module.scss';

export default function Button({ type = 'primary', title, text, onClickHandler, disabled = false, htmlType }) {
  const buttonType = htmlType || (['button', 'submit', 'reset'].includes(type) ? type : 'button');

  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      type={buttonType}
      title={title}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

