import classNames from "classnames";
import { memo, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  footer: ReactElement;
}

export const MainLayout = memo(
  ({ className, content, header, sidebar, footer }: MainLayoutProps) => {
    const location = useLocation();
    const isWebView =
      new URLSearchParams(location.search).get("mobile_view") === "true";
    return (
      <div className={classNames(styles.MainLayout, className)}>
        <div
          className={classNames(styles.header, { [styles.hide]: isWebView })}
        >
          {header}
        </div>
        <div
          className={classNames(styles.sidebar, { [styles.hide]: isWebView })}
        >
          {sidebar}
        </div>
        <div className={styles.content}>{content}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    );
  },
);
