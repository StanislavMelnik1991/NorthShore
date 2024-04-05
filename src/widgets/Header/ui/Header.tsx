import classNames from "classnames";
import { Link } from "react-router-dom";
import { getRouteMain } from "@shared/constants";
import { IconLogo } from "@shared/icons";
import styles from "./Header.module.scss";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  return (
    <header className={classNames(styles.wrapper, className)}>
      <div className={styles.logo}>
        <Link to={getRouteMain()}>
          <IconLogo width={140} />
        </Link>
      </div>
      <div className={styles.header}>header</div>
    </header>
  );
};
