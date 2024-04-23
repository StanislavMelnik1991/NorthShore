import classNames from 'classnames';
import { VideoCard } from '@entities/components';
import { NoResults } from '@entities/components/NoResults';
import { SecurityCamera } from '@entities/types';
import { Loader } from '@shared/ui';
import { useVideoList } from '../hook';
import styles from './List.module.scss';

interface Props {
  className?: string;
  data: Array<SecurityCamera>;
  isLoading?: boolean;
}

export const VideoList = ({ className, data, isLoading }: Props) => {
  const { t } = useVideoList();
  return (
    <div className={classNames(styles.wrapper, className)}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader size={200} />
        </div>
      )}
      {!data.length ? (
        <NoResults title={t('noData.title')} text={t('noData.text')} />
      ) : (
        data.map((el) => {
          return (
            <VideoCard
              video={el.rtsp_url}
              name={el.name}
              id={el.id}
              key={`security-video-${el.id}`}
            />
          );
        })
      )}
    </div>
  );
};
