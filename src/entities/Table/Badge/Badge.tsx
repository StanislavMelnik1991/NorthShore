import classNames from "classnames";
import { Badge } from "@shared/ui";
import styles from "./Badge.module.scss";

interface Props {
  className?: string;
  is_draft: boolean;
}

export const TableBadge = ({ className, is_draft }: Props) => {
  return (
    <Badge
      className={classNames(styles.wrapper, className)}
      color={is_draft ? "green" : "violet"}
    >
      {is_draft ? "Размещено" : "Черновик"}
    </Badge>
  );
};
