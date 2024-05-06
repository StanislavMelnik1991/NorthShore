import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from 'react';
import styles from './Toggle.module.scss';

type ButtonPrototype = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'type' | 'value' | 'checked' | 'className' | 'onChange'
>;

interface Props extends ButtonPrototype {
  className?: string;
  value: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
}

export const Toggle = ({ className, value, onChange, ...props }: Props) => {
  return (
    <button
      className={classNames(
        styles.wrapper,
        styles.wrapper,
        { [styles.toggled]: value },
        className,
      )}
      onClick={onChange}
      {...props}
    >
      <div className={styles.thumb}></div>
    </button>
  );
};
