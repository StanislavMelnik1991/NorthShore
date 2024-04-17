import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, Title } from '@shared/ui';
import accessImage from '../assets/access.png';
import intercomImage from '../assets/intercom.png';
import videoImage from '../assets/video.png';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t } = useTranslation('security');

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        className={styles.header}
        breadcrumbs={[
          {
            href: '',
            title: t('title'),
          },
        ]}
      />
      <Link to={AppRoutes[AppRoutesEnum.SECURITY_ACCESS]()}>
        <Card
          className={styles.card}
          gap={20}
          flexDirection="column"
          padding={20}
        >
          <Title fontWeight="semibold" variant="h4">
            {t('modules.access')}
          </Title>
          <img
            src={accessImage}
            className={styles.image}
            alt={t('modules.access')}
          />
        </Card>
      </Link>
      <Link to={AppRoutes[AppRoutesEnum.SECURITY_INTERCOM]()}>
        <Card
          className={styles.card}
          gap={20}
          flexDirection="column"
          padding={20}
        >
          <Title fontWeight="semibold" variant="h4">
            {t('modules.intercom')}
          </Title>
          <img
            src={intercomImage}
            className={styles.image}
            alt={t('modules.intercom')}
          />
        </Card>
      </Link>
      <Link to={AppRoutes[AppRoutesEnum.SECURITY_VIDEO]()}>
        <Card
          className={styles.card}
          gap={20}
          flexDirection="column"
          padding={20}
        >
          <Title fontWeight="semibold" variant="h4">
            {t('modules.video')}
          </Title>
          <img
            src={videoImage}
            className={styles.image}
            alt={t('modules.video')}
          />
        </Card>
      </Link>
    </PageSkeleton>
  );
};

export default MainPage;
