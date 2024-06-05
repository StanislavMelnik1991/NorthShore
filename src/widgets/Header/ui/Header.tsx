import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';
import { useUser } from '@features/User/hook';
import { AuthButton } from '@entities/components';
import { UserIcon } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconBurger, IconLogo } from '@shared/icons';
import { Loader } from '@shared/ui';
import styles from './Header.module.scss';

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const { user, isLoading, handleLogOut } = useUser();
  const { isShowBurgerMenu, toggleBurgerMenu, toggleUserMenu, btnRef } =
    usePopup();

  return (
    <>
      <header className={classNames(styles.wrapper, className)}>
        <div className={styles.logo}>
          <Link to={AppRoutes[AppRoutesEnum.MAIN]()}>
            <IconLogo width={140} />
          </Link>
        </div>
        <div className={styles.header}>
          <div className={styles.btnWrapper} ref={btnRef}>
            <div className={styles.auth}>
              {isLoading ? (
                <Loader size={40} />
              ) : user ? (
                <UserIcon user={user} onClick={toggleUserMenu} />
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
        </div>
      </header>
    </>
  );
};
