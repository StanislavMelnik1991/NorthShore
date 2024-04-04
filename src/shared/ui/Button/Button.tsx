import classNames from "classnames";
import styles from "./Button.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "large";
  width?: string | number;
  height?: string | number;
}

export const Button = ({
  className,
  variant = "primary",
  size = "small",
  style,
  width,
  height,
  ...props
}: Props) => {
  return (
    <button
      className={classNames(
        styles.wrapper,
        styles[size],
        styles[variant],
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    ></button>
  );
};
