import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { NavItem, NavItemProps } from '@entities/components';
import { IUser } from '@entities/types';
import { Text } from '@shared/ui';
import styles from './UserMenu.module.scss';

interface Props {
  className?: string;
  config: NavItemProps[];
  children?: JSX.Element | Array<JSX.Element>;
  user: IUser;
}

export const UserMenu = ({ className, config, children, user }: Props) => {
  const location = useLocation();
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
