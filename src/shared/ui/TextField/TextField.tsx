import classNames from "classnames";
import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import styles from "./TextField.module.scss";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: undefined;
  wrapperClassName?: string;
  inputClassName?: string;
  className?: undefined;
  label?: string;
  error?: string;
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
}

export const TextField = ({
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
        <input
          {...props}
          className={classNames(styles.input, inputClassName, {
            [styles.error]: !!error,
          })}
          type={"text"}
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
