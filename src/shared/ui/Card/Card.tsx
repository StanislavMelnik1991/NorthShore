import classNames from "classnames";
import styles from "./Card.module.scss";

interface Props {
  className?: string;
  children: JSX.Element | Array<JSX.Element> | string;
  padding?: number;
  radius?: number;
  flexDirection?:
    | "column"
    | "column-reverse"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "row"
    | "row-reverse";
  gap?: number;
}

export const Card = ({
  className,
  children,
  padding,
  radius,
  flexDirection,
  gap,
}: Props) => {
  return (
    <main
      style={{ padding, borderRadius: radius, flexDirection, gap }}
      className={classNames(styles.wrapper, className)}
    >
      {children}
    </main>
  );
};
