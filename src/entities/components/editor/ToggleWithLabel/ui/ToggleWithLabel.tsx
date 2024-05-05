import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { Text, Toggle } from '@shared/ui';
import styles from './ToggleWithLabel.module.scss';

interface Props {
  className?: string;
  value: boolean;
  onChange: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

export const ToggleWithLabel = ({
  className,
  label,
  onChange,
  value,
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, className)}>
      <Text>{label}</Text>
      <Toggle value={value} onChange={onChange} />
    </label>
  );
};
