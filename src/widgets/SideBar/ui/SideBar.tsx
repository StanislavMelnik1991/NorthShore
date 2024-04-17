import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { NavItem, NavItemProps } from '@entities/components';
import styles from './SideBar.module.scss';

interface Props {
  className?: string;
  config: NavItemProps[];
  children?: JSX.Element | Array<JSX.Element>;
}

export const SideBar = ({ className, config, children }: Props) => {
  const location = useLocation();
  return (
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
  );
};
