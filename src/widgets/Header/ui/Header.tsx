import classNames from "classnames";
import { Link } from "react-router-dom";
import { useUser } from "@features/User/hook";
import { getRouteLogin, getRouteMain } from "@shared/constants";
import { IconHuman, IconLogo } from "@shared/icons";
import { Button, Loader } from "@shared/ui";
import styles from "./Header.module.scss";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const { user, isLoading } = useUser();
  return (
    <header className={classNames(styles.wrapper, className)}>
      <div className={styles.logo}>
        <Link to={getRouteMain()}>
          <IconLogo width={140} />
        </Link>
      </div>
      <div className={styles.header}>
        <div className={styles.auth}>
          {isLoading ? (
            <Loader size={40} />
          ) : user ? (
            <p>{user.name}</p>
          ) : (
            <Link to={getRouteLogin()}>
              <Button size="small" variant="primary">
                <IconHuman width={20} />
                Войти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
