import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useUser } from '@features/User';
import { NavItem, NavItemProps } from '@entities/components';
import { AccessRoles } from '@shared/constants';
import styles from './SideBar.module.scss';

interface Props {
  className?: string;
  config: NavItemProps[];
  children?: JSX.Element | Array<JSX.Element>;
}

export const SideBar = ({ className, config, children }: Props) => {
  const location = useLocation();
  const { user } = useUser();
  return (
    <div className={classNames(styles.wrapper, className)}>
      {config.map((elConfig, index) => {
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
