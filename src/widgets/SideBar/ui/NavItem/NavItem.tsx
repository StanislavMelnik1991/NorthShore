import classNames from "classnames";
import { useState } from "react";
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
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
  const [isExpanded, setIsExpanded] = useState(!isActive);

  return (
    <div className={styles.wrapper}>
      {breadcrumbs ? (
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
      {breadcrumbs && (
        <ul className={classNames(styles.list, { [styles.hide]: isExpanded })}>
          {breadcrumbs.map((el, index) => {
            return (
              <Breadcrumb
                className={styles.item}
                href={el.href}
                title={el.title}
                pathname={pathname}
                key={`navigation-breadcrumbs-${index}`}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
