import classNames from 'classnames';
import { NavItem, NavItemProps } from '@entities/components';
import { AccessRoles, ROLES_ADMIN } from '@shared/constants';
import { useSideBar } from '../hook';
import styles from './SideBar.module.scss';

interface Props {
  className?: string;
  config: NavItemProps[];
  children?: JSX.Element | Array<JSX.Element>;
}

export const SideBar = ({ className, config, children }: Props) => {
  const { user, handleCloseMenu, location } = useSideBar();
  return (
    <div className={classNames(styles.wrapper, className)}>
      {config.map((elConfig, index) => {
        if (user && ROLES_ADMIN.includes(user.group.id)) {
          return (
            <NavItem
              key={`nav-item-${index}`}
              pathname={location.pathname}
              {...elConfig}
            />
          );
        }
        if (elConfig.authOnly && !user) {
          return <></>;
        }
        if (elConfig.name && AccessRoles[elConfig.name] && !user) {
          return <></>;
        }
        if (
          elConfig.name &&
          AccessRoles[elConfig.name] &&
          user &&
          !AccessRoles[elConfig.name]?.some((val) =>
            user.role?.access_codes.map((el) => el.id).includes(val),
          )
        ) {
          return <></>;
        }
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
  );
};
