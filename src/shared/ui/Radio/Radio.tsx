import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IconRadioChecked } from './icons';
import styles from './Radio.module.scss';

type InputPrototype = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'value' | 'checked' | 'className' | 'onChange' | 'name'
>;

interface Props extends InputPrototype {
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  checked?: boolean;
  label?: string;
  onChange?: (val: boolean) => void;
  name: string;
}

export const Radio = ({
  wrapperClassName,
  inputClassName,
  labelClassName,
  checked,
  label,
  onChange,
  disabled,
  ...props
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      <input
        className={styles.input}
        type="radio"
        checked={checked}
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
      <IconRadioChecked
        className={classNames(
          styles.icon,
          { [styles.active]: checked, [styles.disabled]: disabled },
          inputClassName,
        )}
      />
      <p className={classNames(styles.label, labelClassName)}>{label}</p>
    </label>
  );
};
