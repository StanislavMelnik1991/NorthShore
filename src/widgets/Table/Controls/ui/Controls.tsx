import classNames from 'classnames';
import { useRef } from 'react';
import { IconDottedLine } from '@shared/icons';
import { useTableControls } from '../hook';
import styles from './Controls.module.scss';
import { PopUpMenu } from './PopUpMenu/PopUpMenu';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
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
    wrapperRef,
  });
  return (
    <div
      className={classNames(styles.wrapper, className)}
      onClick={() => {
        setIsShow((val) => !val);
      }}
      ref={wrapperRef}
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
