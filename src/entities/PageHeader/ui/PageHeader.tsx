import classNames from "classnames";
import { Link } from "react-router-dom";
import { Text, Title } from "@shared/ui";
import styles from "./PageHeader.module.scss";

interface Props {
  className?: string;
  breadcrumbs: AtLeastOne<{ href: string; title: string }>;
}

type AtLeastOne<T> = [T, ...T[]];

export const PageHeader = ({ className, breadcrumbs }: Props) => {
  const last = breadcrumbs[breadcrumbs.length - 1];
  return (
    <header className={classNames(styles.wrapper, className)}>
      {breadcrumbs.length > 1 && (
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map(({ href, title }, index) => {
            return (
              <>
                <Link
                  className={styles.link}
                  to={href}
                  key={`page-header-breadcrumbs-${href}-${index}`}
                >
                  <Text>{title}</Text>
                </Link>
                <Text className={styles.separator}>/</Text>
              </>
            );
          })}
        </div>
      )}
      <Title fontWeight="bold" variant="h1">
        {last.title}
      </Title>
    </header>
  );
};
