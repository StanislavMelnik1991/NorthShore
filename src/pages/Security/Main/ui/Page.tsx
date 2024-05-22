import { useTranslation } from 'react-i18next';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { RarusCard } from '@shared/ui';
import accessImage from '../assets/access.png';
import intercomImage from '../assets/intercom.png';
import sls_intercom from '../assets/sls_intercom.png';
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
            title: t('title'),
          },
        ]}
      />
      <div className={styles.wrapper}>
        <RarusCard
          link={AppRoutes[AppRoutesEnum.SECURITY_ACCESS]()}
          title={t('modules.access')}
          img={accessImage}
          linkIsLocal
        ></RarusCard>
        <RarusCard
          link={AppRoutes[AppRoutesEnum.SECURITY_INTERCOM]()}
          title={t('modules.intercom')}
          img={intercomImage}
          linkIsLocal
        ></RarusCard>
        <RarusCard
          link={AppRoutes[AppRoutesEnum.SECURITY_VIDEO]()}
          title={t('modules.video')}
          img={videoImage}
          linkIsLocal
        ></RarusCard>
        <RarusCard
          link={AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM]()}
          title={t('modules.sls_intercom')}
          img={sls_intercom}
          linkIsLocal
        ></RarusCard>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
