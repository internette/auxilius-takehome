import styles from './Button.module.scss';

export default function Button({ type = 'primary', title, text, onClickHandler }) {
  const htmlType = ['button', 'submit', 'reset'].includes(type) ? type : 'button';
  const variantClass = type === 'secondary' ? styles.secondary : styles.primary;

  return (
    <button className={`${styles.button} ${variantClass}`} type={htmlType} title={title} onClick={onClickHandler}>
      {text}
    </button>
  );
}
