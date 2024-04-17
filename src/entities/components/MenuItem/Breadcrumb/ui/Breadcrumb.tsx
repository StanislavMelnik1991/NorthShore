import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { IconDot } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './Breadcrumb.module.scss';

interface Props {
  className?: string;
  title: string;
  href: string;
  pathname: string;
}

export const Breadcrumb = ({ className, href, title, pathname }: Props) => {
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
  return (
    <li>
      <NavLink
        className={classNames(
          styles.wrapper,
          {
            [styles.active]: isActive,
          },
          className,
        )}
        to={href}
      >
        <IconDot />
        <Text fontWeight={isActive ? 'semibold' : 'medium'} variant="body13">
          {title}
        </Text>
      </NavLink>
    </li>
  );
};
