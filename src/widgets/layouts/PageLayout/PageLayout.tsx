import classNames from "classnames";
import styles from "./PageLayout.module.scss";

interface Props {
  className?: string;
  children?: JSX.Element | string | Array<JSX.Element | string>;
}

export const PageLayout = ({ className, children }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>{children}</div>
  );
};
