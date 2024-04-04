import classNames from "classnames";
import styles from "./Forbidden.module.scss";

interface Props {
  className?: string;
}

const ForbiddenPage = ({ className }: Props) => {
  return <div className={classNames(styles.wrapper, className)}>Forbidden</div>;
};

export default ForbiddenPage;
