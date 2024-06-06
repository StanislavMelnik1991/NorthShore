import { EquipmentCondition } from '@shared/constants';
import { VideoError } from '../../Error';
import { useCustomVideo } from '../../hook';
import { VideoSkeleton } from '../../Skeleton';
import styles from './MJPEGVideo.module.scss';

interface Props {
  className?: string;
  src?: string;
}

export const MJPEGVideo = ({ className, src }: Props) => {
  const { t, isError, onErrorHandler, status } = useCustomVideo({
    initialError: !src,
  });

  return (
    <VideoSkeleton
      className={className}
      player={
        isError ? (
          <VideoError />
        ) : (
          <img
            className={styles.video}
            src={src}
            alt={'video'}
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
