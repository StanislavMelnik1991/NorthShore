import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './CheckBox.module.scss';
import { IconCheckboxChecked } from './icons';

type InputPrototype = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'value' | 'checked' | 'className' | 'onChange'
>;

interface Props extends InputPrototype {
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  value?: boolean;
  label?: string;
  onChange?: (val: boolean) => void;
}

export const CheckBox = ({
  wrapperClassName,
  inputClassName,
  labelClassName,
  value,
  label,
  onChange,
  disabled,
  ...props
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      <input
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={
          onChange
            ? (ev) => {
                onChange(ev.target.checked);
              }
            : undefined
        }
        disabled={disabled}
        {...props}
      />
      <IconCheckboxChecked
        className={classNames(
          styles.icon,
          { [styles.active]: value, [styles.disabled]: disabled },
          inputClassName,
        )}
      />
      <p className={classNames(styles.label, labelClassName)}>{label}</p>
    </label>
  );
};
