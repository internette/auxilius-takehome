import styles from './Button.module.scss';

export default function Button({ type = 'primary', title, text, onClickHandler, disabled = false, htmlType, isIcon = false }) {
  const buttonType = htmlType || (['button', 'submit', 'reset'].includes(type) ? type : 'button');

  return (
    <button
      className={`${styles.button} ${styles[type]} ${isIcon ? styles.icon : ''}`}
      type={buttonType}
      title={title}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

