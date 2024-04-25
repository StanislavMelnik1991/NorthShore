import classNames from 'classnames';
import { useRef } from 'react';
import { PopUpMenuItem } from '@entities/components';
import {
  IconDottedLine,
  IconDrawer,
  IconEyeOpen,
  IconPencil,
} from '@shared/icons';
import { Card } from '@shared/ui';
import { useTableControls } from '../hook';
import styles from './Controls.module.scss';

interface Props {
  className?: string;
  id: number;
  getUpdateRoute(id: number): string;
  getDetailsRoute(id: number): string;
}

export const TableControls = ({
  className,
  id,
  getDetailsRoute,
  getUpdateRoute,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    handleArchive,
    handleGoToDetails,
    handleGoToUpdate,
    isShow,
    setIsShow,
    t,
  } = useTableControls({
    id,
    getDetailsRoute,
    getUpdateRoute,
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
        <Card
          padding={6}
          flexDirection="column"
          className={classNames(styles.popup, className)}
        >
          <PopUpMenuItem
            onClick={handleGoToDetails}
            icon={<IconEyeOpen width={20} hanging={20} />}
            text={t('popup.preview')}
          />
          <PopUpMenuItem
            onClick={handleGoToUpdate}
            icon={<IconPencil width={20} hanging={20} />}
            text={t('popup.edit')}
          />
          <PopUpMenuItem
            onClick={handleArchive}
            icon={<IconDrawer width={20} hanging={20} />}
            text={t('popup.archive')}
          />
        </Card>
      )}
    </div>
  );
};
