import classNames from "classnames";
import { useState } from "react";
import { IconDottedLine } from "@shared/icons";
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
      <IconDottedLine width={20} height={20} />
      {isShow && <PopUpMenu id={id} />}
    </div>
  );
};
