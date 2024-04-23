import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { PopUpMenuItem } from '@entities/components';
import {
  IconBasket,
  IconDottedLine,
  IconEyeOpen,
  IconMap,
  IconPencil,
} from '@shared/icons';
import { Card } from '@shared/ui';
import { useVideoCardControls } from '../hook';
import styles from './Controls.module.scss';

interface Props {
  className?: string;
  id: number;
  lat: number;
  lon: number;
  genUpdateRoute(id: number): string;
  genDetailsRoute(id: number): string;
  onDelete: MouseEventHandler<HTMLDivElement>;
}

export const VideoCardControls = ({
  className,
  id,
  lat,
  lon,
  genDetailsRoute,
  genUpdateRoute,
  onDelete,
}: Props) => {
  const {
    handleGoToDetails,
    handleGoToUpdate,
    isShow,
    setIsShow,
    handleMapOpen,
    t,
    wrapperRef,
  } = useVideoCardControls({
    id,
    genDetailsRoute,
    genUpdateRoute,
    lat,
    lon,
  });
  return (
    <div
      className={classNames(styles.wrapper, className)}
      onClick={() => {
        setIsShow((val) => !val);
      }}
      ref={wrapperRef}
    >
      <IconDottedLine rotate={90} width={20} height={20} />
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
            onClick={handleMapOpen}
            icon={<IconMap width={20} hanging={20} />}
            text={t('popup.map')}
          />
          <PopUpMenuItem
            className={styles.danger}
            onClick={onDelete}
            icon={<IconBasket width={20} hanging={20} />}
            text={t('popup.delete')}
          />
        </Card>
      )}
    </div>
  );
};
