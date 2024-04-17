import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';
import { useUser } from '@features/User/hook';
import { AuthButton } from '@entities/AuthButton';
import { UserIcon } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconBurger, IconLogo } from '@shared/icons';
import { Button, Loader } from '@shared/ui';
import styles from './Header.module.scss';

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const { user, isLoading, handleLogOut } = useUser();
  const { isShowBurgerMenu, toggleBurgerMenu, toggleUserMenu } = usePopup();
  const { i18n } = useTranslation();

  // i18n.changeLanguage()
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
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
              <UserIcon userName={user.name} onClick={toggleUserMenu} />
            ) : (
              <AuthButton logout={handleLogOut} isLogin={!!user} />
            )}
          </div>
          <IconBurger
            onClick={toggleBurgerMenu}
            isMenuOpen={isShowBurgerMenu}
            className={styles.burger}
            width={24}
            height={24}
          />
        </div>
      </header>
    </>
  );
};
