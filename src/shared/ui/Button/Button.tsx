import classNames from "classnames";
import styles from "./Button.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button = ({ className, ...props }: Props) => {
  return (
    <button
      className={classNames(styles.wrapper, className)}
      {...props}
    ></button>
  );
};
