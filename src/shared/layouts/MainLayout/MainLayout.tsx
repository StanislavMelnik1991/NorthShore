import classNames from "classnames";
import { memo, ReactElement } from "react";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
}

export const MainLayout = memo(
  ({ className, content, header, sidebar }: MainLayoutProps) => {
    return (
      <div className={classNames(styles.MainLayout, className)}>
        <div className={styles.header}>{header}</div>
        <div className={styles.sidebar}>{sidebar}</div>
        <div className={styles.content}>{content}</div>
      </div>
    );
  },
);
