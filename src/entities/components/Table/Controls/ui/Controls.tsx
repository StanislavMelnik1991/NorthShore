import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import {
  IconBasket,
  IconDottedLine,
  IconEyeOpen,
  IconLock,
  IconMap,
  IconPencil,
} from '@shared/icons';
import { Card } from '@shared/ui';
import { PopUpMenuItem } from '../../../';
import { useVideoCardControls } from '../hook';
import styles from './Controls.module.scss';

interface Props {
  className?: string;
  id: number;
  point?: {
    lat?: number;
    lon?: number;
  };
  getUpdateRoute?: (id: number) => string;
  getDetailsRoute?: (id: number) => string;
  onDelete?: MouseEventHandler<HTMLDivElement>;
  onOpen?: MouseEventHandler<HTMLDivElement>;
  rotateIcon?: boolean;
}

export const TableControls = ({
  className,
  id,
  point,
  getDetailsRoute,
  getUpdateRoute,
  onDelete,
  onOpen,
  rotateIcon,
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
    getDetailsRoute,
    getUpdateRoute,
    point,
  });
  return (
    <div
      className={classNames(styles.wrapper, className)}
      onClick={() => {
        setIsShow((val) => !val);
      }}
      ref={wrapperRef}
    >
      <IconDottedLine rotate={rotateIcon ? 90 : 0} width={20} height={20} />
      {isShow && (
        <Card
          padding={6}
          flexDirection="column"
          className={classNames(styles.popup, className)}
        >
          {getDetailsRoute && (
            <PopUpMenuItem
              onClick={handleGoToDetails}
              icon={<IconEyeOpen width={20} hanging={20} />}
              text={t('popup.preview')}
            />
          )}
          {getUpdateRoute && (
            <PopUpMenuItem
              onClick={handleGoToUpdate}
              icon={<IconPencil width={20} hanging={20} />}
              text={t('popup.edit')}
            />
          )}
          {point && (
            <PopUpMenuItem
              onClick={handleMapOpen}
              icon={<IconMap width={20} hanging={20} />}
              text={t('popup.map')}
            />
          )}
          {onOpen && (
            <PopUpMenuItem
              onClick={onOpen}
              icon={<IconLock width={20} hanging={20} />}
              text={t('popup.open')}
            />
          )}
          {onDelete && (
            <PopUpMenuItem
              className={styles.danger}
              onClick={onDelete}
              icon={<IconBasket width={20} hanging={20} />}
              text={t('popup.delete')}
            />
          )}
        </Card>
      )}
    </div>
  );
};