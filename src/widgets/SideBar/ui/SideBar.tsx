import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { navBarItems } from "../config";
import { NavItem } from "./NavItem";
import styles from "./SideBar.module.scss";

interface Props {
  className?: string;
}

export const SideBar = ({ className }: Props) => {
  const location = useLocation();

  return (
    <div className={classNames(styles.wrapper, className)}>
      {navBarItems.map(({ href, icon, title, breadcrumbs }, index) => {
        return (
          <NavItem
            key={`nav-item-${index}`}
            href={href}
            icon={icon}
            pathname={location.pathname}
            title={title}
            breadcrumbs={breadcrumbs}
          />
        );
      })}
    </div>
  );
};
