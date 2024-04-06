import classNames from "classnames";
import styles from "./Badge.module.scss";

interface Props {
  className?: string;
  children: JSX.Element | string;
  color?: "blue" | "dark" | "green" | "orange" | "red" | "violet";
}

export const Badge = ({ className, children, color = "green" }: Props) => {
  return (
    <div
      style={{
        backgroundColor: `var(--${color}-10)`,
        color: `var(--${color}-100)`,
      }}
      className={classNames(styles.wrapper, className)}
    >
      {children}
    </div>
  );
};
