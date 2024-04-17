import classNames from 'classnames';
import { memo, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { usePopup } from '@features/Popup/hook';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  footer: ReactElement;
  burgerMenu?: ReactElement;
  userMenu?: ReactElement;
}

export const MainLayout = memo(
  ({
    className,
    content,
    header,
    sidebar,
    footer,
    burgerMenu,
    userMenu,
  }: MainLayoutProps) => {
    const location = useLocation();
    const { isShowBurgerMenu, isShowUserMenu } = usePopup();
    const isWebView =
      new URLSearchParams(location.search).get('mobile_view') === 'true';
    return (
      <div className={classNames(styles.MainLayout, className)}>
        <div
          className={classNames(styles.header, { [styles.hide]: isWebView })}
        >
          {header}
        </div>
        <div
          className={classNames(styles.sidebar, { [styles.hide]: isWebView })}
        >
          {sidebar}
        </div>
        <div className={styles.content}>
          <div
            className={classNames(styles.popup, styles.burgerMenu, {
              [styles.hidePopup]: !isShowBurgerMenu,
            })}
          >
            {burgerMenu}
          </div>
          <div
            className={classNames(styles.popup, styles.userMenu, {
              [styles.hidePopup]: !isShowUserMenu,
            })}
          >
            {userMenu}
          </div>
          {content}
        </div>
        <div className={styles.footer}>{footer}</div>
      </div>
    );
  },
);
