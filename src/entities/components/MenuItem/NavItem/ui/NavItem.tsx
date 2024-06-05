import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { IconArrow } from '@shared/icons';
import { Text } from '@shared/ui';
import { NavItemProps } from '../../types';
import { useNavItem } from '../hook';
import styles from './NavItem.module.scss';

interface Props extends NavItemProps {
  pathname: string;
  onLinkClick?: () => void;
}

export const NavItem = ({
  href,
  pathname,
  icon: Icon,
  title,
  breadcrumbs,
  isLink,
  // acceptedGroups,
  onClick,
  onLinkClick,
}: Props) => {
  const {
    breadcrumbElementArr,
    isExpanded,
    handleToggleBreadcrumbs,
    isActive,
  } = useNavItem({ href, pathname, breadcrumbs, onLinkClick });

  if (isLink && href) {
    return (
      <NavLink
        onClick={onLinkClick}
        to={href}
        className={classNames(styles.item, styles.navLink, {
          [styles.active]: isActive,
        })}
      >
        <Icon
          className={styles.icon}
          width={20}
          height={20}
          theme={isActive ? 'dark' : 'light'}
        />
        <Text fontWeight="medium" variant="body14">
          {title}
        </Text>
      </NavLink>
    );
  } else {
    return (
      <div className={styles.wrapper} onClick={onClick}>
        <div
          onClick={handleToggleBreadcrumbs}
          className={classNames(styles.item, styles.navLink, {
            [styles.active]: isActive,
          })}
        >
          <Icon
            className={styles.icon}
            width={20}
            height={20}
            theme={isActive ? 'dark' : 'light'}
          />
          <Text fontWeight="medium" variant="body14">
            {title}
          </Text>
          {!!breadcrumbElementArr?.length && (
            <IconArrow
              className={styles.icon}
              width={20}
              height={20}
              rotate={isExpanded ? 180 : 270}
            />
          )}
        </div>
        {breadcrumbElementArr && !!breadcrumbElementArr.length && (
          <ul
            className={classNames(styles.list, {
              [styles.hide]: isExpanded,
            })}
          >
            {breadcrumbElementArr}
          </ul>
        )}
      </div>
    );
  }
};
