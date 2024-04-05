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
  error?: string;
}

export const TextField = ({
  wrapperClassName,
  inputClassName,
  error,
  ...props
}: Props) => {
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      <input
        {...props}
        className={classNames(styles.input, inputClassName, {
          [styles.error]: !!error,
        })}
        type={"text"}
      />
      {error && (
        <p className={classNames(styles.error, styles.label)}>{error}</p>
      )}
    </label>
  );
};
