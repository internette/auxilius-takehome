import styles from './Select.module.scss';

export default function Select({ options = [], children, ...props }) {
  return (
    <select className={styles.select} {...props}>
      {options.length > 0
        ? options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
        : children
      }
    </select>
  );
}