import classNames from "classnames";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavItemProps } from "@entities/config";
import { IconArrow } from "@shared/icons";
import { Text } from "@shared/ui";
import { Breadcrumb } from "./Breadcrumb";
import styles from "./NavItem.module.scss";

interface Props extends NavItemProps {
  pathname: string;
}

export const NavItem = ({
  href,
  pathname,
  icon: Icon,
  title,
  breadcrumbs,
}: Props) => {
  const breadcrumbsRef = useRef<HTMLUListElement>(null);
  const breadcrumbsPathArr = breadcrumbs?.map(({ href }) => href);
  const isActive = breadcrumbsPathArr?.length
    ? breadcrumbsPathArr.includes(pathname)
    : pathname === href;
  const [isExpanded, setIsExpanded] = useState(!isActive);

  const breadcrumbElementArr = breadcrumbs
    ?.map((el, index) => {
      if (!el.title) {
        return;
      }
      return (
        <Breadcrumb
          className={styles.item}
          href={el.href}
          title={el.title}
          pathname={pathname}
          key={`navigation-breadcrumbs-${index}`}
        />
      );
    })
    .filter((val) => !!val);

  return (
    <div className={styles.wrapper}>
      {breadcrumbElementArr && !!breadcrumbElementArr.length ? (
        <div
          onClick={() => setIsExpanded((val) => !val)}
          className={classNames(styles.item, styles.navLink, {
            [styles.active]: isActive,
          })}
        >
          <Icon width={20} theme={isActive ? "dark" : "light"} />
          <Text fontWeight="medium" variant="body14">
            {title}
          </Text>
          <IconArrow rotate={isExpanded ? 180 : 270} />
        </div>
      ) : (
        <NavLink
          to={href}
          className={classNames(styles.item, styles.navLink, {
            [styles.active]: isActive,
          })}
        >
          <Icon width={20} theme={isActive ? "dark" : "light"} />
          <Text fontWeight="medium" variant="body14">
            {title}
          </Text>
        </NavLink>
      )}
      {breadcrumbElementArr && !!breadcrumbElementArr.length && (
        <ul
          className={classNames(styles.list, { [styles.hide]: isExpanded })}
          ref={breadcrumbsRef}
        >
          {breadcrumbElementArr}
        </ul>
      )}
    </div>
  );
};
