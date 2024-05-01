import classNames from 'classnames';
import { Modal, TableControls, VideoCard } from '@entities/components';
import { ModalDelete, NoResults } from '@entities/components';
import { SecurityCamera } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card } from '@shared/ui';
import { useVideoList } from '../hook';
import styles from './List.module.scss';

interface Props {
  className?: string;
  data: Array<SecurityCamera>;
  isLoading?: boolean;
}

export const VideoList = ({ className, data, isLoading }: Props) => {
  const { t, handleCloseModal, handleDelete, handleOpenModal, isModalOpen } =
    useVideoList();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalDelete
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          text={t('remove.text')}
          title={t('remove.titleCamera')}
        />
      </Modal>
      {isLoading ? (
        [1, 2, 3, 4].map((el) => {
          return (
            <Card className={styles.loader} loading key={`loader-${el}`} />
          );
        })
      ) : (
        <>
          {!data.length ? (
            <NoResults title={t('noData.title')} text={t('noData.text')} />
          ) : (
            data.map(({ rtsp_url_small, id, lat, lon, name, status_id }) => {
              return (
                <VideoCard
                  video={rtsp_url_small}
                  name={name}
                  id={id}
                  muted
                  status={status_id || 3}
                  key={`security-video-${id}`}
                  controls={
                    <TableControls
                      point={{ lat, lon }}
                      id={id}
                      rotateIcon
                      getDetailsRoute={
                        AppRoutes[AppRoutesEnum.SECURITY_VIDEO_CURRENT]
                      }
                      getUpdateRoute={
                        AppRoutes[AppRoutesEnum.SECURITY_VIDEO_UPDATE]
                      }
                      onDelete={handleOpenModal(id)}
                    />
                  }
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
};
