import Input from '../input/Input';
import Select from '../select/Select';
import Textarea from '../textarea/Textarea';
import styles from './Field.module.scss';

export default function Field({ label, inputType, children, ...props }) {
  const renderInput = () => {
    switch (inputType) {
      case 'input':
        return <Input {...props} />;
      case 'textarea':
        return <Textarea {...props} />;
      case 'select':
        return <Select {...props}>{children}</Select>;
      default:
        return <Input {...props} />;
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {renderInput()}
    </div>
  );
}