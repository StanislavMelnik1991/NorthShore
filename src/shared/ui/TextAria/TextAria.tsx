import classNames from 'classnames';
import { type DetailedHTMLProps, type TextareaHTMLAttributes } from 'react';
import styles from './TextAria.module.scss';

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  wrapperClassName?: string;
  inputClassName?: string;
  className?: undefined;
  label?: string;
  error?: string;
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
}

export const StyledTextAria = ({
  wrapperClassName,
  inputClassName,
  error,
  label,
  leftItem,
  rightItem,
  ...props
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
          {label}
        </p>
      )}
      <div
        className={classNames(styles.border, {
          [styles.error]: !!error,
        })}
      >
        {leftItem}
        <textarea
          {...props}
          className={classNames(styles.input, inputClassName, {
            [styles.error]: !!error,
          })}
        />
        {rightItem}
      </div>
      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </label>
  );
};
