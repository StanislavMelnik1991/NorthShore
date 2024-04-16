import classNames from "classnames";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "@features/User/hook";
import { AppRoutes, AppRoutesEnum } from "@shared/constants";
import { IconBurger, IconHuman, IconLogo } from "@shared/icons";
import { Button, Loader } from "@shared/ui";
import styles from "./Header.module.scss";

interface Props {
  className?: string;
  burgerMenu?: ReactElement;
}

export const Header = ({ className, burgerMenu }: Props) => {
  const { user, isLoading } = useUser();
  const { t, i18n } = useTranslation("main");
  const [open, setOpen] = useState(false);
  // i18n.changeLanguage()
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <>
      <header className={classNames(styles.wrapper, className)}>
        <div className={styles.logo}>
          <Link to={AppRoutes[AppRoutesEnum.MAIN]()}>
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
              <Link to={AppRoutes[AppRoutesEnum.LOGIN]()}>
                <Button size="small" variant="primary">
                  <IconHuman width={20} />
                  {t("header.login")}
                </Button>
              </Link>
            )}
          </div>
          <IconBurger
            onClick={() => setOpen((val) => !val)}
            isMenuOpen={open}
            className={styles.burger}
            width={24}
            height={24}
          />
        </div>
        <div className={classNames(styles.menu, { [styles.hide]: !open })}>
          {burgerMenu}
        </div>
      </header>
    </>
  );
};
