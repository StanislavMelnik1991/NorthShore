import classNames from "classnames";
import { useState } from "react";
import { Text } from "@shared/ui";
import styles from "./Controls.module.scss";
import { PopUpMenu } from "./PopUpMenu/PopUpMenu";

interface Props {
  className?: string;
  id: number;
}

export const TableControls = ({ className, id }: Props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className={classNames(styles.wrapper, className)}
      onClick={() => {
        setIsShow((val) => !val);
      }}
    >
      <Text fontWeight="regular" variant="body14">
        ...
      </Text>
      {isShow && <PopUpMenu id={id} />}
    </div>
  );
};
