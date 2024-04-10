import classNames from "classnames";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("main");
  // i18n.changeLanguage()
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <header className={classNames(styles.wrapper, className)}>
      <div className={styles.logo}>
        <Link to={getRouteMain()}>
          <IconLogo width={140} />
        </Link>
      </div>
      <div className={styles.header}>
        <div className={styles.auth}>
          <Button onClick={toggle} variant="light">
            {i18n.language}
          </Button>
          {isLoading ? (
            <Loader size={40} />
          ) : user ? (
            <p>{user.name}</p>
          ) : (
            <Link to={getRouteLogin()}>
              <Button size="small" variant="primary">
                <IconHuman width={20} />
                {t("header.login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
