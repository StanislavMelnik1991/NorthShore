import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from 'react';
import { Text, Toggle } from '@shared/ui';
import styles from './ToggleWithLabel.module.scss';

type ButtonPrototype = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'type' | 'value' | 'checked' | 'className' | 'onChange'
>;

interface Props extends ButtonPrototype {
  className?: string;
  toggleClassName?: string;
  value: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

export const ToggleWithLabel = ({
  className,
  toggleClassName,
  label,
  onChange,
  value,
  ...props
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, className)}>
      <Text>{label}</Text>
      <Toggle
        className={toggleClassName}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
};
