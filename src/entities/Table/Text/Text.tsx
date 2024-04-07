import classNames from "classnames";
import { Text } from "@shared/ui";
import styles from "./Text.module.scss";

interface Props {
  text: string;
  className?: string;
}

export const TableText = ({ text, className }: Props) => {
  return (
    <Text
      className={classNames(styles.wrapper, className)}
      fontWeight="regular"
      variant="body14"
    >
      {text}
    </Text>
  );
};
