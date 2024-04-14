import classNames from "classnames";
import { format } from "date-fns";
import { DateDetails, LinkDetails } from "@entities/Details";
import { CurrentSkeleton } from "@entities/skeletons";
import { Badge, Title } from "@shared/ui";
import styles from "./Content.module.scss";

interface Props {
  className?: string;
  isLoading?: boolean;
  created_at?: Date;
  title?: string;
  html?: string;
  date?: Date;
  link?: string;
}

export const ContentWidget = ({
  className,
  isLoading,
  created_at,
  html = "",
  title,
  date,
  link,
}: Props) => {
  return (
    <CurrentSkeleton
      className={classNames(styles.wrapper, className)}
      isLoading={isLoading}
    >
      {created_at && (
        <Badge color="dark">{format(created_at, "dd.MM.yyyy")}</Badge>
      )}
      <Title fontWeight="semibold" variant="h2">
        {title}
      </Title>
      {date && <DateDetails date={date} />}
      {link && <LinkDetails href={link} />}
      <div
        className={styles.htmlContent}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </CurrentSkeleton>
  );
};