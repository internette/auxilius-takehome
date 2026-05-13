import styles from './Button.module.scss';

export default function Button({ type = 'primary', title, text, onClickHandler }) {
  return (
    <button className={styles.button} type={type} title={title} onClick={onClickHandler}>
      {text}
    </button>
  );
}
