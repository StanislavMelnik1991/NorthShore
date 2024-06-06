import classNames from 'classnames';
import { memo, ReactElement } from 'react';
import { SCROLLING_CONTAINER_ID } from '@shared/constants/scrolling';
import { useMainLayout } from '../hook';
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
    const {
      isShowBurgerMenu,
      isShowUserMenu,
      isWebView,
      burgerMenuRef,
      userMenuRef,
    } = useMainLayout();
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
        <div className={styles.scrollingContainer} id={SCROLLING_CONTAINER_ID}>
          <div className={styles.content}>
            <div
              className={classNames(styles.popup, styles.burgerMenu, {
                [styles.hidePopup]: !isShowBurgerMenu,
                [styles.hide]: isWebView,
              })}
              ref={burgerMenuRef}
            >
              {burgerMenu}
            </div>
            <div
              className={classNames(styles.popup, styles.userMenu, {
                [styles.hidePopup]: !isShowUserMenu,
                [styles.hide]: isWebView,
              })}
              ref={userMenuRef}
            >
              {userMenu}
            </div>
            {content}
          </div>
          <div className={styles.footer}>{footer}</div>
        </div>
      </div>
    );
  },
);
