import { RefObject } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { EquipmentCondition } from '@shared/constants';
import { VideoError } from '../../Error';
import { useCustomVideo } from '../../hook';
import { VideoSkeleton } from '../../Skeleton';
import styles from './HLSVideo.module.scss';

interface Props {
  className?: string;
  status: number;
  src?: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
}

export const HLSVideo = ({
  className,
  src,
  muted,
  controls,
  autoPlay = true,
  status: initialStatus,
}: Props) => {
  const { t, isError, onErrorHandler, status, playerRef } = useCustomVideo({
    initialError: !src || initialStatus === 2,
  });

  return (
    <VideoSkeleton
      className={className}
      player={
        isError || !src ? (
          <VideoError />
        ) : (
          <ReactHlsPlayer
            className={styles.video}
            playerRef={playerRef as RefObject<HTMLVideoElement>}
            src={src}
            autoPlay={autoPlay}
            muted={muted}
            controls={controls}
            onError={onErrorHandler}
          />
        )
      }
      badge={[
        status === 1 && <div className={styles.dot} />,
        t(`cards.${EquipmentCondition[status as 1 | 2 | 3]}`),
      ]}
    />
  );
};
