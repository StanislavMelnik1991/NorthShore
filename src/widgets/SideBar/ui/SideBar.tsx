import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { NavItemProps } from "@entities/config";
import { NavItem } from "./NavItem";
import styles from "./SideBar.module.scss";

interface Props {
  className?: string;
  config: NavItemProps[];
}

export const SideBar = ({ className, config }: Props) => {
  const location = useLocation();
  return (
    <div className={classNames(styles.wrapper, className)}>
      {config.map(({ href, icon, title, breadcrumbs }, index) => {
        return (
          <NavItem
            key={`nav-item-${index}`}
            href={href}
            icon={icon}
            pathname={location.pathname}
            title={title}
            breadcrumbs={breadcrumbs}
            isEqualPath={index === 0}
          />
        );
      })}
    </div>
  );
};
