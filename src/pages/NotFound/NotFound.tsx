import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '@entities/components';
import { Button, Card, Title } from '@shared/ui';
import styles from './NotFound.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <PageSkeleton className={styles.wrapper}>
      <Card padding={50} flexDirection="column" gap={20}>
        <Title fontWeight="semibold" variant="h1">
          {t('not_found.title')}
        </Title>
        <Button onClick={() => navigate(-1)}>{t('not_found.back')}</Button>
      </Card>
      {/* <video
        controls
        width="250"
        // disablePictureInPicture
        // controlsList="nofullscreen"
      >
        <source
          src={
            'http://lc38.loc.devline.tv:3536/cameras/0/streaming/main.mp4?audio=0&authorization=Basic%20YWRtaW46dXZ1TGZjRDU='
          }
          type="video/mp4"
        />
        {t('errors.video')}
      </video>
      <video
        controls
        width="250"
        // disablePictureInPicture
        // controlsList="nofullscreen"
      >
        <source
          src={
            'http://lc38.loc.devline.tv:3536/cameras/0/streaming/sub.mp4?audio=0&authorization=Basic%20YWRtaW46dXZ1TGZjRDU='
          }
          type="video/mp4"
        />
        {t('errors.video')}
      </video> */}
    </PageSkeleton>
  );
};

export default NotFoundPage;
