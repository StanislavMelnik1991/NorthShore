import classNames from 'classnames';
import { NavItem, NavItemProps } from '@entities/components';
import { IUser } from '@entities/types';
import { Text } from '@shared/ui';
import { useUserMenu } from '../hook';
import styles from './UserMenu.module.scss';

interface Props {
  className?: string;
  config: NavItemProps[];
  children?: JSX.Element | Array<JSX.Element>;
  user: IUser;
}

export const UserMenu = ({ className, config, children, user }: Props) => {
  const { handleCloseMenu, location } = useUserMenu();
  return (
    <div className={styles.menu__wrapper}>
      <div className={styles.avatar__wrapper}>
        {user.avatar ? (
          <div
            className={styles.avatar}
            style={{ background: 'url(' + user.avatar + ')' }}
          ></div>
        ) : (
          <div className={styles.avatar__circle}>{user.name[0]}</div>
        )}
        <Text className={styles.name} variant="body16">
          {user.name}
        </Text>
      </div>
      <div className={classNames(styles.wrapper, className)}>
        {config.map((elConfig, index) => {
          return (
            <NavItem
              onLinkClick={handleCloseMenu}
              key={`nav-item-${index}`}
              pathname={location.pathname}
              {...elConfig}
            />
          );
        })}
        {children}
      </div>
    </div>
  );
};
