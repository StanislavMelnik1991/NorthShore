import classNames from "classnames";
import { Loader } from "../Loader";
import styles from "./Card.module.scss";

interface Props {
  className?: string;
  children?: JSX.Element | Array<JSX.Element | string> | string | false;
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
  loading?: boolean;
  loaderSize?: number;
}

export const Card = ({
  className,
  children,
  padding,
  radius,
  flexDirection,
  gap,
  loading,
  loaderSize = 64,
}: Props) => {
  return (
    <main
      style={{ padding, borderRadius: radius, flexDirection, gap }}
      className={classNames(styles.wrapper, className)}
    >
      <div className={classNames(styles.loader, { [styles.show]: loading })}>
        <Loader size={loaderSize} />
      </div>
      {children}
    </main>
  );
};
