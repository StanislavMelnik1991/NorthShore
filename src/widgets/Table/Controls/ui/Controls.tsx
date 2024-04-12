import classNames from "classnames";
import { IconDottedLine } from "@shared/icons";
import { useTableControls } from "../hook";
import styles from "./Controls.module.scss";
import { PopUpMenu } from "./PopUpMenu/PopUpMenu";

interface Props {
  className?: string;
  id: number;
  genUpdateRoute(id: number): string;
  genDetailsRoute(id: number): string;
}

export const TableControls = ({
  className,
  id,
  genDetailsRoute,
  genUpdateRoute,
}: Props) => {
  const {
    handleArchive,
    handleGoToDetails,
    handleGoToUpdate,
    isShow,
    setIsShow,
  } = useTableControls({
    id,
    genDetailsRoute,
    genUpdateRoute,
  });
  return (
    <div
      className={classNames(styles.wrapper, className)}
      onClick={() => {
        setIsShow((val) => !val);
      }}
    >
      <IconDottedLine width={20} height={20} />
      {isShow && (
        <PopUpMenu
          handleArchive={handleArchive}
          handleGoToDetails={handleGoToDetails}
          handleGoToUpdate={handleGoToUpdate}
        />
      )}
    </div>
  );
};
