import classNames from 'classnames';
import { RefObject, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { useTranslation } from 'react-i18next';
import { EquipmentCondition } from '@shared/constants';
import { IconCamera } from '@shared/icons';
import { Badge, Text } from '@shared/ui';
import styles from './CustomVideo.module.scss';

interface Props {
  className?: string;
  status: number;
  src?: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
}

export const CustomVideo = ({
  className,
  src,
  status,
  muted,
  controls,
  autoPlay = true,
}: Props) => {
  const { t } = useTranslation('security');
  const playerRef = useRef<HTMLVideoElement>();
  return (
    <div className={classNames(styles.wrapper, className)}>
      {status === 2 || !src ? (
        <div className={styles.videoError}>
          <IconCamera width={24} height={24} />
          <Text fontWeight="medium" variant="body14">
            {t('cards.cameraError')}
          </Text>
        </div>
      ) : (
        <ReactHlsPlayer
          className={styles.video}
          playerRef={playerRef as RefObject<HTMLVideoElement>}
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          controls={controls}
        />
      )}
      <Badge color="dark" className={styles.timeStamp}>
        {status === 1 && <div className={styles.dot} />}
        {t(`cards.${EquipmentCondition[status as 1 | 2 | 3]}`)}
      </Badge>
    </div>
  );
};
